import { expect, test } from './utils/fixtures/base.fixture'

test.describe('About Page', () => {
  test('Check About Page Link Visibility', async ({ aboutPage }) => {
    await expect(aboutPage.aboutPageLink).toBeVisible()

    await test.step('Navigate to About Page', async () => {
      await aboutPage.navigateToAboutPage()
      await expect(aboutPage.aboutPageMainHeading).toBeVisible()
      await expect(aboutPage.aboutPageDescription).toBeVisible()
    })

    await test.step('Check Mission and Vision Sections Visibility', async () => {
      await expect(aboutPage.missionAndVisionMainHeading).toBeVisible()
      await expect(aboutPage.missionAndVisionMainDescription).toBeVisible()
      await expect(aboutPage.missionHeading).toBeVisible()
      await expect(aboutPage.missionDescription).toBeVisible()
      await expect(aboutPage.visionHeading).toBeVisible()
      await expect(aboutPage.visionDescription).toBeVisible()
    })

    await test.step('Check Independence and Integrity Section Visibility', async () => {
      await expect(aboutPage.independenceAndIntegrityMainHeading).toBeVisible()
      await expect(aboutPage.independenceAndIntegrityMainDescription).toBeVisible()
      await expect(aboutPage.communityLedHeading).toBeVisible()
      await expect(aboutPage.communityLedDescription).toBeVisible()
      await expect(aboutPage.nonPartisanHeading).toBeVisible()
      await expect(aboutPage.nonPartisanDescription).toBeVisible()
    })

    await test.step('Check Explore More, Government and Get Involved Section Visibility', async () => {
      await expect(aboutPage.exploreMoreMainHeading).toBeVisible()
      await expect(aboutPage.governmentMainHeading).toBeVisible()
      await expect(aboutPage.governmentDescription).toBeVisible()
      await expect(aboutPage.getInvolvedMainHeading).toBeVisible()
      await expect(aboutPage.getInvolvedDescription).toBeVisible()
    })
  })
})
