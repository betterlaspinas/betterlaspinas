<script setup lang="ts">
import {
  BarangayPopulationChart,
  CMCIRankingsChart,
  KeyIndicatorsTrendChart,
  PopulationDistributionChart,
  PopulationTrendsChart,
} from '~/components/charts'

const config = useSiteConfig()
const statistics = computed(() => config.statistics)
const statisticsDetailed = computed(() => config.statisticsDetailed)
const labels = computed(() => config.labels)
const lguName = computed(() => config.lguName)
const fullLocation = computed(() => config.fullLocation)

useHead({
  title: 'Statistics',
})

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

const allBarangays = computed(() =>
  statisticsDetailed.value.barangayPopulation.map((b: any) => ({
    rank: b.rank,
    name: b.name,
    pop: b.population,
    pct: b.percentage,
  })),
)

const barangayData = computed(() => allBarangays.value.slice(0, 10))
const cmciPillars = computed(() => statisticsDetailed.value.cmciPillars)
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'Statistics' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-bar-chart-fill" />
            {{ labels.lguTypeLabel }} Data
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ labels.lguTypeLabel }} Statistics
          </h1>
          <p class="text-lg text-white/90">
            Data and statistics about {{ fullLocation }}
          </p>
        </div>
      </div>
    </section>

    <!-- Key Metrics -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4"
            >
              <i class="bi bi-people-fill" />
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{
                statistics.population.count > 0
                  ? statistics.population.count.toLocaleString()
                  : '—'
              }}
            </div>
            <div class="text-gray-500 font-medium">
              Population
            </div>
            <div class="text-xs text-gray-400 mt-2">
              {{ statistics.population.year }}
              {{ statistics.population.source }}
            </div>
          </div>
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4"
            >
              <i class="bi bi-geo-alt-fill" />
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{
                statistics.subdivisions.count > 0
                  ? statistics.subdivisions.count
                  : '—'
              }}
            </div>
            <div class="text-gray-500 font-medium">
              {{ labels.subdivisionTypePlural }}
            </div>
            <div class="text-xs text-gray-400 mt-2">
              {{ statistics.subdivisions.source }}
            </div>
          </div>
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4"
            >
              <i class="bi bi-rulers" />
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{
                statistics.landArea.value > 0
                  ? statistics.landArea.value
                  : '—'
              }}
            </div>
            <div class="text-gray-500 font-medium">
              Land Area ({{ statistics.landArea.unit }})
            </div>
            <div class="text-xs text-gray-400 mt-2">
              {{ statistics.landArea.source }}
            </div>
          </div>
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4"
            >
              <i class="bi bi-award-fill" />
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{ statistics.incomeClass.class || '—' }}
            </div>
            <div class="text-gray-500 font-medium">
              Income Class
            </div>
            <div class="text-xs text-gray-400 mt-2">
              {{ statistics.incomeClass.source }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- City Finance -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
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
          <div
            class="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white"
          >
            <div class="flex items-center gap-2 mb-4 opacity-80">
              <i class="bi bi-graph-up-arrow" />
              <span>Annual Income</span>
            </div>
            <div class="text-3xl font-bold mb-1">
              {{ statisticsDetailed.financialData.annualIncome }}
            </div>
            <div class="text-sm opacity-75">
              {{ statisticsDetailed.financialData.annualIncomeDetailed }}
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div class="flex items-center gap-2 mb-4 text-gray-500">
              <i class="bi bi-bank" />
              <span>NTA Share</span>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{ statisticsDetailed.financialData.iraShare }}
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
              {{ statisticsDetailed.financialData.iraDependency }}
            </div>
            <div class="text-sm text-gray-500">
              National Tax Share
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <h4 class="font-semibold text-gray-900 mb-4">
            Income Composition
          </h4>
          <div
            class="h-6 bg-gray-100 rounded-full overflow-hidden flex"
          >
            <div
              class="bg-primary-600 h-full flex items-center justify-center text-white text-xs font-medium"
              :style="{
                width: statisticsDetailed.financialData.iraDependency,
              }"
            >
              NTA {{ statisticsDetailed.financialData.iraDependency }}
            </div>
            <div
              class="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
              :style="{
                width:
                  statisticsDetailed.financialData.localSourcesPercentage,
              }"
            >
              Local
              {{ statisticsDetailed.financialData.localSourcesPercentage }}
            </div>
          </div>
          <div class="flex gap-6 mt-4">
            <div
              class="flex items-center gap-2 text-sm text-gray-600"
            >
              <span class="w-3 h-3 bg-primary-600 rounded-full" />
              National Tax Allotment
            </div>
            <div
              class="flex items-center gap-2 text-sm text-gray-600"
            >
              <span class="w-3 h-3 bg-green-500 rounded-full" />
              Local Sources
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="bi bi-info-circle" />
          Source:
          <a
            :href="statisticsDetailed.financialData.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            {{ statisticsDetailed.financialData.source }}
          </a>
          – {{ statisticsDetailed.financialData.year }} SRE Data
        </p>
      </div>
    </section>

    <!-- Population Trends -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
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
          <div
            class="text-center p-4 bg-white border border-gray-200 rounded-xl"
          >
            <span class="text-sm text-gray-500">2020</span>
            <span class="block text-2xl font-bold text-gray-900">
              {{
                statisticsDetailed.populationGrowth.year2020.toLocaleString()
              }}
            </span>
          </div>
          <div class="flex items-center">
            <i class="bi bi-arrow-right text-2xl text-gray-400" />
          </div>
          <div
            class="text-center p-4 bg-primary-50 border border-primary-200 rounded-xl"
          >
            <span class="text-sm text-primary-600">2024</span>
            <span class="block text-2xl font-bold text-primary-700">
              {{
                statisticsDetailed.populationGrowth.year2024.toLocaleString()
              }}
            </span>
          </div>
          <div
            class="text-center p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <span class="text-sm text-green-600">Growth</span>
            <span class="block text-2xl font-bold text-green-700">
              {{ statisticsDetailed.populationGrowth.growthRate }}
            </span>
          </div>
        </div>

        <div
          class="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <ClientOnly>
            <PopulationTrendsChart />
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
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
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
              <PopulationDistributionChart />
            </ClientOnly>
          </div>
          <div class="space-y-3">
            <div
              v-for="b in barangayData"
              :key="b.rank"
              class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <span
                class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                :class="
                  b.rank <= 3
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                "
              >
                #{{ b.rank }}
              </span>
              <span class="font-medium text-gray-900 w-32">
                {{ b.name }}
              </span>
              <div
                class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-primary-500 rounded-full"
                  :style="{ width: `${b.pct}%` }"
                />
              </div>
              <span
                class="text-sm font-semibold text-gray-700 w-16 text-right"
              >
                {{ b.pop.toLocaleString() }}
              </span>
            </div>
          </div>
        </div>

        <details
          class="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6"
        >
          <summary
            class="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 flex items-center gap-2"
          >
            <i class="bi bi-chevron-down" /> View all 20 barangays
          </summary>
          <div class="p-4 border-t border-gray-200 space-y-3">
            <div
              v-for="b in allBarangays.slice(10)"
              :key="b.rank"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span
                class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold bg-gray-100 text-gray-600"
              >
                #{{ b.rank }}
              </span>
              <span class="font-medium text-gray-900 w-32">
                {{ b.name }}
              </span>
              <div
                class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-primary-400 rounded-full"
                  :style="{ width: `${b.pct}%` }"
                />
              </div>
              <span
                class="text-sm font-semibold text-gray-700 w-16 text-right"
              >
                {{ b.pop.toLocaleString() }}
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

    <!-- Competitive Index -->
    <section id="competitive-index" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
            <i class="bi bi-trophy-fill" /> Competitiveness
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ lguName }} Competitive Index
          </h2>
          <p class="text-gray-500">
            Cities and Municipalities Competitiveness Index (CMCI)
            Performance
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <div
            v-for="pillar in cmciPillars"
            :key="pillar.id"
            class="bg-white border border-gray-200 rounded-xl p-6 text-center"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-xl mx-auto mb-3"
            >
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
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="bi bi-graph-up-arrow" /> Overall Rankings Trend
            (2016-2024)
          </h4>
          <ClientOnly>
            <CMCIRankingsChart />
          </ClientOnly>
        </div>

        <div
          class="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <h4
            class="font-semibold text-gray-900 mb-4 flex items-center gap-2"
          >
            <i class="bi bi-bar-chart-line" /> Key Indicators Trend
            (2016-2024)
          </h4>
          <ClientOnly>
            <KeyIndicatorsTrendChart />
          </ClientOnly>
        </div>

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

    <!-- Bar Chart Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
            <i class="bi bi-bar-chart-fill" /> Visual
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Population Bar Chart
          </h2>
          <p class="text-gray-500">
            Comparative view of all 20 barangays
          </p>
        </div>

        <div
          class="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <ClientOnly>
            <BarangayPopulationChart />
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
