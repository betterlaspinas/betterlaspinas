// @vitest-environment nuxt
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { computed } from 'vue'
import {
  configHelpers,
  getLGUTypeLabels,
  getOfficeHead,
  getOfficesWithHeads,
  getOfficialsConfig,
  getSubdivisionsConfig,
} from '@/utils/configHelper'
import GovernmentPage from './index.vue'

// useConfig reads the env-overridable site config off useRuntimeConfig, which
// is empty under the test runtime. Stub it with the real static configs so the
// page renders; the section under test reads the Office accessors directly, so
// it stays unmocked.
mockNuxtImport('useConfig', () => () => ({
  lguName: computed(() => 'Las Piñas'),
  labels: computed(() => getLGUTypeLabels('City')),
  officials: getOfficialsConfig(),
  subdivisions: getSubdivisionsConfig(),
  formatPhoneLink: configHelpers.formatPhoneLink,
}))

mockNuxtImport('usePageOgImage', () => () => undefined)

// #199 / ADR-0003: the "Key Offices" section renders the canonical Office
// joined to its head Official through the accessor layer. These assertions are
// what stops officials.json from growing a second copy of office
// identity/contact again.
//
// The head's name is deliberately withheld pending verification, so the join is
// asserted structurally (which Offices appear) plus an explicit assertion that
// no head name leaks into the markup.
describe('government page — Key Offices', () => {
  async function render() {
    const wrapper = await mountSuspended(GovernmentPage)
    return wrapper.text()
  }

  it('renders every visible headed Office', async () => {
    const text = await render()
    const pairs = getOfficesWithHeads()

    expect(pairs.length).toBeGreaterThan(0)
    for (const { office } of pairs)
      expect(text).toContain(office.name)
  })

  it('does not publish any head name while the incumbents are unverified', async () => {
    const text = await render()
    const pairs = getOfficesWithHeads()

    expect(pairs.length).toBeGreaterThan(0)
    for (const { head } of pairs)
      expect(text).not.toContain(head.name)
  })

  it('renders Office contact and abbreviation, not a duplicated copy', async () => {
    const text = await render()
    const entry = getOfficesWithHeads().find(({ office }) => office.id === 'civil-registry')

    expect(entry).toBeDefined()
    expect(text).toContain(entry!.office.phone!)
    expect(text).toContain(entry!.office.abbreviation!)
    expect(text).toContain(entry!.office.description)
  })

  it('omits hidden Offices even when a head is recorded for them', async () => {
    const text = await render()

    // The head exists in officials.json but the Office is hidden, so neither
    // the Office nor the pair may reach the page.
    expect(getOfficeHead('human-resource-management')).toBeDefined()
    expect(getOfficesWithHeads().some(({ office }) => office.id === 'human-resource-management')).toBe(false)
    expect(text).not.toContain('Human Resource Management')
  })

  it('never links to the retired /service-details office namespace', async () => {
    const wrapper = await mountSuspended(GovernmentPage)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href') ?? '')

    expect(hrefs.some(href => href.startsWith('/service-details/'))).toBe(false)
  })

  it('renders a clickable Facebook link for every Office that has one', async () => {
    const wrapper = await mountSuspended(GovernmentPage)
    const withFacebook = getOfficesWithHeads().filter(({ office }) => office.facebook)

    expect(withFacebook.length).toBeGreaterThan(0)
    for (const { office } of withFacebook) {
      const link = wrapper.findAll('a').find(a => a.attributes('href') === office.facebook)

      expect(link, `no Facebook link rendered for ${office.id}`).toBeDefined()
      expect(link!.attributes('rel')).toContain('noopener')
      expect(link!.attributes('target')).toBe('_blank')
    }
  })

  // The card used to be the anchor. Nesting the Facebook link inside it would
  // be invalid HTML that browsers silently un-nest, so the CTA is the anchor
  // and stretches over the card instead.
  it('never nests one anchor inside another', async () => {
    const wrapper = await mountSuspended(GovernmentPage)

    for (const anchor of wrapper.findAll('a'))
      expect(anchor.element.querySelector('a')).toBeNull()
  })

  it('links an Office only when it has a detail page', async () => {
    const wrapper = await mountSuspended(GovernmentPage)
    const hrefs = new Set(wrapper.findAll('a').map(a => a.attributes('href') ?? ''))

    for (const { office } of getOfficesWithHeads()) {
      if (office.detail)
        expect(hrefs.has(office.link)).toBe(true)
      else
        expect(hrefs.has(office.link)).toBe(false)
    }
  })
})
