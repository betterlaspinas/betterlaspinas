<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { getVolunteerEmail, lguName, site } = useConfig()
const volunteerEmail = computed(() => getVolunteerEmail())

useHead({
  title: 'Join Us',
})
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Join Us' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-people-fill" /> Volunteer
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Better {{ lguName }} Team
          </h1>
          <p class="text-lg text-white/90">
            Be part of the movement for transparent and accessible governance data.
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4 max-w-3xl text-center">
        <div class="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
          <div class="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 text-3xl">
            <i class="bi bi-heart-fill" />
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            We Need Your Help!
          </h2>

          <p class="text-gray-600 mb-8 leading-relaxed">
            Better {{ lguName }} is a volunteer-run initiative dedicated to making local government information accessible to everyone. We are looking for developers, designers, writers, and community organizers to help maintain and improve this platform.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              :href="`mailto:${volunteerEmail}`"
              class="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              <i class="bi bi-envelope-fill" />
              Email Us to Join
            </a>

            <a
              :href="site.social.github"
              target="_blank"
              class="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-all hover:bg-gray-200 hover:text-gray-900"
            >
              <i class="bi bi-github" />
              Contribute on GitHub
            </a>
          </div>

          <p class="mt-6 text-sm text-gray-500">
            Or contact us at <a :href="`mailto:${volunteerEmail}`" class="text-primary-600 hover:underline">{{ volunteerEmail }}</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
