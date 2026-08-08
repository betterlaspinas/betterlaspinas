import { interpolateString } from '@/utils/stringHelpers'
import enTranslations from '../config/language/en.json'
import filTranslations from '../config/language/fil.json'
import iloTranslations from '../config/language/ilo.json'
import { useConfig } from './useConfig'

// Base translations — dictionary data lives in app/config/language/*.json
// (one file per locale). Adding or correcting a language is a data change:
// add/edit the JSON file, no composable code to touch (#256).
const baseTranslations: Record<string, Record<string, string>> = {
  en: enTranslations,
  fil: filTranslations,
  ilo: iloTranslations,
}

type Language = 'en' | 'fil' | 'ilo'

export function useLanguage() {
  const language = useState<Language>('language', () => 'en')

  const {
    site,
    lguName,
    lguNameConcatenated,
    lguNameDomain,
    labels,
    fullLocation,
    translations: translationOverrides,
  } = useConfig()

  const defaultVariables = computed(() => ({
    lguName: lguName.value,
    lguNameConcatenated: lguNameConcatenated.value,
    lguNameDomain: lguNameDomain.value,
    municipality: site.value.municipality,
    province: site.value.province,
    region: site.value.region,
    lguType: labels.value.lguTypeLabel,
    leaderTitle: labels.value.leaderTitle,
    viceLeaderTitle: labels.value.viceLeaderTitle,
    hallName: labels.value.hallName,
    deptPrefix: labels.value.deptPrefix,
    legislativeBody: labels.value.legislativeBody,
    fullLocation: fullLocation.value,
  }))

  const translations = computed(() => {
    const merged = { ...baseTranslations }

    if (translationOverrides.en) {
      merged.en = { ...merged.en, ...translationOverrides.en }
    }
    if (translationOverrides.fil) {
      merged.fil = { ...merged.fil, ...translationOverrides.fil }
    }
    if (translationOverrides.ilo) {
      merged.ilo = { ...merged.ilo, ...translationOverrides.ilo }
    }

    return merged
  })

  const setLanguage = (lang: Language) => {
    language.value = lang
    // Persist
    if (import.meta.client) {
      const storageKey = `better${lguNameDomain.value.toLowerCase()}_lang`
      localStorage.setItem(storageKey, lang)
    }
  }

  // Initialize from storage
  onMounted(() => {
    if (import.meta.client) {
      const storageKey = `better${lguNameDomain.value.toLowerCase()}_lang`
      const savedLang = localStorage.getItem(storageKey) as Language
      if (savedLang && ['en', 'fil', 'ilo'].includes(savedLang)) {
        language.value = savedLang
      }
    }
  })

  const translate = (key: string, vars?: Record<string, string>): string => {
    const template = translations.value[language.value]?.[key] || translations.value.en?.[key] || key
    const allVariables = vars ? { ...defaultVariables.value, ...vars } : defaultVariables.value
    return interpolateString(template, allVariables)
  }

  return {
    language,
    setLanguage,
    translate,
  }
}
