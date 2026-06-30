import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Home Page/Landing Page', () => {
  // Check the Landing Page Main Elements
  test('Verify Hero Section, Main Navigation and Critical Actions to Load correctly', async ({ homePage }) => {
    // Checking Page Title
    await expect(homePage.page).toHaveTitle('Home | BetterLasPinas.org')
    // Checking Hotline Numbers
    await test.step('Check Hotline Numbers Section Visibility', async () => {
      await expect(homePage.commandCenterHotline).toBeVisible()
      await expect(homePage.policeStationHotline).toBeVisible()
      await expect(homePage.fireStationHotline).toBeVisible()
      await expect(homePage.cdrrmoHotline).toBeVisible()
      await expect(homePage.cityHealthOfficeHotline).toBeVisible()
      await expect(homePage.mayorOfficeHotline).toBeVisible()
    })
    // Checking Page Logo and Text Title
    await test.step('Check the Logo and Title Visibility', async () => {
      await expect(homePage.betterLasPinasLogo).toBeVisible()
      await expect(homePage.betterLasPinasTitle).toBeVisible()
    })

    // Checking Navigation Menu Links
    await test.step('Checking the Navigation Menu Links Visibility', async () => {
      await expect(homePage.homeMenu).toBeVisible()
      await expect(homePage.serviceMenu).toBeVisible()
      await homePage.hoverToServicesMenu()
      await expect(homePage.certificateMenuItem).toBeVisible()
      await expect(homePage.businessMenuItem).toBeVisible()
      await expect(homePage.governmentMenu).toBeVisible()
      await expect(homePage.statisticsMenu).toBeVisible()
      await expect(homePage.contactMenu).toBeVisible()
    })
    // Checking Hero Section
    await test.step('Checking Hero Section Visibility', async () => {
      await expect(homePage.betterLasPinasMainHeading).toBeVisible()
      await expect(homePage.betterLasPinasMainDescription).toBeVisible()
      await expect(homePage.findServiceSearchBox).toBeVisible()
    })

    // Checking Popular Services
    await test.step('Check the Popular Services Section Visibility', async () => {
      await expect(homePage.popularServicesCertificates).toBeVisible()
      await expect(homePage.popularServicesBusiness).toBeVisible()
      await expect(homePage.viewAllServices).toBeVisible()
    })

    // Checking Las Piñas at a Glance
    await test.step('Check the Population, Barangays, City and Land Area Section Visibility', async () => {
      await expect(homePage.lasPinasGlanceHeading).toBeVisible()
      const demographics = [
        { label: 'Population', value: '615,549' },
        { label: 'Barangays', value: '20' },
        { label: 'City', value: '1st Class' },
        { label: 'Land Area', value: '32.69 km²' },
      ]

      for (const contents of demographics) {
        await expect(homePage.getDemographicsLabel(contents.label)).toBeVisible()
        await expect (homePage.getDemographicsValue(contents.value)).toBeVisible()
      }
    })

    // Check Weather and Maps Section
    await test.step('Check Weather and Maps Section Visibility', async () => {
      await expect(homePage.weatherAndMapHeading).toBeVisible()
      await expect(homePage.windLabel).toBeVisible()
      await expect(homePage.highTemperatureLabel).toBeVisible()
      await expect(homePage.lowTemperatureLabel).toBeVisible()
      await expect(homePage.mapContainer).toBeVisible()
    })

    // Check City Leadership Section
    await test.step('Check the City Leadership Section Visibility', async () => {
      await expect(homePage.cityMayorLabel).toBeVisible()
      await expect(homePage.cityMayorName).toBeVisible()
      await expect(homePage.cityViceMayorLabel).toBeVisible()
      await expect(homePage.cityViceMayorName).toBeVisible()
    })

    // Check Contact Information Section
    await test.step('Check the Contact Section', async () => {
      await expect(homePage.phoneHeader).toBeVisible()
      await expect(homePage.lasPinasPhoneNumber).toBeVisible()
      await expect(homePage.emailHeader).toBeVisible()
      await expect(homePage.lasPinasEmail).toBeVisible()
      await expect(homePage.addressHeader).toBeVisible()
      await expect(homePage.lasPinasAddress).toBeVisible()
    })
    // Check Footer Section
    await test.step('Check the Footer Section Visibility', async () => {
      await expect(homePage.quickLinksHeading).toBeVisible()
      await expect(homePage.sitemapLink).toBeVisible()
      await expect(homePage.termsOfUseLink).toBeVisible()
      await expect(homePage.privacyPolicyLink).toBeVisible()
      await expect(homePage.accessibilityLink).toBeVisible()
      await expect(homePage.faqLink).toBeVisible()
      await expect(homePage.resourcesHeading).toBeVisible()
      await expect(homePage.openDataPhilippinesLink).toBeVisible()
      await expect(homePage.freedomOfInformationLink).toBeVisible()
      await expect(homePage.blgfPortalLink).toBeVisible()
      await expect(homePage.cmciDtiPortalLink).toBeVisible()
      await expect(homePage.getInvolvedHeading).toBeVisible()
    })
  })

  test('should have working search functionality ', async ({ homePage }) => {
    await expect(homePage.findServiceSearchBox).toBeVisible()
    await homePage.searchForService('birth certificate')
    await homePage.clickResult('Birth Certificate')
    await expect(homePage.birthCertificateMainHeading).toBeVisible()
  })

  test('should have working search functionality cycle 2', async ({ homePage }) => {
    await expect(homePage.findServiceSearchBox).toBeVisible()
    await homePage.searchForService('marriage certificate')
    await homePage.clickResult('Marriage Certificate')
    await expect(homePage.marriageCertificateMainHeading).toBeVisible()
  })
})
