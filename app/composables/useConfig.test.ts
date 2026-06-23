// @vitest-environment nuxt
import { describe, expect, it } from 'vitest'
import { useConfig } from './useConfig'

// useConfig is the canonical config accessor that replaced useSiteConfig (#184).
// Site-derived values are reactive refs; static content blocks are plain objects.
// These assertions exercise the real merged config (no mocks) and check the
// externally consumed shape, not implementation details.
describe('useConfig', () => {
  it('exposes the merged site config as a reactive ref', () => {
    const { site } = useConfig()
    expect(site.value).toBeDefined()
    expect(site.value.lguType).toBeDefined()
    expect(site.value.tagline).toBeDefined()
  })

  it('derives the LGU name and type labels', () => {
    const { lguName, labels } = useConfig()
    expect(lguName.value).toBeTruthy()
    expect(labels.value.lguTypeLabel).toBeTruthy()
  })

  it('exposes contact information', () => {
    const { site } = useConfig()
    expect(site.value.contact.address).toBeDefined()
    expect(site.value.contact.phone).toBeDefined()
    expect(site.value.contact.email).toBeDefined()
  })

  it('exposes social media links', () => {
    const { site } = useConfig()
    expect(site.value.social.facebook).toBeDefined()
    expect(site.value.social.twitter).toBeDefined()
  })

  it('exposes officials grouped by branch', () => {
    const { officials } = useConfig()
    expect(Array.isArray(officials.executive)).toBe(true)
    expect(Array.isArray(officials.legislative)).toBe(true)
  })

  it('exposes service categories', () => {
    const { categories } = useConfig()
    expect(Array.isArray(categories.categories)).toBe(true)
    expect(categories.categories.length).toBeGreaterThan(0)
  })

  it('exposes emergency hotlines', () => {
    const { hotlines } = useConfig()
    expect(Array.isArray(hotlines.emergency)).toBe(true)
  })

  it('exposes population statistics', () => {
    const { statistics } = useConfig()
    expect(statistics.population).toBeDefined()
  })

  it('exposes the history timeline', () => {
    const { history } = useConfig()
    expect(Array.isArray(history.timeline)).toBe(true)
  })

  it('exposes tourism attractions and categories', () => {
    const { tourism } = useConfig()
    expect(Array.isArray(tourism.attractions)).toBe(true)
    expect(Array.isArray(tourism.categories)).toBe(true)
  })

  it('exposes translation overrides', () => {
    const { translations } = useConfig()
    expect(translations).toBeDefined()
  })

  it('exposes UI labels', () => {
    const { labels } = useConfig()
    expect(labels.value).toBeDefined()
  })
})
