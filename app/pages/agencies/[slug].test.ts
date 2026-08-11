// @vitest-environment nuxt
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { getAgencyById } from '@/utils/configHelper'
import AgencyPage from './[slug].vue'

// #272: the Agency detail page mirrors the Office detail page (#207) — a
// thin renderer over the `agencyView` facade (ADR-0002). These assertions
// cover the rendered page itself; the shaping logic (`toAgencyView`,
// `agencyView`) is covered separately in `utils/pageViews.test.ts`.
mockNuxtImport('usePageOgImage', () => () => undefined)

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
    const agency = getAgencyById('pnp-laspinas')!

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
    const agency = getAgencyById('pnp-laspinas')!

    for (const source of agency.sources ?? [])
      expect(text).toContain(source.name)
    expect(text).toContain('Checked')
  })

  it('throws a 404 for an unknown Agency slug', async () => {
    routeParams.slug = 'not-a-real-agency'
    await expect(mountSuspended(AgencyPage)).rejects.toThrow()
  })
})
