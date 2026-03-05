<script setup lang="ts">
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10">
        <UiBadge variant="solid-primary" size="lg" icon="bi-bar-chart-fill" text="Visual" class="mb-3" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Population Bar Chart
        </h2>
        <p class="text-gray-500">
          Comparative view of all 20 barangays
        </p>
      </div>

      <UiCard class="mb-6">
        <ClientOnly>
          <ChartsBarangayPopulationChart />
        </ClientOnly>
      </UiCard>

      <p class="text-sm text-gray-500 flex items-center gap-2">
        <i class="bi bi-info-circle" />
        Source:
        <a
          href="https://psa.gov.ph/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          Philippine Statistics Authority (PSA)
        </a>
        - 2024 Census
      </p>
    </div>
  </section>
</template>
