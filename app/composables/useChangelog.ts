import changelogRaw from '@@/CHANGELOG.md?raw'
import {
  CHANGELOG_ITEM_PREFIX_REGEX,
  CHANGELOG_ITEM_REGEX,
  CHANGELOG_LINK_REGEX,
  CHANGELOG_SECTION_REGEX,
  CHANGELOG_VERSION_REGEX,
} from '@/utils/regexConstants'

export interface ChangelogItem {
  content: string
  prefix?: string
}

export interface ChangelogSection {
  title: string
  items: ChangelogItem[]
}

export interface ChangelogEntry {
  version: string
  date: string
  sections: ChangelogSection[]
  githubUrl?: string
}

// Order of sections as requested by the user
const SECTION_ORDER = [
  'added',
  'changed',
  'deprecated',
  'removed',
  'fixed',
  'security',
  'infrastructure',
  'internal',
  'technical',
]

export function useChangelog() {
  const parseVersionLine = (line: string) => {
    const match = line.match(CHANGELOG_VERSION_REGEX)
    if (!match)
      return null
    return {
      version: match[1] ?? 'Unknown',
      date: match[2] ?? '',
    }
  }

  const parseSectionLine = (line: string) => {
    const match = line.match(CHANGELOG_SECTION_REGEX)
    if (!match)
      return null
    return {
      title: match[1] ?? 'General',
    }
  }

  const parseItemLine = (line: string): ChangelogItem | null => {
    const match = line.match(CHANGELOG_ITEM_REGEX)
    if (!match)
      return null

    const rawContent = match[1] ?? ''

    // Check for bold prefix: **Added**: Content
    const prefixMatch = rawContent.match(CHANGELOG_ITEM_PREFIX_REGEX)
    if (prefixMatch) {
      return {
        prefix: prefixMatch[1] ?? '',
        content: prefixMatch[2] ?? '',
      }
    }

    return {
      content: rawContent,
    }
  }

  const parseReferenceLinkLine = (line: string) => {
    const match = line.match(CHANGELOG_LINK_REGEX)
    if (!match)
      return null
    return {
      versionKey: match[1] ?? '',
      url: match[2] ?? '',
    }
  }

  const entries = computed<ChangelogEntry[]>(() => {
    const lines = changelogRaw.split('\n')
    const result: ChangelogEntry[] = []
    const linkMap = new Map<string, string>()
    let currentEntry: ChangelogEntry | null = null
    let currentSection: ChangelogSection | null = null

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine)
        continue

      // 1. Try matching Version Header
      const versionData = parseVersionLine(trimmedLine)
      if (versionData) {
        currentEntry = {
          version: versionData.version,
          date: versionData.date,
          sections: [],
          githubUrl: '',
        }
        result.push(currentEntry)
        currentSection = null
        continue
      }

      // 2. Try matching Section Header (### Added, etc.)
      const sectionData = parseSectionLine(trimmedLine)
      if (sectionData && currentEntry) {
        currentSection = {
          title: sectionData.title,
          items: [],
        }
        currentEntry.sections.push(currentSection)
        continue
      }

      // 3. Try matching Item (- Description)
      const itemData = parseItemLine(trimmedLine)
      if (itemData && currentSection) {
        currentSection.items.push(itemData)
        continue
      }

      // 4. Try matching Reference Link ([1.0.0]: https://...)
      const referenceLinkData = parseReferenceLinkLine(trimmedLine)
      if (referenceLinkData) {
        linkMap.set(referenceLinkData.versionKey, referenceLinkData.url)
      }
    }

    // Assign parsed links to entries, filter empty ones, and sort sections
    return result
      .map((entry) => {
        entry.githubUrl = linkMap.get(entry.version) || ''

        // Filter out empty sections (those with no items)
        entry.sections = entry.sections.filter(section => section.items.length > 0)

        // Sort sections according to SECTION_ORDER
        entry.sections.sort((a, b) => {
          const indexA = SECTION_ORDER.indexOf(a.title.toLowerCase())
          const indexB = SECTION_ORDER.indexOf(b.title.toLowerCase())

          // If title not in SECTION_ORDER, put it after Security (index 5) but before Infrastructure (6)
          const orderA = indexA === -1 ? 5.5 : indexA
          const orderB = indexB === -1 ? 5.5 : indexB

          return orderA - orderB
        })

        return entry
      })
      .filter(entry => entry.sections.length > 0)
  })

  const getSectionBadgeColor = (title: string): 'primary' | 'solid-primary' | 'white-translucent' | 'gray' | 'success' | 'warning' | 'error' => {
    switch (title.toLowerCase()) {
      case 'added': return 'success'
      case 'changed': return 'primary'
      case 'deprecated': return 'warning'
      case 'removed': return 'error'
      case 'fixed': return 'primary'
      case 'security': return 'error'
      case 'infrastructure':
      case 'internal':
      case 'technical': return 'gray'
      default: return 'gray'
    }
  }

  const getSectionIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'added': return 'bi-plus-circle'
      case 'changed': return 'bi-pencil-square'
      case 'deprecated': return 'bi-exclamation-triangle'
      case 'removed': return 'bi-trash'
      case 'fixed': return 'bi-patch-check'
      case 'security': return 'bi-shield-lock'
      case 'infrastructure':
      case 'internal':
      case 'technical': return 'bi-cpu'
      default: return 'bi-info-circle'
    }
  }

  const getPrefixColorClass = (prefix: string) => {
    switch (prefix.toLowerCase()) {
      case 'added': return 'text-success-600 bg-success-50 border-success-100'
      case 'fixed': return 'text-primary-600 bg-primary-50 border-primary-100'
      case 'changed': return 'text-primary-600 bg-primary-50 border-primary-100'
      case 'updated': return 'text-secondary-600 bg-secondary-50 border-secondary-100'
      case 'refactored': return 'text-accent-600 bg-accent-50 border-accent-100'
      case 'removed': return 'text-error-600 bg-error-50 border-error-100'
      case 'deprecated': return 'text-warning-600 bg-warning-50 border-warning-100'
      case 'security': return 'text-error-600 bg-error-50 border-error-100'
      default: return 'text-gray-600 bg-gray-50 border-gray-100'
    }
  }

  return {
    entries,
    getSectionBadgeColor,
    getSectionIcon,
    getPrefixColorClass,
  }
}
