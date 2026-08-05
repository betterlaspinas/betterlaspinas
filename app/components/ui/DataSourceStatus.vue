<script setup lang="ts">
import type { SourceRef } from '~/types/config'

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
 *  2. `sources` present, no `verifiedOn` — the citation renders, and states
 *     plainly that it was matched to the record after the fact rather than
 *     recorded by whoever transcribed it, and has not yet been confirmed
 *     against the original.
 *  3. `sources` present with `verifiedOn` — citation plus the checked-on
 *     date.
 *
 * No checkmark or badge in any state — a tick would read as certification
 * this site cannot grant.
 */
defineProps<{
  sources: SourceRef[]
  verifiedOn: string | null
  checkedOn: string
  /** Subject of row 1's copy — "this office's details" / "this service's details". */
  subject: 'office' | 'service'
}>()
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
      </li>
    </ul>
    <p v-if="verifiedOn" class="text-sm text-gray-600">
      Checked against source {{ checkedOn }}.
    </p>
    <p v-else class="text-sm text-gray-600">
      Matched to {{ sources.length > 1 ? 'these documents' : 'this document' }} after the fact. Not yet confirmed against the original.
    </p>
  </template>
  <p v-else class="text-sm text-gray-600">
    We're still documenting where this {{ subject }}'s details came from. Confirm with the office before relying on them.
  </p>
</template>
