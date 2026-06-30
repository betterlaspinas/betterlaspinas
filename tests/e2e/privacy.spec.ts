import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Privacy Policy page', () => {
  test('Check for Privacy Policy Link Visibility', async ({ privacyPolicyPage }) => {
    await expect(privacyPolicyPage.quickLinksMainHeader).toBeVisible()
    await expect(privacyPolicyPage.privacyPolicyLink).toBeVisible()

    await test.step('Navigate to Privacy Policy page', async () => {
      await privacyPolicyPage.navigateToPrivacyPolicy()
      await expect(privacyPolicyPage.privacyPolicyMainHeader).toBeVisible()
      await expect(privacyPolicyPage.privacyPolicyDescription).toBeVisible()
    })

    await test.step('Check Contents Section Visibility', async () => {
      const contents = [
        'Introduction',
        'Legal Basis',
        'Information We Collect',
        'How We Use Information',
        'Cookies & Analytics',
        'Data Sharing',
        'Data Security',
        'Data Retention',
        'Your Rights',
        'Children\'s Privacy',
        'Third-Party Links',
        'Policy Changes',
        'Contact Us',
      ]

      await expect (privacyPolicyPage.contentNavigator).toBeVisible()
      for (const linkName of contents) {
        await expect(privacyPolicyPage.getContentLinks(linkName)).toBeVisible()
      }
    })

    await test.step('Check Introduction Section Visibility', async () => {
      await expect(privacyPolicyPage.introductionMainHeading).toBeVisible()
      await expect(privacyPolicyPage.introductionDescription).toBeVisible()
    })

    await test.step('Check Legal Basis for Processing Section Visibility', async () => {
      await expect(privacyPolicyPage.legalBasisMainHeading).toBeVisible()
      await expect(privacyPolicyPage.legalBasisDescription).toBeVisible()
    })

    await test.step('Check Information We Collect Section Visibility', async () => {
      await expect(privacyPolicyPage.informationWeCollectMainHeading).toBeVisible()
      await expect(privacyPolicyPage.informationWeCollectDescription).toBeVisible()
    })

    await test.step('Check How We Use Your Information Section Visibility', async () => {
      await expect(privacyPolicyPage.useOfInformationMainHeading).toBeVisible()
      await expect(privacyPolicyPage.useOfInformationDescription).toBeVisible()
    })

    await test.step('Check Cookies and Analytics Section Visibility', async () => {
      await expect(privacyPolicyPage.cookiesAndAnalyticsMainHeader).toBeVisible()
      await expect(privacyPolicyPage.cookiesAndAnalyticsDescription).toBeVisible()
    })

    await test.step('Check Data Sharing and Disclosure Section Visibility', async () => {
      await expect(privacyPolicyPage.dataSharingMainHeader).toBeVisible()
      await expect(privacyPolicyPage.dataSharingDescription).toBeVisible()
    })

    await test.step('Check Data Security Section Visibility', async () => {
      await expect(privacyPolicyPage.dataSecurityMainHeading).toBeVisible()
      await expect(privacyPolicyPage.dataSecurityDescription).toBeVisible()
    })

    await test.step('Check Data Retention Section Visibility', async () => {
      await expect(privacyPolicyPage.dataRetentionMainHeading).toBeVisible()
      await expect(privacyPolicyPage.dataRetentionDescription).toBeVisible()
    })

    await test.step('Check Your Rights Under the Data Privacy Act Section Visibility', async () => {
      await expect(privacyPolicyPage.yourRightsMainHeading).toBeVisible()
      await expect(privacyPolicyPage.yourRightsDescription).toBeVisible()
    })

    await test.step('Check Children\'s Privacy Section Visibility', async () => {
      await expect(privacyPolicyPage.childrenPrivacyMainHeading).toBeVisible()
      await expect(privacyPolicyPage.childrenPrivacyDescription).toBeVisible()
    })

    await test.step('Check Third-Party Links Section Visibility', async () => {
      await expect(privacyPolicyPage.thirdPartyLinksMainHeading).toBeVisible()
      await expect(privacyPolicyPage.thirdPartyLinksDescription).toBeVisible()
    })

    await test.step('Check Changes to This Privacy Policy Section Visibility', async () => {
      await expect(privacyPolicyPage.policyChangesMainHeading).toBeVisible()
      await expect(privacyPolicyPage.policyChangesDescription).toBeVisible()
    })

    await test.step('Check Contact Us Section Visibility', async () => {
      await expect(privacyPolicyPage.contactUsMainHeading).toBeVisible()
      await expect(privacyPolicyPage.contactUsDescription).toBeVisible()
    })
  })
})
