<script setup lang="ts">
import { useSiteConfig } from '@/composables/useSiteConfig'

const { history, lguName } = useSiteConfig()
</script>

<template>
  <section v-if="history.content" class="py-20 bg-primary-900 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
      </svg>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            History of {{ lguName }}
          </h2>
          <div class="prose prose-lg prose-invert mb-8">
            <p>{{ history.content.substring(0, 300) }}...</p>
          </div>
          <NuxtLink
            to="/history"
            class="inline-flex items-center gap-2 bg-white text-primary-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100"
          >
            Read Full History <i class="bi bi-arrow-right" />
          </NuxtLink>
        </div>
        <div class="relative">
          <img
            v-if="history.imageUrl"
            :src="history.imageUrl"
            :alt="`History of ${lguName}`"
            class="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
          >
        </div>
      </div>
    </div>
  </section>
</template>
