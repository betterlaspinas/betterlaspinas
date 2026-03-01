<script setup lang="ts">
import type { StatisticsConfig } from '~/types/config'

defineProps<{
  statistics: StatisticsConfig
  labels: { subdivisionTypePlural: string }
}>()
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500">
          <div class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4">
            <i class="bi bi-people-fill" />
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{
              statistics.population?.count && statistics.population.count > 0
                ? statistics.population.count.toLocaleString()
                : '—'
            }}
          </div>
          <div class="text-gray-500 font-medium">
            Population
          </div>
          <div class="text-xs text-gray-400 mt-2">
            {{ statistics.population?.year }}
            {{ statistics.population?.source }}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500">
          <div class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4">
            <i class="bi bi-geo-alt-fill" />
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{
              statistics.subdivisions?.count && statistics.subdivisions.count > 0
                ? statistics.subdivisions.count
                : '—'
            }}
          </div>
          <div class="text-gray-500 font-medium">
            {{ labels.subdivisionTypePlural }}
          </div>
          <div class="text-xs text-gray-400 mt-2">
            {{ statistics.subdivisions?.source }}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500">
          <div class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4">
            <i class="bi bi-rulers" />
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{
              statistics.landArea?.value && statistics.landArea.value > 0
                ? statistics.landArea.value
                : '—'
            }}
          </div>
          <div class="text-gray-500 font-medium">
            Land Area ({{ statistics.landArea?.unit }})
          </div>
          <div class="text-xs text-gray-400 mt-2">
            {{ statistics.landArea?.source }}
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-500">
          <div class="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-2xl mb-4">
            <i class="bi bi-award-fill" />
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{ statistics.incomeClass?.class || '—' }}
          </div>
          <div class="text-gray-500 font-medium">
            Income Class
          </div>
          <div class="text-xs text-gray-400 mt-2">
            {{ statistics.incomeClass?.source }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
