import { describe, expect, it } from 'vitest'
import { getMergedSiteConfig, getSiteConfig } from './configHelper'

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
})
