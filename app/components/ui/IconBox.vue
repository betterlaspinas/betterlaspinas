<script setup lang="ts">
import { cn } from '@/utils/cn'

const props = withDefaults(defineProps<{
  icon: string
  title: string
  description: string
  class?: any
}>(), {
  class: '',
})
</script>

<template>
  <div :class="cn('text-center p-4', props.class)">
    <i :class="cn('bi text-3xl text-primary-600 mb-3 block', icon)" />
    <h3 class="font-semibold text-gray-900 mb-1">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>
