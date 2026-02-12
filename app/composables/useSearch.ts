import type { IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'
import { getServicesConfig } from '@/utils/configHelper'

interface Service {
  id: string
  title: string
  description: string
  category: string
  categoryId?: string
  keywords: string[]
  office?: string
  fee?: string
  processingTime?: string
  url: string
}

interface SearchResult extends Service {
  score: number
  _query: string
}

interface SearchSuggestions {
  popular: string[]
  recent: string[]
  suggestions: string[]
}

const RECENT_SEARCHES_KEY = 'betterlgu_recent_searches'
const MAX_RECENT_SEARCHES = 10

const CURATED_POPULAR = [
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
const FUSE_OPTIONS: IFuseOptions<Service> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'keywords', weight: 0.3 },
    { name: 'category', weight: 0.1 },
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
    recent = recent.filter(q => q.toLowerCase() !== query.toLowerCase())
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
  const category = ref('')
  const results = ref<SearchResult[]>([])
  const suggestions = ref<SearchSuggestions>({
    popular: [],
    recent: [],
    suggestions: [],
  })
  const isOpen = ref(false)
  const selectedIndex = ref(-1)
  const pendingNavigation = ref<string | null>(null)

  const services = computed(() => getServicesConfig().services as Service[])

  // Create Fuse instance for fuzzy search
  const fuse = computed(() => new Fuse(services.value, FUSE_OPTIONS))

  // Create Fuse instance for suggestion matching
  const suggestionFuse = computed(
    () =>
      new Fuse(
        [...services.value.map(s => s.title), ...CURATED_POPULAR].map(
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
          || service.category.toLowerCase().includes(categoryFilter.toLowerCase())
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
        popular: CURATED_POPULAR.slice(0, 4),
        recent: getRecentSearches().slice(0, 3),
        suggestions: [],
      }
    }

    const fuseResults = suggestionFuse.value.search(searchQuery)
    const uniqueSuggestions = [
      ...new Set(fuseResults.slice(0, 8).map(r => r.item.text)),
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
    const q = searchQuery || query.value
    if (q.length >= 2) {
      saveRecentSearch(q)
      search(q)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    query.value = suggestion
    search(suggestion)
    saveRecentSearch(suggestion)
  }

  const handleKeyDown = (e: KeyboardEvent): string | null => {
    const totalItems
      = results.value.length
        + suggestions.value.suggestions.length
        + suggestions.value.recent.length
        + suggestions.value.popular.length

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
    .split(/\s+/)
    .filter(t => t.length >= 2)

  let result = text
  for (const term of terms) {
    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi',
    )
    result = result.replace(regex, '<mark>$1</mark>')
  }

  return result
}
