// Type definitions for LGU configuration files

export type LGUType = 'Municipality' | 'City' | 'Province'

export interface LGUTypeLabels {
  leaderTitle: string
  viceLeaderTitle: string
  legislativeBody: string
  legislativeBodyAbbr: string
  legislativeMembers: string
  subdivisionType: string
  subdivisionTypePlural: string
  subdivisionLeader: string
  lguTypeLabel: string
  deptPrefix: string
  hallName: string
}

export interface SiteConfig {
  lguType: LGUType
  municipality: string
  city?: string
  province: string
  region: string
  siteId: string
  domain: string
  tagline: string
  themeColor: string
  officialWebsite: string
  version: string
  contact: {
    phone: string
    mobile: string
    email: string
    address: string
    postalCode: string
  }
  social: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
    linkedin: string
    discord: string
    github: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  logo: {
    main: string
    white: string
    whitePng: string
    favicon: string
  }
}

export interface Official {
  id: string
  name: string
  position: string
  title: string
  email?: string
  phone?: string
  committees?: string
}

export interface Department {
  id: string
  slug: string
  name: string
  department: string
  abbreviation: string
  description: string
  icon: string
  email: string
  phone: string
  services: string
}

export interface OfficialsConfig {
  executive: Official[]
  legislative: Official[]
  departments: Department[]
}

export interface SubdivisionsConfig {
  count: number
  items: Array<{
    id: string
    name: string
    leader: string
    phone?: string
  }>
}

export interface HotlinesConfig {
  emergency: Array<{
    id: string
    name: string
    number: string
    icon: string
  }>
  government: Array<{
    id: string
    name: string
    number: string
    icon: string
  }>
  utilities: Array<{
    id: string
    name: string
    number: string
    icon: string
  }>
  medical: Array<{
    id: string
    name: string
    number: string
    icon: string
  }>
}

export interface HistoryConfig {
  content?: string
  imageUrl?: string
  timeline?: Array<{
    year: string
    title: string
    description: string
  }>
  facts?: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
  [key: string]: unknown
}

export interface StatisticsConfig {
  population?: {
    count: number
    year: number
    source: string
  }
  landArea?: {
    value: number
    unit: string
    source: string
  }
  subdivisions?: {
    count: number
    type: string
    source: string
  }
  incomeClass?: {
    class: string
    description: string
    source: string
  }
  [key: string]: unknown
}

export interface BarangayPopulation {
  rank: number
  name: string
  population: number
  percentage: number
  growth?: number
}

export interface StatisticsDetailedConfig {
  barangayPopulation: BarangayPopulation[]
  cmciPillars: Array<{
    id: string
    title: string
    icon: string
    score: number | string
    trendType: string
    trend: string
  }>
  financialData: {
    annualIncome: string
    annualIncomeDetailed: string
    ntaShare: string
    ntaDependency: string
    localSourcesPercentage: string
    sourceUrl: string
    source: string
    year: string | number
  }
  populationGrowth: {
    year2020: number
    year2024: number
    growthRate: string
  }
  [key: string]: unknown
}

export interface NewsArticle {
  id: string | number
  title: string
  date: string
  badge: string
  badgeColor: string
  description: string
  slug: string
  content?: string
}

export interface NewsConfig {
  articles: NewsArticle[]
  [key: string]: unknown
}

export interface FAQConfig {
  categories: Array<{
    id: string
    titleKey: string
    titleFallback: string
    icon: string
    items: Array<{
      id: string
      question: string
      answer: string
    }>
  }>
}

export interface BudgetQuarterData {
  totalIncome: string
  totalExpense: string
  netIncome: string
  fundBalance: string
  totalIncomeValue: number
  totalExpenseValue: number
  income: {
    local: { amount: string, percentage: string, value: number }
    external: { amount: string, percentage: string, value: number }
  }
  expenditure: {
    gps: { amount: string, percentage: string, value: number }
    social: { amount: string, percentage: string, value: number }
    economic: { amount: string, percentage: string, value: number }
    debt: { amount: string, percentage: string, value: number }
  }
}

export interface InfrastructureProject {
  id: string
  year: number
  title: string
  type: string
  typeIcon: string
  typeColor: string
  location: string
  typeOfWork: string
  contractor: string
  contractCost: string
}

export interface BudgetConfig {
  fiscalYear?: number
  quarters?: Record<'q1' | 'q2' | 'q3' | 'q4', BudgetQuarterData>
  infrastructureProjects?: InfrastructureProject[]
  [key: string]: unknown
}

export interface LegislativeConfig {
  ordinances: {
    categories: Array<{
      id: string
      label: string
      icon: string
    }>
    items: Array<{
      number: string
      title: string
      date: string
    }>
  }
  resolutions: {
    types: Array<{
      id: string
      label: string
      icon: string
    }>
    items: Array<{
      number: string
      title: string
      date: string
    }>
  }
}

export interface TourismCategory {
  id: string
  label: string
  icon: string
}

export interface TourismAttraction {
  id: string
  name: string
  category: string
  description: string
  location: string
  image?: string
}

export interface TourismEvent {
  id: string
  name: string
  date: string
  description: string
  location: string
}

export interface TourismConfig {
  categories: TourismCategory[]
  attractions: TourismAttraction[]
  events: TourismEvent[]
  travelInfo: {
    howToGetThere: string
    bestTimeToVisit: string
    tips: string[]
  }
  [key: string]: unknown
}

/**
 * Canonical Service Detail sub-types.
 *
 * These mirror the optional `detail` block on a canonical Service record in
 * services.json. They describe the rich service-details page content (process,
 * requirements, FAQs, office contact info). A Service WITHOUT a `detail` is a
 * catalog-only card (e.g. Barangay Clearance) and links to its category page.
 */
