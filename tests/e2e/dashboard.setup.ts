import { expect, test as setup } from '@playwright/test'

setup('Dashboard Visibility', async ({ page }) => {
  await page.goto('https://betterlaspinas.org/')
  await expect(page.getByRole('link', { name: 'Command Center: 8290-6500' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Police Station: 8551-6401' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Fire Station: 8874-6177' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'CDRRMO: 8290-6500' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'City Health Office: 8994-5782' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Mayor\'s Office: 8871-4343' })).toBeVisible()
})
