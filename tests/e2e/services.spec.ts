import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Services Page', () => {
  // Navigate to Certificates and Business pages via Menu
  test('should navigate to Certificates via Menu', async ({ page, certificatesPage }) => {
    await expect(page).toHaveURL(/\/services\/certificates/i)
    await expect(page.getByRole('heading', { name: 'Certificates & Vital Records', level: 2, exact: true })).toBeVisible()

    await test.step('Check the list of certificates', async () => {
      await expect(certificatesPage.birthCertificate).toBeVisible()
      await expect(certificatesPage.marriageCertificate).toBeVisible()
      await expect(certificatesPage.deathCertificate).toBeVisible()
      // These (3) certificates are currently not having redirection page.
      await expect(certificatesPage.barangayClearance).toBeVisible()
      await expect(certificatesPage.barangayId).toBeVisible()
      await expect(certificatesPage.policeClearance).toBeVisible()
    })

    await test.step('Navigate to Birth Certificate page', async () => {
      await certificatesPage.navigateToBirthCertificate()
      await expect(page).toHaveURL(/\/service-details\/birth-certificate/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Check Eligibility', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Prepare Documents', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Visit Civil Registry', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Fill Out Request Form', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay the Fee', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Certificate', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Marriage Certificate page', async () => {
      await certificatesPage.navigate()
      await certificatesPage.navigateToMarriageCertificate()
      await expect(page).toHaveURL(/\/service-details\/marriage-certificate/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Gather Documents', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Visit Civil Registry', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Documents & Verification', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Payment', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Registration', level: 4, exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Certificate', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Death Certificate page', async () => {
      await certificatesPage.navigate()
      await certificatesPage.navigateToDeathCertificate()
      await expect(page).toHaveURL(/\/service-details\/death-certificate/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Obtain Medical Certificate', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Visit Civil Registry', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Complete Registry', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay Fees', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Permits', level: 4, exact: true })).toBeVisible()
    })
  })

  test('Should navigate to Business page via Menu', async ({ page, businessPage }) => {
    await expect(page).toHaveURL(/\/services\/business/i)
    await expect(page.getByRole('heading', { name: 'Business, Trade & Investment', level: 2, exact: true })).toBeVisible()

    await test.step('Check the list of business services', async () => {
      await expect(businessPage.businessPermit).toBeVisible()
      await expect(businessPage.businessPermitRenewal).toBeVisible()
      await expect(businessPage.specialPermit).toBeVisible()
      await expect(businessPage.ctcOfBusinessLicense).toBeVisible()
      await expect(businessPage.occupationalPermit).toBeVisible()
      await expect(businessPage.firstTimeJobSeeker).toBeVisible()
      await expect(businessPage.safetySealCertificate).toBeVisible()
    })

    await test.step('Navigate to Business Permit (New) page', async () => {
      await businessPage.navigateToBusiness()
      await expect(page).toHaveURL(/\/service-details\/business-permit-new/i)
      await expect(page.getByRole('heading', { name: 'In-Person Application Method', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Application', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Planning & Engineering Evaluation', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Data Verification', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Approval', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Generate Payment Order', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay Taxes and Fees', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Permit & Clearances', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Business Permit (Renewal) page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToBusinessPermitRenewal()
      await expect(page).toHaveURL(/\/service-details\/business-permit-renewal/i)
      await expect(page.getByRole('heading', { name: 'In-Person Application Method', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Application', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Evaluation & Approval', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Generate Payment Order', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay Taxes and Fees', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Permit & Clearances', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Special Permit page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToSpecialPermit()
      await expect(page).toHaveURL(/\/service-details\/special-permit/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Application & Verification', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay Taxes and Fees', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Special Permit', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Issuance of Certificates on Status of Business page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToCertificateOfStatus()
      await expect(page).toHaveURL(/\/service-details\/business-status-certificate/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Application & Requirements', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay the Fee', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim the Certification', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Issuance of Certified True Copy of Business License and Mayor\s Permit page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToCTCOfBusinessLicense()
      await expect(page).toHaveURL(/\/service-details\/ctc-business-license/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Requirements', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Pay the Fee', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim the Document', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Occupational Mayor\s Permit (Regular) page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToOccupationalPermit()
      await expect(page).toHaveURL(/\/service-details\/occupational-permit/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Secure Application Form', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Requirements', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Assessment and Payment', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Permit', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Occupational Mayor\s Permit (First Time Job Seeker) page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToFirstTimeJob()
      await expect(page).toHaveURL(/\/service-details\/occupational-permit-jobseeker/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Secure Application Form', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Requirements', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Assessment and Evaluation', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Claim Permit', level: 4 })).toBeVisible()
    })

    await test.step('Navigate to Issuance of Safety Seal Certificate page', async () => {
      await businessPage.navigate()
      await businessPage.navigateToSafetySealCertificate()
      await expect(page).toHaveURL(/\/service-details\/safety-seal/i)
      await expect(page.getByRole('heading', { name: 'Step-by-Step Process', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Submit Application', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Review & Scheduling', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Field Inspection', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Database Recording', level: 4 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Issuance of Certificate', level: 4 })).toBeVisible()
    })
  })
})
