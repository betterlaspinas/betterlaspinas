import { describe, expect, it, vi } from 'vitest'

// nuxt.config.ts uses the `defineNuxtConfig` auto-import (a global, never
// imported). Stub it as identity so we can import the raw config object and
// assert its routeRules without booting Nuxt.
vi.stubGlobal('defineNuxtConfig', <T>(config: T): T => config)

interface RedirectRule {
  redirect?: { to: string, statusCode: number }
}

const { default: nuxtConfig } = await import('./nuxt.config')
const routeRules = (nuxtConfig.routeRules ?? {}) as Record<string, RedirectRule>

describe('nuxt.config routeRules — /service-details Office 301s', () => {
  it('301s /service-details/civil-registry → /offices/civil-registry (#216)', () => {
    // #216: the Office id slug resolved by the /service-details fallback. #207
    // covered the legacy city-* slugs but missed this one.
    expect(routeRules['/service-details/civil-registry']?.redirect).toEqual({
      to: '/offices/civil-registry',
      statusCode: 301,
    })
  })

  it('keeps the nine legacy city-* Office 301s from #207 intact', () => {
    const legacy: Record<string, string> = {
      '/service-details/city-civil-registry': '/offices/civil-registry',
      '/service-details/city-treasurer': '/offices/city-treasurer',
      '/service-details/city-assessor': '/offices/city-assessor',
      '/service-details/city-engineering': '/offices/city-engineering',
      '/service-details/city-planning': '/offices/city-planning',
      '/service-details/city-agriculture': '/offices/city-agriculture',
      '/service-details/city-budget': '/offices/city-budget',
      '/service-details/city-accounting': '/offices/city-accounting',
      '/service-details/city-general-services': '/offices/city-general-services',
    }
    for (const [from, to] of Object.entries(legacy)) {
      expect(routeRules[from]?.redirect, from).toEqual({ to, statusCode: 301 })
    }
  })

  it('every /service-details/* Office route is a 301, never a render (#216)', () => {
    // After #216 no /service-details/* URL resolves an Office. Each
    // /service-details/* rule that targets an /offices/* destination must be a
    // 301 redirect.
    const officeRoutes = Object.entries(routeRules).filter(
      ([from, rule]) => from.startsWith('/service-details/') && rule.redirect?.to.startsWith('/offices/'),
    )
    expect(officeRoutes.length).toBeGreaterThan(0)
    for (const [from, rule] of officeRoutes) {
      expect(rule.redirect?.statusCode, from).toBe(301)
    }
  })
})
