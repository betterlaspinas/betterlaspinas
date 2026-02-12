<script setup lang="ts">
const { hotlines, formatPhoneLink } = useSiteConfig()

const displayHotlines = computed(() => {
  return [
    ...hotlines.emergency.slice(0, 4),
    ...hotlines.medical.slice(0, 1),
    ...hotlines.government.slice(0, 1),
  ].filter(h => h.number)
})
</script>

<template>
  <div v-if="displayHotlines.length === 0" class="bg-linear-to-br from-red-600 to-red-700 text-white py-2 text-[0.8125rem]">
    <div class="container mx-auto px-4">
      <div class="flex items-center gap-6 flex-wrap md:justify-start justify-center">
        <div class="flex items-center gap-4 flex-wrap md:justify-start justify-center">
          <span class="inline-flex items-center gap-1 text-white bg-white/15 px-2.5 py-1 rounded-full whitespace-nowrap">
            <i class="bi bi-telephone-fill text-xs" />
            <span>Emergency hotlines coming soon</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bg-linear-to-br from-red-600 to-red-700 text-white py-2 text-[0.8125rem]">
    <div class="container mx-auto px-4">
      <div class="flex items-center gap-6 flex-wrap md:justify-start justify-center">
        <div class="flex items-center gap-4 flex-wrap md:justify-start justify-center">
          <a
            v-for="hotline in displayHotlines"
            :key="hotline.id"
            :href="`tel:${formatPhoneLink(hotline.number)}`"
            class="inline-flex items-center gap-1 text-white bg-white/15 px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 hover:bg-white/30 hover:-translate-y-0.5"
          >
            <i :class="`bi ${hotline.icon} text-xs`" />
            <span>
              {{ hotline.name }}: {{ hotline.number }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
