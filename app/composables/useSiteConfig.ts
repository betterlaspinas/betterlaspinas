import {
  budget,
  configHelpers,
  faq,
  getFullLocation,
  history,
  hotlines,
  labels,
  legislative,
  lguName,
  news,
  officials,
  site,
  statistics,
  statisticsDetailed,
  subdivisions,
  tourism,
} from '@/utils/configHelper'

export function useSiteConfig() {
  const fullLocation = getFullLocation(site)

  return {
    // Raw configs
    siteConfig: computed(() => site),
    site,
    officials,
    subdivisions,
    hotlines,
    history,
    statistics,
    statisticsDetailed,
    news,
    faq,
    budget,
    legislative,
    tourism,

    // Derived values
    lguType: site.lguType,
    lguName,
    fullLocation,
    labels,

    // Utility functions
    getSiteTitle: () => configHelpers.getSiteTitle(site),
    getFullSiteTitle: (pageTitle?: string) =>
      configHelpers.getFullSiteTitle(site, pageTitle),
    getSiteDescription: () => configHelpers.getSiteDescription(site),
    getVolunteerEmail: () => configHelpers.getVolunteerEmail(site),
    getOpenGraphUrl: () => configHelpers.getOpenGraphUrl(site),
    getMapEmbedUrl: () => configHelpers.getMapEmbedUrl(site),
    formatPhoneLink: configHelpers.formatPhoneLink,
  }
}
