'use client';

import { trpc } from '@/lib/trpc';

export function PotsSummary() {
  const { data: pots } = trpc.pots.list.useQuery();
  const items = pots ?? [];

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Pots</h2>
        <a href="/pots" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>
      <ul className="space-y-3">
        {items.map((pot) => (
          <li key={pot.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: pot.theme }}
              />
              <span className="text-sm">{pot.name}</span>
            </div>
            <span className="text-sm font-bold">${pot.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
