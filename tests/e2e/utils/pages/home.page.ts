import type { Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly homePageTitle: Locator

  // Hotlines Variables
  readonly commandCenterHotline: Locator
  readonly policeStationHotline: Locator
  readonly fireStationHotline: Locator
  readonly cdrrmoHotline: Locator
  readonly cityHealthOfficeHotline: Locator
  readonly mayorOfficeHotline: Locator

  // Check Logo and Title Variables
  readonly betterLasPinasLogo: Locator
  readonly betterLasPinasTitle: Locator

  // Menu Section Variables
  readonly homeMenu: Locator
  readonly serviceMenu: Locator
  readonly certificateMenuItem: Locator
  readonly businessMenuItem: Locator
  readonly governmentMenu: Locator
  readonly statisticsMenu: Locator
  readonly contactMenu: Locator

  // Hero Section Variables
  readonly betterLasPinasMainHeading: Locator
  readonly betterLasPinasMainDescription: Locator
  readonly findServiceSearchBox: Locator

  // Popular Services Variables
  readonly popularServicesCertificates: Locator
  readonly popularServicesBusiness: Locator
  readonly viewAllServices: Locator

  // Las Piñas at a Glance Variables
  readonly lasPinasGlanceHeading: Locator

  // Weather and Map of Las Piñas Variables
  readonly weatherAndMapHeading: Locator
  readonly windLabel: Locator
  readonly highTemperatureLabel: Locator
  readonly lowTemperatureLabel: Locator
  readonly mapContainer: Locator

  // City Leadership Variables
  readonly cityMayorLabel: Locator
  readonly cityMayorName: Locator
  readonly cityViceMayorLabel: Locator
  readonly cityViceMayorName: Locator

  // City Contact Information Variables
  readonly phoneHeader: Locator
  readonly lasPinasPhoneNumber: Locator
  readonly emailHeader: Locator
  readonly lasPinasEmail: Locator
  readonly addressHeader: Locator
  readonly lasPinasAddress: Locator

  // Footer Section Variables
  readonly quickLinksHeading: Locator
  readonly sitemapLink: Locator
  readonly termsOfUseLink: Locator
  readonly privacyPolicyLink: Locator
  readonly accessibilityLink: Locator
  readonly faqLink: Locator
  readonly resourcesHeading: Locator
  readonly openDataPhilippinesLink: Locator
  readonly freedomOfInformationLink: Locator
  readonly blgfPortalLink: Locator
  readonly cmciDtiPortalLink: Locator
  readonly getInvolvedHeading: Locator

  // Birth & Marriage Certificate Spot Check Variables
  readonly birthCertificateMainHeading: Locator
  readonly marriageCertificateMainHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.homePageTitle = page.getByTitle('Home | BetterLasPinas.org', { exact: true })

    // Hotlines Locators
    this.commandCenterHotline = page.getByRole('link', { name: 'Command Center: 8290-6500' })
    this.policeStationHotline = page.getByRole('link', { name: 'Police Station: 8551-6401' })
    this.fireStationHotline = page.getByRole('link', { name: 'Fire Station: 8874-6177' })
    this.cdrrmoHotline = page.getByRole('link', { name: 'CDRRMO: 8290-6500' })
    this.cityHealthOfficeHotline = page.getByRole('link', { name: 'City Health Office: 8367-3406' })
    this.mayorOfficeHotline = page.getByRole('link', { name: 'Mayor\'s Office: 8871-4343' })

    // Check Logo and Title Locator
    this.betterLasPinasLogo = page.getByAltText('Las Piñas Logo', { exact: true })
    this.betterLasPinasTitle = page.getByText('BetterLasPiñas', { exact: true })

    // Menu Section Locators
    this.homeMenu = page.getByRole('link', { name: 'Home', exact: true })
    this.serviceMenu = page.getByRole('link', { name: 'Services', exact: true })
    this.certificateMenuItem = page.getByRole('menuitem', { name: 'Certificates', exact: true })
    this.businessMenuItem = page.getByRole('menuitem', { name: 'Business', exact: true })
    this.governmentMenu = page.getByRole('link', { name: 'Government', exact: true })
    this.statisticsMenu = page.getByRole('link', { name: 'Statistics', exact: true })
    this.contactMenu = page.getByRole('link', { name: 'Contact', exact: true })

    // Hero Section Locators
    this.betterLasPinasMainHeading = page.getByRole('heading', { name: 'Welcome to BetterLasPinas.org', level: 1, exact: true })
    this.betterLasPinasMainDescription = page.getByText('Access government services, information, and resources for the people of Las Piñas, Metro Manila.')
    this.findServiceSearchBox = page.getByPlaceholder('e.g., birth certificate, business permit', { exact: true })

    // Popular Services Locators
    this.popularServicesCertificates = page.getByRole('heading', { name: 'Certificates', level: 3, exact: true })
    this.popularServicesBusiness = page.getByRole('heading', { name: 'Business Permits', level: 3, exact: true })
    this.viewAllServices = page.getByRole('heading', { name: 'View All Services', level: 3, exact: true })

    // Las Piñas at a Glance Locators
    this.lasPinasGlanceHeading = page.getByRole('heading', { name: 'Las Piñas at a Glance', level: 2, exact: true })

    // Weather and Map of Las Piñas Locators
    this.weatherAndMapHeading = page.getByRole('heading', { name: 'Weather and Map of Las Piñas', level: 2, exact: true })
    this.windLabel = page.getByText('Wind', { exact: true })
    this.highTemperatureLabel = page.getByText('High', { exact: true })
    this.lowTemperatureLabel = page.getByText('Low', { exact: true })
    this.mapContainer = page.locator('.leaflet-container')

    // City Leadership Locators
    this.cityMayorLabel = page.getByText('City Mayor', { exact: true })
    this.cityMayorName = page.getByRole('heading', { name: 'Hon. April Aguilar-Nery', level: 3, exact: true })
    this.cityViceMayorLabel = page.getByText('City Vice Mayor', { exact: true })
    this.cityViceMayorName = page.getByRole('heading', { name: 'Hon. Imelda Aguilar', level: 3, exact: true })

    // Contact Information Locators
    this.phoneHeader = page.getByRole('heading', { name: 'Phone', level: 3, exact: true })
    this.lasPinasPhoneNumber = page.locator('p').filter({ hasText: '(02) 8871-4343' })
    this.emailHeader = page.getByRole('heading', { name: 'Email', level: 3, exact: true })
    this.lasPinasEmail = page.locator('p').filter({ hasText: 'laspinascitygov@yahoo.com' })
    this.addressHeader = page.getByRole('heading', { name: 'Address', level: 3, exact: true })
    this.lasPinasAddress = page.locator('p').filter({ hasText: /^City Hall$/ })

    // Footer Section Locators
    this.quickLinksHeading = page.getByRole('heading', { name: 'Quick Links', level: 3, exact: true })
    this.sitemapLink = page.locator('a').filter({ hasText: /^Sitemap$/ })
    this.termsOfUseLink = page.locator('a').filter({ hasText: /^Terms of Use$/ })
    this.privacyPolicyLink = page.locator('a').filter({ hasText: /^Privacy Policy$/ })
    this.accessibilityLink = page.locator('a').filter({ hasText: /^Accessibility$/ })
    this.faqLink = page.locator('a').filter({ hasText: /^FAQ$/ })
    this.resourcesHeading = page.getByText('Resources', { exact: true })
    this.openDataPhilippinesLink = page.locator('a').filter({ hasText: /^Open Data Philippines$/ })
    this.freedomOfInformationLink = page.locator('a').filter({ hasText: /^Freedom of Information$/ })
    this.blgfPortalLink = page.locator('a').filter({ hasText: /^BLGF Portal$/ })
    this.cmciDtiPortalLink = page.locator('a').filter({ hasText: /^CMCI DTI Portal$/ })
    this.getInvolvedHeading = page.getByText('Get Involved', { exact: true })

    // Birth & Marriage Certificate Spot Check Locators
    this.birthCertificateMainHeading = page.getByRole('heading', { name: 'Birth Certificate (Local Copy)', level: 1, exact: true })
    this.marriageCertificateMainHeading = page.getByRole('heading', { name: 'Marriage Certificate Registration & Copy', level: 1, exact: true })
  }

  async hoverToServicesMenu() {
    await this.serviceMenu.hover()
  }

  getDemographicsLabel(label: string): Locator {
    return this.page.getByText(label, { exact: true })
  }

  getDemographicsValue(value: string): Locator {
    return this.page.getByText(value, { exact: true })
  }

  async searchForService(term: string) {
    await this.findServiceSearchBox.fill(term)
  }

  async clickResult(resultName: string) {
    const result = this.page.getByRole('button', { name: resultName })
    await result.click()
  }
}
