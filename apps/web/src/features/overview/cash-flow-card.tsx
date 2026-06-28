'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrency } from '@repo/shared';

export function CashFlowCard() {
  const { data } = trpc.data.cashFlowProjection.useQuery();
  const entries = data ?? [];

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <h2 className="text-lg font-bold">Cash Flow</h2>
      <p className="mt-1 text-sm text-grey-500">
        Projected recurring income and expenses.
      </p>
      <div className="mt-4 space-y-3">
        {entries.map((entry, i) => (
          <div
            key={`${entry.date}-${entry.name}-${i}`}
            className="flex items-center justify-between text-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-grey-900">{entry.name}</p>
              <p className="text-xs text-grey-500">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${entry.amount < 0 ? 'text-red' : 'text-green'}`}>
                {formatCurrency(entry.amount)}
              </p>
              <p className="text-xs text-grey-500">{formatCurrency(entry.balance)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
