<script setup lang="ts">
const config = useConfig()

defineOgImage('DefaultBranding.takumi', {
  title: config.siteBrandName.value,
})
useSchemaOrg([
  defineWebPage({
    name: config.siteBrandName.value,
  }),
  defineWebSite({
    name: config.siteBrandName.value,
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
