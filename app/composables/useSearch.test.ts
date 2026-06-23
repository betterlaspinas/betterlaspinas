import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useSearch } from './useSearch'

// Mock dependencies
vi.mock('@/utils/configHelper', () => ({
  getServicesConfig: () => ({
    services: [
      {
        id: 'cert-birth',
        title: 'Birth Certificate',
        description: 'Get your birth certificate',
        category: 'Civil Registry',
        categoryId: 'civil-registry',
        keywords: ['birth', 'certificate', 'civil'],
        url: '/services/birth-certificate',
      },
      {
        id: 'permit-business',
        title: 'Business Permit',
        description: 'Apply for business permit',
        category: 'Business',
        categoryId: 'business',
        keywords: ['business', 'permit', 'trade'],
        url: '/services/business-permit',
      },
    ],
  }),
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
