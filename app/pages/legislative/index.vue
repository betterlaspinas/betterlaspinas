<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'

const { lguName, labels } = useConfig()

const activeTab = ref('ordinances')

const ordinanceSteps = computed(() => [
  {
    num: '01',
    icon: 'bi-file-earmark-plus',
    title: 'File Proposed Ordinance',
    desc: `Submit the proposed ordinance to the ${labels.value.legislativeBody} for consideration`,
  },
  {
    num: '02',
    icon: 'bi-book',
    title: 'First Reading / Referral to Committee',
    desc: 'Initial reading and assignment to the relevant committee for review',
  },
  {
    num: '03',
    icon: 'bi-people',
    title: 'Public Hearing / Committee Action',
    desc: 'Committee conducts public hearing and deliberates on the proposed ordinance',
  },
  {
    num: '04',
    icon: 'bi-file-text',
    title: 'Committee Report',
    desc: `Committee submits findings and recommendations to the ${labels.value.legislativeBody}`,
  },
  {
    num: '05',
    icon: 'bi-journal-text',
    title: 'Second Reading',
    desc: 'Detailed discussion and debate on the proposed ordinance',
  },
  {
    num: '06',
    icon: 'bi-check2-square',
    title: 'Third and Final Reading',
    desc: `Final voting on the proposed ordinance by the ${labels.value.legislativeBody}`,
  },
  {
    num: '07',
    icon: 'bi-calendar-check',
    title: `10-Day ${labels.value.leaderTitle}'s Approval`,
    desc: `${labels.value.leaderTitle} reviews and approves the enacted ordinance within 10 days`,
  },
  {
    num: '08',
    icon: 'bi-send',
    title: '3-Day Submission to SP',
    desc: 'Submit approved ordinance to Sangguniang Panlalawigan for review within 3 days',
  },
  {
    num: '09',
    icon: 'bi-hourglass-split',
    title: 'SP Review Period',
    desc: '60-day review for appropriation ordinances; 30-day review for others',
  },
  {
    num: '10',
    icon: 'bi-megaphone',
    title: 'Posting / Publication',
    desc: 'Public posting and publication of the approved ordinance',
  },
  {
    num: '11',
    icon: 'bi-rocket-takeoff',
    title: 'Implementation',
    desc: `Ordinance takes effect and is enforced within the ${labels.value.lguTypeLabel.toLowerCase()}`,
    final: true,
  },
])

const resolutionSteps = computed(() => [
  {
    num: '01',
    icon: 'bi-file-earmark-plus',
    title: 'File Proposed Resolution',
    desc: `Submit the proposed resolution to the ${labels.value.legislativeBody}`,
  },
  {
    num: '02',
    icon: 'bi-calendar-event',
    title: 'Inclusion in Session Agenda',
    desc: `Resolution is scheduled for inclusion in the ${labels.value.legislativeBody} session`,
  },
  {
    num: '03',
    icon: 'bi-people-fill',
    title: 'Committee Meeting / Approval',
    desc: 'Committee reviews and approves the proposed resolution',
  },
  {
    num: '04',
    icon: 'bi-printer',
    title: 'Final Draft Printing',
    desc: 'Legislative staff prepares and prints the final draft of the resolution',
  },
  {
    num: '05',
    icon: 'bi-pen',
    title: 'Official Signing',
    desc: 'Secretary to the Sanggunian and Presiding Officer sign the resolution',
  },
  {
    num: '06',
    icon: 'bi-send-check',
    title: 'Posting / Transmittal',
    desc: 'Resolution is posted publicly and transmitted to concerned parties',
    final: true,
  },
])

const infoCards = computed(() => [
  {
    icon: 'bi-journal-bookmark',
    title: 'Ordinances',
    desc: `Local laws with permanent and general application that require compliance from residents and businesses within the ${labels.value.lguTypeLabel.toLowerCase()}.`,
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Resolutions',
    desc: 'Expressions of the legislative body\'s will or opinion on specific matters, often used for commendations, requests, or policy positions.',
  },
  {
    icon: 'bi-people',
    title: 'Public Participation',
    desc: `Citizens can attend ${labels.value.legislativeBody} sessions and participate in public hearings for proposed ordinances.`,
  },
  {
    icon: 'bi-shield-check',
    title: 'Transparency',
    desc: 'All enacted ordinances and resolutions are made available to the public as part of our commitment to open governance.',
  },
])

