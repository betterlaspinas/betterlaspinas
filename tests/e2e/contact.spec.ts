import { expect, test } from './utils/fixtures/base.fixture'

test.describe('Contact Us Page', () => {
  test('Check Contact Us Link Visibility', async ({ contactUsPage }) => {
    await expect(contactUsPage.contactUsLink).toBeVisible()

    await test.step('Navigate to Contact Us Page', async () => {
      await contactUsPage.navigateToContactUsPage()
      await expect(contactUsPage.contactUsMainHeading).toBeVisible()
      await expect(contactUsPage.contactUsDescription).toBeVisible()
    })

    await test.step('Check Email and Phone Section Visibility', async () => {
      await expect(contactUsPage.emailMainHeading).toBeVisible()
      await expect(contactUsPage.laspinasEmail).toBeVisible()
      await expect(contactUsPage.phoneMainHeading).toBeVisible()
      await expect(contactUsPage.laspinasPhone).toBeVisible()
    })

    await test.step('Check Office Hours Section Visibility', async () => {
      await expect(contactUsPage.officeHoursMainHeading).toBeVisible()

      const officeHours = [
        { day: 'Monday - Thursday', hours: '8:00 AM - 7:00 PM', status: 'Open' },
        { day: 'Friday', hours: '8:00 AM - 5:00 PM', status: 'Partial' },
        { day: 'Saturday & Sunday', hours: 'Closed', status: 'Closed' },
        { day: 'National & Local Holidays', hours: 'Closed', status: 'Closed' },
      ]

      for (const row of officeHours) {
        await expect(contactUsPage.getOfficeHoursRow(row.day)).toBeVisible()
        await expect(contactUsPage.getOfficeHoursStatus(row.day)).toContainText(row.status)
      }
    })

    await test.step('Check Emergency Hotlines section Visibility', async () => {
      await expect(contactUsPage.emergencyHotlinesMainHeading).toBeVisible()
      await expect(contactUsPage.emergencyHotlinesDescription).toBeVisible()

      const emergencyHotlines = [
        { name: 'Command Center', number: '8290-6500' },
        { name: 'Police Station', number: '8551-6401' },
        { name: 'Fire Station', number: '8874-6177' },
        { name: 'CDRRMO', number: '8290-6500' },
        { name: 'Mayor\'s Office', number: '8871-4343' },
        { name: 'CSWDO', number: '8403-7045' },
        { name: 'DILG Field Office', number: '8241-9709' },
        { name: 'Meralco', number: '16211' },
        { name: 'Maynilad Water Services, Inc.', number: '1626' },
      ]

      for (const hotlines of emergencyHotlines) {
        await expect(contactUsPage.getEmergencyCard(hotlines.name)).toBeVisible()
        await expect(contactUsPage.getEmergencyNumber(hotlines.name)).toContainText(hotlines.number)
      }
    })

    await test.step('Check Medical Emergency Hotlines', async () => {
      await expect(contactUsPage.medicalEmergencyHotlinesMainHeading).toBeVisible()
      await expect(contactUsPage.medicalEmergencyHotlinesDescription).toBeVisible()

      const medicalEmergency = [
        { name: 'City Health Office', number: '8367-3406' },
        { name: 'Red Cross', number: '143' },
      ]

      for (const medicalHotlines of medicalEmergency) {
        await expect(contactUsPage.getEmergencyCard(medicalHotlines.name)).toBeVisible()
        await expect(contactUsPage.getEmergencyNumber(medicalHotlines.name)).toContainText(medicalHotlines.number)
      }
    })
  })
})
