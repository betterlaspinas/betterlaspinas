import { test as baseTest } from '@playwright/test'
import { StatisticsPage } from '../pages/statistics.page'

interface StatisticsFixture {
  statisticsPage: StatisticsPage
}

export const test = baseTest.extend<StatisticsFixture>({
  statisticsPage: async ({ page }, use) => {
    const statisticsPage = new StatisticsPage (page)
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await use(statisticsPage)
  },

})

export { expect } from '@playwright/test'
