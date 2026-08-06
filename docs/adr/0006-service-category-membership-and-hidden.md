# Category membership follows presenting need; `hidden` means draft at Service grain, unlaunched at Category grain

`#238` flagged that Category assignment looks unprincipled — Community Tax Certificate (Cedula), Sanitary Permit, and Tricycle Franchising sit under Business rather than Certificates or Taxation — and that four Business Services carry `hidden: true` with no recorded reason. `#233` separately found Category-level visibility asserted in three disagreeing places (`navigation.json`, `categories.json`, `LIVE_CATEGORY_IDS` in `configHelper.ts`). Both are the same underlying gap: no stated rule for what a Category is for, and `hidden` doing unrelated jobs at two grains with no glossary entry at either.

`#255` decides both, so all ten Service content epics (#62–#70, #244) inherit one rule instead of ten independent guesses.

## Decision

**1. Category membership is decided by presenting need — why the resident came — not by the outcome artifact.** When a Service could plausibly sit in two Categories, it belongs to the one answering "what do I want to do", per `CONTEXT.md`'s existing definition. Confirmed against prior art: GOV.UK files vehicle tax under _Driving and transport_, not _Money and tax_; BetterGov.ph files business certificates under _Business and Trade_ even though a _Certificates and IDs_ category exists. Both resolve the same fork the same way.

A Service has **exactly one** Category — no cross-listing field. `keywords` (already indexed at weight 0.3 in `useSearch.ts`) carries cross-journey discoverability; a second `categoryId` would let a Service dodge the rule by always claiming two homes.

Applied to the three misfits:

- **Sanitary Permit** → stays **Business** (obtained exclusively to run a business; health is the mechanism, not the need).
- **Tricycle Franchising** → stays **Business** (livelihood registration).
- **Cedula** → moves to **Taxation** (`tax-payments`) — it is a tax paid to obtain a document, needed for many unrelated reasons, not business-exclusive.

**2. `hidden` means two different things at two grains, and both are kept — never merged with provenance.**

- **`Service.hidden`** = this Service's content is a draft, not ready to publish. Traced to its origin: commit `f637049` (#105) introduced it labeled _"feat: hide draft services under business"_ — the meaning already existed, it was just never written down. Ratified as-is.
- **`Category.hidden`** = this Category hasn't launched — its Services aren't written yet.

Neither is derived from `#280`'s per-record `sources[]`/`verifiedOn`. Provenance answers "is this true"; `hidden` answers "is this finished". A Service can be sourced and still have no fee or steps written; collapsing the two would make sourcing a record silently unpublish it.

**3. `categories.json`'s `hidden` field is the single source of truth for Category visibility.** `navigation.json`'s per-item `hidden` and `LIVE_CATEGORY_IDS` (`configHelper.ts`) are retired as independent copies and become consumers of `getServiceCategories()` / a `category.hidden` check. Before the switch, `navigation.json`'s 8 hidden categories (Tax Payments, Social Services, Health, Agriculture, Infrastructure, Education, Public Safety, Environment) are ported into `categories.json` first, so the migration is lossless — no category is accidentally published or hidden by the refactor itself.

**4. `Category.hidden` cascades to everything under it** — the Category page, its Services in search, its Services' own detail pages, sitemap. Not browse-only. Chosen over a browse-only split because cascading reuses the single filter point `getServicesConfig()` already has (replace `LIVE_CATEGORY_IDS` with a `category.hidden` join) instead of forking accessors into a hidden-inclusive path (for direct/breadcrumb access) and a hidden-exclusive path (for listings). Accepted cost: a content epic that finishes every Service in an unlaunched Category still ships nothing live until the Category itself is flipped — no partial-Category incremental publish. Measured baseline this changes: search today indexes 41 of 50 Services (hardcoded `LIVE_CATEGORY_IDS` ignores `navigation.json`'s hides); after cascading, unlaunched-Category Services drop out too.

**5. `online` is retired as a Category; delivery channel becomes a facet on the Service it duplicates.** Its 5 Services (`online-business-billing`, `online-new-business`, `online-business-renewal`, `online-rpt-billing`, `online-payment-order`) are Filipizen-delivered duplicates of Services already living under Business/Taxation — modeling delivery channel as a Category duplicated the same need twice. The merge of each `online-*` record into its real counterpart (e.g. an `onlineUrl`/`deliveryChannel` field) is data work, filed as a follow-on ticket per this ticket's own AC — this ADR records only the call.

**6. `government` is retired outright, no replacement.** Zero Services were ever assigned to it — nothing to migrate. Its description ("general city services, property management, and personnel records") is Office-page material under ADR-0003, not Category material.

## Considered Options

- **Category by outcome artifact** (what document/transaction results). Rejected: fragments a single resident journey (e.g. "open a shop") across Business, Health, Infrastructure, and Taxation depending on which permit is asked about; no prior-art portal surveyed does this.
- **Cross-listing Services under two Categories.** Rejected: makes the presenting-need rule undecidable (a Service can always argue a second home), and duplicates the browse surface for a case `keywords` already covers via search.
- **Derive Category visibility from Service state** (a Category is hidden iff all its Services are hidden). Rejected on the data: `tax-payments` has 4 Services, none individually `hidden`, yet is one of the 8 categories currently hidden in `navigation.json` — visibility is an independent editorial call, not computable from Service state.
- **Browse-only Category visibility** (hide the Category as a destination; Services stay independently governed by `Service.hidden`). Considered because it preserves incremental per-Service shipping inside an unlaunched Category. Rejected: requires forking `getCategoryBySlug`/service accessors into hidden-inclusive and hidden-exclusive variants so a hidden Category's page still renders when reached directly; genuinely more moving parts than cascading, for a partial-publish property not asked for.
- **Derive `hidden` from provenance** (`#280`'s `sources[]`/`verifiedOn`) instead of keeping a separate flag. Rejected: conflates truthfulness with completeness; a sourced-but-half-written Service would vanish the moment someone added its citation.
- **Keep `government` with a narrowed purpose.** Rejected: nothing has ever used it, and ADR-0003 already gives its stated contents (personnel records, property management) a home on the Office page.

## Consequences

- `CONTEXT.md`'s `Category` glossary entry gains the presenting-need rule and the exactly-one-Category-per-Service constraint.
- `Cedula`'s `categoryId` changes `business` → `tax-payments`.
- `navigation.json`'s 8 category-level `hidden` flags migrate into `categories.json`, then are deleted from `navigation.json`; the nav menu derives its children from `getServiceCategories()`.
- `LIVE_CATEGORY_IDS` in `configHelper.ts` is deleted; `getServicesConfig()`'s category filter becomes a `category.hidden` join instead.
- `getServiceCategoryName()` and any Category-page/breadcrumb accessor must keep resolving names/pages correctly under cascading — a hidden Category's own Services and page are no longer reachable at all (not merely unlisted), so no orphaned links should point at them once the switch lands.
- `online` Category and its 5 duplicate Service records are removed from `categories.json`/`services.json`; a follow-on ticket merges the delivery-channel fact into the real Business/Taxation Services and files any UI needed to surface it.
- `government` Category is removed from `categories.json`/`navigation.json`. No migration — it held no Services.
- The ten Service content epics (#62–#70, #244) can now derive Category placement mechanically instead of re-deriving the rule per epic.
