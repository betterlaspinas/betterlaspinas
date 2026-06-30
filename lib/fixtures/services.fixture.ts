import { test as baseTest } from '@playwright/test'
import { BusinessPage } from '../pages/business.page'
import { CertificatesPage } from '../pages/certificates.page'
import { ServicesPage } from '../pages/services.page'

// Step 1 — Tell TypeScript what fixtures we're adding
interface ServicesFixture {
  servicesPage: ServicesPage // services.page.ts
  certificatesPage: CertificatesPage // certificates.page.ts
  businessPage: BusinessPage // business.page.ts
}

export const test = baseTest.extend<ServicesFixture>({

  servicesPage: async ({ page }, use) => {
    const servicesPage = new ServicesPage(page)
    await page.goto('/services')
    await use(servicesPage)
  },

  certificatesPage: async ({ page }, use) => {
    await page.goto('/services/certificates')
    const certificatesPage = new CertificatesPage(page)
    await use(certificatesPage)
  },

  businessPage: async ({ page }, use) => {
    await page.goto('/services/business')
    const businessPage = new BusinessPage(page)
    await use(businessPage)
  },

})
export { expect } from '@playwright/test'
