import type { IFuseOptions } from 'fuse.js'
import type { ServiceItem } from '@/types/config'
import Fuse from 'fuse.js'

import { getServiceCategories, getServiceCategoryName, getServicesByCategory, getServicesConfig } from '@/utils/configHelper'
import { ESCAPE_REGEX, SPLIT_WHITESPACE_REGEX } from '@/utils/regexConstants'

/**
 * A ServiceItem enriched with its Category display name for search matching
 * and result rendering. Derived at read time via `getServiceCategoryName`
 * rather than stored — #245 removed the denormalised `category` field.
 */
interface SearchableService extends ServiceItem {
  categoryName: string
}

interface SearchResult extends SearchableService {
  score: number
  _query: string
}

interface SearchSuggestions {
  popular: string[]
  recent: string[]
  suggestions: string[]
}

export interface CategoryChip {
  id: string
  label: string
}

const RECENT_SEARCHES_KEY = 'betterlgu_recent_searches'
const MAX_RECENT_SEARCHES = 10

// Curated, hand-picked popular search terms. These are intentionally
// editorial (not auto-derived from the catalog) so the list can highlight
// what residents actually look for. To keep the list from drifting the way
// it did before (terms silently pointing at unpublished categories), it is
// filtered at runtime by the `curatedPopular` computed against live service
// titles before it is ever shown or fed into the suggestion index.
const CURATED_POPULAR_CANDIDATES = [
  'birth certificate',
  'business permit',
  'cedula',
  'real property tax',
  'senior citizen id',
  'pwd id',
  'barangay clearance',
  'building permit',
  'marriage certificate',
  'death certificate',
  'tricycle franchise',
  'property declaration',
  'online payment',
  'mswdo',
  'slaughterhouse',
]

// Fuse.js configuration for fuzzy search
const FUSE_OPTIONS: IFuseOptions<SearchableService> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'keywords', weight: 0.3 },
    { name: 'categoryName', weight: 0.1 },
    { name: 'description', weight: 0.1 },
    { name: 'office', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
}

function getRecentSearches(): string[] {
  if (typeof window === 'undefined')
    return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  }
  catch {
    return []
  }
}

function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query || query.length < 2)
    return

  try {
    let recent = getRecentSearches()
    recent = recent.filter(recentQuery => recentQuery.toLowerCase() !== query.toLowerCase())
    recent.unshift(query)
    recent = recent.slice(0, MAX_RECENT_SEARCHES)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent))
  }
  catch {
    // localStorage not available
  }
}

function clearStoredRecentSearches(): void {
  if (typeof window === 'undefined')
    return
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }
  catch {
    // localStorage not available
  }
}

