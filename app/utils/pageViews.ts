import type {
  Category,
  Office,
  OfficeGroup,
  ServiceDetail,
  ServiceDetailOffice,
  ServiceItem,
} from '@/types/config'

import {
  getAllServices,
  getCategoryBySlug,
  getOfficeBySlug,
  getOfficeForService,
  getOfficeGroupBySlug,
  getOfficesForCategory,
  getServiceBySlug,
  getServicesByCategory,
  isCanonicalCategory,
} from '@/utils/configHelper'

// ---------------------------------------------------------------------------
// View resolver seam (ADR-0002).
//
// A View is a render-ready projection of canonical Service / Office / Category
// records, shaped for exactly one route's template. Each route gets a *bound
// facade* (`categoryView`, `serviceDetailView`, `officeView`) that does the
// `configHelper` lookups and delegates to a *pure shaper* (`toCategoryView`,
// `toServiceDetailView`, `toOfficeView`) that holds all mapping/dedupe/merge.
//
// The shapers are framework- and IO-free: they take canonical records and
// return a View, so they are unit-testable without rendering a page. The
// facades own the IO (reading through configHelper); a page calls one facade
// and keeps only a `if (!view) throw createError(404)` guard.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Category View — /services/<category>
// ---------------------------------------------------------------------------

export interface CategoryServiceCard {
  id: string
  icon?: string
  title: string
  description: string
  fee?: string
  time?: string
  link?: string
}

export interface CategoryOfficeCard {
  title: string
  icon: string
  description: string
  link: string
}

export interface CategoryView {
  category: Category
  services: CategoryServiceCard[]
  offices: CategoryOfficeCard[]
}

export interface CategoryRecords {
  category: Category
  services: ServiceItem[]
  offices: Office[]
}

/**
 * Pure shaper for the /services/<category> page.
 *
 * A catalog-only Service points back at its own category page (e.g. its `url`
 * is `/services/certificates`). Treat that as "no dedicated page" so the card
 * stays non-interactive; only a real destination (e.g. `/service-details/<id>`)
 * makes the card a link.
 */
export function toCategoryView(records: CategoryRecords): CategoryView {
  const categoryHref = `/services/${records.category.id}`
  return {
    category: records.category,
    services: records.services.map(service => ({
      id: service.id,
      icon: service.icon,
      title: service.title,
      description: service.description,
      fee: service.fee,
      time: service.processingTime,
      link: service.url && service.url !== categoryHref ? service.url : undefined,
    })),
    offices: records.offices.map(office => ({
      title: office.name,
      icon: office.icon,
      description: office.description,
      link: office.link,
    })),
  }
}

/**
 * Bound facade: resolve a category slug into its CategoryView. The
 * `isCanonicalCategory` gate keeps non-resident Categories (`government`,
 * `online`) off this route. Returns undefined on a missed lookup so the page
 * can throw a 404.
 */
export function categoryView(slug: string): CategoryView | undefined {
  const category = isCanonicalCategory(slug)
    ? getCategoryBySlug(slug)
    : undefined
  if (!category)
    return undefined
  return toCategoryView({
    category,
    services: getServicesByCategory(slug),
    offices: getOfficesForCategory(slug),
  })
}

// ---------------------------------------------------------------------------
// Service Detail View — /service-details/<slug>
// ---------------------------------------------------------------------------

export interface ServiceDetailView {
  service: ServiceDetail & { title: string }
  officeInfo?: ServiceDetailOffice
}

export interface ServiceDetailRecords {
  service: ServiceItem & { detail: ServiceDetail }
  office?: Office
}

/**
 * Synthesise the detail-page "Office Information" card from a first-class
 * Office's own top-level fields. The Office entity is the single source of
 * truth for contact data — this never reads an inline `detail.office` copy, so
 * no drift between a Service page and its canonical Office is possible.
 * (Migrated from configHelper's office-card synthesis per ADR-0002.)
 */
