<script setup lang="ts">
// These props are automatically passed by nuxt-og-image
import { SVG_EXTENSION_REGEX } from '~/utils/regexConstants'

const props = defineProps<{
  title: string
  description?: string
  siteName?: string
}>()

const { site } = useConfig()

const logoPath = computed(() => {
  const path = site.value.logo?.white || '/logos/svg/BetterGov_Icon-White.svg'
  return path.replace(SVG_EXTENSION_REGEX, '.png')
})
</script>

<template>
  <!-- Takumi supports Tailwind CSS natively via the `tw` prop/classes -->
  <div class="w-full h-full flex flex-col justify-between bg-gradient-to-br from-primary-600 to-primary-700 border-t-16 border-emerald-600 p-16">
    <!-- Top Section: Title & Description -->
    <div class="flex flex-col gap-6 w-full mt-16 items-center">
      <img :src="logoPath" alt="Logo" class="object-contain" width="160" height="160">
      <h1 class="text-7xl font-bold leading-tight tracking-tight text-white">
        {{ props.title }}
      </h1>
      <h1 class="text-3xl leading-tight tracking-tight text-white">
        Empowering the people of Las Piñas
      </h1>
    </div>
  </div>
</template>
