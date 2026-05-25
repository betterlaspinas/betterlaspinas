import type { Locator, Page } from '@playwright/test'

export class BusinessPage {
  readonly page: Page
  readonly businessPermit: Locator
  readonly businessPermitRenewal: Locator
  readonly specialPermit: Locator
  readonly certificateofStatus: Locator
  readonly ctcOfBusinessLicense: Locator
  readonly occupationalPermit: Locator
  readonly firstTimeJobSeeker: Locator
  readonly safetySealCertificate: Locator
  constructor(page: Page) {
    this.page = page
    this.businessPermit = page.getByRole('link', { name: 'Business Permit (New)' })
    this.businessPermitRenewal = page.getByRole('link', { name: 'Business Permit (Renewal)' })
    this.specialPermit = page.getByRole('link', { name: 'Special Permit' })
    this.certificateofStatus = page.getByRole('link', { name: 'Certificates on Status of Business ' })
    this.ctcOfBusinessLicense = page.getByRole('link', { name: 'Certified True Copy of Business License' })
    this.occupationalPermit = page.getByRole('heading', { name: ' Occupational Mayor\'s Permit' })
    this.firstTimeJobSeeker = page.getByRole('link', { name: 'Occupational Permit (First Time Job Seeker)' })
    this.safetySealCertificate = page.getByRole('link', { name: 'Safety Seal Certificate' })
  }

  async navigate() {
    await this.page.goto('/services/business')
  }

  async navigateToBusiness() {
    await this.businessPermit.click()
  }

  async navigateToBusinessPermitRenewal() {
    await this.businessPermitRenewal.click()
  }

  async navigateToSpecialPermit() {
    await this.specialPermit.click()
  }

  async navigateToCertificateOfStatus() {
    await this.certificateofStatus.click()
  }

  async navigateToCTCOfBusinessLicense() {
    await this.ctcOfBusinessLicense.click()
  }

  async navigateToOccupationalPermit() {
    await this.occupationalPermit.click()
  }

  async navigateToFirstTimeJob() {
    await this.firstTimeJobSeeker.click()
  }

  async navigateToSafetySealCertificate() {
    await this.safetySealCertificate.click()
  }
}
