<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'

const { lguName, labels, legislative } = useConfig()

useHead({
  title: 'Ordinance Framework',
})

// Get ordinance categories and items from config
const ordinanceCategories = computed(
  () => legislative.ordinances.categories,
)
const sampleOrdinances = computed(() =>
  legislative.ordinances.items.map((ord: any) => ({
    no: ord.number,
    title: ord.title,
    date: ord.date,
  })),
)
</script>

<template>
  <div>
    <Breadcrumbs
      :items="[
        { label: 'Legislative', href: '/legislative' },
        { label: 'Ordinance Framework' },
      ]"
    />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-journal-text" /> Legislative
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ordinance Framework
          </h1>
          <p class="text-lg text-white/90">
            {{ labels.deptPrefix }} ordinances enacted by the
            {{ labels.legislativeBody }} ng {{ lguName }}
          </p>
        </div>
      </div>
    </section>

    <!-- About Ordinances -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <UiCard padding="p-8" class="max-w-3xl mx-auto">
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i class="bi bi-info-circle" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                What is an Ordinance?
              </h3>
              <p class="text-gray-600 mb-4">
                A {{ labels.lguTypeLabel.toLowerCase() }} ordinance is a local
                law enacted by the {{ labels.legislativeBody }} (
                {{ labels.legislativeBodyAbbr }}) that governs the
                {{ labels.lguTypeLabel.toLowerCase() }} and its residents.
                Ordinances have the force and effect of law within the
                territorial jurisdiction of the
                {{ labels.lguTypeLabel.toLowerCase() }}.
              </p>
              <p class="text-gray-600">
                Ordinances may cover various subjects including but not
                limited to: taxation, business regulations, public safety,
                environmental protection, traffic management, and zoning.
              </p>
            </div>
          </div>
        </UiCard>
      </div>
    </section>

    <!-- Ordinance Categories -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Ordinance Categories
          </h2>
        </div>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
        >
          <UiCard
            v-for="cat in ordinanceCategories"
            :key="cat.id"
            padding="p-4"
            class="flex items-center gap-2 text-center justify-center"
          >
            <i :class="`bi ${cat.icon} text-primary-600`" />
            <span class="text-sm font-medium text-gray-700">
              {{ cat.label }}
            </span>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Sample Ordinances Table -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Sample Ordinances
          </h2>
          <p class="text-gray-500">
            Sample ordinances — replace with actual data from your
            {{ labels.legislativeBody }}
          </p>
        </div>
        <UiCard padding="p-0" class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  style="width: 120px"
                >
                  Ordinance No.
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  style="width: 120px"
                >
                  Session Date
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="ord in sampleOrdinances"
                :key="ord.no"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 text-sm text-gray-900 font-medium"
                >
                  {{ ord.no }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ ord.title }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ ord.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </UiCard>
        <div class="text-center mt-6">
          <p
            class="text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <i class="bi bi-info-circle" /> Update this section with
            actual ordinances from your LGU's
            {{ labels.legislativeBody }}
            website.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
