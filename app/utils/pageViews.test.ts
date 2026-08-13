import type {
  Agency,
  Category,
  Office,
  OfficeGroup,
  ServiceDetail,
  ServiceItem,
} from '@/types/config'
import { describe, expect, it } from 'vitest'
import { getAgencyById, getCategoryBySlug, getOfficeBySlug, getServiceBySlug } from './configHelper'
import {
  agencyView,
  categoryView,
  officeContactCard,
  officeView,
  serviceDetailView,
  toAgencyView,
  toCategoryView,
  toOfficeView,
  toServiceDetailView,
} from './pageViews'

// ---------------------------------------------------------------------------
// Fixture builders — keep the shaper tests IO-free. The shapers take canonical
// records, so we hand-build minimal records rather than reading config.
// ---------------------------------------------------------------------------

function makeCategory(over: Partial<Category> = {}): Category {
  return {
    id: 'certificates',
    name: 'Certificates',
    icon: 'bi-file',
    badgeText: 'Documents',
    description: 'Vital records',
    ...over,
  }
}

function makeService(over: Partial<ServiceItem> = {}): ServiceItem {
  return {
    id: 'birth-certificate',
    title: 'Birth Certificate',
    description: 'Get a birth certificate',
    categoryId: 'certificates',
    keywords: [],
    url: '/service-details/birth-certificate',
    ...over,
  }
}

function makeDetail(over: Partial<ServiceDetail> = {}): ServiceDetail {
  return {
    fullTitle: 'Birth Certificate Request',
    badgeText: 'Certificate',
    badgeIcon: 'bi-file',
    description: 'Request a birth certificate',
    quickStats: [],
    processSteps: [],
    requirements: [],
    faqs: [],
    relatedServices: [],
    ...over,
  }
}

function makeOffice(over: Partial<Office> = {}): Office {
  return {
    id: 'civil-registry',
    name: 'City Civil Registry',
    groupId: 'frontline-services',
    icon: 'bi-building',
    description: 'Vital records office',
    link: '/offices/civil-registry',
    location: 'City Hall',
    phone: '123',
    hours: '8-5',
    ...over,
  }
}

function makeAgency(over: Partial<Agency> = {}): Agency {
  return {
    id: 'pnp-laspinas',
    name: 'Las Piñas City Police Station',
    icon: 'bi-shield-check',
    description: 'PNP station',
    location: 'City Hall Compound',
    phone: '8551-6401',
    ...over,
  }
}

function makeGroup(over: Partial<OfficeGroup> = {}): OfficeGroup {
  return {
    id: 'frontline-services',
    name: 'Frontline Services',
    description: 'Public-facing offices',
    ...over,
  }
}

describe('toCategoryView', () => {
  it('maps a Service with a real destination to a linked card', () => {
    const view = toCategoryView({
      category: makeCategory(),
      services: [makeService({ url: '/service-details/birth-certificate' })],
      offices: [],
      agencies: [],
      hasBarangayProvider: false,
    })
    expect(view.services[0]!.link).toBe('/service-details/birth-certificate')
  })

  it('suppresses the link for a catalog-only Service that points back at its category page', () => {
    // A catalog-only Service's url is its own category page — not a dedicated
    // destination — so the card must render non-interactive (no link).
    const view = toCategoryView({
      category: makeCategory({ id: 'certificates' }),
      services: [makeService({ url: '/services/certificates' })],
      offices: [],
      agencies: [],
      hasBarangayProvider: false,
    })
    expect(view.services[0]!.link).toBeUndefined()
  })

  it('maps the Category record and Office cards through', () => {
    const category = makeCategory()
    const view = toCategoryView({
      category,
      services: [makeService({ icon: 'bi-x', fee: '₱100', processingTime: '1 day' })],
      offices: [makeOffice()],
      agencies: [],
      hasBarangayProvider: false,
    })
    expect(view.category).toBe(category)
    expect(view.services[0]).toMatchObject({
      id: 'birth-certificate',
      icon: 'bi-x',
      title: 'Birth Certificate',
      fee: '₱100',
      time: '1 day',
    })
    expect(view.offices[0]).toEqual({
      title: 'City Civil Registry',
      icon: 'bi-building',
      description: 'Vital records office',
      link: '/offices/civil-registry',
    })
  })

  it('maps Agency records to Agency cards', () => {
    const view = toCategoryView({
      category: makeCategory(),
      services: [],
      offices: [],
      agencies: [makeAgency()],
      hasBarangayProvider: false,
    })
    expect(view.agencies).toEqual([{
      title: 'Las Piñas City Police Station',
      icon: 'bi-shield-check',
      description: 'PNP station',
      link: '/agencies/pnp-laspinas',
    }])
  })

  it('omits the Barangay card when no Service in the Category is Barangay-provided', () => {
    const view = toCategoryView({
      category: makeCategory(),
      services: [],
      offices: [],
      agencies: [],
      hasBarangayProvider: false,
    })
    expect(view.barangay).toBeUndefined()
  })

  it('adds a single Barangay directory card when a Service is Barangay-provided', () => {
    const view = toCategoryView({
      category: makeCategory(),
      services: [],
      offices: [],
      agencies: [],
      hasBarangayProvider: true,
    })
    expect(view.barangay).toMatchObject({ link: '/barangays' })
  })
})