export function officeContactCard(office: Office): ServiceDetailOffice {
  return {
    name: office.name,
    location: office.location ?? '',
    phone: office.phone,
    mobile: office.mobile,
    email: office.email,
    facebook: office.facebook,
    hours: office.hours ?? '',
  }
}

/**
 * Pure shaper for the /service-details/<slug> page. Shapes Service detail
 * only (the office fallback is dropped — the legacy office URL is redirected by
 * the blocker, #207/#216).
 *
 * The "Office Information" card single-sources off the providing Office when one
 * is supplied (via `providedBy`), so it can never drift from the canonical
 * Office. It falls back to the Service's inline free-text `detail.office` for
 * providers not yet first-class Offices (e.g. BPLO business services).
 */
export function toServiceDetailView(records: ServiceDetailRecords): ServiceDetailView {
  const { service, office } = records
  return {
    service: { ...service.detail, title: service.title },
    officeInfo: office ? officeContactCard(office) : service.detail.office,
  }
}

/**
 * Bound facade: resolve a Service slug into its ServiceDetailView. Resolves a
 * canonical Service detail only; a Service without a `detail` block (catalog-
 * only) or an unknown slug returns undefined so the page can throw a 404.
 */
export function serviceDetailView(slug: string): ServiceDetailView | undefined {
  const canonical = getServiceBySlug(slug)
  if (!canonical?.detail)
    return undefined
  return toServiceDetailView({
    service: { ...canonical, detail: canonical.detail },
    office: getOfficeForService(canonical),
  })
}

// ---------------------------------------------------------------------------
// Office View — /offices/<slug>
// ---------------------------------------------------------------------------

export interface OfficeServiceCard {
  name: string
  link?: string
}

export interface OfficeView {
  office: Office
  groupName: string
  services: OfficeServiceCard[]
  mapsUrl: string
}

export interface OfficeRecords {
  office: Office
  group?: OfficeGroup
  services: ServiceItem[]
}

/**
 * Pure shaper for the /offices/<slug> page.
 *
 * Services this Office provides (via `providedBy`) link to their own
 * /service-details page ONLY when they carry a `detail` block; catalog-only
 * Services render as a plain, non-clickable card. `office.additionalServices`
 * are office-only offerings (not Service records yet, no page) appended as plain
 * cards. The whole list is deduped by name, so a graduated service never appears
 * twice and two provided Services with the same title collapse to one —
 * order-independently preferring the one with a `detail` page so a detail-less
 * duplicate never suppresses a real link.
 */
export function toOfficeView(records: OfficeRecords): OfficeView {
  const { office, group, services } = records
  const seen = new Map<string, OfficeServiceCard>()
  const cards: OfficeServiceCard[] = []

  for (const service of services) {
    if (service.providedBy !== office.id || service.hidden)
      continue
    const link = service.detail ? `/service-details/${service.id}` : undefined
    const existing = seen.get(service.title)
    if (existing) {
      if (!existing.link && link)
        existing.link = link
      continue
    }
    const card: OfficeServiceCard = { name: service.title, link }
    seen.set(service.title, card)
    cards.push(card)
  }

  for (const name of office.additionalServices ?? []) {
    if (seen.has(name))
      continue
    const card: OfficeServiceCard = { name, link: undefined }
    seen.set(name, card)
    cards.push(card)
  }

  return {
    office,
    groupName: group?.name ?? '',
    services: cards,
    // No geo data on the Office schema — link to Google Maps by address.
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.location ?? office.name)}`,
  }
}

/**
 * Bound facade: resolve an Office slug into its OfficeView. Matches on the
 * Office `id` directly (own /offices/<id> namespace, #207). Returns undefined
 * for unknown/hidden Offices so the page can throw a 404.
 */
export function officeView(slug: string): OfficeView | undefined {
  const office = getOfficeBySlug(slug)
  if (!office)
    return undefined
  return toOfficeView({
    office,
    group: getOfficeGroupBySlug(office.groupId),
    services: getAllServices(),
  })
}
