<script setup lang="ts">
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
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-people-fill',
    titleKey: 'cat-social',
    descKey: 'cat-social-desc',
    hidden: true,
  },
  {
    href: '/services/health',
    icon: 'bi-heart-pulse-fill',
    titleKey: 'cat-health',
    descKey: 'cat-health-desc',
    hidden: true,
  },
  {
    href: '/services/tax-payments',
    icon: 'bi-cash-coin',
    titleKey: 'cat-tax',
    descKey: 'cat-tax-desc',
    hidden: true,
  },
  {
    href: '/services/agriculture',
    icon: 'bi-tree-fill',
    titleKey: 'cat-agriculture',
    descKey: 'cat-agriculture-desc',
    hidden: true,
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-building-fill-gear',
    titleKey: 'cat-infrastructure',
    descKey: 'cat-infrastructure-desc',
    hidden: true,
  },
  {
    href: '/services/education',
    icon: 'bi-mortarboard-fill',
    titleKey: 'cat-education',
    descKey: 'cat-education-desc',
    hidden: true,
  },
  {
    href: '/services/public-safety',
    icon: 'bi-shield-fill-check',
    titleKey: 'cat-safety',
    descKey: 'cat-safety-desc',
    hidden: true,
  },
  {
    href: '/services/environment',
    icon: 'bi-globe-americas',
    titleKey: 'cat-environment',
    descKey: 'cat-environment-desc',
    hidden: true,
  },
]

const lifeEvents = [
  {
    href: '/services/business',
    icon: 'bi-shop',
    labelKey: 'life-starting-business',
    hidden: true,
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
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-person-badge',
    labelKey: 'life-senior',
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-universal-access',
    labelKey: 'life-pwd',
    hidden: true,
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-hammer',
    labelKey: 'life-building',
    hidden: true,
  },
  {
    href: '/services/public-safety',
    icon: 'bi-question-circle',
    labelKey: 'life-trouble',
    hidden: true,
  },
]
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <UiBreadcrumbs :items="[{ label: translate('nav-services') }]" />

    <UiPageHero
      badge-icon="bi-grid-fill"
      :badge-text="translate('nav-services')"
      :title="translate('services-title')"
      :description="translate('services-subtitle')"
    >
      <!-- Search Box -->
      <div class="max-w-xl mx-auto">
        <div class="relative flex items-center">
          <i class="bi bi-search absolute left-4 text-gray-400 z-10 pointer-events-none" />
          <ServicesSearch
            placeholder="Search other services..."
            class="w-full [&_input]:pl-12 [&_input]:pr-4 [&_input]:py-4 [&_input]:rounded-xl [&_input]:text-base [&_input]:border-0 [&_input]:shadow-lg"
            :initial-query="initialQuery"
          />
        </div>
      </div>
    </UiPageHero>

    <!-- Service Categories -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="cat in categories.filter(c => !c.hidden)"
            :key="cat.href"
            :to="cat.href"
            interactive
            class="group flex items-start gap-4 text-gray-800"
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
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Browse by Life Event -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          :title="translate('life-events-title')"
          :description="translate('life-events-subtitle')"
          badge-icon=""
          badge-text=""
          badge-class="hidden"
        />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UiCard
            v-for="event in lifeEvents.filter(e => !e.hidden)"
            :key="event.labelKey"
            :to="event.href"
            interactive
            class="flex flex-col items-center gap-3 text-gray-800 text-center"
          >
            <i class="bi text-3xl text-primary-600" :class="[event.icon]" />
            <span class="text-sm font-medium">{{ translate(event.labelKey) }}</span>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
