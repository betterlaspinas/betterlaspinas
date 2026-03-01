<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'

const { lguName, labels, site } = useConfig()

const { getFullSiteTitle, getOpenGraphUrl } = useConfig()

const seoDesc = computed(() => `Complete sitemap of Better ${lguName.value} — find all pages, services, and government resources available on this portal.`)

useHead({
  title: 'Sitemap',
})

useSeoMeta({
  description: () => seoDesc.value,
  ogTitle: () => getFullSiteTitle('Sitemap'),
  ogDescription: () => seoDesc.value,
  ogType: 'website',
  ogUrl: () => `${getOpenGraphUrl()}sitemap`,
  twitterCard: 'summary',
  twitterTitle: () => getFullSiteTitle('Sitemap'),
  twitterDescription: () => seoDesc.value,
})

interface SitemapLink {
  href: string
  label: string
  external?: boolean
  hidden?: boolean
}

interface SitemapSection {
  icon: string
  title: string
  cols?: number
  links: SitemapLink[]
}

const sections = computed<SitemapSection[]>(() => [
  {
    icon: 'bi-house-door',
    title: 'Main Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Services' },
      { href: '/government', label: 'Government' },
      { href: '/statistics', label: 'Statistics' },
      { href: '/legislative', label: 'Legislative', hidden: true },
      { href: '/budget', label: 'Transparency', hidden: true },
      { href: '/contact', label: 'Contact' },
      { href: '/news', label: 'News' },
      { href: '/faq', label: 'FAQ' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
  },
  {
    icon: 'bi-grid-3x3-gap',
    title: 'Service Categories',
    links: [
      {
        href: '/services/certificates',
        label: 'Certificates & Vital Records',
      },
      { href: '/services/business', label: 'Business Services', hidden: true },
      { href: '/services/social-services', label: 'Social Services', hidden: true },
      { href: '/services/health', label: 'Health & Wellness', hidden: true },
      { href: '/services/tax-payments', label: 'Tax & Payments', hidden: true },
      { href: '/services/agriculture', label: 'Agriculture', hidden: true },
      { href: '/services/infrastructure', label: 'Infrastructure', hidden: true },
      { href: '/services/education', label: 'Education', hidden: true },
      { href: '/services/environment', label: 'Environment', hidden: true },
      { href: '/services/public-safety', label: 'Public Safety', hidden: true },
    ],
  },
  {
    icon: 'bi-building',
    title: `${labels.value.deptPrefix} Offices`,
    cols: 4,
    links: [
      {
        href: '/service-details/civil-registrar',
        label: 'Local Civil Registrar',
      },
      {
        href: '/service-details/municipal-treasurer',
        label: 'Treasurer\'s Office',
      },
      {
        href: '/service-details/municipal-assessor',
        label: 'Assessor\'s Office',
      },
      { href: '/service-details/municipal-budget', label: 'Budget Office' },
      {
        href: '/service-details/municipal-accounting',
        label: 'Accounting Office',
      },
      {
        href: '/service-details/municipal-engineering',
        label: 'Engineering Office',
      },
      {
        href: '/service-details/municipal-planning',
        label: 'Planning Office',
      },
      {
        href: '/service-details/municipal-agriculture',
        label: 'Agriculture Office',
      },
      { href: '/service-details/mswdo-services', label: 'MSWDO' },
      {
        href: '/service-details/business-permits-licensing',
        label: 'BPLS Office',
      },
      {
        href: '/service-details/general-services',
        label: 'General Services',
      },
      {
        href: '/service-details/human-resource-management',
        label: 'HR Management',
      },
    ],
  },
  {
    icon: 'bi-bank',
    title: 'Government & Legislative',
    links: [
      { href: '/government', label: 'Government Structure' },
      { href: '/legislative', label: 'Legislative Documents', hidden: true },
      {
        href: '/legislative/ordinance-framework',
        label: 'Ordinance Framework',
      },
      {
        href: '/legislative/resolution-framework',
        label: 'Resolution Framework',
      },
    ],
  },
  {
    icon: 'bi-link-45deg',
    title: 'Resources & Legal',
    links: [
      ...(site.value.social.facebook
        ? [
            {
              href: site.value.social.facebook,
              label: 'Facebook Page',
              external: true,
            },
          ]
        : []),
      { href: '/terms', label: 'Terms of Use', external: false },
      { href: '/privacy', label: 'Privacy Policy', external: false },
    ],
  },
])
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Sitemap' }]" />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-diagram-3-fill" /> Navigation
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Sitemap
          </h1>
          <p class="text-lg text-white/90">
            Navigate all pages and services of Better {{ lguName }}
          </p>
        </div>
      </div>
    </section>

    <!-- Sitemap Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="space-y-8">
          <div
            v-for="section in sections"
            :key="section.title"
            class="bg-white border border-gray-200 rounded-2xl overflow-hidden"
          >
            <div
              class="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50"
            >
              <span
                class="w-10 h-10 flex items-center justify-center bg-primary-100 text-primary-600 rounded-lg"
              >
                <i :class="`bi ${section.icon} text-lg`" />
              </span>
              <h2 class="text-lg font-bold text-gray-900 m-0">
                {{ section.title }}
              </h2>
            </div>
            <div
              class="p-6 grid gap-3"
              :class="
                section.cols === 4
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              "
            >
              <template v-for="link in section.links.filter(l => !l.hidden)" :key="link.href">
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 p-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <i class="bi bi-box-arrow-up-right text-sm" />
                  {{ link.label }}
                </a>
                <NuxtLink
                  v-else
                  :to="link.href"
                  class="flex items-center gap-2 p-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <i class="bi bi-arrow-right text-sm" /> {{ link.label }}
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
