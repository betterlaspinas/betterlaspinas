<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { translate } = useLanguage()
const { officials, labels, formatPhoneLink } = useSiteConfig()

const leader = computed(() => officials.executive.find(
  o => o.position === 'mayor' || o.position === 'governor',
))

const viceLeader = computed(() => officials.executive.find(
  o => o.position === 'vice_mayor' || o.position === 'vice_governor',
))
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ translate('section-leadership') }}
        </h2>
        <NuxtLink
          to="/government"
          class="text-primary-600 font-medium flex items-center gap-1 hover:underline"
        >
          <span>{{ translate('btn-view-officials') }}</span>
          <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Leader Card -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-md">
          <div class="bg-primary-600 text-white p-6 text-center">
            <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
              {{ labels.lguTypeLabel }} {{ labels.leaderTitle }}
            </span>
            <h3 class="text-xl font-semibold">
              {{ leader?.name ? `Hon. ${leader.name}` : 'To be updated' }}
            </h3>
          </div>
          <div class="p-6 space-y-3">
            <a
              v-if="leader?.email"
              :href="`mailto:${leader.email}`"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <i class="bi bi-envelope text-primary-600" />
              {{ leader.email }}
            </a>
            <a
              v-if="leader?.phone"
              :href="`tel:${formatPhoneLink(leader.phone)}`"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <i class="bi bi-telephone text-primary-600" />
              {{ leader.phone }}
            </a>
          </div>
        </div>

        <!-- Vice Leader Card -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-md">
          <div class="bg-primary-600 text-white p-6 text-center">
            <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
              {{ labels.lguTypeLabel }} {{ labels.viceLeaderTitle }}
            </span>
            <h3 class="text-xl font-semibold">
              {{ viceLeader?.name ? `Hon. ${viceLeader.name}` : 'To be updated' }}
            </h3>
          </div>
          <div class="p-6 space-y-3">
            <a
              v-if="viceLeader?.email"
              :href="`mailto:${viceLeader.email}`"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <i class="bi bi-envelope text-primary-600" />
              {{ viceLeader.email }}
            </a>
            <a
              v-if="viceLeader?.phone"
              :href="`tel:${formatPhoneLink(viceLeader.phone)}`"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <i class="bi bi-telephone text-primary-600" />
              {{ viceLeader.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
