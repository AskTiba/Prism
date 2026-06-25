import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import OverviewPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  transactionsList: vi.fn(),
  budgetsList: vi.fn(),
  potsList: vi.fn(),
}))

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      list: { useQuery: () => mockUseQuery.transactionsList() },
    },
    budgets: {
      list: { useQuery: () => mockUseQuery.budgetsList() },
    },
    pots: {
      list: { useQuery: () => mockUseQuery.potsList() },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockUseQuery.transactionsList.mockReturnValue({
    data: {
      items: [
        { id: '1', name: 'Coffee', amount: -5, category: 'Dining Out', date: '2024-08-19T14:23:11Z', recurring: false, avatar: null },
      ],
      total: 1, page: 1, pageSize: 5, totalPages: 1,
    },
  })

  mockUseQuery.budgetsList.mockReturnValue({
    data: [
      { id: '1', category: 'Bills', maximum: 400, theme: '#82C9D7', spent: 235 },
    ],
  })

  mockUseQuery.potsList.mockReturnValue({
    data: [
      { id: '1', name: 'Emergency Fund', target: 5000, total: 1850, theme: '#277C78' },
    ],
  })
})

describe('OverviewPage', () => {
  it('renders summary and widgets', async () => {
    render(<OverviewPage />)

    expect(screen.getByText('Coffee')).toBeInTheDocument()
    expect(screen.getByText('Bills')).toBeInTheDocument()
    expect(screen.getByText('Emergency Fund')).toBeInTheDocument()
  })
})
