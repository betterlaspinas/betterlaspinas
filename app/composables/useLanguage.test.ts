// @vitest-environment nuxt
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useLanguage } from './useLanguage'

// Mock useConfig — the canonical config accessor (#184). useLanguage destructures
// reactive refs from it, so every consumed field must be a ref. `translations`
// (the override map) is a plain object.
vi.mock('./useConfig', () => ({
  useConfig: () => ({
    site: ref({
      municipality: 'Las Piñas',
      province: 'Metro Manila',
      region: 'NCR',
    }),
    lguName: ref('Las Piñas'),
    lguNameConcatenated: ref('LasPiñas'),
    lguNameDomain: ref('LasPinas'),
    labels: ref({
      lguTypeLabel: 'City',
      leaderTitle: 'Mayor',
      viceLeaderTitle: 'Vice Mayor',
      hallName: 'City Hall',
      deptPrefix: 'Department',
      legislativeBody: 'City Council',
    }),
    fullLocation: ref('Las Piñas, Metro Manila'),
    translations: {},
  }),
}))

describe('useLanguage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // `language` is shared Nuxt state keyed by name; reset between tests so each
    // assertion starts from the default locale.
    useLanguage().setLanguage('en')
  })

  it('should initialize with default language', () => {
    const { language } = useLanguage()
    expect(language.value).toBe('en')
  })

  it('should translate keys correctly', () => {
    const { translate } = useLanguage()

    expect(translate('nav-home')).toBe('Home')
    expect(translate('nav-services')).toBe('Services')
  })

  it('should return key when translation is missing', () => {
    const { translate } = useLanguage()

    expect(translate('non-existent-key')).toBe('non-existent-key')
  })

  it('should switch language', async () => {
    const { language, setLanguage } = useLanguage()

    expect(language.value).toBe('en')

    setLanguage('fil')
    await nextTick()
    expect(language.value).toBe('fil')
  })

  it('should translate after language switch', async () => {
    const { translate, setLanguage } = useLanguage()

    // English
    expect(translate('nav-home')).toBe('Home')

    // Switch to Filipino
    setLanguage('fil')
    await nextTick()
    expect(translate('nav-home')).toBe('Tahanan')
  })

  it('should handle section translations', () => {
    const { translate } = useLanguage()

    expect(translate('section-contact')).toBeTruthy()
  })
})
