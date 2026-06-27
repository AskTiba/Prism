'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { signOutAction } from '@/lib/auth-actions';
import { Glass } from '@samasante/liquid-glass';
import GlassInput from '@/components/ui/GlassInput';

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const deleteAccount = trpc.data.deleteAccount.useMutation();

  async function handleConfirm() {
    if (confirmText !== 'DELETE') return;
    await deleteAccount.mutateAsync();
    await signOutAction();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-4 text-sm text-red transition-all duration-200 hover:bg-grey-500/20 glass-surface"
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
              <h2 className="text-lg font-bold text-grey-900">Delete Account</h2>
              <p className="mt-3 text-sm text-grey-500">
                This will permanently delete your account and all data. Type{' '}
                <strong>DELETE</strong> to confirm.
              </p>
              <GlassInput
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="mt-4"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setConfirmText('');
                  }}
                  className="rounded-xl bg-white/60 backdrop-blur-md border border-white/40 px-4 py-2 text-sm font-medium text-grey-900 hover:bg-white/80 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={confirmText !== 'DELETE'}
                  onClick={handleConfirm}
                  className="rounded-xl bg-red px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red/80 shadow-lg shadow-red/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirm Delete
                </button>
              </div>
            </Glass>
          </div>
        </div>
      )}
    </>
  );
}
