import type {
  BudgetConfig,
  CategoriesConfig,
  FAQConfig,
  HistoryConfig,
  HotlinesConfig,
  LegislativeConfig,
  LGUConfig,
  LGUType,
  LGUTypeLabels,
  NavigationConfig,
  NewsConfig,
  OfficialsConfig,
  ServicesConfig,
  SiteConfig,
  StatisticsConfig,
  StatisticsDetailedConfig,
  SubdivisionsConfig,
  TourismConfig,
  TranslationOverrides,
} from '@/types/config'

import budgetConfig from '../config/budget.json'
import categoriesConfig from '../config/categories.json'
import faqConfig from '../config/faq.json'
import historyConfig from '../config/history.json'
import hotlinesConfig from '../config/hotlines.json'
import legislativeConfig from '../config/legislative.json'
import navigationConfig from '../config/navigation.json'
import newsConfig from '../config/news.json'
import officialsConfig from '../config/officials.json'
import servicesConfig from '../config/services.json'
// Import JSON config files
import siteConfig from '../config/site.json'
import statisticsDetailedConfig from '../config/statistics-detailed.json'
import statisticsConfig from '../config/statistics.json'
import subdivisionsConfig from '../config/subdivisions.json'
import tourismConfig from '../config/tourism.json'
import translationsConfig from '../config/translations.json'

// LGU Type Labels mapping
const MUNICIPALITY_LABELS: LGUTypeLabels = {
  leaderTitle: 'Mayor',
  viceLeaderTitle: 'Vice Mayor',
  legislativeBody: 'Sangguniang Bayan',
  legislativeBodyAbbr: 'SB',
  legislativeMembers: 'SB Members',
  subdivisionType: 'Barangay',
  subdivisionTypePlural: 'Barangays',
  subdivisionLeader: 'Barangay Captain',
  deptPrefix: 'Municipal',
  hallName: 'Municipal Hall',
  lguTypeLabel: 'Municipality',
}

const CITY_LABELS: LGUTypeLabels = {
  leaderTitle: 'Mayor',
  viceLeaderTitle: 'Vice Mayor',
  legislativeBody: 'Sangguniang Panlungsod',
  legislativeBodyAbbr: 'SP',
  legislativeMembers: 'Councilors',
  subdivisionType: 'Barangay',
  subdivisionTypePlural: 'Barangays',
  subdivisionLeader: 'Barangay Captain',
  deptPrefix: 'City',
  hallName: 'City Hall',
  lguTypeLabel: 'City',
}

const PROVINCE_LABELS: LGUTypeLabels = {
  leaderTitle: 'Governor',
  viceLeaderTitle: 'Vice Governor',
  legislativeBody: 'Sangguniang Panlalawigan',
  legislativeBodyAbbr: 'SP',
  legislativeMembers: 'Board Members',
  subdivisionType: 'Municipality/City',
  subdivisionTypePlural: 'Municipalities/Cities',
  subdivisionLeader: 'Mayor',
  deptPrefix: 'Provincial',
  hallName: 'Provincial Capitol',
  lguTypeLabel: 'Province',
}

/**
 * Get the LGU type labels based on the LGU type
 */
export function getLGUTypeLabels(lguType: LGUType): LGUTypeLabels {
  if (lguType === 'City') {
    return CITY_LABELS
  }
  return lguType === 'Province' ? PROVINCE_LABELS : MUNICIPALITY_LABELS
}

/**
 * Get the LGU name based on the LGU type
 * - For municipality: returns the municipality name
 * - For province: returns the province name
 */
export function getLGUName(site: SiteConfig): string {
  if (site.lguType === 'City' && site.city) {
    return site.city
  }
  return site.lguType === 'Province' ? site.province : site.municipality
}

/**
 * Get the concatenated LGU name (no spaces) for branding (e.g. BetterLasPiñas)
 */
export function getLGUNameConcatenated(site: SiteConfig): string {
  return getLGUName(site).replace(/\s+/g, '')
}

/**
 * Get the domain-safe LGU name (no spaces, no diacritics/special chars)
 * e.g. "Las Piñas" -> "LasPinas"
 */
export function getLGUNameDomain(site: SiteConfig): string {
  return getLGUName(site)
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/\s+/g, '')
}

/**
 * Get the full location string
 * - For municipality: "Municipality, Province"
 * - For city: "City, Province"
 * - For province: "Province, Region"
 */
export function getFullLocation(site: SiteConfig): string {
  if (site.lguType === 'Province') {
    return `${site.province}, ${site.region}`
  }
  if (site.lguType === 'City' && site.city) {
    return `${site.city}, ${site.province}`
  }
  return `${site.municipality}, ${site.province}`
}

/**
 * Get the site config with proper typing
 */
export function getSiteConfig(): SiteConfig {
  return siteConfig as SiteConfig
}

/**
 * Get the officials config with proper typing
 */
export function getOfficialsConfig(): OfficialsConfig {
  return officialsConfig as unknown as OfficialsConfig
}

/**
 * Get the subdivisions config with proper typing
 */
export function getSubdivisionsConfig(): SubdivisionsConfig {
  return subdivisionsConfig as SubdivisionsConfig
}

