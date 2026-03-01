<script setup lang="ts">
import ContactSection from '@/components/home/ContactSection.vue'
import Hero from '@/components/home/Hero.vue'
import History from '@/components/home/History.vue'
import Leadership from '@/components/home/Leadership.vue'
import PopularServices from '@/components/home/PopularServices.vue'
import QuickStats from '@/components/home/QuickStats.vue'
import WeatherMap from '@/components/home/WeatherMap.vue'

const { getFullSiteTitle, getOpenGraphUrl, lguName, labels } = useConfig()

const seoDesc = computed(() => `Welcome to Better ${lguName.value} — your digital gateway to ${labels.value.lguTypeLabel} of ${lguName.value} services, government information, and community resources.`)

useHead({
  title: 'Home',
})

useSeoMeta({
  description: () => seoDesc.value,
  ogTitle: () => getFullSiteTitle('Home'),
  ogDescription: () => seoDesc.value,
  ogType: 'website',
  ogUrl: () => getOpenGraphUrl(),
  twitterCard: 'summary',
  twitterTitle: () => getFullSiteTitle('Home'),
  twitterDescription: () => seoDesc.value,
})
</script>

<template>
  <div>
    <Hero />
    <PopularServices />
    <QuickStats />
    <WeatherMap />
    <History />
    <!-- TODO: Add back when available -->
    <!-- <LatestUpdates /> -->
    <Leadership />
    <ContactSection />
  </div>
</template>
