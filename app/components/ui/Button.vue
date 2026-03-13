<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  to?: string | object
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'solid' | 'outline' | 'ghost' | 'soft'
  color?: 'primary' | 'gray' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: any
}>(), {
  type: 'button',
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disabled: false,
})

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer no-underline text-center',
  variants: {
    color: {
      primary: 'focus:ring-primary-500',
      gray: 'focus:ring-gray-500',
      success: 'focus:ring-success-500',
      error: 'focus:ring-error-500',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border border-transparent',
      soft: 'border border-transparent',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'solid', class: 'bg-primary-600 text-white hover:bg-primary-700 hover-btn-premium border-transparent' },
    { color: 'primary', variant: 'outline', class: 'border-primary-600 text-primary-600 hover:bg-primary-50' },
    { color: 'primary', variant: 'ghost', class: 'text-primary-600 hover:bg-primary-50' },
    { color: 'primary', variant: 'soft', class: 'bg-primary-50 text-primary-700 hover:bg-primary-100' },

    { color: 'gray', variant: 'solid', class: 'bg-gray-800 text-white hover:bg-gray-900 border-transparent' },
    { color: 'gray', variant: 'outline', class: 'border-gray-300 text-gray-700 hover:bg-gray-50' },
    { color: 'gray', variant: 'ghost', class: 'text-gray-600 hover:bg-gray-50' },
    { color: 'gray', variant: 'soft', class: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },

    { color: 'success', variant: 'solid', class: 'bg-success-600 text-white hover:bg-success-700 border-transparent' },
    { color: 'success', variant: 'outline', class: 'border-success-600 text-success-600 hover:bg-success-50' },
    { color: 'success', variant: 'ghost', class: 'text-success-600 hover:bg-success-50' },
    { color: 'success', variant: 'soft', class: 'bg-success-50 text-success-700 hover:bg-success-100' },

    { color: 'error', variant: 'solid', class: 'bg-error-600 text-white hover:bg-error-700 border-transparent' },
    { color: 'error', variant: 'outline', class: 'border-error-600 text-error-600 hover:bg-error-50' },
    { color: 'error', variant: 'ghost', class: 'text-error-600 hover:bg-error-50' },
    { color: 'error', variant: 'soft', class: 'bg-error-50 text-error-700 hover:bg-error-100' },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="button({ variant, color, size, class: props.class })"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="button({ variant, color, size, class: props.class })"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="button({ variant, color, size, class: props.class })"
  >
    <slot />
  </button>
</template>
