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
  /**
   * For a Department Head: the id of the one Office this person heads (matches
   * an offices.json id). ADR-0003 — a head is an Official (person) that
   * references an Office (organization), never an attribute of the Office. This
   * is the only link between officials.json and offices.json; office identity,
   * description and contact live solely in offices.json.
   */
  officeId?: string
}

export interface OfficialsConfig {
  executive: Official[]
  legislative: Official[]
  /**
   * Appointive heads of the city's Offices (ADR-0003). Replaces the former
   * `departments[]`, which duplicated Office identity/description/contact and
   * had already drifted from offices.json. Holds people only.
   */
  departmentHeads: Official[]
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
 *
 * Only present (as free text) for Services whose provider is NOT yet a
 * first-class Office (e.g. BPLO business services with no `providedBy`).
 * providedBy-backed Services derive the card from their canonical Office via
 * `officeContactCard` (pageViews.ts), so they carry no inline copy (#212,
 * single source).
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

/**
 * One document a record was transcribed from (#243, per ADR-0005). Records carry
 * an ordered `sources[]` — primary first — because provenance is per-record with
 * attribution, not one document per record: several Offices take location and
 * hours from the Citizen's Charter but their phone from the city's key-officials
 * directory, and a single record-level date would overstate what was checked.
 *
 * Trust is derived from these fields; there is no `dataStatus` enum (#237).
 */
export interface SourceRef {
  /**
   * Cites the issuing authority and document — e.g. "Las Piñas City Civil
   * Registry Citizen's Charter, 2024 edition". Always names the city, never this
   * site. Required: a source that can't be named can't be checked against.
   */
  name: string
  /**
   * Link to the document, present only when the *authority* publishes it. Most
   * Las Piñas charters are tarpaulins at the office window or PDFs handed over
   * on request, so this is absent more often than not (#238). Its absence never
   * makes a record unverified — a contributor's own photo or scan is PR review
   * evidence and must never be committed or used here.
   */
  url?: string
  /**
   * Vintage of the source itself, e.g. '2022'. Kept separate from `verifiedOn`
   * so a fresh check cannot present four-year-old data as current. Stored
   * machine-readable, but deliberately nothing computes from it — there is no
   * stale threshold and none is to be added (#237).
   */
  published?: string
  /**
   * ISO date we most recently confirmed this record against THIS source.
   * Transcribing a value out of a source IS confirming it — this is set the
   * moment that happens, not held back for a separate "audit" pass. Re-reading
   * the SAME source later (a second contributor, or a proofread) bumps this
   * date in place; it does not add a second field — there is deliberately no
   * separate audit/proofread date (#237, ADR-0005). Checking a DIFFERENT
   * source adds another entry to `sources[]` instead. Asserts transcription
   * accuracy, NOT currency: re-reading the 2022 charter today proves our
   * record matches the charter, not that the fee is still charged.
   */
  verifiedOn?: string
  /**
   * Field names this source backs, e.g. `['phone']`. Omitted for the source
   * backing the record generally; set only for the minority of fields sourced
   * elsewhere. Stored for auditability — not rendered (no per-field UI).
   */
  covers?: string[]
}

/**
 * `category` / `categoryLink` were removed here (#245): both were denormalised
 * copies of the Category record (name/badgeText + `/services/<id>`) reached via
 * `categoryId`, and had already drifted for 5 of 12 Categories. The View
 * resolver seam (`toServiceDetailView`, pageViews.ts) now derives them from the
 * Category record via `getCategoryBySlug`, so they can't disagree again.
 */
export interface ServiceDetail {
  fullTitle: string
  badgeText: string
  badgeIcon: string
  description: string
  quickStats: ServiceDetailQuickStat[]
  processSteps: ProcessStep[]
  requirements: RequirementGroup[]
  faqs: Faq[]
  office?: ServiceDetailOffice
  relatedServices: RelatedService[]
  onlineLink?: string
  /** Documents this Service was transcribed from, primary first (#243). */
  sources?: SourceRef[]
}

/**
 * Rich detail-page content for a first-class Office (#201). Reuses the canonical
 * Service `detail` shape but OMITS its `office` contact sub-block: an Office is
 * its own contact source, so its page (`officeView`, pageViews.ts) reads contact
 * data from the Office's own top-level fields rather than re-storing it here
 * (single source of truth, no drift).
 */
export type OfficeDetail = Omit<ServiceDetail, 'office'>

export interface ServiceItem {
  id: string
  title: string
  description: string
  /**
   * Slug of the parent Category (matches a categories.json id). The Category
   * display name is derived from this via `getServiceCategoryName` /
   * `getCategoryBySlug` rather than stored inline — #245 removed the
   * denormalised `category` string, which had already drifted from the
   * Category record for 5 of 12 Categories. Required: present on 100% of
   * Service records.
   */
  categoryId: string
  keywords: string[]
  office?: string
  /**
   * Slug of the first-class Office that provides this Service (matches an
   * offices.json id). Resolve through `getOfficeBySlug`. See `Office` below.
   * A Service sets at most one of `providedBy` / `providedByAgency` /
   * `providedByBarangay` — the three responsible-body tiers (ADR-0004).
   */
  providedBy?: string
  /**
   * Slug of the Agency that provides this Service (matches an agencies.json
   * id) — a national government office in the city (e.g. PNP), not a city
   * Office. Resolve through `getAgencyById`. See `Agency` below and ADR-0004.
   */
  providedByAgency?: string
  /**
   * True when this Service is obtained at the resident's own Barangay. A
   * directory marker, not a single provider ref — there are 20 Barangays, so
   * this points at the whole `/barangays` directory rather than one record.
   * See ADR-0004.
   */
  providedByBarangay?: boolean
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
  id?: string
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
  /**
   * Short form of the Office name (e.g. "CTO", "CSWDO"). Absorbed from the
   * retired `officials.departments[].abbreviation` — it describes the
   * organization, not its head (ADR-0003).
   */
  abbreviation?: string
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
   * Office-only services offered here that are NOT canonical Service records:
   * no `/service-details` page, absent from search and every Category grid
   * (which is why they can't live in services.json yet — `useSearch` reads all
   * of it). Rendered as plain, non-clickable cards on the Office page, deduped
   * against the Services this Office `providedBy`. When a real detail page is
   * authored the service graduates into services.json with `providedBy` and
   * drops off this list. Names only.
   */
  additionalServices?: string[]
  /**
   * Documents this Office's directory data was transcribed from, primary first.
   * The array (and `covers`) exist so a record can attribute fields to more than
   * one document — e.g. an Office's location and hours from the Citizen's
   * Charter, its phone from the city's key-officials directory when the charter
   * omits contact numbers — but no Office record cites a second source yet;
   * backfilling that per office is follow-up work. Rendered as the "Data
   * source" card on the Office page so the information is auditable; the card
   * states a fact when any source carries `name && verifiedOn`, and hedges
   * otherwise (#243).
   */
  sources?: SourceRef[]
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

/**
 * A national government office physically present in the city (e.g. PNP now;
 * BFP, NBI, BJMP, Prosecutor later). Office-shaped (name, location, contact)
 * but national, not a city department — deliberately kept out of
 * `offices.json`/`OfficeGroup` (ADR-0003 narrowed `Office` to the RA 7160 city
 * department sense). Referenced by `ServiceItem.providedByAgency`. See
 * ADR-0004.
 */
export interface Agency {
  id: string
  name: string
  icon: string
  description: string
  location?: string
  phone?: string
  hours?: string
  /**
   * Documents this Agency's contact/location data was transcribed from, primary
   * first (#243). Replaces the Agency-scoped `dataStatus` enum, which was a
   * stand-in for the generalized flag that ADR-0005 rules out: confidence is
   * derived from provenance, not asserted by a field.
   */
  sources?: SourceRef[]
}

export interface AgenciesConfig {
  agencies: Agency[]
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
