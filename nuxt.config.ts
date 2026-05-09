// https://nuxt.com/docs/api/configuration/nuxt-config
import { execSync } from 'node:child_process'
import pkg from './package.json'

function getVersion() {
  try {
    return execSync('git describe --tags --always').toString().trim()
  }
  catch (e) {
    console.warn('Failed to get version from git:', e)
    return pkg.version
  }
}

const version = getVersion()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: [
        'chart.js',
        'tailwind-variants',
        '@vue-leaflet/vue-leaflet',
        'fuse.js',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
  sitemap: {
    zeroRuntime: true,
    exclude: [
      '/budget',
      '/history',
      '/legislative/**',
      '/news',
      '/services/business',
      '/services/social-services',
      '/services/health',
      '/services/tax-payments',
      '/services/agriculture',
      '/services/infrastructure',
      '/services/education',
      '/services/environment',
      '/services/public-safety',
      '/tourism',
    ],
    urls: [
      '/services/certificates',
    ],
  },
  routeRules: {
    '/': {
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    },
  },
  security: {
    headers: {
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
      contentSecurityPolicy: {
        'default-src': ['\'none\''],
        'manifest-src': ['\'self\''],
        'script-src': ['\'self\'', '\'strict-dynamic\'', '\'unsafe-inline\''],
        'style-src': ['\'self\'', '\'unsafe-inline\'', 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
        'font-src': ['\'self\'', 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
        'img-src': ['\'self\'', 'https:', 'data:'],
        'connect-src': ['\'self\'', 'https://api.open-meteo.com', 'https://open.er-api.com'],
        'base-uri': ['\'self\''],
        'form-action': ['\'none\''],
      },
    },
    sri: true,
  },
  ssr: true,
  ogImage: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/seo', 'nuxt-og-image', 'nuxt-security'],
  runtimeConfig: {
    public: {
      site: {
        lguType: '',
        municipality: '',
        province: '',
        region: '',
        siteId: '',
        domain: '',
        tagline: '',
        themeColor: '',
        officialWebsite: '',
        version,
      },
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css' },
      ],
    },
  },
})
