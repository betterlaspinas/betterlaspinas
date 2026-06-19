# Better Las Piñas

Community-driven LGU portal for Las Piñas City. Surfaces government services, offices, officials, legislation, and local information to residents.

## Language

**Service**:
An action a resident performs through the LGU (e.g. "Get Birth Certificate", "Renew Business Permit"). Delivered by an **Office**. One canonical record per Service, carrying its **Service Detail** as optional fields.
_Avoid_: Transaction, request

**Service Detail**:
The rich content of a Service — requirements, process steps, FAQs, fees, office contact. Part of the Service record (optional fields), **not** a separate entity. A Service with no detail renders a catalog card with an external link.
_Avoid_: Service page, detail entity

**Office**:
A government body that provides Services (e.g. Civil Registry Office). A first-class entity, **not** a kind of Service. A Service is delivered by exactly one Office; an Office provides many Services.
_Avoid_: Department (unless distinct), bureau

**Category**:
A grouping used to organize **Services** for browsing by task — answers "what do I want to do" (e.g. "Certificates", "Business"). Applies to Services only, never Offices.
_Avoid_: Section, type

**Office Group**:
A grouping of **Offices** by government function — answers "who runs this" (e.g. "Finance", "Frontline Services"). Distinct from **Category**. An Office belongs to one Office Group even when its Services span multiple Categories (e.g. City Treasurer's Office sits in "Finance" but provides Services in both Tax and Business Categories).
_Avoid_: Office category, department, sector

## Relationships

- **Service → providedBy → Office** (many-to-one)
- **Category groups Services** (one-to-many) — by task
- **Office Group groups Offices** (one-to-many) — by function
- A Service's Category is independent of its Office's Office Group
