import { mergeExpects, mergeTests } from '@playwright/test'
import { expect as aboutPageExpect, test as aboutPageTest } from './about.fixture'
import { expect as accessibilityExpect, test as accessibilityTest } from './accessibility.fixture'
import { expect as contactUsExpect, test as contactUsTest } from './contact.fixture'
import { expect as faqExpect, test as faqTest } from './faq.fixture'
import { expect as governmentExpect, test as governmentTest } from './government.fixtures'
import { expect as homePageExpect, test as homePageTest } from './home.fixture'
import { expect as joinUsExpect, test as joinUsTest } from './join-us.fixture'
import { expect as privacyPolicyExpect, test as privacyPolicyTest } from './privacy.fixture'
import { expect as servicesExpect, test as servicesTest } from './services.fixture'
import { expect as quickLinksExpect, test as quickLinksTest } from './sitemap.fixture'
import { expect as statisticsExpect, test as statisticsTest } from './statistics.fixture'
import { expect as termsofUseExpect, test as termsofUseTest } from './terms.fixture'

export const expect = mergeExpects(governmentExpect, servicesExpect, quickLinksExpect, faqExpect, accessibilityExpect, termsofUseExpect, privacyPolicyExpect, aboutPageExpect, joinUsExpect, contactUsExpect, statisticsExpect, homePageExpect)
export const test = mergeTests(governmentTest, servicesTest, quickLinksTest, faqTest, accessibilityTest, termsofUseTest, privacyPolicyTest, aboutPageTest, joinUsTest, contactUsTest, statisticsTest, homePageTest)
