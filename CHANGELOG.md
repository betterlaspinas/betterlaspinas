# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nuxt Schema Org to change the site name in search results
- Added new "Issuance of Special Permit" service to the Business, Trade & Investment category with full Citizen's Charter details
- Added new "Occupational Mayor's Permit (Regular)" service to the Business, Trade & Investment category with full Citizen's Charter details
- Added new "Occupational Mayor's Permit (First Time Job Seeker)" service highlighting free assistance under R.A. 11261
- Added new "Certificates on Status of Business" service for verifying registered business entity status via the BPLO
- Launched "Business, Trade & Investment" category with detailed guides for New and Renewal Business Permits, featuring online application support and official Citizen's Charter attribution

### Changed
- Updated naming from "City Civil Registrar" to "City Civil Registry" across the application
- Updated City Civil Registry contact details (telephone, mobile, email, Facebook) and physical address in service records
- Updated the City Health Office contact information to reflect new phone numbers, mobile, and official Facebook page

### Fixed
- Fixed hydration mismatch issue in service details layout
- Prevented empty "Unreleased" section (and other empty versions or sections) from being rendered on the Changelog page
- Adjusted icon size from 11px to 12px in Search Results info badges

### Infrastructure
- **Added**: `CODEOWNERS` file to define repository maintainers
- **Added**: `--tags` to `git fetch` in `cd.yml` to support `git describe`
- **Removed**: Redundant tag-based deployment trigger from `cd.yml`

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

[Unreleased]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.1.0...main
[1.1.0]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/betterlaspinas/betterlaspinas/releases/tag/v1.0.0
