'use client';

import { trpc } from '@/lib/trpc';
import Image from 'next/image';
import { formatCurrency } from '@repo/shared';
import { DetectedSubscriptions } from './detected-subscriptions';

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

      <DetectedSubscriptions />

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
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {bill.avatar ? (
                      <Image
                        src={bill.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-100 text-xs font-bold text-grey-500">
                        {bill.name.charAt(0)}
                      </span>
                    )}
                    <span className="font-medium">{bill.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-bold">{formatCurrency(bill.amount)}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-medium ${
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
        {bills.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-grey-900">No recurring bills</h3>
            <p className="mt-1 text-sm text-grey-500">
              Recurring bills from your transactions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
