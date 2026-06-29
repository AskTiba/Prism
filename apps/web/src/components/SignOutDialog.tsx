'use client';

import { useState } from 'react';
import { signOutAction } from '@/lib/auth-actions';
import { GlassDialog } from '@/components/ui/GlassDialog';
import GlassButton from '@/components/ui/GlassButton';
import { LogOut } from 'lucide-react';

export function SignOutDialog({ collapsed }: { collapsed?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={collapsed ? 'Sign Out' : undefined}
        className={`group relative flex items-center rounded-xl transition-all duration-200 ${
          collapsed
            ? 'md:justify-center md:h-10 md:w-10 md:mx-auto'
            : 'md:mx-1.5 md:gap-3 md:px-3 md:py-2.5'
        } text-grey-400 hover:bg-white/[0.08] hover:text-white`}
      >
        <LogOut size={20} strokeWidth={1.8} className="shrink-0 text-grey-400 group-hover:text-white" />
        {!collapsed && <span className="md:block">Sign Out</span>}
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
