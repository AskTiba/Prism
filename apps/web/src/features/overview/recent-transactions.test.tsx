import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecentTransactions } from './recent-transactions';
import '@testing-library/jest-dom/vitest';

const mockUseQuery = vi.hoisted(() => ({ list: vi.fn() }));

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
      items: [
        {
          id: '1',
          name: 'Emma Richardson',
          amount: -75.5,
          category: 'Bills',
          date: '2024-08-19T14:23:11Z',
          recurring: true,
          avatar: '/images/avatars/emma-richardson.jpg',
        },
        {
          id: '2',
          name: 'Spotify',
          amount: -14.99,
          category: 'Entertainment',
          date: '2024-08-15T14:23:11Z',
          recurring: true,
          avatar: '/images/avatars/spotify.jpg',
        },
      ],
    },
  });
});

describe('RecentTransactions', () => {
  it('renders transaction name', () => {
    render(<RecentTransactions />);
    expect(screen.getByText('Emma Richardson')).toBeInTheDocument();
  });

  it('renders category', () => {
    render(<RecentTransactions />);
    expect(screen.getByText('Bills')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<RecentTransactions />);
    expect(screen.getByText(/19 Aug 2024/i)).toBeInTheDocument();
  });

  it('renders amounts', () => {
    render(<RecentTransactions />);
    expect(screen.getByText('-$75.50')).toBeInTheDocument();
  });

  it('renders avatar images', () => {
    render(<RecentTransactions />);
    const { container } = render(<RecentTransactions />);
    expect(container.querySelectorAll('img').length).toBeGreaterThanOrEqual(1);
  });

  it('truncates long transaction names', () => {
    mockUseQuery.list.mockReturnValue({
      data: {
        items: [
          {
            id: '1',
            name: 'A very long transaction name that should be truncated',
            amount: -50,
            category: 'Bills',
            date: '2024-08-19T14:23:11Z',
            recurring: false,
            avatar: null,
          },
        ],
      },
    });
    render(<RecentTransactions />);
    const nameEl = screen.getByText(/A very long transaction name/);
    expect(nameEl.className).toMatch(/truncate|overflow-hidden/);
  });
});
