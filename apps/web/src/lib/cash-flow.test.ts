import { describe, it, expect } from 'vitest';
import { projectCashFlow } from './cash-flow';

describe('projectCashFlow', () => {
  it('projects recurring expenses forward 90 days', () => {
    const transactions = [
      { name: 'Rent', amount: -1200, date: '2024-08-01', recurring: true },
      { name: 'Rent', amount: -1200, date: '2024-07-01', recurring: true },
      { name: 'Rent', amount: -1200, date: '2024-06-01', recurring: true },
    ];

    const result = projectCashFlow(transactions as any);

    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result[0].name).toBe('Rent');
    expect(result[0].amount).toBe(-1200);
  });

  it('projects recurring income forward', () => {
    const transactions = [
      { name: 'Salary', amount: 3000, date: '2024-08-01', recurring: true },
      { name: 'Salary', amount: 3000, date: '2024-07-01', recurring: true },
      { name: 'Salary', amount: 3000, date: '2024-06-01', recurring: true },
    ];

    const result = projectCashFlow(transactions as any);

    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every((e) => e.name === 'Salary')).toBe(true);
  });

  it('returns empty array when no recurring transactions', () => {
    const transactions = [
      { name: 'Coffee', amount: -5, date: '2024-08-01', recurring: false },
    ];

    const result = projectCashFlow(transactions as any);
    expect(result).toHaveLength(0);
  });

  it('calculates running balance for projected entries', () => {
    const transactions = [
      { name: 'Salary', amount: 3000, date: '2024-08-01', recurring: true },
      { name: 'Rent', amount: -1200, date: '2024-08-01', recurring: true },
    ];
    // Need 3+ occurrences per group for detection
    const manyTxns = [
      ...transactions,
      ...transactions.map((t) => ({ ...t, date: '2024-07-01' })),
      ...transactions.map((t) => ({ ...t, date: '2024-06-01' })),
    ];

    const result = projectCashFlow(manyTxns as any);

    expect(result.length).toBeGreaterThanOrEqual(4);
    const salaryEntries = result.filter((e) => e.name === 'Salary');
    expect(salaryEntries.length).toBeGreaterThanOrEqual(2);
    expect(salaryEntries[0].balance).toBeGreaterThan(0);
  });

  it('sorts projected entries by date', () => {
    const transactions = [
      { name: 'Bill A', amount: -50, date: '2024-08-15', recurring: true },
      { name: 'Bill A', amount: -50, date: '2024-07-15', recurring: true },
      { name: 'Bill A', amount: -50, date: '2024-06-15', recurring: true },
      { name: 'Bill B', amount: -30, date: '2024-08-05', recurring: true },
      { name: 'Bill B', amount: -30, date: '2024-07-05', recurring: true },
      { name: 'Bill B', amount: -30, date: '2024-06-05', recurring: true },
    ];

    const result = projectCashFlow(transactions as any);

    for (let i = 1; i < result.length; i++) {
      expect(new Date(result[i].date) >= new Date(result[i - 1].date)).toBe(true);
    }
  });
});
