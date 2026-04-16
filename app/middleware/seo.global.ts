import seoServiceDetailsSlug from '@/config/seo-service-details-slug.json'
import seoServicesCategory from '@/config/seo-services-category.json'

import { TRAILING_SLASH_REGEX } from '@/utils/regexConstants'
import { interpolateString, slugToTitleCase } from '@/utils/stringHelpers'

export default defineNuxtRouteMiddleware((to) => {
  const config = useConfig()
  const rawSeoConfig = getSeoConfig()
  const routeName = to.name as string
  const routeConfig = rawSeoConfig[routeName]

  if (import.meta.dev && !routeConfig && routeName && !routeName.startsWith('error')) {
    console.warn(`[SEO] No SEO config found for route: "${routeName}"`)
  }

  if (routeConfig && !routeConfig.hidden) {
    // Build template variables for interpolation
    const templateVars: Record<string, string> = {
      lguName: config.lguName.value,
      siteBrandName: config.siteBrandName.value,
      lguTypeLabel: config.labels.value.lguTypeLabel,
      legislativeBody: config.labels.value.legislativeBody,
      deptPrefix: config.labels.value.deptPrefix,
    }

    if (to.params) {
      for (const [key, value] of Object.entries(to.params)) {
        const strValue = Array.isArray(value) ? value.join('-') : String(value)
        templateVars[key] = slugToTitleCase(strValue)
      }
    }

    const titleFragment = interpolateString(routeConfig.titleFragment, templateVars)
    const title = config.getFullSiteTitle(titleFragment)

    let descriptionTemplate = routeConfig.description

    if (routeName === 'services-category' && to.params.category) {
      const categorySlug = (Array.isArray(to.params.category) ? to.params.category[0] : to.params.category) as string
      const customDesc = (seoServicesCategory as Record<string, string>)[categorySlug]
      if (customDesc) {
        descriptionTemplate = customDesc
      }
    }
    else if (routeName === 'service-details-slug' && to.params.slug) {
      const serviceSlug = (Array.isArray(to.params.slug) ? to.params.slug[0] : to.params.slug) as string
      const customDesc = (seoServiceDetailsSlug as Record<string, string>)[serviceSlug]
      if (customDesc) {
        descriptionTemplate = customDesc
      }
    }

    const description = interpolateString(descriptionTemplate, templateVars)
    // Use the live route path for ogUrl so dynamic routes (e.g. news/[slug]) get the correct URL
    const ogUrl = `${config.getOpenGraphUrl().replace(TRAILING_SLASH_REGEX, '')}${to.path}`

    const ogImageData = config.getOgImageRouteConfig(routeName, templateVars)

    const nuxtApp = useNuxtApp()
    nuxtApp.runWithContext(() => {
      useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogType: routeConfig.ogType || 'website',
        ogUrl,
        twitterCard: routeConfig.twitterCard || 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
      })

      useHead({
        titleTemplate: '%s',
      })

      if (ogImageData) {
        // Suppress `useRoute` warning from Nuxt when calling `defineOgImage` inside middleware
        const isCallingMiddleware = (nuxtApp as any)._isCallingMiddleware
        try {
          nuxtApp._isCallingMiddleware = false

          defineOgImage('DefaultBranding.takumi', {
            title: ogImageData.title,
            description: ogImageData.description,
          })
        }
        finally {
          nuxtApp._isCallingMiddleware = isCallingMiddleware
        }
      }
    })
  }
})
