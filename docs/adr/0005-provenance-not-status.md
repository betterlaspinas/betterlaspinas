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
  verifiedOn?: string // ISO date we checked THIS source
  covers?: string[] // fields this source backs, e.g. ["phone"]
}

// on Service, Office and Agency:
//   sources?: SourceRef[]
```

Four rules follow from it:

1. **The render gate is `name && verifiedOn` on at least one source — never `url`.** Most Las Piñas citizen's charters are tarpaulins at the office window and PDFs handed over on request, not web pages. A URL gate would make every offline-sourced record permanently unverifiable no matter how carefully it was transcribed (`#238`).
2. **`verifiedOn` asserts transcription accuracy, not currency.** Re-reading the 2022 charter today proves our record matches the charter, not that the fee is still charged. `published` keeps the source's own vintage as a separate fact so a fresh check cannot present four-year-old data as current.
3. **Nothing computes from `published`.** No stale threshold, no expiry, no decay — a date arithmetic rule would turn a judgement about a document into a number the site invents (`#237`).
4. **Provenance is per record with attribution, not one document per record.** The field exists because a record's contact details can come from more than one document — e.g. an Office's location and hours from the Citizen's Charter but its phone from the city's key-officials directory, because the charter carries no contact numbers at all. `covers` names the fields a secondary source backs; it is omitted for the source backing the record generally. No Office record cites a second source yet — the charter is still the only citation on every one — so applying this to the Offices it motivates is follow-up work, not something this change ships. One Agency record, `pnp-laspinas`, already uses it: the key-officials directory backs `phone`, its official Facebook page backs `location`, each individually checked and dated — the repo's first record combining `covers` with `verifiedOn`.

### The sourcing and evidence bar

The same decision from the contributor's side — citation, link and audit trail are three separate things, and collapsing them is what pushes a directory into impersonating a publisher:

|                 | field            | rule                                                                                                                                                   |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Citation**    | `sources[].name` | Names the issuing authority and document. Always present. Never points at us.                                                                          |
| **Link**        | `sources[].url`  | Filled **only** when that authority publishes the document. Absent for a tarpaulin.                                                                    |
| **Audit trail** | _(no field)_     | The contributor's photo or scan, attached to the PR or issue as review evidence. **Never committed to the repo, never rendered, never used as `url`.** |

Hosting our own photo of an official document and linking it as the source would make this site look like the publisher of a document it merely copied. The evidence still gets reviewed — it just lives in the PR, not in the repo.

### Render

Detail pages only; nothing in list or search results. The card is **asymmetric** — a verified record states a fact ("Checked against source 14 Jul 2026"), an unverified one keeps the hedge ("Not yet checked against official documentation"). Each cited title is a link when its `url` exists and plain text when it does not, so an offline-sourced record does not read as second-class. **No checkmark or badge**: a tick reads as certification this site cannot grant.

The card renders **whether or not the record has sources**. Silence would put the softest signal on the records we know least about.

`pnpm validate` deliberately enforces nothing about these fields beyond `name` being required inside a source object — no required `sources`, no `dependentRequired` (`#237`). **Render is the enforcement**: the dishonest state, claiming a check without citing what was checked, has no way to reach the page. This is about honesty, not format: a schema `pattern` requiring `verifiedOn` to be `YYYY-MM-DD` when present does not contradict it — a regex can confirm a date is well-formed, it cannot confirm the record was actually checked. That honesty gap is exactly what render, not validation, closes. `verifiedOn`'s pattern exists because `useDataSources` picks the most recent one by raw string comparison, correct only for zero-padded ISO dates; `published` gets no such constraint — nothing computes from it, so there is no comparison to protect and a bare year (its documented shape) must stay valid.

## Considered Options

- **`dataStatus` enum** (`#237`'s starting point). Self-assertion with nothing behind it, and it invites the next field — a confidence score. Rejected. This ADR **supersedes** the deferred generalized `dataStatus` flag referenced in ADR-0003 and the Agency-scoped stand-in in ADR-0004; the `Agency.dataStatus` field is deleted.
- **Flat `sourceUrl` / `sourceName` / `sourcePublished` / `verifiedOn` fields** (this ticket as first written). Simplest, but models one source per record — already false for the six Offices above, where a single record-level date would claim the whole record was checked against one document. Rejected.
- **Full field-level provenance** (every field an object carrying its own source). Maximally faithful and unusable: the config is hand-authored JSON, and authors would skip it. `sources[]` with an optional `covers` is the middle that gets filled in.
- **A `corroborated` flag or confidence score.** The five restored phone numbers are trustworthy specifically because two independent sources agree — evidentially stronger than one source with a `verifiedOn`, and the model cannot express the difference. Deliberately left as **working practice, not a field**: encoding it re-opens the confidence-score door `#237` closed. Where two sources disagree (`city-assessor`: `8874-4781` in the charter transcription vs `8874-6781` in the directory), a human resolves it and the winning value is recorded with the source it came from.

## Consequences

- `SourceRef` added to `app/types/config.ts`; `sources?: SourceRef[]` replaces `sourceUrl` / `sourceName` on `ServiceDetail`, `Office`, `OfficeDetail` and `Agency`. `Agency.dataStatus` deleted. All 16 existing records migrated to single-element `sources[]`.
- Both detail pages (`offices/[slug].vue`, `service-details/[slug].vue`) read the gate through one composable, `useDataSources` — the honesty rule is a single implementation, not two that can drift.
- **Invisible on merge**: no record carries a `verifiedOn` yet, so every page shows the hedge. The Service page's "Verified Source" heading is gone, which is a correction, not a regression: it was claiming what we had not done.
- Later batches (`#213`, the `#63`–`#70` content cluster) stamp `verifiedOn` per record as they verify. Stamping is the only way a page starts stating a fact.
- `CityData.financialData.sourceUrl` (`statistics-detailed.json`) is untouched — a statistic's citation, not a directory record's provenance.
