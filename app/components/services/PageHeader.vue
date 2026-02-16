<script setup lang="ts">
interface Props {
  badgeIcon: string
  badgeText: string
  title: string
  description: string
  searchPlaceholder?: string
}

withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Search services (e.g., birth certificate, business permit)',
})
</script>

<template>
  <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto">
        <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <i class="bi" :class="[badgeIcon]" /> {{ badgeText }}
        </span>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title }}
        </h1>
        <p class="text-lg text-white/90 mb-8">
          {{ description }}
        </p>
        <!-- Search Box -->
        <div class="max-w-xl mx-auto">
          <div class="relative flex items-center">
            <i class="bi bi-search absolute left-4 text-gray-400 z-10 pointer-events-none" />
            <ServicesSearch
              :placeholder="searchPlaceholder"
              class="w-full [&_input]:pl-12 [&_input]:pr-4 [&_input]:py-4 [&_input]:rounded-xl [&_input]:text-base [&_input]:border-0 [&_input]:shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
