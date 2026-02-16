<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useClickOutside } from '@/composables/useClickOutside'
import { highlightMatch, useSearch } from '@/composables/useSearch'

const props = defineProps<{
  placeholder?: string
  customClass?: string
  initialQuery?: string
}>()

const emit = defineEmits<{
  (e: 'resultClick'): void
}>()

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)

const {
  query,
  setQuery, // Use this for updates
  category,
  setCategory,
  results,
  suggestions,
  isOpen,
  setIsOpen,
  selectedIndex,
  handleKeyDown,
  handleSuggestionClick,
  clearRecentSearches,
  addRecentSearch,
  pendingNavigation,
  clearPendingNavigation,
} = useSearch(props.initialQuery)

const CATEGORIES = [
  { id: '', label: 'All' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'business', label: 'Business' },
  { id: 'social-services', label: 'Social' },
  { id: 'health', label: 'Health' },
  { id: 'tax-payments', label: 'Taxation' },
] as const

const showDropdown = computed(() =>
  isOpen.value
  && (results.value.length > 0
    || suggestions.value.suggestions.length > 0
    || suggestions.value.recent.length > 0
    || suggestions.value.popular.length > 0),
)

function handleResultClick(url: string) {
  addRecentSearch(query.value)
  setIsOpen(false)
  emit('resultClick')
  router.push(url.startsWith('/') ? url : `/${url}`)
}

// Watch pending navigation from keyboard
watch(pendingNavigation, (nav) => {
  if (nav) {
    setIsOpen(false)
    emit('resultClick')
    router.push(nav.startsWith('/') ? nav : `/${nav}`)
    clearPendingNavigation()
  }
})

useClickOutside([inputRef, dropdownRef], () => {
  setIsOpen(false)
})

function onInput(e: Event) {
  setQuery((e.target as HTMLInputElement).value)
}

function onFocus() {
  setIsOpen(true)
}
</script>

