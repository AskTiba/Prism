'use client';

import { trpc } from '@/lib/trpc';

export function BudgetSummary() {
  const { data: budgets } = trpc.budgets.list.useQuery();
  const items = budgets ?? [];

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Budgets</h2>
        <a href="/budgets" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>
      <ul className="space-y-3">
        {items.map((budget) => (
          <li key={budget.id} className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: budget.theme }}
            />
            <span className="flex-1 text-sm">{budget.category}</span>
            <span className="text-sm font-bold">${budget.spent.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
