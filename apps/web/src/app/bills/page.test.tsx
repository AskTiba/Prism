import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillsPage from './page';
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
      items: [
        {
          id: '1',
          name: 'Netflix',
          amount: -15.99,
          category: 'Bills',
          date: '2024-08-15T14:23:11Z',
          recurring: true,
          avatar: null,
        },
        {
          id: '2',
          name: 'Spotify',
          amount: -14.99,
          category: 'Bills',
          date: '2024-08-10T14:23:11Z',
          recurring: true,
          avatar: null,
        },
        {
          id: '3',
          name: 'Telus',
          amount: -95.0,
          category: 'Bills',
          date: '2024-08-07T09:00:00Z',
          recurring: true,
          avatar: null,
        },
      ],
      total: 3,
      page: 1,
      pageSize: 20,
      totalPages: 1,
    },
  });
});

describe('BillsPage', () => {
  it('renders recurring bill names', () => {
    render(<BillsPage />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Telus')).toBeInTheDocument();
  });

  it('shows amounts', () => {
    render(<BillsPage />);
    expect(screen.getByText('-$15.99')).toBeInTheDocument();
  });
});
