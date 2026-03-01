<script setup lang="ts">
import type { BudgetConfig } from '~/types/config'
import { computed, ref } from 'vue'

const props = defineProps<{
  budget: BudgetConfig
}>()

type QuarterKey = 'q1' | 'q2' | 'q3' | 'q4'
const activeQuarter = ref<QuarterKey>('q1')

// Reference active quarter safely using optional chaining
const quarterData = computed(() => props.budget.quarters?.[activeQuarter.value])
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <span class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
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
      <div v-if="quarterData" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-green-50 border border-green-200 rounded-xl p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
              <i class="bi bi-arrow-down-circle text-xl" />
            </div>
            <div>
              <span class="block text-2xl font-bold text-green-700">
                {{ quarterData.totalIncome }}
              </span>
              <span class="text-sm text-green-600">Total Income</span>
            </div>
          </div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-xl p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg">
              <i class="bi bi-arrow-up-circle text-xl" />
            </div>
            <div>
              <span class="block text-2xl font-bold text-red-700">
                {{ quarterData.totalExpense }}
              </span>
              <span class="text-sm text-red-600">Total Expenditures</span>
            </div>
          </div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
              <i class="bi bi-plus-slash-minus text-xl" />
            </div>
            <div>
              <span class="block text-2xl font-bold text-blue-700">
                {{ quarterData.netIncome }}
              </span>
              <span class="text-sm text-blue-600">Net Operating Income</span>
            </div>
          </div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
              <i class="bi bi-wallet2 text-xl" />
            </div>
            <div>
              <span class="block text-2xl font-bold text-purple-700">
                {{ quarterData.fundBalance }}
              </span>
              <span class="text-sm text-purple-600">Fund Balance (End)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Breakdown Panels -->
      <div v-if="quarterData" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Income Sources -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div class="p-6 border-b border-gray-200 bg-gray-50">
            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
              <i class="bi bi-pie-chart text-primary-600" /> Income Sources
            </h3>
          </div>
          <div class="p-6">
            <div class="h-48 mb-4">
              <ChartsIncomeSourcesChart
                :local-value="quarterData.income.local.value"
                :external-value="quarterData.income.external.value"
                :total-income="quarterData.totalIncomeValue"
              />
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">Local Sources</span>
                    <span class="block text-xs text-gray-500">Tax & Non-Tax Revenue</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.income.local.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.income.local.percentage }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-blue-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">External Sources</span>
                    <span class="block text-xs text-gray-500">National Tax Allotment</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.income.external.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.income.external.percentage }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Expenditure Allocation -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div class="p-6 border-b border-gray-200 bg-gray-50">
            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
              <i class="bi bi-bar-chart text-primary-600" /> Expenditure Allocation
            </h3>
          </div>
          <div class="p-6">
            <div class="h-48 mb-4">
              <ChartsExpenditureChart
                :gps-value="quarterData.expenditure.gps.value"
                :social-value="quarterData.expenditure.social.value"
                :economic-value="quarterData.expenditure.economic.value"
                :debt-value="quarterData.expenditure.debt.value"
                :total-expense="quarterData.totalExpenseValue"
              />
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-indigo-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">General Public Services</span>
                    <span class="block text-xs text-gray-500">Administration & Operations</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.expenditure.gps.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.expenditure.gps.percentage }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-orange-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">Social Services</span>
                    <span class="block text-xs text-gray-500">Health, Education, Welfare</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.expenditure.social.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.expenditure.social.percentage }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">Economic Services</span>
                    <span class="block text-xs text-gray-500">Infrastructure & Development</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.expenditure.economic.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.expenditure.economic.percentage }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 bg-gray-500 rounded-full" />
                  <div>
                    <span class="font-medium text-gray-900">Debt Service</span>
                    <span class="block text-xs text-gray-500">Interest & Charges</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-gray-900">{{ quarterData.expenditure.debt.amount }}</span>
                  <span class="block text-xs text-gray-500">{{ quarterData.expenditure.debt.percentage }}</span>
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
</template>
