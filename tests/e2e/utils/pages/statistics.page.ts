import type { Locator, Page } from '@playwright/test'

export class StatisticsPage {
  readonly page: Page
  readonly statisticsLink: Locator

  // City Statistics Main Header Variables
  readonly cityStatisticsMainHeader: Locator
  readonly cityStatisticsDescription: Locator

  // City Income Variables
  readonly cityIncomeMainHeading: Locator
  readonly cityIncomeDescription: Locator
  readonly incomeCompositionHeading: Locator

  // Population Trends Variables
  readonly populationTrendsMainHeading: Locator
  readonly populationTrendsDescription: Locator

  // Population by Barangay Variables
  readonly populationByBarangayMainHeader: Locator
  readonly populationByBarangayDescription: Locator
  readonly spotCheckBarangayTopTen: Locator
  readonly spotCheckBarangayTopTenPopulation: Locator

  // Las Piñas Competitive Index Variables
  readonly competitiveIndexMainHeading: Locator
  readonly competitiveIndexDescription: Locator
  readonly overallRankingsTrendHeading: Locator
  readonly keyIndicatorsTrendHeading: Locator

  // Population Bar Chart Variables
  readonly populationBarChartMainHeading: Locator
  readonly populationBarChartDescription: Locator

  constructor(page: Page) {
    this.page = page
    this.statisticsLink = page.getByRole('link', { name: 'Statistics', exact: true })

    // City Statistics Main Header Locators
    this.cityStatisticsMainHeader = page.getByRole('heading', { name: 'City Statistics', level: 1, exact: true })
    this.cityStatisticsDescription = page.getByText(/Data and statistics about Las Piñas, Metro Manila/)

    // City Income Locators
    this.cityIncomeMainHeading = page.getByRole('heading', { name: 'City Income', level: 2, exact: true })
    this.cityIncomeDescription = page.getByText('Financial standing for fiscal year 2024')
    this.incomeCompositionHeading = page.getByRole('heading', { name: 'Income Composition', level: 4, exact: true })

    // Population Trends Locators
    this.populationTrendsMainHeading = page.getByRole('heading', { name: 'Population Trends', level: 2, exact: true })
    this.populationTrendsDescription = page.getByText('Population growth from 2020 to 2024')

    // Population by Barangay Locators
    this.populationByBarangayMainHeader = page.getByRole('heading', { name: 'Population by Barangay', level: 2, exact: true })
    this.populationByBarangayDescription = page.getByText('2024 Census of Population')
    this.spotCheckBarangayTopTen = page.getByText('Talon Tres', { exact: true })
    this.spotCheckBarangayTopTenPopulation = page.getByText('33,192', { exact: true })

    // Las Piñas Competitive Index Locators
    this.competitiveIndexMainHeading = page.getByRole('heading', { name: 'Las Piñas Competitive Index', level: 2, exact: true })
    this.competitiveIndexDescription = page.getByText('Cities and Municipalities Competitiveness Index (CMCI) Performance')
    this.overallRankingsTrendHeading = page.getByRole('heading', { name: 'Overall Rankings Trend (2016-2024)', level: 4 })
    this.keyIndicatorsTrendHeading = page.getByRole('heading', { name: 'Key Indicators Trend (2016-2024)', level: 4 })

    // Population Bar Chart Locators
    this.populationBarChartMainHeading = page.getByRole('heading', { name: 'Population Bar Chart', level: 2, exact: true })
    this.populationBarChartDescription = page.getByText('Comparative view of all 20 barangays')
  }

  async navigateToStatisticsPage() {
    await this.statisticsLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  getStatCard(label: string): Locator {
    return this.page.getByText(label, { exact: true }).locator('..')
  }

  getKeyMetricValue(label: string): Locator {
    return this.getStatCard(label).locator('div[class*="text-3xl"]')
  }

  getIncomeCard(label: string): Locator {
    return this.page.getByText(label, { exact: true }).locator('../..')
  }

  getIncomeValues(label: string): Locator {
    return this.getIncomeCard(label).locator('div[class*="text-3xl"]')
  }

  getPopulationCard(label: string): Locator {
    return this.page.getByText(label, { exact: true }).locator('..').filter({ hasNotText: 'Population Trends' })
  }

  getPopulationValues(label: string): Locator {
    return this.getPopulationCard(label).locator('span[class*="text-2xl"]').first()
  }

  getIndexCard(label: string): Locator {
    return this.page.getByRole('heading', { name: label, level: 4, exact: true })
  }

  getIndexValue(value: string): Locator {
    return this.page.getByText(value, { exact: true })
  }
}
