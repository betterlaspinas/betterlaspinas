import type { Locator, Page } from '@playwright/test'

export class SearchFunctionality {
  readonly page: Page
  readonly searchInput: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.getByRole('searchbox', { name: 'Search services' })
  }

  // One method for any search term
  async search(term: string) {
    await this.searchInput.click()
    await this.searchInput.fill(term)
    await this.page.waitForTimeout(1000)
  }

  // One method to click any result
  async clickResult(resultName: string) {
    const result = this.page.getByRole('button', { name: resultName })
    await result.waitFor({ state: 'visible', timeout: 10000 })
    await result.click()
    await this.page.waitForLoadState('networkidle')
  }
}
