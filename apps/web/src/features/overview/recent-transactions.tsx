'use client';

import { trpc } from '@/lib/trpc';
import Image from 'next/image';

function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? '-' : '+';
  return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getFullYear()}`;
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
          <li key={tx.id} className="flex items-center gap-3 py-3">
            {tx.avatar ? (
              <Image src={tx.avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-100 text-xs font-bold text-grey-500">
                {tx.name.charAt(0)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{tx.name}</p>
              <p className="text-xs text-grey-500">
                {tx.category}
                {tx.subtype && (
                  <span className="ml-1 rounded bg-beige px-1 text-[10px]">{tx.subtype}</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold ${tx.amount < 0 ? 'text-grey-900' : 'text-green'}`}
              >
                {formatCurrency(tx.amount)}
              </p>
              <p className="text-xs text-grey-500">{formatDate(tx.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
