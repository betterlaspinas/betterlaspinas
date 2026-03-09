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

  if (import.meta.dev && !routeConfig && routeName && !routeName.startsWith('error')) {
    console.warn(`[SEO] No SEO config found for route: "${routeName}"`)
  }

  if (routeConfig && !routeConfig.hidden) {
    // Build template variables for interpolation
    const templateVars = {
      lguName: config.lguName.value,
      siteBrandName: config.siteBrandName.value,
      lguTypeLabel: config.labels.value.lguTypeLabel,
      legislativeBody: config.labels.value.legislativeBody,
      deptPrefix: config.labels.value.deptPrefix,
    }

    const title = config.getFullSiteTitle(routeConfig.titleFragment)
    const description = interpolateString(routeConfig.description, templateVars)
    // Use the live route path for ogUrl so dynamic routes (e.g. news/[slug]) get the correct URL
    const ogUrl = `${config.getOpenGraphUrl().replace(/\/$/, '')}${to.path}`

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: routeConfig.ogType || 'website',
      ogUrl,
      twitterCard: routeConfig.twitterCard || 'summary',
      twitterTitle: title,
      twitterDescription: description,
    })

    useHead({
      titleTemplate: '%s',
    })
  }
})
