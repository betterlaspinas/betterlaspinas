<script setup lang="ts">
const { translate } = useLanguage()
const { lguName, labels, faq, getSiteTitle, getVolunteerEmail, siteBrandName } = useConfig()
const siteTitle = computed(() => getSiteTitle())
const volunteerEmail = computed(() => getVolunteerEmail())

useHead({
  title: 'FAQ',
})

// Helper to interpolate template variables in FAQ content
function interpolateFAQContent(
  content: string,
  vars: Record<string, string>,
): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) =>
      text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
    content,
  )
}

const templateVars = computed(() => ({
  hallName: labels.value.hallName,
  lguName: lguName.value,
  siteTitle: siteTitle.value,
  siteBrandName: siteBrandName.value,
  volunteerEmail: volunteerEmail.value,
}))

const faqCategories = computed(() =>
  faq.categories.map((category: any) => ({
    id: category.id,
    icon: category.icon,
    title: translate(category.titleKey) || category.titleFallback,
    items: category.items.map((item: any) => ({
      id: item.id,
      q: interpolateFAQContent(item.question, templateVars.value),
      a: interpolateFAQContent(item.answer, templateVars.value),
    })),
  })),
)
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'FAQ' }]" />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-question-circle-fill" /> FAQ
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ translate('faq-title') || 'Frequently Asked Questions' }}
          </h1>
          <p class="text-lg text-white/90">
            {{
              translate('faq-subtitle')
                || 'Find answers to common questions about city services'
            }}
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto space-y-8">
          <UiCard
            v-for="category in faqCategories"
            :key="category.id"
            padding="p-0"
            class="overflow-hidden mb-8 last:mb-0"
          >
            <div
              class="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50"
            >
              <i
                :class="`bi ${category.icon} text-2xl text-primary-600`"
              />
              <h2 class="text-xl font-bold text-gray-900 m-0">
                {{ category.title }}
              </h2>
            </div>
            <div class="divide-y divide-gray-100">
              <UiAccordion
                v-for="item in category.items"
                :key="item.id"
                :title="item.q"
                class="border-0 rounded-none border-b last:border-b-0"
              >
                <div class="text-gray-600 leading-relaxed">
                  <div v-html="item.a" />
                </div>
              </UiAccordion>
            </div>
          </UiCard>

          <!-- Still Have Questions -->
          <UiAlert
            variant="primary"
            layout="col"
            icon="bi-chat-dots-fill"
          >
            <template #title>
              {{ translate('faq-still-questions') || 'Still have questions?' }}
            </template>
            <p class="mb-6">
              {{
                translate('faq-contact-help')
                  || "If you didn't find the answer you were looking for, please don't hesitate to contact us."
              }}
            </p>
            <UiButton to="/contact" variant="solid" color="primary">
              Contact Us <i class="bi bi-arrow-right" />
            </UiButton>
          </UiAlert>
        </div>
      </div>
    </section>
  </div>
</template>
