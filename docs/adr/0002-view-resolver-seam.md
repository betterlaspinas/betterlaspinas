# Page resolution lives behind a View resolver seam

Service/Office/Category data is now single-sourced and read through `configHelper` (ADR-0001, #183), but the step *after* reading — resolving a slug into what a page renders — still lives inline in each page's `<script setup>`. Three pages (`services/[category].vue`, `service-details/[slug].vue`, `offices/[slug].vue`) carry untested resolution and mapping: name-based service dedupe, detail/office merge order, catalog-only link suppression. None of it is reachable by a test without rendering the page, so the riskiest logic in the app has zero coverage.

We introduce a **View** — a render-ready projection of canonical records, shaped for exactly one route's template (see CONTEXT.md) — built by a resolver in `app/utils/pageViews.ts`. Each route gets a **bound facade** (`categoryView(slug): CategoryView | undefined`) that does the `configHelper` lookup and delegates to a **pure shaper** (`toCategoryView(records): CategoryView`) that holds all mapping. Tests hit the pure shaper with fixtures; the page calls the facade and renders the result, holding only a `if (!view) throw 404` guard. The interface becomes the test surface.

The boundary rule: **View shaping lives in `pageViews`; domain questions stay in `configHelper`.** A function that answers "what does this template need" (`getServiceOfficeCard`, office-card synthesis) moves into the shapers; a function that answers a domain question true regardless of page (`getOfficesForCategory` — which Offices serve a Category) stays in `configHelper`.

## Considered Options

- **Leave resolution in the pages** — zero churn, but the dedupe/merge bug surface stays untestable and re-duplicates on the next page added.
- **Return domain objects; page maps** — a seam, but a shallow one: the risky mapping stays in the `.vue`, defeating the point.
- **Resolver throws `createError` / takes `slug` and reads JSON itself** — page becomes a one-liner, but the seam couples to Nuxt and to the data source, so its test needs both stubbed. Rejected: the pure shaper must be framework- and IO-free.

## Consequences

- The three pages become render-only; resolution is unit-tested through `pageViews` shapers.
- `configHelper` narrows to domain reads; View shaping has exactly one home, so it can't re-leak into a fourth site.
- Prerequisite behavior change: `/service-details/civil-registry` gains a 301 to `/offices/civil-registry` (finishing #207), letting `serviceDetailView` resolve Service detail only — no office fallback.
- This is a presentation seam only; it does not touch the canonical data model or ADR-0001's phased path to `@nuxt/content`.
