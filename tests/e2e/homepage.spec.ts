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
  })
})
