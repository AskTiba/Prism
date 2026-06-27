'use client';

import { useState } from 'react';
import { budgetCreateSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import { CATEGORIES, CATEGORY_THEMES } from '@repo/shared';
import GlassInput from '@/components/ui/GlassInput';
import GlassSelect from '@/components/ui/GlassSelect';

export function BudgetForm({ onSuccess }: { onSuccess: () => void }) {
  const [category, setCategory] = useState('');
  const [maximum, setMaximum] = useState('');
  const theme = category ? CATEGORY_THEMES[category] : '';
  const [errors, setErrors] = useState<Record<string, string>>({});
  const create = trpc.budgets.create.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = budgetCreateSchema.safeParse({
      category,
      maximum: maximum ? parseFloat(maximum) : undefined,
      theme,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    try {
      await create.mutateAsync(result.data);
      onSuccess();
    } catch {
      setErrors({ form: 'Failed to create budget. Please try again.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-grey-500">Category</label>
        <GlassSelect
          value={category}
          onChange={(v) => setCategory(v)}
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          placeholder="Select a category"
          aria-label="Category"
        />
        {errors.category && <p className="mt-1 text-xs text-red">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="maximum" className="block text-sm font-medium text-grey-500">
          Maximum
        </label>
        <GlassInput
          id="maximum"
          variant="form"
          type="number"
          step="0.01"
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
        />
        {errors.maximum && <p className="mt-1 text-xs text-red">{errors.maximum}</p>}
      </div>

      {errors.form && <p className="text-sm text-red">{errors.form}</p>}

      <button
        type="submit"
        className="w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10"
      >
        Add Budget
      </button>
    </form>
  );
}
