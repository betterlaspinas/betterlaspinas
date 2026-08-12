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

  it('returns undefined for routes with no Agency/Office slug override', () => {
    expect(resolveSlugDisplayName('service-details-slug', { slug: 'birth-certificate' })).toBeUndefined()
  })

  it('returns undefined when the route has no slug param', () => {
    expect(resolveSlugDisplayName('agencies-slug', {})).toBeUndefined()
  })

  it('handles an array-form slug param (matches the array-join guard used elsewhere in the middleware)', () => {
    expect(resolveSlugDisplayName('agencies-slug', { slug: ['pnp-laspinas'] })).toBe(
      'Las Piñas City Police Station',
    )
  })
})
