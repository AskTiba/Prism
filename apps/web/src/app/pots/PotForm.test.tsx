import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PotForm } from './PotForm';
import '@testing-library/jest-dom/vitest';

const mockCreate = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    pots: {
      create: {
        useMutation: () => ({ mutateAsync: mockCreate, isError: false, error: null }),
      },
      list: { useQuery: () => ({ data: [] }) },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockCreate.mockResolvedValue({ id: '1' });
});

describe('PotForm', () => {
  it('renders the form fields', () => {
    render(<PotForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add pot/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<PotForm onSuccess={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /add pot/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  it('shows error for negative target', async () => {
    const user = userEvent.setup();
    render(<PotForm onSuccess={vi.fn()} />);
    await user.type(screen.getByLabelText(/name/i), 'Vacation');
    await user.type(screen.getByLabelText(/target/i), '-500');
    await user.click(screen.getByRole('button', { name: /add pot/i }));
    expect(await screen.findByText(/greater than 0/i)).toBeInTheDocument();
  });

  it('calls mutateAsync on valid submit', async () => {
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    render(<PotForm onSuccess={onSuccess} />);
    await user.type(screen.getByLabelText(/name/i), 'Vacation');
    await user.type(screen.getByLabelText(/target/i), '500');
    await user.click(screen.getByRole('button', { name: /add pot/i }));
    expect(mockCreate).toHaveBeenCalledWith({
      name: 'Vacation',
      target: 500,
      total: 0,
      theme: '#277C78',
    });
  });
});
