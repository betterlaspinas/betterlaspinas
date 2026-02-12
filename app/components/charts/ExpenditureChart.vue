<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'

const props = withDefaults(
  defineProps<{
    gpsValue?: number
    socialValue?: number
    economicValue?: number
    debtValue?: number
    totalExpense?: number
  }>(),
  {
    gpsValue: 42.76,
    socialValue: 13.33,
    economicValue: 11.07,
    debtValue: 0.35,
    totalExpense: 67.51,
  },
)

const data = computed(() => ({
  labels: [
    'General Public Services',
    'Social Services',
    'Economic Services',
    'Debt Service',
  ],
  datasets: [
    {
      data: [props.gpsValue, props.socialValue, props.economicValue, props.debtValue],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
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
          `₱${(context.raw as number).toFixed(2)}M (${(((context.raw as number) / props.totalExpense) * 100).toFixed(1)}%)`,
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
        ₱{{ totalExpense.toFixed(2) }}M
      </div>
      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Total Expenses
      </div>
    </div>
  </div>
</template>
