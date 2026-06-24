<script setup lang="ts">
import type { CarouselImage } from '@/components/ui/ImageCarousel.vue'
import { useConfig } from '@/composables/useConfig'

const { tourism, lguName } = useConfig()

const carouselImages = computed<CarouselImage[]>(() =>
  tourism.attractions.map(attraction => ({
    src: attraction.image || '',
    alt: attraction.name,
  })),
)
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text + CTA -->
        <div class="lg:text-left text-center">
          <span class="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="bi bi-geo-alt-fill" /> Tourism
          </span>

          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Discover {{ lguName }}
          </h2>

          <p class="text-lg text-gray-600 mb-4 leading-relaxed">
            Experience the rich cultural heritage and vibrant community of
            {{ lguName }}. From historic landmarks to local culinary gems, our
            city offers a unique blend of tradition and modern charm.
          </p>

          <p class="text-gray-500 mb-8 leading-relaxed">
            Explore our attractions, festivals, and hidden treasures that make
            {{ lguName }} a destination worth visiting.
          </p>

          <!-- Mini Stats -->
          <div class="flex gap-8 mb-8 lg:justify-start justify-center">
            <div>
              <span class="block text-2xl font-bold text-primary-600">
                {{ tourism.attractions.length }}
              </span>
              <span class="block text-sm text-gray-500">Attractions</span>
            </div>
            <div>
              <span class="block text-2xl font-bold text-primary-600">
                {{ tourism.events.length }}
              </span>
              <span class="block text-sm text-gray-500">Annual Events</span>
            </div>
            <div>
              <span class="block text-2xl font-bold text-primary-600">
                {{ tourism.categories.length - 1 }}
              </span>
              <span class="block text-sm text-gray-500">Categories</span>
            </div>
          </div>

          <!-- CTA -->
          <NuxtLink
            to="/tourism"
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-700 hover-btn-premium"
          >
            Explore Tourism <i class="bi bi-arrow-right" />
          </NuxtLink>
        </div>

        <!-- Right: Image Carousel -->
        <div>
          <UiImageCarousel :images="carouselImages" :interval="4000" />
        </div>
      </div>
    </div>
  </section>
</template>
