# Canonical Service data: consolidate to one JSON source, then port to Nuxt Content

Service data is currently duplicated across four hand-synced sources (`config/services.json`, `config/categories.json`, `utils/categoriesContent.ts`, `utils/serviceDetailsContent.ts`, plus per-service SEO JSON), so adding one Service means editing four files. We will establish a single canonical Service record (carrying Service Detail as optional fields; Offices modeled as a separate entity grouped by function).

The long-term store is `@nuxt/content` collections, chosen for content-author DX in this volunteer-driven project. We reach it in two phases rather than one big-bang migration:

1. **Consolidate** the four sources into one canonical `services.json` consumed via `configHelper`, deleting the hardcoded TS content modules. Zero new dependencies; closes issues #110, #109, #72. Low-risk, mechanical, independently shippable.
2. **Port** that single clean source into `@nuxt/content` collections as a follow-up — a 1-source→collections migration with a reviewable diff, gated on the dependency decision.

## Considered Options

- **TS-as-data modules** — full compile-time type safety, but requires developer knowledge to add Services; wrong fit for non-dev community contributors.
- **JSON + JSON Schema as the permanent home** — viable end state, but `@nuxt/content` offers materially better authoring DX (markdown/yaml, typed collections) for the content volume expected.
- **Big-bang migration straight to Nuxt Content** — one migration, but bundles "untangle duplication" with "adopt a content pipeline + new dep" into a single un-reviewable PR.

## Consequences

- Phase 1 ships value with no dependency commitment; the `@nuxt/content` adoption (Phase 2) remains a separate, explicit decision.
- Adding `@nuxt/content` introduces a build-time content pipeline and a new authoring model — to be confirmed before Phase 2 begins.
