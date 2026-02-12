<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { history, lguName } = useSiteConfig()

useHead({
  title: 'History',
})
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'History' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-clock-history" /> Heritage
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            History of {{ lguName }}
          </h1>
          <p class="text-lg text-white/90">
            Tracing the roots and evolution of our community
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <!-- Featured Image -->
          <div v-if="history.imageUrl" class="h-64 sm:h-96 w-full relative">
            <img
              :src="history.imageUrl"
              :alt="`Historical image of ${lguName}`"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <span class="text-white text-sm font-medium opacity-90">Historical Archive</span>
            </div>
          </div>

          <div class="p-8 md:p-12">
            <div class="prose prose-lg max-w-none text-gray-700">
              <!-- Check for content structure -->
              <div v-if="history.content" class="whitespace-pre-line">
                {{ history.content }}
              </div>
              <div v-else class="text-center italic text-gray-500 py-12">
                <i class="bi bi-journal-x text-4xl mb-4 block opacity-50" />
                Historical data is currently being updated.
              </div>
            </div>

            <!-- Timeline if available (placeholder structure as not in simple config) -->
            <div v-if="history.timeline && history.timeline.length > 0" class="mt-12 pt-12 border-t border-gray-100">
              <h3 class="text-2xl font-bold text-gray-900 mb-8">
                Key Milestones
              </h3>
              <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                <!-- Timeline items logic would go here if data structure supported it -->
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/about" class="text-primary-600 font-medium hover:underline inline-flex items-center gap-2">
            <i class="bi bi-arrow-left" /> Back to About
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
