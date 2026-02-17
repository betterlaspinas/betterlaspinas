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
  [key: string]: any
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
  [key: string]: any
}

export interface StatisticsConfig {
  [key: string]: any
}

export interface StatisticsDetailedConfig {
  [key: string]: any
}

export interface NewsConfig {
  [key: string]: any
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

export interface BudgetConfig {
  [key: string]: any
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

export interface TourismConfig {
  [key: string]: any
}

export interface ServicesConfig {
  [key: string]: any
}

export interface NavigationConfig {
  [key: string]: any
}

export interface CategoriesConfig {
  [key: string]: any
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
