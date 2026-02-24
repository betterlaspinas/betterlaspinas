<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
const { lguName } = useConfig()
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ translate('section-updates') }}
          </h2>
        </div>
        <NuxtLink
          to="/news"
          class="text-primary-600 font-medium flex items-center gap-1 hover:underline"
        >
          <span>{{ translate('btn-view-all') }}</span>
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              Announcement
            </span>
            <span class="text-gray-400 text-sm">Coming Soon</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            <NuxtLink
              to="/news"
              class="hover:text-primary-600 transition-colors"
            >
              Latest Announcements
            </NuxtLink>
          </h3>
          <p class="text-gray-500 text-sm">
            Stay tuned for the latest news and announcements from {{ lguName }}.
          </p>
        </article>
        <article class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Project
            </span>
            <span class="text-gray-400 text-sm">Coming Soon</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            <NuxtLink
              to="/news"
              class="hover:text-primary-600 transition-colors"
            >
              Infrastructure Projects
            </NuxtLink>
          </h3>
          <p class="text-gray-500 text-sm">
            Updates on ongoing and upcoming infrastructure projects in {{ lguName }}.
          </p>
        </article>
        <article class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
              Advisory
            </span>
            <span class="text-gray-400 text-sm">Coming Soon</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            <NuxtLink
              to="/news"
              class="hover:text-primary-600 transition-colors"
            >
              Public Advisories
            </NuxtLink>
          </h3>
          <p class="text-gray-500 text-sm">
            Important advisories and notices for residents of {{ lguName }}.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
