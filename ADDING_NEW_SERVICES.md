# Adding New Services Guide

This guide details the standard checklist and considerations when adding a new service to the local government unit directory.

## Checklist for Adding a New Service

### 1. Update `services.json`

- **File**: `app/config/services.json`
- **Action**: Add a new JSON object to the `"services"` array.
- **Fields Required**:
  - `id`: A unique, URL-friendly string (e.g., `special-permit`).
  - `title`: The display title of the service.
  - `category`: The main category it belongs to (e.g., `Business, Trade & Investment`).
  - `categoryId`: The slug of the category.
  - `description`: A brief 1-sentence explanation of what the service is.
  - `keywords`: Array of search terms for the fuzzy search composable.
  - `fee`: The expected cost.
  - `processingTime`: Approximated time for the whole transaction.
  - `office`: The assigned office or department handling it.
  - `url`: The destination route (typically `/service-details/<id>`).

### 2. Update `categoriesContent.ts`

- **File**: `app/utils/categoriesContent.ts`
- **Action**: Add a new `ServiceItem` object to the corresponding `services` array within the `CategoryContent` object.
- **Fields Required**:
  - `id`: A unique string.
  - `title`: The display title of the service in the category page.
  - `icon`: Bootstrap internal icon (e.g., `bi-shop`).
  - `description`: A brief description for the category card.
  - `fee`: The expected cost.
  - `time`: Approximated processing time.
  - `link`: The destination route (typically `/service-details/<id>`).

### 3. Add Detailed Content in `serviceDetailsContent.ts`

- **File**: `app/utils/serviceDetailsContent.ts`
- **Action**: Append a new `ServiceDetail` object. Group it logically under the corresponding section (e.g., `/** Business, Trade & Investment */`).
- **Fields Required**:
  - `id`: Must EXACTLY match the ID from `services.json`.
  - `title`: Short title (used in breadcrumbs/headers).
  - `fullTitle`: Formal/Official title.
  - `category` & `categoryLink`: The parent category name and its route (`/services/business`).
  - `badgeText` & `badgeIcon`: UI badge text and Bootstrap internal icon (e.g., `bi-shop`).
  - `description`: A comprehensive description.
  - `quickStats`: Array of 4 items (`Processing`, `Fee`, `Who Can Apply`, `Appointment`).
  - `processSteps`: Sequential procedure. Mark the last item with `isFinal: true`.
  - `requirements`: Grouped lists with titles and icons (`bi-file-text`, `bi-people`, etc.).
  - `faqs`: Array of FAQs (`question`/`answer`). **Note**: Do not fabricate FAQs; only add them if verified by a valid source document.
  - `office`: Contact and location information.
  - `relatedServices`: Links to 2-3 similar internal pages.
  - `sourceUrl` & `sourceName`: Link to Citizen's Charter and official name context, if applicable.

### 4. Setup SEO

- **File**: `app/config/seo-service-details-slug.json`
- **Action**: Add a localized mapping using the newly created `id` as the key.
- **Example**: `"special-permit": "Apply for a Special Permit to operate your business establishment in {{lguName}}."`
- **Consideration**: The `seo.global.ts` middleware injects `{{lguName}}`. Try to make the meta description actionable and descriptive.

### 5. Provide a Changelog Status

- **File**: `CHANGELOG.md`
- **Action**: Add a bullet under the currently `[Unreleased]` -> `### Added` section.
- **Reference**: Always follow `CHANGELOG_STRATEGY.md` format (delineating user-facing vs. infrastructure features).

### 6. Validating Using the UI

- **Action**: Spin up the development server locally (`pnpm run dev`).
- **Checklist**:
  - Does the new service appear in the global site search popup?
  - Does the specific category list the new service properly?
  - Does clicking the service route to the correct Dynamic Slug page (`/service-details/[id]`) without a 404 error?
  - Are Hydration Mismatches avoided? (Ensure semantic HTML arrays are strictly matched without arbitrary unclosed elements).
  - Does the meta description appear in the DOM head?
