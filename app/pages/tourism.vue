<script setup lang="ts">
const { lguName, tourism, labels } = useConfig()

useHead({
  title: 'Tourism',
})

const activeCategory = ref('all')

const filteredAttractions = computed(() => {
  if (activeCategory.value === 'all') {
    return tourism.value.attractions
  }
  return tourism.value.attractions.filter(
    (a: any) => a.category === activeCategory.value,
  )
})
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'Tourism' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-geo-alt-fill" /> Explore
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover {{ lguName }}
          </h1>
          <p class="text-lg text-white/90">
            Explore the beauty, culture, and hospitality of our
            {{ labels.lguTypeLabel.toLowerCase() }}
          </p>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="py-8 bg-gray-50 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in tourism.categories"
            :key="category.id"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
            :class="
              activeCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
            "
            @click="activeCategory = category.id"
          >
            <i :class="`bi ${category.icon}`" />
            {{ category.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Attractions Grid -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
          >
            <i class="bi bi-pin-map-fill" /> Places to Visit
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            Tourist Attractions
          </h2>
        </div>

        <div
          v-if="filteredAttractions.length === 0"
          class="text-center py-12 text-gray-500"
        >
          <i class="bi bi-geo-alt text-4xl mb-4 block opacity-50" />
          <p>No attractions found in this category.</p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="attraction in filteredAttractions"
            :key="attraction.id"
            class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <!-- Image or Placeholder -->
            <div
              class="h-48 bg-gray-100 flex items-center justify-center"
            >
              <img
                v-if="attraction.image"
                :src="attraction.image"
                :alt="attraction.name"
                class="w-full h-full object-cover"
              >
              <div v-else class="text-center text-gray-400">
                <i
                  class="text-5xl"
                  :class="`bi ${tourism.categories.find((c: any) => c.id === attraction.category)?.icon || 'bi-image'}`"
                />
                <p class="text-sm mt-2">
                  No image
                </p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                >
                  <i
                    :class="`bi ${tourism.categories.find((c: any) => c.id === attraction.category)?.icon || 'bi-geo'}`"
                  />
                  {{
                    tourism.categories.find((c: any) => c.id === attraction.category)
                      ?.label || 'Other'
                  }}
                </span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                {{ attraction.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ attraction.description }}
              </p>
              <p class="text-xs text-gray-500 flex items-center gap-1">
                <i class="bi bi-geo-alt" /> {{ attraction.location }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
          >
            <i class="bi bi-calendar-event-fill" /> Celebrations
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            Events & Fiestas
          </h2>
          <p class="text-gray-500 mt-2">
            Experience the vibrant culture and traditions
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div
            v-for="event in tourism.events"
            :key="event.id"
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-xl mb-4"
            >
              <i class="bi bi-calendar-heart" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ event.name }}
            </h3>
            <p class="text-primary-600 font-medium text-sm mb-3">
              <i class="bi bi-calendar3 mr-1" /> {{ event.date }}
            </p>
            <p class="text-gray-600 text-sm mb-3">
              {{ event.description }}
            </p>
            <p class="text-xs text-gray-500 flex items-center gap-1">
              <i class="bi bi-geo-alt" /> {{ event.location }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Travel Info Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
          >
            <i class="bi bi-info-circle-fill" /> Plan Your Visit
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            Travel Information
          </h2>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <!-- How to Get There -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div
              class="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl text-xl mb-4"
            >
              <i class="bi bi-signpost-split" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              How to Get There
            </h3>
            <p class="text-gray-600 text-sm">
              {{ tourism.travelInfo.howToGetThere }}
            </p>
          </div>

          <!-- Best Time to Visit -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div
              class="w-12 h-12 flex items-center justify-center bg-green-50 text-green-600 rounded-xl text-xl mb-4"
            >
              <i class="bi bi-sun" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Best Time to Visit
            </h3>
            <p class="text-gray-600 text-sm">
              {{ tourism.travelInfo.bestTimeToVisit }}
            </p>
          </div>

          <!-- Travel Tips -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div
              class="w-12 h-12 flex items-center justify-center bg-yellow-50 text-yellow-600 rounded-xl text-xl mb-4"
            >
              <i class="bi bi-lightbulb" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Travel Tips
            </h3>
            <ul class="text-gray-600 text-sm space-y-2">
              <li
                v-for="tip in tourism.travelInfo.tips"
                :key="tip"
                class="flex items-start gap-2"
              >
                <i
                  class="bi bi-check-circle-fill text-green-500 mt-0.5"
                />
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 bg-primary-50">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Ready to explore {{ lguName }}?
        </h3>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Contact our local tourism office for more information and assistance
          in planning your visit.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-700"
        >
          Contact Us <i class="bi bi-arrow-right" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
