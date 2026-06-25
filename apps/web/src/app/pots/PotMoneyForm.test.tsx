import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PotMoneyForm } from './PotMoneyForm';
import '@testing-library/jest-dom/vitest';

const mockAddMoney = vi.hoisted(() => vi.fn());
const mockWithdraw = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    pots: {
      addMoney: {
        useMutation: () => ({ mutateAsync: mockAddMoney, isError: false, error: null }),
      },
      withdraw: {
        useMutation: () => ({ mutateAsync: mockWithdraw, isError: false, error: null }),
      },
    },
  },
}));

const pot = { id: '1', name: 'Vacation', target: 1000, total: 500, theme: '#277C78' };

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PotMoneyForm', () => {
  it('renders add and withdraw buttons', () => {
    render(<PotMoneyForm pot={pot} onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add money/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /withdraw/i })).toBeInTheDocument();
  });

  it('shows error for empty amount', async () => {
    const user = userEvent.setup();
    render(<PotMoneyForm pot={pot} onSuccess={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /add money/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  it('shows error for negative amount', async () => {
    const user = userEvent.setup();
    render(<PotMoneyForm pot={pot} onSuccess={vi.fn()} />);
    await user.type(screen.getByLabelText(/amount/i), '-50');
    await user.click(screen.getByRole('button', { name: /add money/i }));
    expect(await screen.findByText(/greater than 0/i)).toBeInTheDocument();
  });

  it('calls addMoney on valid submit', async () => {
    mockAddMoney.mockResolvedValue({ ...pot, total: 600 });
    const user = userEvent.setup();
    render(<PotMoneyForm pot={pot} onSuccess={vi.fn()} />);
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.click(screen.getByRole('button', { name: /add money/i }));
    expect(mockAddMoney).toHaveBeenCalledWith({ id: '1', amount: 100 });
  });

  it('calls withdraw on valid submit', async () => {
    mockWithdraw.mockResolvedValue({ ...pot, total: 400 });
    const user = userEvent.setup();
    render(<PotMoneyForm pot={pot} onSuccess={vi.fn()} />);
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.click(screen.getByRole('button', { name: /withdraw/i }));
    expect(mockWithdraw).toHaveBeenCalledWith({ id: '1', amount: 100 });
  });
});
