import { describe, it, expect } from 'vitest'
import {
  transactionFiltersSchema,
  budgetCreateSchema,
  budgetUpdateSchema,
  potCreateSchema,
  potUpdateSchema,
  potAddWithdrawSchema,
} from './schemas'

describe('transactionFiltersSchema', () => {
  it('accepts defaults when empty', () => {
    const result = transactionFiltersSchema.parse({})
    expect(result).toEqual({ page: 1, pageSize: 10 })
  })

  it('accepts valid category filter', () => {
    const result = transactionFiltersSchema.parse({ category: 'Entertainment' })
    expect(result.category).toBe('Entertainment')
  })

  it('rejects invalid category', () => {
    expect(() =>
      transactionFiltersSchema.parse({ category: 'Invalid' })
    ).toThrow()
  })

  it('accepts valid sort option', () => {
    const result = transactionFiltersSchema.parse({ sort: 'latest' })
    expect(result.sort).toBe('latest')
  })

  it('rejects invalid sort option', () => {
    expect(() =>
      transactionFiltersSchema.parse({ sort: 'invalid' })
    ).toThrow()
  })

  it('coerces string page to number', () => {
    const result = transactionFiltersSchema.parse({ page: '3' })
    expect(result.page).toBe(3)
  })

  it('rejects negative page', () => {
    expect(() =>
      transactionFiltersSchema.parse({ page: -1 })
    ).toThrow()
  })
})

describe('budgetCreateSchema', () => {
  it('accepts valid budget', () => {
    const result = budgetCreateSchema.parse({
      category: 'Bills',
      maximum: 400,
      theme: '#82C9D7',
    })
    expect(result.maximum).toBe(400)
  })

  it('rejects zero maximum', () => {
    expect(() =>
      budgetCreateSchema.parse({
        category: 'Bills',
        maximum: 0,
        theme: '#82C9D7',
      })
    ).toThrow()
  })

  it('rejects empty category', () => {
    expect(() =>
      budgetCreateSchema.parse({
        category: '',
        maximum: 400,
        theme: '#82C9D7',
      })
    ).toThrow()
  })
})

describe('budgetUpdateSchema', () => {
  it('accepts partial update', () => {
    const result = budgetUpdateSchema.parse({ maximum: 500 })
    expect(result.maximum).toBe(500)
  })

  it('accepts empty object', () => {
    const result = budgetUpdateSchema.parse({})
    expect(result).toEqual({})
  })
})

describe('potCreateSchema', () => {
  it('accepts valid pot with default total', () => {
    const result = potCreateSchema.parse({
      name: 'Vacation',
      target: 2000,
      theme: '#277C78',
    })
    expect(result.total).toBe(0)
  })

  it('accepts valid pot with explicit total', () => {
    const result = potCreateSchema.parse({
      name: 'Emergency',
      target: 5000,
      total: 1500,
      theme: '#277C78',
    })
    expect(result.total).toBe(1500)
  })

  it('rejects negative total', () => {
    expect(() =>
      potCreateSchema.parse({
        name: 'Test',
        target: 100,
        total: -1,
        theme: '#277C78',
      })
    ).toThrow()
  })
})

describe('potAddWithdrawSchema', () => {
  it('accepts positive amount', () => {
    const result = potAddWithdrawSchema.parse({ amount: 100 })
    expect(result.amount).toBe(100)
  })

  it('rejects zero amount', () => {
    expect(() => potAddWithdrawSchema.parse({ amount: 0 })).toThrow()
  })

  it('rejects negative amount', () => {
    expect(() => potAddWithdrawSchema.parse({ amount: -50 })).toThrow()
  })
})
