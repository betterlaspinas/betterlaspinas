<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/utils/cn'

const props = withDefaults(defineProps<{
  title: string
  isOpen?: boolean
  class?: any
}>(), {
  isOpen: false,
  class: '',
})

const isOpenInternal = ref(props.isOpen)

function toggle() {
  isOpenInternal.value = !isOpenInternal.value
}
</script>

<template>
  <div :class="cn('bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300', props.class)">
    <button
      type="button"
      class="w-full p-4 flex items-center justify-between font-medium text-gray-900 hover:bg-gray-50 transition-colors text-left"
      @click="toggle"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <i
        class="bi bi-chevron-down text-gray-400 transition-transform duration-300"
        :class="{ 'rotate-180': isOpenInternal }"
      />
    </button>
    <div
      v-show="isOpenInternal"
      class="p-4 border-t border-gray-200"
    >
      <slot />
    </div>
  </div>
</template>
