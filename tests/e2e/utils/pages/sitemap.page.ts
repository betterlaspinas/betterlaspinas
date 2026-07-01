import type { Locator, Page } from '@playwright/test'

export class QuickLinks {
  readonly page: Page
  readonly quickLinksLabel: Locator
  readonly siteMap: Locator

  // Sitemap Variables
  readonly sitemapLabel: Locator
  readonly siteMapDescription: Locator

  // Main page Variables
  readonly mainNavigationHeading: Locator
  readonly mainNavigationSection: Locator

  // Service Categories Variables
  readonly serviceCategoriesHeading: Locator
  readonly certificatesAndVitalRecords: Locator
  readonly businessServices: Locator

  // Government and Legislative Variables
  readonly governmentAndLegislativeHeading: Locator
  readonly governmentStructure: Locator

  // Resources and Legal Variables
  readonly resourcesAndLegalHeading: Locator
  readonly facebookPage: Locator
  readonly termsOfUseSiteMap: Locator
  readonly privacyPolicySiteMap: Locator

  constructor(page: Page) {
    this.page = page
    this.quickLinksLabel = page.getByRole('heading', { name: 'Quick Links', level: 3 })
    this.siteMap = page.locator('a').filter({ hasText: /^Sitemap$/ })

    // Sitemap Locators
    this.sitemapLabel = page.getByRole('heading', { name: 'Sitemap', level: 1 })
    this.siteMapDescription = page.getByText('Navigate all pages and services of Better Las Piñas')

    // Main page Locators
    this.mainNavigationHeading = page.getByRole('heading', { name: 'Main Navigation', level: 2, exact: true })
    this.mainNavigationSection = page.locator('div.grid.gap-3.grid-cols-1').filter({
      has: page.getByRole('link', { name: 'Home' }),
    })

    // Service Categories Locators
    this.serviceCategoriesHeading = page.getByRole('heading', { name: 'Service Categories', level: 2, exact: true })
    this.certificatesAndVitalRecords = page.getByRole('link', { name: 'Certificates & Vital Records' })
    this.businessServices = page.getByRole('link', { name: 'Business Services' })

    // Government and Legislative Locators
    this.governmentAndLegislativeHeading = page.getByRole('heading', { name: 'Government & Legislative', level: 2, exact: true })
    this.governmentStructure = page.getByRole('link', { name: 'Government Structure' })

    // Resources and Legal Locators
    this.resourcesAndLegalHeading = page.getByRole('heading', { name: 'Resources & Legal', level: 2, exact: true })
    this.facebookPage = page.getByRole('link', { name: 'Facebook Page' })
    this.termsOfUseSiteMap = page.getByRole('link', { name: 'Terms of Use' }).first()
    this.privacyPolicySiteMap = page.getByRole('link', { name: 'Privacy Policy' }).first()
  }

  async navigateToSitemap() {
    await this.siteMap.click()
    await this.page.waitForURL(/\/sitemap/i)
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForTimeout(2000)
  }

  getMainNavLink(name: string): Locator {
    return this.mainNavigationSection.getByRole('link', { name })
  }
}
