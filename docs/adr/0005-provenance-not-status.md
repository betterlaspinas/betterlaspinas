# Trust is derived from provenance, not asserted by a status field

The site copies fees, requirements and contact details out of Las Piñas City documentation, but a resident cannot tell a record we checked from one nobody has ever verified — both render identically. Trustworthiness lived in prose (a fixed hedge on the Office page) and in markdown comments that are never published, while the Service page went further and titled its card **"Verified Source"** over records with no verification behind them.

`#237` asked whether to encode that with a `dataStatus: 'verified' | 'unverified'` enum. It rejected the enum: a status field is an assertion the record makes about itself, and nothing stops it being stamped `verified` by someone who never opened the source. `#238` then corrected the shape of the citation, and work on `#199` (PR #277) proved the single-source assumption false.

## Decision

**A record is verified when it says what it was checked against and when — and it is unverified otherwise.** There is no status field. Provenance lives in an ordered `sources[]` array on `Service`, `Office` and `Agency`:

```ts
interface SourceRef {
  name: string // "Citizen's Charter 2022 (1st Edition)" — issuing authority + document
  url?: string // only when that authority publishes it
  published?: string // vintage of the source itself
  verifiedOn?: string // date we most recently confirmed the record against THIS source
  covers?: string[] // fields this source backs, e.g. ["phone"]
}

// on Service, Office and Agency:
//   sources?: SourceRef[]
```

Six rules follow from it:

1. **The render gate is `name && verifiedOn` on at least one source — never `url`.** Most Las Piñas citizen's charters are tarpaulins at the office window and PDFs handed over on request, not web pages. A URL gate would make every offline-sourced record permanently unverifiable no matter how carefully it was transcribed (`#238`).
2. **`verifiedOn` asserts transcription accuracy, not currency.** It records the date we most recently confirmed the record against this source — not that the fee is still charged today. `published` keeps the source's own vintage as a separate fact so a fresh check cannot present four-year-old data as current.
3. **Transcribing from a source is confirming the record against it, not a lesser act.** The moment a contributor copies a fee or a phone number out of a document, they have already checked the record against that document — `verifiedOn` is set right then, not held back for some later "official" proofread. Re-reading the same source later — a second contributor, or the same one catching a mistake — bumps that same source's `verifiedOn` in place; it does not add a second date field. There is deliberately no separate audit/proofread date: a proofread makes the identical claim as the original transcription, only fresher, and a second field would exist only to encode a confidence gradient between "transcribed once" and "checked twice" — exactly what `#237` rejected when it turned down a `dataStatus` enum and a `corroborated` flag alike. If a reader wants the first-transcribed-vs-last-audited detail, it's in the git history of the record's `sources[]` entry; that is not this field's job to duplicate.
4. **Nothing computes from `published`.** No stale threshold, no expiry, no decay — a date arithmetic rule would turn a judgement about a document into a number the site invents (`#237`).
5. **A source need not be a document.** A live confirmation is a source too — e.g. `{ "name": "Confirmed by phone with the City Treasurer's Office", "verifiedOn": "2026-08-05", "covers": ["phone"] }`. The same re-check rule applies: calling the same office again bumps that source's date in place; calling a _different_ office, or checking a different document, adds a new entry. A live source must be named specifically enough that a reader could repeat the confirmation — which office, which channel — mirroring the existing rule against citing a contributor's own photo or scan as a `url` (see the sourcing table below): "we called someone" is not a citation, "confirmed by phone with the City Treasurer's Office" is.
6. **Provenance is per record with attribution, not one document per record.** The field exists because a record's contact details can come from more than one document — e.g. an Office's location and hours from the Citizen's Charter but its phone from the city's key-officials directory, because the charter carries no contact numbers at all. `covers` names the fields a secondary source backs; it is omitted for the source backing the record generally. Two sources backing the same field, each with its own `verifiedOn`, is what corroboration looks like in this model — which is why no `corroborated` flag or confidence score is needed (`#237`): the array already expresses it. `pnp-laspinas` is the existing example — the key-officials directory backs `phone`, its official Facebook page backs `location`, each individually checked and dated.

### The sourcing and evidence bar

The same decision from the contributor's side — citation, link and audit trail are three separate things, and collapsing them is what pushes a directory into impersonating a publisher:

|                 | field            | rule                                                                                                                                                   |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Citation**    | `sources[].name` | Names the issuing authority and document. Always present. Never points at us.                                                                          |
| **Link**        | `sources[].url`  | Filled **only** when that authority publishes the document. Absent for a tarpaulin.                                                                    |
| **Audit trail** | _(no field)_     | The contributor's photo or scan, attached to the PR or issue as review evidence. **Never committed to the repo, never rendered, never used as `url`.** |

Hosting our own photo of an official document and linking it as the source would make this site look like the publisher of a document it merely copied. The evidence still gets reviewed — it just lives in the PR, not in the repo.

### Render

Detail pages only; nothing in list or search results. **The citation is unconditional; `verifiedOn` governs the claim made _about_ the citation, not whether it appears.** `sources[]` (what a record was transcribed from) and `verifiedOn` (whether we went back and re-checked it) are different facts, and gating the first behind the second collapsed two distinguishable states — a record with a recorded source and a record with none at all — into identical copy. Three states follow, all rendered by the shared `UiDataSourceStatus` component:

1. **No `sources`.** No citation list. The hedge names _our_ documentation backlog, not the data's reliability — "We're still documenting where this office's details came from. Confirm with the office before relying on them." The phone number is probably fine; we just haven't written down its origin.
2. **`sources` present, none carry `verifiedOn`.** The citation list renders, followed by "Sourced from this document. No check recorded yet." (pluralised "these documents" for more than one source). "No check recorded" describes our log, not the data's quality — the distinction the whole model rests on.
3. **At least one source carries `verifiedOn`.** The citation list renders, followed by "Checked against source 14 Jul 2026."
   - With a single source this is a record-level statement, since the one source and the record's `verifiedOn` are the same fact.
   - With more than one source, `useDataSources`' `verifiedOn` is only the most recent date _across_ sources — it says nothing about which ones actually carry it. A record with two sources where only one has `verifiedOn` still lands in this branch (`verifiedOn` is non-null), so a single collapsed summary line would read as both having been checked. `UiDataSourceStatus` closes that gap itself, independent of `useDataSources`: whenever the sources don't all share the same verified state, each `<li>` carries its own line ("Checked 14 Jul 2026." or "No check recorded yet."), and the paragraph below the list drops to the neutral "Sourced from these documents." rather than citing one date for all of them. When every source _is_ independently verified — e.g. `pnp-laspinas`'s two same-day sources — the per-entry lines still render (dates could differ per source, so no single one is assumed to apply to all), and the summary line below asserts the check itself: "Checked against all sources." No date appears in that summary — sources can carry different `verifiedOn` dates and the record-level `checkedOn` is only the most recent of them, so naming one there would misstate the others; the per-entry lines above are where each source's own date lives. The same sentence covers two sources and three-or-more without branching on count.

Each cited title is a link when its `url` exists and plain text when it does not, so an offline-sourced record does not read as second-class — true in both states 2 and 3. **No checkmark or badge** in any state: a tick reads as certification this site cannot grant.

The card renders **whether or not the record has sources**, and now the records we know least about (state 1) are visibly distinct from the ones we've merely not re-checked (state 2) — silence used to put the same soft signal on both.

`pnpm validate` deliberately enforces nothing about these fields beyond `name` being required inside a source object — no required `sources`, no `dependentRequired` (`#237`). **Render is the enforcement**: the dishonest state, claiming a check without citing what was checked, has no way to reach the page. This is about honesty, not format: a schema `pattern` requiring `verifiedOn` to be `YYYY-MM-DD` when present does not contradict it — a regex can confirm a date is well-formed, it cannot confirm the record was actually checked. That honesty gap is exactly what render, not validation, closes. `verifiedOn`'s pattern exists because `useDataSources` picks the most recent one by raw string comparison, correct only for zero-padded ISO dates; `published` gets no such constraint — nothing computes from it, so there is no comparison to protect and a bare year (its documented shape) must stay valid.

## Considered Options

- **`dataStatus` enum** (`#237`'s starting point). Self-assertion with nothing behind it, and it invites the next field — a confidence score. Rejected. This ADR **supersedes** the deferred generalized `dataStatus` flag referenced in ADR-0003 and the Agency-scoped stand-in in ADR-0004; the `Agency.dataStatus` field is deleted.
- **Flat `sourceUrl` / `sourceName` / `sourcePublished` / `verifiedOn` fields** (this ticket as first written). Simplest, but models one source per record — already false for the six Offices above, where a single record-level date would claim the whole record was checked against one document. Rejected.
- **Full field-level provenance** (every field an object carrying its own source). Maximally faithful and unusable: the config is hand-authored JSON, and authors would skip it. `sources[]` with an optional `covers` is the middle that gets filled in.
- **A `corroborated` flag or confidence score.** The five restored phone numbers are trustworthy specifically because two independent sources agree — evidentially stronger than one source with a `verifiedOn`, and the model cannot express the difference. Deliberately left as **working practice, not a field**: encoding it re-opens the confidence-score door `#237` closed. Where two sources disagree (`city-assessor`: `8874-4781` in the charter transcription vs `8874-6781` in the directory), a human resolves it and the winning value is recorded with the source it came from.

## Consequences

- `SourceRef` added to `app/types/config.ts`; `sources?: SourceRef[]` replaces `sourceUrl` / `sourceName` on `ServiceDetail`, `Office` and `Agency`. The duplicate, dead `sources` slot on `OfficeDetail` (never typed, never rendered) is removed rather than carried over. `Agency.dataStatus` deleted. All 16 existing records migrated to single-element `sources[]`.
- Both detail pages (`offices/[slug].vue`, `service-details/[slug].vue`) read the gate through one composable, `useDataSources`, and render it through one component, `UiDataSourceStatus` (`app/components/ui/DataSourceStatus.vue`) — the honesty rule and the three-state copy are each a single implementation, not two that can drift.
- **Not invisible on merge, and a rendered state 3 now exists.** Of 14 Offices, 7 have no `sources` (state 1), 6 have `sources` but no `verifiedOn` (state 2), and 1 — `city-engineering` — has a `verifiedOn`-stamped source (state 3), its Charter citation scoped via `covers: ["phone"]` to the one field the charter's "Contact Information" section actually backs, re-confirmed against the source PDF by the `#213` line-by-line pass. All 8 of the 16 detail-bearing Services that cite the Charter now carry `verifiedOn` too (state 3), scoped to the transaction content the charter actually documents (`fee`, `processingTime`, `quickStats`, `requirements`, `processSteps`, `faqs`); the other 8 Services with a `detail` block still have no `sources` (state 1). The remaining 6 Offices citing the Charter (`civil-registry`, `city-treasurer`, `city-assessor`, `cswdo`, `city-planning`, `city-health`) stay at state 2 deliberately: their charter transcriptions contain transaction content only, with no office-level contact/location/hours field the charter itself corroborates — see the `#243` backfill notes for the per-record reasoning, including why `city-assessor`'s charter-transcribed phone number is excluded (it's flagged `_(verify)_` in the transcription and independently known wrong, a 4/6 transposition). `pnp-laspinas` (rule 6 above) is the one Agency with a stamped `verifiedOn`; Agencies have no detail page yet, so it is verified as data without a rendered card.
- Later batches (`#213`, the `#63`–`#70` content cluster) stamp `verifiedOn` per record as they verify — or, per rule 3, bump an already-stamped source's date in place when they re-confirm it. Stamping is the only way a page starts stating a fact.
- `CityData.financialData.sourceUrl` (`statistics-detailed.json`) is untouched — a statistic's citation, not a directory record's provenance.
