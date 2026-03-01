<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const barangayData = [
  { name: 'B. F. International Village', pop: 80621 },
  { name: 'Manuyo Dos', pop: 51459 },
  { name: 'Talon Dos', pop: 44452 },
  { name: 'Talon Uno', pop: 42677 },
  { name: 'Talon Singko', pop: 42013 },
  { name: 'Pamplona Tres', pop: 37234 },
  { name: 'Pulang Lupa Uno', pop: 36908 },
  { name: 'Almanza Dos', pop: 36679 },
  { name: 'Almanza Uno', pop: 33683 },
  { name: 'Talon Tres', pop: 33192 },
  { name: 'Pulang Lupa Dos', pop: 32788 },
  { name: 'Pilar', pop: 31420 },
  { name: 'Zapote', pop: 20753 },
  { name: 'Pamplona Uno', pop: 19658 },
  { name: 'Talon Kuatro', pop: 17656 },
  { name: 'Manuyo Uno', pop: 13908 },
  { name: 'Elias Aldana', pop: 11758 },
  { name: 'Pamplona Dos', pop: 11443 },
  { name: 'Daniel Fajardo', pop: 10719 },
  { name: 'Ilaya', pop: 7287 },
]

const data = {
  labels: barangayData.map(d => d.name),
  datasets: [
    {
      label: 'Population',
      data: barangayData.map(d => d.pop),
      backgroundColor: barangayData.map((_, i) => {
        const opacity = Math.max(0.15, 1 - i * 0.04)
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
        label: (context: { raw: unknown }) =>
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
        callback: (value: unknown) =>
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
