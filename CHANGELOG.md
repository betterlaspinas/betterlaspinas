# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive test suite with 9+ test files for composables and components
- Husky pre-commit hooks for automated quality checks (lint, typecheck, tests)
- Open source documentation (README, CONTRIBUTING, LICENSE, CODE_OF_CONDUCT)
- GitHub issue and PR templates
- `typecheck` npm script for TypeScript validation
- Test coverage for useLanguage, useSearch, useSiteConfig, useClickOutside
- Component tests for Breadcrumbs, LanguageSelector, SearchAutocomplete, Header, Footer
- "Better Las Piñas" branding with accurate city map silhouette logo
- Full "City" LGU type support in configuration and type definitions
- Accurate GPS coordinates for Las Piñas City Hall
- "St. Joseph Parish Church (Bamboo Organ)" to tourism highlights

### Changed
- Updated README.md with comprehensive setup and deployment guides
- Enhanced git workflow with pre-commit quality gates
- Updated all "Municipality" references to "City" in configuration files
- Refactored `configHelper.ts` to prioritize "City" logic

## [1.0.0] - Initial Release

### Added
- Complete LGU portal template with Nuxt 4 and Vue 3
- Multi-language support (English, Filipino, regional dialects)
- Service directory with fuzzy search and autocomplete
- Government officials and department directory
- Tourism and attractions showcase
- Legislative framework (ordinances and resolutions)
- Interactive statistics and budget visualizations
- Emergency hotlines directory
- Accessibility-first design (WCAG 2.1 compliant)
- Responsive mobile-first layout
- JSON-based content management
- TypeScript strict mode throughout
- ESLint with @antfu/eslint-config
- Vitest testing framework

### Features

#### Core Pages
- Homepage with hero, services, stats, leadership
- Services directory with categories and search
- Government page with officials listing
- News and updates section
- Contact page with hotlines
- Tourism attractions gallery
- Statistics and demographics
- Budget transparency
- Legislative documents viewer
- About, History, FAQ pages
- Accessibility, Privacy, Terms pages

#### Technical
- Server-side rendering (SSR) with Nuxt
- Static site generation (SSG) support
- SEO optimized
- Performance optimized (lazy loading, code splitting)
- PWA-ready architecture
- Chart.js integration for data visualization
- Leaflet maps for geographic data
- Pinia state management
- Composables for reusable logic

### Configuration
- Fully customizable via JSON files
- No code changes required for content updates
- Easy municipality/city adaptation
- Flexible service categories
- Customizable color scheme

---

## Version History

- **1.0.0** - Initial public release
- **0.1.0** - Internal alpha version
