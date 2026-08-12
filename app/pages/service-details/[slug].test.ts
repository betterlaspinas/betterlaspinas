// @vitest-environment nuxt
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import ServiceDetailsPage from './[slug].vue'

// mockNuxtImport hoists its factory above the file's own declarations, so the
// route param it returns has to live in a `vi.hoisted` cell rather than a
// plain closed-over variable (mirrors app/pages/agencies/[slug].test.ts).
const routeParams = vi.hoisted(() => ({ slug: 'police-clearance' }))
mockNuxtImport('useRoute', () => () => ({
  params: routeParams,
  path: `/service-details/${routeParams.slug}`,
  query: {},
  meta: {},
  matched: [],
}))

mockNuxtImport('usePageOgImage', () => () => undefined)

// `createError({ fatal: true })` on the 404 guard: under `mountSuspended`
// this component's tree resolves through Suspense differently than the
// simpler Agency/Office detail pages do (their `[slug].test.ts` files assert
// `rejects.toThrow()` on the same `createError({ fatal: true })` guard
// pattern successfully) — here the fatal error is swallowed internally and
// the mount resolves with an empty render instead of rejecting. Asserting on
// the guard's own call, rather than on Suspense's rejection behavior, keeps
// this test meaningful without depending on that Suspense/fatal interaction.
mockNuxtImport('createError', () => (input: { statusCode: number, statusMessage: string }) => {
  throw new Error(`createError: ${input.statusCode} ${input.statusMessage}`)
})

// #299: National Police Clearance rename + relocated issuance + first
// service-details page for this record. `police-clearance` sets
// `providedByAgency` (ADR-0004), not `providedBy`, so the Office Information
// card single-sources off the Service's own inline `detail.office` — this is
// the one Service record that exercises that fallback path end to end.
describe('service details page — National Police Clearance (#299)', () => {
  it('renders the renamed identity and description', async () => {
    routeParams.slug = 'police-clearance'
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('Issuance of National Police Clearance')
    expect(text).toContain('National Police Clearance')
  })

  it('renders the process steps transcribed from the official application guide', async () => {
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('Register Online')
    expect(text).toContain('Complete Profile & Set Appointment')
    expect(text).toContain('Settle Online Payment')
    expect(text).toContain('Appear at the Police Station')
  })

  it('renders the documentary requirements', async () => {
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('One (1) valid government-issued ID')
    expect(text).toContain('National Police Clearance appointment reference number')
  })

  it('renders the FAQs, including the issuance-relocation answer', async () => {
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('Where is the National Police Clearance issued in Las Piñas City?')
  })

  // Agency-provided (providedByAgency: pnp-laspinas), not Office-provided, so
  // the Office Information card must come from the Service's own
  // detail.office (the Lingkod Pinoy Center issuance site) — never from
  // pnp-laspinas's own Agency record, which stays untouched at its City Hall
  // headquarters address.
  it('renders the Lingkod Pinoy Center issuance office, not the PNP Agency headquarters', async () => {
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('Lingkod Pinoy Center')
    expect(text).toContain('Robinsons Place')
    expect(text).not.toContain('City Hall Compound')
  })

  // ADR-0005 provenance: both sources are cited by name, and since each
  // carries a `verifiedOn`, the "Checked against all sources" summary line
  // renders too.
  it('cites both sources with UiDataSourceStatus provenance', async () => {
    const wrapper = await mountSuspended(ServiceDetailsPage)
    const text = wrapper.text()

    expect(text).toContain('Philippine National Police — How to Apply for a National Police Clearance (Official Guide)')
    expect(text).toContain('PNP Las Piñas City Police Station — Official Facebook Page')
    expect(text).toContain('Checked')
  })

  it('calls the 404 guard for an unknown Service slug', async () => {
    routeParams.slug = 'not-a-real-service'
    await expect(mountSuspended(ServiceDetailsPage)).rejects.toThrow('404')
  })
})
