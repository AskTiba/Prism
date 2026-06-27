'use client';

import { Plus } from 'lucide-react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { transactionCreateSchema, CATEGORIES, SUBTYPES } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';
import GlassSelect from '@/components/ui/GlassSelect';

type TransactionFormData = z.infer<typeof transactionCreateSchema>;

export function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionCreateSchema) as unknown as Resolver<TransactionFormData>,
    defaultValues: {
      name: '',
      amount: undefined,
      category: '' as any,
      date: '',
      subtype: undefined,
      tags: [],
      recurring: false,
    },
  });

  const create = trpc.transactions.create.useMutation();

  async function onSubmit(data: TransactionFormData) {
    try {
      await create.mutateAsync(data);
      onSuccess();
    } catch {
      /* mutation error */
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-grey-700">
          Name
        </label>
        <GlassInput id="name" variant="form" type="text" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-red">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-grey-700">
            Amount
          </label>
          <GlassInput
            id="amount"
            variant="form"
            type="number"
            step="0.01"
            prefix="$"
            {...register('amount', {
              setValueAs: (v) => (v === '' ? undefined : parseFloat(v as string)),
            })}
          />
          {errors.amount && <p className="mt-1 text-xs text-red">{errors.amount.message}</p>}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-grey-700">
            Date
          </label>
          <GlassInput id="date" variant="form" type="date" {...register('date')} />
          {errors.date && <p className="mt-1 text-xs text-red">{errors.date.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-grey-700">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <GlassSelect
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v)}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              placeholder="Select a category"
              aria-label="Category"
              variant="form"
            />
          )}
        />
        {errors.category && <p className="mt-1 text-xs text-red">{errors.category.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-grey-700">Subtype</label>
          <Controller
            name="subtype"
            control={control}
            render={({ field }) => (
              <GlassSelect
                value={field.value ?? ''}
                onChange={(v) => field.onChange(v || undefined)}
                options={SUBTYPES.map((s) => ({ value: s, label: s }))}
                placeholder="Optional"
                aria-label="Subtype"
                variant="form"
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold text-grey-700">
            Tags
          </label>
          <GlassInput
            id="tags"
            variant="form"
            type="text"
            placeholder="e.g. urgent, monthly"
            {...register('tags', {
              setValueAs: (v) =>
                typeof v === 'string' && v.trim()
                  ? v.split(',').map((t: string) => t.trim()).filter(Boolean)
                  : [],
            })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="recurring"
          type="checkbox"
          className="h-5 w-5 rounded border-grey-300 text-green focus:ring-green"
          {...register('recurring')}
        />
        <label htmlFor="recurring" className="text-sm font-medium text-grey-700">
          Recurring transaction
        </label>
      </div>

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}

      <button
        type="submit"
        disabled={create.isPending}
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 disabled:opacity-50 shadow-lg shadow-black/10"
      >
        <Plus size={16} />
        Add Transaction
      </button>
    </form>
  );
}
