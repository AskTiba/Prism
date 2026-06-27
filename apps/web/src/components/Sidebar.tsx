'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { signOutAction } from '@/lib/auth-actions';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Banknote,
  Receipt,
  LogIn,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Transactions', href: '/transactions', icon: <ArrowLeftRight size={18} /> },
  { label: 'Budgets', href: '/budgets', icon: <Banknote size={18} /> },
  { label: 'Pots', href: '/pots', icon: <PiggyBank size={18} /> },
  { label: 'Recurring Bills', href: '/bills', icon: <Receipt size={18} /> },
];

export function Sidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function linkClass(href: string) {
    const active = isActive(href);
    return `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-150 md:w-full md:rounded-none md:px-6 ${
      active
        ? 'bg-white/[0.08] text-white shadow-[inset_3px_0_0_0_#277c78]'
        : 'text-grey-300 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.15)]'
    }`;
  }

  return (
    <nav className="flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:w-64 md:flex-col md:items-start md:justify-start md:rounded-r-2xl md:pt-8 md:overflow-hidden">
      <span className="text-lg font-bold md:px-6">Prism</span>
      <ul className="flex flex-wrap justify-end gap-x-1 gap-y-0 md:mt-8 md:w-full md:flex-col md:gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="md:w-full">
            <a href={item.href} className={linkClass(item.href)}>
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
        {session?.user ? (
          <>
            <li className="md:w-full">
              <form action={signOutAction} className="md:w-full">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-grey-300 transition-all duration-150 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.15)] md:rounded-none md:px-6"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </form>
            </li>
            <li className="md:w-full">
              <DeleteAccountDialog />
            </li>
          </>
        ) : (
          <li className="md:w-full">
            <a href="/signin" className={linkClass('/signin')}>
              <LogIn size={18} />
              Sign In
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
