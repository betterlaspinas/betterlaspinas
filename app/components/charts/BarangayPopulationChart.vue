<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const barangayData = [
  { name: 'B. F. International Village', pop: 81739 },
  { name: 'Manuyo Dos', pop: 44351 },
  { name: 'Talon Dos', pop: 43978 },
  { name: 'Talon Uno', pop: 42505 },
  { name: 'Talon Singko', pop: 38684 },
  { name: 'Pulang Lupa Uno', pop: 38405 },
  { name: 'Almanza Dos', pop: 37432 },
  { name: 'Almanza Uno', pop: 36232 },
  { name: 'Pamplona Tres', pop: 35098 },
  { name: 'Talon Tres', pop: 32963 },
]

const data = {
  labels: barangayData.map(d => d.name),
  datasets: [
    {
      label: 'Population',
      data: barangayData.map(d => d.pop),
      backgroundColor: barangayData.map((_, i) => {
        const opacity = 1 - i * 0.07
        return `rgba(0, 50, 160, ${opacity})`
      }),
      borderRadius: 3,
      barThickness: 16,
    },
  ],
}

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
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
      displayColors: false,
      callbacks: {
        label: (context: any) =>
          `Population: ${(context.raw as number).toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.04)',
      },
      ticks: {
        callback: (value: any) =>
          `${(Number(value) / 1000).toFixed(0)}K`,
        font: { size: 10 },
        color: '#666',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 10, weight: 'bold' as const },
        color: '#444',
      },
    },
  },
}
</script>

<template>
  <div class="h-96 w-full">
    <Bar :data="data" :options="options" />
  </div>
</template>
