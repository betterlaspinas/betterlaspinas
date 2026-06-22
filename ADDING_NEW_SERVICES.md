# Adding New Services Guide

Services now live in **one place**: `app/config/services.json`. You do **not** need
to touch any TypeScript to add a Service. A non-developer can add or edit a
Service by editing JSON, validated by a schema and a `pnpm validate` check.

> Status: this single-source workflow is live for the **Certificates** category
> (the tracer-bullet slice, #184). Other categories are mid-migration (#189) and
> some of their detail pages still live in `app/utils/serviceDetailsContent.ts`.
> When adding to those, follow the same JSON-first steps below — the
> configHelper accessor reads `services.json` for every category.

## The single source: `app/config/services.json`

Each entry in the `"services"` array is a canonical Service record. The file is
schema-backed: `app/config/schema/services.schema.json` (referenced via the
`"$schema"` key at the top of the JSON). Most editors will autocomplete and
flag mistakes inline.

### 1. Add the Service record

Add a new object to the `"services"` array:

```json5
{
  "id": "my-service", // unique, URL-friendly slug
  "title": "My Service", // display title
  "category": "Certificates & Vital Records", // human-readable category name
  "categoryId": "certificates", // MUST match an id in categories.json
  "description": "One-sentence summary of the service.",
  "keywords": ["my", "service", "search", "terms"],
  "fee": "₱75", // optional
  "processingTime": "15-30 minutes", // optional
  "office": "Civil Registry Office", // optional
  "icon": "bi-file-earmark-text", // optional Bootstrap icon
  "url": "/services/certificates" // see "Catalog vs. detail" below
}
```

### 2. Catalog vs. detail — does it get its own page?

A Service is one of two things:

- **Catalog-only card.** No dedicated page. Set
  `"url": "/services/<categoryId>"` and **omit** the `detail` block.
  (e.g. _Barangay Clearance_.)

- **Detail-bearing Service.** Has a full `/service-details/<id>` page. Set
  `"url": "/service-details/<id>"` and add an optional `"detail"` object with
  the page content:

```text
"url": "/service-details/my-service",
"detail": {
  "fullTitle": "My Service (Official Title)",
  "category": "Certificates",
  "categoryLink": "/services/certificates",
  "badgeText": "Certificates",
  "badgeIcon": "bi-file-earmark-text",
  "description": "Comprehensive description shown on the page.",
  "quickStats": [
    { "icon": "bi-clock", "label": "Processing", "value": "15-30 Minutes" }
  ],
  "processSteps": [
    { "title": "Step One", "description": "...", "isFinal": false }
    // mark the last step with "isFinal": true
  ],
  "requirements": [
    { "title": "Documentary Requirements", "icon": "bi-file-text", "items": ["..."] }
  ],
  "faqs": [
    { "question": "...", "answer": "..." }
    // Do NOT fabricate FAQs — only add verified ones.
  ],
  "office": {
    "name": "City Civil Registry",
    "location": "1st Floor, Administrative Building",
    "phone": "(02) 8253-4370",
    "hours": "Mon-Thu: 8AM - 7PM"
  },
  "relatedServices": [
    { "title": "Birth Certificate", "link": "/service-details/birth-certificate" }
  ],
  "onlineLink": "https://...",              // optional
  "sourceUrl": "https://...",               // optional — link to source document
  "sourceName": "Citizen's Charter 2022"    // optional
}
```

The rule the validator enforces: **if a Service has a `detail` block, its `url`
must be exactly `/service-details/<id>`.**

### 3. Categories live in `app/config/categories.json`

If you introduce a new `categoryId`, add a matching category record to
`app/config/categories.json` (schema:
`app/config/schema/categories.schema.json`). A category may also list
`offices` (the "Responsible Offices" cards on the category page).

### 4. Validate

Run the zero-dependency validator before committing:

```bash
pnpm validate
```

It checks both JSON files against their schemas and asserts consistency
(unknown `categoryId`, duplicate ids, `detail`/`url` coherence). CI runs this on
every PR.

### 5. SEO (optional)

For a new `/service-details/<id>` page, add a localized meta description right
on the canonical Service record in `app/config/services.json` via the optional
`seo` field (read by the SEO middleware through `getServiceSeoDescription`):

```jsonc
{
  "id": "my-service",
  "description": "Short catalog blurb.",
  "seo": "Apply for My Service in {{lguName}}."
  // ...
}
```

Category pages work the same way: add an optional `seo` field to the Category
record in `app/config/categories.json` (read via `getCategorySeoDescription`).
Both support `{{lguName}}` interpolation. Keeping the SEO copy on the canonical
record means it can never drift from the catalog. When omitted, the route-level
description in `app/config/seo.json` is used.

### 6. Changelog

Add a bullet under `[Unreleased]` → `### Added` in `CHANGELOG.md`, following
`CHANGELOG_STRATEGY.md`.

### 7. Verify in the UI

```bash
pnpm dev
```

- Does the Service appear in the global search popup?
- Does the category page list it?
- Does a detail-bearing Service route to `/service-details/<id>` without a 404?
- Does the meta description render in the document head?
