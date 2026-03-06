<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { siteBrandName, lguName } = useConfig()
</script>

<template>
  <div>
    <UiBreadcrumbs :items="[{ label: 'About' }]" />

    <UiPageHero
      badge-icon="bi-info-circle-fill"
      badge-text="About Us"
      :title="`About ${siteBrandName}`"
      description="Learn about our mission, history, and the community we serve."
    />

    <!-- Project Mission & Vision -->
    <section class="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute inset-0 bg-primary-50/20 skew-y-2 transform origin-top-left -z-10" />

      <div class="container mx-auto px-4 max-w-5xl relative">
        <div class="text-center mb-12">
          <span class="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-primary-100 shadow-sm">
            <i class="bi bi-compass" /> Our Purpose
          </span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Mission & Vision
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The driving force behind <strong>{{ siteBrandName }}</strong> and our aspirations for the community.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission -->
          <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
            <div class="absolute top-0 left-0 w-full h-1 bg-yellow-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div class="flex gap-6 items-start">
              <div class="bg-yellow-50 p-4 rounded-xl shadow-sm hidden sm:flex items-center justify-center shrink-0">
                <i class="bi bi-lightbulb-fill text-3xl text-yellow-600" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p class="text-gray-600 leading-relaxed text-lg">
                  Our mission is to foster a culture of transparency, accountability, and active citizenship in local governance. Inspired by the pioneering work of <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline font-medium">BetterGov.ph</a>, we are dedicated to empowering residents by making public data accessible, understandable, and actionable for everyone in our community.
                </p>
              </div>
            </div>
          </div>

          <!-- Vision -->
          <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
            <div class="absolute top-0 left-0 w-full h-1 bg-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div class="flex gap-6 items-start">
              <div class="bg-cyan-50 p-4 rounded-xl shadow-sm hidden sm:flex items-center justify-center shrink-0">
                <i class="bi bi-eye-fill text-3xl text-cyan-600" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p class="text-gray-600 leading-relaxed text-lg">
                  We envision a fully engaged and informed populace working alongside a responsive, open city government. By leveraging technology for civic good, we aim to build a community where every resident has the tools and knowledge to participate directly in shaping the future of {{ siteBrandName }}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- History Component -->
    <HomeHistory />

    <!-- Independence & Governance -->
    <section class="py-16 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute inset-0 bg-primary-50/30 skew-y-3 transform origin-bottom-right -z-10" />

      <div class="container mx-auto px-4 max-w-4xl relative">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-primary-100 shadow-sm">
            <i class="bi bi-shield-check" /> Core Principles
          </span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Independence & Integrity
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <strong>{{ siteBrandName }}</strong> is a proud, independent civic tech initiative driven by the community, for the community.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1 bg-primary-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div class="w-12 h-12 bg-primary-50 rounded-xl text-primary-600 flex items-center justify-center text-2xl mb-6">
              <i class="bi bi-people-fill" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Community-Led
            </h3>
            <p class="text-gray-600 leading-relaxed m-0 text-lg">
              We are organized entirely by volunteer residents and developers who are passionate about advancing local transparency and fostering civic engagement.
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1 bg-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div class="w-12 h-12 bg-red-50 rounded-xl text-red-500 flex items-center justify-center text-2xl mb-6">
              <i class="bi bi-building-slash" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Non-Partisan
            </h3>
            <p class="text-gray-600 leading-relaxed m-0 text-lg">
              We are strictly independent. We are not affiliated with, funded by, or endorsed by any political party, candidate, or the City Government of {{ lguName }}.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links Grid -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          title="Explore More"
          badge-icon="bi-compass"
          badge-text="Navigate"
          badge-class="bg-primary-600 text-white"
        />

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
