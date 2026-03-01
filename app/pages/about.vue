<script setup lang="ts">
import History from '@/components/home/History.vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { siteBrandName } = useConfig()
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'About' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-info-circle-fill" /> About Us
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            About {{ siteBrandName }}
          </h1>
          <p class="text-lg text-white/90">
            Learn about our mission, history, and the community we serve.
          </p>
        </div>
      </div>
    </section>

    <!-- Project Mission -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-primary-50 rounded-2xl p-8 border border-primary-100 flex gap-6 items-start">
          <div class="bg-white p-3 rounded-xl shadow-sm hidden sm:block">
            <i class="bi bi-lightbulb-fill text-3xl text-primary-600" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p class="text-gray-700 leading-relaxed text-lg">
              {{ siteBrandName }} is a community-driven initiative designed to promote transparency, accountability, and accessibility in local governance. By aggregating public data and making it easier to navigate, we empower citizens to engage meaningfully with their local government unit.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- History Component -->
    <History />

    <!-- Quick Links Grid -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-900">
            Explore More
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <NuxtLink to="/government" class="group bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all text-center no-underline">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
              <i class="bi bi-building" />
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">
              Government
            </h3>
            <p class="text-gray-500 text-sm">
              Meet your local officials and understand the organizational structure.
            </p>
          </NuxtLink>

          <!-- <NuxtLink to="/budget" class="group bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all text-center no-underline">
            <div class="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
              <i class="bi bi-graph-up-arrow" />
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">
              Transparency
            </h3>
            <p class="text-gray-500 text-sm">
              View budget allocations, projects, and key performance indicators.
            </p>
          </NuxtLink> -->

          <NuxtLink to="/join-us" class="group bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all text-center no-underline">
            <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
              <i class="bi bi-heart-fill" />
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">
              Get Involved
            </h3>
            <p class="text-gray-500 text-sm">
              Join our team of volunteers and help build a better community.
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
