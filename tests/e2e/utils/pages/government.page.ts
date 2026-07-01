import type { Locator, Page } from '@playwright/test'

export class GovernmentPage {
  readonly page: Page
  // Executive Variables
  readonly cityLeadershipIcon: Locator
  readonly cityLeadershipHeading: Locator
  readonly cityLeadershipDescription: Locator
  readonly positionLabelMayor: Locator
  readonly nameMayor: Locator
  readonly positionLabelViceMayor: Locator
  readonly nameViceMayor: Locator
  // Legislative Variables
  readonly legislativeBranchIcon: Locator
  readonly legislativeHeading: Locator
  readonly legislativeDescription: Locator
  // City Office Variables
  readonly cityOfficeIcon: Locator
  readonly cityOfficeHeading: Locator
  readonly cityOfficeDescription: Locator
  // Barangay Variables
  readonly barangayIcon: Locator
  readonly barangayHeading: Locator
  readonly barangayDescription: Locator

  constructor(page: Page) {
    this.page = page
    // Initialize locators for the Government page
    this.cityLeadershipIcon = page.locator('span').filter({ hasText: 'Executive Branch' })
    this.cityLeadershipHeading = page.getByRole('heading', { name: 'City Leadership', level: 2 })
    this.cityLeadershipDescription = page.getByText('The executive officials leading Las Piñas\'s governance')

    this.positionLabelMayor = page.locator('span').filter({ hasText: 'City Mayor' })
    this.nameMayor = page.getByRole('heading', { name: 'Hon. April Aguilar-Nery', level: 3 })
    this.positionLabelViceMayor = page.locator('span').filter({ hasText: 'City Vice Mayor' })
    this.nameViceMayor = page.getByRole('heading', { name: 'Hon. Imelda Aguilar', level: 3 })

    // Initialize locators for the Legislative Branch section as needed.
    this.legislativeBranchIcon = page.locator('span').filter({ hasText: 'Legislative Branch' })
    this.legislativeHeading = page.getByRole('heading', { name: 'Sangguniang Panlungsod Members', level: 2 })
    this.legislativeDescription = page.getByText('Councilors serving the people of Las Piñas')

    // Initialize locators for the City Offices branch as needed.
    this.cityOfficeIcon = page.locator('span').filter({ hasText: 'City Offices' })
    this.cityOfficeHeading = page.getByRole('heading', { name: 'Department Heads & Key Offices' })
    this.cityOfficeDescription = page.getByText('City offices providing services to citizens')

    // Initialize locators for the Barangays section as needed.
    this.barangayIcon = page.locator('span').filter({ hasText: 'Barangays' })
    this.barangayHeading = page.getByRole('heading', { name: 'Barangays of Las Piñas' })
    this.barangayDescription = page.getByText('20 Barangays serving our community')
  }

  // Create reusable methods - get the councilor names.
  getCouncilor(name: string): Locator {
    return this.page.getByRole('heading', { name, level: 4 })
  }

  getCouncilorCommittee(name: string): Locator {
    // locate the heading , chain locators by going to the main div and locate the paragraphs.
    return this.page.getByRole('heading', { name, level: 4 }).locator('..').locator('p')
  }

  // Create reusable methods - get the office names.
  getOffice(name: string): Locator {
    return this.page.getByRole('heading', { name, level: 4 })
  }

  getOfficeServices(name: string): Locator {
    // locate the heading , chain locators by going to the main div and locate the paragraphs.
    return this.page.getByRole('heading', { name, level: 4 }).locator('..').locator('p')
  }

  // Create reusable methods - get the barangay names.
  getBarangay(name: string): Locator {
    return this.page.getByRole('link').filter({ hasText: name })
  }

  getBarangayCaptain(name: string): Locator {
    return this.page.getByRole('link').filter({ hasText: name }).locator('span.block')
  }
}
