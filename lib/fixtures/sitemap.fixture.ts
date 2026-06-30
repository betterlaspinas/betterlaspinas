import { test as baseTest } from '@playwright/test'
import { QuickLinks } from '../pages/sitemap.page'

interface QuickLinkFixture {
  quickLinks: QuickLinks
}

export const test = baseTest.extend<QuickLinkFixture>({
  quickLinks: async ({ page }, use) => {
    const quickLinks = new QuickLinks(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(quickLinks)
  },
})

export { expect } from '@playwright/test'
