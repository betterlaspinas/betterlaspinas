<script setup lang="ts">
import { Line } from 'vue-chartjs'

const data = {
  labels: ['1990', '1995', '2000', '2007', '2010', '2015', '2020', '2024'],
  datasets: [
    {
      label: 'Population',
      data: [297102, 413086, 472780, 532330, 552573, 588894, 606293, 615549],
      borderColor: '#0032a0',
      backgroundColor: 'rgba(0, 50, 160, 0.12)',
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#0032a0',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 2.5,
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
      titleFont: { size: 13, weight: 'bold' as const },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 6,
      displayColors: false,
      callbacks: {
        label: (context: { raw: unknown }) =>
          `Population: ${(context.raw as number).toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 250000,
      ticks: {
        callback: (value: unknown) =>
          `${(Number(value) / 1000).toFixed(0)}K`,
        font: { size: 11 },
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
        font: { size: 11, weight: 'bold' as const },
        color: '#666',
      },
    },
  },
}
</script>

<template>
  <div class="h-80 w-full">
    <Line :data="data" :options="options" />
  </div>
</template>
