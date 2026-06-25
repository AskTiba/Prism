'use client'

import { trpc } from '@/lib/trpc'

function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? '-' : ''
  return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function SummaryCard({ label, amount, variant }: { label: string; amount: number; variant: 'green' | 'red' | 'grey' }) {
  const colorMap = { green: 'text-green', red: 'text-red', grey: 'text-grey-500' }
  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <p className="text-sm text-grey-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${colorMap[variant]}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  )
}

export function SummaryCards() {
  const { data: transactions } = trpc.transactions.list.useQuery({ pageSize: 1000 })

  const total = transactions?.items.reduce((sum, t) => sum + t.amount, 0) ?? 0
  const income = transactions?.items.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0) ?? 0
  const expenses = transactions?.items.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0) ?? 0

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <SummaryCard label="Total Balance" amount={total} variant="grey" />
      <SummaryCard label="Income" amount={income} variant="green" />
      <SummaryCard label="Expenses" amount={expenses} variant="red" />
    </div>
  )
}
