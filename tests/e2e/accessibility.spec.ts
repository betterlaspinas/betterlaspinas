import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Accessibility Page', () => {
  test('Check Accessibility page Link Visibility', async ({ accessibilityPage }) => {
    await expect (accessibilityPage.quickLinksHeader).toBeVisible()
    await expect (accessibilityPage.accessibilityLink).toBeVisible()

    await test.step('Navigate to Accessibility Page', async () => {
      await accessibilityPage.navigateToAccessibility()
      await expect(accessibilityPage.accessibilityPageMainHeading).toBeVisible()
      await expect(accessibilityPage.accessibilityPageMainDescription).toBeVisible()
      await expect(accessibilityPage.accessibilityPageBadge).toBeVisible()
    })

    await test.step('Check Our Commitment Section Visibility', async () => {
      await expect(accessibilityPage.ourCommitmentHeading).toBeVisible()
      await expect(accessibilityPage.ourCommitmentDescription).toBeVisible()
    })

    await test.step('Check Accessibility Features Section Visibility', async () => {
      await expect(accessibilityPage.accessibilityFeaturesMainHeading).toBeVisible()
      await expect(accessibilityPage.keyboardNavigationHeading).toBeVisible()
      await expect(accessibilityPage.screenReaderSupportHeading).toBeVisible()
      await expect(accessibilityPage.textAlternativesHeading).toBeVisible()
      await expect(accessibilityPage.colorContrastHeading).toBeVisible()
      await expect(accessibilityPage.responsiveDesignHeading).toBeVisible()
      await expect(accessibilityPage.noTimeLimitsHeading).toBeVisible()
    })

    await test.step('Check Known Limitations Section Visibility', async () => {
      await expect(accessibilityPage.knownLimitationMainHeader).toBeVisible()
      await expect(accessibilityPage.knownLimitationsDescriptionOne).toBeVisible()
      await expect(accessibilityPage.knownLimitationsDescriptionTwo).toBeVisible()
    })

    await test.step('Check Alternative Access Section Visibility', async () => {
      await expect(accessibilityPage.alternativeAccessMainHeading).toBeVisible()
      await expect(accessibilityPage.alternativeAccessDescription).toBeVisible()
      await expect(accessibilityPage.volunteerEmail).toBeVisible()
    })

    await test.step('Check Technical Specifications Section Visibility', async () => {
      await expect(accessibilityPage.technicalSpecificationsMainHeading).toBeVisible()
      await expect(accessibilityPage.htmlBadge).toBeVisible()
      await expect(accessibilityPage.cssBadge).toBeVisible()
      await expect(accessibilityPage.javaScriptBadge).toBeVisible()
      await expect(accessibilityPage.ariaBadge).toBeVisible()
    })

    await test.step('Check Our Promise Section Visibility', async () => {
      await expect(accessibilityPage.ourPromiseMainHeading).toBeVisible()
      await expect(accessibilityPage.ourPromiseDescription).toBeVisible()
    })
  })
})
