<script setup lang="ts">
const { lguName, getVolunteerEmail } = useConfig()
const volunteerEmail = computed(() => getVolunteerEmail())

useHead({
  title: 'Accessibility',
})

const features = [
  {
    icon: 'bi-keyboard',
    title: 'Keyboard Navigation',
    desc: 'All functionality available using only a keyboard.',
  },
  {
    icon: 'bi-eye',
    title: 'Screen Reader Support',
    desc: 'Compatible with JAWS, NVDA, and VoiceOver.',
  },
  {
    icon: 'bi-type',
    title: 'Text Alternatives',
    desc: 'All images have descriptive alt text.',
  },
  {
    icon: 'bi-palette',
    title: 'Color Contrast',
    desc: 'Meets WCAG AA contrast requirements.',
  },
  {
    icon: 'bi-phone',
    title: 'Responsive Design',
    desc: 'Works on all devices and screen sizes.',
  },
  {
    icon: 'bi-hourglass-split',
    title: 'No Time Limits',
    desc: 'No time limits on reading or interacting.',
  },
]
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <UiBreadcrumbs :items="[{ label: 'Accessibility' }]" />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-universal-access" /> Accessibility
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Accessibility Statement
          </h1>
          <p class="text-lg text-white/90">
            Our commitment to digital accessibility for all citizens
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto space-y-8">
          <!-- Conformance Badge -->
          <div class="flex justify-center">
            <div
              class="inline-flex items-center gap-4 bg-green-50 border border-green-200 px-6 py-4 rounded-xl"
            >
              <i class="bi bi-check-circle-fill text-3xl text-green-600" />
              <div>
                <span
                  class="block text-xs font-semibold text-green-700 uppercase tracking-wide"
                >
                  WCAG 2.1 Level AA
                </span>
                <span class="block text-lg font-bold text-green-800">
                  Conformant
                </span>
              </div>
            </div>
          </div>

          <!-- Commitment -->
          <UiCard padding="p-8" class="rounded-2xl">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Better {{ lguName }} is committed to ensuring digital
              accessibility for people with disabilities. We are continually
              improving the user experience for everyone and applying the
              relevant accessibility standards.
            </p>
          </UiCard>

          <!-- Features Grid -->
          <UiCard padding="p-8" class="rounded-2xl">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              Accessibility Features
            </h2>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <UiIconBox
                v-for="feature in features"
                :key="feature.icon"
                :icon="feature.icon"
                :title="feature.title"
                :description="feature.desc"
              />
            </div>
          </UiCard>

          <!-- Known Limitations -->
          <UiCard padding="p-8" class="rounded-2xl">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Known Limitations
            </h2>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-gray-600">
                <i
                  class="bi bi-exclamation-circle text-yellow-500 mt-0.5"
                />
                <span>
                  Some PDF documents may not be fully accessible to screen
                  readers
                </span>
              </li>
              <li class="flex items-start gap-3 text-gray-600">
                <i
                  class="bi bi-exclamation-circle text-yellow-500 mt-0.5"
                />
                <span>
                  Some third-party embedded content may have accessibility
                  issues
                </span>
              </li>
            </ul>
          </UiCard>

          <!-- Alternative Access -->
          <UiCard padding="p-8" class="rounded-2xl">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Alternative Access
            </h2>
            <p class="text-gray-600 mb-4">
              If you encounter difficulty accessing any information, contact
              us:
            </p>
            <UiButton
              :href="`mailto:${volunteerEmail}`"
              variant="soft"
              color="primary"
              size="lg"
            >
              <i class="bi bi-envelope-fill text-xl" />
              <span>{{ volunteerEmail }}</span>
            </UiButton>
          </UiCard>

          <!-- Technical Specs -->
          <UiCard padding="p-8" class="rounded-2xl">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="tag in ['HTML', 'CSS', 'JavaScript', 'WAI-ARIA']"
                :key="tag"
                variant="gray"
                size="lg"
                :text="tag"
              />
            </div>
          </UiCard>

          <!-- Promise Card -->
          <UiAlert
            variant="primary"
            layout="row"
            icon="bi-heart-fill"
            title="Our Promise"
          >
            Better {{ lguName }} is committed to ensuring that our
            digital services are accessible to all citizens, regardless
            of ability. We view accessibility not as a feature, but as a
            fundamental right.
          </UiAlert>

          <p class="text-sm text-gray-400 text-center">
            Last updated: February 19, 2026
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
