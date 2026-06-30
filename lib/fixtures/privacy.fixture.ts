import { test as baseTest, expect } from '@playwright/test'
import { PrivacyPolicyPage } from '../pages/privacy.page'

interface PrivacyPolicyFixture {
  privacyPolicyPage: PrivacyPolicyPage
}

export const test = baseTest.extend<PrivacyPolicyFixture>({
  privacyPolicyPage: async ({ page }, use) => {
    const privacyPolicyPage = new PrivacyPolicyPage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(privacyPolicyPage)
  },
})

export { expect } from '@playwright/test'
