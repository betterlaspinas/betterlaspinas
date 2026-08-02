import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useSearch } from './useSearch'

// Mock dependencies. `getServiceCategoryName` mirrors the real accessor's
// contract (categoryId -> display name) without pulling in categories.json —
// #245 removed the denormalised `category` field, so useSearch derives it via
// this accessor at read time.
const CATEGORY_NAMES: Record<string, string> = {
  'civil-registry': 'Civil Registry',
  'business': 'Business',
}

const MOCK_SERVICES = [
  {
    id: 'cert-birth',
    title: 'Birth Certificate',
    description: 'Get your birth certificate',
    categoryId: 'civil-registry',
    keywords: ['birth', 'certificate', 'civil'],
    url: '/services/birth-certificate',
  },
  {
    id: 'permit-business',
    title: 'Business Permit',
    description: 'Apply for business permit',
    categoryId: 'business',
    keywords: ['business', 'permit', 'trade'],
    url: '/services/business-permit',
  },
]

vi.mock('@/utils/configHelper', () => ({
  getServicesConfig: () => ({
    services: MOCK_SERVICES,
  }),
  getServiceCategoryName: (service: { categoryId: string }) => CATEGORY_NAMES[service.categoryId] ?? '',
  getServiceCategories: () => [
    { id: 'civil-registry', name: 'Civil Registry', badgeText: 'Civil Registry' },
    { id: 'business', name: 'Business', badgeText: 'Business' },
    // Present in the category config but has no matching service above —
    // exercises the "visible but empty" case a hidden/regated category hits.
    { id: 'empty-category', name: 'Empty Category', badgeText: 'Empty' },
  ],
  getServicesByCategory: (slug: string) => MOCK_SERVICES.filter(service => service.categoryId === slug),
}))

// Mock Vue
vi.mock('vue', async (importOriginal) => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
  }
})

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()

    // Ensure localStorage is working or mocked if needed
    const store: Record<string, string> = {}
    try {
      localStorage.setItem('test', 'value')
      if (localStorage.getItem('test') !== 'value') {
        throw new Error('localStorage not working')
      }
      localStorage.removeItem('test')
    }
    catch {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: (key: string) => store[key] || null,
          setItem: (key: string, value: string) => { store[key] = value },
          removeItem: (key: string) => { delete store[key] },
          clear: () => { for (const key in store) delete store[key] },
        },
        writable: true,
      })
    }
  })

  it('should initialize with empty query', () => {
    const { query } = useSearch()
    expect(query.value).toBe('')
  })

  it('should return empty results for empty query', () => {
    const { query, results } = useSearch()
    query.value = ''
    expect(results.value.length).toBe(0)
  })

  it('should return results for valid query', () => {
    const { search, results } = useSearch()
    search('certificate')
    expect(results.value.length).toBeGreaterThan(0)
    expect(results.value[0]?.title).toBe('Birth Certificate')
  })

  it('should perform fuzzy search', () => {
    const { search, results } = useSearch()
    search('certifcate')
    expect(results.value.length).toBeGreaterThan(0)
  })

  it('should search across multiple fields', () => {
    const { search, results } = useSearch()
    search('birth')
    expect(results.value.length).toBeGreaterThan(0)
    search('apply')
    expect(results.value.length).toBeGreaterThan(0)
  })

  it('should filter by category', () => {
    const { search, results, category } = useSearch()
    category.value = 'civil-registry'
    search('certificate', 'civil-registry')
    expect(results.value.length).toBeGreaterThan(0)
    results.value.forEach((result) => {
      expect(result.categoryId).toBe('civil-registry')
    })
  })

  it('should derive category chips with an All entry plus every category holding a live service', () => {
    const { categories } = useSearch()
    expect(categories.value.map(cat => cat.id)).toEqual(['', 'civil-registry', 'business'])
    expect(categories.value.map(cat => cat.label)).toEqual(['All', 'Civil Registry', 'Business'])
  })

  it('should exclude a category with zero live services from the chip list', () => {
    const { categories } = useSearch()
    expect(categories.value.some(cat => cat.id === 'empty-category')).toBe(false)
  })

  it('should provide popular searches when query returns to empty', async () => {
    const { suggestions, setQuery } = useSearch()
    // Drive the query through a real transition back to empty — the suggestion
    // panel is populated reactively on query change, not on first read.
    setQuery('birth')
    await nextTick()
    setQuery('')
    await nextTick()
    expect(suggestions.value.popular).toBeDefined()
    expect(suggestions.value.popular.length).toBeGreaterThan(0)
  })

  it('should surface recent searches in the empty-query suggestions', async () => {
    const { suggestions, addRecentSearch, setQuery } = useSearch()
    const testQuery = 'birth certificate'
    addRecentSearch(testQuery)
    setQuery('birth')
    await nextTick()
    setQuery('')
    await nextTick()
    expect(suggestions.value.recent).toContain(testQuery)
  })

  it('should surface a recent search verbatim even when it matches no service title or curated popular term', async () => {
    // Regression guard for the removed whitelist filter: a genuine search
    // that doesn't fuzzy-match a service title or CURATED_POPULAR must not
    // be silently dropped from "Recent".
    const { suggestions, addRecentSearch, setQuery } = useSearch()
    const obscureQuery = 'zzz totally unrelated query'
    addRecentSearch(obscureQuery)
    setQuery('birth')
    await nextTick()
    setQuery('')
    await nextTick()
    expect(suggestions.value.recent).toContain(obscureQuery)
  })

  it('should clear recent searches', async () => {
    const { addRecentSearch, clearRecentSearches, suggestions, setQuery } = useSearch()
    addRecentSearch('test query')
    clearRecentSearches()
    setQuery('birth')
    await nextTick()
    setQuery('')
    await nextTick()
    expect(suggestions.value.recent.length).toBe(0)
  })
})
