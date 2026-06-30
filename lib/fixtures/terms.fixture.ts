import { test as baseTest, expect } from '@playwright/test'
import { TermsOfUsePage } from '../pages/terms.page'

interface TermsOfUseFixture {
  termsOfUsePage: TermsOfUsePage
}

export const test = baseTest.extend<TermsOfUseFixture>({
  termsOfUsePage: async ({ page }, use) => {
    const termsOfUsePage = new TermsOfUsePage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await use(termsOfUsePage)
  },
})

export { expect } from '@playwright/test'
