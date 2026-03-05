<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'
import { computed } from 'vue'

const props = defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
  lguName: string
}>()

const cmciPillars = computed(() => props.statisticsDetailed.cmciPillars)

// Trend styling lookup tables
const TREND_COLORS: Record<string, string> = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-500',
}

const TREND_ICONS: Record<string, string> = {
  up: 'bi-arrow-up',
  down: 'bi-arrow-down',
  stable: 'bi-dash',
}

function getTrendColor(trendType: string): string {
  return (TREND_COLORS[trendType] || TREND_COLORS.stable) as string
}

function getTrendIcon(trendType: string): string {
  return (TREND_ICONS[trendType] || TREND_ICONS.stable) as string
}
</script>

<template>
  <section id="competitive-index" class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10">
        <UiBadge variant="solid-primary" size="lg" icon="bi-trophy-fill" text="Competitiveness" class="mb-3" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {{ lguName }} Competitive Index
        </h2>
        <p class="text-gray-500">
          Cities and Municipalities Competitiveness Index (CMCI) Performance
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <UiCard
          v-for="pillar in cmciPillars"
          :key="pillar.id"
          class="text-center"
        >
          <div class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-xl mx-auto mb-3">
            <i :class="`bi ${pillar.icon}`" />
          </div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">
            {{ pillar.title }}
          </h4>
          <div class="text-2xl font-bold text-gray-900 mb-1">
            {{ pillar.score }}
          </div>
          <div
            class="text-sm font-medium flex items-center justify-center gap-1"
            :class="getTrendColor(pillar.trendType)"
          >
            <i :class="`bi ${getTrendIcon(pillar.trendType)}`" />
            {{ pillar.trend }}
          </div>
        </UiCard>
      </div>

      <UiCard class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="bi bi-graph-up-arrow" /> Overall Rankings Trend (2016-2024)
        </h4>
        <ClientOnly>
          <ChartsCMCIRankingsChart />
        </ClientOnly>
      </UiCard>

      <UiCard class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="bi bi-bar-chart-line" /> Key Indicators Trend (2016-2024)
        </h4>
        <ClientOnly>
          <ChartsKeyIndicatorsTrendChart />
        </ClientOnly>
      </UiCard>

      <p class="text-sm text-gray-500 flex items-center gap-2">
        <i class="bi bi-info-circle" />
        Source:
        <a
          href="https://cmci.dti.gov.ph/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          DTI Cities and Municipalities Competitiveness Index (CMCI)
        </a>
      </p>
    </div>
  </section>
</template>
