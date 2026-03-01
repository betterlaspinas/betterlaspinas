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

    <UiPageHero
      badge-icon="bi-people-fill"
      badge-text="Volunteer"
      :title="`Join the Better ${lguName} Team`"
      description="Be part of the movement for transparent and accessible governance data."
    />

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4 max-w-3xl text-center">
        <UiCard padding="p-8 md:p-12" class="shadow-sm">
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
            <UiButton
              :href="`mailto:${volunteerEmail}`"
              variant="solid"
              color="primary"
              size="lg"
            >
              <i class="bi bi-envelope-fill" />
              Email Us to Join
            </UiButton>

            <UiButton
              :href="site.social.github"
              target="_blank"
              variant="soft"
              color="gray"
              size="lg"
            >
              <i class="bi bi-github" />
              Contribute on GitHub
            </UiButton>
          </div>

          <p class="mt-6 text-sm text-gray-500">
            Or contact us at <a :href="`mailto:${volunteerEmail}`" class="text-primary-600 hover:underline">{{ volunteerEmail }}</a>
          </p>
        </UiCard>
      </div>
    </section>
  </div>
</template>
