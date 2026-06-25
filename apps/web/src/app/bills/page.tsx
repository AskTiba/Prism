'use client';

import { trpc } from '@/lib/trpc';

function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? '-' : '+';
  return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function BillsPage() {
  const { data } = trpc.transactions.list.useQuery({ pageSize: 100, category: 'Bills' });
  const bills = data?.items.filter((t) => t.recurring) ?? [];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const paid = bills.filter((b) => {
    const d = new Date(b.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const upcoming = bills.filter((b) => {
    const d = new Date(b.date);
    return d > now || d.getMonth() !== currentMonth || d.getFullYear() !== currentYear;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Recurring Bills</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white px-5 py-6">
          <p className="text-sm text-grey-500">Paid Bills</p>
          <p className="mt-1 text-2xl font-bold text-green">
            {paid.length} (
            {formatCurrency(paid.reduce((s, b) => s + Math.abs(b.amount), 0))})
          </p>
        </div>
        <div className="rounded-xl bg-white px-5 py-6">
          <p className="text-sm text-grey-500">Upcoming</p>
          <p className="mt-1 text-2xl font-bold">
            {upcoming.length} (
            {formatCurrency(upcoming.reduce((s, b) => s + Math.abs(b.amount), 0))})
          </p>
        </div>
        <div className="rounded-xl bg-white px-5 py-6">
          <p className="text-sm text-grey-500">Due Soon</p>
          <p className="mt-1 text-2xl font-bold text-red">
            {upcoming.length} (
            {formatCurrency(upcoming.reduce((s, b) => s + Math.abs(b.amount), 0))})
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-grey-100 text-grey-500">
              <th className="px-5 py-3 font-medium">Bill</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b border-grey-100 last:border-0">
                <td className="px-5 py-3 font-medium">{bill.name}</td>
                <td className="px-5 py-3 font-bold">{formatCurrency(bill.amount)}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      paid.includes(bill)
                        ? 'bg-green/10 text-green'
                        : 'bg-red/10 text-red'
                    }`}
                  >
                    {paid.includes(bill) ? 'Paid' : 'Upcoming'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
