#!/usr/bin/env node
// Zero-dependency config validator for the canonical Service spine (#184).
//
// Validates app/config/services.json and app/config/categories.json against
// their JSON Schemas (app/config/schema/*.schema.json) using a hand-rolled,
// minimal draft-07 subset, then runs cross-file consistency assertions that a
// pure schema cannot express (unknown categoryId, duplicate ids, url/detail
// coherence).
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
export function validateConsistency(services, categories) {
  const before = errors.length
  const serviceList = services?.services ?? []
  const categoryList = categories?.categories ?? []

  const categoryIds = new Set(categoryList.map(c => c.id))

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
  const servicesSchema = readJson(resolve(schemaDir, 'services.schema.json'))
  const categoriesSchema = readJson(resolve(schemaDir, 'categories.schema.json'))

  if (services && servicesSchema)
    validateAgainstSchema(services, servicesSchema, 'services.json')
  if (categories && categoriesSchema)
    validateAgainstSchema(categories, categoriesSchema, 'categories.json')
  if (services && categories)
    validateConsistency(services, categories)

  if (errors.length > 0) {
    console.error(`\n✖ Config validation failed with ${errors.length} error(s):\n`)
    for (const e of errors)
      console.error(`  - ${e}`)
    console.error('')
    process.exit(1)
  }

  console.log('✔ Config validation passed (services.json, categories.json)')
}

// Run only when executed directly (allows importing the pure functions in tests).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main()
