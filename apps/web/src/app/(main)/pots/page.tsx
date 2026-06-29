'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { GlassDialog } from '@/components/ui/GlassDialog';
import GlassButton from '@/components/ui/GlassButton';
import { PotForm } from './PotForm';
import { PotMoneyForm } from './PotMoneyForm';
import { formatCurrency, formatCurrencyCompact } from '@repo/shared';

function PotProgress({
  total,
  target,
  theme,
}: {
  total: number;
  target: number;
  theme: string;
}) {
  const percentage = Math.min((total / target) * 100, 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm">
        <span className="text-grey-500">{formatCurrencyCompact(total)}</span>
        <span className="text-grey-500">of {formatCurrencyCompact(target)}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-grey-100">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: theme }}
        />
      </div>
    </div>
  );
}

export default function PotsPage() {
  const [newOpen, setNewOpen] = useState(false);
  const [selectedPot, setSelectedPot] = useState<{
    id: string;
    name: string;
    target: number;
    total: number;
    theme: string;
  } | null>(null);
  const { data: pots } = trpc.pots.list.useQuery();
  const utils = trpc.useUtils();
  const items = pots ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pots</h1>
        <GlassButton type="button" variant="primary" onClick={() => setNewOpen(true)}>
          <Plus size={16} />
          New Pot
        </GlassButton>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((pot) => (
          <div key={pot.id} className="rounded-xl bg-white px-5 py-6">
            <div className="flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: pot.theme }}
              />
              <h2 className="text-lg font-bold">{pot.name}</h2>
            </div>
            <PotProgress total={pot.total} target={pot.target} theme={pot.theme} />
            <GlassButton
              type="button"
              variant="primary"
              onClick={() => setSelectedPot(pot)}
              className="mt-4 w-full"
            >
              Add / Withdraw
            </GlassButton>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl bg-white border border-grey-100 px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-grey-900">No pots yet</h3>
            <p className="mt-1 text-sm text-grey-500">
              Create your first pot to start saving.
            </p>
          </div>
        )}
      </div>

      <GlassDialog open={newOpen} onClose={() => setNewOpen(false)} title="New Pot">
        <PotForm
          onSuccess={() => {
            setNewOpen(false);
            utils.pots.list.invalidate();
          }}
        />
      </GlassDialog>

      <GlassDialog
        open={!!selectedPot}
        onClose={() => setSelectedPot(null)}
        title={selectedPot?.name ?? ''}
      >
        {selectedPot && (
          <PotMoneyForm
            pot={selectedPot}
            onSuccess={() => {
              utils.pots.list.invalidate();
              setSelectedPot(null);
            }}
          />
        )}
      </GlassDialog>
    </div>
  );
}
