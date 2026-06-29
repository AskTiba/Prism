import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BillsSummary } from './bills-summary'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  transactionsList: vi.fn(),
}))

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      list: { useQuery: () => mockUseQuery.transactionsList() },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockUseQuery.transactionsList.mockReturnValue({
    data: {
      items: [
        { id: '1', name: 'Electric Bill', amount: -150, category: 'Bills', date: '2024-08-19T14:23:11Z', recurring: true, avatar: null },
        { id: '2', name: 'Internet', amount: -50, category: 'Bills', date: '2024-08-18T14:23:11Z', recurring: true, avatar: null },
      ],
      total: 2, page: 1, pageSize: 100, totalPages: 1,
    },
  })
})

describe('BillsSummary', () => {
  it('renders Recurring Bills heading', () => {
    render(<BillsSummary />)
    expect(screen.getByText('Recurring Bills')).toBeInTheDocument()
  })

  it('renders See Details link', () => {
    render(<BillsSummary />)
    expect(screen.getByText('See Details')).toHaveAttribute('href', '/bills')
  })

  it('renders Paid Bills with count and total', () => {
    render(<BillsSummary />)
    expect(screen.getByText('Paid Bills')).toBeInTheDocument()
    expect(screen.getByText(/2/)).toBeInTheDocument()
  })

  it('renders Total Upcoming', () => {
    render(<BillsSummary />)
    expect(screen.getByText('Total Upcoming')).toBeInTheDocument()
  })

  it('renders Due Soon', () => {
    render(<BillsSummary />)
    expect(screen.getByText('Due Soon')).toBeInTheDocument()
  })

  it('renders colored left borders for each item', () => {
    const { container } = render(<BillsSummary />)
    const borders = container.querySelectorAll('.border-l-4')
    expect(borders.length).toBe(3)
  })
})
