import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PotsPage from './page'
import '@testing-library/jest-dom/vitest'

const mockUseQuery = vi.hoisted(() => ({
  potsList: vi.fn(),
}))

const mockCreateMutate = vi.hoisted(() => vi.fn())
const mockAddMoneyMutate = vi.hoisted(() => vi.fn())
const mockWithdrawMutate = vi.hoisted(() => vi.fn())
const mockInvalidate = vi.hoisted(() => vi.fn())

vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({
      pots: { list: { invalidate: mockInvalidate } },
    }),
    pots: {
      list: { useQuery: () => mockUseQuery.potsList() },
      create: {
        useMutation: () => ({ mutateAsync: mockCreateMutate, isError: false, error: null }),
      },
      addMoney: {
        useMutation: () => ({ mutateAsync: mockAddMoneyMutate, isError: false, error: null }),
      },
      withdraw: {
        useMutation: () => ({ mutateAsync: mockWithdrawMutate, isError: false, error: null }),
      },
    },
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  mockCreateMutate.mockResolvedValue({ id: '3' })
  mockAddMoneyMutate.mockResolvedValue({})

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

  it('renders new pot button', () => {
    render(<PotsPage />)
    expect(screen.getByRole('button', { name: /new pot/i })).toBeInTheDocument()
  })

  it('opens new pot dialog when button is clicked', async () => {
    const user = userEvent.setup()
    render(<PotsPage />)
    await user.click(screen.getByRole('button', { name: /new pot/i }))
    expect(screen.getByText('New Pot')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/target/i)).toBeInTheDocument()
  })

  it('closes dialog and invalidates after creating a pot', async () => {
    const user = userEvent.setup()
    render(<PotsPage />)
    await user.click(screen.getByRole('button', { name: /new pot/i }))
    await user.type(screen.getByLabelText(/name/i), 'Car Fund')
    await user.type(screen.getByLabelText(/target/i), '5000')
    await user.click(screen.getByRole('button', { name: /add pot/i }))
    expect(mockCreateMutate).toHaveBeenCalled()
    expect(mockInvalidate).toHaveBeenCalled()
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  })

  it('renders add/withdraw button on each pot card', () => {
    render(<PotsPage />)
    const buttons = screen.getAllByRole('button', { name: /add \/ withdraw/i })
    expect(buttons).toHaveLength(2)
  })

  it('opens add/withdraw dialog when button is clicked', async () => {
    const user = userEvent.setup()
    render(<PotsPage />)
    const buttons = screen.getAllByRole('button', { name: /add \/ withdraw/i })
    await user.click(buttons[0])
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add money/i })).toBeInTheDocument()
    const withdrawBtns = screen.getAllByRole('button', { name: /withdraw/i })
    expect(withdrawBtns.length).toBeGreaterThanOrEqual(1)
  })

  it('closes dialog and invalidates after adding money', async () => {
    const user = userEvent.setup()
    render(<PotsPage />)
    const buttons = screen.getAllByRole('button', { name: /add \/ withdraw/i })
    await user.click(buttons[0])
    await user.type(screen.getByLabelText(/amount/i), '100')
    await user.click(screen.getByRole('button', { name: /add money/i }))
    expect(mockAddMoneyMutate).toHaveBeenCalledWith({ id: '1', amount: 100 })
    expect(mockInvalidate).toHaveBeenCalled()
    expect(screen.queryByLabelText(/amount/i)).not.toBeInTheDocument()
  })
})
