import { describe, expect, it } from 'vitest'
import { validateAgainstSchema, validateConsistency } from '../../scripts/validate-config.mjs'
import {
  getAllServices,
  getCategoryBySlug,
  getCategorySeoDescription,
  getMergedSiteConfig,
  getOfficeBySlug,
  getOfficeForService,
  getOfficeGroupBySlug,
  getOfficeGroups,
  getOffices,
  getOfficesByGroup,
  getOfficesForCategory,
  getOgImageConfig,
  getOgImageRouteConfig,
  getServiceBySlug,
  getServiceCategories,
  getServicesByCategory,
  getServiceSeoDescription,
  getSiteConfig,
  isCanonicalCategory,
} from './configHelper'

// Frozen snapshot of the legacy SEO config JSON (the now-removed
// app/config/seo-service-details-slug.json and seo-services-category.json).
// The accessors must return byte-equal templates so migrated Service/Category
// routes produce behavior-equivalent SEO output. If a description is
// intentionally reworded, update this snapshot in the same change.
const LEGACY_SEO_SERVICE_DETAILS: Record<string, string> = {
  'birth-certificate': 'Get a certified copy of birth certificate registered in {{lguName}}.',
  'marriage-certificate': 'Register or request certified true copy of marriage certificate in {{lguName}}.',
  'death-certificate': 'Register death certificate and obtain burial or transfer permit in {{lguName}}.',
  'business-permit-new': 'Apply for a new Business License and Mayor\'s Permit in {{lguName}}.',
  'business-permit-renewal': 'Renew your annual Business License and Mayor\'s Permit in {{lguName}}.',
  'special-permit': 'Apply for a Special Permit to operate your business establishment in {{lguName}}.',
  'occupational-permit': 'Secure an Occupational Mayor\'s Permit for workers or employees in {{lguName}}.',
  'occupational-permit-jobseeker': 'Avail the free Occupational Mayor\'s Permit for First Time Job Seekers in {{lguName}} under RA 11261.',
  'business-status-certificate': 'Verify the status of a business entity registered with the BPLO in {{lguName}}.',
  'ctc-business-license': 'Request a Certified True Copy of Business License and Mayor\'s Permit in {{lguName}}.',
  'safety-seal': 'Apply for a Safety Seal Certificate to certify your business establishment\'s compliance with health standards in {{lguName}}.',
}

const LEGACY_SEO_SERVICES_CATEGORY: Record<string, string> = {
  'certificates': 'Official documents for birth, death, marriage, and other vital records in {{lguName}}.',
  'business': 'Business permits, licenses, and trade registration services in {{lguName}}.',
  'tax-payments': 'Property tax, business tax, payments, and tax clearance in {{lguName}}.',
  'social-services': 'Welfare programs, senior citizen services, PWD benefits, and financial aid in {{lguName}}.',
  'health': 'Vaccination programs, health certificates, and medical assistance in {{lguName}}.',
  'agriculture': 'Agricultural loans, crop insurance, fertilizer assistance, and training in {{lguName}}.',
  'infrastructure': 'Construction permits, road maintenance requests, and public facilities in {{lguName}}.',
  'education': 'Scholarship programs, student assistance, and educational grants in {{lguName}}.',
  'public-safety': 'Emergency services, disaster preparedness, and community safety programs in {{lguName}}.',
  'environment': 'Environmental permits, waste management, and conservation programs in {{lguName}}.',
}

describe('derived SEO accessors', () => {
  describe('getServiceSeoDescription', () => {
    it('returns the SEO template carried on the canonical Service record', () => {
      expect(getServiceSeoDescription('birth-certificate')).toBe(
        'Get a certified copy of birth certificate registered in {{lguName}}.',
      )
    })

    it('returns undefined for an unknown Service slug', () => {
      expect(getServiceSeoDescription('does-not-exist')).toBeUndefined()
    })

    it('is behavior-equivalent to the legacy seo-service-details-slug.json for every migrated slug', () => {
      for (const [slug, legacy] of Object.entries(LEGACY_SEO_SERVICE_DETAILS)) {
        expect(getServiceSeoDescription(slug)).toBe(legacy)
      }
    })

    it('exposes the seo template via the canonical Service accessor too', () => {
      expect(getServiceBySlug('birth-certificate')?.seo).toBe(
        getServiceSeoDescription('birth-certificate'),
      )
    })
  })

  describe('getCategorySeoDescription', () => {
    it('returns the SEO template carried on the canonical Category record', () => {
      expect(getCategorySeoDescription('certificates')).toBe(
        'Official documents for birth, death, marriage, and other vital records in {{lguName}}.',
      )
    })

    it('returns undefined for an unknown Category slug', () => {
      expect(getCategorySeoDescription('does-not-exist')).toBeUndefined()
    })

    it('is behavior-equivalent to the legacy seo-services-category.json for every migrated category', () => {
      for (const [slug, legacy] of Object.entries(LEGACY_SEO_SERVICES_CATEGORY)) {
        expect(getCategorySeoDescription(slug)).toBe(legacy)
      }
    })

    it('exposes the seo template via the canonical Category accessor too', () => {
      expect(getCategoryBySlug('certificates')?.seo).toBe(
        getCategorySeoDescription('certificates'),
      )
    })
  })
})

