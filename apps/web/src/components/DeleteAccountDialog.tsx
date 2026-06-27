'use client';

import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';
import { signOutAction } from '@/lib/auth-actions';
import { Glass } from '@samasante/liquid-glass';
import GlassInput from '@/components/ui/GlassInput';

const deleteSchema = z.object({
  confirm: z.literal('DELETE'),
});

type DeleteFormData = { confirm: string };

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<DeleteFormData>({
    defaultValues: { confirm: '' },
    resolver: zodResolver(deleteSchema) as unknown as Resolver<DeleteFormData>,
  });

  const confirmValue = watch('confirm');
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
        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red transition-all duration-150 hover:bg-white/[0.06] hover:text-red/80 hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.15)] md:rounded-none md:px-6"
      >
        Delete Account
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md">
            <Glass
              style={{ borderRadius: 16, padding: 24 }}
              optics={{
                frost: 10,
                depth: 0.45,
                curvature: 0.2,
                strength: 0.1,
                dispersion: 0.15,
                bend: 0.3,
                specular: 0.5,
                brightness: 0.1,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-lg font-bold text-grey-900">Delete Account</h2>
                <p className="mt-3 text-sm text-grey-500">
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
                  <button
                    type="submit"
                    disabled={confirmValue !== 'DELETE'}
                    className="rounded-xl bg-red px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-red/80 shadow-lg shadow-red/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Confirm Delete
                  </button>
                </div>
              </form>
            </Glass>
          </div>
        </div>
      )}
    </>
  );
}
