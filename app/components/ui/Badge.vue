<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  text?: string
  icon?: string
  variant?: 'primary' | 'solid-primary' | 'white-translucent' | 'gray' | 'success' | 'warning' | 'error'
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
      'success': 'bg-success-100 text-success-700',
      'warning': 'bg-warning-100 text-warning-800',
      'error': 'bg-error-100 text-error-700',
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
