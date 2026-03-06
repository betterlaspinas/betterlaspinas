<script setup lang="ts">
import ContactSection from '@/components/home/ContactSection.vue'
import Hero from '@/components/home/Hero.vue'
import History from '@/components/home/History.vue'
import Leadership from '@/components/home/Leadership.vue'
import PopularServices from '@/components/home/PopularServices.vue'
import QuickStats from '@/components/home/QuickStats.vue'
import WeatherMap from '@/components/home/WeatherMap.vue'
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
