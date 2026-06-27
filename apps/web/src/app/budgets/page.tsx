'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc'
import { GlassDialog } from '@/components/ui/GlassDialog'
import { BudgetForm } from './BudgetForm'

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
  const [open, setOpen] = useState(false)
  const { data: budgets } = trpc.budgets.list.useQuery()
  const utils = trpc.useUtils()
  const items = budgets ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budgets</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10 min-h-[48px]"
        >
          + New Budget
        </button>
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
        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-grey-900">No budgets yet</h3>
            <p className="mt-1 text-sm text-grey-500">Create your first budget to start tracking spending.</p>
          </div>
        )}
      </div>

      <GlassDialog open={open} onClose={() => setOpen(false)} title="New Budget">
        <BudgetForm onSuccess={() => { setOpen(false); utils.budgets.list.invalidate() }} />
      </GlassDialog>
    </div>
  )
}
