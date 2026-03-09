<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'
import HotlineBar from '@/components/layout/HotlineBar.vue'
import InfoBar from '@/components/layout/InfoBar.vue'
</script>

<template>
  <div class="max-w-full mx-auto bg-white shadow-xl min-h-screen relative">
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
    <HotlineBar />
    <Header />
    <InfoBar />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>
