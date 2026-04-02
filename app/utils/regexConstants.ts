/**
 * Global Regex Constants
 *
 * Centralized static regular expressions to avoid redundant compilation
 * in loops or frequently called functions, satisfying the e18e/prefer-static-regex rule.
 */

// Replace {{key}} with values in string interpolation
export const INTERPOLATION_REGEX = /\{\{(\w+)\}\}/g

// Used in useSearch.ts to escape characters before creating a new RegExp
export const ESCAPE_REGEX = /[.*+?^${}()|[\]\\]/g

// Config helper cleaners
export const WHITESPACE_REGEX = /\s+/g
export const DIACRITICS_REGEX = /[\u0300-\u036F]/g
export const PHONE_CLEANUP_REGEX = /[\s()-]/g

// Search / Text Splitters
export const SPLIT_WHITESPACE_REGEX = /\s+/
export const TRAILING_SLASH_REGEX = /\/$/

// News / Articles placeholders
export const DEPT_PREFIX_PLACEHOLDER_REGEX = /\{\{deptPrefix\}\}/g
export const LGU_NAME_PLACEHOLDER_REGEX = /\{\{lguName\}\}/g

// Changelog Parser
export const CHANGELOG_VERSION_REGEX = /^## \[(.*?)\](?: - (.*))?/
export const CHANGELOG_SECTION_REGEX = /^### (.*)/
export const CHANGELOG_ITEM_REGEX = /^- (.*)/
export const CHANGELOG_LINK_REGEX = /^\[(.*?)\]: (.*)/
export const CHANGELOG_ITEM_PREFIX_REGEX = /^\*\*(.*?)\*\*:\s*(.*)/

// Git describe version (used in Footer.vue)
// Matches tag, distance, and hash from git describe (e.g. v1.2.3-4-gabc123)
export const GIT_DESCRIBE_REGEX = /^v?([0-9.]+)(?:-(\d+)-g([0-9a-f]+))?$/
