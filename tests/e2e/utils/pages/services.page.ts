import type { Locator, Page } from '@playwright/test'
import { BusinessPage } from './business.page'
import { CertificatesPage } from './certificates.page'

export class ServicesPage {
  readonly page: Page
  readonly servicesLink: Locator
  readonly certificatesMenuItem: Locator
  readonly businessMenuItem: Locator

  constructor(page: Page) {
    this.page = page
    this.servicesLink = page.getByRole('link', { name: 'Services', exact: true })
    this.certificatesMenuItem = page.getByRole('menuitem', { name: 'Certificates', exact: true })
    this.businessMenuItem = page.getByRole('menuitem', { name: 'Business', exact: true })
  }

  async navigateToCertificates() {
    await this.servicesLink.hover()
    await this.certificatesMenuItem.waitFor({ state: 'visible', timeout: 3000 })
    await this.certificatesMenuItem.click()
    return new CertificatesPage(this.page)
  }

  async navigateToBusiness() {
    await this.servicesLink.hover()
    await this.businessMenuItem.waitFor({ state: 'visible', timeout: 3000 })
    await this.businessMenuItem.click()
    return new BusinessPage(this.page)
  }
}
