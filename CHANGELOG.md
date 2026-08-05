# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added the Agency responsible-body tier (`agencies.json` + `Agency` type + `configHelper`/View-resolver accessors) for national government offices in the city, starting with `pnp-laspinas` (Las Piñas City Police Station); its location is unverified pending confirmation against an official source (#198, ADR-0004)
- Added a `/barangays` page rendering the Barangay directory (the 20 `subdivisions.json` records), reading through the same accessor as `government/index.vue`'s Subdivisions section, and linked it from the main nav between Government and Statistics (#198)
- Added the Barangay responsible-body tier (`Service.providedByBarangay`): Barangay-level Services now link to the `/barangays` directory instead of a stand-in Office record (#198, ADR-0004)

### Changed
- Unified `officials.departments[]` with the canonical `Office` entity so a city office is modelled once (#199, ADR-0003): `officials.json` now holds people only — each department head is an `Official` with an `officeId` pointing at the Office it heads — while office identity, description and contact live solely in `offices.json`. The `abbreviation` moves onto `Office`, and the department's lossy `services` field (Office → one Category) is dropped in favour of the canonical `Service.providedBy` direction
- The Government page's "Key Offices" section now renders Offices joined to their heads through the `configHelper` accessor layer, grouped by Office Group; it replaces the dead placeholder grid that read `officials.departments` directly and linked the retired `/service-details/<slug>` namespace (#199, also removes one of the two dead blocks listed in #234). The head's name is not published: the incumbent names carried over from the old `officials.departments` data are unsourced and may name people who have left office, so the join decides which Offices appear but the person stays hidden until verified (#279)
- A Service's responsible body now resolves through three tiers — Office, Agency, Barangay — instead of Office alone; the "Responsible Offices" section on `/services/<category>` is renamed "Where to Get This" and renders all three (#198, ADR-0004)
- Removed the `barangay-hall` and `police-station` stub `Office` records from `offices.json`; `barangay-clearance`, `barangay-id`, and `police-clearance` are repointed to their new Agency/Barangay tiers instead of a fake Office (#198, ADR-0004)

### Fixed
- Replaced six Office phone numbers that were all the same `(078) 326-5001` placeholder — a Cagayan Valley area code, not Las Piñas (#199). Five now carry the number published in the city's key-officials directory, which independently agrees with the number held by the department record each Office duplicated: `city-treasurer` `(02) 8871-4339`, `city-assessor` `(02) 8874-6781`, `city-agriculture` `(02) 8519-5687`, `city-budget` `(02) 8511-0779`, and `city-general-services` `(02) 8871-6195`. `city-accounting` is left blank because the two sources disagree, as is the new BPLO record and `human-resource-management`, which the directory does not list; sourcing those three is tracked separately. Note that `docs/citizens-charter/city-assessor.md` transcribes the assessor's number as `8874-4781` and is flagged for verification — that transcription is wrong
- Added a missing `Office` record for the Business Permits & Licensing Office (`business-permits-licensing`), which had a department entry but no canonical Office (#199, ADR-0003). Its phone is left blank for the same reason
- Corrected the City Civil Registry abbreviation from `MCR` (Municipal Civil Registrar — a pre-cityhood holdover) to `CCR`, and dropped the abbreviation from the `CSWDO` and `CDRRMO` Office names, which now carry it in the dedicated `abbreviation` field instead of rendering it twice (#199)
- Normalised the City Engineering Office phone to `(02) 8873-3004`, matching the area-code format every other Office uses, and added the City Social Welfare & Development Office's landline `(02) 8403-7045` from the city's key-officials directory; the mobile number it previously carried in the `phone` field moves to `mobile` (#199)
- Restored the City Planning & Development Office phone `(02) 8872-0921`, which was dropped alongside the `(078) 326-5001` placeholders even though it was never one of them (#199). It comes from the department record the Office absorbed, not from the Citizen's Charter the record cites in `sourceName`; per-record provenance is #243's job and this record's source label should be revisited when that lands
- Resolved the `CAO` abbreviation collision between the City Assessor's Office and the City Agriculture Office (#199): the City Agriculture Office publishes `CAO` as its own official handle, while the city's directory lists the assessor as plain "Assessor" with no acronym, so the assessor's abbreviation is dropped. `pnpm validate` now rejects two Offices sharing an abbreviation
- Corrected the Building Permit processing time to 5 days (was "5-10 days"), matching the DAY 1 – DAY 5 step table in `docs/citizens-charter/city-engineer.md`, which was verified line by line against the source PDF (#213)
- Corrected BPLO service fees and processing times that had drifted from the Citizen's Charter, after verifying `docs/citizens-charter/business-permits.md` line by line against the source PDF (#213): Occupational Mayor's Permit (Regular) is ₱250 (was "Varies by Assessment") and takes ~1 hour 35 minutes (was ~3 hours); the First Time Job Seeker permit takes 1 hour 30 minutes (was ~3 hours); Business Permit Renewal takes 3 hours 10 minutes (was ~3 hours); Certificates on Status of Business and Certified True Copy both take 1 hour (were "Approx. 1 hour")
- Fixed the production build failing on `[postcss] ENOENT ... open '<root>/tailwindcss'` after Nuxt 4.5.1 (#266) pulled in Vite 8: `app/assets/css/main.css` now imports `tailwindcss/index.css` instead of the bare `tailwindcss` specifier, which Vite 8's bundled postcss-import cannot resolve
- Fixed the Privacy Policy describing analytics, cookies, and automatic data collection this static site doesn't do; it now states plainly what the site actually stores (language and recent searches, kept on-device) and what its host (Cloudflare Pages) logs on its own (#258)
- Fixed Terms of Use asserting a blanket public-domain grant that contradicted `LICENSE`; it now states the two/three-way split that `LICENSE` actually grants — official government source data outside copyright, presentation content under CC BY 4.0, source code under MIT (#258); its section anchor is renamed `#public-domain` → `#content-licensing` to match (#258)
- Fixed page content touching the screen edges at certain viewport widths by setting the container's max-width below each breakpoint
- Fixed pre-commit going red on any checkout with agent worktrees or root scratch files present: `vitest.config.ts` now excludes `.claude/**`, and `.gitignore` now excludes `.claude/` and common scratch-file patterns so repo-wide `eslint .` no longer trips on them (#230, #231, #232)
- Anchored the agent scratch-file `.gitignore` patterns (`.scratch/`, `research.md`, `architecture-review.html`, `HANDOFF-*.md`, `handoff-*.md`, `.antigravitycli/`) to the repo root with a leading `/`, so they no longer match at any depth — aligning with `CONTRIBUTING.md`'s stated root-only intent (#231, follow-up to #259)

### Documentation
- Documented agent worktree pruning and the scratch-file convention in `CONTRIBUTING.md` (#231)

## [1.2.0] - 2026-05-10

### Added
- Launched "Business, Trade & Investment" category with comprehensive guides for New and Renewal Business Permits, featuring online application support and official Citizen's Charter attribution
- Added "Safety Seal Certificate" service to the Business category with full requirements and procedures
- Added "Issuance of Special Permit" service to the Business category with full Citizen's Charter details
- Added "Occupational Mayor's Permit (Regular)" service with full Citizen's Charter details
- Added "Occupational Mayor's Permit (First Time Job Seeker)" service highlighting assistance under R.A. 11261
- Added "Certificates on Status of Business" service for verification of registered entities via the BPLO
- Added "Certified True Copy" of Business License and Mayor's Permit service
- Nuxt Schema Org integration to enhance site name display in search results
- Page-specific Open Graph (OG) image configuration and JSON-driven description management

### Changed
- Revamped the Changelog page with a modern vertical timeline, improved visual hierarchy, and intuitive grouping of technical updates
- Refined City department branding by updating "City Civil Registrar" to "City Civil Registry" across all components
- Updated official contact details, physical addresses, and social media links for the City Civil Registry and City Health Office
- Enhanced OG Image implementation with a JSON-driven configuration for easier management of page-specific descriptions

### Fixed
- Resolved broken internal navigation by synchronizing service slugs and fixing department-level links (e.g., MSWDO to CSWDO)
- Fixed hydration mismatch errors in service detail layouts and deterministic state management
- Corrected changelog rendering logic to prevent empty sections or the "Unreleased" header from displaying when no updates are present
- Improved search result UI by adjusting info badge icon alignment and increasing size to 12px

### Infrastructure
- **Added**: Project governance and environment files including `CODEOWNERS` and `.nvmrc` (Node 24)
- **Updated**: Core framework and development dependencies including `nuxt` 4.4.4 and `@vue/test-utils` 4.0.3
- **Updated**: Security architecture via `nuxt-security` module, including hardened CSP policies and Cloudflare-specific header optimizations
- **Removed**: Outdated GitHub Actions deployment workflow (`cd.yml`)

### Internal
- **Refactored**: Standardized service routing by migrating `municipal-*` slugs to `city-*` to align with the city's official status
- **Refactored**: Optimized internal link routing logic in `categoriesContent.ts` and `serviceDetailsContent.ts`

### Technical
- **Removed**: Redundant security header definitions from `nuxt.config.ts` to eliminate conflicts with the new security module
- **Cleaned**: Removed unused issue link logic from prerendering configuration to improve build stability

## [1.1.0] - 2026-04-06

### Added
- Nuxt OG Image v6 has been added to generate social media preview images
- Feature: Dynamic Changelog page with a premium alternating timeline, including footer links and dynamic parsing logic
- App version display in the site footer for improved maintenance and support tracking
- Friday opening information added to relevant LGU services

### Changed
- Improved SEO title generation for slug-based routes (News, Services, Details) and modularized SEO configuration files
- Updated app version display formatting in site footer for better clarity
- Updated hardcoded year and income data in city statistics
- Updated office hours to remove lunch breaks and clarify continuous operation
- Cleaned up sitemap to exclude hidden and draft pages from public search indexing
- Barangay Chairmen have been updated to the latest as of Q1 2026

### Fixed
- Hydration mismatch issues in layout and statistics components by synchronizing non-deterministic states and structural placeholders

### Infrastructure
- **Added**: GitHub Actions deployment workflow (`cd.yml`) with support for tag-based releases
- **Removed**: `npm` package manager in favor of `pnpm` (updated `pnpm-lock.yaml`)
- **Updated**: Core dependencies and development tools (`nuxt` 4.4, `vue` 3.5, `tailwindcss` 4.2, `vitest` 4.1, `eslint` 10.2, etc.)
- **Updated**: Maintenance workflows and CI/CD pipelines (`ci.yml`, `codeql.yml`, `dependabot.yml`, etc.)

### Technical
- **Added**: Project maintenance strategy documentation (`CHANGELOG_STRATEGY.md`)
- **Added**: Centralized `regexConstants.ts` for static regular expressions
- **Updated**: Contribution guidelines and development standards (`CONTRIBUTING.md`) with instructions for finding tasks using the GitHub Project board
- **Refactored**: Modular search and changelog parsing logic with shared regex utilities
- **Fixed**: UI rendering issues, TypeScript errors, and deployment script environment loading

## [1.0.0] - 2026-03-06

### Added
- Home page with hero section, quick stats, featured services, and emergency hotlines overview
- Services page with fuzzy search, autocomplete, and category filters; includes `/services/certificates` sub-page
- Service detail pages for individual LGU service entries
- Government directory page with city officials and department listings
- Statistics page with interactive Chart.js data visualizations
- FAQ page with accordion-style question and answer layout
- About page with mission, vision, and governance information
- Contact page with form and LGU contact details
- Accessibility statement page (WCAG 2.1 compliant)
- Privacy policy and terms of use pages
- Join Us page for volunteer and community involvement
- Sitemap page for full site navigation overview

### Deprecated
- News listing and detail pages (`/news`) — built but not yet linked in navigation
- History page (`/history`) — built but not yet linked in navigation
- Tourism page (`/tourism`) — built but hidden from navigation pending content review
- Legislative framework page (`/legislative`) — built but hidden from navigation pending content review
- Budget transparency page (`/budget`) — built but hidden from navigation pending content review
- Service category sub-pages (`/services/business`, `/services/health`, `/services/tax-payments`, and others) — built but hidden from navigation pending content review

### Infrastructure
- **Added**: `useConfig()` composable as the single source of truth for all site configuration
- **Added**: `useLanguage()` composable for English/Filipino multi-language support
- **Added**: `useSearch()` composable for Fuse.js-powered fuzzy search
- **Added**: `useClickOutside()` composable for interactive UI elements
- **Added**: JSON-driven content architecture via 17 config files in `app/config/`
- **Added**: `UiBreadcrumbs` and `LanguageSelector` base components
- **Added**: Tailwind CSS v4 with custom CSS variable tokens
- **Added**: Responsive mobile-first layout with WCAG 2.1 focus states
- **Added**: Interactive maps via Leaflet and `@vue-leaflet/vue-leaflet`
- **Added**: Bootstrap Icons (CDN) and Lucide Vue Next
- **Added**: Strict TypeScript configuration across the codebase
- **Added**: ESLint rules via `@antfu/eslint-config` and Husky hooks
- **Added**: Vitest test suite with `@vue/test-utils` and `happy-dom`
- **Added**: GitHub Actions CI pipeline for quality gates
- **Added**: Dependabot configuration for dependency health
- **Added**: PM2 process management via `ecosystem.config.cjs`

### Technical
- **Added**: Open source governance: `README`, `CONTRIBUTING`, `LICENSE`, `CODE_OF_CONDUCT`

[Unreleased]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.2.0...main
[1.2.0]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/betterlaspinas/betterlaspinas/releases/tag/v1.0.0
