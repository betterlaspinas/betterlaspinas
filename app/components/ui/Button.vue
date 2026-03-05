<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  to?: string | object
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'solid' | 'outline' | 'ghost' | 'soft'
  color?: 'primary' | 'gray' | 'success' | 'danger'
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
      success: 'focus:ring-green-500',
      danger: 'focus:ring-red-500',
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

    { color: 'success', variant: 'solid', class: 'bg-green-600 text-white hover:bg-green-700 border-transparent' },
    { color: 'success', variant: 'outline', class: 'border-green-600 text-green-600 hover:bg-green-50' },
    { color: 'success', variant: 'ghost', class: 'text-green-600 hover:bg-green-50' },
    { color: 'success', variant: 'soft', class: 'bg-green-50 text-green-700 hover:bg-green-100' },

    { color: 'danger', variant: 'solid', class: 'bg-red-600 text-white hover:bg-red-700 border-transparent' },
    { color: 'danger', variant: 'outline', class: 'border-red-600 text-red-600 hover:bg-red-50' },
    { color: 'danger', variant: 'ghost', class: 'text-red-600 hover:bg-red-50' },
    { color: 'danger', variant: 'soft', class: 'bg-red-50 text-red-700 hover:bg-red-100' },
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
