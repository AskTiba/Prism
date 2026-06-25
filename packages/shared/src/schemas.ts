import { z } from 'zod'
import { CATEGORIES, SORT_OPTIONS, PAGE_SIZE } from './constants'

const categorySchema = z.enum(CATEGORIES)
const sortOptionSchema = z.enum(
  SORT_OPTIONS.map((o) => o.value) as [string, ...string[]]
)

export const transactionFiltersSchema = z.object({
  search: z.string().optional(),
  category: categorySchema.optional(),
  sort: sortOptionSchema.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
})

export const budgetCreateSchema = z.object({
  category: categorySchema,
  maximum: z.number().positive(),
  theme: z.string().min(1).max(9),
})

export const budgetUpdateSchema = budgetCreateSchema.partial()

export const potCreateSchema = z.object({
  name: z.string().min(1).max(50),
  target: z.number().positive(),
  total: z.number().min(0).default(0),
  theme: z.string().min(1).max(9),
})

export const potUpdateSchema = potCreateSchema.partial()

export const potAddWithdrawSchema = z.object({
  amount: z.number().positive(),
})
