<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import SearchAutocomplete from '@/components/ui/SearchAutocomplete.vue'
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
const route = useRoute()
const initialQuery = computed(() => (route.query.q as string) || '')

useHead({
  title: 'Services',
})

const categories = [
  {
    href: '/services/certificates',
    icon: 'bi-file-earmark-text-fill',
    titleKey: 'cat-certificates',
    descKey: 'cat-certificates-desc',
  },
  {
    href: '/services/business',
    icon: 'bi-shop',
    titleKey: 'cat-business',
    descKey: 'cat-business-desc',
  },
  {
    href: '/services/social-services',
    icon: 'bi-people-fill',
    titleKey: 'cat-social',
    descKey: 'cat-social-desc',
  },
  {
    href: '/services/health',
    icon: 'bi-heart-pulse-fill',
    titleKey: 'cat-health',
    descKey: 'cat-health-desc',
  },
  {
    href: '/services/tax-payments',
    icon: 'bi-cash-coin',
    titleKey: 'cat-tax',
    descKey: 'cat-tax-desc',
  },
  {
    href: '/services/agriculture',
    icon: 'bi-tree-fill',
    titleKey: 'cat-agriculture',
    descKey: 'cat-agriculture-desc',
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-building-fill-gear',
    titleKey: 'cat-infrastructure',
    descKey: 'cat-infrastructure-desc',
  },
  {
    href: '/services/education',
    icon: 'bi-mortarboard-fill',
    titleKey: 'cat-education',
    descKey: 'cat-education-desc',
  },
  {
    href: '/services/public-safety',
    icon: 'bi-shield-fill-check',
    titleKey: 'cat-safety',
    descKey: 'cat-safety-desc',
  },
  {
    href: '/services/environment',
    icon: 'bi-globe-americas',
    titleKey: 'cat-environment',
    descKey: 'cat-environment-desc',
  },
]

const lifeEvents = [
  {
    href: '/services/business',
    icon: 'bi-shop',
    labelKey: 'life-starting-business',
  },
  {
    href: '/services/certificates',
    icon: 'bi-heart',
    labelKey: 'life-getting-married',
  },
  {
    href: '/services/certificates',
    icon: 'bi-emoji-smile',
    labelKey: 'life-having-baby',
  },
  {
    href: '/services/social-services',
    icon: 'bi-wallet2',
    labelKey: 'life-financial-help',
  },
  {
    href: '/services/social-services',
    icon: 'bi-person-badge',
    labelKey: 'life-senior',
  },
  {
    href: '/services/social-services',
    icon: 'bi-universal-access',
    labelKey: 'life-pwd',
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-hammer',
    labelKey: 'life-building',
  },
  {
    href: '/services/public-safety',
    icon: 'bi-question-circle',
    labelKey: 'life-trouble',
  },
]
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <Breadcrumbs :items="[{ label: translate('nav-services') }]" />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-grid-fill" /> {{ translate('nav-services') }}
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ translate('services-title') }}
          </h1>
          <p class="text-lg text-white/90 mb-8">
            {{ translate('services-subtitle') }}
          </p>
          <!-- Search Box -->
          <div class="max-w-xl mx-auto">
            <div class="relative flex items-center">
              <i class="bi bi-search absolute left-4 text-gray-400 z-10 pointer-events-none" />
              <SearchAutocomplete
                placeholder="Search other services..."
                class="w-full [&_input]:pl-12 [&_input]:pr-4 [&_input]:py-4 [&_input]:rounded-xl [&_input]:text-base [&_input]:border-0 [&_input]:shadow-lg"
                :initial-query="initialQuery"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Categories -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.href"
            :to="cat.href"
            class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div class="w-14 h-14 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-2xl shrink-0 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white">
              <i class="bi" :class="[cat.icon]" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ translate(cat.titleKey) }}
              </h3>
              <p class="text-sm text-gray-500 mb-3">
                {{ translate(cat.descKey) }}
              </p>
              <span class="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                View Services <i class="bi bi-arrow-right" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Browse by Life Event -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ translate('life-events-title') }}
          </h2>
          <p class="text-gray-500">
            {{ translate('life-events-subtitle') }}
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="event in lifeEvents"
            :key="event.labelKey"
            :to="event.href"
            class="flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 text-center transition-all duration-200 hover:border-primary-500 hover:shadow-md hover:-translate-y-1"
          >
            <i class="bi text-3xl text-primary-600" :class="[event.icon]" />
            <span class="text-sm font-medium">{{ translate(event.labelKey) }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
