import type { Locator, Page } from '@playwright/test'

export class ContactUsPage {
  readonly page: Page
  readonly contactUsLink: Locator

  // Contact Us Page Main Heading Variables
  readonly contactUsMainHeading: Locator
  readonly contactUsDescription: Locator

  // Email and Phone Section Variables
  readonly emailMainHeading: Locator
  readonly laspinasEmail: Locator
  readonly phoneMainHeading: Locator
  readonly laspinasPhone: Locator

  // Office Hours Variables
  readonly officeHoursMainHeading: Locator
  readonly officeHoursTable: Locator

  // Emergency Hotlines Variables
  readonly emergencyHotlinesMainHeading: Locator
  readonly emergencyHotlinesDescription: Locator
  readonly emergencyHotlinesContainer: Locator

  // Medical Emergency Hotlines Variables
  readonly medicalEmergencyHotlinesMainHeading: Locator
  readonly medicalEmergencyHotlinesDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.contactUsLink = page.getByRole('link', { name: 'Contact', exact: true })

    // Contact Us Page Main Heading Locators
    this.contactUsMainHeading = page.getByRole('heading', { name: 'Contact Us', level: 1, exact: true })
    this.contactUsDescription = page.getByText('We\'re here to help. Reach out to us through any of these channels.')

    // Email and Phone Section Locators
    this.emailMainHeading = page.getByRole('heading', { name: 'EMAIL', level: 3 })
    this.laspinasEmail = page.getByText('laspinascitygov@yahoo.com')
    this.phoneMainHeading = page.getByRole('heading', { name: 'PHONE', level: 3 })
    this.laspinasPhone = page.getByText('(02) 8871-4343')

    // Office Hours Variables
    this.officeHoursMainHeading = page.getByRole('heading', { name: 'Office Hours', level: 2, exact: true })
    this.officeHoursTable = page.locator('div').filter({ has: page.getByRole('heading', { name: 'Office Hours' }),
    })

    // Emergency Hotline Locators
    this.emergencyHotlinesMainHeading = page.getByRole('heading', { name: 'Emergency Hotlines', level: 2, exact: true })
    this.emergencyHotlinesDescription = page.getByText('For emergencies and inquiries, contact these numbers anytime.')
    this.emergencyHotlinesContainer = page.locator('div').filter({ has: page.getByRole('link', { name: 'Command Center' }) })

    // Medical Emergency Hotlines Locators
    this.medicalEmergencyHotlinesMainHeading = page.getByRole('heading', { name: 'Medical Emergency Hotlines', level: 2, exact: true })
    this.medicalEmergencyHotlinesDescription = page.getByText(/For medical emergencies and hospital inquiries./)
  }

  async navigateToContactUsPage() {
    await this.contactUsLink.click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.contactUsMainHeading.waitFor({ state: 'visible', timeout: 10000 })
  }

  getOfficeHoursRow(day: string): Locator {
    return this.officeHoursTable
      .locator('div[class*="grid grid-cols-1"]')
      .filter({ hasText: day })
  }

  getOfficeHoursStatus(day: string): Locator {
    return this.getOfficeHoursRow(day)
      .locator('span[class*="inline-flex"]')
  }

  getEmergencyCard(name: string): Locator {
    return this.page
      .locator('a[href^="tel:"].flex.flex-col')
      .filter({ hasText: name })
  }

  getEmergencyNumber(name: string): Locator {
    return this.getEmergencyCard(name).locator('span').last()
  }
}
