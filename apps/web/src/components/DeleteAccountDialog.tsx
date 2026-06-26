'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { signOutAction } from '@/lib/auth-actions';

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
        className="flex w-full items-center gap-3 rounded-lg px-3 py-4 text-sm text-red transition-colors hover:bg-grey-500/20"
      >
        Delete Account
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold text-grey-900">Delete Account</h2>
            <p className="mt-2 text-sm text-grey-500">
              This will permanently delete your account and all data. Type{' '}
              <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="mt-4 w-full rounded-lg border border-grey-300 px-3 py-2 text-sm"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setConfirmText('');
                }}
                className="rounded-lg bg-grey-300 px-4 py-2 text-sm font-medium text-grey-900 transition-colors hover:bg-grey-400"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={confirmText !== 'DELETE'}
                onClick={handleConfirm}
                className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
