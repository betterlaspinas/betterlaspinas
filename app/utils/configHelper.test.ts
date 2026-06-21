import { describe, expect, it } from 'vitest'
import { validateAgainstSchema, validateConsistency } from '../../scripts/validate-config.mjs'
import {
  getAllServices,
  getCategoryBySlug,
  getMergedSiteConfig,
  getOgImageConfig,
  getOgImageRouteConfig,
  getServiceBySlug,
  getServiceCategories,
  getServicesByCategory,
  getSiteConfig,
} from './configHelper'

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

    it('getCategoryBySlug returns a category with offices', () => {
      const cert = getCategoryBySlug('certificates')
      expect(cert).toBeDefined()
      expect(cert!.name).toBe('Certificates & Vital Records')
      const visibleOffices = (cert!.offices ?? []).filter(o => !o.hidden)
      expect(visibleOffices.find(o => o.title === 'City Civil Registry')).toBeDefined()
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
})
