'use client';

import { trpc } from '@/lib/trpc';

function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? '-' : '+';
  return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function RecentTransactions() {
  const { data } = trpc.transactions.list.useQuery({ pageSize: 5 });
  const transactions = data?.items ?? [];

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <a
          href="/transactions"
          className="py-3 text-sm text-grey-500 hover:text-grey-900"
        >
          View All
        </a>
      </div>
      <ul className="divide-y divide-grey-100">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex items-center justify-between py-3">
            <span className="min-w-0 truncate text-sm font-medium">{tx.name}</span>
            <span
              className={`text-sm font-bold ${tx.amount < 0 ? 'text-grey-900' : 'text-green'}`}
            >
              {formatCurrency(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
