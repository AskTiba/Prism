import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import PotsPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  potsList: vi.fn(),
}))

vi.mock('@/lib/trpc', () => ({
  trpc: {
    pots: {
      list: { useQuery: () => mockUseQuery.potsList() },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockUseQuery.potsList.mockReturnValue({
    data: [
      { id: '1', name: 'Emergency Fund', target: 5000, total: 1850, theme: '#277C78' },
      { id: '2', name: 'Vacation', target: 3000, total: 1200, theme: '#82C9D7' },
    ],
  })
})

describe('PotsPage', () => {
  it('renders pot names', () => {
    render(<PotsPage />)
    expect(screen.getByText('Emergency Fund')).toBeInTheDocument()
    expect(screen.getByText('Vacation')).toBeInTheDocument()
  })

  it('shows totals and targets', () => {
    render(<PotsPage />)
    expect(screen.getByText('$1,850.00')).toBeInTheDocument()
    expect(screen.getByText('of $5,000.00')).toBeInTheDocument()
  })
})
