import type {
  BudgetConfig,
  CategoriesConfig,
  Category,
  FAQConfig,
  HistoryConfig,
  HotlinesConfig,
  LegislativeConfig,
  LGUConfig,
  LGUType,
  LGUTypeLabels,
  NavigationConfig,
  NavigationItem,
  NewsConfig,
  Office,
  OfficeGroup,
  OfficesConfig,
  OfficialsConfig,
  OgImageRouteConfig,
  SeoRouteConfig,
  ServiceItem,
  ServicesConfig,
  SiteConfig,
  StatisticsConfig,
  StatisticsDetailedConfig,
  SubdivisionsConfig,
  TourismConfig,
  TranslationOverrides,
} from '@/types/config'

import {
  DIACRITICS_REGEX,
  PHONE_CLEANUP_REGEX,
  WHITESPACE_REGEX,
} from '@/utils/regexConstants'

import budgetConfig from '../config/budget.json'
import categoriesConfig from '../config/categories.json'
import faqConfig from '../config/faq.json'
import historyConfig from '../config/history.json'
import hotlinesConfig from '../config/hotlines.json'
import legislativeConfig from '../config/legislative.json'
import navigationConfig from '../config/navigation.json'
import newsConfig from '../config/news.json'
import officesConfig from '../config/offices.json'
import officialsConfig from '../config/officials.json'
import ogImageConfig from '../config/og-image.json'
// Import JSON config files
import seoConfig from '../config/seo.json'
import servicesConfig from '../config/services.json'
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
  return getLGUName(site).replace(WHITESPACE_REGEX, '')
}

/**
 * Get the site name for branding (high-level config)
 * e.g. "BetterLasPinas.org"
 */
export function getSiteBrandName(site: SiteConfig): string {
  const lguNameDomain = getLGUNameDomain(site)
  return `Better${lguNameDomain}.org`
}

/**
 * Get the domain-safe LGU name (no spaces, no diacritics/special chars)
 * e.g. "Las Piñas" -> "LasPinas"
 */
export function getLGUNameDomain(site: SiteConfig): string {
  return getLGUName(site)
    .normalize('NFD')
    .replace(DIACRITICS_REGEX, '')
    .replace(WHITESPACE_REGEX, '')
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
 * Get the base site config from site.json with proper typing
 */
export function getSiteConfig(): SiteConfig {
  return siteConfig as SiteConfig
}

/**
 * Merge runtime env overrides onto the base site.json config.
 * Accepts a partial record of string values (from runtimeConfig.public.site)
 * and returns a fully typed SiteConfig.
 * This is a pure function — no Nuxt context required, fully unit-testable.
 */
export function getMergedSiteConfig(
  runtimeSite?: Partial<Record<string, string>>,
): SiteConfig {
  const base = getSiteConfig()
  if (!runtimeSite) {
    return base
  }
  return {
    ...base,
    lguType: (runtimeSite.lguType || base.lguType) as LGUType,
    municipality: runtimeSite.municipality || base.municipality,
    province: runtimeSite.province || base.province,
    region: runtimeSite.region || base.region,
    siteId: runtimeSite.siteId || base.siteId,
    domain: runtimeSite.domain || base.domain,
    tagline: runtimeSite.tagline || base.tagline,
    themeColor: runtimeSite.themeColor || base.themeColor,
    officialWebsite: runtimeSite.officialWebsite || base.officialWebsite,
    version: runtimeSite.version || base.version,
  }
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
  const config = navigationConfig as NavigationConfig

  // Filter out hidden items from mainNav
  if (config.mainNav) {
    config.mainNav = config.mainNav.filter((item: NavigationItem) => !item.hidden).map((item: NavigationItem) => {
      if (item.children) {
        item.children = item.children.filter((child: NavigationItem) => !child.hidden)
      }
      return item
    })
  }

  return config
}

/**
 * Get the categories config with proper typing
 */
export function getCategoriesConfig(): CategoriesConfig {
  return categoriesConfig as CategoriesConfig
}

/**
 * Get the services config with proper typing.
 * Filters out hidden Services; no category coupling.
 */
// Soft-launch gate (introduced in 0a6176c "scope site content to certificates
// category for soft launch"): only live categories are exposed through the
// shared services config, which backs the global search index and the canonical
// accessors. #186 ports the remaining Service Categories to the canonical
// source, so they all go live here. The two non-resident categories
// (`government`, `online`) stay gated until their own slices.
const LIVE_CATEGORY_IDS = new Set([
  'certificates',
  'business',
  'tax-payments',
  'social-services',
  'health',
  'agriculture',
  'infrastructure',
  'education',
  'public-safety',
  'environment',
])

export function getServicesConfig(): ServicesConfig {
  const config = servicesConfig as ServicesConfig
  return {
    ...config,
    services: config.services
      ? config.services
          .filter(service => LIVE_CATEGORY_IDS.has(service.categoryId ?? ''))
          .filter((service: ServiceItem) => !service.hidden)
      : [],
  }
}

// ---------------------------------------------------------------------------
// Canonical Service accessor (HITL review surface).
//
// This small, stable interface is the single read path every later config
// slice copies. Pages and composables MUST go through these accessors rather
// than importing services.json / categories.json directly.
// ---------------------------------------------------------------------------

/**
 * Get every visible Service record (hidden Services excluded).
 */
export function getAllServices(): ServiceItem[] {
  return getServicesConfig().services
}

/**
 * Get a single Service by its canonical id/slug.
 * Returns undefined for unknown or hidden Services. Covers both detail-bearing
 * Services and catalog-only (no `detail`) Services.
 */
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return getAllServices().find(service => service.id === slug)
}

