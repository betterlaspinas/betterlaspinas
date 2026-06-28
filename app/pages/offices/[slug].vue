<script setup lang="ts">
usePageOgImage()

const route = useRoute()
const slug = route.params.slug as string

// Canonical Office detail: resolved by Office id directly (own /offices/<id>
// route namespace, #207). An Office is a place + contact + the Services it
// provides — NOT a Service-shaped transaction page, so this renders a
// directory-record layout (identity, contact, visit, services) rather than the
// process/requirements/FAQ shape used by /service-details.
const office = getOfficeBySlug(slug)
if (!office) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Office not found',
    fatal: true,
  })
}

const groupName = computed(() => getOfficeGroupBySlug(office.groupId)?.name ?? '')

// Services this Office provides (via `providedBy`). Each links to its own
// /service-details page ONLY when that Service has a `detail` block; catalog-
// only Services have no page and render as a plain, non-clickable card.
// `office.additionalServices` are office-only offerings that are not Service
// records yet (no page, absent from search): appended as plain cards, deduped
// by name so a graduated service never appears twice.
const services = computed(() => {
  const provided = getAllServices()
    .filter(s => s.providedBy === office.id && !s.hidden)
    .map(s => ({ name: s.title, link: s.detail ? `/service-details/${s.id}` : undefined }))
  const providedNames = new Set(provided.map(s => s.name))
  const extra = (office.additionalServices ?? [])
    .filter(name => !providedNames.has(name))
    .map(name => ({ name, link: undefined as string | undefined }))
  return [...provided, ...extra]
})

// No geo data on the Office schema — link to Google Maps by address.
const mapsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.location ?? office.name)}`,
)
</script>

<template>
  <div>
    <UiBreadcrumbs
      :items="[
        { label: 'Government', href: '/government' },
        { label: office.name },
      ]"
    />

    <div class="container mx-auto px-4 pb-12 max-w-5xl">
      <!-- identity header + quick actions -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-5 py-6">
        <div>
          <UiBadge v-if="groupName" :text="groupName" icon="bi-people" variant="primary" size="sm" class="mb-2" />
          <div class="flex items-center gap-4">
            <div class="flex-none w-14 h-14 rounded-xl bg-primary-100 text-primary-600 grid place-items-center text-2xl">
              <i :class="`bi ${office.icon || 'bi-building'}`" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 leading-tight">
                {{ office.name }}
              </h1>
              <p class="text-gray-500 mt-1 max-w-xl">
                {{ office.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 md:flex-col md:items-stretch">
          <UiButton v-if="office.phone" :href="`tel:${office.phone}`" size="sm" class="md:w-44">
            <i class="bi bi-telephone-fill" /> Call office
          </UiButton>
          <UiButton :href="mapsUrl" variant="outline" size="sm" class="md:w-44" target="_blank">
            <i class="bi bi-geo-alt-fill" /> Get directions
          </UiButton>
          <UiButton v-if="office.email" :href="`mailto:${office.email}`" variant="soft" size="sm" class="md:w-44">
            <i class="bi bi-envelope-fill" /> Send email
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
            <div v-if="office.phone" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Phone
              </dt>
              <dd class="text-gray-900">
                {{ office.phone }}
              </dd>
            </div>
            <div v-if="office.mobile" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Mobile
              </dt>
              <dd class="text-gray-900">
                {{ office.mobile }}
              </dd>
            </div>
            <div v-if="office.email" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Email
              </dt>
              <dd><a :href="`mailto:${office.email}`" class="text-primary-600 hover:underline">{{ office.email }}</a></dd>
            </div>
            <div v-if="office.facebook" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0 last:pb-0">
              <dt class="text-gray-500 font-medium">
                Facebook
              </dt>
              <dd><a :href="office.facebook" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">Facebook Page</a></dd>
            </div>
          </dl>
        </UiCard>

        <UiCard>
          <h2 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="bi bi-geo-alt text-primary-600" /> Visit us
          </h2>
          <dl class="divide-y divide-gray-200">
            <div v-if="office.location" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0">
              <dt class="text-gray-500 font-medium">
                Address
              </dt>
              <dd class="text-gray-900">
                {{ office.location }}
              </dd>
            </div>
            <div v-if="office.hours" class="grid grid-cols-[110px_1fr] gap-3 py-3 text-sm first:pt-0 last:pb-0">
              <dt class="text-gray-500 font-medium">
                Office hours
              </dt>
              <dd class="text-gray-900">
                {{ office.hours }}
              </dd>
            </div>
          </dl>
        </UiCard>
      </div>

      <!-- services at this office -->
      <section v-if="services.length > 0" class="mt-8">
        <div class="flex items-baseline justify-between mb-4">
          <h2 class="font-semibold text-gray-900">
            Services at this office
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

      <!-- back link -->
      <NuxtLink to="/government" class="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600">
        <i class="bi bi-arrow-left" /> All government offices
      </NuxtLink>
    </div>
  </div>
</template>
