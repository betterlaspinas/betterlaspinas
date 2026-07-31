# A Service's responsible body has three tiers: Office, Barangay, Agency

`#198` asks us to unhide the `barangay-hall` and `police-station` Offices, which `#196` set `hidden: true` because — unlike City Hall departments — they are not single offices in the City Hall compound. Acting on it surfaced a deeper problem: both were modeled as `Office` records purely to satisfy `Service.providedBy`, but neither is an Office under ADR-0003 (`Office` = a top-level **city** department, RA 7160 sense). They are different _tiers_ of government, and forcing them into `offices.json` produced empty stub records, a `hidden` flag, and a self-referential `link`.

## Decision

A Service has **at most one** responsible body, drawn from **three tiers**, only one of which is an `Office`. Having none is valid — 21 of the 50 Services carry no `providedBy` today (the BPLO business cluster, `cedula`, `scholarship`, …) and stay that way; the rule is _at most one tier_, never _exactly one_:

1. **Office** — a city department (RA 7160). `Service.providedBy → officeId`. Unchanged; this is the ADR-0001/0003 spine.
2. **Barangay** — the smallest LGU tier, its own local government. Las Piñas has 20 in `subdivisions.json`. A barangay-level Service (Barangay Clearance, Barangay ID) is obtained at the resident's **own** barangay, so it points at the **whole directory**, not one record: `Service.providedByBarangay: true` → a "get this at your Barangay Hall" card linking to a `/barangays` page.
3. **Agency** — a **national** government office physically present in the city (PNP now; BFP, NBI, BJMP, Prosecutor later). Office-shaped (name, location, contact) but national, not LGU. Held in a new `agencies.json`. A Service points at one: `Service.providedByAgency → agencyId`.

The provider relationship is **deliberately asymmetric**: Agency is a **single ref** (one place, like an Office), Barangay is a **directory marker** (no single place — there are 20). They are kept as separate optional fields rather than unified behind one polymorphic `provider` field because unification would rewrite `providedBy` on every existing Service for no behaviour change today. The asymmetry itself is the load-bearing part and must survive whatever encoding is used.

Consequences recorded in CONTEXT.md: new `Barangay` and `Agency` glossary terms; `Office` narrowed to "city department only"; `subdivision` flagged as the template-generic label whose PH colloquial meaning (a private housing development) makes it unfit as the domain term — the domain term is **Barangay**.

## Considered Options

- **Retain both as `Office`** (drop `hidden`, fill data). Fastest, but re-introduces the tier-mixing ADR-0003 just removed: one `Office` card can't represent 20 barangays, and PNP is national, not a city department. Rejected.
- **One polymorphic `provider: { kind, ref }`** across all tiers. Uniform, and a discriminated union could model the barangay arm honestly (`{ kind: 'barangay' }` needs no ref) — but it churns every existing Service's `providedBy` for no behaviour change today. Rejected on churn, not on shape; revisit if a fourth tier appears.
- **Keep both as `Office` records with an `ownership: 'city' | 'national'` discriminator.** Cheapest for the Agency half — one field instead of a parallel file, type, accessor, and detail page — and it would keep PNP out of `OfficeGroup` browsing. Rejected because it re-broadens `Office` to "any org that provides Services" one week after ADR-0003 pinned it to the RA 7160 city-department sense; conceptual integrity of the term outranks the saved file. (Does not address the barangay half at all.)
- **Model PNP as a hotline entry.** A police station is a place residents physically visit (clearance, blotter), not a phone number; the hotline is one attribute. Under-models it. Rejected.
- **Model each of the 20 barangays as a provider record.** Faithful, but duplicates `subdivisions.json` and bloats the provider space for a directory pointer. Rejected.

## Consequences

- New `agencies.json` + `Agency` type + `configHelper` accessor; `Service` gains optional `providedByAgency` and `providedByBarangay`.
- `barangay-hall` and `police-station` are **removed** from `offices.json`. `barangay-clearance`/`barangay-id` get `providedByBarangay: true`; `police-clearance` gets `providedByAgency: "pnp-laspinas"`. The `hidden` flag itself stays in use — `human-resource-management` is still `hidden: true` in `offices.json`, and `categories.json` and `navigation.json` have their own users.
- `pnpm validate` gains an **at most one** responsible-body rule (`providedBy` / `providedByAgency` / `providedByBarangay` are mutually exclusive; zero is valid). The three-optional-field encoding cannot express this in the type system, so the validator is the only place the invariant is enforced.
- A new `/barangays` page renders the `subdivisions` directory (today it only lives inside `government/index.vue`).
- The category page's "Responsible Offices" section must resolve all three tiers and widen its heading (it is no longer only Offices).
- `pnp-laspinas` location/contact must be sourced; mark unverified until confirmed (ties to the deferred `dataStatus` flag).
