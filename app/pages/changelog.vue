<script setup lang="ts">
usePageOgImage()

const { entries, getSectionBadgeColor, getSectionIcon, getPrefixColorClass } = useChangelog()

const HIGHLIGHT_SECTIONS = ['added', 'changed', 'deprecated', 'removed', 'fixed', 'security']
const TECHNICAL_SECTIONS = ['infrastructure', 'internal', 'technical']

function getHighlights(entry: any) {
  return entry.sections.filter((s: any) => HIGHLIGHT_SECTIONS.includes(s.title.toLowerCase()))
}

function getTechnical(entry: any) {
  return entry.sections.filter((s: any) => TECHNICAL_SECTIONS.includes(s.title.toLowerCase()))
}
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <UiBreadcrumbs :items="[{ label: 'Changelog' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-clock-history" /> History
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Changelog
          </h1>
          <p class="text-lg text-white/90">
            Keep track of the latest updates and improvements
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 bg-gray-50/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Timeline -->
          <div class="relative">
            <!-- Vertical Line -->
            <div class="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-gray-200" />

            <!-- Entries -->
            <div class="space-y-16">
              <div
                v-for="entry in entries"
                :key="entry.version"
                class="relative pl-10 md:pl-14"
              >
                <!-- Indicator -->
                <div
                  class="absolute left-2 md:left-3 top-[11px] md:top-[14px] -translate-x-1/2 z-20 flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-primary-600 shadow-sm"
                  :class="entry.version === 'Unreleased' ? 'animate-pulse' : ''"
                />

                <!-- Version Header (Chapter Style) -->
                <div class="mb-6">
                  <div class="flex flex-wrap items-baseline gap-3 mb-2">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                      {{ entry.version === 'Unreleased' ? 'Recent Updates' : `v${entry.version}` }}
                    </h2>
                    <span v-if="entry.date" class="text-sm font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
                      {{ entry.date }}
                    </span>
                    <UiBadge v-if="entry.version === 'Unreleased'" variant="solid-primary" size="sm">
                      Current
                    </UiBadge>
                  </div>

                  <div class="flex items-center gap-4">
                    <a
                      v-if="entry.githubUrl"
                      :href="entry.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary-700 transition-colors"
                    >
                      <i class="bi bi-github" />
                      <span>Compare on GitHub</span>
                    </a>
                  </div>
                </div>

                <!-- Content Area -->
                <div class="space-y-6">
                  <!-- Highlights Section -->
                  <div v-if="getHighlights(entry).length > 0" class="space-y-8">
                    <div v-for="section in getHighlights(entry)" :key="section.title">
                      <div class="flex items-center gap-2 mb-4">
                        <UiBadge :variant="getSectionBadgeColor(section.title)" size="sm">
                          <div class="flex items-center gap-1.5">
                            <i :class="getSectionIcon(section.title)" />
                            {{ section.title }}
                          </div>
                        </UiBadge>
                      </div>

                      <ul class="space-y-3 pl-1">
                        <li v-for="item in section.items" :key="item.content" class="flex items-start gap-3 text-sm text-gray-800 leading-relaxed">
                          <span class="mt-2 w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0" />
                          <div class="flex flex-col gap-1.5">
                            <div v-if="item.prefix" class="flex">
                              <span
                                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border leading-none"
                                :class="getPrefixColorClass(item.prefix)"
                              >
                                {{ item.prefix }}
                              </span>
                            </div>
                            <span>{{ item.content }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Technical Details Section (Gray Block) -->
                  <div v-if="getTechnical(entry).length > 0" class="bg-gray-100/80 rounded-xl p-5 md:p-6 border border-gray-200/60">
                    <div class="flex items-center gap-2 mb-4">
                      <span class="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                        <i class="bi bi-cpu text-sm" /> Technical Details
                      </span>
                    </div>

                    <div class="space-y-6">
                      <div v-for="section in getTechnical(entry)" :key="section.title">
                        <div class="flex items-center gap-2 mb-3">
                          <span class="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                            <i :class="getSectionIcon(section.title)" />
                            {{ section.title }}
                          </span>
                        </div>

                        <ul class="space-y-2.5 pl-1">
                          <li v-for="item in section.items" :key="item.content" class="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                            <span class="mt-2 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <span
                                v-if="item.prefix"
                                class="inline-block px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold uppercase tracking-wider border border-gray-300 bg-white text-gray-600 leading-none"
                              >
                                {{ item.prefix }}
                              </span>
                              <span>{{ item.content }}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-if="entries.length === 0" class="py-24">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <i class="bi bi-calendar-x text-5xl mb-4 block opacity-20" />
        <p class="text-lg font-medium">
          No changelog entries found.
        </p>
      </div>
    </section>
  </div>
</template>
