import { describe, expect, it } from 'vitest'
import { validateAgainstSchema, validateConsistency } from '../../scripts/validate-config.mjs'
import {
  categoryHasBarangayProvider,
  getAgencies,
  getAgenciesForCategory,
  getAgencyById,
  getAgencyForService,
  getAllServices,
  getCategoryBySlug,
  getCategorySeoDescription,
  getDepartmentHeads,
  getMergedSiteConfig,
  getOfficeBySlug,
  getOfficeForService,
  getOfficeGroupBySlug,
  getOfficeGroups,
  getOfficeHead,
  getOffices,
  getOfficesByGroup,
  getOfficesConfig,
  getOfficesForCategory,
  getOfficesWithHeads,
  getOfficesWithHeadsByGroup,
  getOfficialsConfig,
  getOgImageConfig,
  getOgImageRouteConfig,
  getServiceBySlug,
  getServiceCategories,
  getServicesByCategory,
  getServiceSeoDescription,
  getSiteConfig,
  getSubdivisionsConfig,
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

    it('exposes the seoDescription template via the canonical Service accessor too', () => {
      expect(getServiceBySlug('birth-certificate')?.seoDescription).toBe(
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

    it('exposes the seoDescription template via the canonical Category accessor too', () => {
      expect(getCategoryBySlug('certificates')?.seoDescription).toBe(
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

  // #186: every resident-facing Service Category is sourced canonically and
  // renders via the accessor — the canonical source is the only source (#189).
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

    it('vaccination is a detail-bearing Service linking to its own page (#202)', () => {
      const vaccination = getServiceBySlug('vaccination')
      expect(vaccination).toBeDefined()
      expect(vaccination!.detail).toBeDefined()
      expect(vaccination!.url).toBe('/service-details/vaccination')
      expect(vaccination!.providedBy).toBe('city-health')
    })

    it('emergency-response is a detail-bearing Service linking to its own page (#202)', () => {
      const er = getServiceBySlug('emergency-response')
      expect(er).toBeDefined()
      expect(er!.detail).toBeDefined()
      expect(er!.url).toBe('/service-details/emergency-response')
      expect(er!.providedBy).toBe('cdrrmo')
    })

    it('shadow office-as-Service rows deleted — do not resolve via getServiceBySlug (#202)', () => {
      // These rows were removed in #202; 301 redirects handle URL continuity.
      for (const id of [
        'city-treasurer',
        'city-budget',
        'city-accounting',
        'city-assessor',
        'city-engineering',
        'city-planning',
        'city-agriculture',
        'city-general-services',
        'human-resource',
      ]) {
        expect(getServiceBySlug(id), id).toBeUndefined()
      }
    })

    it('shadow rows no longer pollute migrated Category grids (#202)', () => {
      const taxIds = getServicesByCategory('tax-payments').map(s => s.id)
      expect(taxIds).not.toContain('city-budget')
      expect(taxIds).not.toContain('city-accounting')
      expect(taxIds).not.toContain('city-assessor')
      expect(taxIds).not.toContain('city-treasurer')
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
      // barangay-hall and police-station were removed from offices.json
      // entirely (#198, ADR-0004) — neither is a city Office; they are now the
      // Barangay and Agency responsible-body tiers.
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
      // barangay-hall and police-station no longer exist as Offices (#198,
      // ADR-0004) — the certificates Services that used to providedBy them now
      // set providedByBarangay/providedByAgency instead.
      expect(ids).not.toContain('barangay-hall')
      expect(ids).not.toContain('police-station')
    })
  })

  describe('canonical Agency accessor (#198, ADR-0004)', () => {
    it('getAgencies returns every Agency record', () => {
      const agencies = getAgencies()
      expect(agencies.length).toBeGreaterThan(0)
      expect(agencies.find(a => a.id === 'pnp-laspinas')).toBeDefined()
    })

    it('getAgencyById resolves a known Agency', () => {
      const pnp = getAgencyById('pnp-laspinas')
      expect(pnp).toBeDefined()
      expect(pnp!.name).toBe('Las Piñas City Police Station')
    })

    it('getAgencyById returns undefined for an unknown Agency', () => {
      expect(getAgencyById('not-a-real-agency')).toBeUndefined()
    })

    it('getAgencyForService resolves police-clearance to pnp-laspinas', () => {
      const service = getServiceBySlug('police-clearance')
      const agency = getAgencyForService(service!)
      expect(agency).toBeDefined()
      expect(agency!.id).toBe('pnp-laspinas')
    })

    it('getAgencyForService returns undefined when a Service has no providedByAgency', () => {
      expect(getAgencyForService({ providedByAgency: undefined } as never)).toBeUndefined()
    })

    it('getAgenciesForCategory resolves pnp-laspinas for certificates', () => {
      const agencies = getAgenciesForCategory('certificates')
      const ids = agencies.map(a => a.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids).toContain('pnp-laspinas')
    })

    it('getAgenciesForCategory returns empty for a category with no Agency provider', () => {
      expect(getAgenciesForCategory('does-not-exist')).toEqual([])
    })
  })

  describe('three-tier responsible-body resolution (#198, ADR-0004)', () => {
    it('barangay-clearance and barangay-id set providedByBarangay, not providedBy/providedByAgency', () => {
      for (const id of ['barangay-clearance', 'barangay-id']) {
        const service = getServiceBySlug(id)
        expect(service, id).toBeDefined()
        expect(service!.providedByBarangay, id).toBe(true)
        expect(service!.providedBy, id).toBeUndefined()
        expect(service!.providedByAgency, id).toBeUndefined()
      }
    })

    it('police-clearance sets providedByAgency, not providedBy/providedByBarangay', () => {
      const service = getServiceBySlug('police-clearance')
      expect(service!.providedByAgency).toBe('pnp-laspinas')
      expect(service!.providedBy).toBeUndefined()
      expect(service!.providedByBarangay).toBeUndefined()
    })

    it('categoryHasBarangayProvider is true for certificates (barangay-clearance/barangay-id)', () => {
      expect(categoryHasBarangayProvider('certificates')).toBe(true)
    })

    it('categoryHasBarangayProvider is false for a category with no Barangay-tier Service', () => {
      expect(categoryHasBarangayProvider('does-not-exist')).toBe(false)
    })

    it('no live Service sets more than one responsible-body tier', () => {
      for (const service of getAllServices()) {
        const tierCount = [service.providedBy, service.providedByAgency, service.providedByBarangay]
          .filter(v => v !== undefined && v !== false)
          .length
        expect(tierCount, service.id).toBeLessThanOrEqual(1)
      }
    })
  })

  describe('migrated Offices (#202)', () => {
    const MIGRATED_FRONTLINE = [
      'city-treasurer',
      'city-assessor',
      'cswdo',
      'city-agriculture',
      'city-engineering',
      'city-planning',
      'city-health',
      'cdrrmo',
    ] as const

    const MIGRATED_ADMIN = [
      'city-budget',
      'city-accounting',
      'city-general-services',
    ] as const

    it.each(MIGRATED_FRONTLINE)(
      '%s resolves via getOfficeBySlug and belongs to frontline-services group',
      (id) => {
        const office = getOfficeBySlug(id)
        expect(office, id).toBeDefined()
        expect(office!.groupId, id).toBe('frontline-services')
        expect(office!.link, id).toBe(`/offices/${id}`)
      },
    )

    it.each(MIGRATED_ADMIN)(
      '%s resolves via getOfficeBySlug and belongs to administration group',
      (id) => {
        const office = getOfficeBySlug(id)
        expect(office, id).toBeDefined()
        expect(office!.groupId, id).toBe('administration')
        expect(office!.link, id).toBe(`/offices/${id}`)
      },
    )

    it('migrated Offices have NO detail block (directory-record only)', () => {
      for (const id of [...MIGRATED_FRONTLINE, ...MIGRATED_ADMIN]) {
        const office = getOfficeBySlug(id)
        expect(office, id).toBeDefined()
        expect(office!.detail, `${id} must not have a detail block`).toBeUndefined()
      }
    })

    it('city-treasurer lists its providedBy services', () => {
      const services = getAllServices().filter(s => s.providedBy === 'city-treasurer')
      expect(services.length).toBeGreaterThan(0)
      const ids = services.map(s => s.id)
      expect(ids).toContain('real-property-tax')
      expect(ids).toContain('business-tax')
      expect(ids).toContain('tax-clearance')
    })

    it('city-assessor lists property-declaration as a providedBy service', () => {
      const services = getAllServices().filter(s => s.providedBy === 'city-assessor')
      expect(services.map(s => s.id)).toContain('property-declaration')
    })

    it('cswdo lists its providedBy services', () => {
      const services = getAllServices().filter(s => s.providedBy === 'cswdo')
      expect(services.length).toBeGreaterThan(0)
      const ids = services.map(s => s.id)
      expect(ids).toContain('senior-citizen-id')
      expect(ids).toContain('pwd-id')
      expect(ids).toContain('cswdo-services')
    })

    it('city-agriculture lists its providedBy services', () => {
      const services = getAllServices().filter(s => s.providedBy === 'city-agriculture')
      const ids = services.map(s => s.id)
      expect(ids).toContain('agricultural-loan')
      expect(ids).toContain('crop-insurance')
      expect(ids).toContain('fertilizer-assistance')
    })

    it('city-engineering lists its providedBy services', () => {
      const services = getAllServices().filter(s => s.providedBy === 'city-engineering')
      const ids = services.map(s => s.id)
      expect(ids).toContain('building-permit')
      expect(ids).toContain('occupancy-permit')
      expect(ids).toContain('road-maintenance')
    })

    it('city-health lists its providedBy services including vaccination', () => {
      const services = getAllServices().filter(s => s.providedBy === 'city-health')
      const ids = services.map(s => s.id)
      expect(ids).toContain('vaccination')
      expect(ids).toContain('health-certificate')
      expect(ids).toContain('prenatal-checkup')
    })

    it('cdrrmo lists emergency-response as a providedBy service', () => {
      const services = getAllServices().filter(s => s.providedBy === 'cdrrmo')
      const ids = services.map(s => s.id)
      expect(ids).toContain('emergency-response')
      expect(ids).toContain('disaster-preparedness')
    })

    it('vaccination surfaces its Office via providedBy, not relatedServices', () => {
      // An Office is not a Service: it is surfaced from `providedBy` (the
      // "Office Information" card), never recycled into `relatedServices` (which
      // renders under a "Related Services" heading and holds sibling Services).
      const vaccination = getServiceBySlug('vaccination')
      expect(vaccination!.providedBy).toBe('city-health')
      const relatedLinks = vaccination!.detail!.relatedServices.map(r => r.link)
      expect(relatedLinks.some(l => l.startsWith('/offices/'))).toBe(false)
    })

    it('emergency-response surfaces its Office via providedBy, not relatedServices', () => {
      const er = getServiceBySlug('emergency-response')
      expect(er!.providedBy).toBe('cdrrmo')
      const relatedLinks = er!.detail!.relatedServices.map(r => r.link)
      expect(relatedLinks.some(l => l.startsWith('/offices/'))).toBe(false)
    })

    it('no providedBy-backed Service carries an inline detail.office (#212)', () => {
      // The inline copy is gone: a Service with a first-class providing Office
      // single-sources its contact card off that Office, never a stored copy.
      for (const service of getAllServices()) {
        if (!service.providedBy || !getOfficeBySlug(service.providedBy))
          continue
        expect(service.detail?.office, service.id).toBeUndefined()
      }
    })

    it('civil-registry lists off-catalog offerings via additionalServices, none duplicating a providedBy Service', () => {
      const office = getOfficeBySlug('civil-registry')!
      expect(office.additionalServices?.length).toBeGreaterThan(0)
      // additionalServices are office-only (not Service records) and must not
      // duplicate a real providedBy Service by name — the page dedupes on this.
      const providedTitles = new Set(
        getAllServices().filter(s => s.providedBy === 'civil-registry').map(s => s.title),
      )
      for (const name of office.additionalServices!)
        expect(providedTitles.has(name), name).toBe(false)
    })

    it('charter-backed Offices cite the Citizen\'s Charter as their data source', () => {
      const charterUrl = 'https://laspinascity.gov.ph/storage/uploads/gallery/625e67f3ae023.pdf'
      for (const id of ['civil-registry', 'city-treasurer', 'city-assessor', 'cswdo', 'city-engineering', 'city-planning', 'city-health']) {
        const office = getOfficeBySlug(id)
        const charter = office?.sources?.[0]
        expect(charter?.url, id).toBe(charterUrl)
        expect(charter?.name, id).toContain('Citizen')
      }
    })

    it('getOfficesByGroup frontline-services contains all 9 frontline offices', () => {
      const ids = getOfficesByGroup('frontline-services').map(o => o.id)
      // civil-registry + 8 migrated frontline
      expect(ids).toContain('civil-registry')
      for (const id of MIGRATED_FRONTLINE) {
        expect(ids, id).toContain(id)
      }
    })

    it('getOfficesByGroup administration contains all 4 admin offices', () => {
      const ids = getOfficesByGroup('administration').map(o => o.id)
      // human-resource-management is hidden; only the 3 migrated visible ones
      for (const id of MIGRATED_ADMIN) {
        expect(ids, id).toContain(id)
      }
    })
  })

  describe('office route namespace (#207)', () => {
    it('civil-registry Office link points at /offices/civil-registry', () => {
      const civil = getOfficeBySlug('civil-registry')
      expect(civil).toBeDefined()
      expect(civil!.link).toBe('/offices/civil-registry')
    })

    it('civil-registry Office has no slug alias field', () => {
      const civil = getOfficeBySlug('civil-registry')
      expect(civil).toBeDefined()
      expect('slug' in civil!).toBe(false)
    })

    it('getOfficeBySlug resolves by id on the /offices/<id> route', () => {
      // The /offices/[slug].vue page passes route.params.slug (= office.id).
      const office = getOfficeBySlug('civil-registry')
      expect(office).toBeDefined()
      expect(office!.name).toBe('City Civil Registry')
    })

    it('legacy slug city-civil-registry no longer resolves to an Office', () => {
      // 301 redirect in nuxt.config handles the URL continuity;
      // the accessor must NOT match legacy slugs after #207.
      expect(getOfficeBySlug('city-civil-registry')).toBeUndefined()
    })

    it('civil-registry is the only Office carrying a detail block (#216)', () => {
      // The /service-details/<id> office fallback only ever resolved an Office
      // that has a detail block. Guards the #216 invariant: a single 301
      // (/service-details/civil-registry → /offices/civil-registry) is
      // sufficient for NO /service-details/* URL to resolve an Office.
      const officesWithDetail = getOffices()
        .filter(office => office.detail)
        .map(office => office.id)
      expect(officesWithDetail).toEqual(['civil-registry'])
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

    it('rejects two Offices sharing an abbreviation', () => {
      const services = { services: [makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      const base = {
        groupId: 'frontline-services',
        icon: 'bi-building',
        description: 'd',
        link: '/x',
        abbreviation: 'CAO',
      }
      const offices = makeOffices({
        offices: [
          { ...base, id: 'city-assessor', name: 'City Assessor\'s Office' },
          { ...base, id: 'city-agriculture', name: 'City Agriculture Office' },
        ],
      })
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

  describe('department heads (#199, ADR-0003)', () => {
    const officials = getOfficialsConfig()

    it('holds people only — the duplicated departments[] surface is gone', () => {
      expect((officials as unknown as Record<string, unknown>).departments).toBeUndefined()
      expect(officials.departmentHeads.length).toBeGreaterThan(0)
    })

    it('carries no copy of Office identity, description or contact', () => {
      // The drift #199 exists to kill: these fields have exactly one home now.
      for (const head of getDepartmentHeads()) {
        expect(head).not.toHaveProperty('department')
        expect(head).not.toHaveProperty('description')
        expect(head).not.toHaveProperty('phone')
        expect(head).not.toHaveProperty('icon')
        expect(head).not.toHaveProperty('abbreviation')
        // The retired Office -> one Category link (departments[].services).
        expect(head).not.toHaveProperty('services')
      }
    })

    it('links every head to a real Office', () => {
      const officeIds = new Set(getOfficesConfig().offices.map(office => office.id))
      for (const head of getDepartmentHeads()) {
        expect(head.position).toBe('department_head')
        expect(head.officeId).toBeDefined()
        expect(officeIds.has(head.officeId!)).toBe(true)
      }
    })

    it('resolves a head by Office id', () => {
      expect(getOfficeHead('civil-registry')?.name).toBe('Atty. Billy James G. Ramos')
      expect(getOfficeHead('ghost-office')).toBeUndefined()
    })

    it('pairs each visible headed Office with its head, hidden Offices excluded', () => {
      const pairs = getOfficesWithHeads()
      expect(pairs.length).toBeGreaterThan(0)
      expect(pairs.every(({ head, office }) => head.officeId === office.id)).toBe(true)
      // human-resource-management is hidden but still has a head recorded.
      expect(getOfficeHead('human-resource-management')).toBeDefined()
      expect(pairs.some(({ office }) => office.id === 'human-resource-management')).toBe(false)
    })

    it('sources the card fields from the Office, not the head', () => {
      const entry = getOfficesWithHeads().find(({ office }) => office.id === 'civil-registry')
      expect(entry?.office.name).toBe('City Civil Registry')
      expect(entry?.office.abbreviation).toBe('CCR')
      expect(entry?.office.phone).toBe('(02) 8253-4370')
    })

    it('groups headed Offices, and returns none for an unknown group', () => {
      expect(getOfficesWithHeadsByGroup('frontline-services').length).toBeGreaterThan(0)
      expect(getOfficesWithHeadsByGroup('ghost-group')).toEqual([])
    })
  })

  describe('officials config validator (#199, ADR-0003)', () => {
    function makeArgs(officials: Record<string, unknown>) {
      const services = { services: [] }
      const categories = { categories: [] }
      const offices = {
        officeGroups: [{ id: 'frontline-services', name: 'Frontline', description: 'd' }],
        offices: [{
          id: 'civil-registry',
          name: 'City Civil Registry',
          groupId: 'frontline-services',
          icon: 'bi-building',
          description: 'd',
          link: '/offices/civil-registry',
        }],
      }
      return [services, categories, offices, undefined, officials]
    }

    it('accepts a head that references a known Office', () => {
      const officials = {
        executive: [{ id: 'mayor' }],
        legislative: [],
        departmentHeads: [{ id: 'head-civil-registry', officeId: 'civil-registry' }],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(true)
    })

    it('rejects a head referencing an unknown Office', () => {
      const officials = {
        executive: [],
        legislative: [],
        departmentHeads: [{ id: 'head-ghost', officeId: 'ghost-office' }],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(false)
    })

    it('rejects a head with no officeId', () => {
      const officials = {
        executive: [],
        legislative: [],
        departmentHeads: [{ id: 'head-orphan' }],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(false)
    })

    it('rejects two heads for the same Office', () => {
      const officials = {
        executive: [],
        legislative: [],
        departmentHeads: [
          { id: 'head-a', officeId: 'civil-registry' },
          { id: 'head-b', officeId: 'civil-registry' },
        ],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(false)
    })

    it('rejects duplicate official ids across the people arrays', () => {
      const officials = {
        executive: [{ id: 'mayor' }],
        legislative: [{ id: 'mayor' }],
        departmentHeads: [],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(false)
    })

    it('rejects a resurrected departments[] block', () => {
      const officials = {
        executive: [],
        legislative: [],
        departmentHeads: [],
        departments: [{ id: 'civil-registry', department: 'City Civil Registry' }],
      }
      expect(validateConsistency(...makeArgs(officials))).toBe(false)
    })
  })

  describe('agencies config validator (#198, ADR-0004)', () => {
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

    function makeAgencies(over = {}) {
      return {
        agencies: [{
          id: 'pnp-laspinas',
          name: 'Las Piñas City Police Station',
          icon: 'bi-shield-check',
          description: 'd',
        }],
        ...over,
      }
    }

    it('rejects duplicate agency ids', () => {
      const services = { services: [makeService()] }
      const categories = { categories: [{ id: 'certificates' }] }
      const agency = { id: 'pnp-laspinas', name: 'PNP', icon: 'bi', description: 'd' }
      const agencies = makeAgencies({ agencies: [agency, agency] })
      expect(validateConsistency(services, categories, undefined, agencies)).toBe(false)
    })

    it('rejects a Service whose providedByAgency references an unknown Agency', () => {
      const services = { services: [makeService({ providedByAgency: 'ghost-agency' })] }
      const categories = { categories: [{ id: 'certificates' }] }
      const agencies = makeAgencies()
      expect(validateConsistency(services, categories, undefined, agencies)).toBe(false)
    })

    it('accepts a Service whose providedByAgency resolves to a known Agency', () => {
      const services = { services: [makeService({ providedByAgency: 'pnp-laspinas' })] }
      const categories = { categories: [{ id: 'certificates' }] }
      const agencies = makeAgencies()
      expect(validateConsistency(services, categories, undefined, agencies)).toBe(true)
    })

    it('accepts a Service with providedByBarangay and no other tier', () => {
      const services = { services: [makeService({ providedByBarangay: true })] }
      const categories = { categories: [{ id: 'certificates' }] }
      expect(validateConsistency(services, categories)).toBe(true)
    })

    it('rejects a Service that sets both providedBy and providedByAgency', () => {
      const services = {
        services: [makeService({ providedBy: 'civil-registry', providedByAgency: 'pnp-laspinas' })],
      }
      const categories = { categories: [{ id: 'certificates' }] }
      const offices = {
        officeGroups: [{ id: 'frontline-services', name: 'F', description: 'd' }],
        offices: [{
          id: 'civil-registry',
          name: 'City Civil Registry',
          groupId: 'frontline-services',
          icon: 'bi',
          description: 'd',
          link: '/x',
        }],
      }
      const agencies = makeAgencies()
      expect(validateConsistency(services, categories, offices, agencies)).toBe(false)
    })

    it('rejects a Service that sets both providedByAgency and providedByBarangay', () => {
      const services = {
        services: [makeService({ providedByAgency: 'pnp-laspinas', providedByBarangay: true })],
      }
      const categories = { categories: [{ id: 'certificates' }] }
      const agencies = makeAgencies()
      expect(validateConsistency(services, categories, undefined, agencies)).toBe(false)
    })
  })

  // Pin the contract the pages rely on — every page resolves purely through the
  // canonical configHelper accessors. Mirrors the exact resolution paths in
  // `[category].vue` and `[slug].vue`.
  describe('canonical-only resolution (#189)', () => {
    it('every visible Category resolves through getCategoryBySlug (category page path)', () => {
      const categories = getServiceCategories()
      expect(categories.length).toBeGreaterThan(0)
      for (const category of categories) {
        // `[category].vue` gates on isCanonicalCategory then reads the accessor.
        expect(isCanonicalCategory(category.id), category.id).toBe(true)
        expect(getCategoryBySlug(category.id), category.id).toBeDefined()
      }
    })

    it('every detail-bearing Service resolves its detail via getServiceBySlug (detail page path)', () => {
      const detailServices = getAllServices().filter(s => s.detail)
      expect(detailServices.length).toBeGreaterThan(0)
      for (const service of detailServices) {
        // `[slug].vue`: canonical Service detail is the first resolution branch.
        const resolved = getServiceBySlug(service.id)
        expect(resolved?.detail, service.id).toBeDefined()
        expect(service.url, service.id).toBe(`/service-details/${service.id}`)
      }
    })

    it('every /service-details slug resolves from the canonical Service source only', () => {
      // After ADR-0002 the page resolves Service detail only — the office
      // fallback is dropped (the legacy office URL is redirected by a 301).
      const detailSlugs = getAllServices()
        .filter(s => s.detail)
        .map(s => s.id)
      for (const slug of detailSlugs) {
        expect(Boolean(getServiceBySlug(slug)?.detail), slug).toBe(true)
      }
    })
  })

  // The /barangays page (#198, ADR-0004) and government/index.vue's
  // Subdivisions section both read the directory through this one accessor,
  // so they can never drift.
  describe('barangay directory data (/barangays, #198)', () => {
    it('getSubdivisionsConfig exposes all 20 Barangays with count in sync', () => {
      const subdivisions = getSubdivisionsConfig()
      expect(subdivisions.count).toBe(20)
      expect(subdivisions.items).toHaveLength(subdivisions.count)
    })

    it('every Barangay item carries an id, name, and leader', () => {
      const subdivisions = getSubdivisionsConfig()
      for (const item of subdivisions.items) {
        expect(item.id, item.id).toBeTruthy()
        expect(item.name, item.id).toBeTruthy()
        expect(item.leader, item.id).toBeTruthy()
      }
    })
  })
})
