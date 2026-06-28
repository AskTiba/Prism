'use client';

import { useState } from 'react';
import { signOutAction } from '@/lib/auth-actions';
import { GlassDialog } from '@/components/ui/GlassDialog';
import GlassButton from '@/components/ui/GlassButton';
import { LogOut } from 'lucide-react';

export function SignOutDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-grey-400 transition-all duration-150 hover:bg-white/[0.03] hover:text-white hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.12)] md:rounded-none md:px-8 md:py-3.5"
      >
        <LogOut size={20} />
        Sign Out
      </button>

      <GlassDialog open={open} onClose={() => setOpen(false)} title="Sign Out">
        <p className="text-sm text-grey-500">
          Are you sure you want to sign out? You will need to sign in again to access your data.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-white/60 backdrop-blur-md border border-white/40 px-4 py-3 text-sm font-medium text-grey-900 hover:bg-white/80 transition-all"
          >
            Cancel
          </button>
          <form action={signOutAction}>
            <GlassButton type="submit" variant="default">
              Sign Out
            </GlassButton>
          </form>
        </div>
      </GlassDialog>
    </>
  );
}