describe('toServiceDetailView', () => {
  it('resolves the Office card from the providing Office (providedBy)', () => {
    const office = makeOffice()
    const view = toServiceDetailView({
      service: { ...makeService({ providedBy: 'civil-registry' }), detail: makeDetail() },
      category: makeCategory(),
      office,
    })
    expect(view.officeInfo).toEqual(officeContactCard(office))
    expect(view.officeInfo!.name).toBe(office.name)
  })

  it('merges the Service title into the detail for the template', () => {
    const view = toServiceDetailView({
      service: { ...makeService({ title: 'Birth Certificate' }), detail: makeDetail({ fullTitle: 'BC' }) },
      category: makeCategory(),
    })
    expect(view.service.title).toBe('Birth Certificate')
    expect(view.service.fullTitle).toBe('BC')
  })

  it('falls back to the inline detail.office when no providing Office is supplied', () => {
    const inline = {
      name: 'BPLO',
      location: 'Annex',
      hours: '8-5',
    }
    const view = toServiceDetailView({
      service: { ...makeService({ providedBy: undefined }), detail: makeDetail({ office: inline }) },
      category: makeCategory(),
    })
    expect(view.officeInfo).toEqual(inline)
  })

  it('leaves officeInfo undefined when neither an Office nor an inline card exists', () => {
    const view = toServiceDetailView({
      service: { ...makeService(), detail: makeDetail() },
      category: makeCategory(),
    })
    expect(view.officeInfo).toBeUndefined()
  })

  it('derives categoryLabel/categoryHref from the Category record, not from `detail` (#245)', () => {
    // The Category record is the single source for these — `detail` (and its
    // fixture, makeDetail) deliberately carries no `category`/`categoryLink`
    // of its own, so this proves the View resolves them independently.
    const view = toServiceDetailView({
      service: { ...makeService(), detail: makeDetail() },
      category: makeCategory({ id: 'certificates', badgeText: 'Certs & Records' }),
    })
    expect(view.categoryLabel).toBe('Certs & Records')
    expect(view.categoryHref).toBe('/services/certificates')
  })
})

