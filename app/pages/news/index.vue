<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { lguName, labels, news } = useConfig()

useHead({
  title: 'News & Announcements',
})

// Badge color mapping
const badgeColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
}

// Map news articles
const newsItems = computed(() => news.articles.map((article: any) => ({
  id: article.id,
  title: article.title,
  date: article.date,
  badge: article.badge,
  badgeColorClass: badgeColorMap[article.badgeColor] || badgeColorMap.blue,
  description: article.description
    .replace(/\{\{deptPrefix\}\}/g, labels.value.deptPrefix)
    .replace(/\{\{lguName\}\}/g, lguName.value),
  slug: article.slug,
})))
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'News & Announcements' }]" />

    <UiPageHero
      badge-icon="bi-newspaper"
      badge-text="News"
      title="News & Announcements"
      :description="`Stay updated with the latest news and announcements from the ${labels.lguTypeLabel} of ${lguName}`"
    />

    <!-- News List -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto space-y-6">
          <UiCard
            v-for="item in newsItems"
            :key="item.id"
            interactive
            class="border-transparent hover:border-primary-500"
          >
            <div class="flex items-center gap-3 mb-4">
              <span
                class="text-xs font-semibold px-3 py-1 rounded-full"
                :class="item.badgeColorClass"
              >
                {{ item.badge }}
              </span>
              <span class="text-gray-400 text-sm flex items-center gap-1">
                <i class="bi bi-calendar3" /> {{ item.date }}
              </span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-3">
              {{ item.title }}
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              {{ item.description }}
            </p>
            <NuxtLink
              :to="`/news/${item.slug}`"
              class="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Read More <i class="bi bi-arrow-right" />
            </NuxtLink>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
