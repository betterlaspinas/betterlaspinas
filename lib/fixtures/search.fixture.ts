import { test as baseTest } from '@playwright/test'
import { SearchFunctionality } from '../pages/search.page'

interface Searching {
  searchFunctionality: SearchFunctionality
}

export const test = baseTest.extend<Searching>({
  searchFunctionality: async ({ page }, use) => {
    const searchFunctionality = new SearchFunctionality(page)
    await use(searchFunctionality)
  },
})

export { expect } from '@playwright/test'
