<script setup lang="ts">
import LeafletMap from '@/components/home/LeafletMap.vue'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { site, lguName, fullLocation, labels } = useSiteConfig()
const coords = [site.coordinates.lat, site.coordinates.lng] as [number, number]
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-xl font-bold text-gray-900 m-0">
          Weather and Map of {{ lguName }}
        </h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-stretch">
        <!-- Weather Column -->
        <div class="flex flex-col">
          <div id="weather-container" class="h-full">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div class="flex items-start gap-4 pb-4">
                <i class="bi bi-cloud-sun text-5xl text-primary-600 leading-none opacity-90" />
                <div class="flex-1">
                  <span class="text-4xl font-bold text-gray-900 leading-none tracking-tight">
                    28°C
                  </span>
                  <p class="text-[0.9375rem] text-gray-800 font-medium mt-1.5 mb-1">
                    Partly Cloudy
                  </p>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <i class="bi bi-geo-alt text-primary-600 text-[0.6875rem]" />
                    {{ fullLocation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Column -->
        <div class="flex flex-col">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div
              id="map-container"
              class="h-[300px] w-full relative z-0"
            >
              <ClientOnly>
                <LeafletMap :coords="coords" :popup-text="labels.hallName" />
                <template #fallback>
                  <div class="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
                    Loading map...
                  </div>
                </template>
              </ClientOnly>
            </div>
            <p class="text-sm text-gray-500 p-4 m-0 flex items-center gap-1.5">
              <i class="bi bi-geo-alt text-primary-600" />
              {{ labels.hallName }}, {{ fullLocation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
