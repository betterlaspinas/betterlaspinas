import type { Locator, Page } from '@playwright/test'

export class AboutPage {
  readonly page: Page
  readonly aboutPageLink: Locator

  // About Page Variables
  readonly aboutPageMainHeading: Locator
  readonly aboutPageDescription: Locator

  // Mission & Vision Variables
  readonly missionAndVisionMainHeading: Locator
  readonly missionAndVisionMainDescription: Locator
  readonly missionHeading: Locator
  readonly missionDescription: Locator
  readonly visionHeading: Locator
  readonly visionDescription: Locator

  // Independence & Integrity Variables
  readonly independenceAndIntegrityMainHeading: Locator
  readonly independenceAndIntegrityMainDescription: Locator
  readonly communityLedHeading: Locator
  readonly communityLedDescription: Locator
  readonly nonPartisanHeading: Locator
  readonly nonPartisanDescription: Locator

  // Explore More Variables
  readonly exploreMoreMainHeading: Locator
  readonly governmentMainHeading: Locator
  readonly governmentDescription: Locator
  readonly getInvolvedMainHeading: Locator
  readonly getInvolvedDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.aboutPageLink = page.getByRole('link', { name: 'About' })

    // About Page Locators
    this.aboutPageMainHeading = page.getByRole('heading', { name: 'About BetterLasPinas.org', level: 1, exact: true })
    this.aboutPageDescription = page.getByText('Learn about our mission, history, and the community we serve.')

    // Mission & Vision Locators
    this.missionAndVisionMainHeading = page.getByRole('heading', { name: 'Mission & Vision', level: 2, exact: true })
    this.missionAndVisionMainDescription = page.getByText('The driving force behind BetterLasPinas.org and our aspirations for the community.')
    this.missionHeading = page.getByRole('heading', { name: 'Our Mission', level: 2, exact: true })
    this.missionDescription = page.getByText(/Our mission is to foster a culture of transparency, accountability, and active citizenship in local governance./)
    this.visionHeading = page.getByRole('heading', { name: 'Our Vision', level: 2, exact: true })
    this.visionDescription = page.getByText(/We envision a fully engaged and informed populace working alongside a responsive, open city government./)

    // Independence & Integrity Locators
    this.independenceAndIntegrityMainHeading = page.getByRole('heading', { name: 'Independence & Integrity', level: 2, exact: true })
    this.independenceAndIntegrityMainDescription = page.getByText('BetterLasPinas.org is a proud, independent civic tech initiative driven by the community, for the community.')
    this.communityLedHeading = page.getByRole('heading', { name: 'Community-Led', level: 3, exact: true })
    this.communityLedDescription = page.getByText(/We are organized entirely by volunteer residents and developers/i)
    this.nonPartisanHeading = page.getByRole('heading', { name: 'Non-Partisan', level: 3, exact: true })
    this.nonPartisanDescription = page.getByText(/We are strictly independent./i)

    // Explore More Locators
    this.exploreMoreMainHeading = page.getByRole('heading', { name: 'Explore More', level: 2, exact: true })
    this.governmentMainHeading = page.getByRole('heading', { name: 'Government', level: 3, exact: true })
    this.governmentDescription = page.getByText('Meet your local officials and understand the organizational structure.')
    this.getInvolvedMainHeading = page.getByRole('heading', { name: 'Get Involved', level: 3, exact: true }).first()
    this.getInvolvedDescription = page.getByText('Join our team of volunteers and help build a better community.')
  }

  async navigateToAboutPage() {
    await this.aboutPageLink.click()
    await this.page.waitForURL(url => url.pathname === '/about')
    await this.aboutPageMainHeading.waitFor({ state: 'visible' })
  }
}
