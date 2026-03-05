import { getVisibleSeoConfig } from '../utils/configHelper'

export default defineNuxtRouteMiddleware((to) => {
  const { site } = useConfig()
  const seoConfig = getVisibleSeoConfig(site.value)
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
