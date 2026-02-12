<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface ServiceCard {
  href: string
  icon: string
  titleKey: string
  descKey: string
  isViewAll?: boolean
}

const { translate } = useLanguage()

const services: ServiceCard[] = [
  {
    href: '/services/certificates',
    icon: 'bi-file-earmark-text-fill',
    titleKey: 'service-certificates',
    descKey: 'service-certificates-desc',
  },
  {
    href: '/services/business',
    icon: 'bi-shop',
    titleKey: 'service-business',
    descKey: 'service-business-desc',
  },
  {
    href: '/services/tax-payments',
    icon: 'bi-cash-coin',
    titleKey: 'service-tax',
    descKey: 'service-tax-desc',
  },
  {
    href: '/services/social-services',
    icon: 'bi-people-fill',
    titleKey: 'service-social',
    descKey: 'service-social-desc',
  },
  {
    href: '/services/health',
    icon: 'bi-heart-pulse-fill',
    titleKey: 'service-health',
    descKey: 'service-health-desc',
  },
  {
    href: '/services',
    icon: 'bi-grid-fill',
    titleKey: 'btn-view-all-services',
    descKey: '',
    isViewAll: true,
  },
]
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {{ translate('section-popular') }}
        </h2>
        <p class="text-gray-500">
          Quick access to frequently requested municipal services
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="service in services"
          :key="service.href + service.titleKey"
          :to="service.href"
          class="group flex items-center gap-4 p-6 bg-white border rounded-xl no-underline transition-all duration-200"
          :class="service.isViewAll
            ? 'bg-primary-600 border-transparent text-white hover:shadow-lg'
            : 'border-gray-200 text-gray-800 hover:border-primary-500 hover:shadow-md'"
        >
          <!-- Icon -->
          <div
            class="w-12 h-12 flex items-center justify-center rounded-lg text-xl shrink-0"
            :class="service.isViewAll
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-primary-600'"
          >
            <i class="bi" :class="[service.icon]" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3
              class="text-base font-semibold m-0 mb-1"
              :class="service.isViewAll ? 'text-white' : 'text-gray-900'"
            >
              {{ translate(service.titleKey) }}
            </h3>
            <p
              v-if="service.descKey"
              class="text-[0.8125rem] m-0"
              :class="service.isViewAll ? 'text-white/80' : 'text-gray-500'"
            >
              {{ translate(service.descKey) }}
            </p>
            <p v-if="service.isViewAll" class="text-[0.8125rem] m-0 text-white/80">
              Browse complete directory
            </p>
          </div>

          <!-- Arrow -->
          <i
            class="bi bi-arrow-right transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
            :class="service.isViewAll ? 'text-white' : 'text-gray-400'"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
