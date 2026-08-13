import { describe, expect, it } from 'vitest'
import { interpolateString, linkifyText, slugToTitleCase } from './stringHelpers'

describe('interpolateString', () => {
  it('replaces {{key}} tokens with provided values', () => {
    expect(interpolateString('Hello {{name}}', { name: 'World' })).toBe('Hello World')
  })

  it('leaves unmatched tokens untouched', () => {
    expect(interpolateString('Hello {{missing}}', {})).toBe('Hello {{missing}}')
  })

  it('returns an empty string for falsy input', () => {
    expect(interpolateString('', { name: 'World' })).toBe('')
  })
})

describe('slugToTitleCase', () => {
  it('converts a slug into Title Case', () => {
    expect(slugToTitleCase('social-services')).toBe('Social Services')
  })

  it('returns an empty string for falsy input', () => {
    expect(slugToTitleCase('')).toBe('')
  })
})

describe('linkifyText', () => {
  it('linkifies a bare domain mentioned in prose, defaulting to https', () => {
    const result = linkifyText('Visit pnpclearance.ph and click Register to create a new account.')
    expect(result).toBe(
      'Visit <a href="https://pnpclearance.ph" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline hover:text-primary-700">pnpclearance.ph</a> and click Register to create a new account.',
    )
  })

  it('linkifies a full https URL as-is', () => {
    const result = linkifyText('Go to https://pnpclearance.ph/apply for details')
    expect(result).toContain('href="https://pnpclearance.ph/apply"')
    expect(result).toContain('>https://pnpclearance.ph/apply</a>')
  })

  it('does not swallow trailing sentence punctuation into the link', () => {
    const result = linkifyText('See pnpclearance.ph.')
    expect(result).toBe(
      'See <a href="https://pnpclearance.ph" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline hover:text-primary-700">pnpclearance.ph</a>.',
    )
  })

  it('leaves plain text without URLs untouched', () => {
    const text = 'Present a valid government-issued ID and proof of payment.'
    expect(linkifyText(text)).toBe(text)
  })

  it('returns an empty string for falsy input', () => {
    expect(linkifyText('')).toBe('')
  })
})
