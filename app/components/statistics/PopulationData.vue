<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'
import { computed } from 'vue'

const props = defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
}>()

const allBarangays = computed(() =>
  props.statisticsDetailed.barangayPopulation.map(barangayEntry => ({
    rank: barangayEntry.rank,
    name: barangayEntry.name,
    pop: barangayEntry.population,
    pct: barangayEntry.percentage,
  })),
)

const barangayData = computed(() => allBarangays.value.slice(0, 10))
</script>

<template>
  <div>
    <!-- Population Trends -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-graph-up" /> Growth
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Population Trends
          </h2>
          <p class="text-gray-500">
            Population growth from 2020 to 2024
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6 mb-8">
          <div class="text-center p-4 bg-white border border-gray-200 rounded-xl">
            <span class="text-sm text-gray-500">2020</span>
            <span class="block text-2xl font-bold text-gray-900">
              {{ statisticsDetailed.populationGrowth?.year2020?.toLocaleString() }}
            </span>
          </div>
          <div class="flex items-center">
            <i class="bi bi-arrow-right text-2xl text-gray-400" />
          </div>
          <div class="text-center p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <span class="text-sm text-primary-600">2024</span>
            <span class="block text-2xl font-bold text-primary-700">
              {{ statisticsDetailed.populationGrowth?.year2024?.toLocaleString() }}
            </span>
          </div>
          <div class="text-center p-4 bg-green-50 border border-green-200 rounded-xl">
            <span class="text-sm text-green-600">Growth</span>
            <span class="block text-2xl font-bold text-green-700">
              {{ statisticsDetailed.populationGrowth?.growthRate }}
            </span>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <ClientOnly>
            <ChartsPopulationTrendsChart />
          </ClientOnly>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://psa.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            Philippine Statistics Authority (PSA)
          </a>
        </p>
      </div>
    </section>

    <!-- Population Distribution -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-pie-chart-fill" /> Distribution
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Population by Barangay
          </h2>
          <p class="text-gray-500">
            2024 Census of Population
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <ClientOnly>
              <ChartsPopulationDistributionChart />
            </ClientOnly>
          </div>
          <div class="space-y-3">
            <div
              v-for="barangay in barangayData"
              :key="barangay.rank"
              class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <span
                class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                :class="barangay.rank <= 3 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'"
              >
                #{{ barangay.rank }}
              </span>
              <span class="font-medium text-gray-900 w-32">
                {{ barangay.name }}
              </span>
              <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary-500 rounded-full" :style="{ width: `${barangay.pct}%` }" />
              </div>
              <span class="text-sm font-semibold text-gray-700 w-16 text-right">
                {{ barangay.pop.toLocaleString() }}
              </span>
            </div>
          </div>
        </div>

        <details class="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <summary class="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 flex items-center gap-2">
            <i class="bi bi-chevron-down" /> View all 20 barangays
          </summary>
          <div class="p-4 border-t border-gray-200 space-y-3">
            <div
              v-for="barangay in allBarangays.slice(10)"
              :key="barangay.rank"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold bg-gray-100 text-gray-600">
                #{{ barangay.rank }}
              </span>
              <span class="font-medium text-gray-900 w-32">
                {{ barangay.name }}
              </span>
              <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary-400 rounded-full" :style="{ width: `${barangay.pct}%` }" />
              </div>
              <span class="text-sm font-semibold text-gray-700 w-16 text-right">
                {{ barangay.pop.toLocaleString() }}
              </span>
            </div>
          </div>
        </details>

        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://psa.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            Philippine Statistics Authority (PSA)
          </a>
          - 2024 Census
        </p>
      </div>
    </section>

    <!-- Bar Chart Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-bar-chart-fill" /> Visual
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Population Bar Chart
          </h2>
          <p class="text-gray-500">
            Comparative view of all 20 barangays
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <ClientOnly>
            <ChartsBarangayPopulationChart />
          </ClientOnly>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://psa.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            Philippine Statistics Authority (PSA)
          </a>
          - 2024 Census
        </p>
      </div>
    </section>
  </div>
</template>
