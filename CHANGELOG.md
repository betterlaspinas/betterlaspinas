# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
