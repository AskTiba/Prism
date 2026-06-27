'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { potAddWithdrawSchema } from '@repo/shared';
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
    <form className="space-y-4">
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
          {...register('amount', {
            setValueAs: (v) => (v === '' ? undefined : parseFloat(v as string)),
          })}
        />
        {errors.amount && <p className="mt-1 text-xs text-red">{errors.amount.message}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit(onAdd)}
          className="flex-1 rounded-xl bg-green px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-green/80 shadow-lg shadow-green/20"
        >
          Add Money
        </button>
        <button
          type="button"
          onClick={handleSubmit(onWithdraw)}
          className="flex-1 rounded-xl bg-red px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-red/80 shadow-lg shadow-red/20"
        >
          Withdraw
        </button>
      </div>

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}
    </form>
  );
}
