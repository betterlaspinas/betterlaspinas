import { expect, test } from '../../lib/fixtures/terms.fixture'

test.describe('Terms of Use Page', () => {
  test('Check Terms of Use Link Visibility ', async ({ termsOfUsePage }) => {
    await expect (termsOfUsePage.quickLinksMainHeading).toBeVisible()
    await expect (termsOfUsePage.termsOfUseLink).toBeVisible()

    await test.step('Navigate to Terms of Use Page', async () => {
      await termsOfUsePage.navigateToTermsOfUse()
      await expect(termsOfUsePage.termsOfUseMainHeading).toBeVisible()
      await expect(termsOfUsePage.termsOfUseDescription).toBeVisible()
    })

    await test.step('Check Contents Section Visibility', async () => {
      const contents = [
        { name: 'Introduction' },
        { name: 'Acceptance of Terms' },
        { name: 'Public Domain Content' },
        { name: '"As Is" Disclaimer' },
        { name: 'Limitation of Liability' },
        { name: 'User Responsibilities' },
        { name: 'No Professional Advice' },
        { name: 'External References' },
        { name: 'Website Availability' },
        { name: 'Modifications' },
        { name: 'Governing Law' },
        { name: 'Contact Information' },
      ]
      await expect(termsOfUsePage.contentsNavigator).toBeVisible()
      for (const linkName of contents) {
        await expect (termsOfUsePage.getContentsLink(linkName.name)).toBeVisible()
      }
    })

    await test.step('Check Introduction Section Visibility', async () => {
      await expect(termsOfUsePage.introductionMainHeading).toBeVisible()
      await expect(termsOfUsePage.introductionDescription).toBeVisible()
    })

    await test.step('Check Acceptance of Terms Section Visibility', async () => {
      await expect(termsOfUsePage.acceptanceOfTermsMainHeading).toBeVisible()
      await expect(termsOfUsePage.acceptanceOfTermsDescription).toBeVisible()
    })

    await test.step('Check Public Domain Content Section Visibility', async () => {
      await expect(termsOfUsePage.publicDomainContentMainHeading).toBeVisible()
      await expect(termsOfUsePage.publicDomainContentDescription).toBeVisible()
    })

    await test.step('Check "As Is" Disclaimer Section Visibility', async () => {
      await expect(termsOfUsePage.disclaimerMainHeading).toBeVisible()
      await expect(termsOfUsePage.disclaimerDescription).toBeVisible()
    })

    await test.step('Check Limitation of Liability Section Visibility', async () => {
      await expect(termsOfUsePage.limitationOfLiabilityMainHeading).toBeVisible()
      await expect(termsOfUsePage.limitationOfLiabilityDescription).toBeVisible()
    })

    await test.step('Check User Responsibilities Section Visibility', async () => {
      await expect(termsOfUsePage.userResponsibilitiesMainHeading).toBeVisible()
      await expect(termsOfUsePage.userResponsibilitiesDescription).toBeVisible()
    })

    await test.step('Check No Professional Advice Section Visibility', async () => {
      await expect(termsOfUsePage.professionalAdviceMainHeading).toBeVisible()
      await expect(termsOfUsePage.professionalAdviceDescription).toBeVisible()
    })

    await test.step('Check External References Section Visibility', async () => {
      await expect(termsOfUsePage.externalReferencesMainHeading).toBeVisible()
      await expect(termsOfUsePage.externalReferencesDescription).toBeVisible()
    })

    await test.step('Check Website Availability Section Visibility', async () => {
      await expect(termsOfUsePage.websiteAvailabilityMainHeading).toBeVisible()
      await expect(termsOfUsePage.websiteAvailabilityDescription).toBeVisible()
    })

    await test.step('Check Modifications Section Visibility', async () => {
      await expect(termsOfUsePage.modificationsMainHeading).toBeVisible()
      await expect(termsOfUsePage.modificationsDescription).toBeVisible()
    })

    await test.step('Check Governing Law Section Visibility', async () => {
      await expect(termsOfUsePage.governingLawMainHeading).toBeVisible()
      await expect(termsOfUsePage.governingLawDescription).toBeVisible()
    })

    await test.step('Check Contact Information Section Visibility', async () => {
      await expect(termsOfUsePage.contactInformationMainHeading).toBeVisible()
      await expect(termsOfUsePage.contactInformationDescription).toBeVisible()
    })
  })
})
