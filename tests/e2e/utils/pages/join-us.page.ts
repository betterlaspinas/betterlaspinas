import type { Locator, Page } from '@playwright/test'

export class JoinUsPage {
  readonly page: Page
  readonly joinUsLink: Locator

  // Join the Better Las Piñas Team Variables
  readonly joinUsMainHeader: Locator
  readonly joinUsDescription: Locator

  // We Need Your Help! Variables
  readonly weNeedYourHelpMainHeader: Locator
  readonly weNeedYourHelpDescription: Locator
  readonly emailUsToJoinButton: Locator
  readonly contributeOnGithubButton: Locator
  readonly emailUs: Locator

  constructor(page: Page) {
    this.page = page
    this.joinUsLink = page.getByRole('link', { name: /Join Us/i })
    // Join the Better Las Piñas Team Locators
    this.joinUsMainHeader = page.getByRole('heading', { name: 'Join the Better Las Piñas Team', level: 1, exact: true })
    this.joinUsDescription = page.getByText('Be part of the movement for transparent and accessible governance data.')

    // We Need Your Help! Locators
    this.weNeedYourHelpMainHeader = page.getByRole('heading', { name: 'We Need Your Help!', level: 2, exact: true })
    this.weNeedYourHelpDescription = page.getByText(/Better Las Piñas is a volunteer-run initiative dedicated to making local government information accessible to everyone./i)
    this.emailUsToJoinButton = page.getByRole('link', { name: 'Email Us to Join' })
    this.contributeOnGithubButton = page.getByRole('link', { name: 'Contribute on GitHub' }).first()
    this.emailUs = page.getByText('Or contact us at volunteer@betterlaspinas.org', { exact: true })
  }

  async navigateToJoinUsPage() {
    const previousUrl = this.page.url()
    await this.joinUsLink.click()
    await this.page.waitForURL(url => url.href !== previousUrl)
  }
}
