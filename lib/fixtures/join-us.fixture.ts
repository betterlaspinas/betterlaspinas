import { test as baseTest } from '@playwright/test'
import { JoinUsPage } from '../pages/join-us.page'

interface JoinUsFixture {
  joinUsPage: JoinUsPage
}

export const test = baseTest.extend<JoinUsFixture>({
  joinUsPage: async ({ page }, use) => {
    const joinUsPage = new JoinUsPage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(joinUsPage)
  },
})

export { expect } from '@playwright/test'
