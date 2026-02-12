<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="container mx-auto px-4">
    <nav class="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-primary-600">
        Home
      </NuxtLink>
      <template v-for="(item, index) in items" :key="index">
        <span class="mx-2">/</span>
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          class="hover:text-primary-600"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          aria-current="page"
          class="text-gray-900"
        >
          {{ item.label }}
        </span>
      </template>
    </nav>
  </div>
</template>