/**
 * Get every visible service Category (hidden Categories excluded).
 */
export function getServiceCategories(): Category[] {
  const config = getCategoriesConfig()
  return (config.categories ?? []).filter(category => !category.hidden)
}

/**
 * Get a single Category by its slug. Returns undefined for unknown/hidden.
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return getServiceCategories().find(category => category.id === slug)
}

/**
 * Get all visible Services belonging to a given category slug.
 */
export function getServicesByCategory(slug: string): ServiceItem[] {
  return getAllServices().filter(service => service.categoryId === slug)
}

/**
 * Service Categories whose page is sourced canonically (categories.json +
 * services.json) through these accessors. The two remaining hidden Categories
 * (`government`, `online`) are not resident Service Categories and migrate in
 * their own slices.
 */
const CANONICAL_CATEGORY_SLUGS = new Set([
  'certificates',
  'business',
  'tax-payments',
  'social-services',
  'health',
  'agriculture',
  'infrastructure',
  'education',
  'public-safety',
  'environment',
])

export function isCanonicalCategory(slug: string): boolean {
  return CANONICAL_CATEGORY_SLUGS.has(slug)
}

/**
 * Derive the SEO meta-description template for a Service's
 * `/service-details/<slug>` page from the canonical Service record.
 *
 * Replaces the legacy `seo-service-details-slug.json` lookup: the per-Service
 * SEO copy now lives on the Service itself (`ServiceItem.seoDescription`), so it
 * cannot drift from the catalog. Returns undefined when the Service is unknown,
 * hidden, gated out by the `LIVE_CATEGORY_IDS` soft-launch filter (its
 * `categoryId` is not yet live), or carries no `seoDescription` template,
 * letting the SEO middleware fall back to the route-level `seo.json`
 * description. The returned string is a raw template (e.g. contains
 * `{{lguName}}`); the middleware interpolates it.
 */
export function getServiceSeoDescription(slug: string): string | undefined {
  return getServiceBySlug(slug)?.seoDescription
}

/**
 * Derive the SEO meta-description template for a Category's `/services/<slug>`
 * page from the canonical Category record.
 *
 * Replaces the legacy `seo-services-category.json` lookup: the per-Category SEO
 * copy now lives on the Category itself (`Category.seoDescription`). Returns
 * undefined when the Category is unknown/hidden or carries no `seoDescription`
 * template, letting the SEO middleware fall back to the route-level `seo.json`
 * description.
 */
export function getCategorySeoDescription(slug: string): string | undefined {
  return getCategoryBySlug(slug)?.seoDescription
}

// ---------------------------------------------------------------------------
// Canonical Office accessor (#185).
//
// Office is a first-class entity that provides Services, grouped by government
// function via Office Group. Office -> OfficeGroup is one-to-one (groupId);
// Office <-> Category is many-to-many, mediated by the Services an Office
// provides. Pages MUST resolve Offices through these accessors rather than
// reading offices.json or Category.offices (which no longer exists).
// ---------------------------------------------------------------------------

