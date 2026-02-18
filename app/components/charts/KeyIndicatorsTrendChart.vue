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
      data: [0.4071, 0.2444, 0.2610, 0.0682, 0.1676, 0.0974, 0.1120, 0.1179, 0.1326],
      borderColor: '#0032a0',
      backgroundColor: '#0032a0',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Education',
      data: [0.7660, 0.3782, 0.4859, 0.3160, 0.3757, 0.1528, 0.1678, 0.1795, 0.1257],
      borderColor: '#f59e0b',
      backgroundColor: '#f59e0b',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Social Protection',
      data: [0.0000, 0.5033, 1.1375, 0.0000, 0.5070, 0.7192, 0.8584, 0.9260, 1.3784],
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Peace & Order',
      data: [0.5570, 0.2996, 0.2637, 0.2063, 0.1657, 0.1210, 0.0001, 0.0174, 0.0095],
      borderColor: '#0ea5e9',
      backgroundColor: '#0ea5e9',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'LGU Investment',
      data: [3.3333, 0.6207, 0.7886, 0.1993, 0.3864, 0.1697, 0.1587, 0.9042, 0.0000],
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
      max: 4.0,
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
