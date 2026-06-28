'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrency } from '@repo/shared';

export function NetWorthCard() {
  const { data } = trpc.data.netWorth.useQuery();

  if (!data) return null;

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <h2 className="text-lg font-bold">Net Worth</h2>
      <p
        className={`mt-2 text-3xl font-bold ${data.netWorth < 0 ? 'text-red' : 'text-grey-900'}`}
      >
        {formatCurrency(data.netWorth)}
      </p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-500">Total Income</span>
          <span className="font-medium text-green">
            {formatCurrency(data.totalIncome)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-500">Total Expenses</span>
          <span className="font-medium text-red">
            {formatCurrency(data.totalExpenses)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-500">Savings (Pots)</span>
          <span className="font-medium text-grey-900">
            {formatCurrency(data.totalPots)}
          </span>
        </div>
      </div>
    </div>
  );
}
