'use client';

import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import GlassButton from '@/components/ui/GlassButton';
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
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetCreateSchema),
    defaultValues: { category: '' as unknown as BudgetFormData['category'], maximum: undefined, theme: '' },
  });

  const category = useWatch({ control, name: 'category' });

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
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <input type="hidden" {...register('theme')} />
      {errors.theme && <p className="mt-1 text-xs text-red">{errors.theme.message}</p>}

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}

      <GlassButton
        type="submit"
        variant="primary"
        disabled={create.isPending}
        className="w-full"
      >
        <Plus size={16} />
        Add Budget
      </GlassButton>
    </form>
  );
}
