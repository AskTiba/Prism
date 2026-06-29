import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CashFlowCard } from './cash-flow-card';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    data: {
      cashFlowProjection: {
        useQuery: () => ({
          data: [
            { date: '2024-09-01', amount: 3000, name: 'Salary', balance: 3000 },
            { date: '2024-09-05', amount: -1200, name: 'Rent', balance: 1800 },
            { date: '2024-09-10', amount: -50, name: 'Netflix', balance: 1750 },
          ],
        }),
      },
    },
  },
}));

describe('CashFlowCard', () => {
  it('renders the heading', () => {
    render(<CashFlowCard />);
    expect(screen.getByText(/cash flow/i)).toBeInTheDocument();
  });

  it('renders projected entries', () => {
    render(<CashFlowCard />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Netflix')).toBeInTheDocument();
  });

  it('renders projected running balance value', () => {
    render(<CashFlowCard />);
    const balanceEl = screen.getAllByText(/UGX\s*1\.8K/);
    expect(balanceEl.length).toBeGreaterThanOrEqual(1);
  });
});
