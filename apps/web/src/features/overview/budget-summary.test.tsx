import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BudgetSummary } from './budget-summary';
import '@testing-library/jest-dom/vitest';

vi.mock('recharts', () => {
  const MockPieChart = ({ children }: any) => (
    <div data-testid="pie-chart">{children}</div>
  );
  const MockPie = ({ children }: any) => <div data-testid="pie">{children}</div>;
  const MockCell = () => <span data-testid="cell" />;
  return { PieChart: MockPieChart, Pie: MockPie, Cell: MockCell };
});

vi.mock('@/lib/trpc', () => ({
  trpc: {
    budgets: {
      list: {
        useQuery: () => ({
          data: [
            {
              id: '1',
              category: 'Entertainment',
              maximum: 100,
              spent: 50,
              theme: '#277C78',
            },
            { id: '2', category: 'Bills', maximum: 500, spent: 300, theme: '#82C9D7' },
            {
              id: '3',
              category: 'Groceries',
              maximum: 200,
              spent: 100,
              theme: '#F2CDAC',
            },
          ],
        }),
      },
    },
  },
}));

describe('BudgetSummary', () => {
  it('shows budget categories', () => {
    render(<BudgetSummary />);
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Bills')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('shows spent amounts', () => {
    render(<BudgetSummary />);
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('renders a donut chart SVG', () => {
    render(<BudgetSummary />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('cell').length).toBeGreaterThanOrEqual(3);
  });

  it('shows total budget in center of donut', () => {
    render(<BudgetSummary />);
    expect(screen.getByText('$800')).toBeInTheDocument();
  });
});
