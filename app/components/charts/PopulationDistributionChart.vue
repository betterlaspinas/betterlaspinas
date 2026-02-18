<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'

const data = {
  labels: [
    'B. F. International Village',
    'Manuyo Dos',
    'Talon Dos',
    'Talon Uno',
    'Talon Singko',
    'Pamplona Tres',
    'Pulang Lupa Uno',
    'Almanza Dos',
    'Almanza Uno',
    'Talon Tres',
  ],
  datasets: [
    {
      data: [80621, 51459, 44452, 42677, 42013, 37234, 36908, 36679, 33683, 33192],
      backgroundColor: [
        '#0032a0',
        '#F77F00',
        '#06A77D',
        '#0077BE',
        '#8B5CF6',
        '#EC4899',
        '#14B8A6',
        '#F59E0B',
        '#6366F1',
        '#003D82',
      ],
      borderColor: '#fff',
      borderWidth: 2,
      hoverBorderWidth: 2,
      hoverOffset: 6,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '58%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        padding: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 12,
        font: { size: 11 },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 50, 160, 0.92)',
      titleFont: { size: 13, weight: 'bold' as const },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 6,
      callbacks: {
        label: (context: any) => {
          const total = (context.dataset.data as number[]).reduce(
            (a: number, b: number) => a + b,
            0,
          )
          const raw = context.raw as number
          const pct = ((raw / total) * 100).toFixed(1)
          return `${raw.toLocaleString()} (${pct}%)`
        },
      },
    },
  },
}
</script>

<template>
  <div class="h-80 w-full">
    <Doughnut :data="data" :options="options" />
  </div>
</template>
