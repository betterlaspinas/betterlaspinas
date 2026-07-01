import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pages/home.page'

interface HomePageFixture {
  homePage: HomePage

}

export const test = baseTest.extend<HomePageFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(homePage)
  },

})

export { expect } from '@playwright/test'
