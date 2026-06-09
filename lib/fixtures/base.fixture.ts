import { mergeExpects, mergeTests } from '@playwright/test'
import { expect as governmentExpect, test as governmentTest } from './government.fixtures'
import { expect as searchExpect, test as searchTest } from './search.fixture'
import { expect as servicesExpect, test as servicesTest } from './services.fixture'

export const test = mergeTests(governmentTest, searchTest, servicesTest)
export const expect = mergeExpects(governmentExpect, searchExpect, servicesExpect)
