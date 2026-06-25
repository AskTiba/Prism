import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryCards } from './summary-cards';
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
      items: [{ amount: 1000 }, { amount: -200 }, { amount: 500 }, { amount: -150 }],
    },
  });
});

describe('SummaryCards', () => {
  it('labels the first card Current Balance', () => {
    render(<SummaryCards />);
    expect(screen.getByText('Current Balance')).toBeInTheDocument();
  });

  it('labels the second card Income', () => {
    render(<SummaryCards />);
    expect(screen.getByText('Income')).toBeInTheDocument();
  });

  it('labels the third card Expenses', () => {
    render(<SummaryCards />);
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('gives the Current Balance card a dark background', () => {
    render(<SummaryCards />);
    const balanceEl = screen.getByText('Current Balance').closest('div');
    expect(balanceEl?.className).toMatch(/bg-grey-900/);
  });

  it('renders the computed total balance', () => {
    render(<SummaryCards />);
    expect(screen.getByText('$1,150.00')).toBeInTheDocument();
  });
});
