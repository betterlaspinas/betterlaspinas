<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

usePageOgImage()

// Barangay-tier responsible-body directory (ADR-0004): a Service with
// `providedByBarangay: true` links here rather than to one record — there are
// 20 Barangays, so the destination is the whole directory. Reads through the
// same `getSubdivisionsConfig` accessor as `government/index.vue`'s
// Subdivisions section, so the two never drift.
const { lguName, labels, subdivisions, formatPhoneLink } = useConfig()
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: labels.subdivisionTypePlural }]" />

    <UiPageHero
      badge-icon="bi-geo-alt-fill"
      :badge-text="labels.subdivisionTypePlural"
      :title="`${labels.subdivisionTypePlural} of ${lguName}`"
      :description="`Barangay-level services (clearances, IDs, certificates of residency) are obtained at your own ${labels.subdivisionType} Hall. Find yours below.`"
    />

    <section class="py-12">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          :title="`${subdivisions.count} ${labels.subdivisionTypePlural}`"
          :description="`${labels.subdivisionTypePlural} serving our community`"
          badge-icon="bi-geo-alt-fill"
          :badge-text="labels.subdivisionTypePlural"
          badge-class="bg-primary-600 text-white"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <UiCard
            v-for="item in subdivisions.items"
            :key="item.id"
            :href="item.phone ? `tel:${formatPhoneLink(item.phone)}` : '#'"
            padding="p-4"
            interactive
          >
            <div class="flex items-center gap-3 mb-2">
              <i class="bi bi-geo-alt-fill text-primary-600" />
              <span class="font-semibold text-gray-900">
                {{ item.name }}
              </span>
            </div>
            <div class="text-sm text-gray-500">
              <span class="block">{{ item.leader }}</span>
              <span v-if="item.phone" class="flex items-center gap-1 mt-1 text-primary-600">
                <i class="bi bi-telephone" /> {{ item.phone }}
              </span>
            </div>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
