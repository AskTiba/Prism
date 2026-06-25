import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BudgetForm } from './BudgetForm';
import '@testing-library/jest-dom/vitest';

const mockCreate = vi.hoisted(() => vi.fn());
const mockList = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    budgets: {
      create: {
        useMutation: () => ({ mutateAsync: mockCreate, isError: false, error: null }),
      },
      list: { useQuery: () => ({ data: mockList() }) },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockCreate.mockResolvedValue({ id: '1' });
  mockList.mockReturnValue([]);
});

describe('BudgetForm', () => {
  it('renders the form fields', () => {
    render(<BudgetForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add budget/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<BudgetForm onSuccess={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /add budget/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  it('shows error for negative maximum', async () => {
    const user = userEvent.setup();
    render(<BudgetForm onSuccess={vi.fn()} />);
    await user.selectOptions(screen.getByLabelText(/category/i), 'Bills');
    await user.type(screen.getByLabelText(/maximum/i), '-10');
    await user.click(screen.getByRole('button', { name: /add budget/i }));
    expect(await screen.findByText(/greater than 0/i)).toBeInTheDocument();
  });
});
