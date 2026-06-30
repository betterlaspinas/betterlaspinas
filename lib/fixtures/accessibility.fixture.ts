import { test as baseTest } from '@playwright/test'
import { AccessibilityPage } from '../pages/accessibility.page'

interface AccessibilityPageFixture {
  accessibilityPage: AccessibilityPage
}

export const test = baseTest.extend<AccessibilityPageFixture>({
  accessibilityPage: async ({ page }, use) => {
    const accessibilityPage = new AccessibilityPage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(accessibilityPage)
  },
})

export { expect } from '@playwright/test'
