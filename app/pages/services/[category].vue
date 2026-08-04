<script setup lang="ts">
usePageOgImage()

const route = useRoute()

// Page resolution lives behind the View resolver seam (ADR-0002): the facade
// does the configHelper lookups and shaping; the page only renders and guards.
const view = categoryView(route.params.category as string)
if (!view) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
    fatal: true,
  })
}

const { category, services, offices, agencies, barangay } = view
const hasResponsibleBody = offices.length > 0 || agencies.length > 0 || !!barangay
</script>

<template>
  <div>
    <UiBreadcrumbs
      :items="[
        { label: 'Services', href: '/services' },
        { label: category.name },
      ]"
    />

    <UiSectionHeader
      :badge-icon="category.icon"
      :badge-text="category.badgeText"
      :title="category.name"
      :description="category.description"
    />

    <!-- Services Grid -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="service in services"
            :key="service.id"
            :to="service.link"
            :interactive="!!service.link"
            class="h-full"
          >
            <h3
              class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"
            >
              <i class="bi text-primary-600" :class="service.icon" />
              {{ service.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              {{ service.description }}
            </p>
            <div class="flex gap-4 text-sm text-gray-600">
              <span>
                <strong>Fee:</strong> {{ service.fee }}
              </span>
              <span>
                <strong>Time:</strong> {{ service.time }}
              </span>
            </div>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Responsible Offices & Agencies -->
    <section
      v-if="hasResponsibleBody"
      class="py-12 bg-gray-50"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          Where to Get This
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UiCard
            v-for="office in offices"
            :key="`office-${office.title}`"
            :to="office.link"
            padding="p-4"
            interactive
            class="flex items-center gap-4"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i class="bi" :class="office.icon" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900">
                {{ office.title }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ office.description }}
              </p>
            </div>
            <i class="bi bi-arrow-right text-gray-400" />
          </UiCard>

          <UiCard
            v-for="agency in agencies"
            :key="`agency-${agency.title}`"
            :href="agency.phone ? `tel:${agency.phone.replace(/[^0-9+]/g, '')}` : undefined"
            padding="p-4"
            :interactive="!!agency.phone"
            class="flex items-center gap-4"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i class="bi" :class="agency.icon" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900">
                {{ agency.title }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ agency.description }}
              </p>
              <p v-if="agency.phone" class="text-sm text-primary-600 mt-1">
                <i class="bi bi-telephone" /> {{ agency.phone }}
              </p>
            </div>
          </UiCard>

          <UiCard
            v-if="barangay"
            :to="barangay.link"
            padding="p-4"
            interactive
            class="flex items-center gap-4"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i class="bi" :class="barangay.icon" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900">
                {{ barangay.title }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ barangay.description }}
              </p>
            </div>
            <i class="bi bi-arrow-right text-gray-400" />
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
