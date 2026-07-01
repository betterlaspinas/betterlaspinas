import { test as baseTest } from '@playwright/test'
import { GovernmentPage } from '../pages/government.page'

interface GovernmentFixture {
  governmentPage: GovernmentPage
}

export const test = baseTest.extend<GovernmentFixture>({
  governmentPage: async ({ page }, use) => {
    const governmentPage = new GovernmentPage(page)
    await page.goto('/government')
    await page.waitForLoadState('domcontentloaded')
    await use(governmentPage)
  },
})

export { expect } from '@playwright/test'
