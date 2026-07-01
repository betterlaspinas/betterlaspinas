import type { Locator, Page } from '@playwright/test'

export class PrivacyPolicyPage {
  readonly page: Page
  readonly quickLinksMainHeader: Locator
  readonly privacyPolicyLink: Locator

  // Privacy Policy Main Header Variables
  readonly privacyPolicyMainHeader: Locator
  readonly privacyPolicyDescription: Locator

  // Left Navigator Contents Variable
  readonly contentNavigator: Locator

  // Introduction Variables
  readonly introductionMainHeading: Locator
  readonly introductionDescription: Locator

  // Legal Basis Variables
  readonly legalBasisMainHeading: Locator
  readonly legalBasisDescription: Locator

  // Information We Collect Variables
  readonly informationWeCollectMainHeading: Locator
  readonly informationWeCollectDescription: Locator

  // How We Use Information Variables
  readonly useOfInformationMainHeading: Locator
  readonly useOfInformationDescription: Locator

  // Cookies & Analytics Variables
  readonly cookiesAndAnalyticsMainHeader: Locator
  readonly cookiesAndAnalyticsDescription: Locator

  // Data Sharing Variables
  readonly dataSharingMainHeader: Locator
  readonly dataSharingDescription: Locator

  // Data Security Variables
  readonly dataSecurityMainHeading: Locator
  readonly dataSecurityDescription: Locator

  // Data Retention Variables
  readonly dataRetentionMainHeading: Locator
  readonly dataRetentionDescription: Locator

  // Your Rights Variables
  readonly yourRightsMainHeading: Locator
  readonly yourRightsDescription: Locator

  // Children's Privacy Variables
  readonly childrenPrivacyMainHeading: Locator
  readonly childrenPrivacyDescription: Locator

  // Third-Party Links Variables
  readonly thirdPartyLinksMainHeading: Locator
  readonly thirdPartyLinksDescription: Locator

  // Policy Changes Variables
  readonly policyChangesMainHeading: Locator
  readonly policyChangesDescription: Locator

  // Contact Us Variables
  readonly contactUsMainHeading: Locator
  readonly contactUsDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.quickLinksMainHeader = page.getByRole('heading', { name: 'Quick Links', level: 3, exact: true })
    this.privacyPolicyLink = page.locator('a').filter({ hasText: /^Privacy Policy$/ })

    // Privacy Policy Main Header Locators
    this.privacyPolicyMainHeader = page.getByRole('heading', { name: 'Privacy Policy', level: 1, exact: true })
    this.privacyPolicyDescription = page.getByText('How we collect, use, and protect your information')

    // Left Navigator Contents Locator
    this.contentNavigator = page.getByRole('heading', { name: 'Contents', level: 4 })

    // Introduction Locators
    this.introductionMainHeading = page.getByRole('heading', { name: 'Introduction', level: 2, exact: true })
    this.introductionDescription = page.getByText(/This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website./i)

    // Legal Basis Locators
    this.legalBasisMainHeading = page.getByRole('heading', { name: 'Legal Basis for Processing', level: 2, exact: true })
    this.legalBasisDescription = page.getByText(/Under the Data Privacy Act of 2012, we process personal information based on the following lawful criteria:/i)

    // Information We Collect Locators
    this.informationWeCollectMainHeading = page.getByRole('heading', { name: 'Information We Collect', level: 2, exact: true })
    this.informationWeCollectDescription = page.getByText(/Information You Provide Voluntarily/i)

    // How We Use Information Locators
    this.useOfInformationMainHeading = page.getByRole('heading', { name: 'How We Use Your Information', level: 2, exact: true })
    this.useOfInformationDescription = page.getByText(/To respond to your inquiries and feedback/i)

    // Cookies and Analytics Locators
    this.cookiesAndAnalyticsMainHeader = page.getByRole('heading', { name: 'Cookies and Analytics', level: 2, exact: true })
    this.cookiesAndAnalyticsDescription = page.getByText(/We use cookies and similar technologies to enhance your browsing experience./i)

    // Data Sharing Locators
    this.dataSharingMainHeader = page.getByRole('heading', { name: 'Data Sharing and Disclosure', level: 2, exact: true })
    this.dataSharingDescription = page.getByText(/We do not sell, trade, or rent your personal information to third parties./i)

    // Data Security Locators
    this.dataSecurityMainHeading = page.getByRole('heading', { name: 'Data Security', level: 2, exact: true })
    this.dataSecurityDescription = page.getByText(/We implement appropriate technical and organizational measures to protect your personal information/i)

    // Data Retention Locators
    this.dataRetentionMainHeading = page.getByRole('heading', { name: 'Data Retention', level: 2, exact: true })
    this.dataRetentionDescription = page.getByText(/We retain personal information only for as long as necessary./i)

    // Your Rights Locators
    this.yourRightsMainHeading = page.getByRole('heading', { name: 'Your Rights Under the Data Privacy Act', level: 2, exact: true })
    this.yourRightsDescription = page.getByText(/To exercise any of these rights, please contact us at volunteer@betterlaspinas.org/i)

    // Children's Privacy Locators
    this.childrenPrivacyMainHeading = page.getByRole('heading', { name: 'Children\'s Privacy', level: 2, exact: true })
    this.childrenPrivacyDescription = page.getByText(/We do not knowingly collect personal information from children under 18 years of age without parental consent./i)

    // Third-Party Links Locators
    this.thirdPartyLinksMainHeading = page.getByRole('heading', { name: 'Third-Party Links', level: 2, exact: true })
    this.thirdPartyLinksDescription = page.getByText(/Our website may contain links to external websites./i)

    // Policy Changes Locators
    this.policyChangesMainHeading = page.getByRole('heading', { name: 'Changes to This Privacy Policy', level: 2, exact: true })
    this.policyChangesDescription = page.getByText(/We may update this Privacy Policy from time to time./i)

    // Contact Us Locators
    this.contactUsMainHeading = page.getByRole('heading', { name: 'Changes to This Privacy Policy', level: 2, exact: true })
    this.contactUsDescription = page.getByText(/If you have questions about this Privacy Policy, please contact us:/i)
  }

  async navigateToPrivacyPolicy() {
    const previousUrl = this.page.url()
    await this.privacyPolicyLink.click()
    await this.page.waitForURL(url => url.href !== previousUrl)
  }

  getContentLinks(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }
}
