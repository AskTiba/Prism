import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BudgetSummary } from './budget-summary';
import { PotsSummary } from './pots-summary';
import { BillsSummary } from './bills-summary';
import { RecentTransactions } from './recent-transactions';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    budgets: { list: { useQuery: () => ({ data: [] }) } },
    pots: { list: { useQuery: () => ({ data: [] }) } },
    transactions: { list: { useQuery: () => ({ data: { items: [] } }) } },
  },
}));

describe('Overview widget touch targets', () => {
  it('BudgetSummary See Details link has py-3 or greater', () => {
    render(<BudgetSummary />);
    const link = screen.getByText('See Details');
    expect(link.className).toMatch(/py-[3-9]|py-1[0-9]/);
  });

  it('PotsSummary See Details link has py-3 or greater', () => {
    render(<PotsSummary />);
    const link = screen.getByText('See Details');
    expect(link.className).toMatch(/py-[3-9]|py-1[0-9]/);
  });

  it('BillsSummary See Details link has py-3 or greater', () => {
    render(<BillsSummary />);
    const link = screen.getByText('See Details');
    expect(link.className).toMatch(/py-[3-9]|py-1[0-9]/);
  });

  it('RecentTransactions View All link has py-3 or greater', () => {
    render(<RecentTransactions />);
    const link = screen.getByText('View All');
    expect(link.className).toMatch(/py-[3-9]|py-1[0-9]/);
  });
});
