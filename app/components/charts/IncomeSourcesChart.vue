<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'

const props = withDefaults(
  defineProps<{
    localValue?: number
    externalValue?: number
    totalIncome?: number
  }>(),
  {
    localValue: 88.85,
    externalValue: 69.62,
    totalIncome: 158.47,
  },
)

const data = computed(() => ({
  labels: ['Local Sources', 'External Sources (NTA)'],
  datasets: [
    {
      data: [props.localValue, props.externalValue],
      backgroundColor: ['#10b981', '#0ea5e9'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 50, 160, 0.92)',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 11 },
      padding: 8,
      cornerRadius: 5,
      callbacks: {
        label: (context: any) =>
          `₱${(context.raw as number).toFixed(2)}M (${(((context.raw as number) / props.totalIncome) * 100).toFixed(1)}%)`,
      },
    },
  },
}
</script>

<template>
  <div class="relative w-full h-40">
    <Doughnut :data="data" :options="options" />
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div class="text-xl font-bold text-gray-900">
        ₱{{ totalIncome.toFixed(2) }}M
      </div>
      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Total Income
      </div>
    </div>
  </div>
</template>
