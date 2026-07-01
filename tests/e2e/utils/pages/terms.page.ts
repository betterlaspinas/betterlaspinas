import type { Locator, Page } from '@playwright/test'

export class TermsOfUsePage {
  readonly page: Page
  readonly quickLinksMainHeading: Locator
  readonly termsOfUseLink: Locator

  // Terms of Use Page Main Heading Variables
  readonly termsOfUseMainHeading: Locator
  readonly termsOfUseDescription: Locator

  // Left Navigator Contents Variable
  readonly contentsNavigator: Locator

  // Introduction Variables
  readonly introductionMainHeading: Locator
  readonly introductionDescription: Locator

  // Acceptance of Terms Variables
  readonly acceptanceOfTermsMainHeading: Locator
  readonly acceptanceOfTermsDescription: Locator

  // Public Domain Content Variables
  readonly publicDomainContentMainHeading: Locator
  readonly publicDomainContentDescription: Locator

  // "As Is" Disclaimer Variables
  readonly disclaimerMainHeading: Locator
  readonly disclaimerDescription: Locator

  // Limitation of Liability Variables
  readonly limitationOfLiabilityMainHeading: Locator
  readonly limitationOfLiabilityDescription: Locator

  // User Responsibilities Variables
  readonly userResponsibilitiesMainHeading: Locator
  readonly userResponsibilitiesDescription: Locator

  // No Professional Advice Variables
  readonly professionalAdviceMainHeading: Locator
  readonly professionalAdviceDescription: Locator

  // External References Variables
  readonly externalReferencesMainHeading: Locator
  readonly externalReferencesDescription: Locator

  // Website Availability Variables
  readonly websiteAvailabilityMainHeading: Locator
  readonly websiteAvailabilityDescription: Locator

  // Modifications Variables
  readonly modificationsMainHeading: Locator
  readonly modificationsDescription: Locator

  // Governing Law Variables
  readonly governingLawMainHeading: Locator
  readonly governingLawDescription: Locator

  // Contact Information Variables
  readonly contactInformationMainHeading: Locator
  readonly contactInformationDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.quickLinksMainHeading = page.getByRole('heading', { name: 'Quick Links', level: 3, exact: true })
    this.termsOfUseLink = page.locator('a').filter({ hasText: /^Terms of Use$/ })

    // Terms of Use Page Main Heading Locators
    this.termsOfUseMainHeading = page.getByRole('heading', { name: 'Terms of Use', level: 1, exact: true })
    this.termsOfUseDescription = page.getByText('Guidelines for using betterlaspinas.org')

    // Left Contents Navigator Locator
    this.contentsNavigator = page.getByRole('heading', { name: 'Contents', level: 4 })

    // Introduction Locators
    this.introductionMainHeading = page.getByRole('heading', { name: 'Introduction' })
    this.introductionDescription = page.getByText(/betterlaspinas.org is a civic platform dedicated to empowering the people of Las Piñas by/i)

    // Acceptance of Terms Locators
    this.acceptanceOfTermsMainHeading = page.getByRole('heading', { name: 'Acceptance of Terms' })
    this.acceptanceOfTermsDescription = page.getByText(/By accessing and using this website, you acknowledge and agree to be bound by these terms and conditions./i)

    // Public Domain Content Locators
    this.publicDomainContentMainHeading = page.getByRole('heading', { name: 'Public Domain Content' })
    this.publicDomainContentDescription = page.getByText(/This website and its content are provided as a public domain resource and are operated entirely by volunteers./i)

    // "As Is" Disclaimer Locators
    this.disclaimerMainHeading = page.getByRole('heading', { name: '"As Is" Disclaimer' })
    this.disclaimerDescription = page.getByText(/All information on this website is provided "AS IS"/i)

    // Limitation of Liability Locators
    this.limitationOfLiabilityMainHeading = page.getByRole('heading', { name: 'Limitation of Liability' })
    this.limitationOfLiabilityDescription = page.getByText(/To the fullest extent permitted by law, the website operators, volunteers, and contributors/i)

    // User Responsibilities Locators
    this.userResponsibilitiesMainHeading = page.getByRole('heading', { name: 'User Responsibilities' })
    this.userResponsibilitiesDescription = page.getByText(/Users are responsible for independently verifying all information, reviewing source links, and cross-checking/i)

    // No Professional Advice Locators
    this.professionalAdviceMainHeading = page.getByRole('heading', { name: 'No Professional Advice' })
    this.professionalAdviceDescription = page.getByText(/The information on this website is provided for educational and informational purposes only./i)

    // External References Locators
    this.externalReferencesMainHeading = page.getByRole('heading', { name: 'Source Links and External References' })
    this.externalReferencesDescription = page.getByText(/This website may provide links to official sources and government documents./i)

    // Website Availability Locators
    this.websiteAvailabilityMainHeading = page.getByRole('heading', { name: 'Website Availability' })
    this.websiteAvailabilityDescription = page.getByText(/betterlaspinas.org cannot guarantee that the website will be available or accessible at all times/i)

    // Modifications Locators
    this.modificationsMainHeading = page.getByRole('heading', { name: 'Modifications' })
    this.modificationsDescription = page.getByText(/These terms may be updated or modified from time to time without prior notice./i)

    // Governing Law Locators
    this.governingLawMainHeading = page.getByRole('heading', { name: 'Governing Law' })
    this.governingLawDescription = page.getByText(/These terms are governed by and construed in accordance with the laws of the Republic of the Philippines./i)

    // Contact Information Locators
    this.contactInformationMainHeading = page.getByRole('heading', { name: 'Contact Information' })
    this.contactInformationDescription = page.getByText(/For questions about these terms or feedback on civic information, please contact:/i)
  }

  async navigateToTermsOfUse() {
    await this.termsOfUseLink.click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.termsOfUseMainHeading.waitFor({ state: 'visible', timeout: 10000 })
  }

  getContentsLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true })
  }
}
