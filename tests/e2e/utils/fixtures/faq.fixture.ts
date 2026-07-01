import { test as baseTest } from '@playwright/test'
import { FrequentlyAskedQuestions } from '../pages/faq.page'

interface FAQFixture {
  frequentlyAskedQuestions: FrequentlyAskedQuestions
}

export const test = baseTest.extend<FAQFixture>({
  frequentlyAskedQuestions: async ({ page }, use) => {
    const frequentlyAskedQuestions = new FrequentlyAskedQuestions(page)
    await page.goto('/faq')
    await page.waitForLoadState('networkidle')
    await use(frequentlyAskedQuestions)
  },
})

export { expect } from '@playwright/test'