/**
 * Get the hotlines config with proper typing
 */
export function getHotlinesConfig(): HotlinesConfig {
  return hotlinesConfig as HotlinesConfig
}

/**
 * Get the history config with proper typing
 */
export function getHistoryConfig(): HistoryConfig {
  return historyConfig as HistoryConfig
}

/**
 * Get the statistics config with proper typing
 */
export function getStatisticsConfig(): StatisticsConfig {
  return statisticsConfig as StatisticsConfig
}

/**
 * Get the translation overrides with proper typing
 */
export function getTranslationOverrides(): TranslationOverrides {
  return translationsConfig as TranslationOverrides
}

/**
 * Get the navigation config with proper typing
 */
export function getNavigationConfig(): NavigationConfig {
  return navigationConfig as NavigationConfig
}

/**
 * Get the categories config with proper typing
 */
export function getCategoriesConfig(): CategoriesConfig {
  return categoriesConfig as CategoriesConfig
}

/**
 * Get the services config with proper typing
 */
export function getServicesConfig(): ServicesConfig {
  return servicesConfig as ServicesConfig
}

/**
 * Get the detailed statistics config with proper typing
 */
export function getStatisticsDetailedConfig(): StatisticsDetailedConfig {
  return statisticsDetailedConfig as StatisticsDetailedConfig
}

/**
 * Get the news config with proper typing
 */
export function getNewsConfig(): NewsConfig {
  return newsConfig as NewsConfig
}

/**
 * Get the FAQ config with proper typing
 */
export function getFAQConfig(): FAQConfig {
  return faqConfig as FAQConfig
}

/**
 * Get the budget config with proper typing
 */
export function getBudgetConfig(): BudgetConfig {
  return budgetConfig as BudgetConfig
}

/**
 * Get the legislative config with proper typing
 */
export function getLegislativeConfig(): LegislativeConfig {
  return legislativeConfig as LegislativeConfig
}

/**
 * Get the tourism config with proper typing
 */
export function getTourismConfig(): TourismConfig {
  return tourismConfig as TourismConfig
}

/**
 * Get the complete LGU configuration bundle
 */
export function getLGUConfig(): LGUConfig {
  return {
    site: getSiteConfig(),
    officials: getOfficialsConfig(),
    subdivisions: getSubdivisionsConfig(),
    hotlines: getHotlinesConfig(),
    history: getHistoryConfig(),
    statistics: getStatisticsConfig(),
    translations: getTranslationOverrides(),
  }
}

/**
 * Helper functions for common config operations
 */
export const configHelpers = {
  /**
   * Get the site title for metadata
   */
  getSiteTitle: (site: SiteConfig): string => {
    return site.domain
  },

  /**
   * Get the full site title with suffix
   */
  getFullSiteTitle: (site: SiteConfig, pageTitle?: string): string => {
    const siteTitle = configHelpers.getSiteTitle(site)
    return pageTitle
      ? `${pageTitle} | ${siteTitle}`
      : `${siteTitle} | Official Portal`
  },

  /**
   * Get the site description for metadata
   */
  getSiteDescription: (site: SiteConfig): string => {
    const lguName = getLGUName(site)
    const labels = getLGUTypeLabels(site.lguType)
    return `${site.domain} - Your digital gateway to LGU ${lguName} services. Access ${labels.lguTypeLabel.toLowerCase()} services, information, and resources.`
  },

  /**
   * Get the volunteer email
   */
  getVolunteerEmail: (site: SiteConfig): string => {
    return `volunteer@${site.domain}`
  },

  /**
   * Get the OpenGraph URL
   */
  getOpenGraphUrl: (site: SiteConfig): string => {
    return `https://${site.domain}/`
  },

  /**
   * Get the map embed URL
   */
  getMapEmbedUrl: (site: SiteConfig): string => {
    const { lat, lng } = site.coordinates
    const bbox = `${lng - 0.02},${lat - 0.015},${lng + 0.02},${lat + 0.015}`
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  },

  /**
   * Format a phone number for tel: links
   */
  formatPhoneLink: (phone: string): string => {
    return phone.replace(/[\s()-]/g, '')
  },

  /**
   * Get the official website URL
   */
  getOfficialWebsite: (site: SiteConfig): string => {
    return site.officialWebsite
  },
}

// Export configs directly for convenience
export const site = getSiteConfig()
export const officials = getOfficialsConfig()
export const subdivisions = getSubdivisionsConfig()
export const hotlines = getHotlinesConfig()
export const history = getHistoryConfig()
export const statistics = getStatisticsConfig()
export const translations = getTranslationOverrides()
export const labels = getLGUTypeLabels(site.lguType)
export const lguName = getLGUName(site)
export const lguNameConcatenated = getLGUNameConcatenated(site)
export const lguNameDomain = getLGUNameDomain(site)
export const statisticsDetailed = getStatisticsDetailedConfig()
export const news = getNewsConfig()
export const faq = getFAQConfig()
export const budget = getBudgetConfig()
export const legislative = getLegislativeConfig()
export const tourism = getTourismConfig()
