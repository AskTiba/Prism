'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { SignOutDialog } from './SignOutDialog';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Banknote,
  PiggyBank,
  Receipt,
  LogIn,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Budgets', href: '/budgets', icon: Banknote },
  { label: 'Pots', href: '/pots', icon: PiggyBank },
  { label: 'Recurring Bills', href: '/bills', icon: Receipt },
] as const;

function getInitials(email: string) {
  return email.charAt(0).toUpperCase();
}

export function Sidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function linkClass(href: string) {
    const active = isActive(href);
    return [
      'flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-200',
      'md:w-full md:rounded-none md:px-8 md:py-3.5',
      active
        ? 'bg-gradient-to-r from-green/[0.1] to-transparent text-white font-medium shadow-[inset_3px_0_0_0_#277c78]'
        : 'text-grey-400 hover:bg-white/[0.03] hover:text-white hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.12)]',
    ].join(' ');
  }

  return (
    <nav className="flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:w-64 md:flex-col md:items-start md:justify-start md:rounded-r-2xl md:pt-8 md:overflow-hidden md:shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.03)] md:border-r md:border-white/[0.03]">
      <div className="hidden md:flex md:items-center md:gap-2.5 md:px-8 md:pb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green to-cyan shadow-sm">
          <span className="text-xs font-bold text-white">P</span>
        </div>
        <span className="text-lg font-bold tracking-tight">Prism</span>
      </div>

      {session?.user && (
        <div className="hidden w-full md:block md:px-6 md:pb-5">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green/20 to-cyan/20 text-xs font-semibold text-green">
                {getInitials(session.user.email ?? '')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {session.user.name || session.user.email}
                </p>
                <p className="truncate text-xs text-grey-500">{session.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ul className="flex flex-wrap justify-end gap-x-1 gap-y-0 md:mt-0 md:w-full md:flex-col md:gap-0">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="md:w-full">
              <a href={item.href} className={linkClass(item.href)}>
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
        {session?.user ? (
          [
            <li key="divider" className="hidden w-full md:block">
              <div className="mx-8 my-3 h-px bg-gradient-to-r from-green/20 via-white/10 to-transparent" />
            </li>,
            <li key="account-header" className="hidden w-full md:block">
              <span className="block px-8 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-widest text-grey-500">
                Account
              </span>
            </li>,
            <li key="sign-out" className="md:w-full">
              <SignOutDialog />
            </li>,
            <li key="delete-account" className="md:w-full">
              <DeleteAccountDialog />
            </li>,
          ]
        ) : (
          <li className="md:w-full">
            <a href="/signin" className={linkClass('/signin')}>
              <LogIn size={20} />
              Sign In
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
