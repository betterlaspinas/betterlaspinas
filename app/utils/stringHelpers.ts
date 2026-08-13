import { INTERPOLATION_REGEX, URL_LINKIFY_REGEX, URL_TRAILING_PUNCTUATION_REGEX } from '@/utils/regexConstants'

/**
 * Helper to interpolate template variables within a string.
 * Replaces {{key}} with the corresponding value from the vars object.
 */
export function interpolateString(
  template: string,
  variables: Record<string, string>,
): string {
  if (!template)
    return ''
  return template.replace(INTERPOLATION_REGEX, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match
  })
}

/**
 * Helper to convert a slug into Title Case format.
 * Examples: 'social-services' -> 'Social Services'
 */
export function slugToTitleCase(slug: string): string {
  if (!slug)
    return ''
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Auto-linkify bare URLs/domains within plain-text copy (e.g. a services.json
 * processSteps description mentioning "pnpclearance.ph") into clickable
 * anchor tags. Intended for use with v-html on trusted, internally-authored
 * config content only — not for arbitrary/user-supplied text (#300).
 */
export function linkifyText(text: string): string {
  if (!text)
    return ''
  return text.replace(URL_LINKIFY_REGEX, (match) => {
    const trailingMatch = match.match(URL_TRAILING_PUNCTUATION_REGEX)
    const trailing = trailingMatch ? trailingMatch[0] : ''
    const label = trailing ? match.slice(0, -trailing.length) : match
    const href = /^https?:\/\//i.test(label) ? label : `https://${label}`
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline hover:text-primary-700">${label}</a>${trailing}`
  })
}
