import { describe, it, expect } from 'vitest';
import { detectSubscriptions } from './subscription-radar';

describe('detectSubscriptions', () => {
  it('detects monthly subscription from recurring transactions', () => {
    const transactions = [
      { name: 'Netflix', amount: -15.99, date: '2024-08-15', category: 'Entertainment' },
      { name: 'Netflix', amount: -15.99, date: '2024-07-15', category: 'Entertainment' },
      { name: 'Netflix', amount: -15.99, date: '2024-06-15', category: 'Entertainment' },
    ];

    const result = detectSubscriptions(transactions as any);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Netflix');
    expect(result[0].amount).toBe(15.99);
    expect(result[0].interval).toBe('monthly');
    expect(result[0].nextDate).toBe('2024-09-15');
  });

  it('returns empty array for single occurrence', () => {
    const transactions = [
      { name: 'One-time', amount: -50, date: '2024-08-01', category: 'General' },
    ];

    const result = detectSubscriptions(transactions as any);
    expect(result).toHaveLength(0);
  });

  it('returns empty array for non-recurring amounts', () => {
    const transactions = [
      { name: 'Coffee', amount: -5, date: '2024-08-01', category: 'Dining Out' },
      { name: 'Coffee', amount: -5.5, date: '2024-08-02', category: 'Dining Out' },
    ];

    const result = detectSubscriptions(transactions as any);
    expect(result).toHaveLength(0);
  });

  it('ignores income transactions', () => {
    const transactions = [
      { name: 'Salary', amount: 3000, date: '2024-08-01', category: 'Income' },
      { name: 'Salary', amount: 3000, date: '2024-07-01', category: 'Income' },
    ];

    const result = detectSubscriptions(transactions as any);
    expect(result).toHaveLength(0);
  });
});
