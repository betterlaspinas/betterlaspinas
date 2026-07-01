// https://nuxt.com/docs/api/configuration/nuxt-config
import { execSync } from 'node:child_process'
import process from 'node:process'
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
    // 301: legacy Office URLs → canonical Office namespace (#207, #202).
    '/service-details/city-civil-registry': {
      redirect: { to: '/offices/civil-registry', statusCode: 301 },
    },
    '/service-details/city-treasurer': {
      redirect: { to: '/offices/city-treasurer', statusCode: 301 },
    },
    '/service-details/city-assessor': {
      redirect: { to: '/offices/city-assessor', statusCode: 301 },
    },
    '/service-details/city-engineering': {
      redirect: { to: '/offices/city-engineering', statusCode: 301 },
    },
    '/service-details/city-planning': {
      redirect: { to: '/offices/city-planning', statusCode: 301 },
    },
    '/service-details/city-agriculture': {
      redirect: { to: '/offices/city-agriculture', statusCode: 301 },
    },
    '/service-details/city-budget': {
      redirect: { to: '/offices/city-budget', statusCode: 301 },
    },
    '/service-details/city-accounting': {
      redirect: { to: '/offices/city-accounting', statusCode: 301 },
    },
    '/service-details/city-general-services': {
      redirect: { to: '/offices/city-general-services', statusCode: 301 },
    },
    // 301: Office id slug resolved by the /service-details fallback (#216).
    // civil-registry is the only Office with a detail block, so after this no
    // /service-details/* URL resolves an Office.
    '/service-details/civil-registry': {
      redirect: { to: '/offices/civil-registry', statusCode: 301 },
    },
  },
  security: {
    headers: {
      // Disabled — CF Pages/Cloudflare CDN already sets these; enabling causes duplicates
      referrerPolicy: false,
      xFrameOptions: false,
      xContentTypeOptions: false,
      xXSSProtection: false,
      strictTransportSecurity: false,
      xDownloadOptions: false,
      xPermittedCrossDomainPolicies: false,
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
      },
      contentSecurityPolicy: {
        'default-src': ['\'none\''],
        'manifest-src': ['\'self\''],
        'script-src': ['\'self\'', '\'unsafe-inline\''],
        'style-src': ['\'self\'', '\'unsafe-inline\'', 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
        'font-src': ['\'self\'', 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
        'img-src': ['\'self\'', 'https:', 'data:'],
        'connect-src': ['\'self\'', 'https://api.open-meteo.com', 'https://open.er-api.com'],
        'base-uri': ['\'self\''],
        'form-action': ['\'none\''],
      },
    },
    sri: false,
    ssg: {
      hashScripts: false,
    },
  },
  ssr: true,
  ogImage: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  // happy-dom unit tests do not use application modules. In particular, the
  // SEO module decorates runtimeConfig with values that structuredClone cannot
  // serialize when @nuxt/test-utils builds its Vitest configuration.
  modules: process.env.VITEST
    ? []
    : ['@pinia/nuxt', '@nuxtjs/seo', 'nuxt-og-image', 'nuxt-security'],
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
