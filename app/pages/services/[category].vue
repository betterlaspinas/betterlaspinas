<script setup lang="ts">
usePageOgImage()

const route = useRoute()
const categorySlug = route.params.category as string

// Service Categories are sourced canonically (categories.json + services.json)
// through the configHelper accessors — there is no other source. The
// `isCanonicalCategory` gate keeps non-resident Categories (`government`,
// `online`, which migrate in their own slices) off this route.
const category = isCanonicalCategory(categorySlug)
  ? getCategoryBySlug(categorySlug)
  : undefined

if (!category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
    fatal: true,
  })
}

// A catalog-only Service points back at its own category page (e.g.
// /services/certificates). Treat that as "no dedicated page" so the card stays
// non-interactive, matching the original behavior. Only a real destination
// (e.g. /service-details/<id>) makes the card a link.
const categoryHref = `/services/${categorySlug}`
const services = getServicesByCategory(categorySlug).map(service => ({
  id: service.id,
  icon: service.icon,
  title: service.title,
  description: service.description,
  fee: service.fee,
  time: service.processingTime,
  link: service.url && service.url !== categoryHref ? service.url : undefined,
}))

// Responsible Offices are first-class entities (#185) resolved from the
// Category's Services via `providedBy` — Office <-> Category is many-to-many
// through the Services.
const offices = getOfficesForCategory(categorySlug).map(office => ({
  title: office.name,
  icon: office.icon,
  description: office.description,
  link: office.link,
}))
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
              <i :class="`bi ${service.icon} text-primary-600`" />
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

    <!-- Responsible Offices -->
    <section
      v-if="offices.length > 0"
      class="py-12 bg-gray-50"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          Responsible Offices
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UiCard
            v-for="office in offices"
            :key="office.title"
            :to="office.link"
            padding="p-4"
            interactive
            class="flex items-center gap-4"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i :class="`bi ${office.icon}`" />
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
        </div>
      </div>
    </section>
  </div>
</template>
