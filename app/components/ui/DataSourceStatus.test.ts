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
    expect(text).not.toContain('Sourced from')
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
    expect(text).toContain('Sourced from this document. No check recorded yet.')
    expect(text).not.toContain('Checked against source')
    expect(text).not.toContain('still documenting')
  })

  it('row 2 pluralises when there is more than one source, none verified', () => {
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
    expect(text).toContain('Sourced from these documents. No check recorded yet.')
    // Nothing to distinguish when every source shares the same unverified
    // state, so no per-source status line is rendered — the summary above
    // is the only occurrence of the phrase.
    expect(text.match(/No check recorded yet/g)).toHaveLength(1)
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
    expect(text).not.toContain('Sourced from')
    expect(text).not.toContain('still documenting')
  })

  // Multi-source: `verifiedOn`/`checkedOn` on the record are only the most
  // recent across sources (useDataSources), so the summary line alone can't
  // be trusted to represent every entry — each source's own status has to be
  // visible in the list itself (#243 follow-up).
  it('multi-source, all verified (2 sources): every entry shows its own checked date, and the summary asserts the check without naming a date', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [
          { name: 'Key Officials Contact Information and Directory', verifiedOn: '2026-07-14', covers: ['phone'] },
          { name: 'Official Facebook Page', verifiedOn: '2026-06-01', covers: ['location'] },
        ],
        // Record-level verifiedOn/checkedOn are only the most recent across
        // sources — the summary must not print this date, since it would
        // misstate the other source's own (earlier) verifiedOn.
        verifiedOn: '2026-07-14',
        checkedOn: '14 Jul 2026',
        subject: 'office',
      },
    })

    const text = wrapper.text()
    expect(text.match(/Checked 14 Jul 2026\./g)).toHaveLength(1)
    expect(text.match(/Checked 1 Jun 2026\./g)).toHaveLength(1)
    expect(text).toContain('Checked against all sources.')
    expect(text).not.toContain('Sourced from these documents.')
    expect(text).not.toContain('No check recorded yet')
    // Singular phrasing must not leak into the multi-source summary.
    expect(text).not.toContain('Checked against source 14 Jul 2026.')
    // The summary must not assert a specific date — only the per-entry lines do.
    expect(text).not.toContain('Checked against all sources 14 Jul 2026.')
  })

  it('multi-source, all verified (3 sources): the summary wording still reads naturally', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [
          { name: 'Citizen\'s Charter 2022 (1st Edition)', verifiedOn: '2026-07-14' },
          { name: 'Key Officials Contact Information and Directory', verifiedOn: '2026-07-14' },
          { name: 'Official Facebook Page', verifiedOn: '2026-07-14' },
        ],
        verifiedOn: '2026-07-14',
        checkedOn: '14 Jul 2026',
        subject: 'office',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Checked against all sources.')
    expect(text).not.toContain('Sourced from these documents.')
    expect(text).not.toContain('No check recorded yet')
  })

  it('multi-source, none verified: no per-entry line since there is nothing to distinguish', () => {
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
    expect(text).toContain('Sourced from these documents. No check recorded yet.')
    expect(text.match(/No check recorded yet/g)).toHaveLength(1)
    expect(text).not.toContain('Checked')
  })

  it('multi-source, mixed: the checked entry and the unchecked entry are each labelled, and the summary asserts neither', () => {
    const wrapper = mount(DataSourceStatus, {
      props: {
        sources: [
          { name: 'Citizen\'s Charter 2022 (1st Edition)', verifiedOn: '2026-07-14' },
          { name: 'Key Officials Contact Information and Directory' },
        ],
        // Record-level verifiedOn/checkedOn are the max across sources — present
        // here even though the second source has never been checked, which is
        // exactly the case this component must not misrepresent.
        verifiedOn: '2026-07-14',
        checkedOn: '14 Jul 2026',
        subject: 'office',
      },
    })

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[0]!.text()).toContain('Checked 14 Jul 2026.')
    expect(items[1]!.text()).toContain('No check recorded yet.')

    const text = wrapper.text()
    // The summary line must not claim every source was checked, nor that
    // none were.
    expect(text).not.toContain('Checked against source 14 Jul 2026.')
    expect(text.match(/No check recorded yet/g)).toHaveLength(1)
    expect(text).toContain('Sourced from these documents.')
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
