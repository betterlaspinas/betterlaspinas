# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the domain glossary (Service, Office, Office Group, Category, Service Detail).
- **`docs/adr/`** — read ADRs that touch the area you're about to work in (e.g. ADR-0001 on canonical Service data).

If any of these don't exist, proceed silently. The producer skill (`/grill-with-docs`) creates them lazily as terms and decisions get resolved.

## File structure

Single-context repo:

```
/
├── CONTEXT.md
├── docs/adr/
│   └── 0001-canonical-service-data.md
└── app/
```

## Use the glossary's vocabulary

When output names a domain concept (issue title, refactor proposal, hypothesis, test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids (e.g. say **Office**, not "department").

If a needed concept isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use, or there's a real gap to note for `/grill-with-docs`.

## Flag ADR conflicts

If output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0001 (canonical Service data) — but worth reopening because…_
