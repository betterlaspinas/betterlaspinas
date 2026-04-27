<script setup lang="ts">
// These props are automatically passed by nuxt-og-image
const props = defineProps<{
  title: string
  description?: string
}>()

const { site, siteBrandName, lguName } = useConfig()

const logoPath = computed(() => site.value.logo?.whitePng || '/logos/svg/BetterGov_Icon-White.png')
</script>

<template>
  <!-- Takumi supports Tailwind CSS natively via the `tw` prop/classes -->
  <div class="w-full h-full flex flex-col justify-between bg-gradient-to-br from-primary-500 to-primary-800 border-t-16 border-emerald-600 p-16">
    <!-- Top Section: Title & Description -->
    <div class="flex flex-col gap-10 w-full mt-16 items-start">
      <h1 class="text-7xl font-bold leading-tight tracking-tight text-white">
        {{ props.title }}
      </h1>
      <h1 class="text-3xl leading-tight tracking-tight text-white">
        {{ props.description }}
      </h1>
    </div>

    <!-- Logo and Site brand name with one-liner -->
    <div class="w-full flex flex-row justify-between items-center gap-4">
      <div class="w-1/2 flex flex-row justify-start items-center gap-4">
        <img :src="logoPath" alt="Logo" class="object-contain" width="64" height="64">
        <p class="text-3xl font-bold leading-tight tracking-tight text-white">
          {{ siteBrandName }}
        </p>
      </div>
      <div class="w-1/2 flex flex-row justify-end items-center gap-4">
        <p class="text-3xl leading-tight tracking-tight text-white">
          Empowering the people of {{ lguName }}
        </p>
      </div>
    </div>
  </div>
</template>
