import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Frequently Asked Question Page', () => {
  test('Check Frequently Asked Question Link Visibility', async ({ frequentlyAskedQuestions }) => {
    await expect (frequentlyAskedQuestions.quickLinksLabel).toBeVisible()
    await expect (frequentlyAskedQuestions.faqLink).toBeVisible()

    await test.step('Navigate to FAQ page', async () => {
      await frequentlyAskedQuestions.navigateToFaq()
      await expect(frequentlyAskedQuestions.faqMainHeading).toBeVisible()
      await expect(frequentlyAskedQuestions.faqDescription).toBeVisible()
    })

    await test.step('Check General Questions Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.generalQuestionsHeader).toBeVisible()
      await frequentlyAskedQuestions.generalSampleQuestion.click()
      await expect(frequentlyAskedQuestions.generalSampleAnswer).toBeVisible()
    })

    await test.step('Check Certificates & Documents Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.certificatesAndDocumentsHeader).toBeVisible()
      await frequentlyAskedQuestions.certificateAndDocumentSampleQuestion.click()
      await expect(frequentlyAskedQuestions.certificateAndDocumentSampleAnswer).toBeVisible()
    })

    await test.step('Check Business & Permits Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.businessAndPermitsHeader).toBeVisible()
      await frequentlyAskedQuestions.businessAndPermitsSampleQuestion.click()
      await expect(frequentlyAskedQuestions.businessAndPermitsSampleAnswer).toBeVisible()
    })

    await test.step('Check Payments & Fees Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.paymentAndFeesHeader).toBeVisible()
      await frequentlyAskedQuestions.paymentAndFeesSampleQuestion.click()
      await expect(frequentlyAskedQuestions.paymentAndFeesSampleAnswer).toBeVisible()
    })

    await test.step('Check Social Services Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.socialServicesHeading).toBeVisible()
      await frequentlyAskedQuestions.socialServicesSampleQuestion.click()
      await expect(frequentlyAskedQuestions.socialServicesSampleAnswer).toBeVisible()
    })

    await test.step ('Check Technical Questions Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.technicalQuestionsHeading).toBeVisible()
      await frequentlyAskedQuestions.technicalQuestionSample.click()
      await expect(frequentlyAskedQuestions.technicalQuestionSampleAnswer).toBeVisible()
    })

    await test.step('Check About This Project Section Visibility', async () => {
      await expect(frequentlyAskedQuestions.aboutThisProjectHeading).toBeVisible()
      await frequentlyAskedQuestions.aboutThisProjectSampleQuestion.click()
      await expect (frequentlyAskedQuestions.aboutThisProjectSampleAnswer).toBeVisible()
    })
  })
})
