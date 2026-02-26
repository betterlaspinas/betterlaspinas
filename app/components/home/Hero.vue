<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
</script>

<template>
  <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="lg:text-left text-center">
          <h1 class="text-[2.5rem] md:text-4xl text-white mb-4 leading-tight font-bold">
            {{ translate('hero-welcome') }}
          </h1>
          <p class="text-lg text-white/90 mb-8 leading-relaxed">
            {{ translate('hero-subtitle') }}
          </p>
          <div class="flex gap-4 flex-wrap lg:justify-start justify-center">
            <NuxtLink
              to="/services"
              class="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100"
            >
              Browse Services <i class="bi bi-arrow-right" />
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/15"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>

        <!-- Search Box -->
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-primary-500/10 transition-all duration-300 focus-within:shadow-xl focus-within:border-primary-500/20">
          <h2 class="text-base text-gray-800 mb-6 flex items-center gap-2 font-semibold">
            <i class="bi bi-search text-primary-600" /> Find a Service
          </h2>
          <div class="relative">
            <ServicesSearch
              placeholder="e.g., birth certificate, business permit"
              class="[&_input]:pl-11 [&_input]:pr-4 [&_input]:py-3.5 [&_input]:border-2 [&_input]:border-gray-200 [&_input]:rounded-lg [&_input]:shadow-none [&_input]:bg-gray-50 hover:[&_input]:border-gray-300 hover:[&_input]:bg-white focus:[&_input]:border-primary-500 focus:[&_input]:ring-4 focus:[&_input]:ring-primary-500/10"
            />
          </div>
          <div class="mt-4 flex items-center gap-2 flex-wrap text-[0.8125rem]">
            <span class="text-gray-500 font-medium">Popular:</span>
            <NuxtLink
              to="/service-details/birth-certificate"
              class="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
            >
              Birth Certificate
            </NuxtLink>
            <!-- TODO: Add back when available -->
            <!-- <NuxtLink
              to="/service-details/business-permits-licensing"
              class="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
            >
              Business Permit
            </NuxtLink>
            <NuxtLink
              to="/service-details/city-treasurer"
              class="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
            >
              Real Property Tax
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
