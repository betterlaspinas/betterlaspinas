<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'

const config = useSiteConfig()
const lguName = computed(() => config.lguName)
const labels = computed(() => config.labels)
const legislative = computed(() => config.legislative)

useHead({
  title: 'Resolution Framework',
})

// Get resolution types and items from config
const resolutionTypes = computed(() => legislative.value.resolutions.types)
const sampleResolutions = computed(() =>
  legislative.value.resolutions.items.map((res: any) => ({
    no: res.number,
    title: res.title,
    date: res.date,
  })),
)
</script>

<template>
  <div>
    <Breadcrumbs
      :items="[
        { label: 'Legislative', href: '/legislative' },
        { label: 'Resolution Framework' },
      ]"
    />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-file-earmark-text" /> Legislative
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Resolution Framework
          </h1>
          <p class="text-lg text-white/90">
            Resolutions passed by the {{ labels.legislativeBody }} ng
            {{ lguName }}
          </p>
        </div>
      </div>
    </section>

    <!-- About Resolutions -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div
          class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0"
            >
              <i class="bi bi-info-circle" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                What is a Resolution?
              </h3>
              <p class="text-gray-600 mb-4">
                A resolution is a formal expression of the opinion or will
                of the {{ labels.legislativeBody }}. Unlike ordinances,
                resolutions do not have the force and effect of law but
                serve as official statements of the legislative body.
              </p>
              <p class="text-gray-600">
                Resolutions are commonly used for: commendations, requests
                to higher government agencies, expressions of support or
                opposition, and administrative matters of the
                {{ labels.legislativeBody }}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resolution Types -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Types of Resolutions
          </h2>
        </div>
        <div
          class="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
          <div
            v-for="type in resolutionTypes"
            :key="type.id"
            class="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full"
          >
            <i :class="`bi ${type.icon} text-primary-600`" />
            <span class="text-sm font-medium text-gray-700">
              {{ type.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sample Resolutions Table -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Sample Resolutions
          </h2>
          <p class="text-gray-500">
            Sample resolutions — replace with actual data from your
            {{ labels.legislativeBody }}
          </p>
        </div>
        <div class="overflow-x-auto">
          <table
            class="w-full bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  style="width: 130px"
                >
                  Resolution No.
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
                v-for="res in sampleResolutions"
                :key="res.no"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 text-sm text-gray-900 font-medium"
                >
                  {{ res.no }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ res.title }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ res.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mt-6">
          <p
            class="text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <i class="bi bi-info-circle" /> Update this section with
            actual resolutions from your LGU's
            {{ labels.legislativeBody }}
            website.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
