import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DataSourceStatus from './DataSourceStatus.vue'

// Three states, independent of one another (#243, ADR-0005): `sources` (where
// the data came from) and `verifiedOn` (whether we re-checked it) are
// different facts, so the citation must render whenever `sources` is
// non-empty — never gated behind verification.
describe('dataSourceStatus', () => {
  it('row 1 — no sources: names the documentation backlog, not the data, and keeps a confirm action', () => {
    const wrapper = mount(DataSourceStatus, {
      props: { sources: [], verifiedOn: null, checkedOn: '', subject: 'office' },
    })

    const text = wrapper.text()
    expect(text).toContain('We\'re still documenting where this office\'s details came from')
    expect(text).toContain('Confirm with the office before relying on them')
    // No citation list and no verified/unverified document copy in this state.
    expect(wrapper.findAll('li').length).toBe(0)
    expect(text).not.toContain('Matched to')
    expect(text).not.toContain('Checked against source')
  })

  it('row 1 on the service page swaps the subject but keeps "the office" as the confirm target', () => {
    const wrapper = mount(DataSourceStatus, {
      props: { sources: [], verifiedOn: null, checkedOn: '', subject: 'service' },
    })

    const text = wrapper.text()
    expect(text).toContain('We\'re still documenting where this service\'s details came from')
    expect(text).toContain('Confirm with the office before relying on them')
  })

  it('row 2 — sources but no verifiedOn: renders the citation and says it has not been re-checked', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [{ name: 'Citizen\'s Charter 2022 (1st Edition)' }],
        verifiedOn: null,
        checkedOn: '',
        subject: 'office',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Citizen\'s Charter 2022 (1st Edition)')
    expect(text).toContain('Matched to this document after the fact')
    expect(text).toContain('Not yet confirmed against the original')
    expect(text).not.toContain('Checked against source')
    expect(text).not.toContain('still documenting')
  })

  it('row 2 pluralises when there is more than one source', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [
          { name: 'Citizen\'s Charter 2022 (1st Edition)' },
          { name: 'Key Officials Contact Information and Directory' },
        ],
        verifiedOn: null,
        checkedOn: '',
        subject: 'office',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Matched to these documents after the fact')
    expect(text).toContain('Not yet confirmed against the original')
  })

  it('row 3 — verifiedOn set: renders the citation and the checked-on date', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [{ name: 'Citizen\'s Charter 2022 (1st Edition)', verifiedOn: '2026-07-14' }],
        verifiedOn: '2026-07-14',
        checkedOn: '14 Jul 2026',
        subject: 'office',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Citizen\'s Charter 2022 (1st Edition)')
    expect(text).toContain('Checked against source 14 Jul 2026')
    expect(text).not.toContain('Matched to')
    expect(text).not.toContain('still documenting')
  })

  it('links a source only when it carries a url; an absent link never downgrades the row (#238)', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [
          { name: 'Online Charter', url: 'https://example.gov.ph/charter.pdf' },
          { name: 'Tarpaulin at the office window' },
        ],
        verifiedOn: null,
        checkedOn: '',
        subject: 'office',
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://example.gov.ph/charter.pdf')
    expect(wrapper.text()).toContain('Tarpaulin at the office window')
    expect(wrapper.findAll('a').length).toBe(1)
  })
})
