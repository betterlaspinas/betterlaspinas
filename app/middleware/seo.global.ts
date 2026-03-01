import { getSeoConfig } from '../utils/seo-data'

export default defineNuxtRouteMiddleware((to) => {
  const seoConfig = getSeoConfig()
  const routeName = to.name as string
  const meta = seoConfig[routeName]

  if (meta) {
    useSeoMeta({
      title: meta.title,
      description: meta.description,
      ogTitle: meta.ogTitle || meta.title,
      ogDescription: meta.ogDescription || meta.description,
      ogType: meta.ogType || 'website',
      ogUrl: meta.ogUrl,
      twitterCard: meta.twitterCard || 'summary',
      twitterTitle: meta.ogTitle || meta.title,
      twitterDescription: meta.ogDescription || meta.description,
    })

    if (meta.title) {
      useHead({
        title: meta.title,
      })
    }
  }
})
