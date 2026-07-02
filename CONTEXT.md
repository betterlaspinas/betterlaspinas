# Better Las Piñas

Community-driven LGU portal for Las Piñas City. Surfaces government services, offices, officials, legislation, and local information to residents.

## Language

**Service**:
An action a resident performs through the LGU (e.g. "Get Birth Certificate", "Renew Business Permit"). Delivered by a **responsible body** — usually a city **Office**, but some Services are delivered by a **Barangay** (lower LGU tier) or an **Agency** (national office in the city). One canonical record per Service, carrying its **Service Detail** as optional fields.
_Avoid_: Transaction, request

**Service Detail**:
The rich content of a Service — requirements, process steps, FAQs, fees, office contact. Part of the Service record (optional fields), **not** a separate entity. A Service with no detail renders a catalog card with an external link.
_Avoid_: Service page, detail entity

**Office**:
An independent, top-level LGU organization that delivers Services (e.g. City Civil Registry, City Treasurer's Office). A first-class entity, **not** a kind of Service. A Service is delivered by exactly one Office; an Office provides many Services. "Office" here is the **institutional** sense from RA 7160 — the bureau and the charge it exercises, named in statute as "the Office of the City \_\_\_" — **synonymous with Department**. It is **not** the physical room the org occupies (that is the `location` attribute). Headed by an **Official** (its Department Head). A **city department only** — a **Barangay** (lower LGU tier) and an **Agency** (national office in the city) are *not* Offices, even though residents transact at them.
_Avoid_: Department (the synonym — pick one canonical term), bureau, "office" meaning a place, applying it to a Barangay or national Agency

**Official**:
A person in government, held in `officials.json`. Three roles: **executive** (Mayor, Vice Mayor), **legislative** (Councilors, Liga/SK presidents), and **Department Head** — an Official who heads exactly one **Office** (references it by id). An Official is a person, **never** an organization; a Department Head's office identity, contact, and description live on the **Office**, not duplicated on the person.
_Avoid_: department (the org), modeling a head as a name string on the Office

**Division** _(future — no data yet)_:
A subordinate subunit **within** an Office/Department (e.g. the Appraisal Division under the City Assessor), headed by a **Division Chief** (an Official). Strictly below an Office, never a synonym for it. Not modeled today; an Office carries an optional `parentId` so Divisions can attach later without rework.
_Avoid_: Office, Department (a Division is neither — it is contained by one)

**Barangay**:
The smallest LGU tier — a local district that is its **own** local government, headed by a **Punong Barangay** (Barangay Captain, "Kap."). Las Piñas has 20, held in `subdivisions.json` (each `{ name, leader, phone }`). A Barangay is **not** a city **Office**, so Services delivered "at your Barangay" (e.g. Barangay Clearance, Barangay ID) point at the **Barangay directory**, never at a single Office. `subdivision` is the template-generic config key/label for this concept; the canonical Las Piñas term is **Barangay**.
_Avoid_: subdivision (in PH means a private housing development — actively misleading; keep it only as the template config label), district, village

**Agency**:
A **national** government office physically present in the city that residents transact with (e.g. the PNP station for Police Clearance; later BFP, NBI, BJMP, Prosecutor). Held in `agencies.json`. Office-shaped — name, location, contact, the Services it backs — but **not** a city **Office**: it belongs to the national government, not the LGU, so it lives outside `offices.json` and `OfficeGroup`.
_Avoid_: Office (it is not a city department), bureau, hotline (a phone number is one attribute, not the Agency)

**Category**:
A grouping used to organize **Services** for browsing by task — answers "what do I want to do" (e.g. "Certificates", "Business"). Applies to Services only, never Offices.
_Avoid_: Section, type

**Office Group**:
A grouping of **Offices** by government function — answers "who runs this" (e.g. "Finance", "Frontline Services"). Distinct from **Category**. An Office belongs to one Office Group even when its Services span multiple Categories (e.g. City Treasurer's Office sits in "Finance" but provides Services in both Tax and Business Categories).
_Avoid_: Office category, department, sector

**View**:
A render-ready projection of canonical **Service** / **Office** / **Category** records, shaped for exactly one route's template. Built by a resolver in `app/utils/pageViews.ts` (`categoryView`, `serviceDetailView`, `officeView`), which reads through the `configHelper` accessors and returns a `View` or `undefined`. A page's `<script setup>` calls one resolver and renders the result; it holds no resolution or mapping logic. A **View** is never a domain entity — it carries no identity and is not persisted.
_Avoid_: DTO, model, ViewModel, page

## Relationships

- **Service → providedBy → Office** (city department; many-to-one)
- **Service → providedByAgency → Agency** (national office; optional, single ref)
- **Service → providedByBarangay → Barangay directory** (the resident's own Barangay; a directory pointer, not a single ref)
- A Service's **responsible body** is exactly one tier: a city **Office**, an **Agency**, or the **Barangay** directory
- **Official → heads → Office** (a Department Head heads one Office; an Office has at most one head)
- **Category groups Services** (one-to-many) — by task
- **Office Group groups Offices** (one-to-many) — by function
- **Office → parentId → Office** (future: a Division references its parent Office; unused today)
- A Service's Category is independent of its Office's Office Group
- An Official is a person; an Office is an organization — the head relationship links the two, never merges them
- **A View projects canonical records for one route** — built by a resolver, consumed by exactly one page
