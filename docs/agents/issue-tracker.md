# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues in `betterlaspinas/betterlaspinas`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

`gh` infers the repo from `git remote -v` when run inside the clone.

## Priority and effort

Priority lives on the **project board** — [\[BetterLasPiñas\] Development & Roadmap](https://github.com/orgs/betterlaspinas/projects/3) — in its `Priority` field. It does **not** live on labels. Do not add `P0`/`P1`/`priority:*` labels: they would be a second copy of the ranking with no rule for which copy wins, and the divergence fails silently.

Issues are added to the board automatically on creation, so the only manual step is setting the field.

### Bands, not a ranked list

`Priority` is a band, not a position. Everything in a band is equally takeable — pick any unblocked issue in the highest non-empty band.

| Band            | Meaning                                  |
| --------------- | ---------------------------------------- |
| 🔴 Must-Have    | Take from here first                     |
| 🟡 Should-Have  | Next, once Must-Have is empty or blocked |
| 🟢 Nice-to-Have | Real but unscheduled                     |
| ❄️ Icebox       | Parked; not a queue                      |

Bands over a strict 1..N order for two reasons: a numbered list goes stale on every new issue, and it cannot absorb concurrent edits — two sessions inserting at position 3 conflict, whereas two sessions adding to a band do not.

**Empty `Priority` means unranked, not lowest.** Most issues are unranked; that is honest rather than a gap to backfill.

Both contributor-facing views — **📋 Triage** (everything) and **🌟 Start Here** (`good first issue` / `help wanted`, where outside contributors land) — are grouped into `Priority` swimlanes, so "take from the highest non-empty band" is the same instruction in either. Keep them that way: a Start Here that is not swimlaned by priority sends first-time contributors in without a ranking.

### Blocking is separate from priority

Hard dependencies use native GitHub issue dependencies, not priority:

```sh
gh api -X POST repos/{owner}/{repo}/issues/<N>/dependencies/blocked_by -F issue_id=<blocker .id>
```

Note this takes the blocker's **`.id`**, not its issue number (`gh api repos/{owner}/{repo}/issues/<N> --jq .id`), and `-F` rather than `-f`.

Priority answers "which of these takeable issues first". Blocking answers "is this takeable at all". A high-priority blocked issue is not takeable — read both.

### `Status` is not authoritative

`Status` is automated and mostly correct, but it can regress: opening a PR that references an **already-closed** issue flips that issue from `Done` back to `In Progress`, and nothing moves it back. Observed on #72 and #250, both corrected by hand.

Treat `Status` as a hint and the issue's own open/closed state as the truth. Ranking never depends on `Status` — it lives in `Priority`.

**A stale `Done` will close a reopened issue when you touch any other field.** The board runs an auto-close workflow on `Status = Done`. Editing `Priority` or `Effort` re-fires it, so an issue that was reopened while its card still said `Done` gets closed again by an unrelated field edit — observed on #62 during #242. Before a batch field edit, fix any `Done` card whose issue is open; if one closes anyway, `gh issue reopen` it and set `Status` afterwards.

### Quick wins

Use the board's `Effort` field (`XS (Quick Fix)`, `S (Few hours)`, `M (1-2 days)`, `L (Feature)`). `XS` **is** the quick-win marker — no `quick-win` label.

`Effort` and `good first issue` mean different things and are set independently: `Effort` is how long it takes, `good first issue` is how much repo context it needs. A two-line fix that requires knowing how vitest collection works is `XS` but not a good first issue.

### Who maintains it, and when

The maintainer sets bands; contributors propose changes by commenting on the issue rather than editing the field.

Re-rank on **one** trigger: **a decision changes the order** — e.g. a [wayfinder map](https://github.com/betterlaspinas/betterlaspinas/issues/235) resolution re-sequences work. Update the bands in the same session that makes the decision, or it will not happen later.

**An empty band is not a trigger.** When 🔴 Must-Have empties, do not promote 🟡 Should-Have into it — just take from Should-Have, which the "highest non-empty band" rule already covers.

Bands are absolute claims about necessity, not queue positions. Promoting on emptiness would make 🔴 Must-Have mean "whatever is currently on top" instead of "required", and would erase the difference between work that is genuinely required and work that merely floated up — so a real Must-Have filed later could no longer outrank it.

Do not re-rank issue by issue as they are filed. New issues arrive unranked and are banded in batches.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
