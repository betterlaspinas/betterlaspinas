<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray'
  layout?: 'row' | 'col'
  class?: any
}>(), {
  title: '',
  icon: '',
  variant: 'primary',
  layout: 'row',
})

const alert = tv({
  base: 'border rounded-2xl p-8',
  variants: {
    variant: {
      primary: 'bg-primary-50 border-primary-200',
      success: 'bg-green-50 border-green-200',
      warning: 'bg-yellow-50 border-yellow-200',
      danger: 'bg-red-50 border-red-200',
      info: 'bg-blue-50 border-blue-200',
      gray: 'bg-gray-50 border-gray-200',
    },
    layout: {
      row: 'flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left',
      col: 'text-center flex flex-col items-center',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'row',
  },
})

const iconWrapper = tv({
  base: 'shrink-0',
  variants: {
    layout: {
      row: 'text-3xl',
      col: 'text-4xl mb-4 block',
    },
  },
  defaultVariants: {
    layout: 'row',
  },
})

const iconColor = tv({
  base: '',
  variants: {
    variant: {
      primary: 'text-primary-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600',
      info: 'text-blue-600',
      gray: 'text-gray-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
</script>

<template>
  <div :class="alert({ variant, layout, class: props.class })">
    <i
      v-if="icon"
      class="bi" :class="[icon, iconWrapper({ layout }), iconColor({ variant })]"
    />
    <div class="flex-1 w-full">
      <h3
        v-if="title || $slots.title"
        class="font-semibold text-gray-900 mb-2" :class="[layout === 'col' ? 'text-xl' : 'text-lg']"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h3>
      <div class="text-gray-600 leading-relaxed">
        <slot />
      </div>
    </div>
  </div>
</template>
