<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  badgeIcon: string
  badgeText: string
  title: string
  description?: string
  badgeClass?: string
  class?: any
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  badgeClass: 'bg-primary-600 text-white',
})
</script>

<template>
  <div :class="cn('text-center mb-10', $props.class)">
    <UiBadge
      v-if="badgeText"
      :icon="badgeIcon"
      :text="badgeText"
      :class="cn('mb-3', badgeClass)"
      size="lg"
      variant="primary"
    />
    <h2 class="text-2xl font-bold text-gray-900 mb-2">
      {{ title }}
    </h2>
    <p v-if="description" class="text-gray-500">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
