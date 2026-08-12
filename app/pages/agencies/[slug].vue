<script setup lang="ts">
usePageOgImage()

const route = useRoute()

// Page resolution lives behind the View resolver seam (ADR-0002): the facade
// resolves the Agency, the Services it provides and the maps link; the page
// only renders and guards. An Agency is a national government office
// physically present in the city (ADR-0004) — Office-shaped (identity,
// contact, location, services), so this mirrors the Office detail page
// (#207) rather than inventing a second layout.
const view = agencyView(route.params.slug as string)
if (!view) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Agency not found',
    fatal: true,
  })
}

const { agency, services, mapsUrl } = view

// Trust is derived from provenance, never asserted by a flag (#243, ADR-0005).
const { sources, verifiedOn, checkedOn } = useDataSources(agency)
</script>

<template>
  <div>
    <UiBreadcrumbs
      :items="[
        { label: 'Government', href: '/government' },
        { label: agency.name },
      ]"
    />

    <div class="container mx-auto px-4 pb-12 max-w-5xl">
      <!-- identity header + quick actions -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-5 py-6">
        <div>
          <UiBadge text="National government agency" icon="bi-flag" variant="primary" size="sm" class="mb-2" />
          <div class="flex items-center gap-4">
            <div class="flex-none w-14 h-14 rounded-xl bg-primary-100 text-primary-600 grid place-items-center text-2xl">
              <i class="bi" :class="agency.icon || 'bi-building'" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 leading-tight">
                {{ agency.name }}
              </h1>
              <p class="text-gray-500 mt-1 max-w-xl">
                {{ agency.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 md:flex-col md:items-stretch">
          <UiButton v-if="agency.phone" :href="`tel:${agency.phone}`" size="sm" class="md:w-44">
            <i class="bi bi-telephone-fill" /> Call agency
          </UiButton>
          <UiButton :href="mapsUrl" variant="outline" size="sm" class="md:w-44" target="_blank">
            <i class="bi bi-geo-alt-fill" /> Get directions
          </UiButton>
        </div>
      </div>

      <!-- split: contact + visit -->
      <div class="grid md:grid-cols-2 gap-6">
        <UiCard>
          <h2 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="bi bi-person-rolodex text-primary-600" /> Contact details
          </h2>
          <dl class="divide-y divide-gray-200">
            <div v-if="agency.phone" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Phone
              </dt>
              <dd class="text-gray-900">
                {{ agency.phone }}
              </dd>
            </div>
            <div v-if="agency.facebook" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0 last:pb-0">
              <dt class="text-gray-500 font-medium">
                Facebook
              </dt>
              <dd><a :href="agency.facebook" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">Facebook Page</a></dd>
            </div>
            <p v-if="!agency.phone && !agency.facebook" class="text-sm text-gray-500">
              No contact details on record.
            </p>
          </dl>
        </UiCard>

        <UiCard>
          <h2 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="bi bi-geo-alt text-primary-600" /> Visit us
          </h2>
          <dl class="divide-y divide-gray-200">
            <div v-if="agency.location" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Address
              </dt>
              <dd class="text-gray-900">
                {{ agency.location }}
              </dd>
            </div>
            <div v-if="agency.hours" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0 last:pb-0">
              <dt class="text-gray-500 font-medium">
                Hours
              </dt>
              <dd class="text-gray-900">
                {{ agency.hours }}
              </dd>
            </div>
          </dl>
        </UiCard>
      </div>

      <!-- services at this agency -->
      <section v-if="services.length > 0" class="mt-8">
        <div class="flex items-baseline justify-between mb-4">
          <h2 class="font-semibold text-gray-900">
            Services at this agency
          </h2>
          <span class="text-sm text-gray-500">{{ services.length }} {{ services.length === 1 ? 'service' : 'services' }}</span>
        </div>
        <div class="grid sm:grid-cols-2 gap-3">
          <component
            :is="s.link ? 'NuxtLink' : 'div'"
            v-for="s in services" :key="s.name" :to="s.link"
            class="group flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 transition"
            :class="s.link ? 'hover:border-primary-300 hover:bg-primary-50' : 'cursor-default'"
          >
            <span class="flex items-center gap-3 text-sm font-medium text-gray-900">
              <i class="bi bi-file-earmark-text text-primary-600" /> {{ s.name }}
            </span>
            <i v-if="s.link" class="bi bi-arrow-right text-gray-400 group-hover:text-primary-600 transition" />
          </component>
        </div>
      </section>

      <!--
        data source / verification — always rendered. Absence of provenance is
        itself information: silence would read as "nothing to disclose" on the
        records we know least about (#243).
      -->
      <UiCard class="mt-8 bg-gray-50">
        <h2 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <i class="bi bi-patch-check text-primary-600" />
          {{ sources.length > 1 ? 'Data sources' : 'Data source' }}
        </h2>
        <UiDataSourceStatus :sources="sources" :verified-on="verifiedOn" :checked-on="checkedOn" subject="agency" />
      </UiCard>

      <!-- back link: matches the crumb above (Government, not Services) and
           Office's own back link shape ("All government offices" -> /government). -->
      <NuxtLink to="/government" class="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600">
        <i class="bi bi-arrow-left" /> All national agencies
      </NuxtLink>
    </div>
  </div>
</template>
