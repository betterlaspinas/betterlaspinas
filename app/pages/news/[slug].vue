<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const route = useRoute()
const { news, labels, lguName } = useConfig()

const slug = route.params.slug as string
const article = computed(() => news.articles.find((a: any) => a.slug === slug))

useHead({
  title: article.value ? article.value.title : 'News Article',
})

// TODO: Add SEO when news feature gets implemented.

// Badge color mapping (reused from index)
const badgeColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
}

const badgeColorClass = computed(() => {
  if (!article.value)
    return ''
  return badgeColorMap[article.value.badgeColor] || badgeColorMap.blue
})

const processedDescription = computed(() => {
  if (!article.value)
    return ''
  return article.value.description
    .replace(/\{\{deptPrefix\}\}/g, labels.value.deptPrefix)
    .replace(/\{\{lguName\}\}/g, lguName.value)
})
</script>

<template>
  <div v-if="article">
    <Breadcrumbs
      :items="[
        { label: 'News', href: '/news' },
        { label: article.title },
      ]"
    />

    <article class="py-12">
      <div class="container mx-auto px-4 max-w-3xl">
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="text-xs font-semibold px-3 py-1 rounded-full"
              :class="badgeColorClass"
            >
              {{ article.badge }}
            </span>
            <span class="text-gray-500 text-sm flex items-center gap-1">
              <i class="bi bi-calendar3" /> {{ article.date }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {{ article.title }}
          </h1>
        </header>

        <div class="prose prose-lg prose-blue max-w-none">
          <p class="lead text-xl text-gray-600 mb-8">
            {{ processedDescription }}
          </p>
          <div v-if="article.content">
            <div v-html="article.content" />
          </div>
          <div v-else class="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-500 italic">
            Full article content would go here. This is a placeholder for the migration demo.
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-200">
          <NuxtLink to="/news" class="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline">
            <i class="bi bi-arrow-left" /> Back to News
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
  <div v-else class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">
      Article Not Found
    </h1>
    <p class="text-gray-600 mb-8">
      The news article you are looking for does not exist.
    </p>
    <NuxtLink to="/news" class="btn btn-primary">
      Back to News
    </NuxtLink>
  </div>
</template>