<template>
  <div class="relative w-full flex-1" :class="customClass">
    <input
      ref="inputRef"
      type="search"
      class="w-full px-5 py-4 pl-12 border-2 border-transparent rounded-full text-base bg-white shadow-lg transition-all duration-200 focus:outline-none focus:border-blue-700 focus:shadow-xl placeholder:text-gray-400"
      :placeholder="placeholder || 'Search services (e.g., birth certificate, business permit)'"
      aria-label="Search services"
      autocomplete="off"
      :value="query"
      @input="onInput"
      @focus="onFocus"
      @keydown="handleKeyDown"
    >
    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />

    <div
      v-if="showDropdown"
      ref="dropdownRef"
      class="absolute top-full left-0 right-0 bg-white border border-blue-100 rounded-2xl shadow-2xl max-h-[480px] overflow-y-auto z-50 mt-2 animate-in fade-in slide-in-from-top-2 duration-200"
      aria-label="Search suggestions"
    >
      <!-- Category Filter Tabs -->
      <div class="flex gap-1.5 px-3 py-3 pb-2.5 border-b border-blue-50 flex-nowrap justify-start bg-gradient-to-b from-gray-50 to-white rounded-t-2xl overflow-x-auto">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          type="button"
          class="px-3 py-1.5 border-2 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap flex-shrink-0 transition-all"
          :class="category === cat.id
            ? 'border-blue-700 bg-blue-700 text-white shadow-md'
            : 'border-blue-200 bg-white text-gray-600 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50'"
          @click="setCategory(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Recent Searches -->
      <div v-if="query.length < 2 && suggestions.recent.length > 0" class="border-b border-blue-50 last:border-b-0">
        <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          <span class="flex items-center gap-1.5">
            <i class="bi bi-clock-history text-blue-700" />
            Recent Searches
          </span>
          <button
            class="bg-transparent border-none text-blue-700 text-[11px] font-medium cursor-pointer px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            type="button"
            @click="() => { clearRecentSearches(); setIsOpen(false); }"
          >
            Clear
          </button>
        </div>
        <button
          v-for="(item, idx) in suggestions.recent"
          :key="`recent-${item}`"
          class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700"
          :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === idx }"
          type="button"
          @click="handleSuggestionClick(item)"
        >
          <i class="bi bi-arrow-counterclockwise text-gray-400 mr-2.5 text-sm" />
          {{ item }}
        </button>
      </div>

      <!-- Popular Searches -->
      <div v-if="query.length < 2 && suggestions.popular.length > 0" class="border-b border-blue-50 last:border-b-0">
        <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          <span class="flex items-center gap-1.5">
            <i class="bi bi-fire text-blue-700" />
            Popular Searches
          </span>
        </div>
        <button
          v-for="(item, idx) in suggestions.popular"
          :key="`popular-${item}`"
          class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700"
          :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === suggestions.recent.length + idx }"
          type="button"
          @click="handleSuggestionClick(item)"
        >
          <i class="bi bi-search text-gray-400 mr-2.5 text-sm" />
          {{ item }}
        </button>
      </div>

      <!-- Autocomplete Suggestions -->
      <div v-if="query.length >= 2 && suggestions.suggestions.length > 0 && results.length === 0" class="border-b border-blue-50 last:border-b-0">
        <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          <span class="flex items-center gap-1.5">
            <i class="bi bi-lightbulb text-blue-700" />
            Did you mean?
          </span>
        </div>
        <button
          v-for="(item, idx) in suggestions.suggestions.slice(0, 5)"
          :key="`suggest-${item}`"
          class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700"
          :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === idx }"
          type="button"
          @click="handleSuggestionClick(item)"
        >
          <i class="bi bi-search text-gray-400 mr-2.5 text-sm" />
          {{ item }}
        </button>
      </div>

      <!-- No Results -->
      <div v-if="query.length >= 2 && results.length === 0 && suggestions.suggestions.length === 0" class="py-8 px-6 text-center text-gray-500">
        <i class="bi bi-search text-4xl text-blue-200 mb-3 block" />
        <p class="m-0 mb-1.5 font-semibold text-gray-700">
          No services found
        </p>
        <small class="text-gray-400 text-sm">Try different keywords or check spelling</small>
      </div>

      <!-- Search Results -->
      <template v-for="(result, index) in results" :key="result.id">
        <button
          class="block w-full py-3.5 px-4 text-gray-900 border-b border-blue-50 last:border-b-0 text-left border-l-[3px] border-l-transparent bg-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700"
          :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700': selectedIndex === index }"
          type="button"
          @click="handleResultClick(result.url)"
        >
          <div class="font-semibold text-blue-700 mb-1.5 text-[15px] flex items-center gap-2">
            <span v-html="highlightMatch(result.title, query)" />
            <span v-if="result.processingTime?.toLowerCase().includes('same day')" class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600 uppercase tracking-wide">
              Fast
            </span>
          </div>
          <div class="flex flex-wrap gap-3 text-xs mb-1.5">
            <span class="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              <i class="bi bi-folder text-[11px] opacity-80" />
              {{ result.category }}
            </span>
            <span v-if="result.fee" class="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <i class="bi bi-cash text-[11px] opacity-80" />
              {{ result.fee }}
            </span>
            <span v-if="result.processingTime" class="inline-flex items-center gap-1 text-blue-600">
              <i class="bi bi-clock text-[11px] opacity-80" />
              {{ result.processingTime }}
            </span>
          </div>
          <div v-if="result.office" class="text-xs text-gray-500 mb-1 flex items-center">
            <i class="bi bi-building mr-1.5 text-[11px] text-blue-700" />
            {{ result.office }}
          </div>
          <div v-if="result.description" class="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
            {{ result.description }}
          </div>
        </button>
      </template>

      <!-- Footer -->
      <div v-if="results.length > 0" class="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-blue-50 text-xs text-gray-400 rounded-b-2xl">
        <span class="font-medium">{{ results.length }} service{{ results.length !== 1 ? 's' : '' }} found</span>
        <span class="hidden sm:flex items-center gap-4">
          <span class="flex items-center gap-1">
            <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">
              up
            </kbd>
            <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">
              down
            </kbd>
            <span class="ml-1">Navigate</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">
              Enter
            </kbd>
            <span class="ml-1">Select</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">
              Esc
            </kbd>
            <span class="ml-1">Close</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
