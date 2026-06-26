import type { Category, SortOption } from './constants'

export type Transaction = {
  id: string
  avatar: string | null
  name: string
  category: Category
  tags: string[]
  subtype: string | null
  date: string
  amount: number
  recurring: boolean
}

export type Budget = {
  id: string
  category: Category
  maximum: number
  theme: string
}

export type Pot = {
  id: string
  name: string
  target: number
  total: number
  theme: string
}

export type TransactionFilters = {
  search?: string
  category?: Category
  sort?: SortOption
  page?: number
  pageSize?: number
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type BudgetWithSpent = Budget & { spent: number }

export type PotWithProgress = Pot & { percentage: number }
