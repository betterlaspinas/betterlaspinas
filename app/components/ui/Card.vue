<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  to?: string | object
  href?: string
  padding?: string
  interactive?: boolean
  class?: any
}>(), {
  interactive: false,
})

const card = tv({
  base: 'bg-white border border-gray-200 rounded-xl block',
  variants: {
    interactive: {
      true: 'hover-card-premium cursor-pointer no-underline text-inherit',
    },
  },
})
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="card({ interactive, class: [padding ?? 'p-6', props.class] })">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="card({ interactive, class: [padding ?? 'p-6', props.class] })">
    <slot />
  </a>
  <div v-else :class="card({ interactive, class: [padding ?? 'p-6', props.class] })">
    <slot />
  </div>
</template>
