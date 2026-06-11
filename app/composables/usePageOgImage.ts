import { slugToTitleCase } from '@/utils/stringHelpers'

export function usePageOgImage({ isHomePage = false }: { isHomePage?: boolean } = {}) {
  const route = useRoute()
  const config = useConfig()
  const routeName = route.name as string

  const templateVars: Record<string, string> = {
    lguName: config.lguName.value,
    siteBrandName: config.siteBrandName.value,
    lguTypeLabel: config.labels.value.lguTypeLabel,
    legislativeBody: config.labels.value.legislativeBody,
    deptPrefix: config.labels.value.deptPrefix,
  }

  if (route.params) {
    for (const [key, value] of Object.entries(route.params)) {
      const strValue = Array.isArray(value) ? value.join('-') : String(value)
      templateVars[key] = slugToTitleCase(strValue)
    }
  }

  const ogImageData = config.getOgImageRouteConfig(routeName, templateVars)

  const brandingTemplate = isHomePage ? 'DefaultBranding.takumi' : 'SubPageBranding.takumi'

  if (ogImageData) {
    defineOgImage(brandingTemplate, {
      title: ogImageData.title,
      description: ogImageData.description,
    })
  }
}
