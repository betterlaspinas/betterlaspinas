# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Barangay Chairmen have been updated to the latest as of Q1 2026

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
- `useConfig()` composable as the single source of truth for all site configuration, with `NUXT_PUBLIC_SITE_*` environment variable overrides
- `useLanguage()` composable for English/Filipino multi-language support with browser locale persistence
- `useSearch()` composable for Fuse.js-powered fuzzy search with autocomplete
- `useClickOutside()` composable for dismissing dropdowns and modals
- JSON-driven content architecture via 17 config files in `app/config/` (site, officials, services, navigation, hotlines, statistics, statistics-detailed, tourism, subdivisions, history, faq, legislative, news, budget, categories, translations, seo)
- `UiBreadcrumbs` component for breadcrumb navigation
- `LanguageSelector` component for runtime EN/FIL language switching
- Tailwind CSS v4 with custom CSS variables for theming
- Responsive mobile-first layout with keyboard navigation and WCAG 2.1 accessibility
- Interactive maps via Leaflet and `@vue-leaflet/vue-leaflet`
- Bootstrap Icons (CDN) and Lucide Vue Next for iconography
- Strict TypeScript configuration across all Vue and Nuxt files
- ESLint with `@antfu/eslint-config` and Husky pre-commit hooks enforcing lint, typecheck, and tests
- Vitest test suite with `@vue/test-utils`, `happy-dom`, and `@vitest/coverage-v8`; tests co-located with source files
- GitHub Actions CI pipeline running lint, typecheck, and tests on every push and pull request to `main`
- Dependabot configuration for automated dependency update pull requests
- PM2 process management via `ecosystem.config.cjs` with auto-restart and log paths
- Open source governance files: `README`, `CONTRIBUTING`, `LICENSE`, `CODE_OF_CONDUCT`, issue/PR templates, and `SECURITY` policy

### Deprecated
- News listing and detail pages (`/news`) — built but not yet linked in navigation
- History page (`/history`) — built but not yet linked in navigation
- Tourism page (`/tourism`) — built but hidden from navigation pending content review
- Legislative framework page (`/legislative`) — built but hidden from navigation pending content review
- Budget transparency page (`/budget`) — built but hidden from navigation pending content review
- Service category sub-pages (`/services/business`, `/services/health`, `/services/tax-payments`, and others) — built but hidden from navigation pending content review

[1.0.0]: https://github.com/betterlaspinas/betterlaspinas/releases/tag/v1.0.0
