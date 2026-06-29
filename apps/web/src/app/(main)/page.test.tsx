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
    data: {
      netWorth: { useQuery: () => ({ data: { totalIncome: 5000, totalExpenses: 3200, totalPots: 2400, netWorth: 4200 } }) },
      cashFlowProjection: { useQuery: () => ({ data: [] }) },
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

  it('does not render NetWorthCard or CashFlowCard', async () => {
    render(<OverviewPage />)

    expect(screen.queryByText('Net Worth')).not.toBeInTheDocument()
    expect(screen.queryByText('Cash Flow')).not.toBeInTheDocument()
  })

  it('renders 2-column layout with correct sections', async () => {
    const { container } = render(<OverviewPage />)

    // Find the 2-column grid (should have lg:grid-cols-2)
    const grid = container.querySelector('.lg\\:grid-cols-2')
    expect(grid).toBeInTheDocument()

    // Left column should contain: Pots, Transactions
    // Right column should contain: Budgets, Bills
    expect(screen.getByText('Pots')).toBeInTheDocument()
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument()
    expect(screen.getByText('Budgets')).toBeInTheDocument()
    expect(screen.getByText('Recurring Bills')).toBeInTheDocument()
  })

  it('uses compact currency format in summary cards', async () => {
    mockUseQuery.transactionsList.mockReturnValue({
      data: {
        items: [
          { id: '1', name: 'Salary', amount: 5000000, category: 'General', date: '2024-08-01T08:00:00Z', recurring: false, avatar: null },
        ],
        total: 1, page: 1, pageSize: 1000, totalPages: 1,
      },
    })
    render(<OverviewPage />)
    expect(screen.getAllByText(/UGX\s*5M/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/5,000,000/)).not.toBeInTheDocument()
  })
})
