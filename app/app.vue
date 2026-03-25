<script setup lang="ts">
const config = useConfig()

defineOgImage('DefaultBranding.takumi', {
  title: config.siteBrandName.value,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
