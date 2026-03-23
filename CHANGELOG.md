# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Feature: Dynamic Changelog page with a premium alternating timeline, including footer links and dynamic parsing logic
- App version display in the site footer for improved maintenance and support tracking
- Friday opening information added to relevant LGU services

### Changed
- Updated office hours to remove lunch breaks and clarify continuous operation
- Cleaned up sitemap to exclude hidden and draft pages from public search indexing
- Barangay Chairmen have been updated to the latest as of Q1 2026

### Infrastructure
- **Added**: GitHub Actions workflow for automated deployment (`cd.yml`)
- **Removed**: `npm` package manager in favor of `pnpm` (updated `pnpm-lock.yaml`)
- **Updated**: Maintenance workflows and CI/CD pipelines (`ci.yml`, `codeql.yml`, `dependabot.yml`, etc.)

### Technical
- **Added**: Project maintenance strategy documentation (`CHANGELOG_STRATEGY.md`)
- **Added**: Centralized `regexConstants.ts` for static regular expressions
- **Updated**: Contribution guidelines and development standards (`CONTRIBUTING.md`)
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

[Unreleased]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.0.0...main
[1.0.0]: https://github.com/betterlaspinas/betterlaspinas/releases/tag/v1.0.0
