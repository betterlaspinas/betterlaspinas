#!/usr/bin/env node
// Zero-dependency config validator for the canonical Service spine (#184).
//
// Validates app/config/services.json, app/config/categories.json,
// app/config/offices.json, and app/config/agencies.json against their JSON
// Schemas (app/config/schema/*.schema.json) using a hand-rolled, minimal
// draft-07 subset, then runs cross-file consistency assertions that a pure
// schema cannot express (unknown categoryId/groupId, duplicate ids,
// url/detail coherence, Service -> providedBy -> Office, Service ->
// providedByAgency -> Agency, and the at-most-one responsible-body-tier rule,
// ADR-0004).
//
// Exit code 0 = valid; 1 = one or more violations. No runtime deps by design
// (ADR-0001 Phase 1 stays on JSON + schema; Jan's no-new-deps guardrail).

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const configDir = resolve(root, 'app/config')
const schemaDir = resolve(configDir, 'schema')

const errors = []

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  }
  catch (e) {
    errors.push(`Failed to parse JSON at ${path}: ${e.message}`)
    return undefined
  }
}

// ---------------------------------------------------------------------------
// Minimal draft-07 subset validator.
// Supports: type, required, properties, items, additionalProperties (false),
// enum, $ref (local #/definitions/*). Enough to mirror our schemas.
// ---------------------------------------------------------------------------
function typeOf(value) {
  if (Array.isArray(value))
    return 'array'
  if (value === null)
    return 'null'
  return typeof value
}

