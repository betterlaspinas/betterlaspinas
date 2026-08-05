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

// #199 / ADR-0003: the "Department Heads & Key Offices" section renders the
// canonical Office joined to its head Official through the accessor layer.
// These assertions are what stops officials.json from growing a second copy of
// office identity/contact again.
describe('government page — Department Heads & Key Offices', () => {
  async function render() {
    const wrapper = await mountSuspended(GovernmentPage)
    return wrapper.text()
  }

  it('renders every visible headed Office with its head', async () => {
    const text = await render()
    const pairs = getOfficesWithHeads()

    expect(pairs.length).toBeGreaterThan(0)
    for (const { office, head } of pairs) {
      expect(text).toContain(office.name)
      expect(text).toContain(head.name)
    }
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
    const hiddenHead = getOfficeHead('human-resource-management')

    expect(hiddenHead).toBeDefined()
    expect(text).not.toContain(hiddenHead!.name)
  })

  it('never links to the retired /service-details office namespace', async () => {
    const wrapper = await mountSuspended(GovernmentPage)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href') ?? '')

    expect(hrefs.some(href => href.startsWith('/service-details/'))).toBe(false)
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
