import type { Locator, Page } from '@playwright/test'

export class SearchFunctionality {
  readonly page: Page
  readonly searchInput: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.getByPlaceholder('e.g., birth certificate, business permit')
  }

  // One method for any search term
  async search(term: string) {
    await this.searchInput.fill(term)
    await this.page.waitForLoadState('networkidle')
  }

  // One method to click any result
  async clickResult(resultName: string) {
    await this.page.locator('button').filter({ hasText: resultName }).click()
  }
}
