import type { SiteConfig } from '@/types/config'
import {
  configHelpers,
  getBudgetConfig,
  getCategoriesConfig,
  getFAQConfig,
  getFullLocation,
  getHistoryConfig,
  getHotlinesConfig,
  getLegislativeConfig,
  getLGUName,
  getLGUNameConcatenated,
  getLGUNameDomain,
  getLGUTypeLabels,
  getMergedSiteConfig,
  getNavigationConfig,
  getNewsConfig,
  getOfficialsConfig,
  getServicesConfig,
  getSiteBrandName,
  getStatisticsConfig,
  getStatisticsDetailedConfig,
  getSubdivisionsConfig,
  getTourismConfig,
  getTranslationOverrides,
} from '@/utils/configHelper'

/**
 * The single source of truth for all LGU configuration.
 * Merges .env overrides onto site.json defaults and exposes all config as reactive refs.
 * Use this composable everywhere — never import from configHelper directly in components.
 */
export function useConfig() {
  const runtimeConfig = useRuntimeConfig()

  // Merge .env overrides onto site.json defaults.
  // getMergedSiteConfig is a pure function — testable without Nuxt context.
  const site = computed<SiteConfig>(() =>
    getMergedSiteConfig(runtimeConfig.public.site),
  )

  // Derived values — reactive, recomputed whenever site changes
  const lguType = computed(() => site.value.lguType)
  const lguName = computed(() => getLGUName(site.value))
  const siteBrandName = computed(() => getSiteBrandName(site.value))
  const lguNameConcatenated = computed(() => getLGUNameConcatenated(site.value))
  const lguNameDomain = computed(() => getLGUNameDomain(site.value))
  const fullLocation = computed(() => getFullLocation(site.value))
  const labels = computed(() => getLGUTypeLabels(site.value.lguType))

  return {
    // --- Site config (env-overridable) ---
    site,

    // --- Static configs (content, not env-overridable) ---
    officials: getOfficialsConfig(),
    subdivisions: getSubdivisionsConfig(),
    hotlines: getHotlinesConfig(),
    history: getHistoryConfig(),
    statistics: getStatisticsConfig(),
    statisticsDetailed: getStatisticsDetailedConfig(),
    news: getNewsConfig(),
    faq: getFAQConfig(),
    budget: getBudgetConfig(),
    legislative: getLegislativeConfig(),
    tourism: getTourismConfig(),
    navigation: getNavigationConfig(),
    servicesConfig: getServicesConfig(),
    translations: getTranslationOverrides(),
    categories: getCategoriesConfig(),

    // --- Derived computed values ---
    lguType,
    lguName,
    siteBrandName,
    lguNameConcatenated,
    lguNameDomain,
    fullLocation,
    labels,

    // --- Utility functions ---
    getSiteTitle: () => configHelpers.getSiteTitle(site.value),
    getFullSiteTitle: (pageTitle?: string) =>
      configHelpers.getFullSiteTitle(site.value, pageTitle),
    getSiteDescription: () => configHelpers.getSiteDescription(site.value),
    getVolunteerEmail: () => configHelpers.getVolunteerEmail(site.value),
    getOpenGraphUrl: () => configHelpers.getOpenGraphUrl(site.value),
    getMapEmbedUrl: () => configHelpers.getMapEmbedUrl(site.value),
    getOfficialWebsite: () => configHelpers.getOfficialWebsite(site.value),
    formatPhoneLink: configHelpers.formatPhoneLink,
  }
}
