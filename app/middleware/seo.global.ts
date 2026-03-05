import type { SeoMetaData } from '@/types/config'

// Helper to interpolate template variables
function interpolateString(
  content: string,
  vars: Record<string, string>,
): string {
  if (!content)
    return ''
  return Object.entries(vars).reduce(
    (text, [key, value]) =>
      text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
    content,
  )
}

export default defineNuxtRouteMiddleware((to) => {
  const config = useConfig()
  const rawSeoConfig = getSeoConfig()
  const routeName = to.name as string
  const routeConfig = rawSeoConfig[routeName]

  if (
    routeConfig
    && !routeConfig.hidden
  ) {
    // Build template variables for interpolation
    const templateVars = {
      lguName: config.lguName.value,
      siteBrandName: config.siteBrandName.value,
      lguTypeLabel: config.labels.value.lguTypeLabel,
      legislativeBody: config.labels.value.legislativeBody,
      deptPrefix: config.labels.value.deptPrefix,
    }

    // Map raw config to SeoMetaData
    const title = config.getFullSiteTitle(routeConfig.titleFragment)
    const description = interpolateString(routeConfig.description, templateVars)
    const openGraphUrl = config.getOpenGraphUrl()
    const ogUrl = routeConfig.urlPath ? `${openGraphUrl}${routeConfig.urlPath}` : openGraphUrl

    const meta: SeoMetaData = {
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: routeConfig.ogType,
      ogUrl,
      twitterCard: routeConfig.twitterCard,
      twitterTitle: title,
      twitterDescription: description,
      hidden: routeConfig.hidden,
    }

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
