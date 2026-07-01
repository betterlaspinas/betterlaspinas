import type { Locator, Page } from '@playwright/test'

export class FrequentlyAskedQuestions {
  // Navigating to FAQ Variables
  readonly page: Page
  readonly quickLinksLabel: Locator
  readonly faqLink: Locator

  // Main Heading Variables
  readonly faqMainHeading: Locator
  readonly faqDescription: Locator

  // General Questions Variables
  readonly generalQuestionsHeader: Locator
  readonly generalSampleQuestion: Locator
  readonly generalSampleAnswer: Locator

  // Certificate & Documents Variables
  readonly certificatesAndDocumentsHeader: Locator
  readonly certificateAndDocumentSampleQuestion: Locator
  readonly certificateAndDocumentSampleAnswer: Locator

  // Business & Permits Variables
  readonly businessAndPermitsHeader: Locator
  readonly businessAndPermitsSampleQuestion: Locator
  readonly businessAndPermitsSampleAnswer: Locator

  // Payment & Fees Variables
  readonly paymentAndFeesHeader: Locator
  readonly paymentAndFeesSampleQuestion: Locator
  readonly paymentAndFeesSampleAnswer: Locator

  // Social Services Variables
  readonly socialServicesHeading: Locator
  readonly socialServicesSampleQuestion: Locator
  readonly socialServicesSampleAnswer: Locator

  // Technical Questions Variables
  readonly technicalQuestionsHeading: Locator
  readonly technicalQuestionSample: Locator
  readonly technicalQuestionSampleAnswer: Locator

  // About This Project Variables
  readonly aboutThisProjectHeading: Locator
  readonly aboutThisProjectSampleQuestion: Locator
  readonly aboutThisProjectSampleAnswer: Locator

  constructor(page: Page) {
    this.page = page
    this.quickLinksLabel = page.getByRole('heading', { name: 'Quick Links', level: 3, exact: true })
    this.faqLink = page.getByRole('link', { name: 'FAQ', exact: true })

    // Main Heading Locators
    this.faqMainHeading = page.getByRole('heading', { name: 'Frequently Asked Questions', level: 1, exact: true })
    this.faqDescription = page.getByText ('Find answers to common questions about City services')

    // General Questions Locators
    this.generalQuestionsHeader = page.getByRole('heading', { name: 'General Questions', level: 2 })
    this.generalSampleQuestion = page.getByRole('button', { name: /What are the office hours of the City Hall/i })
    this.generalSampleAnswer = page.getByText(/The City Hall is generally open Monday to Thursday, 8:00 AM to 7:00 PM/i)

    // Certificates & Documents Locators
    this.certificatesAndDocumentsHeader = page.getByRole('heading', { name: 'Certificates & Documents', level: 2 })
    this.certificateAndDocumentSampleQuestion = page.getByRole('button', { name: /How long does it take to get a birth certificate/i })
    this.certificateAndDocumentSampleAnswer = page.getByText(/For birth certificates registered in Las Piñas,/i)

    // Business & Permits Locators
    this.businessAndPermitsHeader = page.getByRole('heading', { name: 'Business & Permits', level: 2 })
    this.businessAndPermitsSampleQuestion = page.getByRole('button', { name: /When should I renew my business permit/i })
    this.businessAndPermitsSampleAnswer = page.getByText(/Business permits must be renewed annually/i)

    // Payment & Fees Locators
    this.paymentAndFeesHeader = page.getByRole('heading', { name: 'Payments & Fees', level: 2 })
    this.paymentAndFeesSampleQuestion = page.getByRole('button', { name: /What payment methods are accepted/i })
    this.paymentAndFeesSampleAnswer = page.getByText(/Currently, we accept cash payments at the City Treasurer's Office./i)

    // Social Services Locators
    this.socialServicesHeading = page.getByRole('heading', { name: 'Social Services', level: 2 })
    this.socialServicesSampleQuestion = page.getByRole('button', { name: /How do I apply for a Senior Citizen ID/i })
    this.socialServicesSampleAnswer = page.getByText(/Go to the City Social Welfare and Development Office/i)

    // Technical Questions Locators
    this.technicalQuestionsHeading = page.getByRole('heading', { name: 'Technical Questions', level: 2 })
    this.technicalQuestionSample = page.getByRole('button', { name: /I found a broken link or error on this website/i })
    this.technicalQuestionSampleAnswer = page.getByText(/Thank you for helping us improve/i)

    // About This Project Locators
    this.aboutThisProjectHeading = page.getByRole('heading', { name: 'About This Project', level: 2 })
    this.aboutThisProjectSampleQuestion = page.getByRole('button', { name: /Who developed this website/i })
    this.aboutThisProjectSampleAnswer = page.getByText(/The original concept and framework were created by the open-source community at BetterGov/i)
  }

  async navigateToFaq() {
    await this.faqLink.click()
    await this.page.waitForLoadState('networkidle')
  }
}
