<script setup lang="ts">
const route = useRoute()
const category = route.params.category as string
const categoryContent = getCategoryContent(category)

if (!categoryContent) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
    fatal: true,
  })
}

useHead({
  title: categoryContent.name || 'Service Category',
  meta: [
    {
      name: 'description',
      content: categoryContent.description,
    },
  ],
})
</script>

<template>
  <div>
    <UiBreadcrumbs
      :items="[
        { label: 'Services', href: '/services' },
        { label: categoryContent.name },
      ]"
    />

    <ServicesPageHeader
      :badge-icon="categoryContent.icon"
      :badge-text="categoryContent.badgeText"
      :title="categoryContent.name"
      :description="categoryContent.description"
    />

    <!-- Services Grid -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="service in categoryContent.services"
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
      v-if="categoryContent.offices.length > 0"
      class="py-12 bg-gray-50"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          Responsible Offices
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UiCard
            v-for="office in categoryContent.offices.filter(o => o.hidden !== true)"
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
