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

### Blocking is separate from priority

Hard dependencies use native GitHub issue dependencies, not priority:

```sh
gh api -X POST repos/{owner}/{repo}/issues/<N>/dependencies/blocked_by -F issue_id=<blocker .id>
```

Note this takes the blocker's **`.id`**, not its issue number (`gh api repos/{owner}/{repo}/issues/<N> --jq .id`), and `-F` rather than `-f`.

Priority answers "which of these takeable issues first". Blocking answers "is this takeable at all". A high-priority blocked issue is not takeable — read both.

### Quick wins

Use the board's `Effort` field (`XS (Quick Fix)`, `S (Few hours)`, `M (1-2 days)`, `L (Feature)`). `XS` **is** the quick-win marker — no `quick-win` label.

`Effort` and `good first issue` mean different things and are set independently: `Effort` is how long it takes, `good first issue` is how much repo context it needs. A two-line fix that requires knowing how vitest collection works is `XS` but not a good first issue.

### Who maintains it, and when

The maintainer sets bands; contributors propose changes by commenting on the issue rather than editing the field.

Re-rank on either trigger:

- **🔴 Must-Have empties** — promote from 🟡 Should-Have.
- **A decision changes the order** — e.g. a [wayfinder map](https://github.com/betterlaspinas/betterlaspinas/issues/235) resolution re-sequences work. Update the bands in the same session that makes the decision, or it will not happen later.

Do not re-rank issue by issue as they are filed. New issues arrive unranked and are banded in batches.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
