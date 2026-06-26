'use client';

import { trpc } from '@/lib/trpc';

export function DetectedSubscriptions() {
  const { data } = trpc.data.detectedSubscriptions.useQuery();
  const subscriptions = data ?? [];

  if (subscriptions.length === 0) return null;

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <h2 className="text-lg font-bold">Detected Subscriptions</h2>
      <p className="mt-1 text-sm text-grey-500">
        Recurring charges automatically identified from your transactions.
      </p>
      <ul className="mt-4 divide-y divide-grey-100">
        {subscriptions.map((sub) => (
          <li key={sub.name} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-grey-900">{sub.name}</p>
              <p className="text-xs text-grey-500">
                Next: {new Date(sub.nextDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <span className="text-sm font-bold text-grey-900">
              ${sub.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
