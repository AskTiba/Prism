'use client';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-grey-500">
          Name
        </label>
        <GlassInput id="name" variant="form" type="text" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-red">{errors.name.message}</p>}
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

      <div>
        <label className="block text-sm font-medium text-grey-500">Category</label>
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
            />
          )}
        />
        {errors.category && <p className="mt-1 text-xs text-red">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-grey-500">
          Date
        </label>
        <GlassInput id="date" variant="form" type="date" {...register('date')} />
        {errors.date && <p className="mt-1 text-xs text-red">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-500">Subtype</label>
        <Controller
          name="subtype"
          control={control}
          render={({ field }) => (
            <GlassSelect
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v || undefined)}
              options={SUBTYPES.map((s) => ({ value: s, label: s }))}
              placeholder="Select subtype (optional)"
              aria-label="Subtype"
            />
          )}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-grey-500">
          Tags (comma-separated)
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

      <div className="flex items-center gap-2">
        <input
          id="recurring"
          type="checkbox"
          className="h-5 w-5 rounded border-grey-300 text-green focus:ring-green"
          {...register('recurring')}
        />
        <label htmlFor="recurring" className="text-sm font-medium text-grey-500">
          Recurring transaction
        </label>
      </div>

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}

      <button
        type="submit"
        className="w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10"
      >
        Add Transaction
      </button>
    </form>
  );
}
