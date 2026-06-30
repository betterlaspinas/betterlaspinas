import { expect, test } from '../../lib/fixtures/statistics.fixture'

test.describe('Statistics Page', () => {
  test('Check for Statistics Link Visibility', async ({ page, statisticsPage }) => {
    await expect(statisticsPage.statisticsLink).toBeVisible()

    await test.step('Navigate to Statistics Page', async () => {
      await statisticsPage.navigateToStatisticsPage()
      await expect(statisticsPage.cityStatisticsMainHeader).toBeVisible()
      await expect(statisticsPage.cityStatisticsDescription).toBeVisible()
    })

    await test.step('Check City Statistics Section Visibility', async () => {
      const keyMetrics = [
        { label: 'Population', value: '615,549' },
        { label: 'Barangays', value: '20' },
        { label: 'Land Area (km²)', value: '32.69' },
        { label: 'Income Class', value: '1st Class' },
      ]

      for (const metric of keyMetrics) {
        await expect(statisticsPage.getStatCard(metric.label)).toBeVisible()
        await expect(statisticsPage.getKeyMetricValue(metric.label)).toContainText(metric.value)
      }
    })

    await test.step('Check City Income Section Visibility', async () => {
      await expect(statisticsPage.cityIncomeMainHeading).toBeVisible()
      await expect(statisticsPage.cityIncomeDescription).toBeVisible()

      const incomeValues = [
        { label: 'Annual Income', value: '₱3.89B' },
        { label: 'NTA Share', value: '₱1.74B' },
        { label: 'NTA Dependency', value: '44.60%' },
      ]

      for (const income of incomeValues) {
        await expect(statisticsPage.getIncomeCard(income.label)).toBeVisible()
        await expect(statisticsPage.getIncomeValues(income.label)).toContainText(income.value)
      }

      await expect(statisticsPage.incomeCompositionHeading).toBeVisible()
    })

    await test.step('Check Population Trends Section Visibility', async () => {
      await expect(statisticsPage.populationTrendsMainHeading).toBeVisible()
      await expect(statisticsPage.populationTrendsDescription).toBeVisible()

      const incomeValues = [
        { label: '2020', value: '606,293' },
        { label: '2024', value: '615,549' },
        { label: 'Growth', value: '+0.38% (Annual)' },
      ]

      for (const income of incomeValues) {
        await expect(statisticsPage.getPopulationCard(income.label)).toBeVisible()
        await expect(statisticsPage.getPopulationValues(income.label)).toContainText(income.value)
      }
    })

    await test.step('Check Population by Barangay Section Visibility', async () => {
      await expect(statisticsPage.populationByBarangayMainHeader).toBeVisible()
      await expect(statisticsPage.populationByBarangayDescription).toBeVisible()
      await expect(statisticsPage.spotCheckBarangayTopTen).toBeVisible()
      await expect(statisticsPage.spotCheckBarangayTopTenPopulation).toBeVisible()
    })

    await test.step('Check Las Piñas Competitive Index Section Visibility', async () => {
      await expect(statisticsPage.competitiveIndexMainHeading).toBeVisible()
      await expect(statisticsPage.competitiveIndexDescription).toBeVisible()

      const indexValues = [
        { label: 'Economic Dynamism', value: '3.7800' },
        { label: 'Government Efficiency', value: '8.8844' },
        { label: 'Infrastructure', value: '4.0590' },
        { label: 'Resiliency', value: '11.4576' },
        { label: 'Innovation', value: '6.6662' },
      ]

      for (const index of indexValues) {
        await expect(statisticsPage.getIndexCard(index.label)).toBeVisible()
        await expect(statisticsPage.getIndexValue(index.value)).toBeVisible()
      }

      await expect(statisticsPage.overallRankingsTrendHeading).toBeVisible()
      await expect(statisticsPage.keyIndicatorsTrendHeading).toBeVisible()
    })

    await test.step('Check Population Bart Chart Section Visibility', async () => {
      await expect(statisticsPage.populationBarChartMainHeading).toBeVisible()
      await expect(statisticsPage.populationBarChartDescription).toBeVisible()
    })

    await test.step('Check for broken images', async () => {
      // Injecting JavaScript for Checking broken images.
      const brokenImages = await page.evaluate (() => {
        return Array.from(document.querySelectorAll('img'))
          .filter(img => img.naturalWidth === 0 || img.naturalHeight === 0)
          .map(img => img.src)
      })
      expect(
        brokenImages.length,
        `Broken Images: ${brokenImages.toString()}`,
      ).toBe(0)
    })
  })
})