const steps = computed(() =>
  activeTab.value === 'ordinances'
    ? ordinanceSteps.value
    : resolutionSteps.value,
)
</script>

<template>
  <div>
    <Breadcrumbs :items="[{ label: 'Legislative' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-bank2" /> {{ labels.legislativeBody }}
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Legislative Documents
          </h1>
          <p class="text-lg text-white/90">
            Ordinances and resolutions of the
            {{ labels.legislativeBody }} ng {{ lguName }}
          </p>
        </div>
      </div>
    </section>

    <!-- Document Categories -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <NuxtLink
            to="/legislative/ordinance-framework"
            class="group bg-white border border-gray-200 rounded-xl p-8 no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div
              class="w-14 h-14 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-2xl mb-4 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white"
            >
              <i class="bi bi-journal-bookmark-fill" />
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">
              Ordinance Framework
            </h2>
            <p class="text-gray-500 mb-4">
              {{ labels.deptPrefix }} ordinances enacted by the
              {{ labels.legislativeBody }} — local laws that govern the
              {{ labels.lguTypeLabel.toLowerCase() }} and its residents.
            </p>
            <span
              class="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Browse Ordinances <i class="bi bi-arrow-right" />
            </span>
          </NuxtLink>
          <NuxtLink
            to="/legislative/resolution-framework"
            class="group bg-white border border-gray-200 rounded-xl p-8 no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
          >
            <div
              class="w-14 h-14 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-2xl mb-4 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white"
            >
              <i class="bi bi-file-earmark-ruled-fill" />
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">
              Resolution Framework
            </h2>
            <p class="text-gray-500 mb-4">
              Resolutions passed by the
              {{ labels.legislativeBody }} expressing the will or opinion of
              the legislative body on various matters.
            </p>
            <span
              class="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Browse Resolutions <i class="bi bi-arrow-right" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Legislative Process -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
            <i class="bi bi-diagram-3-fill" /> Process Flow
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Flowchart for Legislative Proposal
          </h2>
          <p class="text-gray-500">
            Step-by-step process for enacting ordinances and resolutions
          </p>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center gap-4 mb-8">
          <button
            type="button"
            class="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
            :class="
              activeTab === 'ordinances'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
            "
            @click="activeTab = 'ordinances'"
          >
            <i class="bi bi-journal-bookmark-fill" />
            <span>For Ordinances</span>
            <small class="opacity-75">11 Steps</small>
          </button>
          <button
            type="button"
            class="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
            :class="
              activeTab === 'resolutions'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
            "
            @click="activeTab = 'resolutions'"
          >
            <i class="bi bi-file-earmark-ruled-fill" />
            <span>For Resolutions</span>
            <small class="opacity-75">6 Steps</small>
          </button>
        </div>

        <!-- Steps -->
        <div
          class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="step in steps"
            :key="step.num"
            class="bg-white border rounded-xl p-6 relative"
            :class="
              step.final ? 'border-green-300 bg-green-50' : 'border-gray-200'
            "
          >
            <span
              class="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
              :class="
                step.final
                  ? 'bg-green-600 text-white'
                  : 'bg-primary-600 text-white'
              "
            >
              {{ step.num }}
            </span>
            <div
              class="w-10 h-10 flex items-center justify-center rounded-lg mb-3"
              :class="
                step.final
                  ? 'bg-green-100 text-green-600'
                  : 'bg-primary-50 text-primary-600'
              "
            >
              <i :class="`bi ${step.icon}`" />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ step.title }}
            </h4>
            <p class="text-sm text-gray-500">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <span
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
          >
            <i class="bi bi-info-circle-fill" /> About
          </span>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Understanding Local Legislation
          </h2>
          <p class="text-gray-500">
            Learn about the legislative process of the
            {{ labels.legislativeBody }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="card in infoCards"
            :key="card.title"
            class="bg-white border border-gray-200 rounded-xl p-6 text-center"
          >
            <div
              class="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl mx-auto mb-4"
            >
              <i :class="`bi ${card.icon}`" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ card.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ card.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
