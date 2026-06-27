'use client';

import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { budgetCreateSchema, CATEGORIES, CATEGORY_THEMES } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';
import GlassSelect from '@/components/ui/GlassSelect';

type BudgetFormData = z.infer<typeof budgetCreateSchema>;

export function BudgetForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetCreateSchema),
    defaultValues: { category: '' as any, maximum: undefined, theme: '' },
  });

  const category = watch('category');

  useEffect(() => {
    if (category && CATEGORY_THEMES[category]) {
      setValue('theme', CATEGORY_THEMES[category]);
    }
  }, [category, setValue]);

  const create = trpc.budgets.create.useMutation();

  async function onSubmit(data: BudgetFormData) {
    try {
      await create.mutateAsync(data);
      onSuccess();
    } catch {
      setValue('theme', '');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      <div>
        <label htmlFor="maximum" className="block text-sm font-semibold text-grey-700">
          Maximum
        </label>
        <GlassInput
          id="maximum"
          variant="form"
          type="number"
          step="0.01"
          prefix="$"
          {...register('maximum', { setValueAs: (v) => (v === '' ? undefined : parseFloat(v as string)) })}
        />
        {errors.maximum && <p className="mt-1 text-xs text-red">{errors.maximum.message}</p>}
      </div>

      <input type="hidden" {...register('theme')} />
      {errors.theme && <p className="mt-1 text-xs text-red">{errors.theme.message}</p>}

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}

      <button
        type="submit"
        disabled={create.isPending}
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 disabled:opacity-50 shadow-lg shadow-black/10"
      >
        <Plus size={16} />
        Add Budget
      </button>
    </form>
  );
}
