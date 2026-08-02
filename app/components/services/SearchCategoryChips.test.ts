import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Search from './Search.vue'

const setCategory = vi.fn()

// Isolate the chip-derivation logic from the rest of the search composable:
// stub useSearch entirely and control configHelper's category/service data
// directly, so these tests exercise exactly how Search.vue turns
// getServiceCategories()/getServicesByCategory() into chips.
vi.mock('@/utils/configHelper', () => ({
  getServiceCategories: () => [
    { id: 'certificates', name: 'Certificates & Vital Records', badgeText: 'Certificates', hidden: false },
    { id: 'empty-category', name: 'Empty Category', badgeText: 'Empty', hidden: false },
  ],
  getServicesByCategory: (slug: string) => (slug === 'certificates' ? [{ id: 'cert-1' }] : []),
}))

vi.mock('@/composables/useSearch', () => ({
  useSearch: () => ({
    query: ref(''),
    setQuery: vi.fn(),
    category: ref(''),
    setCategory,
    results: ref([]),
    // Non-empty popular list forces the dropdown open so the chip row renders.
    suggestions: ref({ popular: ['dummy'], recent: [], suggestions: [] }),
    isOpen: ref(true),
    setIsOpen: vi.fn(),
    selectedIndex: ref(-1),
    handleKeyDown: vi.fn(),
    handleSuggestionClick: vi.fn(),
    clearRecentSearches: vi.fn(),
    addRecentSearch: vi.fn(),
    pendingNavigation: ref(null),
    clearPendingNavigation: vi.fn(),
  }),
  highlightMatch: (text: string) => text,
}))

function mountSearch() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  })

  return mount(Search, {
    global: {
      plugins: [router],
      stubs: {
        NuxtLink: { template: '<a><slot /></a>' },
      },
    },
  })
}

describe('search category chips', () => {
  it('renders an All chip plus only categories that have live services', () => {
    const wrapper = mountSearch()
    const chips = wrapper.find('[aria-label="Filter by category"]').findAll('button')
    const labels = chips.map(chip => chip.text())

    expect(labels).toEqual(['All', 'Certificates'])
  })

  it('does not render a chip for a category with zero live services', () => {
    const wrapper = mountSearch()
    const chips = wrapper.find('[aria-label="Filter by category"]').findAll('button')
    expect(chips.some(chip => chip.text() === 'Empty')).toBe(false)
  })

  it('clears the category filter when the All chip is clicked', async () => {
    const wrapper = mountSearch()
    const chips = wrapper.find('[aria-label="Filter by category"]').findAll('button')
    const allChip = chips.find(chip => chip.text() === 'All')!

    await allChip.trigger('click')

    expect(setCategory).toHaveBeenCalledWith('')
  })

  it('filters by category when a non-All chip is clicked', async () => {
    const wrapper = mountSearch()
    const chips = wrapper.find('[aria-label="Filter by category"]').findAll('button')
    const certChip = chips.find(chip => chip.text() === 'Certificates')!

    await certChip.trigger('click')

    expect(setCategory).toHaveBeenCalledWith('certificates')
  })
})