describe('toOfficeView', () => {
  it('dedupes two provided Services with the same title to one', () => {
    const view = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      group: makeGroup(),
      services: [
        makeService({ id: 'a', title: 'Birth Certificate', providedBy: 'civil-registry', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Birth Certificate', providedBy: 'civil-registry', detail: makeDetail() }),
      ],
    })
    const named = view.services.filter(s => s.name === 'Birth Certificate')
    expect(named).toHaveLength(1)
  })

  it('prefers the detail-bearing duplicate regardless of order', () => {
    const detailFirst = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      services: [
        makeService({ id: 'a', title: 'Birth Certificate', providedBy: 'civil-registry', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Birth Certificate', providedBy: 'civil-registry', detail: undefined }),
      ],
    })
    const detailLast = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      services: [
        makeService({ id: 'b', title: 'Birth Certificate', providedBy: 'civil-registry', detail: undefined }),
        makeService({ id: 'a', title: 'Birth Certificate', providedBy: 'civil-registry', detail: makeDetail() }),
      ],
    })
    expect(detailFirst.services[0]!.link).toBe('/service-details/a')
    expect(detailLast.services[0]!.link).toBe('/service-details/a')
  })

  it('gives a catalog-only provided Service no link', () => {
    const view = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      services: [makeService({ id: 'a', title: 'Walk-in record', providedBy: 'civil-registry', detail: undefined })],
    })
    expect(view.services[0]).toEqual({ name: 'Walk-in record', link: undefined })
  })

  it('links a detail-bearing provided Service to its /service-details page', () => {
    const view = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      services: [makeService({ id: 'birth-certificate', providedBy: 'civil-registry', detail: makeDetail() })],
    })
    expect(view.services[0]!.link).toBe('/service-details/birth-certificate')
  })

  it('excludes Services provided by other Offices and hidden Services', () => {
    const view = toOfficeView({
      office: makeOffice({ id: 'civil-registry' }),
      services: [
        makeService({ id: 'a', title: 'Mine', providedBy: 'civil-registry', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Other office', providedBy: 'treasurer', detail: makeDetail() }),
        makeService({ id: 'c', title: 'Hidden', providedBy: 'civil-registry', hidden: true, detail: makeDetail() }),
      ],
    })
    const names = view.services.map(s => s.name)
    expect(names).toEqual(['Mine'])
  })

  it('appends additionalServices as plain cards, deduped against provided Services', () => {
    const view = toOfficeView({
      office: makeOffice({
        id: 'civil-registry',
        additionalServices: ['Birth Certificate', 'Notarization'],
      }),
      services: [makeService({ id: 'a', title: 'Birth Certificate', providedBy: 'civil-registry', detail: makeDetail() })],
    })
    const names = view.services.map(s => s.name)
    expect(names).toEqual(['Birth Certificate', 'Notarization'])
    expect(view.services.find(s => s.name === 'Notarization')!.link).toBeUndefined()
  })

  it('derives the group name and a maps URL from the Office address', () => {
    const view = toOfficeView({
      office: makeOffice({ location: 'City Hall, Las Piñas' }),
      group: makeGroup({ name: 'Frontline Services' }),
      services: [],
    })
    expect(view.groupName).toBe('Frontline Services')
    expect(view.mapsUrl).toContain(encodeURIComponent('City Hall, Las Piñas'))
  })
})

describe('toAgencyView', () => {
  it('dedupes two provided Services with the same title to one', () => {
    const view = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [
        makeService({ id: 'a', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: makeDetail() }),
      ],
    })
    const named = view.services.filter(s => s.name === 'Police Clearance')
    expect(named).toHaveLength(1)
  })

  it('prefers the detail-bearing duplicate regardless of order', () => {
    const detailFirst = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [
        makeService({ id: 'a', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: undefined }),
      ],
    })
    const detailLast = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [
        makeService({ id: 'b', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: undefined }),
        makeService({ id: 'a', title: 'Police Clearance', providedByAgency: 'pnp-laspinas', detail: makeDetail() }),
      ],
    })
    expect(detailFirst.services[0]!.link).toBe('/service-details/a')
    expect(detailLast.services[0]!.link).toBe('/service-details/a')
  })

  it('gives a catalog-only provided Service no link', () => {
    const view = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [makeService({ id: 'a', title: 'Blotter report', providedByAgency: 'pnp-laspinas', detail: undefined })],
    })
    expect(view.services[0]).toEqual({ name: 'Blotter report', link: undefined })
  })

  it('links a detail-bearing provided Service to its /service-details page', () => {
    const view = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [makeService({ id: 'police-clearance', providedByAgency: 'pnp-laspinas', detail: makeDetail() })],
    })
    expect(view.services[0]!.link).toBe('/service-details/police-clearance')
  })

  it('excludes Services provided by other Agencies and hidden Services', () => {
    const view = toAgencyView({
      agency: makeAgency({ id: 'pnp-laspinas' }),
      services: [
        makeService({ id: 'a', title: 'Mine', providedByAgency: 'pnp-laspinas', detail: makeDetail() }),
        makeService({ id: 'b', title: 'Other agency', providedByAgency: 'some-other-agency', detail: makeDetail() }),
        makeService({ id: 'c', title: 'Hidden', providedByAgency: 'pnp-laspinas', hidden: true, detail: makeDetail() }),
      ],
    })
    const names = view.services.map(s => s.name)
    expect(names).toEqual(['Mine'])
  })

  it('derives a maps URL from the Agency address', () => {
    const view = toAgencyView({
      agency: makeAgency({ location: 'City Hall Compound, Las Piñas' }),
      services: [],
    })
    expect(view.mapsUrl).toContain(encodeURIComponent('City Hall Compound, Las Piñas'))
  })

  it('falls back to the Agency name for the maps URL when it has no location', () => {
    const view = toAgencyView({
      agency: makeAgency({ name: 'Some Agency', location: undefined }),
      services: [],
    })
    expect(view.mapsUrl).toContain(encodeURIComponent('Some Agency'))
  })
})

