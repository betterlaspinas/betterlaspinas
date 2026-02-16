<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const service = getServiceDetail(slug)

if (!service) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service not found',
    fatal: true,
  })
}

useHead({
  title: service.title || 'Service Details',
  meta: [
    {
      name: 'description',
      content: service.description,
    },
  ],
})

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div>
    <UiBreadcrumbs
      :items="[
        { label: 'Services', href: '/services' },
        { label: service.category, href: service.categoryLink },
        { label: service.title },
      ]"
    />

    <ServicesPageHeader
      :badge-icon="service.badgeIcon"
      :badge-text="service.badgeText"
      :title="service.fullTitle"
      :description="service.description"
      search-placeholder="Search other services..."
    />

    <!-- Quick Stats -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="stat in service.quickStats"
            :key="stat.label"
            class="bg-white border border-gray-200 rounded-xl p-4 text-center"
          >
            <i
              :class="`bi ${stat.icon} text-2xl text-primary-600 mb-2 block`"
            />
            <h4 class="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {{ stat.label }}
            </h4>
            <p class="font-semibold text-gray-900">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Step-by-Step Process -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <i class="bi bi-list-ol text-primary-600" /> Step-by-Step Process
          </h2>
          <p class="text-gray-500">
            Follow these steps to complete this service
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div
            v-for="(step, stepIndex) in service.processSteps"
            :key="step.title"
            class="relative bg-white border rounded-xl p-6" :class="[
              step.isFinal ? 'border-green-300 bg-green-50' : 'border-gray-200',
            ]"
          >
            <span
              class="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold" :class="[
                step.isFinal ? 'bg-green-600 text-white' : 'bg-primary-600 text-white',
              ]"
            >
              {{ stepIndex + 1 }}
            </span>
            <h4 class="font-semibold text-gray-900 mb-2">
              {{ step.title }}
            </h4>
            <p class="text-sm text-gray-500">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements & Info -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="lg:col-span-2 space-y-6">
            <!-- Requirements -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="bi bi-clipboard-check text-primary-600" /> Requirements
              </h2>
              <div
                v-for="req in service.requirements"
                :key="req.title"
                class="bg-white border border-gray-200 rounded-xl p-4 mb-4"
              >
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i :class="`bi ${req.icon} text-primary-600`" /> {{ req.title }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="item in req.items"
                    :key="item"
                    class="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <i class="bi bi-check-circle-fill text-primary-600 mt-0.5" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- FAQs -->
            <div v-if="service.faqs.length > 0">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="bi bi-question-circle text-primary-600" /> Frequently Asked Questions
              </h2>
              <div class="space-y-2">
                <div
                  v-for="(faq, faqIndex) in service.faqs"
                  :key="faq.question"
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    class="w-full p-4 text-left font-medium text-gray-900 flex items-center justify-between hover:bg-gray-50"
                    @click="toggleFaq(faqIndex)"
                  >
                    <span>{{ faq.question }}</span>
                    <i
                      class="bi bi-chevron-down transition-transform" :class="[
                        openFaq === faqIndex ? 'rotate-180' : '',
                      ]"
                    />
                  </button>
                  <div
                    v-if="openFaq === faqIndex"
                    class="px-4 pb-4 text-sm text-gray-600"
                  >
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-4">
            <div class="bg-white border border-gray-200 rounded-xl p-6">
              <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i class="bi bi-building text-primary-600" /> Office Information
              </h4>
              <p class="font-medium text-gray-900">
                {{ service.office.name }}
              </p>
              <p class="text-sm text-gray-600 mt-2">
                {{ service.office.location }}
              </p>
              <p class="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <i class="bi bi-telephone" /> {{ service.office.phone }}
              </p>
              <p class="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <i class="bi bi-clock" /> {{ service.office.hours }}
              </p>
            </div>

            <div
              v-if="service.relatedServices.length > 0"
              class="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i class="bi bi-link-45deg text-primary-600" /> Related Services
              </h4>
              <ul class="space-y-2">
                <li v-for="related in service.relatedServices" :key="related.title">
                  <NuxtLink
                    :to="related.link"
                    class="text-primary-600 hover:underline text-sm"
                  >
                    {{ related.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="bg-white border border-gray-200 rounded-xl p-6">
              <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i class="bi bi-info-circle text-primary-600" /> Need Help?
              </h4>
              <p class="text-sm text-gray-600 mb-4">
                Contact us for assistance with this service.
              </p>
              <NuxtLink
                to="/contact"
                class="block w-full text-center bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                no-prefetch
              >
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
