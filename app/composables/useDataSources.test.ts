// @vitest-environment nuxt
import { describe, expect, it } from 'vitest'
import { useDataSources } from './useDataSources'

// The render gate is the honesty guarantee (#243, ADR-0005): `pnpm validate`
// deliberately enforces nothing about provenance, so these assertions are the
// only place the rule is pinned. The load-bearing cases are the two that are
// easy to get backwards — an offline source with no URL must still verify, and
// a cited source nobody has checked must not.
describe('useDataSources', () => {
  it('verifies a record whose source has both a name and a check date', () => {
    const { verifiedOn } = useDataSources({
      sources: [{ name: 'Citizen\'s Charter 2022 (1st Edition)', verifiedOn: '2026-07-14' }],
    })

    expect(verifiedOn.value).toBe('2026-07-14')
  })

  it('verifies an offline source with no url — a tarpaulin is not second-class', () => {
    const { verifiedOn } = useDataSources({
      sources: [{ name: 'Civil Registry Citizen\'s Charter, 2024 edition', verifiedOn: '2026-07-14' }],
    })

    expect(verifiedOn.value).toBe('2026-07-14')
  })

  it('does not verify a cited source that was never checked', () => {
    const { verifiedOn } = useDataSources({
      sources: [{ name: 'Citizen\'s Charter 2022 (1st Edition)', url: 'https://example.gov.ph/charter.pdf' }],
    })

    expect(verifiedOn.value).toBeNull()
  })

  it('does not verify a record with no sources at all', () => {
    expect(useDataSources({}).verifiedOn.value).toBeNull()
    expect(useDataSources(undefined).verifiedOn.value).toBeNull()
  })

  it('reports the most recent check across multiple sources', () => {
    const { sources, verifiedOn } = useDataSources({
      sources: [
        { name: 'Citizen\'s Charter 2022 (1st Edition)', published: '2022', verifiedOn: '2026-07-14' },
        { name: 'Key Officials Contact Information and Directory', verifiedOn: '2026-08-02', covers: ['phone'] },
      ],
    })

    expect(sources.value).toHaveLength(2)
    expect(verifiedOn.value).toBe('2026-08-02')
  })

  it('ignores a check date on a source with no name — an unnamed source cannot be checked against', () => {
    const { verifiedOn } = useDataSources({
      sources: [{ name: '', verifiedOn: '2026-07-14' }],
    })

    expect(verifiedOn.value).toBeNull()
  })

  it('formats the check date for display only when verified', () => {
    expect(useDataSources({ sources: [{ name: 'Charter', verifiedOn: '2026-07-14' }] }).checkedOn.value)
      .toBe('14 Jul 2026')
    expect(useDataSources({ sources: [{ name: 'Charter' }] }).checkedOn.value).toBe('')
  })
})
