<script setup lang="ts">
const config = useConfig()

defineOgImage('DefaultBranding.takumi', {
  title: config.siteBrandName.value,
})
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
