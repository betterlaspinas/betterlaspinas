<script setup lang="ts">
// These props are automatically passed by nuxt-og-image
const props = defineProps<{
  description?: string
}>()

const { site } = useConfig()

const logoPath = computed(() => site.value.logo?.whitePng || '/logos/svg/BetterGov_Icon-White.png')

const decodedDescription = computed(() => props.description ? decodeURIComponent(props.description) : '')
</script>

<template>
  <!-- Takumi supports Tailwind CSS natively via the `tw` prop/classes -->
  <div class="w-full h-full flex flex-col justify-between bg-gradient-to-br from-primary-500 to-primary-800 border-t-16 border-emerald-600 p-16">
    <!-- Top Section: Title & Description -->
    <div class="flex flex-col gap-6 w-full mt-16 items-center">
      <img :src="logoPath" alt="Logo" class="object-contain" width="160" height="160">
      <h1 class="text-7xl font-bold leading-tight tracking-tight text-white">
        BetterLasPinas.org
      </h1>
      <h1 class="text-3xl leading-tight tracking-tight text-white">
        {{ decodedDescription }}
      </h1>
    </div>
  </div>
</template>
