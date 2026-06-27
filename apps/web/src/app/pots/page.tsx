'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc'
import { Glass } from '@samasante/liquid-glass'
import { PotForm } from './PotForm'
import { PotMoneyForm } from './PotMoneyForm'

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
  const [newOpen, setNewOpen] = useState(false)
  const [selectedPot, setSelectedPot] = useState<{
    id: string; name: string; target: number; total: number; theme: string
  } | null>(null)
  const { data: pots } = trpc.pots.list.useQuery()
  const utils = trpc.useUtils()
  const items = pots ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pots</h1>
        <button
          type="button"
          onClick={() => setNewOpen(true)}
          className="rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10 min-h-[48px]"
        >
          + New Pot
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((pot) => (
          <div key={pot.id} className="rounded-xl bg-white px-5 py-6">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: pot.theme }} />
              <h2 className="text-lg font-bold">{pot.name}</h2>
            </div>
            <PotProgress total={pot.total} target={pot.target} theme={pot.theme} />
            <button
              type="button"
              onClick={() => setSelectedPot(pot)}
              className="mt-4 w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10 min-h-[48px]"
            >
              Add / Withdraw
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-grey-900">No pots yet</h3>
            <p className="mt-1 text-sm text-grey-500">Create your first pot to start saving.</p>
          </div>
        )}
      </div>

      {newOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md">
            <Glass
              style={{ borderRadius: 16, padding: 24 }}
              optics={{
                frost: 10, depth: 0.45, curvature: 0.2,
                strength: 0.1, dispersion: 0.15, bend: 0.3,
                specular: 0.5, brightness: 0.1,
              }}
            >
              <h2 className="text-lg font-bold text-grey-900">New Pot</h2>
              <PotForm onSuccess={() => { setNewOpen(false); utils.pots.list.invalidate() }} />
            </Glass>
          </div>
        </div>
      )}

      {selectedPot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md">
            <Glass
              style={{ borderRadius: 16, padding: 24 }}
              optics={{
                frost: 10, depth: 0.45, curvature: 0.2,
                strength: 0.1, dispersion: 0.15, bend: 0.3,
                specular: 0.5, brightness: 0.1,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-grey-900">{selectedPot.name}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedPot(null)}
                  className="text-2xl text-grey-500 hover:text-grey-900 transition-colors leading-none"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <PotMoneyForm
                pot={selectedPot}
                onSuccess={() => { utils.pots.list.invalidate(); setSelectedPot(null) }}
              />
            </Glass>
          </div>
        </div>
      )}
    </div>
  )
}
