'use client';

import { useState } from 'react';
import { potAddWithdrawSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';

interface PotMoneyFormProps {
  pot: { id: string; name: string; target: number; total: number; theme: string };
  onSuccess: () => void;
}

export function PotMoneyForm({ pot, onSuccess }: PotMoneyFormProps) {
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const addMoney = trpc.pots.addMoney.useMutation();
  const withdraw = trpc.pots.withdraw.useMutation();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const result = potAddWithdrawSchema.safeParse({
      amount: amount ? parseFloat(amount) : undefined,
    });
    if (!result.success) return setErrors({ amount: result.error.issues[0].message });
    try {
      await addMoney.mutateAsync({ id: pot.id, amount: result.data.amount });
      onSuccess();
    } catch {
      setErrors({ form: 'Failed to add money.' });
    }
  }

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const result = potAddWithdrawSchema.safeParse({
      amount: amount ? parseFloat(amount) : undefined,
    });
    if (!result.success) return setErrors({ amount: result.error.issues[0].message });
    try {
      await withdraw.mutateAsync({ id: pot.id, amount: result.data.amount });
      onSuccess();
    } catch {
      setErrors({ form: 'Failed to withdraw.' });
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">{pot.name}</p>
      <div className="flex justify-between text-sm text-grey-500">
        <span>${pot.total.toFixed(2)}</span>
        <span>of ${pot.target.toFixed(2)}</span>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-grey-500">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2 text-sm"
        />
        {errors.amount && <p className="mt-1 text-xs text-red">{errors.amount}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-lg bg-green py-3 text-sm font-bold text-white transition-colors hover:bg-green/80"
        >
          Add Money
        </button>
        <button
          type="button"
          onClick={handleWithdraw}
          className="flex-1 rounded-lg bg-red py-3 text-sm font-bold text-white transition-colors hover:bg-red/80"
        >
          Withdraw
        </button>
      </div>

      {errors.form && <p className="text-sm text-red">{errors.form}</p>}
    </div>
  );
}
