import { expect, test } from '../../lib/fixtures/base.fixture'

test.describe('Government Structure and Officials', () => {
  test('should navigate to Government Structure and Officials page', async ({ page, governmentPage }) => {
    await expect(page).toHaveURL(/\/government/i)
    await expect(page.getByRole('heading', { name: 'Government Structure & Officials', level: 1 })).toBeVisible()

    await test.step('Verifying Executive Branch section', async () => {
      await expect(governmentPage.cityLeadershipIcon).toBeVisible()
      await expect(governmentPage.cityLeadershipHeading).toBeVisible()
      await expect(governmentPage.cityLeadershipDescription).toBeVisible()
    })

    await test.step('should display City Mayor and Vice Mayor section', async () => {
      // Implementation for Mayor section
      await expect(governmentPage.positionLabelMayor).toBeVisible()
      await expect(governmentPage.nameMayor).toBeVisible()
      // Implementation for Vice Mayor section
      await expect(governmentPage.positionLabelViceMayor).toBeVisible()
      await expect(governmentPage.nameViceMayor).toBeVisible()
    })

    await test.step('Verifying Legislative Branch section', async () => {
      const councilors = [
        { name: 'Hon. Alelee Aguilar', committee: 'Committee on Education, Health & Family' },
        { name: 'Hon. Albie Aguilar', committee: 'Committee on Youth & Sports Development' },
        { name: 'Hon. Jess Bustamante', committee: 'Committee on Environment & Natural Resources' },
        { name: 'Hon. Doc Eric De Leon', committee: 'Committee on Health & Sanitation' },
        { name: 'Hon. Mac-Mac Santos', committee: 'Committee on Laws, Rules & Privileges' },
        { name: 'Hon. Roberto Cristobal', committee: 'Committee on Ways & Means' },
        { name: 'Hon. Lord Aguilar', committee: 'Committee on Appropriations' },
        { name: 'Hon. Henry Medina', committee: 'Committee on Engineering & Public Works' },
        { name: 'Hon. Ruben Ramos', committee: 'Committee on Transportation & Public Order' },
        { name: 'Hon. Emmanuel Luis Casimiro', committee: 'Committee on Tourism & Cultural Affairs' },
        { name: 'Hon. Danok Hernandez', committee: 'Committee on Trade, Commerce & Industry' },
        { name: 'Hon. Macky Saito', committee: 'Committee on Social Services' },
        // Liga ng mga Barangay President and SK Federation President
        { name: 'Hon. Jose Mauricio Riguera', committee: 'Committee on Barangay Affairs (Ex-Officio)' },
        { name: 'Hon. Rey Angelo Reyes', committee: 'Committee on Youth & Sports (Ex-Officio)' },
      ]
      await expect(governmentPage.legislativeBranchIcon).toBeVisible()
      await expect(governmentPage.legislativeHeading).toBeVisible()
      await expect(governmentPage.legislativeDescription).toBeVisible()

      await test.step('should display all councilors with their committees', async () => {
        for (const councilor of councilors) {
          await expect(governmentPage.getCouncilor(councilor.name)).toBeVisible()
          await expect(governmentPage.getCouncilorCommittee(councilor.name)).toContainText(councilor.committee)
        }
      })
    })

    await test.step('Verifying City Offices section', async () => {
      const offices = [
        { department: 'City Civil Registry', service: 'Birth, death, marriage certificates, CENOMAR' },
        { department: 'City Treasurer\'s Office', service: 'Tax payments, real property tax, revenue collection' },
        { department: 'City Engineering Office', service: 'Building permits, construction permits, infrastructure' },
        { department: 'City Social Welfare and Development Office', service: 'Social services, PWD & senior citizen IDs, financial assistance' },
        { department: 'City Agriculture Office', service: 'Agricultural loans, crop insurance, fertilizer assistance' },
        { department: 'City Planning & Development Office', service: 'Development planning, project monitoring, zoning' },
        { department: 'City Assessor\'s Office', service: 'Property assessment, tax declarations, land records' },
        { department: 'City Accounting Office', service: 'Financial records, disbursements, accounting services' },
        { department: 'City Budget Office', service: 'Budget preparation, appropriations, fiscal management' },
        { department: 'City General Services Office', service: 'Property management, procurement, administration' },
        { department: 'City Health Office', service: 'Vaccination, health certificates, medical assistance' },
        { department: 'Business Permits & Licensing Office', service: 'Business permits, Mayor\'s clearance, licensing' },
        { department: 'Human Resource Management Office', service: 'Personnel services, recruitment, employee records' },
        { department: 'City Disaster Risk Reduction and Management Office', service: 'Disaster preparedness, emergency response, risk reduction' },
      ]
      await expect(governmentPage.cityOfficeIcon).toBeVisible()
      await expect(governmentPage.cityOfficeHeading).toBeVisible()
      await expect(governmentPage.cityOfficeDescription).toBeVisible()
      await test.step('should display all offices with their services', async () => {
        for (const office of offices) {
          await expect(governmentPage.getOffice(office.department)).toBeVisible()
          await expect(governmentPage.getOfficeServices(office.department)).toContainText(office.service)
        }
      })
    })

    await test.step('Verifying Barangays section', async () => {
      const barangays = [
        { barangayName: 'Almanza Dos', captain: 'Kap. Vicente A. Alovera Jr.' },
        { barangayName: 'Almanza Uno', captain: 'Kap. Carlo T. Francisco' },
        { barangayName: 'B.F. International Village', captain: 'Kap. Asuncion C. Aguilar' },
        { barangayName: 'Daniel Fajardo (Poblacion)', captain: 'Kap. Rodolfo B. Cristobal' },
        { barangayName: 'Elias Aldana', captain: 'Kap. Edwardo O. Robles' },
        { barangayName: 'Ilaya', captain: 'Kap. Generoso D. Miranda' },
        { barangayName: 'Manuyo Dos', captain: 'Kap. Mark G. Nery' },
        { barangayName: 'Manuyo Uno', captain: 'Kap. Florante S. Dela Cruz' },
        { barangayName: 'Pamplona Dos', captain: 'Kap. Roberto D.H. Villalon' },
        { barangayName: 'Pamplona Tres', captain: 'Kap. Jose Mauricio Agustin R. Riguera' },
        { barangayName: 'Pamplona Uno', captain: 'Kap. Reinier S. Salvador' },
        { barangayName: 'Pilar', captain: 'Kap. Ronillo B. Fuentes' },
        { barangayName: 'Pulang Lupa Dos', captain: 'Kap. Julie R. Quines' },
        { barangayName: 'Pulang Lupa Uno', captain: 'Kap. Guadalupe A. Rosales' },
        { barangayName: 'Talon Dos', captain: 'Kap. Arnold F. Reyes' },
        { barangayName: 'Talon Kuatro', captain: 'Kap. Ignacio B. Sangga' },
        { barangayName: 'Talon Singko', captain: 'Kap. Josefina B. Bumanlag' },
        { barangayName: 'Talon Tres', captain: 'Kap. Christopher A. Lucena' },
        { barangayName: 'Talon Uno', captain: 'Kap. Lester Aranda' },
        { barangayName: 'Zapote', captain: 'Kap. Donato Gabriel R. Gonzalez' },
      ]
      await expect(governmentPage.barangayIcon).toBeVisible()
      await expect(governmentPage.barangayHeading).toBeVisible()
      await expect(governmentPage.barangayDescription).toBeVisible()
      for (const barangay of barangays) {
        await expect (governmentPage.getBarangay(barangay.barangayName)).toBeVisible()
        await expect(governmentPage.getBarangayCaptain(barangay.barangayName)).toContainText(barangay.captain)
      }
    })
  })
})
