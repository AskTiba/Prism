import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NetWorthCard } from './net-worth-card';
import '@testing-library/jest-dom/vitest';

const mockUseQuery = vi.hoisted(() => ({ netWorth: vi.fn() }));

vi.mock('@/lib/trpc', () => ({
  trpc: {
    data: {
      netWorth: { useQuery: () => mockUseQuery.netWorth() },
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockUseQuery.netWorth.mockReturnValue({
    data: { totalIncome: 10000, totalExpenses: 4500, totalPots: 2000, netWorth: 7500 },
  });
});

describe('NetWorthCard', () => {
  it('renders the net worth heading', () => {
    render(<NetWorthCard />);
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
  });

  it('renders the computed net worth value', () => {
    render(<NetWorthCard />);
    expect(screen.getByText(/UGX\s*7.5K/)).toBeInTheDocument();
  });

  it('renders income, expenses, and pots breakdown', () => {
    render(<NetWorthCard />);
    expect(screen.getByText(/total income/i)).toBeInTheDocument();
    expect(screen.getByText(/UGX\s*10K/)).toBeInTheDocument();
    expect(screen.getByText(/total expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/UGX\s*4.5K/)).toBeInTheDocument();
    expect(screen.getByText(/savings/i)).toBeInTheDocument();
    expect(screen.getByText(/UGX\s*2K/)).toBeInTheDocument();
  });

  it('renders negative net worth in red text', () => {
    mockUseQuery.netWorth.mockReturnValue({
      data: { totalIncome: 3000, totalExpenses: 5000, totalPots: 500, netWorth: -1500 },
    });
    render(<NetWorthCard />);
    const valueEl = screen.getByText(/-UGX\s*1.5K/);
    expect(valueEl.className).toMatch(/text-red/);
  });
});
