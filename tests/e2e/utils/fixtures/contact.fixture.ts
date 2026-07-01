import { test as baseTest } from '@playwright/test'
import { ContactUsPage } from '../pages/contact.page'

interface ContactUsFixture {
  contactUsPage: ContactUsPage
}

export const test = baseTest.extend<ContactUsFixture>({
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page)
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await use(contactUsPage)
  },
})

export { expect } from '@playwright/test'
