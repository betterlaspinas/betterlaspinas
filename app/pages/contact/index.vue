<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { site, hotlines, formatPhoneLink } = useConfig()
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Contact' }]" />

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-envelope-fill" /> Contact
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p class="text-lg text-white/90">
            We're here to help. Reach out to us through any of these channels.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            v-if="site.contact.email"
            :href="`mailto:${site.contact.email}`"
            class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div class="w-12 h-12 flex items-center justify-center bg-primary-600 text-white rounded-xl text-xl shrink-0">
              <i class="bi bi-envelope-fill" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Email
              </h3>
              <p class="text-lg font-semibold text-gray-900 mb-1">
                {{ site.contact.email }}
              </p>
              <span class="text-sm text-gray-500">
                We'll respond within 24 hours
              </span>
            </div>
          </a>

          <a
            v-if="site.contact.mobile"
            :href="`tel:${formatPhoneLink(site.contact.mobile)}`"
            class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div class="w-12 h-12 flex items-center justify-center bg-primary-600 text-white rounded-xl text-xl shrink-0">
              <i class="bi bi-phone-fill" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Mobile
              </h3>
              <p class="text-lg font-semibold text-gray-900 mb-1">
                {{ site.contact.mobile }}
              </p>
              <span class="text-sm text-gray-500">
                Mon-Fri: 8:00 AM - 5:00 PM
              </span>
            </div>
          </a>

          <a
            v-if="site.contact.phone"
            :href="`tel:${formatPhoneLink(site.contact.phone)}`"
            class="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl no-underline text-gray-800 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div class="w-12 h-12 flex items-center justify-center bg-primary-600 text-white rounded-xl text-xl shrink-0">
              <i class="bi bi-telephone-fill" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Phone
              </h3>
              <p class="text-lg font-semibold text-gray-900 mb-1">
                {{ site.contact.phone }}
              </p>
              <span class="text-sm text-gray-500">
                Mon-Fri: 8:00 AM - 5:00 PM
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Office Hours -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div class="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
            <i class="bi bi-clock-fill text-2xl text-primary-600" />
            <h2 class="text-xl font-bold text-gray-900 m-0">
              Office Hours
            </h2>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="grid grid-cols-3 items-center p-4 bg-green-50">
              <span class="pl-4 font-medium text-gray-900">
                Monday - Friday
              </span>
              <span class="text-gray-600 pl-4 md:pl-16">8:00 AM - 5:00 PM</span>
              <span class="inline-flex gap-1 text-green-600 text-sm font-medium pl-8 md:pl-32">
                <i class="bi bi-check-circle-fill" /> Open
              </span>
            </div>
            <div class="grid grid-cols-3 items-center p-4 bg-yellow-50">
              <span class="pl-4 font-medium text-gray-900">Lunch Break</span>
              <span class="text-gray-600 pl-4 md:pl-16">12:00 PM - 1:00 PM</span>
              <span class="inline-flex items-center gap-1 text-yellow-600 text-sm font-medium pl-8 md:pl-32">
                <i class="bi bi-pause-circle-fill" /> Break
              </span>
            </div>
            <div class="grid grid-cols-3 items-center p-4 bg-red-50">
              <span class="pl-4 font-medium text-gray-900">
                Saturday & Sunday
              </span>
              <span class="text-gray-600 pl-4 md:pl-16">Closed</span>
              <span class="inline-flex items-center gap-1 text-red-600 text-sm font-medium pl-8 md:pl-32">
                <i class="bi bi-x-circle-fill" /> Closed
              </span>
            </div>
            <div class="grid grid-cols-3 items-center p-4 bg-red-50">
              <span class="pl-4 font-medium text-gray-900">
                National & Local Holidays
              </span>
              <span class="text-gray-600 pl-4 md:pl-16">Closed</span>
              <span class="inline-flex items-center gap-1 text-red-600 text-sm font-medium pl-8 md:pl-32">
                <i class="bi bi-x-circle-fill" /> Closed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Hotlines -->
    <section v-if="hotlines.emergency.some((h) => h.number)" class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-exclamation-triangle-fill" /> Emergency
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Emergency Hotlines
          </h2>
          <p class="text-gray-500">
            For emergencies and inquiries, contact these numbers anytime.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <template v-for="hotline in hotlines.emergency" :key="hotline.id">
            <a
              v-if="hotline.number"
              :href="`tel:${formatPhoneLink(hotline.number)}`"
              class="flex flex-col items-center gap-2 p-6 bg-red-50 border border-red-200 rounded-xl no-underline text-center transition-all duration-200 hover:border-red-400 hover:shadow-md"
            >
              <i class="bi text-3xl text-red-600" :class="[hotline.icon]" />
              <span class="text-sm font-medium text-gray-700">
                {{ hotline.name }}
              </span>
              <span class="text-lg font-bold text-red-600">
                {{ hotline.number }}
              </span>
            </a>
          </template>

          <template v-for="hotline in hotlines.government" :key="hotline.id">
            <a
              v-if="hotline.number"
              :href="`tel:${formatPhoneLink(hotline.number)}`"
              class="flex flex-col items-center gap-2 p-6 bg-blue-50 border border-blue-200 rounded-xl no-underline text-center transition-all duration-200 hover:border-blue-400 hover:shadow-md"
            >
              <i class="bi text-3xl text-blue-600" :class="[hotline.icon]" />
              <span class="text-sm font-medium text-gray-700">
                {{ hotline.name }}
              </span>
              <span class="text-lg font-bold text-blue-600">
                {{ hotline.number }}
              </span>
            </a>
          </template>

          <template v-for="hotline in hotlines.utilities" :key="hotline.id">
            <a
              v-if="hotline.number"
              :href="`tel:${formatPhoneLink(hotline.number)}`"
              class="flex flex-col items-center gap-2 p-6 bg-gray-50 border border-gray-200 rounded-xl no-underline text-center transition-all duration-200 hover:border-gray-400 hover:shadow-md"
            >
              <i class="bi text-3xl text-gray-600" :class="[hotline.icon]" />
              <span class="text-sm font-medium text-gray-700">
                {{ hotline.name }}
              </span>
              <span class="text-lg font-bold text-gray-600">
                {{ hotline.number }}
              </span>
            </a>
          </template>
        </div>
      </div>
    </section>

    <!-- Medical Emergency Hotlines -->
    <section v-if="hotlines.medical.some((h: any) => h.number)" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-hospital-fill" /> Medical
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Medical Emergency Hotlines
          </h2>
          <p class="text-gray-500">
            For medical emergencies and hospital inquiries.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <template v-for="hotline in hotlines.medical" :key="hotline.id">
            <a
              v-if="hotline.number"
              :href="`tel:${formatPhoneLink(hotline.number)}`"
              class="flex flex-col items-center gap-2 p-6 bg-green-50 border border-green-200 rounded-xl no-underline text-center transition-all duration-200 hover:border-green-400 hover:shadow-md"
            >
              <i class="bi text-3xl text-green-600" :class="[hotline.icon]" />
              <span class="text-sm font-medium text-gray-700">
                {{ hotline.name }}
              </span>
              <span class="text-lg font-bold text-green-600">
                {{ hotline.number }}
              </span>
            </a>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
