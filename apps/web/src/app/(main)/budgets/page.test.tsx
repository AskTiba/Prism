import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BudgetsPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  budgetsList: vi.fn(),
  billsList: vi.fn(),
}))

const mockMutateAsync = vi.hoisted(() => vi.fn())
const mockInvalidate = vi.hoisted(() => vi.fn())

vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({
      budgets: { list: { invalidate: mockInvalidate } },
    }),
    budgets: {
      list: { useQuery: () => mockUseQuery.budgetsList() },
      create: {
        useMutation: () => ({ mutateAsync: mockMutateAsync, isError: false, error: null }),
      },
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
    expect(screen.getByText(/UGX\s*235/)).toBeInTheDocument()
  })

  it('shows maximum amounts', () => {
    render(<BudgetsPage />)
    expect(screen.getAllByText(/of UGX\s*400/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders add budget button', () => {
    render(<BudgetsPage />)
    expect(screen.getByRole('button', { name: /new budget/i })).toBeInTheDocument()
  })

  it('opens budget form dialog when button is clicked', async () => {
    const user = userEvent.setup()
    render(<BudgetsPage />)
    await user.click(screen.getByRole('button', { name: /new budget/i }))
    expect(screen.getByRole('heading', { name: /new budget/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/maximum/i)).toBeInTheDocument()
  })

  it('closes dialog and invalidates list after successful creation', async () => {
    mockMutateAsync.mockResolvedValue({ id: '3' })
    const user = userEvent.setup()
    render(<BudgetsPage />)
    await user.click(screen.getByRole('button', { name: /new budget/i }))
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByRole('option', { name: 'Bills' }))
    await user.type(screen.getByLabelText(/maximum/i), '200')
    await user.click(screen.getByRole('button', { name: /add budget/i }))
    expect(mockMutateAsync).toHaveBeenCalled()
    expect(mockInvalidate).toHaveBeenCalled()
    expect(screen.queryByRole('combobox', { name: /category/i })).not.toBeInTheDocument()
  })

  it('shows empty state when no budgets exist', () => {
    mockUseQuery.budgetsList.mockReturnValue({ data: [] })
    render(<BudgetsPage />)
    expect(screen.getByText(/no budgets yet/i)).toBeInTheDocument()
  })
})
