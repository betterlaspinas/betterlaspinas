export interface QuickStat {
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

export interface FAQ {
  question: string
  answer: string
}

export interface OfficeInfo {
  name: string
  location: string
  phone: string
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
  id: string
  title: string
  fullTitle: string
  category: string
  categoryLink: string
  badgeText: string
  badgeIcon: string
  description: string
  quickStats: QuickStat[]
  processSteps: ProcessStep[]
  requirements: RequirementGroup[]
  faqs: FAQ[]
  office: OfficeInfo
  relatedServices: RelatedService[]
  onlineLink?: string
  sourceUrl?: string
  sourceName?: string
  hidden?: boolean
}

/**
 * Legacy service detail content. All canonical Office and Service entries have
 * been migrated to offices.json / services.json (#202). This module is retained
 * for the #189 closer which will remove it entirely. The array is intentionally
 * empty — do not add new entries here.
 */
export const serviceDetailsContent: ServiceDetail[] = []

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = serviceDetailsContent.find(service => service.id === slug)

  if (!service || service.hidden)
    return undefined

  return service
}
