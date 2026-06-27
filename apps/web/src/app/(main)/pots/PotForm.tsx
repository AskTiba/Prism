'use client';

import { Plus } from 'lucide-react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { potCreateSchema } from '@repo/shared';
import { trpc } from '@/lib/trpc';
import GlassInput from '@/components/ui/GlassInput';
import GlassButton from '@/components/ui/GlassButton';
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

type PotFormData = z.infer<typeof potCreateSchema>;

export function PotForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PotFormData>({
    resolver: zodResolver(potCreateSchema) as unknown as Resolver<PotFormData>,
    defaultValues: {
      name: '',
      target: undefined,
      total: 0,
      theme: THEME_COLORS[0],
    },
  });

  const create = trpc.pots.create.useMutation();

  async function onSubmit(data: PotFormData) {
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
          <label htmlFor="target" className="block text-sm font-semibold text-grey-700">
            Target
          </label>
          <GlassInput
            id="target"
            variant="form"
            type="number"
            step="0.01"
            prefix="$"
            {...register('target', {
              setValueAs: (v) => (v === '' ? undefined : parseFloat(v as string)),
            })}
          />
          {errors.target && <p className="mt-1 text-xs text-red">{errors.target.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-grey-700">Theme</label>
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <GlassSelect
                value={field.value}
                onChange={(v) => field.onChange(v)}
                options={THEME_COLORS.map((c) => ({ value: c, label: c }))}
                placeholder="Select theme"
                aria-label="Theme"
                variant="form"
              />
            )}
          />
          {errors.theme && <p className="mt-1 text-xs text-red">{errors.theme.message}</p>}
        </div>
      </div>

      <input type="hidden" {...register('total', { valueAsNumber: true })} />

      {errors.root && <p className="text-sm text-red">{errors.root.message}</p>}

      <GlassButton
        type="submit"
        variant="primary"
        disabled={create.isPending}
        className="w-full"
      >
        <Plus size={16} />
        Add Pot
      </GlassButton>
    </form>
  );
}
