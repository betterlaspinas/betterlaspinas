import { describe, expect, it } from 'vitest'
import { resolveSlugDisplayName } from './seo.global'

// Regression coverage for the SEO title/description mangling reported on
// PR #295: the middleware's generic param loop ran every route param
// through `slugToTitleCase`, so `/agencies/pnp-laspinas` produced the title
// "Pnp Laspinas | National Agency" instead of the Agency's real name. The
// <h1> already rendered `agency.name` correctly — only the meta title and
// description (both built from the same `{{slug}}` template var) were wrong.
//
// `resolveSlugDisplayName` is the fix: it resolves the real record name via
// the canonical configHelper accessors (getAgencyById / getOfficeBySlug —
// never a direct JSON import) so the SEO middleware can override the
// title-cased slug before interpolation.
describe('resolveSlugDisplayName (#295)', () => {
  it('resolves the real Agency name for agencies-slug, not a title-cased slug', () => {
    expect(resolveSlugDisplayName('agencies-slug', { slug: 'pnp-laspinas' })).toBe(
      'Las Piñas City Police Station',
    )
  })

  it('resolves the real Office name for offices-slug, not a title-cased slug', () => {
    // "civil-registry" title-cases to a plausible-looking "Civil Registry",
    // which is why this class of defect stayed hidden — the real name is
    // "City Civil Registry".
    expect(resolveSlugDisplayName('offices-slug', { slug: 'civil-registry' })).toBe(
      'City Civil Registry',
    )
  })

  it('catches the acronym case where title-casing the id is obviously wrong', () => {
    // cdrrmo -> "City Disaster Risk Reduction & Management Office", never
    // the title-cased id "Cdrrmo".
    expect(resolveSlugDisplayName('offices-slug', { slug: 'cdrrmo' })).toBe(
      'City Disaster Risk Reduction & Management Office',
    )
  })

  it('returns undefined for an unknown Agency/Office slug, leaving the generic fallback in place', () => {
    expect(resolveSlugDisplayName('agencies-slug', { slug: 'not-a-real-agency' })).toBeUndefined()
    expect(resolveSlugDisplayName('offices-slug', { slug: 'not-a-real-office' })).toBeUndefined()
  })

  it('returns undefined for routes with a slug but no display-name override', () => {
    expect(resolveSlugDisplayName('services-category', { slug: 'health' })).toBeUndefined()
  })

  it('returns undefined when the route has no slug param', () => {
    expect(resolveSlugDisplayName('agencies-slug', {})).toBeUndefined()
  })

  it('resolves the real Service title for service-details-slug (#298)', () => {
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'ctc-business-license' })).toBe(
      'Certified True Copy of Business License and Mayor\'s Permit',
    )
    // Acronym: the title-cased slug renders "Barangay Id", the record is "Barangay ID".
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'barangay-id' })).toBe(
      'Barangay ID',
    )
    // Slug that is not name-derived at all.
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'police-clearance' })).toBe(
      'National Police Clearance',
    )
  })

  it('keeps Services under a hidden Category out of the SEO override (#298)', () => {
    // `pwd-id` and `cswdo-services` belong to the hidden `social-services`
    // Category, so `getServiceBySlug` (hidden-aware) returns undefined — these
    // pages 404 and must not gain a title. Same rule as the Agency/Office path.
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'pwd-id' })).toBeUndefined()
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'cswdo-services' })).toBeUndefined()
  })

  it('resolves the real News headline for news-slug (#298 parity)', () => {
    expect(resolveSlugDisplayName('news-slug', { slug: 'business-permit-renewal-2025' })).toBe(
      'Business Permit Renewal 2025',
    )
  })

  it('returns undefined for unknown service and news slugs', () => {
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'not-a-real-service' })).toBeUndefined()
    expect(resolveSlugDisplayName('news-slug', { slug: 'not-a-real-news' })).toBeUndefined()
  })

  it('handles an array-form slug param (matches the array-join guard used elsewhere in the middleware)', () => {
    expect(resolveSlugDisplayName('agencies-slug', { slug: ['pnp-laspinas'] })).toBe(
      'Las Piñas City Police Station',
    )
  })
})
