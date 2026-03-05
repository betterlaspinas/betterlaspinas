<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: any
}>()

const { language, setLanguage } = useLanguage()

const LANGUAGES = {
  en: 'English',
  fil: 'Filipino',
  ilo: 'Ilocano',
} as const
</script>

<template>
  <select
    :value="language"
    :class="cn('border border-gray-300 rounded-sm px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-hidden focus:ring-1 focus:ring-primary-600 focus:border-primary-600', props.class)"
    @change="(e) => setLanguage((e.target as HTMLSelectElement).value as any)"
  >
    <option v-for="(name, code) in LANGUAGES" :key="code" :value="code">
      {{ name }}
    </option>
  </select>
</template>
