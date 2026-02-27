<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const props = defineProps<{
  to?: string | object
  href?: string
  padding?: string
  interactive?: boolean
  class?: any
}>()

const card = tv({
  base: 'bg-white border border-gray-200 rounded-xl block',
  variants: {
    interactive: {
      true: 'hover-card-premium cursor-pointer no-underline text-inherit',
    },
  },
})

const baseClasses = computed(() => {
  return card({
    interactive: props.interactive,
    class: [props.padding !== undefined ? props.padding : 'p-6', props.class],
  })
})
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="baseClasses">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="baseClasses">
    <slot />
  </a>
  <div v-else :class="baseClasses">
    <slot />
  </div>
</template>
