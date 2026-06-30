# Office is the institutional Department; heads are Officials

`#199` asks how `officials.departments[]` (rendered on the Government page as "Department Heads & Key Offices") relates to the canonical **Office** entity (`offices.json`, ADR-0001/#185/#196). The two model the same real-world thing twice: a department's id, name, description, phone, and icon live in both files and have already drifted (e.g. `civil-registry`'s description differs between them). The only data a department adds is the **head** (a person) and `abbreviation`. The Government section, despite its title, renders office-shaped fields (`department`, `description`, `phone`, `email`) and never prints the head — so the head is dead data and the contact block is a drifting duplicate.

Resolving this required pinning what "Office" means, because the term collided: the codebase uses `Office` for the service-providing organization, while "office" colloquially means the room a department occupies.

## Decision

**The canonical entity stays `Office` in code, and `Office` denotes the institutional organization — synonymous with "Department."** Under RA 7160 (Local Government Code of 1991) an LGU is structured as appointive **offices**, each named "the Office of the City \_\_\_" and headed by an appointive official; "Office" there is the institutional sense (a bureau and the charge it exercises, as in "Office of the President"), not a place. So naming the entity `Office` is statutorily correct, and **Department** is the avoidable synonym.

Consequences for the model (recorded in CONTEXT.md):

- **Head = Official, not a scalar.** A Department Head is an `Official` (person) that references the one Office it heads. `officials.departments[]` splits: the person becomes an Official; the organization is the existing Office record. `officials.json` ends up holding only people.
- **Head presence marks a City-Hall department.** The Government section renders Offices that have a head; `barangay-hall`/`police-station` (no head) are excluded for free — no new flag needed.
- **One relationship direction.** `Service.providedBy → Office` is canonical; `departments[].services` (Office → one Category) is dead and lossy → removed.
- **Office (physical place)** = the `location` attribute, never promoted to an entity.
- **Division / Division Chief** (sub-units below an Office) are out of scope — no data; an Office carries an optional `parentId` so Divisions can attach later.
- **`officeGroups` is editorial, not source-derived.** The Las Piñas directory lists offices flat with no functional grouping; the `Frontline Services / Administration` split was authored in #185/#196 with no `sourceUrl`. Functional grouping is conventional LGU practice (cf. Quezon City's clusters), but each city defines its own and Las Piñas publishes none. The grouping is kept as a navigation aid and flagged unverified/editorial (ties to the deferred `dataStatus` flag); only `frontline-services` has an external anchor (RA 11032 "frontline service").

## Considered Options

- **Rename `Office` → `Department` everywhere** (`offices.json` → `departments.json`, `OfficeGroup` → `DepartmentGroup`, rewrite ADR-0001/0002). Ontologically purest, but re-churns three freshly-merged PRs (#202/#211/#222) for zero behavior change, and "Office" is in fact the statutory institutional term — so the rename buys little. Rejected.
- **`Office.head?: string` scalar.** Simplest join, but models a person as a field on an organization, contradicting the people/organization split and RA 7160's framing of the head as an appointed official. Rejected.
- **Keep both files, link by id.** Lowest migration, but leaves two write surfaces and the exact drift #199 exists to kill. Rejected.

## Consequences

- `officials.json` narrows to people (executive, legislative, Department Heads); office identity/contact/description has one home (`offices.json`).
- The Government "Department Heads & Key Offices" section reads Offices (grouped by `OfficeGroup`) and joins each head Official — no duplicate JSON, drift closed.
- A dept→Office id map is required: of 14 departments, only 3 (`civil-registry`, `cswdo`, `cdrrmo`) currently share an id with their Office. `bpls` (Business Permits & Licensing) has no Office and needs one created.
- `dataStatus`/editorial markup on `officeGroups` is the truthful encoding of an unsourceable grouping; re-sourcing is a separate data-audit item, not part of #199.
