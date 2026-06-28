'use client';

import { Plus, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { potAddWithdrawSchema, formatCurrency } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';

interface PotMoneyFormProps {
  pot: { id: string; name: string; target: number; total: number; theme: string };
  onSuccess: () => void;
}

type PotMoneyFormData = z.infer<typeof potAddWithdrawSchema>;

export function PotMoneyForm({ pot, onSuccess }: PotMoneyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PotMoneyFormData>({
    resolver: zodResolver(potAddWithdrawSchema),
    defaultValues: { amount: undefined },
  });

  const addMoney = trpc.pots.addMoney.useMutation();
  const withdraw = trpc.pots.withdraw.useMutation();

  async function onAdd(data: PotMoneyFormData) {
    try {
      await addMoney.mutateAsync({ id: pot.id, amount: data.amount });
      reset({ amount: undefined });
      onSuccess();
    } catch {
      /* mutation error */
    }
  }

  async function onWithdraw(data: PotMoneyFormData) {
    try {
      await withdraw.mutateAsync({ id: pot.id, amount: data.amount });
      reset({ amount: undefined });
      onSuccess();
    } catch {
      /* mutation error */
    }
  }

  return (
    <form className="space-y-5">
      <p className="text-sm font-semibold text-grey-700">{pot.name}</p>
      <div className="flex justify-between text-sm text-grey-500">
        <span>{formatCurrency(pot.total)}</span>
        <span>of {formatCurrency(pot.target)}</span>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-semibold text-grey-700">
          Amount
        </label>
        <GlassInput
          id="amount"
          variant="form"
          type="number"
          step="0.01"
          prefix="UGX"
          {...register('amount', {
            setValueAs: (v) => (v === '' ? undefined : parseFloat(v as string)),
          })}
        />
        {errors.amount && (
          <p className="mt-1 text-xs text-red">{errors.amount.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit(onAdd)}
          disabled={addMoney.isPending}
          className="inline-flex items-center justify-center gap-2 flex-1 rounded-xl bg-green px-4 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-green/85 disabled:opacity-50 shadow-md shadow-green/10 min-h-[48px]"
        >
          <Plus size={16} />
          Add Money
        </button>
        <button
          type="button"
          onClick={handleSubmit(onWithdraw)}
          disabled={withdraw.isPending}
          className="inline-flex items-center justify-center gap-2 flex-1 rounded-xl bg-red px-4 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-red/85 disabled:opacity-50 shadow-md shadow-red/10 min-h-[48px]"
        >
          <Minus size={16} />
          Withdraw
        </button>
      </div>

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}
    </form>
  );
}
