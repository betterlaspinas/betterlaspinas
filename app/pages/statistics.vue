<script setup lang="ts">
const { statistics, statisticsDetailed, labels, lguName, fullLocation } = useConfig()

useHead({
  title: 'Statistics',
})
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'Statistics' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-bar-chart-fill" />
            {{ labels.lguTypeLabel }} Data
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ labels.lguTypeLabel }} Statistics
          </h1>
          <p class="text-lg text-white/90">
            Data and statistics about {{ fullLocation }}
          </p>
        </div>
      </div>
    </section>

    <!-- Key Metrics Component -->
    <StatisticsKeyMetrics :statistics="statistics" :labels="labels" />

    <!-- City Finance Component -->
    <StatisticsCityFinance :statistics-detailed="statisticsDetailed" />

    <!-- Population Data Component -->
    <StatisticsPopulationData :statistics-detailed="statisticsDetailed" />

    <!-- Competitive Index Component -->
    <StatisticsCompetitiveIndex :statistics-detailed="statisticsDetailed" :lgu-name="lguName" />
  </div>
</template>
