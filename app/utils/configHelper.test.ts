import { describe, expect, it } from 'vitest'
import { getSiteConfig } from './configHelper'

describe('configHelper', () => {
  it('getSiteConfig should return site config', () => {
    const config = getSiteConfig()
    expect(config).toBeDefined()
    expect(config.lguType).toBeDefined()
  })
})
