<script setup lang="ts">
import type { SourceRef } from '~/types/config'
import { formatCheckedOn } from '~/composables/useDataSources'

/**
 * Body of the "Data source" card shared by the Office and Service detail
 * pages (#243, ADR-0005). `sources` (where the data came from) and
 * `verifiedOn` (whether we re-checked it) are independent facts, so this
 * renders three distinct states rather than gating the citation behind
 * verification:
 *
 *  1. no `sources` at all — we haven't recorded where this came from yet.
 *     The hedge names OUR documentation backlog, never the data's
 *     reliability: the phone number is probably fine, we just haven't
 *     written down its origin.
 *  2. `sources` present, none carry `verifiedOn` — the citation renders, and
 *     states plainly that no check is on record for it yet.
 *  3. at least one source carries `verifiedOn` — citation plus the
 *     checked-on date. With a single source this is a record-level
 *     statement (`verifiedOn`/`checkedOn` props). With more than one
 *     source, `verifiedOn` on the record is only the most recent across
 *     them (`useDataSources`), so a per-source status is rendered inline —
 *     otherwise one checked source next to one unchecked source would read
 *     as both having been checked.
 *
 * No checkmark or badge in any state — a tick would read as certification
 * this site cannot grant.
 */
const props = defineProps<{
  sources: SourceRef[]
  verifiedOn: string | null
  checkedOn: string
  /** Subject of row 1's copy — "this office's details" / "this service's details". */
  subject: 'office' | 'service'
}>()

/** True when no source in the list carries its own `verifiedOn` — the "nothing checked yet" case. */
const allUnverified = computed(() => props.sources.every(source => !source.verifiedOn))
</script>

<template>
  <template v-if="sources.length > 0">
    <ul class="space-y-1 mb-3">
      <li v-for="(source, i) in sources" :key="`${source.name}-${i}`" class="text-sm">
        <a
          v-if="source.url"
          :href="source.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {{ source.name }}
          <i class="bi bi-box-arrow-up-right text-xs" />
        </a>
        <!-- plain text when the city does not publish the document online; an
             absent link never downgrades a record (#238) -->
        <span v-else class="font-medium text-gray-900">{{ source.name }}</span>
        <!-- per-source status: only needed once there's more than one source and
             they don't all share the same (un)verified state, otherwise the
             record-level line below already tells the whole story -->
        <span v-if="sources.length > 1 && !allUnverified" class="block text-xs text-gray-500">
          {{ source.verifiedOn ? `Checked ${formatCheckedOn(source.verifiedOn)}.` : 'No check recorded yet.' }}
        </span>
      </li>
    </ul>
    <p v-if="sources.length === 1 && verifiedOn" class="text-sm text-gray-600">
      Checked against source {{ checkedOn }}.
    </p>
    <p v-else-if="sources.length === 1" class="text-sm text-gray-600">
      Sourced from this document. No check recorded yet.
    </p>
    <p v-else-if="allUnverified" class="text-sm text-gray-600">
      Sourced from these documents. No check recorded yet.
    </p>
    <p v-else class="text-sm text-gray-600">
      Sourced from these documents.
    </p>
  </template>
  <p v-else class="text-sm text-gray-600">
    We're still documenting where this {{ subject }}'s details came from. Confirm with the office before relying on them.
  </p>
</template>
