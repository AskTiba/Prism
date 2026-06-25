import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import BudgetsPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  budgetsList: vi.fn(),
  billsList: vi.fn(),
}))

vi.mock('@/lib/trpc', () => ({
  trpc: {
    budgets: {
      list: { useQuery: () => mockUseQuery.budgetsList() },
      create: { useMutation: vi.fn },
    },
    transactions: {
      list: { useQuery: () => mockUseQuery.billsList() },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockUseQuery.budgetsList.mockReturnValue({
    data: [
      { id: '1', category: 'Bills', maximum: 400, theme: '#82C9D7', spent: 235 },
      { id: '2', category: 'Entertainment', maximum: 80, theme: '#277C78', spent: 45 },
    ],
  })
})

describe('BudgetsPage', () => {
  it('renders budget categories', () => {
    render(<BudgetsPage />)
    expect(screen.getByText('Bills')).toBeInTheDocument()
    expect(screen.getByText('Entertainment')).toBeInTheDocument()
  })

  it('shows spent amounts', () => {
    render(<BudgetsPage />)
    expect(screen.getByText('$235.00')).toBeInTheDocument()
  })

  it('shows maximum amounts', () => {
    render(<BudgetsPage />)
    expect(screen.getByText('of $400.00')).toBeInTheDocument()
  })
})
