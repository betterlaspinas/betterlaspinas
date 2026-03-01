<script setup lang="ts">
import type { BudgetConfig } from '~/types/config'

const props = defineProps<{
  budget: BudgetConfig
  lguName: string
  fullLocation: string
}>()

function formatLocation(location: string) {
  return location.replace('{{fullLocation}}', props.fullLocation)
}
</script>

<template>
  <div>
    <!-- Infrastructure Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <span class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
            <i class="bi bi-building-gear" /> Public Works
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            Infrastructure Investments
          </h2>
          <p class="text-gray-500">
            Major development projects serving the community
          </p>
        </div>

        <!-- Infrastructure Projects -->
        <div
          v-for="project in budget.infrastructureProjects"
          :key="project.id"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6"
        >
          <div class="p-6 border-b border-gray-200">
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {{ project.year }}
              </span>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                :class="`bg-${project.typeColor}-100 text-${project.typeColor}-700`"
              >
                <i :class="`bi ${project.typeIcon}`" />
                {{ project.type }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="bi bi-geo-alt" />
              {{ formatLocation(project.location) }}
            </p>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span class="text-xs text-gray-500 uppercase tracking-wide">
                Type of Work
              </span>
              <span class="block font-medium text-gray-900">
                {{ project.typeOfWork }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500 uppercase tracking-wide">
                Contractor
              </span>
              <span class="block font-medium text-gray-900">
                {{ project.contractor }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500 uppercase tracking-wide">
                Contract Cost
              </span>
              <span class="block font-bold text-primary-600 text-lg">
                {{ project.contractCost }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DPWH Projects Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <span class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
            <i class="bi bi-building" /> National Government Projects
          </span>
          <h2 class="text-2xl font-bold text-gray-900">
            DPWH Infrastructure Projects in {{ lguName }}
          </h2>
          <p class="text-gray-500">
            Implementing Agency: District Engineering Office
          </p>
        </div>

        <div id="dpwh-projects-container" class="bg-gray-50 border border-gray-200 rounded-xl p-8">
          <p class="text-gray-500 text-center">
            Configure DPWH projects data in public/data/dpwh-projects.json
          </p>
        </div>

        <p class="text-sm text-gray-500 flex items-center gap-2 mt-4">
          <i class="bi bi-info-circle" />
          Source:
          <a
            href="https://transparency.dpwh.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:underline"
          >
            DPWH Transparency Portal
          </a>
        </p>
      </div>
    </section>
  </div>
</template>
