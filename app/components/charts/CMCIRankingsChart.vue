<script setup lang="ts">
import { Line } from 'vue-chartjs'

const data = {
  labels: [
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
  ],
  datasets: [
    {
      label: 'Overall Rank',
      data: [25, 24, 23, 26, 20, 25, 31, 30, 30],
      borderColor: '#0032a0',
      backgroundColor: 'rgba(0, 50, 160, 0.1)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
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
    },
  },
  scales: {
    y: {
      reverse: true,
      beginAtZero: false,
      min: 1,
      max: 35,
      ticks: {
        callback: (value: any) => `#${value}`,
        font: { size: 10 },
        color: '#666',
        stepSize: 5,
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
    <Line :data="data" :options="options" />
  </div>
</template>
