import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TransactionsPage from './page';
import '@testing-library/jest-dom/vitest';

const mockUseQuery = vi.hoisted(() => ({
  list: vi.fn(),
}));

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      list: { useQuery: () => mockUseQuery.list() },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();

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
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
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