export interface ServiceDetailQuickStat {
  icon: string
  label: string
  value: string
}

export interface ProcessStep {
  title: string
  description: string
  isFinal?: boolean
}

export interface RequirementGroup {
  title: string
  icon: string
  items: string[]
}

export interface Faq {
  question: string
  answer: string
}

/**
 * Office-contact block embedded in a Service's `detail` (the "Office
 * Information" card on a /service-details page). This is NOT the first-class
 * Office entity — see `Office` / `OfficeGroup` below and offices.json.
 */
export interface ServiceDetailOffice {
  name: string
  location: string
  phone?: string
  mobile?: string
  email?: string
  facebook?: string
  hours: string
}

export interface RelatedService {
  title: string
  link: string
}

export interface ServiceDetail {
  fullTitle: string
  category: string
  categoryLink: string
  badgeText: string
  badgeIcon: string
  description: string
  quickStats: ServiceDetailQuickStat[]
  processSteps: ProcessStep[]
  requirements: RequirementGroup[]
  faqs: Faq[]
  office: ServiceDetailOffice
  relatedServices: RelatedService[]
  onlineLink?: string
  sourceUrl?: string
  sourceName?: string
}

/**
 * Rich detail-page content for a first-class Office (#201). Reuses the canonical
 * Service `detail` shape but OMITS its `office` contact sub-block: an Office is
 * its own contact source, so `getOfficeDetailBySlug` synthesises the contact
 * card from the Office's own top-level fields rather than re-storing it here
 * (single source of truth, no drift).
 */
export type OfficeDetail = Omit<ServiceDetail, 'office'>

export interface ServiceItem {
  id: string
  title: string
  description: string
  category: string
  categoryId?: string
  keywords: string[]
  office?: string
  /**
   * Slug of the first-class Office that provides this Service (matches an
   * offices.json id). Resolve through `getOfficeBySlug`. See `Office` below.
   */
  providedBy?: string
  fee?: string
  processingTime?: string
  url: string
  icon?: string
  hidden?: boolean
  /**
   * Optional SEO meta-description template for this Service's
   * `/service-details/<id>` page. Supports `{{lguName}}` (and other middleware
   * template vars) interpolation. Lives on the canonical Service record so the
   * meta description can no longer drift from the catalog; the SEO middleware
   * reads it via `getServiceSeoDescription`. Absent Services fall back to the
   * route-level `seo.json` description.
   */
  seoDescription?: string
  /**
   * Optional rich service-details content. Present only for Services that have
   * a dedicated `/service-details/<id>` page. Absent for catalog-only Services.
   */
  detail?: ServiceDetail
}

export interface ServicesConfig {
  services: ServiceItem[]
  [key: string]: unknown
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  description?: string
  hidden?: boolean
  children?: NavigationItem[]
}

export interface NavigationConfig {
  mainNav?: NavigationItem[]
  footerNav?: {
    quickLinks: NavigationItem[]
    resources: NavigationItem[]
    getInvolved: NavigationItem[]
  }
}

export interface Category {
  id: string
  name: string
  icon: string
  badgeText: string
  description: string
  /**
   * Optional SEO meta-description template for this Category's
   * `/services/<id>` page. Supports `{{lguName}}` interpolation. Lives on the
   * canonical Category record so the meta description can no longer drift from
   * the catalog; the SEO middleware reads it via `getCategorySeoDescription`.
   */
  seoDescription?: string
  hidden?: boolean
}

export interface CategoriesConfig {
  categories: Category[]
  [key: string]: unknown
}

/**
 * Office Group: a grouping of Offices by government function (answers "who runs
 * this", e.g. "Frontline Services", "Finance"). Distinct from Category, which
 * groups Services by task. Groups Offices one-to-many.
 */
export interface OfficeGroup {
  id: string
  name: string
  description: string
  icon?: string
  hidden?: boolean
}

/**
 * First-class Office entity: a government body that provides Services. Belongs
 * to exactly one Office Group via `groupId`, even when its Services span
 * multiple Categories. Referenced by ServiceItem.providedBy.
 */
export interface Office {
  id: string
  name: string
  groupId: string
  icon: string
  description: string
  link: string
  location?: string
  phone?: string
  mobile?: string
  email?: string
  facebook?: string
  hours?: string
  hidden?: boolean
  /**
   * Optional rich detail-page content, mirroring the canonical
   * `ServiceItem.detail` block (#184). Present only for Offices with a dedicated
   * `/offices/<id>` page (#207); its presence gates that route (404 otherwise).
   * The contact card is synthesised from this Office's own fields, so the block
   * omits a redundant `office` sub-block (see OfficeDetail).
   */
  detail?: OfficeDetail
}

export interface OfficesConfig {
  officeGroups: OfficeGroup[]
  offices: Office[]
  [key: string]: unknown
}

export interface TranslationOverrides {
  [key: string]: {
    [key: string]: string
  }
}

export interface LGUConfig {
  site: SiteConfig
  officials: OfficialsConfig
  subdivisions: SubdivisionsConfig
  hotlines: HotlinesConfig
  history: HistoryConfig
  statistics: StatisticsConfig
  translations: TranslationOverrides
}

export interface SeoRouteConfig {
  titleFragment: string
  description: string
  ogType: 'website' | 'article'
  twitterCard: 'summary' | 'summary_large_image'
  hidden: boolean
}

export interface OgImageRouteConfig {
  title: string
  description?: string
}
