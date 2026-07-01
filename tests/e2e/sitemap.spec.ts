import { expect, test } from './utils/fixtures/base.fixture'

test.describe('Navigate to Quick Links', () => {
  test('Check for SiteMap Link visibility', async ({ quickLinks }) => {
    await expect(quickLinks.quickLinksLabel).toBeVisible()
    await expect(quickLinks.siteMap).toBeVisible()

    await test.step('Navigate to Sitemap page', async () => {
      await quickLinks.navigateToSitemap()
      await expect(quickLinks.sitemapLabel).toBeVisible()
      await expect(quickLinks.siteMapDescription).toBeVisible()
    })

    await test.step('Validate Links under Main page', async () => {
      const mainNavigationContents = [
        'Home',
        'Services',
        'Government',
        'Statistics',
        'Contact',
        'FAQ',
        'Changelog',
        'Accessibility',
      ]
      await expect(quickLinks.mainNavigationHeading).toBeVisible()
      for (const linkName of mainNavigationContents) {
        await expect(quickLinks.getMainNavLink(linkName)).toBeVisible()
      }
    })

    await test.step('Validate Links under Service Categories', async () => {
      await expect(quickLinks.serviceCategoriesHeading).toBeVisible()
      await expect(quickLinks.certificatesAndVitalRecords).toBeVisible()
      await expect(quickLinks.businessServices).toBeVisible()
    })

    await test.step('Validate links under Government and & Legislative', async () => {
      await expect(quickLinks.governmentAndLegislativeHeading).toBeVisible()
      await expect(quickLinks.governmentStructure).toBeVisible()
    })

    await test.step('Validate links under Resource and Legal', async () => {
      await expect (quickLinks.resourcesAndLegalHeading).toBeVisible()
      await expect(quickLinks.facebookPage).toBeVisible()
      await expect (quickLinks.termsOfUseSiteMap).toBeVisible()
      await expect(quickLinks.privacyPolicySiteMap).toBeVisible()
    })
  })
})
