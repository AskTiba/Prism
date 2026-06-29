export function WidgetSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-white px-5 py-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="h-5 w-24 animate-pulse rounded bg-grey-100" />
        <div className="h-4 w-20 animate-pulse rounded bg-grey-100" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-grey-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-grey-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-grey-100" />
      </div>
    </div>
  );
}

export function SummaryCardSkeleton() {
  return (
    <div className="space-y-2 rounded-xl bg-white px-5 py-6">
      <div className="h-4 w-20 animate-pulse rounded bg-grey-100" />
      <div className="h-8 w-32 animate-pulse rounded bg-grey-100" />
    </div>
  );
}

export function PieChartSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-grey-100" />
      <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-3 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-grey-100" />
            <div className="space-y-1">
              <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
              <div className="h-4 w-12 animate-pulse rounded bg-grey-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="divide-y divide-grey-100">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-grey-100" />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="h-4 w-32 animate-pulse rounded bg-grey-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-grey-100" />
          </div>
          <div className="space-y-1 text-right">
            <div className="h-4 w-16 animate-pulse rounded bg-grey-100" />
            <div className="h-3 w-12 animate-pulse rounded bg-grey-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PotsCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex shrink-0 items-center gap-3 rounded-xl bg-beige px-4 py-5">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-grey-100" />
        <div className="space-y-1">
          <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
          <div className="h-6 w-20 animate-pulse rounded bg-grey-100" />
        </div>
      </div>
      <div className="grid min-w-0 grid-cols-2 gap-4 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 h-8 w-1 shrink-0 animate-pulse rounded-full bg-grey-100" />
            <div className="space-y-1">
              <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
              <div className="h-4 w-12 animate-pulse rounded bg-grey-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white border border-grey-100 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-grey-100">
            {Array.from({ length: cols }).map((_, c) => (
              <th key={c} className="px-5 py-3">
                <div className="h-4 w-20 animate-pulse rounded bg-grey-100" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b border-grey-100 last:border-0">
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="px-5 py-3">
                  {c === 0 ? (
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-grey-100" />
                      <div className="h-4 w-32 animate-pulse rounded bg-grey-100" />
                    </div>
                  ) : (
                    <div className="h-4 w-16 animate-pulse rounded bg-grey-100" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BudgetCardSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-pulse rounded-full bg-grey-100" />
        <div className="h-5 w-24 animate-pulse rounded bg-grey-100" />
      </div>
      <div className="mt-1 h-3 w-32 animate-pulse rounded bg-grey-100" />
      <div className="mt-3 space-y-2">
        <div className="h-2 w-full animate-pulse rounded-full bg-grey-100" />
        <div className="flex justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
          <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
        </div>
      </div>
    </div>
  );
}

export function PotCardSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-pulse rounded-full bg-grey-100" />
        <div className="h-5 w-24 animate-pulse rounded bg-grey-100" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
          <div className="h-3 w-16 animate-pulse rounded bg-grey-100" />
        </div>
        <div className="h-2 w-full animate-pulse rounded-full bg-grey-100" />
      </div>
      <div className="mt-4 h-10 w-full animate-pulse rounded bg-grey-100" />
    </div>
  );
}

export function BillSummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl bg-white px-5 py-6 space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-grey-100" />
          <div className="h-7 w-28 animate-pulse rounded bg-grey-100" />
        </div>
      ))}
    </div>
  );
}
