'use client';

import { useState } from 'react';
import { potAddWithdrawSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';

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
        <GlassInput
          id="amount"
          variant="form"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p className="mt-1 text-xs text-red">{errors.amount}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-xl bg-green px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-green/80 shadow-lg shadow-green/20"
        >
          Add Money
        </button>
        <button
          type="button"
          onClick={handleWithdraw}
          className="flex-1 rounded-xl bg-red px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-red/80 shadow-lg shadow-red/20"
        >
          Withdraw
        </button>
      </div>

      {errors.form && <p className="text-sm text-red">{errors.form}</p>}
    </div>
  );
}
