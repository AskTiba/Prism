'use client'

import { trpc } from '@/lib/trpc'

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function PotProgress({ total, target, theme }: { total: number; target: number; theme: string }) {
  const percentage = Math.min((total / target) * 100, 100)
  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm">
        <span className="text-grey-500">{formatCurrency(total)}</span>
        <span className="text-grey-500">of {formatCurrency(target)}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-grey-100">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: theme }}
        />
      </div>
    </div>
  )
}

export default function PotsPage() {
  const { data: pots } = trpc.pots.list.useQuery()
  const items = pots ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pots</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((pot) => (
          <div key={pot.id} className="rounded-xl bg-white px-5 py-6">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: pot.theme }} />
              <h2 className="text-lg font-bold">{pot.name}</h2>
            </div>
            <PotProgress total={pot.total} target={pot.target} theme={pot.theme} />
          </div>
        ))}
      </div>
    </div>
  )
}
