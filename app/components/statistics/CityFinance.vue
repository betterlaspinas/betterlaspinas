<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'

defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
}>()
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10">
        <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
          <i class="bi bi-cash-stack" /> Finance
        </span>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          City Income
        </h2>
        <p class="text-gray-500">
          Financial standing for fiscal year 2023
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
          <div class="flex items-center gap-2 mb-4 opacity-80">
            <i class="bi bi-graph-up-arrow" />
            <span>Annual Income</span>
          </div>
          <div class="text-3xl font-bold mb-1">
            {{ statisticsDetailed.financialData?.annualIncome }}
          </div>
          <div class="text-sm opacity-75">
            {{ statisticsDetailed.financialData?.annualIncomeDetailed }}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center gap-2 mb-4 text-gray-500">
            <i class="bi bi-bank" />
            <span>NTA Share</span>
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{ statisticsDetailed.financialData?.iraShare }}
          </div>
          <div class="text-sm text-gray-500">
            National Tax Allotment
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center gap-2 mb-4 text-gray-500">
            <i class="bi bi-pie-chart-fill" />
            <span>NTA Dependency</span>
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{ statisticsDetailed.financialData?.iraDependency }}
          </div>
          <div class="text-sm text-gray-500">
            National Tax Share
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h4 class="font-semibold text-gray-900 mb-4">
          Income Composition
        </h4>
        <div class="h-6 bg-gray-100 rounded-full overflow-hidden flex">
          <div
            class="bg-primary-600 h-full flex items-center justify-center text-white text-xs font-medium"
            :style="{ width: statisticsDetailed.financialData?.iraDependency }"
          >
            NTA {{ statisticsDetailed.financialData?.iraDependency }}
          </div>
          <div
            class="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
            :style="{ width: statisticsDetailed.financialData?.localSourcesPercentage }"
          >
            Local {{ statisticsDetailed.financialData?.localSourcesPercentage }}
          </div>
        </div>
        <div class="flex gap-6 mt-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span class="w-3 h-3 bg-primary-600 rounded-full" />
            National Tax Allotment
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span class="w-3 h-3 bg-green-500 rounded-full" />
            Local Sources
          </div>
        </div>
      </div>

      <p class="text-sm text-gray-500 flex items-center gap-2">
        <i class="bi bi-info-circle" />
        Source:
        <a
          :href="statisticsDetailed.financialData?.sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          {{ statisticsDetailed.financialData?.source }}
        </a>
        – {{ statisticsDetailed.financialData?.year }} SRE Data
      </p>
    </div>
  </section>
</template>
