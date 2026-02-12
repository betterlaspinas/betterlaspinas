<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { translate } = useLanguage()
const { site, labels, fullLocation, formatPhoneLink } = useSiteConfig()
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ translate('section-contact') }}
        </h2>
        <NuxtLink
          to="/contact"
          class="text-primary-600 font-medium flex items-center gap-1 hover:underline"
        >
          {{ translate('btn-view-all') }} <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          v-if="site.contact.phone"
          :href="`tel:${formatPhoneLink(site.contact.phone)}`"
          class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
        >
          <div class="w-11 h-11 flex items-center justify-center bg-primary-600 text-white rounded-lg text-lg shrink-0">
            <i class="bi bi-telephone-fill" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {{ translate('contact-phone') }}
            </h3>
            <p class="text-base font-semibold text-gray-900 mb-1">
              {{ site.contact.phone }}
            </p>
            <span class="text-xs text-gray-500">
              {{ translate('contact-hours') }}
            </span>
          </div>
        </a>
        <a
          v-if="site.contact.email"
          :href="`mailto:${site.contact.email}`"
          class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
        >
          <div class="w-11 h-11 flex items-center justify-center bg-primary-600 text-white rounded-lg text-lg shrink-0">
            <i class="bi bi-envelope-fill" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {{ translate('contact-email') }}
            </h3>
            <p class="text-base font-semibold text-gray-900 mb-1">
              {{ site.contact.email }}
            </p>
            <span class="text-xs text-gray-500">
              {{ translate('contact-response') }}
            </span>
          </div>
        </a>
        <div class="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl">
          <div class="w-11 h-11 flex items-center justify-center bg-primary-600 text-white rounded-lg text-lg shrink-0">
            <i class="bi bi-geo-alt-fill" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {{ translate('contact-address') }}
            </h3>
            <p class="text-base font-semibold text-gray-900 mb-1">
              {{ labels.hallName }}
            </p>
            <span class="text-xs text-gray-500">
              {{ fullLocation }} {{ site.contact.postalCode }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
