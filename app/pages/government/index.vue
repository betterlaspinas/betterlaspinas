<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { lguName, labels, officials, subdivisions, formatPhoneLink } = useConfig()

useHead({
  title: 'Government',
})

// Get executive officials
const leader = computed(() => officials.executive.find(
  (o: any) => o.position === 'mayor' || o.position === 'governor',
))
const viceLeader = computed(() => officials.executive.find(
  (o: any) => o.position === 'vice_mayor' || o.position === 'vice_governor',
))

// Get legislative members
const sbMembers = computed(() => officials.legislative.filter(
  (o: any) => o.position === 'sb_member' || o.position === 'board_member',
))
const ligaPresident = computed(() => officials.legislative.find(
  (o: any) => o.position === 'liga_president',
))
const skPresident = computed(() => officials.legislative.find(
  (o: any) => o.position === 'sk_president',
))
const ipmr = computed(() => officials.legislative.find((o: any) => o.position === 'ipmr'))
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Government' }]" />

    <UiPageHero
      badge-icon="bi-building-fill"
      badge-text="Government"
      title="Government Structure & Officials"
      :description="`Meet the leadership and offices serving ${lguName}`"
    />

    <!-- Executive Branch -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          :title="`${labels.lguTypeLabel} Leadership`"
          :description="`The executive officials leading ${lguName}'s governance`"
          badge-icon="bi-star-fill"
          badge-text="Executive Branch"
          badge-class="bg-primary-600 text-white"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Leader -->
          <UiCard padding="p-0" interactive class="overflow-hidden">
            <div class="bg-primary-600 text-white p-6 text-center">
              <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                {{ labels.lguTypeLabel }} {{ labels.leaderTitle }}
              </span>
              <h3 class="text-xl font-semibold">
                {{ leader?.name ? `Hon. ${leader.name}` : 'To be updated' }}
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <a
                v-if="leader?.email"
                :href="`mailto:${leader.email}`"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <i class="bi bi-envelope text-primary-600" />
                {{ leader.email }}
              </a>
              <a
                v-if="leader?.phone"
                :href="`tel:${formatPhoneLink(leader.phone)}`"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <i class="bi bi-telephone text-primary-600" />
                {{ leader.phone }}
              </a>
              <span class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                <i class="bi bi-clock text-primary-600" /> Mon-Fri: 8:00 AM - 5:00 PM
              </span>
            </div>
          </UiCard>

          <!-- Vice Leader -->
          <UiCard padding="p-0" interactive class="overflow-hidden">
            <div class="bg-primary-600 text-white p-6 text-center">
              <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                {{ labels.lguTypeLabel }} {{ labels.viceLeaderTitle }}
              </span>
              <h3 class="text-xl font-semibold">
                {{ viceLeader?.name ? `Hon. ${viceLeader.name}` : 'To be updated' }}
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <a
                v-if="viceLeader?.email"
                :href="`mailto:${viceLeader.email}`"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <i class="bi bi-envelope text-primary-600" />
                {{ viceLeader.email }}
              </a>
              <a
                v-if="viceLeader?.phone"
                :href="`tel:${formatPhoneLink(viceLeader.phone)}`"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <i class="bi bi-telephone text-primary-600" />
                {{ viceLeader.phone }}
              </a>
              <span class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                <i class="bi bi-clock text-primary-600" /> Mon-Fri: 8:00 AM - 5:00 PM
              </span>
            </div>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Legislative Branch -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          :title="`${labels.legislativeBody} Members`"
          :description="`${labels.legislativeMembers} serving the people of ${lguName}`"
          badge-icon="bi-people-fill"
          badge-text="Legislative Branch"
          badge-class="bg-primary-600 text-white"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="member in sbMembers"
            :key="member.id"
            interactive
          >
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ member.name ? `Hon. ${member.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {{ labels.legislativeMembers.replace(/s$/, '') }}
            </span>
            <p v-if="member.committees" class="text-sm text-gray-500">
              {{ member.committees }}
            </p>
          </UiCard>

          <UiCard v-if="ligaPresident" interactive class="border-green-200 hover:border-green-500">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ ligaPresident.name ? `Hon. ${ligaPresident.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {{ ligaPresident.title }}
            </span>
            <p v-if="ligaPresident.committees" class="text-sm text-gray-500">
              {{ ligaPresident.committees }}
            </p>
          </UiCard>

          <UiCard v-if="skPresident" interactive class="border-yellow-200 hover:border-yellow-500">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ skPresident.name ? `Hon. ${skPresident.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {{ skPresident.title }}
            </span>
            <p v-if="skPresident.committees" class="text-sm text-gray-500">
              {{ skPresident.committees }}
            </p>
          </UiCard>

          <UiCard v-if="ipmr" interactive class="border-purple-200 hover:border-purple-500">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ ipmr.name ? `Hon. ${ipmr.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              IPMR
            </span>
            <p v-if="ipmr.committees" class="text-sm text-gray-500">
              {{ ipmr.committees }}
            </p>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Department Heads -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          title="Department Heads & Key Offices"
          :description="`${labels.deptPrefix} offices providing services to citizens`"
          badge-icon="bi-building-fill"
          :badge-text="`${labels.deptPrefix} Offices`"
          badge-class="bg-primary-600 text-white"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- TODO: Add back when available -->
          <!-- <NuxtLink
            v-for="dept in officials.departments"
            :key="dept.id"
            :to="`/service-details/${dept.slug}`"
            class="group bg-white border border-gray-200 rounded-xl p-6 no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white">
                <i class="bi" :class="[dept.icon]" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-semibold text-gray-900 mb-1">
                  {{ dept.department }}
                </h4>
                <p class="text-sm text-gray-500 mb-3">
                  {{ dept.description }}
                </p>
                <div class="space-y-1 text-xs text-gray-500">
                  <span v-if="dept.phone" class="flex items-center gap-1">
                    <i class="bi bi-telephone" /> {{ dept.phone }}
                  </span>
                  <span v-if="dept.email" class="flex items-center gap-1">
                    <i class="bi bi-envelope" /> {{ dept.email }}
                  </span>
                </div>
                <span class="inline-flex items-center gap-1 text-primary-600 font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                  View Services <i class="bi bi-arrow-right" />
                </span>
              </div>
            </div>
          </NuxtLink> -->

          <!-- Current active block with links temporarily removed -->
          <UiCard
            v-for="dept in officials.departments"
            :key="dept.id"
            interactive
            class="group"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0 transition-all duration-200">
                <i class="bi" :class="[dept.icon]" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-semibold text-gray-900 mb-1">
                  {{ dept.department }}
                </h4>
                <p class="text-sm text-gray-500 mb-3">
                  {{ dept.description }}
                </p>
                <div class="space-y-1 text-xs text-gray-500">
                  <span v-if="dept.phone" class="flex items-center gap-1">
                    <i class="bi bi-telephone" /> {{ dept.phone }}
                  </span>
                  <span v-if="dept.email" class="flex items-center gap-1">
                    <i class="bi bi-envelope" /> {{ dept.email }}
                  </span>
                </div>
              </div>
            </div>
          </UiCard>
          <!-- End of current active block -->
        </div>
      </div>
    </section>

    <!-- Subdivisions -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <UiSectionHeader
          :title="`${labels.subdivisionTypePlural} of ${lguName}`"
          :description="`${subdivisions.count} ${labels.subdivisionTypePlural} serving our community`"
          badge-icon="bi-geo-alt-fill"
          :badge-text="labels.subdivisionTypePlural"
          badge-class="bg-primary-600 text-white"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <UiCard
            v-for="item in subdivisions.items"
            :key="item.id"
            :href="item.phone ? `tel:${formatPhoneLink(item.phone)}` : '#'"
            padding="p-4"
            interactive
          >
            <div class="flex items-center gap-3 mb-2">
              <i class="bi bi-geo-alt-fill text-primary-600" />
              <span class="font-semibold text-gray-900">
                {{ item.name }}
              </span>
            </div>
            <div class="text-sm text-gray-500">
              <span class="block">{{ item.leader }}</span>
              <span v-if="item.phone" class="flex items-center gap-1 mt-1 text-primary-600">
                <i class="bi bi-telephone" /> {{ item.phone }}
              </span>
            </div>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>
