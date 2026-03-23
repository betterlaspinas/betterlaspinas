<script setup lang="ts">
const { entries, getSectionBadgeColor, getSectionIcon, getPrefixColorClass } = useChangelog()
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
        <div class="max-w-5xl mx-auto">
          <!-- Timeline -->
          <div class="relative">
            <!-- Central Line -->
            <div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gray-200 -translate-x-1/2" />

            <!-- Entries -->
            <div class="space-y-12">
              <div
                v-for="(entry, index) in entries"
                :key="entry.version"
                class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <!-- Central Indicator (Absolute) -->
                <div class="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-20 items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-white text-primary-600 shadow-sm overflow-hidden group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <div class="w-full h-full flex items-center justify-center bg-gray-50 group-hover:bg-primary-600 transition-colors">
                    <i :class="entry.version === 'Unreleased' ? 'bi-stars' : 'bi-patch-check-fill'" class="text-sm" />
                  </div>
                </div>

                <!-- Date Area (Visible on opposite side on desktop) -->
                <div
                  class="hidden md:flex flex-col mt-7"
                  :class="index % 2 === 0 ? 'text-right items-end pr-12 order-1' : 'text-left items-start pl-12 order-2'"
                >
                  <div v-if="entry.date" class="flex flex-col" :class="index % 2 === 0 ? 'items-end' : 'items-start'">
                    <span class="text-sm font-bold text-gray-900">{{ entry.date }}</span>
                    <span class="text-xs text-gray-400 font-medium uppercase tracking-tighter mt-1">Release Date</span>
                  </div>
                </div>

                <!-- Content Card Area -->
                <div
                  class="relative group"
                  :class="index % 2 === 0 ? 'md:pl-12 order-2' : 'md:pr-12 order-1'"
                >
                  <!-- Mobile Indicator -->
                  <div class="md:hidden absolute -left-7 top-6 w-4 h-4 rounded-full border-2 border-white bg-primary-600 shadow-sm z-10" />

                  <!-- Card Header (Badge & GitHub) -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <UiBadge :variant="entry.version === 'Unreleased' ? 'solid-primary' : 'primary'" size="lg" class="shadow-sm">
                        {{ entry.version === 'Unreleased' ? 'Recent Updates' : `v${entry.version}` }}
                      </UiBadge>

                      <a
                        v-if="entry.githubUrl"
                        :href="entry.githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
                      >
                        <i class="bi bi-github" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>

                  <!-- Card Body -->
                  <UiCard padding="p-6" class="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div v-for="section in entry.sections" :key="section.title" class="mb-8 last:mb-0">
                      <div class="flex items-center gap-2 mb-4">
                        <UiBadge :variant="getSectionBadgeColor(section.title)" size="sm">
                          <div class="flex items-center gap-1.5">
                            <i :class="getSectionIcon(section.title)" />
                            {{ section.title }}
                          </div>
                        </UiBadge>
                      </div>

                      <ul class="space-y-4 pl-1">
                        <li v-for="item in section.items" :key="item.content" class="flex items-start gap-3 text-sm text-gray-600 leading-relaxed group/item">
                          <span class="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 group-hover/item:scale-125 transition-transform" />
                          <div class="flex flex-col gap-1.5">
                            <div v-if="item.prefix" class="flex">
                              <span
                                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border leading-none"
                                :class="getPrefixColorClass(item.prefix)"
                              >
                                {{ item.prefix }}
                              </span>
                            </div>
                            <span class="group-hover/item:text-gray-900 transition-colors">{{ item.content }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </UiCard>
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
