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
      label: 'Health',
      data: [2.4, 0.7, 0.45, 0.35, 0.35, 0.4, 0.38, 0.35, 0.32],
      borderColor: '#0032a0',
      backgroundColor: '#0032a0',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Education',
      data: [0.65, 0.32, 0.28, 0.25, 0.18, 0.15, 0.12, 0.1, 0.08],
      borderColor: '#f59e0b',
      backgroundColor: '#f59e0b',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Social Protection',
      data: [0.25, 0.28, 0.22, 0.05, 0.28, 0.35, 0.3, 0.22, 0.18],
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Peace & Order',
      data: [0.12, 0.35, 0.55, 0.42, 0.38, 0.42, 0.4, 0.38, 0.35],
      borderColor: '#0ea5e9',
      backgroundColor: '#0ea5e9',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'LGU Investment',
      data: [0.08, 0.15, 0.18, 0.12, 0.1, 0.15, 0.18, 0.22, 0.25],
      borderColor: '#8b5cf6',
      backgroundColor: '#8b5cf6',
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
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 15,
        font: { size: 11 },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 50, 160, 0.92)',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 11 },
      padding: 10,
      cornerRadius: 6,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 2.5,
      ticks: {
        font: { size: 10 },
        color: '#666',
        stepSize: 0.5,
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
  <div class="h-80 w-full">
    <Line :data="data" :options="options" />
  </div>
</template>
