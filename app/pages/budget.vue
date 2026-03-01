<script setup lang="ts">
const { lguName, fullLocation, labels, budget } = useConfig()

useHead({
  title: 'Budget & Transparency',
  script: [
    {
      src: '/assets/js/dpwh-projects.js',
      async: true,
    },
  ],
})
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'Budget & Transparency' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-shield-check" /> Financial Transparency
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Budget & Financial Transparency
          </h1>
          <p class="text-lg text-white/90">
            Tracking {{ labels.lguTypeLabel.toLowerCase() }} finances and
            projects for accountability
          </p>
        </div>
      </div>
    </section>

    <BudgetFinancialReport :budget="budget" />

    <BudgetInfrastructureProjects
      :budget="budget"
      :lgu-name="lguName"
      :full-location="fullLocation"
    />
  </div>
</template>
