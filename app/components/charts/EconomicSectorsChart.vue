<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const data = {
  labels: ['Services', 'Industry', 'Trade & Commerce', 'Agriculture'],
  datasets: [
    {
      label: 'Share',
      data: [72, 16, 12, 0],
      backgroundColor: ['#0032a0', '#F77F00', '#0077BE', '#06A77D'],
      borderRadius: 4,
    },
  ],
}

const options = {
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
      callbacks: {
        label: (context: any) => `${context.raw}%`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 50,
      ticks: {
        callback: (value: any) => `${value}%`,
        font: { size: 10 },
        color: '#666',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.04)',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 10 },
        color: '#666',
      },
    },
  },
}
</script>

<template>
  <div class="h-64 w-full">
    <Bar :data="data" :options="options" />
  </div>
</template>
