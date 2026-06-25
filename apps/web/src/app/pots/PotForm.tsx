'use client';

import { useState } from 'react';
import { potCreateSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';

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
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-xs text-red">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="target" className="block text-sm font-medium text-grey-500">
          Target
        </label>
        <input
          id="target"
          type="number"
          step="0.01"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2 text-sm"
        />
        {errors.target && <p className="mt-1 text-xs text-red">{errors.target}</p>}
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-grey-500">
          Theme
        </label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2 text-sm"
        >
          {THEME_COLORS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.theme && <p className="mt-1 text-xs text-red">{errors.theme}</p>}
      </div>

      {errors.form && <p className="text-sm text-red">{errors.form}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-grey-900 py-3 text-sm font-bold text-white transition-colors hover:bg-grey-600"
      >
        Add Pot
      </button>
    </form>
  );
}
