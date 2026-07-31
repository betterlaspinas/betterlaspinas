# Is Las Piñas data on bisto.ph reachable, and by what mechanism?

Research for [#250](https://github.com/betterlaspinas/betterlaspinas/issues/250), which gates ranking [#107](https://github.com/betterlaspinas/betterlaspinas/issues/107). Map: [#235](https://github.com/betterlaspinas/betterlaspinas/issues/235).

Investigated 2026-07-31. All figures below were measured against the live API on that date.

## Answer

**Yes — reachable, cheaply, and better than #107 assumed.** bisto.ph is a thin Vite SPA over a **public, unauthenticated, CORS-open JSON API**. No scraping is required and no partnership conversation is needed to start.

The one real complication is geographic: **the data has no city field**. Las Piñas is identifiable, but by free-text search plus a region filter, not by a clean city key. That is the finding that shapes the integration, and it is why a build-time snapshot is the right mechanism rather than a live query.

## The mechanism

`https://bisto.ph/` serves a 1 KB HTML shell plus `/assets/index-*.js`. Reading that bundle gives the data layer directly:

- **API base**: `https://api.dpwh.bettergov.ph`
- **List endpoint**: `GET /projects` — note **no trailing slash**; `/projects/` returns 404, as do `/`, `/api/projects` and `/projects/search`
- **Detail endpoint**: `GET /projects/{contractId}`
- **Deep link into bisto.ph**: `https://bisto.ph/project/{contractId}`

This API is itself open source: [`bettergovph/api.dpwh`](https://github.com/bettergovph/api.dpwh). Its README describes it as a **Redis-caching proxy in front of the government's own `https://civic.transparency.dpwh.gov.ph`**, plus a scraper and a Parquet exporter. So the ultimate source is the DPWH Transparency Portal; BetterGov.PH operates the cache and the citizen-monitoring layer on top.

There is **no repository for bisto itself** in the `bettergovph` org (36 public repos checked) — only the API proxy. The frontend is closed; the data is not.

### Can we skip the proxy and hit DPWH directly? No.

Worth asking, since going to the government source directly would dissolve the licensing question entirely. It does not work.

The proxy is a **pure pass-through** — `index.js` forwards to `` `${TARGET}${req.url}` `` with no path rewriting, so the same paths should in principle work upstream. They do not:

| Request                                                          | Result  |
| ---------------------------------------------------------------- | ------- |
| `GET civic.transparency.dpwh.gov.ph/projects?search=LAS PIÑAS`   | **403** |
| Same, with a browser `User-Agent` and `Accept: application/json` | **403** |
| `GET civic.transparency.dpwh.gov.ph/` (site root, browser UA)    | **403** |

The 403 comes from Cloudflare with an empty body and no challenge page — a WAF block rule, not a bot challenge we are failing to solve, and not an authentication prompt. It blocks the site root too, so this is not about the API surface specifically.

**Implication, and it is the important one:** `api.dpwh.bettergov.ph` is not a convenience layer we could route around — it is doing real work, reaching an origin that refuses us. Any integration therefore takes a **hard dependency on BetterGov.PH's infrastructure**, not merely on their data. Note this also applies to a build-time snapshot: Cloudflare Pages CI would be making that request from the same kind of non-allowlisted origin, so it would get the same 403 from DPWH.

That raises the value of the ecosystem conversation from "settle the licence" to "confirm this proxy is something we can depend on" — its uptime, its refresh cadence against DPWH, and whether they mind us pulling from it on a schedule.

### Access properties

| Property       | Value                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Auth           | None. No key, no token                                                                                                      |
| CORS           | `access-control-allow-origin: *` — browser fetch from our origin works                                                      |
| Format         | JSON, `application/json; charset=utf-8`                                                                                     |
| Edge           | Cloudflare (`cf-cache-status: DYNAMIC`)                                                                                     |
| Rate limits    | No `x-ratelimit-*` headers observed; none documented                                                                        |
| Origin latency | ~3.3 s (`server-timing: cfOrigin;dur=3348`) on uncached queries — slow enough that a live client-side call is a poor UX bet |

CORS being open means **both** a build-time pull and a client-side fetch are technically available, despite this site being SSG on Cloudflare Pages. The 3.3 s origin latency is what argues against the client-side option, not a technical block.

### Response shape

```
{ status, code, data: { data: [ …projects ], summary: {…}, pagination: {…} } }
```

`pagination` gives `page`, `limit`, `totalCount`, `totalPages`, `hasNext`, `hasPrev`. `summary` gives status counts and total budget **for the current filter**, which is directly useful for a homepage stat tile.

Project record fields:

```
contractId, description, category, componentCategories, status, budget,
amountPaid, progress, location{province, region}, contractor,
startDate, completionDate, infraYear, programName, sourceOfFunds,
isLive, livestreamUrl, livestreamVideoId, livestreamDetectedAt,
latitude, longitude, reportCount, hasSatelliteImage
```

National totals: **262,312 projects, ₱6.48 trillion**.

## How Las Piñas is identified — the complication

**There is no city or municipality field.** `location` carries only `province` and `region`, and `province` is not a province: it holds a DPWH **Engineering District Office** name.

The relevant DEO is **`Las Piñas-Muntinlupa DEO`** — which bundles Las Piñas with **Muntinlupa**, a different city. So even a working DEO filter would not isolate Las Piñas.

Worse, **the `province` filter is broken**. Passing `province=Las Piñas-Muntinlupa DEO` returns `totalCount: 0` — for a value the API itself emits in its own responses. The ASCII spelling and combining it with `region` also return 0. Working parameters observed in the bundle are `region`, `province`, `municipality`, `psgcCode`, `search`, `offset`, `limit`; of these, `region`, `search` and `limit` were verified to work, and `province` was verified broken. `municipality` and `psgcCode` are accepted but there is no city data for them to match.

### What does work

Free-text `search`, run **twice** — the tilde is not normalised, and the two spellings return different sets:

| Query                              | Total     |
| ---------------------------------- | --------- |
| `search=LAS PIÑAS`                 | 1,374     |
| `search=LAS PINAS`                 | 728       |
| **union, deduped by `contractId`** | **1,379** |

Precision of that union, measured:

- **1,371** in `National Capital Region`
- **1,359** in `Las Piñas-Muntinlupa DEO`
- **8 false positives** outside NCR — a `Brgy. Las Piñas` in **Peñaranda, Nueva Ecija** (Region III), plus a few Central Office flood-control records

So `search` both spellings → union → keep `region == "National Capital Region"` gives **~1,371 records at roughly 99.4% precision**. The false positives are a real, named village elsewhere in the country, which is exactly the failure mode free-text search should be expected to have.

**Residual ambiguity**: within the 1,359 DEO records, Las Piñas and Muntinlupa projects are not separated by any field. They matched because their `description` contains the string, which is decent evidence but not a guarantee. **1,105 of the 1,379 records carry `latitude`/`longitude`**, so a Las Piñas boundary check could raise precision further — at the cost of sourcing a city boundary polygon, and it would still leave 274 coordinate-less records to judge on description alone.

### Current data, if we shipped today

Of the ~1,379 union: **1,057 Completed, 212 On-Going, 89 For Procurement, 21 Terminated**. Years span multiple `infraYear` values. There is plenty of real data — this would not ship an empty page.

Payload sizes as fetched: 1.0 MB for the 1,374-record set, 0.5 MB for the 728-record set. Trimmed to the fields a listing actually needs, a Las Piñas snapshot is comfortably small enough to commit as a config-shaped JSON file.

## Terms and restrictions

**This is the part to read before implementing.**

- **`bisto.ph/robots.txt` disallows `ClaudeBot` by name**, along with `GPTBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `Bytespider`, `meta-externalagent` and `CloudflareBrowserRenderingCrawler`. It sets `Content-Signal: search=yes, ai-train=no, use=reference`. `api.dpwh.bettergov.ph` carries the same policy.
- Read that as: **human-facing reference use is welcomed, automated AI crawling is not**. Deep-linking to bisto.ph and reading its public API for a civic portal sits on the welcomed side; any bulk automated harvesting does not, and an AI agent should not be the thing doing the fetching on a schedule.
- **`bettergovph/api.dpwh` has no licence file** (`license: none`). Absent an explicit licence, reuse rights are not granted by default. The underlying data is Philippine government transparency data, which is a strong argument for public reuse, but **that argument is not a licence**.
- No attribution requirement is documented anywhere. Attribution to both **DPWH** (source) and **BetterGov.PH / Bisto Proyekto** (platform) should be treated as required regardless.
- No rate limits are documented or advertised in headers.

**So the ecosystem conversation is still worth having** — not to obtain access, which is already open, but to settle licence and attribution. That is a human action, and it is cheap: same ecosystem, and this project is a natural downstream consumer.

## Integration options, costed against SSG

1. **Build-time snapshot → committed JSON → static page.** _(recommended)_ Run the two searches at build or on a manual refresh, dedupe, filter to NCR, trim fields, commit as config-shaped data. Fits the existing config-owned data pattern exactly, immune to the 3.3 s origin latency, survives the API going down, and keeps a reviewable diff of what changed. Cost: comparable to any other config-backed page, plus a small fetch script. **Staleness is the trade-off** — infrastructure projects move slowly, so a refresh cadence measured in weeks is defensible, but it must be a deliberate decision and the page should date-stamp its data.
2. **Client-side fetch on page load.** CORS permits it. But 3.3 s uncached origin latency, a hard runtime dependency on a third party, and no offline/failure story make this the worst of the three for a portal whose other pages are instant.
3. **Deep links only, no data.** A page explaining bisto.ph and linking to `https://bisto.ph/project/{contractId}` plus the volunteer flow. Nearly free, and it delivers the "become a monitor" half of #107's stated goal without any data-freshness or licence exposure. A reasonable first slice if the licence question stalls.

A sensible shape is **3 then 1**: ship the explainer and deep links first, add the snapshot once licence and attribution are settled.

## Recommended backlog position for #107

**Mid band — same neighbourhood as #208, and ahead of it on effort.**

The feasibility risk that made #107 unrankable is gone: the data is open, unauthenticated, CORS-enabled, and there is real Las Piñas volume. What remains is not technical.

- It does **not** touch the entity-model spine — no `Service`, `Office`, `Official` or `Category` record — so it does not contend with #198 → #199, and can run parallel like #223.
- Its content cost is **near zero**, which distinguishes it sharply from #208 and the ten Service content epics. Those compete for scarce human sourcing attention; this one fetches its own data. That is a real argument for ranking it _above_ #208.
- Its open questions are **licence/attribution** (a short conversation, not engineering) and **the Muntinlupa bundling** (a precision judgement call — accept ~99% on region-filtered search, or invest in a boundary polygon).
- Option 3 alone is a genuine quick win.

**Suggested follow-ups to file when #107 is picked up:**

- Settle licence and attribution for `api.dpwh.bettergov.ph` data with BetterGov.PH — blocks option 1, not option 3. Cover the **dependency** question in the same conversation: DPWH's own origin 403s us, so their proxy is the only path, and we would be depending on their infrastructure's uptime and refresh cadence, not just their data.
- Decide the Las Piñas precision bar: region-filtered free-text union (~99.4%, free) versus adding a boundary-polygon check (higher, needs a polygon and still leaves 274 coordinate-less records).
- Report the broken `province` filter upstream to `bettergovph/api.dpwh` — it returns 0 for values the API emits, which is a plain bug and fixing it would simplify any downstream consumer.

## Reproduction

```bash
# list endpoint — note: no trailing slash
curl -sS -G "https://api.dpwh.bettergov.ph/projects" \
  --data-urlencode "search=LAS PIÑAS" --data-urlencode "limit=1500"

# the ASCII spelling returns a different set — union and dedupe on contractId
curl -sS -G "https://api.dpwh.bettergov.ph/projects" \
  --data-urlencode "search=LAS PINAS" --data-urlencode "limit=1000"

# then keep only location.region == "National Capital Region"
# to drop the Peñaranda, Nueva Ecija false positives
```
