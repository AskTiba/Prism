'use client';

import { useState } from 'react';
import { potCreateSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';
import GlassSelect from '@/components/ui/GlassSelect';

const THEME_COLORS = [
  '#277C78',
  '#82C9D7',
  '#F2CDAC',
  '#826CB0',
  '#C94736',
  '#626070',
  '#201F24',
  '#934F6D',
  '#F8B4B4',
  '#597C7C',
];

export function PotForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [theme, setTheme] = useState(THEME_COLORS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const create = trpc.pots.create.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = potCreateSchema.safeParse({
      name,
      target: target ? parseFloat(target) : undefined,
      total: 0,
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
      setErrors({ form: 'Failed to create pot. Please try again.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-grey-500">
          Name
        </label>
        <GlassInput
          id="name"
          variant="form"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="mt-1 text-xs text-red">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="target" className="block text-sm font-medium text-grey-500">
          Target
        </label>
        <GlassInput
          id="target"
          variant="form"
          type="number"
          step="0.01"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        {errors.target && <p className="mt-1 text-xs text-red">{errors.target}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-500">Theme</label>
        <GlassSelect
          value={theme}
          onChange={(v) => setTheme(v)}
          options={THEME_COLORS.map((c) => ({ value: c, label: c }))}
          placeholder="Select theme"
          aria-label="Theme"
        />
        {errors.theme && <p className="mt-1 text-xs text-red">{errors.theme}</p>}
      </div>

      {errors.form && <p className="text-sm text-red">{errors.form}</p>}

      <button
        type="submit"
        className="w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10"
      >
        Add Pot
      </button>
    </form>
  );
}
