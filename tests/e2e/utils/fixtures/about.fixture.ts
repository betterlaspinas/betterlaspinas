import { test as baseTest } from '@playwright/test'
import { AboutPage } from '../pages/about.page'

interface AboutPageFixture {
  aboutPage: AboutPage
}

export const test = baseTest.extend<AboutPageFixture>({
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(aboutPage)
  },

})

export { expect } from '@playwright/test'
