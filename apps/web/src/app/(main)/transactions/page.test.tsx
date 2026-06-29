import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionsPage from './page';
import '@testing-library/jest-dom/vitest';

const mockUseQuery = vi.hoisted(() => ({
  list: vi.fn(),
}));

const mockCreateMutate = vi.hoisted(() => vi.fn());
const mockInvalidate = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({
      transactions: { list: { invalidate: mockInvalidate } },
    }),
    transactions: {
      list: { useQuery: () => mockUseQuery.list() },
      create: {
        useMutation: () => ({ mutateAsync: mockCreateMutate, isError: false, error: null }),
      },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();

  mockCreateMutate.mockResolvedValue({ id: 'new' });

  mockUseQuery.list.mockReturnValue({
    data: {
      items: Array.from({ length: 10 }, (_, i) => ({
        id: String(i + 1),
        name: `Transaction ${i + 1}`,
        amount: i % 2 === 0 ? -50 : 100,
        category: i % 2 === 0 ? 'Bills' : 'Income',
        tags: i === 0 ? ['urgent', 'monthly'] : [],
        subtype: i % 2 === 0 ? 'Essentials' : 'Income',
        date: '2024-08-19T14:23:11Z',
        recurring: i % 3 === 0,
        avatar: i === 0 ? '/images/avatars/emma-richardson.jpg' : null,
      })),
      total: 25,
      page: 1,
      pageSize: 10,
      totalPages: 3,
    },
  });
});

describe('TransactionsPage', () => {
  it('renders transactions list', () => {
    render(<TransactionsPage />);
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 10')).toBeInTheDocument();
  });

  it('shows search input', () => {
    render(<TransactionsPage />);
    expect(screen.getByPlaceholderText(/search transactions/i)).toBeInTheDocument();
  });

  it('shows pagination info', () => {
    render(<TransactionsPage />);
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  });

  it('shows category filter', async () => {
    render(<TransactionsPage />);
    const filter = screen.getByRole('combobox', { name: /category/i });
    expect(filter).toBeInTheDocument();
  });

  it('shows subtype filter', () => {
    render(<TransactionsPage />);
    const filter = screen.getByRole('combobox', { name: /subtype/i });
    expect(filter).toBeInTheDocument();
  });

  it('shows tags search input', () => {
    render(<TransactionsPage />);
    const input = screen.getByPlaceholderText(/search tags/i);
    expect(input).toBeInTheDocument();
  });

  it('shows date range inputs', () => {
    render(<TransactionsPage />);
    const dateFrom = screen.getByLabelText(/from date/i);
    const dateTo = screen.getByLabelText(/to date/i);
    expect(dateFrom).toBeInTheDocument();
    expect(dateTo).toBeInTheDocument();
  });

  it('renders export CSV link', () => {
    render(<TransactionsPage />);
    const link = screen.getByRole('link', { name: /export csv/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/api/export/transactions');
  });

  it('renders avatar images in table rows', () => {
    const { container } = render(<TransactionsPage />);
    const imgs = container.querySelectorAll('table img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders recurring badge for recurring transactions', () => {
    render(<TransactionsPage />);
    const badges = screen.getAllByText(/recurring|monthly/i);
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('renders tags for transactions that have them', () => {
    render(<TransactionsPage />);
    expect(screen.getByText('urgent')).toBeInTheDocument();
    expect(screen.getByText('monthly')).toBeInTheDocument();
  });

  it('renders subtype for transactions', () => {
    render(<TransactionsPage />);
    const essentials = screen.getAllByText('Essentials');
    expect(essentials.length).toBeGreaterThanOrEqual(1);
  });

  it('renders new transaction button', () => {
    render(<TransactionsPage />);
    expect(screen.getByRole('button', { name: /new transaction/i })).toBeInTheDocument();
  });

  it('opens transaction form dialog when button is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionsPage />);
    await user.click(screen.getByRole('button', { name: /new transaction/i }));
    expect(screen.getByRole('heading', { name: /new transaction/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  it('shows form fields in dialog when opened', async () => {
    const user = userEvent.setup();
    render(<TransactionsPage />);
    await user.click(screen.getByRole('button', { name: /new transaction/i }));
    expect(screen.getByRole('heading', { name: /new transaction/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  it('shows empty state when no transactions exist', () => {
    mockUseQuery.list.mockReturnValue({
      data: { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 },
    });
    render(<TransactionsPage />);
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });
});

describe('TransactionsPage styling', () => {
  it('renders table with solid white background, not glassmorphism', () => {
    const { container } = render(<TransactionsPage />);
    const tableContainer = container.querySelector('table')?.parentElement;
    expect(tableContainer).toHaveClass('bg-white');
    expect(tableContainer).not.toHaveClass('bg-white/70');
    expect(tableContainer).not.toHaveClass('backdrop-blur-md');
  });

  it('renders filter container with responsive flex-wrap layout', () => {
    const { container } = render(<TransactionsPage />);
    const filterContainer = container.querySelector('.flex.flex-wrap.gap-3');
    expect(filterContainer).toBeInTheDocument();
    expect(filterContainer).toHaveClass('flex-wrap');
  });
});

describe('TransactionsPage touch targets', () => {
  it('has filter inputs with py-3 or greater', () => {
    render(<TransactionsPage />);
    const search = screen.getByPlaceholderText('Search transactions');
    const filters = screen.getAllByRole('combobox');
    for (const el of [search, ...filters]) {
      expect(el.className).toMatch(/py-[3-9]|py-1[0-9]/);
    }
  });

  it('has pagination buttons with py-3 or greater', () => {
    render(<TransactionsPage />);
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      expect(btn.className).toMatch(/py-[3-9]|py-1[0-9]/);
    }
  });
});