function resolveRef(ref, rootSchema) {
  // Only local refs like "#/definitions/foo"
  const parts = ref.replace(/^#\//, '').split('/')
  let node = rootSchema
  for (const part of parts) {
    node = node?.[part]
  }
  return node
}

function validateNode(value, schema, rootSchema, path) {
  if (!schema)
    return

  if (schema.$ref) {
    validateNode(value, resolveRef(schema.$ref, rootSchema), rootSchema, path)
    return
  }

  if (schema.type) {
    const t = typeOf(value)
    const expected = Array.isArray(schema.type) ? schema.type : [schema.type]
    // JSON Schema "integer" maps to JS number; treat number/integer loosely.
    const ok = expected.some((e) => {
      if (e === 'integer')
        return t === 'number' && Number.isInteger(value)
      return e === t
    })
    if (!ok) {
      errors.push(`${path}: expected type ${expected.join('|')}, got ${t}`)
      return
    }
  }

  if (schema.enum && !schema.enum.includes(value))
    errors.push(`${path}: value ${JSON.stringify(value)} not in enum ${JSON.stringify(schema.enum)}`)

  if (typeOf(value) === 'object') {
    if (Array.isArray(schema.required)) {
      for (const key of schema.required) {
        if (!(key in value))
          errors.push(`${path}: missing required property "${key}"`)
      }
    }
    if (schema.properties) {
      if (schema.additionalProperties === false) {
        for (const key of Object.keys(value)) {
          if (!(key in schema.properties))
            errors.push(`${path}: unexpected property "${key}"`)
        }
      }
      for (const [key, sub] of Object.entries(schema.properties)) {
        if (key in value)
          validateNode(value[key], sub, rootSchema, `${path}.${key}`)
      }
    }
  }

  if (typeOf(value) === 'array' && schema.items) {
    value.forEach((item, i) => validateNode(item, schema.items, rootSchema, `${path}[${i}]`))
  }
}

export function validateAgainstSchema(data, schema, label) {
  const before = errors.length
  validateNode(data, schema, schema, label)
  return errors.length === before
}

// ---------------------------------------------------------------------------
// Cross-file / semantic assertions.
// ---------------------------------------------------------------------------
export function validateConsistency(services, categories, offices, agencies, officials) {
  const before = errors.length
  const serviceList = services?.services ?? []
  const categoryList = categories?.categories ?? []
  const officeGroupList = offices?.officeGroups ?? []
  const officeList = offices?.offices ?? []
  const agencyList = agencies?.agencies ?? []
  const headList = officials?.departmentHeads ?? []

  const categoryIds = new Set(categoryList.map(c => c.id))
  const officeGroupIds = new Set(officeGroupList.map(g => g.id))
  // Includes hidden Offices on purpose: a Service may reference an Office that
  // is intentionally not yet rendered (hidden: true). The reference stays valid;
  // getOfficeForService just resolves it to undefined so no card shows.
  const officeIds = new Set(officeList.map(o => o.id))
  const agencyIds = new Set(agencyList.map(a => a.id))

  // Duplicate agency ids
  const seenAgency = new Set()
  for (const a of agencyList) {
    if (seenAgency.has(a.id))
      errors.push(`agencies.json: duplicate agency id "${a.id}"`)
    seenAgency.add(a.id)
  }

  // Duplicate office group ids
  const seenGroup = new Set()
  for (const g of officeGroupList) {
    if (seenGroup.has(g.id))
      errors.push(`offices.json: duplicate office group id "${g.id}"`)
    seenGroup.add(g.id)
  }

  // Duplicate office ids
  const seenOffice = new Set()
  // An abbreviation is an identifier residents read on the card, so two Offices
  // sharing one is ambiguous (City Assessor's and City Agriculture Office both
  // carried "CAO" before #199 surfaced it by rendering the field).
  const seenAbbreviation = new Map()
  for (const o of officeList) {
    if (seenOffice.has(o.id))
      errors.push(`offices.json: duplicate office id "${o.id}"`)
    seenOffice.add(o.id)

    if (o.abbreviation) {
      const owner = seenAbbreviation.get(o.abbreviation)
      if (owner)
        errors.push(`offices.json: office "${o.id}" reuses abbreviation "${o.abbreviation}" already used by "${owner}"`)
      else
        seenAbbreviation.set(o.abbreviation, o.id)
    }

    // Every Office belongs to exactly one (known) Office Group.
    if (!officeGroupIds.has(o.groupId))
      errors.push(`offices.json: office "${o.id}" references unknown groupId "${o.groupId}"`)
  }

  // --- officials.json <-> offices.json (#199, ADR-0003) --------------------
  // Office identity/description/contact has exactly one home (offices.json);
  // officials.json holds people who reference an Office by id.
  if (officials) {
    // The retired duplicate surface must not come back.
    if (officials.departments) {
      errors.push(
        'officials.json: `departments` is retired (ADR-0003) — a department head is an Official with `officeId`; office identity/contact lives in offices.json',
      )
    }

    const allOfficials = [
      ...(officials.executive ?? []),
      ...(officials.legislative ?? []),
      ...headList,
    ]

    // Duplicate official ids, across every people array.
    const seenOfficial = new Set()
    for (const p of allOfficials) {
      if (seenOfficial.has(p.id))
        errors.push(`officials.json: duplicate official id "${p.id}"`)
      seenOfficial.add(p.id)
    }

    // An office is headed by at most one person, and that office must exist.
    const seenHeadedOffice = new Set()
    for (const h of headList) {
      if (!h.officeId) {
        errors.push(`officials.json: department head "${h.id}" is missing \`officeId\``)
        continue
      }
      if (!officeIds.has(h.officeId))
        errors.push(`officials.json: department head "${h.id}" references unknown officeId "${h.officeId}"`)
      if (seenHeadedOffice.has(h.officeId))
        errors.push(`officials.json: office "${h.officeId}" has more than one department head`)
      seenHeadedOffice.add(h.officeId)
    }
  }

  // Duplicate category ids
  const seenCat = new Set()
  for (const c of categoryList) {
    if (seenCat.has(c.id))
      errors.push(`categories.json: duplicate category id "${c.id}"`)
    seenCat.add(c.id)
  }

  // Duplicate service ids
  const seenSvc = new Set()
  for (const s of serviceList) {
    if (seenSvc.has(s.id))
      errors.push(`services.json: duplicate service id "${s.id}"`)
    seenSvc.add(s.id)
  }

  for (const s of serviceList) {
    // Unknown categoryId
    if (s.categoryId && !categoryIds.has(s.categoryId))
      errors.push(`services.json: service "${s.id}" references unknown categoryId "${s.categoryId}"`)

    // A providedBy ref must resolve to a known Office (Service -> Office).
    if (s.providedBy && !officeIds.has(s.providedBy))
      errors.push(`services.json: service "${s.id}" references unknown providedBy office "${s.providedBy}"`)

    // A providedByAgency ref must resolve to a known Agency (Service -> Agency, ADR-0004).
    if (s.providedByAgency && !agencyIds.has(s.providedByAgency))
      errors.push(`services.json: service "${s.id}" references unknown providedByAgency agency "${s.providedByAgency}"`)

    // A Service has at most one responsible-body tier (Office / Agency / Barangay).
    // Zero is valid — the rule is "at most one", never "exactly one" (ADR-0004).
    const tierCount = [s.providedBy, s.providedByAgency, s.providedByBarangay]
      .filter(v => v !== undefined && v !== false)
      .length
    if (tierCount > 1) {
      errors.push(
        `services.json: service "${s.id}" sets more than one responsible-body tier (providedBy / providedByAgency / providedByBarangay must be mutually exclusive)`,
      )
    }

    // A detail-bearing Service must resolve to its own /service-details/<id>.
    // (The inverse — a no-detail Service pointing at /service-details/ — is NOT
    // an error during the transition: some details still live in TS and migrate
    // per category in #189. Once that's done, that inverse becomes enforceable.)
    if (s.detail && s.url !== `/service-details/${s.id}`) {
      errors.push(
        `services.json: service "${s.id}" has \`detail\` but url "${s.url}" is not "/service-details/${s.id}"`,
      )
    }
  }

  return errors.length === before
}

function main() {
  const services = readJson(resolve(configDir, 'services.json'))
  const categories = readJson(resolve(configDir, 'categories.json'))
  const offices = readJson(resolve(configDir, 'offices.json'))
  const agencies = readJson(resolve(configDir, 'agencies.json'))
  const officials = readJson(resolve(configDir, 'officials.json'))
  const servicesSchema = readJson(resolve(schemaDir, 'services.schema.json'))
  const categoriesSchema = readJson(resolve(schemaDir, 'categories.schema.json'))
  const officesSchema = readJson(resolve(schemaDir, 'offices.schema.json'))
  const agenciesSchema = readJson(resolve(schemaDir, 'agencies.schema.json'))

  if (services && servicesSchema)
    validateAgainstSchema(services, servicesSchema, 'services.json')
  if (categories && categoriesSchema)
    validateAgainstSchema(categories, categoriesSchema, 'categories.json')
  if (offices && officesSchema)
    validateAgainstSchema(offices, officesSchema, 'offices.json')
  if (agencies && agenciesSchema)
    validateAgainstSchema(agencies, agenciesSchema, 'agencies.json')
  if (services && categories)
    validateConsistency(services, categories, offices, agencies, officials)

  if (errors.length > 0) {
    console.error(`\n✖ Config validation failed with ${errors.length} error(s):\n`)
    for (const e of errors)
      console.error(`  - ${e}`)
    console.error('')
    process.exit(1)
  }

  console.log('✔ Config validation passed (services.json, categories.json, offices.json, agencies.json, officials.json)')
}

// Run only when executed directly (allows importing the pure functions in tests).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main()
