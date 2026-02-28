# Better Las Piñas - Community-Driven LGU Portal

A modern, accessible, and fully-featured local government unit (LGU) website built with **Nuxt 4** and **Vue 3**. This project provides a comprehensive digital platform for LGUs to deliver government services, information, and resources to their citizens.

## 🌟 Features

- **📱 Responsive Design** - Mobile-first, works seamlessly on all devices
- **♿ Accessibility-First** - WCAG 2.1 compliant with keyboard navigation
- **🌐 Multi-language Support** - English, Filipino, and regional dialects
- **🔍 Smart Search** - Fuzzy search with autocomplete for services
- **📊 Interactive Data Visualizations** - Charts for statistics and budgets
- **🗺️ Tourism & Attractions** - Showcase local destinations
- **👥 Government Directory** - Officials and department listings
- **📜 Legislative Framework** - Ordinances and resolutions viewer
- **📞 Emergency Hotlines** - Quick access to critical contacts
- **🎨 Modern UI/UX** - Clean, professional design with smooth animations

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4.3.1](https://nuxt.com/) (Vue 3 Composition API)
- **Language**: TypeScript (Strict Mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Charts**: [Chart.js](https://www.chartjs.org/) + vue-chartjs
- **Maps**: [Leaflet](https://leafletjs.com/) + vue-leaflet
- **Search**: [Fuse.js](https://fusejs.io/) (Fuzzy search)
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Testing**: [Vitest](https://vitest.dev/) + @vue/test-utils
- **Linting**: [ESLint](https://eslint.org/) (@antfu/eslint-config)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **pnpm** 8.x or higher (optional)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/betterlaspinas/betterlaspinas.git
cd betterlaspinas
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Your LGU

You can configure the portal content and behavior in two ways:

#### Option A: JSON Configuration (Statically Built)

Edit the static configuration files in `app/config/`:

- `site.json` - Basic site information
- `officials.json` - Government officials
- `services.json` - Available services
- `tourism.json` - Tourist attractions
- `subdivisions.json` - Barangays/districts
- `history.json` - LGU milestones
- `statistics.json` - Population and data
- `hotlines.json` - Emergency contacts

#### Option B: Environment Variables (Dynamic Deployment)

For deploying to different LGUs or test servers without committing code changes, you can use a `.env` file to override the properties inside `site.json`.

1. Copy `.env.example` to `.env`.
2. Update the `NUXT_PUBLIC_SITE_*` variables.

NUXT_PUBLIC_SITE_MUNICIPALITY="Las Piñas City"
NUXT_PUBLIC_SITE_DOMAIN="betterlaspinas.org"

These runtime variables will securely override the `site.json` values during build-time and run-time, making it ideal for CI/CD pipelines.

> **Developer Note:** When building components, always use the `useConfig()` composable — never import directly from `app/utils/configHelper.ts`. The composable is the single source of truth: it merges `.env` overrides with `site.json` and exposes all configs (site, officials, navigation, services, translations, etc.) as reactive refs.
>
> **Reactivity rule:** In `<template>` blocks, refs are auto-unwrapped — use `{{ site.domain }}` directly. In `<script setup>` JS (inside `computed()`, functions, etc.), always use `.value` — e.g. `site.value.coordinates.lat`, `labels.value.deptPrefix`.
>
> **Exception:** `useSearch.ts` calls `getServicesConfig()` directly from `configHelper` — this is intentional. `useConfig()` internally calls `useRuntimeConfig()`, which requires a Nuxt app context that `useSearch` cannot guarantee (it causes test failures). Since the services list has no `.env`-override needs, a direct getter call is the correct approach here.

### 4. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your site.

## 📜 Available Scripts

| Command             | pnpm Alternative | Description                  |
| ------------------- | ---------------- | ---------------------------- |
| `npm run dev`       | `pnpm dev`       | Start development server     |
| `npm run build`     | `pnpm build`     | Build for production         |
| `npm run preview`   | `pnpm preview`   | Preview production build     |
| `npm run generate`  | `pnpm generate`  | Generate static site         |
| `npm run lint`      | `pnpm lint`      | Check code with ESLint       |
| `npm run lint:fix`  | `pnpm lint:fix`  | Fix ESLint errors            |
| `npm run test`      | `pnpm test`      | Run tests in watch mode      |
| `npm run typecheck` | `pnpm typecheck` | Run TypeScript type checking |

## 🧪 Testing

Run the test suite:

```bash
# Watch mode (for development)
npm test
# or
pnpm test

# Run once (for CI)
npm run test -- --run
# or
pnpm test --run

# With coverage
npm run test:coverage
# or
pnpm test:coverage
```

## 🔒 Git Hooks & Pre-commit Checks

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality before commits.

**Pre-commit hook runs:**

1. **Lint** - ESLint checks all files
2. **Type Check** - TypeScript validation
3. **Tests** - Full test suite

If any check fails, the commit will be blocked. Fix the issues before committing.

### Manual Quality Checks

```bash
# Run all checks manually
npm run lint        # Check code style
# or
pnpm lint

npm run typecheck   # Check types
# or
pnpm typecheck

npm run test -- --run  # Run tests
# or
pnpm test --run
```

## 📁 Project Structure

```text
betterlaspinas/
├── app/
│   ├── assets/          # CSS, images, fonts
│   ├── components/      # Vue components
│   │   ├── charts/      # Chart components
│   │   ├── home/        # Homepage sections
│   │   ├── layout/      # Header, Footer, etc.
│   │   └── ui/          # Reusable UI components
│   ├── composables/     # Vue composables
│   ├── config/          # JSON configuration files
│   ├── pages/           # Nuxt pages (routes)
│   ├── types/           # TypeScript definitions
│   └── utils/           # Helper functions
├── public/              # Static assets
├── .husky/              # Git hooks
└── tests/               # Test files

```

## 🎨 Customization

### Branding & Colors

Edit `app/assets/css/main.css` to customize:

- Primary/secondary colors
- Fonts
- Spacing
- Animations

### Content

All content is driven by JSON files in `app/config/`. Simply update these files to change:

- Municipality/City information
- Services offered
- Officials and departments
- Tourist attractions
- Statistics and data

No code changes required for content updates!

## 🌐 Deployment

### Static Site Generation

```bash
npm run generate
# or
pnpm generate
```

Output will be in `.output/public/` - deploy to any static host.

### Node.js Server

```bash
npm run build
node .output/server/index.mjs
# or
pnpm build
node .output/server/index.mjs
```

### Recommended Platforms

- **Vercel** - Zero-config Nuxt deployment
- **Netlify** - Static site hosting
- **Cloudflare Pages** - Global CDN
- **VPS** - Full control (Nginx + PM2)

See [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment) for more options.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

[MIT License](LICENSE) - See LICENSE file for details.

## 👥 Contributors

We would like to thank all the contributors who have helped build and maintain this project.

<a href="https://github.com/betterlaspinas/betterlaspinas/graphs/contributors">
    <img src="https://contributors-img.web.app/image?repo=betterlaspinas/betterlaspinas&max=750&columns=20" alt="Contributors" />
</a>

[See the full list of contributors](https://github.com/betterlaspinas/betterlaspinas/graphs/contributors)

## 🙏 Acknowledgments

- Built with [Nuxt](https://nuxt.com/)
- UI inspiration from modern government portals
- Community feedback and contributions
- Inspired by [BetterGov](https://github.com/bettergovph/bettergov)
- [BetterLGU Template](https://github.com/joyceeeen/betterlgu-template)

## 📞 Support

For issues and questions:

- **Issues**: [GitHub Issues](https://github.com/betterlaspinas/betterlaspinas/issues)
- **Discussions**: [GitHub Discussions](https://github.com/betterlaspinas/betterlaspinas/discussions)

---

**Made with ❤️ for better local governance**
