import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransactionsPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  list: vi.fn(),
}))

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      list: { useQuery: () => mockUseQuery.list() },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockUseQuery.list.mockReturnValue({
    data: {
      items: Array.from({ length: 10 }, (_, i) => ({
        id: String(i + 1),
        name: `Transaction ${i + 1}`,
        amount: i % 2 === 0 ? -50 : 100,
        category: i % 2 === 0 ? 'Bills' : 'Income',
        date: '2024-08-19T14:23:11Z',
        recurring: i % 3 === 0,
        avatar: null,
      })),
      total: 25,
      page: 1,
      pageSize: 10,
      totalPages: 3,
    },
  })
})

describe('TransactionsPage', () => {
  it('renders transactions list', () => {
    render(<TransactionsPage />)
    expect(screen.getByText('Transaction 1')).toBeInTheDocument()
    expect(screen.getByText('Transaction 10')).toBeInTheDocument()
  })

  it('shows search input', () => {
    render(<TransactionsPage />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('shows pagination info', () => {
    render(<TransactionsPage />)
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument()
  })

  it('shows category filter', async () => {
    render(<TransactionsPage />)
    const filter = screen.getByRole('combobox', { name: /category/i })
    expect(filter).toBeInTheDocument()
  })
})
