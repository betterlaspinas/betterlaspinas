import { INTERPOLATION_REGEX } from '@/utils/regexConstants'

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
