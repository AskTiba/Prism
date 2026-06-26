import { describe, it, expect } from 'vitest'
import { CATEGORIES, CATEGORY_THEMES, SORT_OPTIONS, PAGE_SIZE, SUBTYPES } from './constants'

describe('CATEGORIES', () => {
  it('contains expected categories', () => {
    expect(CATEGORIES).toContain('Entertainment')
    expect(CATEGORIES).toContain('Bills')
    expect(CATEGORIES).toContain('Groceries')
  })

  it('every category has a theme', () => {
    for (const cat of CATEGORIES) {
      expect(CATEGORY_THEMES[cat]).toBeDefined()
    }
  })

  it('no extra theme keys without categories', () => {
    const themeKeys = Object.keys(CATEGORY_THEMES)
    expect(themeKeys.length).toBe(CATEGORIES.length)
  })
})

describe('SORT_OPTIONS', () => {
  it('has expected options', () => {
    const values = SORT_OPTIONS.map((o) => o.value)
    expect(values).toContain('latest')
    expect(values).toContain('oldest')
    expect(values).toContain('a-z')
  })

  it('every option has a label and value', () => {
    for (const opt of SORT_OPTIONS) {
      expect(typeof opt.label).toBe('string')
      expect(typeof opt.value).toBe('string')
    }
  })
})

describe('SUBTYPES', () => {
  it('contains expected subtypes', () => {
    expect(SUBTYPES).toContain('Essentials')
    expect(SUBTYPES).toContain('Discretionary')
  })
})

describe('PAGE_SIZE', () => {
  it('is a positive integer', () => {
    expect(PAGE_SIZE).toBeGreaterThan(0)
    expect(Number.isInteger(PAGE_SIZE)).toBe(true)
  })
})
