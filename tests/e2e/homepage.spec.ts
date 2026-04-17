import { expect, test } from '@playwright/test'

test.describe('Home Page/Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // Check the Landing Page Main Elements
  test('should load and display main elements', async ({ page }) => {
    // Check the title of the page
    await expect(page).toHaveTitle(/Home | BetterLasPinas.org/i)
    // Check the Hotline Numbers
    await test.step('Check Hotline Numbers', async () => {
      await expect(page.getByRole('link', { name: /Command Center/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Police Station/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Fire Station/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /CDRRMO/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /City Health Office/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Mayor's Office/i })).toBeVisible()
    })

    await test.step('Check the Logo and Title', async () => {
      await expect(page.getByAltText(/Las Piñas Logo/i)).toBeVisible()
      await expect(page.getByText(/ BetterLasPiñas/i)).toBeVisible()
    })

    await test.step('Check the Navigation Links', async () => {
      await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Services', exact: true })).toBeVisible()
      await page.getByRole('link', { name: 'Services', exact: true }).hover()
      await expect(page.getByRole('menuitem', { name: 'Certificates', exact: true })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Government', exact: true })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Statistics', exact: true })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Contact', exact: true })).toBeVisible()
    })

    await test.step('Check hero section', async () => {
      await expect(page.getByRole('heading', { name: 'Welcome to BetterLasPinas.org', level: 1, exact: true })).toBeVisible()
      await expect(page.getByRole('searchbox', { name: /Search services/i })).toBeVisible()
    })

    await test.step('Check the Popular Services Section', async () => {
      await expect(page.getByRole('heading', { name: 'Popular Services', level: 2, exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Certificates', level: 3, exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'View All Services', level: 3, exact: true })).toBeVisible()
    })

    await test.step('Check the Population, Barangays, City and Land Area Section', async () => {
      await expect(page.getByText('Population', { exact: true })).toBeVisible()
      await expect(page.getByText('Barangays', { exact: true })).toBeVisible()
      await expect(page.getByText('City', { exact: true })).toBeVisible()
      await expect(page.getByText('Land Area', { exact: true })).toBeVisible()
    })
    await test.step('Check Weather and Maps Section', async () => {
      await expect(page.getByText('Wind', { exact: true })).toBeVisible()
      await expect(page.getByText('High', { exact: true })).toBeVisible()
      await expect(page.getByText('Low', { exact: true })).toBeVisible()
      await expect(page.getByText('City Hall, Las Piñas, Metro Manila', { exact: true })).toBeVisible()
    })

    await test.step('Check the City Leadership Section', async () => {
      await expect(page.getByText('Hon. April Aguilar-Nery', { exact: true })).toBeVisible()
      await expect(page.getByText('Hon. Imelda Aguilar', { exact: true })).toBeVisible()
    })

    await test.step('Check the Contact Section', async () => {
      await expect(page.getByText('Contact Information', { exact: true })).toBeVisible()
      await expect(page.getByText('Phone', { exact: true })).toBeVisible()
      await expect(page.getByText('Email', { exact: true })).toBeVisible()
      await expect(page.getByText('Address', { exact: true })).toBeVisible()
    })

    await test.step('Check the Footer Section', async () => {
      await expect(page.getByText('Quick Links', { exact: true })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Sitemap$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Terms of Use$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Privacy Policy$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Accessibility$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^FAQ$/ })).toBeVisible()
      await expect(page.getByText('Resources', { exact: true })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Open Data Philippines$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^Freedom of Information$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^BLGF Portal$/ })).toBeVisible()
      await expect(page.locator('a').filter({ hasText: /^CMCI DTI Portal$/ })).toBeVisible()
      await expect(page.getByText('Get Involved', { exact: true })).toBeVisible()
    })
  })

  test('should have working search functionality ', async ({ page }) => {
    const searchInput = page.getByPlaceholder('e.g., birth certificate, business permit')
    await expect(searchInput).toBeVisible()
    await searchInput.fill('birth certificate')

    const searchResult = page.locator('button').filter({ hasText: 'Birth Certificate' })
    await expect(searchResult).toBeVisible()
    await searchResult.click()

    // Verify that the user is navigated to the correct service page
    await expect(page).toHaveURL('https://betterlaspinas.org/service-details/birth-certificate')
    await expect(page.getByRole('heading', { name: 'Birth Certificate (Local Copy)', level: 1, exact: true })).toBeVisible()
  })
})
