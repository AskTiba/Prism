'use client';

import { useState } from 'react';
import { useForm, type Resolver, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';
import { signOutAction } from '@/lib/auth-actions';
import { GlassDialog } from '@/components/ui/GlassDialog';
import GlassInput from '@/components/ui/GlassInput';
import GlassButton from '@/components/ui/GlassButton';
import { Trash2 } from 'lucide-react';

const deleteSchema = z.object({
  confirm: z.literal('DELETE'),
});

type DeleteFormData = { confirm: string };

export function DeleteAccountDialog({ collapsed }: { collapsed?: boolean }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<DeleteFormData>({
    defaultValues: { confirm: '' },
    resolver: zodResolver(deleteSchema) as unknown as Resolver<DeleteFormData>,
  });

  const confirmValue = useWatch({ control, name: 'confirm' });
  const deleteAccount = trpc.data.deleteAccount.useMutation();

  async function onSubmit() {
    await deleteAccount.mutateAsync();
    await signOutAction();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={collapsed ? 'Delete Account' : undefined}
        className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 md:rounded-lg ${
          collapsed ? 'md:justify-center md:px-0' : 'md:mx-1.5 md:py-2.5 md:px-3'
        } text-red/80 hover:bg-white/[0.04] hover:text-red`}
      >
        <Trash2 size={18} className="shrink-0 text-red/60 group-hover:text-red" />
        <span
          className={`transition-opacity duration-200 ${
            collapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
          }`}
        >
          Delete Account
        </span>
      </button>
      <GlassDialog open={open} onClose={() => { setOpen(false); reset() }} title="Delete Account">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm text-grey-500">
            This will permanently delete your account and all data. Type{' '}
            <strong>DELETE</strong> to confirm.
          </p>
          <GlassInput
            type="text"
            placeholder="Type DELETE to confirm"
            className="mt-4"
            {...register('confirm')}
          />
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                reset();
              }}
              className="rounded-xl bg-white/60 backdrop-blur-md border border-white/40 px-4 py-3 text-sm font-medium text-grey-900 hover:bg-white/80 transition-all"
            >
              Cancel
            </button>
            <GlassButton
              type="submit"
              variant="danger"
              disabled={confirmValue !== 'DELETE'}
            >
              Confirm Delete
            </GlassButton>
          </div>
        </form>
      </GlassDialog>
    </>
  );
}