describe('configHelper', () => {
  it('getSiteConfig should return site config', () => {
    const config = getSiteConfig()
    expect(config).toBeDefined()
    expect(config.lguType).toBeDefined()
  })

  describe('getMergedSiteConfig', () => {
    it('returns base site.json config when no overrides provided', () => {
      const base = getSiteConfig()
      const merged = getMergedSiteConfig()
      expect(merged).toEqual(base)
    })

    it('returns base site.json config when empty overrides provided', () => {
      const base = getSiteConfig()
      const merged = getMergedSiteConfig({})
      expect(merged).toEqual(base)
    })

    it('overrides municipality from runtimeSite', () => {
      const merged = getMergedSiteConfig({ municipality: 'Quezon City' })
      expect(merged.municipality).toBe('Quezon City')
    })

    it('overrides domain from runtimeSite', () => {
      const merged = getMergedSiteConfig({ domain: 'quezoncity.gov.ph' })
      expect(merged.domain).toBe('quezoncity.gov.ph')
    })

    it('overrides lguType from runtimeSite', () => {
      const merged = getMergedSiteConfig({ lguType: 'Municipality' })
      expect(merged.lguType).toBe('Municipality')
    })

    it('preserves non-overridden fields from base config', () => {
      const base = getSiteConfig()
      const merged = getMergedSiteConfig({ domain: 'test.gov.ph' })
      expect(merged.contact).toEqual(base.contact)
      expect(merged.coordinates).toEqual(base.coordinates)
      expect(merged.social).toEqual(base.social)
      expect(merged.logo).toEqual(base.logo)
    })

    it('does not override with empty string values', () => {
      const base = getSiteConfig()
      const merged = getMergedSiteConfig({ municipality: '' })
      expect(merged.municipality).toBe(base.municipality)
    })
  })

  describe('getOgImageConfig', () => {
    it('should return og image config', () => {
      const config = getOgImageConfig()
      expect(config).toBeDefined()
      expect(config.index).toBeDefined()
      expect(config.index?.title).toBeDefined()
    })
  })

  describe('getOgImageRouteConfig', () => {
    it('returns undefined for unknown route', () => {
      const result = getOgImageRouteConfig('nonexistent')
      expect(result).toBeUndefined()
    })

    it('interpolates template variables', () => {
      const result = getOgImageRouteConfig('index', {
        siteBrandName: 'BetterLasPinas.org',
        lguName: 'Las Piñas',
      })
      expect(result).toBeDefined()
      expect(result!.title).not.toContain('{{')
    })

    it('returns description when present', () => {
      const result = getOgImageRouteConfig('about', {
        siteBrandName: 'BetterLasPinas.org',
        lguName: 'Las Piñas',
      })
      expect(result?.description).toBeDefined()
    })
  })

  describe('canonical Service accessor', () => {
    it('getAllServices returns visible Services only', () => {
      const services = getAllServices()
      expect(services.length).toBeGreaterThan(0)
      expect(services.every(s => !s.hidden)).toBe(true)
    })

    it('getServiceCategories includes the certificates category', () => {
      const categories = getServiceCategories()
      expect(categories.find(c => c.id === 'certificates')).toBeDefined()
      expect(categories.every(c => !c.hidden)).toBe(true)
    })

    it('getCategoryBySlug returns the certificates category (no inline offices)', () => {
      const cert = getCategoryBySlug('certificates')
      expect(cert).toBeDefined()
      expect(cert!.name).toBe('Certificates & Vital Records')
      // Offices are a first-class entity now (#185); Category no longer carries
      // an inline `offices` array.
      expect('offices' in cert!).toBe(false)
    })

    it('getCategoryBySlug returns undefined for unknown slug', () => {
      expect(getCategoryBySlug('does-not-exist')).toBeUndefined()
    })

    it('getServicesByCategory returns certificates Services', () => {
      const certServices = getServicesByCategory('certificates')
      expect(certServices.length).toBeGreaterThan(0)
      expect(certServices.every(s => s.categoryId === 'certificates')).toBe(true)
    })

    it('getServiceBySlug resolves a detail-bearing Service (birth-certificate)', () => {
      const birth = getServiceBySlug('birth-certificate')
      expect(birth).toBeDefined()
      expect(birth!.detail).toBeDefined()
      expect(birth!.detail!.fullTitle).toBe('Birth Certificate (Local Copy)')
      expect(birth!.detail!.processSteps.length).toBeGreaterThan(0)
      expect(birth!.url).toBe('/service-details/birth-certificate')
    })

    it('getServiceBySlug resolves a no-detail catalog Service (barangay-clearance)', () => {
      const brgy = getServiceBySlug('barangay-clearance')
      expect(brgy).toBeDefined()
      expect(brgy!.detail).toBeUndefined()
      expect(brgy!.icon).toBeDefined()
      expect(brgy!.url).toBe('/services/certificates')
    })

    it('getServiceBySlug returns undefined for unknown slug', () => {
      expect(getServiceBySlug('not-a-real-service')).toBeUndefined()
    })
  })

  // #186: every resident-facing Service Category is now sourced canonically and
  // renders via the accessor (no categoriesContent.ts fallback).
  describe('migrated Service Categories (#186)', () => {
    const MIGRATED = [
      'business',
      'tax-payments',
      'social-services',
      'health',
      'agriculture',
      'infrastructure',
      'education',
      'public-safety',
      'environment',
    ] as const

    it.each(MIGRATED)('%s is a canonical Category resolved by slug', (slug) => {
      expect(isCanonicalCategory(slug)).toBe(true)
      const category = getCategoryBySlug(slug)
      expect(category).toBeDefined()
      // Canonical Categories no longer carry an inline `offices` array.
      expect('offices' in category!).toBe(false)
    })

    it.each(MIGRATED)('%s exposes only its own visible Services via the accessor', (slug) => {
      const services = getServicesByCategory(slug)
      expect(services.length).toBeGreaterThan(0)
      expect(services.every(s => s.categoryId === slug)).toBe(true)
      expect(services.every(s => !s.hidden)).toBe(true)
    })

    it('a detail-bearing migrated Service resolves its detail from services.json', () => {
      const permit = getServiceBySlug('business-permit-new')
      expect(permit).toBeDefined()
      expect(permit!.detail).toBeDefined()
      expect(permit!.detail!.fullTitle).toContain('Business License')
      expect(permit!.url).toBe('/service-details/business-permit-new')
    })

    it('property-declaration and cswdo-services carry their canonical detail block', () => {
      for (const id of ['property-declaration', 'cswdo-services']) {
        const svc = getServiceBySlug(id)
        expect(svc, id).toBeDefined()
        expect(svc!.detail, id).toBeDefined()
        expect(svc!.url, id).toBe(`/service-details/${id}`)
      }
    })

    it('a catalog-only migrated Service points back at its Category page', () => {
      const vaccination = getServiceBySlug('vaccination')
      expect(vaccination).toBeDefined()
      expect(vaccination!.detail).toBeUndefined()
      expect(vaccination!.url).toBe('/services/health')
    })

    it('office-as-Service rows do not pollute a migrated Category grid', () => {
      const taxIds = getServicesByCategory('tax-payments').map(s => s.id)
      // City Budget/Accounting/Assessor are Offices (#185/#198), hidden so they
      // never render as Service cards on the canonical Taxation page.
      expect(taxIds).not.toContain('city-budget')
      expect(taxIds).not.toContain('city-accounting')
      expect(taxIds).not.toContain('city-assessor')
      const infraIds = getServicesByCategory('infrastructure').map(s => s.id)
      expect(infraIds).not.toContain('city-engineering')
      expect(infraIds).not.toContain('city-planning')
      const agriIds = getServicesByCategory('agriculture').map(s => s.id)
      expect(agriIds).not.toContain('city-agriculture')
    })
  })

  describe('canonical Office accessor', () => {
    it('getOffices returns visible Offices only', () => {
      const offices = getOffices()
      expect(offices.length).toBeGreaterThan(0)
      expect(offices.every(o => !o.hidden)).toBe(true)
      // The hidden Human Resource Management office is excluded.
      expect(offices.find(o => o.id === 'human-resource-management')).toBeUndefined()
    })

    it('each Office belongs to exactly one (known) Office Group', () => {
      const groupIds = new Set(getOfficeGroups().map(g => g.id))
      // Every visible office resolves to a single, known group via groupId.
      for (const office of getOffices()) {
        expect(typeof office.groupId).toBe('string')
        expect(groupIds.has(office.groupId)).toBe(true)
      }
    })

    it('getOfficeBySlug resolves a known Office', () => {
      const civil = getOfficeBySlug('civil-registry')
      expect(civil).toBeDefined()
      expect(civil!.name).toBe('City Civil Registry')
      expect(civil!.groupId).toBe('frontline-services')
    })

    it('getOfficeBySlug returns undefined for unknown or hidden Offices', () => {
      expect(getOfficeBySlug('not-a-real-office')).toBeUndefined()
      expect(getOfficeBySlug('human-resource-management')).toBeUndefined()
      // barangay-hall and police-station are hidden pending scoping (see #198).
      expect(getOfficeBySlug('barangay-hall')).toBeUndefined()
      expect(getOfficeBySlug('police-station')).toBeUndefined()
    })

    it('getOfficeGroups returns visible Office Groups', () => {
      const groups = getOfficeGroups()
      expect(groups.length).toBeGreaterThan(0)
      expect(groups.every(g => !g.hidden)).toBe(true)
      expect(groups.find(g => g.id === 'frontline-services')).toBeDefined()
    })

    it('getOfficeGroupBySlug returns undefined for unknown slug', () => {
      expect(getOfficeGroupBySlug('does-not-exist')).toBeUndefined()
    })

    it('getOfficesByGroup renders one Office Group\'s Offices from the accessor alone', () => {
      const frontline = getOfficesByGroup('frontline-services')
      expect(frontline.length).toBeGreaterThan(0)
      expect(frontline.every(o => o.groupId === 'frontline-services')).toBe(true)
      expect(frontline.find(o => o.id === 'civil-registry')).toBeDefined()
    })

    it('getOfficesByGroup returns empty for an unknown group', () => {
      expect(getOfficesByGroup('ghost-group')).toEqual([])
    })

    it('getOfficeForService resolves a Certificates Service to its providedBy Office', () => {
      const birth = getServiceBySlug('birth-certificate')
      const office = getOfficeForService(birth!)
      expect(office).toBeDefined()
      expect(office!.id).toBe('civil-registry')
    })

    it('getOfficeForService returns undefined when a Service has no providedBy', () => {
      expect(getOfficeForService({ providedBy: undefined } as never)).toBeUndefined()
    })

    it('getOfficesForCategory dedupes Offices across a Category\'s Services', () => {
      const offices = getOfficesForCategory('certificates')
      expect(offices.length).toBeGreaterThan(0)
      // Three certificates Services share civil-registry; it appears once.
      const ids = offices.map(o => o.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids).toContain('civil-registry')
      // barangay-hall and police-station back Services via providedBy but are
      // hidden pending scoping (#198), so they resolve to no card.
      expect(ids).not.toContain('barangay-hall')
      expect(ids).not.toContain('police-station')
    })
  })

  describe('config validator', () => {
    const minimalServiceSchema = {
      type: 'object',
      required: ['services'],
      properties: {
        services: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'title', 'description', 'category', 'keywords', 'url'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              category: { type: 'string' },
              categoryId: { type: 'string' },
              keywords: { type: 'array', items: { type: 'string' } },
              url: { type: 'string' },
              detail: { type: 'object' },
            },
          },
        },
      },
    }

    function makeService(over = {}) {
      return {
        id: 'sample',
        title: 'Sample',
        description: 'A sample service',
        category: 'Certificates & Vital Records',
        categoryId: 'certificates',
        keywords: ['sample'],
        url: '/services/certificates',
        ...over,
      }
    }

    it('accepts well-formed data', () => {
      const services = { services: [makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      expect(validateAgainstSchema(services, minimalServiceSchema, 'services')).toBe(true)
      expect(validateConsistency(services, categories)).toBe(true)
    })

    it('rejects a service missing a required field', () => {
      const bad = { services: [{ id: 'x', title: 'X' }] }
      expect(validateAgainstSchema(bad, minimalServiceSchema, 'services')).toBe(false)
    })

    it('rejects an unexpected property (additionalProperties: false)', () => {
      const bad = { services: [makeService({ bogus: true })] }
      expect(validateAgainstSchema(bad, minimalServiceSchema, 'services')).toBe(false)
    })

    it('rejects an unknown categoryId', () => {
      const services = { services: [makeService({ categoryId: 'ghost' })] }
      const categories = { categories: [{ id: 'certificates' }] }
      expect(validateConsistency(services, categories)).toBe(false)
    })

    it('rejects duplicate service ids', () => {
      const services = { services: [makeService(), makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      expect(validateConsistency(services, categories)).toBe(false)
    })

    it('rejects a detail-bearing Service whose url is not its own /service-details page', () => {
      const services = {
        services: [makeService({ detail: { fullTitle: 'X' }, url: '/services/certificates' })],
      }
      const categories = { categories: [{ id: 'certificates' }] }
      expect(validateConsistency(services, categories)).toBe(false)
    })
  })

  describe('offices config validator', () => {
    const minimalOfficesSchema = {
      type: 'object',
      required: ['officeGroups', 'offices'],
      properties: {
        officeGroups: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'name', 'description'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              icon: { type: 'string' },
              hidden: { type: 'boolean' },
            },
          },
        },
        offices: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'name', 'groupId', 'icon', 'description', 'link'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              groupId: { type: 'string' },
              icon: { type: 'string' },
              description: { type: 'string' },
              link: { type: 'string' },
              hidden: { type: 'boolean' },
            },
          },
        },
      },
    }

    function makeService(over = {}) {
      return {
        id: 'sample',
        title: 'Sample',
        description: 'A sample service',
        category: 'Certificates & Vital Records',
        categoryId: 'certificates',
        keywords: ['sample'],
        url: '/services/certificates',
        ...over,
      }
    }

    function makeOffices(over = {}) {
      return {
        officeGroups: [{ id: 'frontline-services', name: 'Frontline Services', description: 'd' }],
        offices: [{
          id: 'civil-registry',
          name: 'City Civil Registry',
          groupId: 'frontline-services',
          icon: 'bi-building',
          description: 'd',
          link: '/services/certificates',
        }],
        ...over,
      }
    }

    it('accepts well-formed offices data', () => {
      const offices = makeOffices()
      expect(validateAgainstSchema(offices, minimalOfficesSchema, 'offices')).toBe(true)
    })

    it('rejects an office missing a required field (groupId)', () => {
      const bad = {
        officeGroups: [{ id: 'frontline-services', name: 'F', description: 'd' }],
        offices: [{ id: 'x', name: 'X', icon: 'bi', description: 'd', link: '/x' }],
      }
      expect(validateAgainstSchema(bad, minimalOfficesSchema, 'offices')).toBe(false)
    })

    it('rejects an office with an unexpected property (additionalProperties: false)', () => {
      const bad = makeOffices({
        offices: [{
          id: 'civil-registry',
          name: 'City Civil Registry',
          groupId: 'frontline-services',
          icon: 'bi-building',
          description: 'd',
          link: '/x',
          bogus: true,
        }],
      })
      expect(validateAgainstSchema(bad, minimalOfficesSchema, 'offices')).toBe(false)
    })

    it('rejects an office whose groupId references an unknown Office Group', () => {
      const services = { services: [makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      const offices = makeOffices({
        offices: [{
          id: 'civil-registry',
          name: 'City Civil Registry',
          groupId: 'ghost-group',
          icon: 'bi-building',
          description: 'd',
          link: '/x',
        }],
      })
      expect(validateConsistency(services, categories, offices)).toBe(false)
    })

    it('rejects duplicate office ids', () => {
      const services = { services: [makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      const office = {
        id: 'civil-registry',
        name: 'City Civil Registry',
        groupId: 'frontline-services',
        icon: 'bi-building',
        description: 'd',
        link: '/x',
      }
      const offices = makeOffices({ offices: [office, office] })
      expect(validateConsistency(services, categories, offices)).toBe(false)
    })

    it('rejects a Service whose providedBy references an unknown Office', () => {
      const services = { services: [makeService({ providedBy: 'ghost-office' })] }
      const categories = { categories: [{ id: 'certificates' }] }
      const offices = makeOffices()
      expect(validateConsistency(services, categories, offices)).toBe(false)
    })

    it('accepts a Service whose providedBy resolves to a known Office', () => {
      const services = { services: [makeService({ providedBy: 'civil-registry' })] }
      const categories = { categories: [{ id: 'certificates' }] }
      const offices = makeOffices()
      expect(validateConsistency(services, categories, offices)).toBe(true)
    })
  })
})
