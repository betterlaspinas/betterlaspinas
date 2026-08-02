import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Search from './Search.vue'

const setCategory = vi.fn()

// Chip derivation itself lives in useSearch.ts (see useSearch.test.ts for
// those cases). This file isolates Search.vue's own responsibility: render
// whatever `categories` the composable hands back, wire clicks to
// `setCategory`, and expose the toggle-button a11y pattern correctly.
vi.mock('@/composables/useSearch', () => ({
  useSearch: () => ({
    query: ref(''),
    setQuery: vi.fn(),
    category: ref(''),
    setCategory,
    categories: ref([
      { id: '', label: 'All' },
      { id: 'certificates', label: 'Certificates' },
    ]),
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
  it('renders a chip for every category the composable provides, led by All', () => {
    const wrapper = mountSearch()
    const chips = wrapper.find('[aria-label="Filter by category"]').findAll('button')
    const labels = chips.map(chip => chip.text())

    expect(labels).toEqual(['All', 'Certificates'])
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

  it('uses aria-pressed toggle-button semantics, not an unfinished tab widget', () => {
    const wrapper = mountSearch()
    const chipRow = wrapper.find('[aria-label="Filter by category"]')

    // No tab-pattern roles that would promise arrow-key navigation / linked
    // panels this control doesn't implement.
    expect(chipRow.attributes('role')).toBeUndefined()
    const chips = chipRow.findAll('button')
    chips.forEach(chip => expect(chip.attributes('role')).toBeUndefined())

    const allChip = chips.find(chip => chip.text() === 'All')!
    expect(allChip.attributes('aria-pressed')).toBe('true')
    const certChip = chips.find(chip => chip.text() === 'Certificates')!
    expect(certChip.attributes('aria-pressed')).toBe('false')
  })
})
