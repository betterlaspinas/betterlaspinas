import type { Locator, Page } from '@playwright/test'

export class CertificatesPage {
  readonly page: Page
  readonly birthCertificate: Locator
  readonly marriageCertificate: Locator
  readonly deathCertificate: Locator
  readonly barangayClearance: Locator
  readonly barangayId: Locator
  readonly policeClearance: Locator
  constructor(page: Page) {
    this.page = page
    this.birthCertificate = page.getByRole('link', { name: 'Birth Certificate' })
    this.marriageCertificate = page.getByRole('link', { name: 'Marriage Certificate' })
    this.deathCertificate = page.getByRole('link', { name: 'Death Certificate' })
    this.barangayClearance = page.getByRole('heading', { name: 'Barangay Clearance', level: 3 })
    this.barangayId = page.getByRole('heading', { name: 'Barangay ID', level: 3 })
    this.policeClearance = page.getByRole('heading', { name: 'Police Clearance', level: 3 })
  }

  async navigate() {
    await this.page.goto('/services/certificates')
  }

  async navigateToBirthCertificate() {
    await this.birthCertificate.click()
  }

  async navigateToMarriageCertificate() {
    await this.marriageCertificate.click()
  }

  async navigateToDeathCertificate() {
    await this.deathCertificate.click()
  }
}
