import { expect, test } from './utils/fixtures/join-us.fixture'

test.describe('Join Us Page', () => {
  test('Check Join Us Link Visibility', async ({ joinUsPage }) => {
    await expect(joinUsPage.joinUsLink).toBeVisible()

    await test.step('Navigate to Join Us Page', async () => {
      await joinUsPage.navigateToJoinUsPage()
      await expect(joinUsPage.joinUsMainHeader).toBeVisible()
      await expect(joinUsPage.joinUsDescription).toBeVisible()
    })

    await test.step('Check We Need Your Help! Section Visibility', async () => {
      await expect(joinUsPage.weNeedYourHelpMainHeader).toBeVisible()
      await expect(joinUsPage.weNeedYourHelpDescription).toBeVisible()
      await expect(joinUsPage.emailUsToJoinButton).toBeVisible()
      await expect(joinUsPage.contributeOnGithubButton).toBeVisible()
      await expect(joinUsPage.emailUs).toBeVisible()
    })
  })
})
