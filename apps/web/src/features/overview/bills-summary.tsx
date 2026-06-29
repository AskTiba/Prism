'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrencyCompact } from '@repo/shared';
import { WidgetSkeleton } from '@/components/WidgetSkeleton';

export function BillsSummary() {
  const { data, isLoading } = trpc.transactions.list.useQuery({
    pageSize: 100,
    category: 'Bills',
  });

  const bills = data?.items ?? [];
  const totalPaid = bills
    .filter((b) => b.amount < 0)
    .reduce((s, b) => s + Math.abs(b.amount), 0);
  const totalUpcoming = bills
    .filter((b) => b.amount > 0)
    .reduce((s, b) => s + b.amount, 0);

  if (isLoading) {
    return <WidgetSkeleton />;
  }

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recurring Bills</h2>
        <a href="/bills" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>
      <dl className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border-l-4 border-green bg-green/5 px-4 py-3">
          <dt className="text-sm text-grey-500">Paid Bills</dt>
          <dd className="text-sm font-bold text-green">
            {formatCurrencyCompact(totalPaid)}
          </dd>
        </div>
        <div className="flex items-center justify-between rounded-lg border-l-4 border-yellow bg-yellow/5 px-4 py-3">
          <dt className="text-sm text-grey-500">Total Upcoming</dt>
          <dd className="text-sm font-bold">
            {formatCurrencyCompact(totalUpcoming)}
          </dd>
        </div>
        <div className="flex items-center justify-between rounded-lg border-l-4 border-cyan bg-cyan/5 px-4 py-3">
          <dt className="text-sm text-grey-500">Due Soon</dt>
          <dd className="text-sm font-bold">
            {formatCurrencyCompact(totalUpcoming > 0 ? totalUpcoming * 0.3 : 0)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
