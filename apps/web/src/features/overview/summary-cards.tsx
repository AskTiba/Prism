'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrencyCompact } from '@repo/shared';
import { SummaryCardSkeleton } from '@/components/WidgetSkeleton';

function SummaryCard({
  label,
  amount,
  dark,
}: {
  label: string;
  amount: number;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-5 py-6 ${dark ? 'bg-grey-900 text-white' : 'bg-white'}`}
    >
      <p className={`text-sm ${dark ? 'text-white/70' : 'text-grey-500'}`}>{label}</p>
      <p className={`mt-2 text-3xl font-bold ${dark ? 'text-white' : 'text-grey-900'}`}>
        {formatCurrencyCompact(amount)}
      </p>
    </div>
  );
}

export function SummaryCards() {
  const { data: transactions, isLoading } = trpc.transactions.list.useQuery({ pageSize: 1000 });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>
    );
  }

  const total = transactions?.items.reduce((sum, t) => sum + t.amount, 0) ?? 0;
  const income =
    transactions?.items
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0) ?? 0;
  const expenses =
    transactions?.items
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0) ?? 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <SummaryCard label="Current Balance" amount={total} dark />
      <SummaryCard label="Income" amount={income} />
      <SummaryCard label="Expenses" amount={expenses} />
    </div>
  );
}
