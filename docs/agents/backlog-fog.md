# Backlog fog

**Fog** is work that is known to be coming but is not yet sharp enough to ticket. This file is where it lives.

It is a **reference, not a queue.** Nothing waits here for someone to remember to check it. Each entry names the moment a reader's eyes land on it without anyone having to look — a file they open, or an external event that happens on its own. An entry that cannot name that moment does not belong here: it is either a ticket (file it) or not worth recording.

Anything that **blocks** other work is not fog. It goes on the [project board](https://github.com/orgs/betterlaspinas/projects/3) as a real issue with a native blocking edge, where tracking already exists.

## Entry shape

Every entry carries four things. Missing any one of them means the entry is misfiled.

| Field                   | What it answers                                            |
| ----------------------- | ---------------------------------------------------------- |
| **Trigger**             | What event makes this worth revisiting                     |
| **Clearing act**        | What kind of work resolves it — a decision, a fact, a feel |
| **Exit artifact**       | What this becomes when cleared                             |
| **Surfacing mechanism** | How a reader arrives here without remembering to           |

The clearing act maps onto the tracker's existing wayfinder vocabulary: `wayfinder:grilling` for a decision, `wayfinder:research` for an unknown fact, `wayfinder:prototype` for an unknown feel.

## Entries

### `configHelper` split into `serviceCatalog` + `configRegistry`

`app/utils/configHelper.ts` is a 661-line, 44-export interface fronting two unrelated jobs: reading canonical Service/Office data, and thin cast-getters over the rest of the config. Splitting it sharpens [ADR-0002](../adr/0002-view-resolver-seam.md)'s seam rather than relitigating it.

The open question is **where the seam falls** — which exports belong to which side, and whether the registry half is a seam at all or just leftovers. That is a design call, not a typing job, which is why this is fog and [#256](https://github.com/betterlaspinas/betterlaspinas/issues/256) (the sibling `useLanguage` extraction, surfaced by the same review) is not.

Deliberately not done during the Service content push: this is the seam all ten content epics touch, so refactoring it mid-push buys constant conflict for no user-visible gain.

- **Trigger** — the ten Service content epics (#62–#70, #244) close, **or** an epic's PR is blocked on a `configHelper` change.
- **Clearing act** — a design pass (`/design-an-interface` or `/codebase-design`) on where the seam falls.
- **Exit artifact** — a refactor ticket with the seam already decided; likely expand–contract given the call-site fan-out.
- **Surfacing mechanism** — pointer comment at the top of `app/utils/configHelper.ts`. Anyone opening the file to work on it lands here.

### Post-#84 E2E coverage plan

Which flows earn an E2E test once Playwright infrastructure exists. [#239](https://github.com/betterlaspinas/betterlaspinas/issues/239) ruled [#84](https://github.com/betterlaspinas/betterlaspinas/issues/84) out of this milestone, so specifying coverage now means planning against infrastructure that does not exist.

- **Trigger** — one of #239's named pull-back triggers fires: a route or render regression reaches production, **or** the #63–#70 content epics start changing page templates rather than only data.
- **Clearing act** — a decision, once there is something to decide against.
- **Exit artifact** — a coverage-plan ticket, filed alongside #84 rather than before it.
- **Surfacing mechanism** — the trigger events are self-announcing: a production regression is noticed, and a template change shows up in an epic's diff.

### `Division` entity

`CONTEXT.md` reserves the concept and `Office.parentId` already exists for it, but there is no data and no demand. Correct as-is — the reservation is the whole design.

- **Trigger** — a real Division appears in source data.
- **Clearing act** — none in advance. Modelling an entity with no instances is how you get the wrong model.
- **Exit artifact** — nothing, unless the trigger fires.
- **Surfacing mechanism** — the event itself. Whoever hits a real Division reads this and learns the question was already considered, rather than re-deriving it.

## Provenance

These entries came from the _Not yet specified_ section of [#235](https://github.com/betterlaspinas/betterlaspinas/issues/235), the wayfinder map that ranked this backlog. That section had no home once the map closed: it was absent from the board and from `docs/`, and its revisit triggers had no reader. Three of the map's six fog items graduated to real issues instead — [#254](https://github.com/betterlaspinas/betterlaspinas/issues/254) (third-party embed and consent posture), [#255](https://github.com/betterlaspinas/betterlaspinas/issues/255) (Category assignment rule, absorbing the `online` / `government` question), and [#256](https://github.com/betterlaspinas/betterlaspinas/issues/256) (`useLanguage` dictionary extraction, which was never fog — only unfiled).
