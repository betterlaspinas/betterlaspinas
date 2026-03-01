<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  text?: string
  icon?: string
  variant?: 'primary' | 'solid-primary' | 'white-translucent' | 'gray' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  class?: any
}>(), {
  text: '',
  icon: '',
  variant: 'primary',
  size: 'md',
  class: '',
})

const badge = tv({
  base: 'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap',
  variants: {
    variant: {
      'primary': 'bg-primary-100 text-primary-700',
      'solid-primary': 'bg-primary-600 text-white',
      'white-translucent': 'bg-white/20 text-white',
      'gray': 'bg-gray-100 text-gray-700',
      'success': 'bg-green-100 text-green-700',
      'warning': 'bg-yellow-100 text-yellow-800',
      'danger': 'bg-red-100 text-red-700',
    },
    size: {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
</script>

<template>
  <span :class="badge({ variant, size, class: props.class })">
    <i v-if="icon" :class="`bi ${icon}`" />
    <slot>{{ text }}</slot>
  </span>
</template>