export function useSearch(initialQuery = '') {
  const query = ref(initialQuery)
  const category = ref()
  const results = ref<SearchResult[]>([])
  const suggestions = ref<SearchSuggestions>({
    popular: [],
    recent: [],
    suggestions: [],
  })
  const isOpen = ref(false)
  const selectedIndex = ref(-1)
  const pendingNavigation = ref<string | null>(null)

  const services = computed<SearchableService[]>(() =>
    (getServicesConfig().services as ServiceItem[]).map(service => ({
      ...service,
      categoryName: getServiceCategoryName(service),
    })),
  )

  // Category filter chips, always led by an "All" entry (clears the filter).
  // `getServiceCategories()` only excludes categories flagged `hidden` in
  // categories.json — it doesn't guarantee the category has any services
  // pointing at it. A category can therefore be "visible" at the config
  // level while resolving to zero results in the search index. Skipping
  // empty categories here keeps the chip list in sync with what search can
  // actually return.
  const categories = computed<CategoryChip[]>(() => [
    { id: '', label: 'All' },
    ...getServiceCategories()
      .filter(cat => getServicesByCategory(cat.id).length > 0)
      .map(cat => ({ id: cat.id, label: cat.badgeText || cat.name })),
  ])

  // Curated popular terms, re-validated against the live catalog on every
  // access so a term that stops resolving to a service (category regated,
  // service renamed/removed) drops out automatically instead of silently
  // pointing at nothing.
  const curatedPopular = computed(() =>
    CURATED_POPULAR_CANDIDATES.filter(term =>
      services.value.some(
        service =>
          service.title.toLowerCase().includes(term)
          || service.keywords.some(keyword => keyword.toLowerCase().includes(term)),
      ),
    ),
  )

  // Create Fuse instance for fuzzy search
  const fuse = computed(() => new Fuse(services.value, FUSE_OPTIONS))

  // Create Fuse instance for suggestion matching
  const suggestionFuse = computed(
    () =>
      new Fuse(
        [...services.value.map(service => service.title), ...curatedPopular.value].map(
          text => ({ text }),
        ),
        { keys: ['text'], threshold: 0.4, includeScore: true },
      ),
  )

  const search = (searchQuery: string, categoryFilter?: string): SearchResult[] => {
    if (!searchQuery || searchQuery.length < 2) {
      results.value = []
      return []
    }

    let fuseResults = fuse.value.search(searchQuery)

    // Apply category filter
    if (categoryFilter) {
      fuseResults = fuseResults.filter((result) => {
        const service = result.item
        return (
          service.categoryId === categoryFilter
          || service.categoryName.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      })
    }

    const searchResults: SearchResult[] = fuseResults
      .slice(0, 10)
      .map(result => ({
        ...result.item,
        score: 1 - (result.score ?? 0), // Convert Fuse score (0 = perfect) to higher-is-better
        _query: searchQuery,
      }))

    results.value = searchResults
    return searchResults
  }

  const getSuggestions = (searchQuery: string): SearchSuggestions => {
    if (!searchQuery || searchQuery.length < 1) {
      return {
        popular: curatedPopular.value.slice(0, 4),
        recent: getRecentSearches().slice(0, 3),
        suggestions: [],
      }
    }

    const fuseResults = suggestionFuse.value.search(searchQuery)
    const uniqueSuggestions = [
      ...new Set(fuseResults.slice(0, 8).map(fuseResult => fuseResult.item.text)),
    ]

    return {
      popular: [],
      recent: [],
      suggestions: uniqueSuggestions,
    }
  }

  // Update suggestions when query changes
  watch(query, (newQuery) => {
    suggestions.value = getSuggestions(newQuery)
  })

  // Trigger initial search if mounted with a query (mount-only effect)
  onMounted(() => {
    if (initialQuery && initialQuery.length >= 2) {
      search(initialQuery, category.value)
      isOpen.value = true
    }
  })

  const handleQueryChange = (newQuery: string) => {
    query.value = newQuery
    selectedIndex.value = -1

    if (newQuery.length >= 2) {
      search(newQuery, category.value)
    }
    else {
      results.value = []
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    category.value = newCategory
    selectedIndex.value = -1

    if (query.value.length >= 2) {
      search(query.value, newCategory)
    }
  }

  const handleSubmit = (searchQuery?: string) => {
    const activeQuery = searchQuery || query.value
    if (activeQuery.length >= 2) {
      saveRecentSearch(activeQuery)
      search(activeQuery)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    query.value = suggestion
    search(suggestion)
    saveRecentSearch(suggestion)
  }

  const handleKeyDown = (e: KeyboardEvent): string | null => {
    const totalItems = results.value.length + suggestions.value.suggestions.length + suggestions.value.recent.length + suggestions.value.popular.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, totalItems - 1)
        break

      case 'ArrowUp':
        e.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
        break

      case 'Enter': {
        const hasSelection = selectedIndex.value >= 0
        const targetIndex = hasSelection ? selectedIndex.value : 0

        const result = results.value[targetIndex]
        if (result) {
          e.preventDefault()
          saveRecentSearch(query.value)
          const url = result.url
          pendingNavigation.value = url
          return url
        }
        break
      }

      case 'Escape':
        isOpen.value = false
        selectedIndex.value = -1
        break
    }

    return null
  }

  const clearPendingNavigation = () => {
    pendingNavigation.value = null
  }

  const clearRecentSearches = () => {
    clearStoredRecentSearches()
    suggestions.value = { ...suggestions.value, recent: [] }
  }

  const addRecentSearch = (q: string) => {
    saveRecentSearch(q)
  }

  const setIsOpen = (value: boolean) => {
    isOpen.value = value
  }

  const setSelectedIndex = (index: number) => {
    selectedIndex.value = index
  }

  return {
    query,
    setQuery: handleQueryChange,
    category,
    setCategory: handleCategoryChange,
    categories,
    results,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    search,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
    clearRecentSearches,
    addRecentSearch,
    pendingNavigation,
    clearPendingNavigation,
  }
}

export function highlightMatch(text: string, query: string): string {
  if (!query || query.length < 2)
    return text

  const terms = query
    .toLowerCase()
    .split(SPLIT_WHITESPACE_REGEX)
    .filter(term => term.length >= 2)

  let result = text
  for (const term of terms) {
    const regex = new RegExp(
      `(${term.replace(ESCAPE_REGEX, '\\$&')})`,
      'gi',
    )
    result = result.replace(regex, '<mark>$1</mark>')
  }

  return result
}
