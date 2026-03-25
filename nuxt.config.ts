// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
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
  ssr: true,
  ogImage: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/seo', 'nuxt-og-image'],
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
        version: pkg.version,
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
