import { test as baseTest } from '@playwright/test'
import { BusinessPage } from '../pages/business.page'
import { CertificatesPage } from '../pages/certificates.page'
import { ServicesPage } from '../pages/services.page'

// Step 1 — Tell TypeScript what fixtures we're adding
interface ServiceFixtures {
  servicesPage: ServicesPage // services.page.ts
  certificatesPage: CertificatesPage // certificates.page.ts
  businessPage: BusinessPage // business.page.ts
}

// Step 2 — Extend the base test with our fixtures
export const test = baseTest.extend<ServiceFixtures>({

  // Fixture 1 — prepares ServicesPage and navigates to /services
  servicesPage: async ({ page }, use) => {
    const servicesPage = new ServicesPage(page)
    await page.goto('/services')
    await use(servicesPage)
  },

  // Fixture 2 — prepares CertificatesPage (depends on servicesPage fixture)
  certificatesPage: async ({ page }, use) => {
    await page.goto('/services/certificates')
    const certificatesPage = new CertificatesPage(page)
    await use(certificatesPage)
  },

  // Fixture 3 — prepares BusinessPage
  // Note: This fixture can be used independently or after navigating to ServicesPage
  businessPage: async ({ page }, use) => {
    await page.goto('/services/business') // ← direct URL, no hover!
    const businessPage = new BusinessPage(page)
    await use(businessPage)
  },

})
export { expect } from '@playwright/test'
