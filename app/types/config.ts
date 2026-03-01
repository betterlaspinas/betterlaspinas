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
    iraShare: string
    iraDependency: string
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

export interface ServiceItem {
  id: string
  title: string
  description: string
  category: string
  categoryId?: string
  keywords: string[]
  office?: string
  fee?: string
  processingTime?: string
  url: string
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

export interface CategoriesConfig {
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
