'use client'

import { trpc } from '@/lib/trpc'

function BudgetProgress({ spent, maximum, theme }: { spent: number; maximum: number; theme: string }) {
  const percentage = Math.min((spent / maximum) * 100, 100)
  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-full bg-grey-100">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: theme }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-grey-500">
        <span className="font-bold text-grey-900">${spent.toFixed(2)}</span>
        <span>of ${maximum.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default function BudgetsPage() {
  const { data: budgets } = trpc.budgets.list.useQuery()
  const items = budgets ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budgets</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((budget) => (
          <div key={budget.id} className="rounded-xl bg-white px-5 py-6">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: budget.theme }} />
              <h2 className="text-lg font-bold">{budget.category}</h2>
            </div>
            <p className="mt-1 text-sm text-grey-500">Maximum of ${budget.maximum.toFixed(2)}</p>
            <BudgetProgress spent={budget.spent} maximum={budget.maximum} theme={budget.theme} />
          </div>
        ))}
      </div>
    </div>
  )
}
