'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrency } from '@repo/shared';

export function BillsSummary() {
  const { data } = trpc.transactions.list.useQuery({ pageSize: 100, category: 'Bills' });
  const bills = data?.items ?? [];
  const paidCount = bills.filter((b) => b.amount < 0).length;
  const totalPaid = bills
    .filter((b) => b.amount < 0)
    .reduce((s, b) => s + Math.abs(b.amount), 0);

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recurring Bills</h2>
        <a href="/bills" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-sm text-grey-500">Paid Bills</dt>
          <dd className="text-sm font-bold text-green">
            {paidCount} ({formatCurrency(totalPaid)})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-grey-500">Total Upcoming</dt>
          <dd className="text-sm font-bold">{formatCurrency(0)}</dd>
        </div>
      </dl>
    </div>
  );
}