// ---------------------------------------------------------------------------
// Facade smoke tests against the real config — the facade owns the IO; these
// pin that a missed lookup returns undefined (so the page throws 404) and that
// resolution is behavior-equivalent to the pre-seam pages.
// ---------------------------------------------------------------------------

describe('facades (real config)', () => {
  it('categoryView resolves a live Category and 404s an unknown one', () => {
    expect(categoryView('certificates')).toBeDefined()
    // `government` retired outright (#286). Undefined here because
    // `isCanonicalCategory`'s `CANONICAL_CATEGORY_SLUGS` gate never included
    // it and short-circuits before any lookup — true before and after this
    // PR; the categories.json deletion doesn't change this call path.
    expect(categoryView('government')).toBeUndefined()
    // `online` retired outright (#288, ADR-0006) — same treatment: never in
    // `CANONICAL_CATEGORY_SLUGS`, so this short-circuits before any lookup.
    expect(categoryView('online')).toBeUndefined()
    expect(categoryView('not-a-real-category')).toBeUndefined()
  })

  it('categoryView(certificates) resolves all three responsible-body tiers (#198, ADR-0004)', () => {
    const view = categoryView('certificates')!
    expect(view.offices.some(o => o.title === 'City Civil Registry')).toBe(true)
    expect(view.agencies.some(a => a.title === 'Las Piñas City Police Station')).toBe(true)
    expect(view.barangay).toMatchObject({ link: '/barangays' })
  })

  it('serviceDetailView resolves a detail-bearing Service and its providedBy Office card', () => {
    const view = serviceDetailView('birth-certificate')
    expect(view).toBeDefined()
    const office = getOfficeBySlug('civil-registry')!
    expect(view!.officeInfo).toEqual(officeContactCard(office))
    expect(view!.service.title).toBe(getServiceBySlug('birth-certificate')!.title)
  })

  it('serviceDetailView resolves categoryLabel/categoryHref from the real Category record (#245)', () => {
    const view = serviceDetailView('birth-certificate')!
    const category = getCategoryBySlug('certificates')!
    expect(view.categoryLabel).toBe(category.badgeText)
    expect(view.categoryHref).toBe('/services/certificates')
  })

  it('serviceDetailView returns undefined for unknown slugs (Service-detail only, no office fallback)', () => {
    expect(serviceDetailView('not-a-real-service')).toBeUndefined()
    // The legacy office URL is a 301 now — it must not resolve a View here.
    expect(serviceDetailView('civil-registry')).toBeUndefined()
  })

  it('officeView resolves a live Office and returns undefined for unknown/hidden', () => {
    expect(officeView('civil-registry')).toBeDefined()
    expect(officeView('not-a-real-office')).toBeUndefined()
  })

  it('agencyView resolves a live Agency and returns undefined for unknown', () => {
    expect(agencyView('pnp-laspinas')).toBeDefined()
    expect(agencyView('not-a-real-agency')).toBeUndefined()
  })

  it('agencyView(pnp-laspinas) carries the verified provenance through to the view (#272, ADR-0005)', () => {
    const view = agencyView('pnp-laspinas')!
    const agency = getAgencyById('pnp-laspinas')!
    expect(view.agency.sources).toEqual(agency.sources)
  })

  it('agencyView(pnp-laspinas) carries the facebook field through unchanged (#295)', () => {
    const view = agencyView('pnp-laspinas')!
    const agency = getAgencyById('pnp-laspinas')!
    expect(view.agency.facebook).toBe(agency.facebook)
    expect(view.agency.facebook).toBe('https://www.facebook.com/pcrstation4')
  })
})
