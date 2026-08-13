// @vitest-environment nuxt
import type { Agency } from '@/types/config'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import AgencyPage from './[slug].vue'

// `mockNuxtImport` below replaces the `getAgencyById` export at the module
// level, so a normal `import { getAgencyById } from '@/utils/configHelper'`
// in this file would resolve to the SAME mock (self-recursion). Get the
// un-mocked implementation via `vi.importActual` instead, for both the
// mock's delegation and this file's own assertions against real data.
const { getAgencyById: getRealAgencyById } = await vi.importActual<typeof import('@/utils/configHelper')>('@/utils/configHelper')

// #272: the Agency detail page mirrors the Office detail page (#207) — a
// thin renderer over the `agencyView` facade (ADR-0002). These assertions
// cover the rendered page itself; the shaping logic (`toAgencyView`,
// `agencyView`) is covered separately in `utils/pageViews.test.ts`.
mockNuxtImport('usePageOgImage', () => () => undefined)

// Synthetic fixture with no `facebook` field, for the "row is absent" case
// (#295) — `pnp-laspinas` is currently the only real Agency record and now
// carries one, so there is no real fixture to exercise the missing-field
// path.
const noFacebookAgency: Agency = {
  id: 'agency-without-social',
  name: 'Test Fixture Agency',
  icon: 'bi-flag',
  description: 'Synthetic fixture agency carrying no social-media field.',
  location: '123 Test St, Las Piñas',
  phone: '(02) 8000-0000',
}

// Auto-imported `getAgencyById` (used inside `agencyView`, per pageViews.ts)
// is patched to add the synthetic fixture above, delegating every other id
// to the real accessor — so `pnp-laspinas` and the 404 case are unaffected.
mockNuxtImport('getAgencyById', () => (id: string) => {
  if (id === noFacebookAgency.id)
    return noFacebookAgency
  return getRealAgencyById(id)
})

// mockNuxtImport hoists its factory above the file's own declarations, so the
// route param it returns has to live in a `vi.hoisted` cell rather than a
// plain closed-over variable.
const routeParams = vi.hoisted(() => ({ slug: 'pnp-laspinas' }))
mockNuxtImport('useRoute', () => () => ({
  params: routeParams,
  path: `/agencies/${routeParams.slug}`,
  query: {},
  meta: {},
  matched: [],
}))

describe('agency detail page', () => {
  it('renders the identity, contact, and location of a live Agency', async () => {
    routeParams.slug = 'pnp-laspinas'
    const wrapper = await mountSuspended(AgencyPage)
    const text = wrapper.text()
    const agency = getRealAgencyById('pnp-laspinas')!

    expect(text).toContain(agency.name)
    expect(text).toContain(agency.description)
    expect(text).toContain(agency.phone)
    expect(text).toContain(agency.location)
  })

  // pnp-laspinas is currently the only Agency record with verified sources
  // (#243) — this is the case the ticket calls out explicitly, since today
  // that provenance renders nowhere.
  it('reuses the shared UiDataSourceStatus component to render verified provenance', async () => {
    routeParams.slug = 'pnp-laspinas'
    const wrapper = await mountSuspended(AgencyPage)
    const text = wrapper.text()
    const agency = getRealAgencyById('pnp-laspinas')!

    for (const source of agency.sources ?? [])
      expect(text).toContain(source.name)
    expect(text).toContain('Checked')
  })

  it('throws a 404 for an unknown Agency slug', async () => {
    routeParams.slug = 'not-a-real-agency'
    await expect(mountSuspended(AgencyPage)).rejects.toThrow()
  })

  // #295: the Contact details card's Facebook row, mirroring the Office page's
  // existing facebook row exactly (same field name/type, same rendering).
  it('renders the Agency Facebook page as a real link, not the bare URL, when the field is set', async () => {
    routeParams.slug = 'pnp-laspinas'
    const wrapper = await mountSuspended(AgencyPage)
    const agency = getRealAgencyById('pnp-laspinas')!

    const link = wrapper.find(`a[href="${agency.facebook}"]`)
    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    // Meaningful link text, not a bare URL (a11y).
    expect(link.text()).toBe('Facebook Page')
  })

  it('omits the Facebook row entirely when the Agency has no facebook field', async () => {
    routeParams.slug = noFacebookAgency.id
    const wrapper = await mountSuspended(AgencyPage)
    const text = wrapper.text()

    expect(text).not.toContain('Facebook')
    // The other Contact details field is still there — this isn't the
    // whole-card "no contact details" fallback, just the one missing row.
    expect(text).toContain(noFacebookAgency.phone)
  })

  // #295: an Agency is not a Service, so the breadcrumb and back link must not
  // route through /services — repointed to /government (which now carries the
  // National Agencies section), matching the Office detail page's own crumb
  // shape ("Government" -> /government).
  it('breadcrumbs and links back to /government, not /services', async () => {
    routeParams.slug = 'pnp-laspinas'
    const wrapper = await mountSuspended(AgencyPage)
    const text = wrapper.text()
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href') ?? '')

    expect(text).toContain('Government')
    expect(hrefs).toContain('/government')
    expect(hrefs).not.toContain('/services')
  })

  // #300 follow-up: pnp-laspinas' "Services at this agency" card must link
  // through to the new /service-details/police-clearance page now that the
  // Service carries a `detail` block (toAgencyView links iff `service.detail`
  // is set, per pageViews.ts).
  it('links the "Services at this agency" card to its service-details page when the Service has a detail block', async () => {
    routeParams.slug = 'pnp-laspinas'
    const wrapper = await mountSuspended(AgencyPage)

    const link = wrapper.find('a[href="/service-details/police-clearance"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('National Police Clearance')
  })
})
