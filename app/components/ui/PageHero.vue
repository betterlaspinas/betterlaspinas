<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  badgeIcon: string
  badgeText: string
  title: string
  description: string
  class?: any
}

defineProps<Props>()
</script>

<template>
  <section :class="cn('bg-gradient-to-br from-primary-600 to-primary-700 py-16', $props.class)">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto">
        <UiBadge
          v-if="badgeText"
          :icon="badgeIcon"
          :text="badgeText"
          variant="white-translucent"
          size="lg"
          class="mb-4"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title }}
        </h1>
        <p class="text-lg text-white/90">
          {{ description }}
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>
