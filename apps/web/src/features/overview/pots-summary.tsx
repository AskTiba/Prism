'use client';

import { trpc } from '@/lib/trpc';
import { formatCurrencyCompact } from '@repo/shared';
import { PotsCardSkeleton } from '@/components/WidgetSkeleton';

export function PotsSummary() {
  const { data: pots, isLoading } = trpc.pots.list.useQuery();
  const items = pots ?? [];
  const totalSaved = items.reduce((s, p) => s + p.total, 0);

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Pots</h2>
        <a href="/pots" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>

      {isLoading ? (
        <PotsCardSkeleton />
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex shrink-0 items-center gap-3 rounded-xl bg-beige px-4 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm1-6h-2V5h2v4zm0 2h-2v-2h2v2z"
                  fill="#277C78"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-grey-500">Total Saved</p>
              <p className="text-lg font-bold text-grey-900 leading-tight whitespace-nowrap">
                {formatCurrencyCompact(totalSaved)}
              </p>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-4 flex-1">
            {items.slice(0, 4).map((pot) => (
              <div key={pot.id} className="flex items-start gap-3">
                <span
                  className="mt-1 block h-8 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: pot.theme }}
                />
                <div>
                  <p className="text-xs text-grey-500">{pot.name}</p>
                  <p className="text-sm font-bold text-grey-900">
                    {formatCurrencyCompact(pot.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
