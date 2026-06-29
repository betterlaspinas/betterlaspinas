import type {
  Category,
  Office,
  OfficeGroup,
  ServiceDetail,
  ServiceItem,
} from '@/types/config'
import { describe, expect, it } from 'vitest'
import { getOfficeBySlug, getServiceBySlug } from './configHelper'
import {
  categoryView,
  officeContactCard,
  officeView,
  serviceDetailView,
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
    category: 'Certificates',
    categoryId: 'certificates',
    keywords: [],
    url: '/service-details/birth-certificate',
    ...over,
  }
}

function makeDetail(over: Partial<ServiceDetail> = {}): ServiceDetail {
  return {
    fullTitle: 'Birth Certificate Request',
    category: 'Certificates',
    categoryLink: '/services/certificates',
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
    })
    expect(view.services[0]!.link).toBeUndefined()
  })

  it('maps the Category record and Office cards through', () => {
    const category = makeCategory()
    const view = toCategoryView({
      category,
      services: [makeService({ icon: 'bi-x', fee: '₱100', processingTime: '1 day' })],
      offices: [makeOffice()],
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
})

describe('toServiceDetailView', () => {
  it('resolves the Office card from the providing Office (providedBy)', () => {
    const office = makeOffice()
    const view = toServiceDetailView({
      service: { ...makeService({ providedBy: 'civil-registry' }), detail: makeDetail() },
      office,
    })
    expect(view.officeInfo).toEqual(officeContactCard(office))
    expect(view.officeInfo!.name).toBe(office.name)
  })

  it('merges the Service title into the detail for the template', () => {
    const view = toServiceDetailView({
      service: { ...makeService({ title: 'Birth Certificate' }), detail: makeDetail({ fullTitle: 'BC' }) },
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
    })
    expect(view.officeInfo).toEqual(inline)
  })

  it('leaves officeInfo undefined when neither an Office nor an inline card exists', () => {
    const view = toServiceDetailView({
      service: { ...makeService(), detail: makeDetail() },
    })
    expect(view.officeInfo).toBeUndefined()
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

// ---------------------------------------------------------------------------
// Facade smoke tests against the real config — the facade owns the IO; these
// pin that a missed lookup returns undefined (so the page throws 404) and that
// resolution is behavior-equivalent to the pre-seam pages.
// ---------------------------------------------------------------------------

describe('facades (real config)', () => {
  it('categoryView resolves a live Category and gates a non-resident one', () => {
    expect(categoryView('certificates')).toBeDefined()
    expect(categoryView('government')).toBeUndefined()
    expect(categoryView('not-a-real-category')).toBeUndefined()
  })

  it('serviceDetailView resolves a detail-bearing Service and its providedBy Office card', () => {
    const view = serviceDetailView('birth-certificate')
    expect(view).toBeDefined()
    const office = getOfficeBySlug('civil-registry')!
    expect(view!.officeInfo).toEqual(officeContactCard(office))
    expect(view!.service.title).toBe(getServiceBySlug('birth-certificate')!.title)
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
})
