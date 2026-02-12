<script setup lang="ts">
import {
  ExpenditureChart,
  IncomeSourcesChart,
} from '~/components/charts'

const config = useSiteConfig()
const lguName = computed(() => config.lguName)
const fullLocation = computed(() => config.fullLocation)
const labels = computed(() => config.labels)
const budget = computed(() => config.budget)

useHead({
  title: 'Budget & Transparency',
  script: [
    {
      src: '/assets/js/dpwh-projects.js',
      async: true,
    },
  ],
})

type QuarterKey = 'q1' | 'q2' | 'q3' | 'q4'
const activeQuarter = ref<QuarterKey>('q1')

const q = computed(() => budget.value.quarters[activeQuarter.value])

function formatLocation(location: string) {
  return location.replace('{{fullLocation}}', fullLocation.value)
}
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Budget & Transparency' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-shield-check" /> Financial Transparency
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Budget & Financial Transparency
          </h1>
          <p class="text-lg text-white/90">
            Tracking {{ labels.lguTypeLabel.toLowerCase() }} finances and
            projects for accountability
          </p>
        </div>
      </div>
    </section>

    <!-- SRE Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <span
              class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
            >
              <i class="bi bi-graph-up-arrow" /> Financial Report
            </span>
            <h2 class="text-2xl font-bold text-gray-900">
              Statement of Receipts & Expenditures
            </h2>
            <p class="text-gray-500">
              FY {{ budget.fiscalYear }} quarterly financial performance
            </p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              type="button"
              class="px-4 py-2 rounded-lg font-medium transition-all"
              :class="
                activeQuarter === 'q1'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
              "
              @click="activeQuarter = 'q1'"
            >
              <span class="font-bold">Q1</span>
              <span class="text-sm opacity-75">Jan - Mar</span>
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg font-medium transition-all"
              :class="
                activeQuarter === 'q2'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
              "
              @click="activeQuarter = 'q2'"
            >
              <span class="font-bold">Q2</span>
              <span class="text-sm opacity-75">Apr - Jun</span>
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg font-medium transition-all"
              :class="
                activeQuarter === 'q3'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
              "
              @click="activeQuarter = 'q3'"
            >
              <span class="font-bold">Q3</span>
              <span class="text-sm opacity-75">Jul - Sep</span>
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg font-medium transition-all"
              :class="
                activeQuarter === 'q4'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
              "
              @click="activeQuarter = 'q4'"
            >
              <span class="font-bold">Q4</span>
              <span class="text-sm opacity-75">Oct - Dec</span>
            </button>
          </div>
        </div>

        <!-- Metrics -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div
            class="bg-green-50 border border-green-200 rounded-xl p-6"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg"
              >
                <i class="bi bi-arrow-down-circle text-xl" />
              </div>
              <div>
                <span class="block text-2xl font-bold text-green-700">
                  {{ q.totalIncome }}
                </span>
                <span class="text-sm text-green-600">Total Income</span>
              </div>
            </div>
          </div>
          <div class="bg-red-50 border border-red-200 rounded-xl p-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg"
              >
                <i class="bi bi-arrow-up-circle text-xl" />
              </div>
              <div>
                <span class="block text-2xl font-bold text-red-700">
                  {{ q.totalExpense }}
                </span>
                <span class="text-sm text-red-600">
                  Total Expenditures
                </span>
              </div>
            </div>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg"
              >
                <i class="bi bi-plus-slash-minus text-xl" />
              </div>
              <div>
                <span class="block text-2xl font-bold text-blue-700">
                  {{ q.netIncome }}
                </span>
                <span class="text-sm text-blue-600">
                  Net Operating Income
                </span>
              </div>
            </div>
          </div>
          <div
            class="bg-purple-50 border border-purple-200 rounded-xl p-6"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg"
              >
                <i class="bi bi-wallet2 text-xl" />
              </div>
              <div>
                <span
                  class="block text-2xl font-bold text-purple-700"
                >
                  {{ q.fundBalance }}
                </span>
                <span class="text-sm text-purple-600">
                  Fund Balance (End)
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Breakdown Panels -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Income Sources -->
          <div
            class="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div class="p-6 border-b border-gray-200 bg-gray-50">
              <h3
                class="font-semibold text-gray-900 flex items-center gap-2"
              >
                <i class="bi bi-pie-chart text-primary-600" /> Income
                Sources
              </h3>
            </div>
            <div class="p-6">
              <div class="h-48 mb-4">
                <IncomeSourcesChart
                  :local-value="q.income.local.value"
                  :external-value="q.income.external.value"
                  :total-income="q.totalIncomeValue"
                />
              </div>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-green-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        Local Sources
                      </span>
                      <span class="block text-xs text-gray-500">
                        Tax & Non-Tax Revenue
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.income.local.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.income.local.percentage }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-blue-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        External Sources
                      </span>
                      <span class="block text-xs text-gray-500">
                        National Tax Allotment
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.income.external.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.income.external.percentage }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Expenditure Allocation -->
          <div
            class="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div class="p-6 border-b border-gray-200 bg-gray-50">
              <h3
                class="font-semibold text-gray-900 flex items-center gap-2"
              >
                <i class="bi bi-bar-chart text-primary-600" />
                Expenditure Allocation
              </h3>
            </div>
            <div class="p-6">
              <div class="h-48 mb-4">
                <ExpenditureChart
                  :gps-value="q.expenditure.gps.value"
                  :social-value="q.expenditure.social.value"
                  :economic-value="q.expenditure.economic.value"
                  :debt-value="q.expenditure.debt.value"
                  :total-expense="q.totalExpenseValue"
                />
              </div>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-indigo-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        General Public Services
                      </span>
                      <span class="block text-xs text-gray-500">
                        Administration & Operations
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.expenditure.gps.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.expenditure.gps.percentage }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-orange-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        Social Services
                      </span>
                      <span class="block text-xs text-gray-500">
                        Health, Education, Welfare
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.expenditure.social.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.expenditure.social.percentage }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-yellow-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        Economic Services
                      </span>
                      <span class="block text-xs text-gray-500">
                        Infrastructure & Development
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.expenditure.economic.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.expenditure.economic.percentage }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-3 h-3 bg-gray-500 rounded-full"
                    />
                    <div>
                      <span class="font-medium text-gray-900">
                        Debt Service
                      </span>
                      <span class="block text-xs text-gray-500">
                        Interest & Charges
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-semibold text-gray-900">
                      {{ q.expenditure.debt.amount }}
                    </span>
                    <span class="block text-xs text-gray-500">
                      {{ q.expenditure.debt.percentage }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://blgf.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            Bureau of Local Government Finance (BLGF)
          </a>
          — Update with your LGU's actual financial data
        </p>
      </div>
    </section>

    <!-- Infrastructure Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <span
            class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
          >
            <i class="bi bi-building-gear" /> Public Works
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            Infrastructure Investments
          </h2>
          <p class="text-gray-500">
            Major development projects serving the community
          </p>
        </div>

        <!-- Infrastructure Projects -->
        <div
          v-for="project in budget.infrastructureProjects"
          :key="project.id"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6"
        >
          <div class="p-6 border-b border-gray-200">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ project.year }}
              </span>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                :class="`bg-${project.typeColor}-100 text-${project.typeColor}-700`"
              >
                <i :class="`bi ${project.typeIcon}`" />
                {{ project.type }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="bi bi-geo-alt" />
              {{ formatLocation(project.location) }}
            </p>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span
                class="text-xs text-gray-500 uppercase tracking-wide"
              >
                Type of Work
              </span>
              <span class="block font-medium text-gray-900">
                {{ project.typeOfWork }}
              </span>
            </div>
            <div>
              <span
                class="text-xs text-gray-500 uppercase tracking-wide"
              >
                Contractor
              </span>
              <span class="block font-medium text-gray-900">
                {{ project.contractor }}
              </span>
            </div>
            <div>
              <span
                class="text-xs text-gray-500 uppercase tracking-wide"
              >
                Contract Cost
              </span>
              <span class="block font-bold text-primary-600 text-lg">
                {{ project.contractCost }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DPWH Projects Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <span
            class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2"
          >
            <i class="bi bi-building" /> National Government Projects
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            DPWH Infrastructure Projects in {{ lguName }}
          </h2>
          <p class="text-gray-500">
            Implementing Agency: District Engineering Office
          </p>
        </div>

        <div
          id="dpwh-projects-container"
          class="bg-gray-50 border border-gray-200 rounded-xl p-8"
        >
          <p class="text-gray-500 text-center">
            Configure DPWH projects data in public/data/dpwh-projects.json
          </p>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2 mt-4">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://transparency.dpwh.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            DPWH Transparency Portal
          </a>
        </p>
      </div>
    </section>
  </div>
</template>
