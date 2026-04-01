import { expect, test } from '@playwright/test'

test.describe('Navigate to the Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://betterlaspinas.org/')
  })

  // Checking if all the hotline numbers are visible and correct.
  test('Check if all the hotline numbers are visible and correct', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Command Center: 8290-6500' })).toBeVisible()
  })
})
