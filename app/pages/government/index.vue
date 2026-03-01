<script setup lang="ts">
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useConfig } from '@/composables/useConfig'

const { lguName, labels, officials, subdivisions, formatPhoneLink } = useConfig()

const { getFullSiteTitle, getOpenGraphUrl } = useConfig()

const seoDesc = computed(() => `Meet the leadership and offices serving ${lguName.value}. View the executive, legislative, and department heads of the ${labels.value.lguTypeLabel}.`)

useHead({
  title: 'Government',
})

useSeoMeta({
  description: () => seoDesc.value,
  ogTitle: () => getFullSiteTitle('Government'),
  ogDescription: () => seoDesc.value,
  ogType: 'website',
  ogUrl: () => `${getOpenGraphUrl()}government`,
  twitterCard: 'summary',
  twitterTitle: () => getFullSiteTitle('Government'),
  twitterDescription: () => seoDesc.value,
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

    <!-- Page Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="bi bi-building-fill" /> Government
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Government Structure & Officials
          </h1>
          <p class="text-lg text-white/90">
            Meet the leadership and offices serving {{ lguName }}
          </p>
        </div>
      </div>
    </section>

    <!-- Executive Branch -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-star-fill" /> Executive Branch
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ labels.lguTypeLabel }} Leadership
          </h2>
          <p class="text-gray-500">
            The executive officials leading {{ lguName }}'s governance
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Leader -->
          <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-lg">
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
          </div>

          <!-- Vice Leader -->
          <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-lg">
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
          </div>
        </div>
      </div>
    </section>

    <!-- Legislative Branch -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-people-fill" /> Legislative Branch
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ labels.legislativeBody }} Members
          </h2>
          <p class="text-gray-500">
            {{ labels.legislativeMembers }} serving the people of {{ lguName }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="member in sbMembers"
            :key="member.id"
            class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
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
          </div>

          <div v-if="ligaPresident" class="bg-white border border-green-200 rounded-xl p-6 transition-all duration-200 hover:border-green-500 hover:shadow-md">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ ligaPresident.name ? `Hon. ${ligaPresident.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {{ ligaPresident.title }}
            </span>
            <p v-if="ligaPresident.committees" class="text-sm text-gray-500">
              {{ ligaPresident.committees }}
            </p>
          </div>

          <div v-if="skPresident" class="bg-white border border-yellow-200 rounded-xl p-6 transition-all duration-200 hover:border-yellow-500 hover:shadow-md">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ skPresident.name ? `Hon. ${skPresident.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {{ skPresident.title }}
            </span>
            <p v-if="skPresident.committees" class="text-sm text-gray-500">
              {{ skPresident.committees }}
            </p>
          </div>

          <div v-if="ipmr" class="bg-white border border-purple-200 rounded-xl p-6 transition-all duration-200 hover:border-purple-500 hover:shadow-md">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ ipmr.name ? `Hon. ${ipmr.name}` : 'To be updated' }}
            </h4>
            <span class="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              IPMR
            </span>
            <p v-if="ipmr.committees" class="text-sm text-gray-500">
              {{ ipmr.committees }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Department Heads -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-building-fill" /> {{ labels.deptPrefix }} Offices
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Department Heads & Key Offices
          </h2>
          <p class="text-gray-500">
            {{ labels.deptPrefix }} offices providing services to citizens
          </p>
        </div>

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
          <div
            v-for="dept in officials.departments"
            :key="dept.id"
            class="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
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
          </div>
          <!-- End of current active block -->
        </div>
      </div>
    </section>

    <!-- Subdivisions -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium mb-3">
            <i class="bi bi-geo-alt-fill" />
            {{ labels.subdivisionTypePlural }}
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ labels.subdivisionTypePlural }} of {{ lguName }}
          </h2>
          <p class="text-gray-500">
            {{ subdivisions.count }} {{ labels.subdivisionTypePlural }} serving our community
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <a
            v-for="item in subdivisions.items"
            :key="item.id"
            :href="item.phone ? `tel:${formatPhoneLink(item.phone)}` : '#'"
            class="bg-white border border-gray-200 rounded-xl p-4 no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-md"
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
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