/**
 * Get the offices config with proper typing.
 */
export function getOfficesConfig(): OfficesConfig {
  return officesConfig as OfficesConfig
}

/**
 * Get every visible Office record (hidden Offices excluded).
 */
export function getOffices(): Office[] {
  return (getOfficesConfig().offices ?? []).filter(office => !office.hidden)
}

/**
 * Get a single Office by its canonical id/slug.
 * Returns undefined for unknown or hidden Offices.
 */
export function getOfficeBySlug(slug: string): Office | undefined {
  return getOffices().find(office => office.id === slug)
}

// Office-card synthesis (`getServiceOfficeCard`) and the /service-details Office
// card moved to the View resolver seam (`app/utils/pageViews.ts`, ADR-0002):
// `officeContactCard` and `toServiceDetailView`. The office-detail fallback for
// /service-details (`getOfficeDetailBySlug`) is dropped — the legacy office URL
// is redirected by a 301 (#207/#216), so /offices/<id> is resolved by
// `officeView` instead.

/**
 * Get every visible Office Group (hidden Groups excluded).
 */
export function getOfficeGroups(): OfficeGroup[] {
  return (getOfficesConfig().officeGroups ?? []).filter(group => !group.hidden)
}

/**
 * Get a single Office Group by its slug. Returns undefined for unknown/hidden.
 */
export function getOfficeGroupBySlug(slug: string): OfficeGroup | undefined {
  return getOfficeGroups().find(group => group.id === slug)
}

/**
 * Get all visible Offices belonging to a given Office Group slug.
 * Returns an empty array when the Group is unknown or hidden, matching
 * getOfficeGroupBySlug so a hidden Group never leaks its Offices.
 */
export function getOfficesByGroup(slug: string): Office[] {
  if (!getOfficeGroupBySlug(slug))
    return []
  return getOffices().filter(office => office.groupId === slug)
}

/**
 * Resolve the Office that provides a given Service via its `providedBy` ref.
 * Returns undefined when the Service has no `providedBy` or the Office is
 * unknown/hidden.
 */
export function getOfficeForService(service: ServiceItem): Office | undefined {
  return service.providedBy ? getOfficeBySlug(service.providedBy) : undefined
}

/**
 * Get the distinct visible Offices that provide the Services in a Category.
 * Backs the "Responsible Offices" section: Office <-> Category is many-to-many
 * through the Services, so this dedupes Offices across the Category's Services.
 */
export function getOfficesForCategory(slug: string): Office[] {
  const seen = new Set<string>()
  const result: Office[] = []
  for (const service of getServicesByCategory(slug)) {
    const office = getOfficeForService(service)
    if (office && !seen.has(office.id)) {
      seen.add(office.id)
      result.push(office)
    }
  }
  return result
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
 * Get the raw SEO metadata for every route defined in seo.json.
 */
export function getSeoConfig(): Record<string, SeoRouteConfig> {
  return seoConfig as Record<string, SeoRouteConfig>
}

/**
 * Get the OG image config for all routes
 */
export function getOgImageConfig(): Record<string, OgImageRouteConfig> {
  return ogImageConfig as Record<string, OgImageRouteConfig>
}

/**
 * Get the OG image config for a specific route, with template variable interpolation.
 * Returns undefined if no config exists for the route.
 */
export function getOgImageRouteConfig(
  routeKey: string,
  vars: Record<string, string> = {},
): OgImageRouteConfig | undefined {
  const config = getOgImageConfig()
  const entry = config[routeKey]
  if (!entry) {
    return undefined
  }

  const interpolate = (str: string) =>
    Object.entries(vars).reduce(
      (text, [key, value]) => text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
      str,
    )

  return {
    title: interpolate(entry.title),
    description: entry.description ? interpolate(entry.description) : undefined,
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
    const siteBrandName = getSiteBrandName(site)

    if (pageTitle) {
      return `${pageTitle} | ${siteBrandName}`
    }

    return `${siteBrandName} | Official Portal`
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
    return phone.replace(PHONE_CLEANUP_REGEX, '')
  },

  /**
   * Get the official website URL
   */
  getOfficialWebsite: (site: SiteConfig): string => {
    return site.officialWebsite
  },
}
