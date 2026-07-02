import type { Locator, Page } from '@playwright/test'

export class AccessibilityPage {
  readonly page: Page
  readonly quickLinksHeader: Locator
  readonly accessibilityLink: Locator

  // Accessibility Main Page Variables
  readonly accessibilityPageMainHeading: Locator
  readonly accessibilityPageMainDescription: Locator
  readonly accessibilityPageBadge: Locator

  // Our Commitment Variables
  readonly ourCommitmentHeading: Locator
  readonly ourCommitmentDescription: Locator

  // Accessibility Features Variables
  readonly accessibilityFeaturesMainHeading: Locator
  readonly keyboardNavigationHeading: Locator
  readonly screenReaderSupportHeading: Locator
  readonly textAlternativesHeading: Locator
  readonly colorContrastHeading: Locator
  readonly responsiveDesignHeading: Locator
  readonly noTimeLimitsHeading: Locator

  // Known Limitations Variables
  readonly knownLimitationMainHeader: Locator
  readonly knownLimitationsDescriptionOne: Locator
  readonly knownLimitationsDescriptionTwo: Locator

  // Alternative Access Variables
  readonly alternativeAccessMainHeading: Locator
  readonly alternativeAccessDescription: Locator
  readonly volunteerEmail: Locator

  // Technical Specifications Variables
  readonly technicalSpecificationsMainHeading: Locator
  readonly htmlBadge: Locator
  readonly cssBadge: Locator
  readonly javaScriptBadge: Locator
  readonly ariaBadge: Locator

  // Our Promise Variables
  readonly ourPromiseMainHeading: Locator
  readonly ourPromiseDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.quickLinksHeader = page.getByRole('heading', { name: 'Quick Links', level: 3, exact: true })
    this.accessibilityLink = page.getByRole('link', { name: 'Accessibility', exact: true })

    // Accessibility Main Page Locators
    this.accessibilityPageMainHeading = page.getByRole('heading', { name: 'Accessibility Statement', level: 1, exact: true })
    this.accessibilityPageMainDescription = page.getByText('Our commitment to digital accessibility for all citizens')
    this.accessibilityPageBadge = page.getByText('Conformant', { exact: true })

    // Our Commitment Locators
    this.ourCommitmentHeading = page.getByRole('heading', { name: 'Our Commitment', level: 2, exact: true })
    this.ourCommitmentDescription = page.getByText(/Better Las Piñas is committed to ensuring digital accessibility for people with disabilities/i)

    // Accessibility Features Locators
    this.accessibilityFeaturesMainHeading = page.getByRole('heading', { name: 'Accessibility Features', level: 2, exact: true })
    this.keyboardNavigationHeading = page.getByRole('heading', { name: 'Keyboard Navigation', level: 3, exact: true })
    this.screenReaderSupportHeading = page.getByRole('heading', { name: 'Screen Reader Support', level: 3, exact: true })
    this.textAlternativesHeading = page.getByRole('heading', { name: 'Text Alternatives', level: 3, exact: true })
    this.colorContrastHeading = page.getByRole('heading', { name: 'Color Contrast', level: 3, exact: true })
    this.responsiveDesignHeading = page.getByRole('heading', { name: 'Responsive Design', level: 3, exact: true })
    this.noTimeLimitsHeading = page.getByRole('heading', { name: 'No Time Limits', level: 3, exact: true })

    // Known Limitations Locators
    this.knownLimitationMainHeader = page.getByRole('heading', { name: 'Known Limitations', level: 2, exact: true })
    this.knownLimitationsDescriptionOne = page.getByText('Some PDF documents may not be fully accessible to screen readers')
    this.knownLimitationsDescriptionTwo = page.getByText('Some third-party embedded content may have accessibility issues')

    // Alternative Access Locators
    this.alternativeAccessMainHeading = page.getByRole('heading', { name: 'Alternative Access', level: 2, exact: true })
    this.alternativeAccessDescription = page.getByText('If you encounter difficulty accessing any information, contact us:')
    this.volunteerEmail = page.getByRole('link', { name: 'volunteer@betterlaspinas.org' })

    // Technical Specifications Locators
    this.technicalSpecificationsMainHeading = page.getByRole('heading', { name: 'Technical Specifications', level: 2, exact: true })
    this.htmlBadge = page.getByText('HTML')
    this.cssBadge = page.getByText('CSS')
    this.javaScriptBadge = page.getByText('JavaScript')
    this.ariaBadge = page.getByText('WAI-ARIA')

    // Our Promise Locators
    this.ourPromiseMainHeading = page.getByRole('heading', { name: 'Our Promise', level: 3, exact: true })
    this.ourPromiseDescription = page.getByText(/Better Las Piñas is committed to ensuring that our digital services are accessible to all citizens/i)
  }

  async navigateToAccessibility() {
    await this.accessibilityLink.click()
    await this.page.waitForURL(url => url.pathname === '/accessibility')
    await this.accessibilityPageMainHeading.waitFor({ state: 'visible' })
  }
}
