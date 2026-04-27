<script setup lang="ts">
const config = useConfig()

useSchemaOrg([
  defineWebPage({
    name: config.siteBrandName.value,
    url: config.getOpenGraphUrl(),
  }),
  defineWebSite({
    name: config.siteBrandName.value,
    url: config.getOpenGraphUrl(),
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
