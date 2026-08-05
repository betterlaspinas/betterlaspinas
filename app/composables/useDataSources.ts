import type { MaybeRefOrGetter } from 'vue'
import type { SourceRef } from '~/types/config'

/**
 * Reads a record's provenance for the "Data source" card (#243, ADR-0005).
 *
 * Trust is derived, never asserted: a record counts as verified only when some
 * source both names the document and records the date we checked this record
 * against it. `url` plays no part in that test — most Las Piñas citizen's
 * charters are tarpaulins at the office window and PDFs handed over on request,
 * so gating on a link would make every offline-sourced record permanently
 * unverifiable (#238).
 *
 * This is the honesty guarantee: `pnpm validate` deliberately enforces no rule
 * on these fields (#237), so render is what makes the dishonest state — claiming
 * we checked a record without citing what we checked it against — unreachable.
 */
export function useDataSources(record: MaybeRefOrGetter<{ sources?: SourceRef[] } | undefined>) {
  const sources = computed(() => toValue(record)?.sources ?? [])

  /** Most recent date among sources that carry both a name and a check date. */
  const verifiedOn = computed(() => {
    const dates = sources.value
      .filter(source => source.name && source.verifiedOn)
      .map(source => source.verifiedOn!)

    return dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : null
  })

  // en-GB, not en-PH: PH resolves to US month-first ordering, and the card reads
  // "Checked against source 14 Jul 2026" — day first, as dates are written here.
  const checkedOn = computed(() =>
    verifiedOn.value
      ? new Date(verifiedOn.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '',
  )

  return { sources, verifiedOn, checkedOn }
}
