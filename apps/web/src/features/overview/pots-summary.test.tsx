import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PotsSummary } from './pots-summary';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    pots: {
      list: {
        useQuery: () => ({
          data: [
            { id: '1', name: 'Savings', target: 2000, total: 159, theme: '#277C78' },
            {
              id: '2',
              name: 'Concert Ticket',
              target: 150,
              total: 110,
              theme: '#82C9D7',
            },
            { id: '3', name: 'Gift', target: 200, total: 40, theme: '#F2CDAC' },
            { id: '4', name: 'New Laptop', target: 1000, total: 10, theme: '#826CB0' },
          ],
        }),
      },
    },
  },
}));

describe('PotsSummary', () => {
  it('shows Total Saved heading', () => {
    render(<PotsSummary />);
    expect(screen.getByText('Total Saved')).toBeInTheDocument();
  });

  it('shows total of all pots', () => {
    render(<PotsSummary />);
    expect(screen.getByText(/UGX\s*319/)).toBeInTheDocument();
  });

  it('renders pot names in a 2-column grid', () => {
    render(<PotsSummary />);
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Concert Ticket')).toBeInTheDocument();
    expect(screen.getByText('Gift')).toBeInTheDocument();
    expect(screen.getByText('New Laptop')).toBeInTheDocument();
  });
});
