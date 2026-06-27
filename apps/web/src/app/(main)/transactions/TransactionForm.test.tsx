import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TransactionForm } from './TransactionForm';
import '@testing-library/jest-dom/vitest';

const mockCreate = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      create: {
        useMutation: () => ({ mutateAsync: mockCreate, isError: false, error: null }),
      },
      list: { useQuery: () => ({ data: { items: [], total: 0, totalPages: 1 } }) },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockCreate.mockResolvedValue({ id: '1' });
});

describe('TransactionForm', () => {
  it('renders all form fields', () => {
    render(<TransactionForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subtype/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/recurring/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<TransactionForm onSuccess={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  it('calls mutateAsync on valid submit', async () => {
    mockCreate.mockResolvedValue({ id: '1' });
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    render(<TransactionForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/name/i), 'Coffee');
    await user.type(screen.getByLabelText(/amount/i), '5');
    await user.type(screen.getByLabelText(/date/i), '2024-08-19');
    await user.click(screen.getByRole('combobox', { name: /category/i }));
    await user.click(screen.getByRole('option', { name: 'Dining Out' }));

    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Coffee',
        amount: 5,
        category: 'Dining Out',
        date: '2024-08-19',
      }),
    );
  });
});
