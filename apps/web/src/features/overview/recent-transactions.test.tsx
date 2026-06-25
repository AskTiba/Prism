import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecentTransactions } from './recent-transactions';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    transactions: {
      list: {
        useQuery: () => ({
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
        }),
      },
    },
  },
}));

describe('RecentTransactions overflow', () => {
  it('truncates long transaction names', () => {
    render(<RecentTransactions />);
    const nameEl = screen.getByText(/A very long transaction name/);
    expect(nameEl.className).toMatch(/truncate|overflow-hidden/);
  });
});
