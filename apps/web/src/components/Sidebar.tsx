'use client';

import { useState } from 'react';
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
  ChevronLeft,
} from 'lucide-react';

type NavItemData = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

const NAV_GROUPS: NavGroupData[] = [
  {
    heading: 'Navigation',
    items: [
      { id: 'overview', label: 'Overview', href: '/', icon: LayoutDashboard },
      { id: 'transactions', label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
      { id: 'budgets', label: 'Budgets', href: '/budgets', icon: Banknote },
      { id: 'pots', label: 'Pots', href: '/pots', icon: PiggyBank },
      { id: 'bills', label: 'Recurring Bills', href: '/bills', icon: Receipt },
    ],
  },
];

function getInitials(email: string) {
  return email.charAt(0).toUpperCase();
}

function NavLink({
  item,
  active,
  collapsed,
}: {
  item: NavItemData;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 md:rounded-lg md:px-3 ${
        collapsed ? 'md:justify-center md:px-0' : 'md:mx-1.5 md:py-2.5'
      } ${
        active
          ? 'bg-white/[0.07] text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]'
          : 'text-grey-400 hover:bg-white/[0.04] hover:text-white'
      }`}
      title={collapsed ? item.label : undefined}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-green shadow-[0_0_6px_rgba(39,124,120,0.4)]" />
      )}
      <Icon
        size={18}
        className={`shrink-0 transition-colors duration-200 ${
          active ? 'text-white' : 'text-grey-400 group-hover:text-white'
        }`}
      />
      <span
        className={`transition-opacity duration-200 ${
          collapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
        }`}
      >
        {item.label}
      </span>
    </a>
  );
}

function MobileNavLink({ item }: { item: NavItemData }) {
  const pathname = usePathname();
  const Icon = item.icon;
  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  return (
    <a
      href={item.href}
      className={`flex items-center justify-center rounded-lg py-2 px-2 transition-colors min-h-[44px] min-w-[44px] ${
        active ? 'bg-white/[0.08] text-white' : 'text-grey-400 hover:text-white'
      }`}
    >
      <Icon size={16} />
    </a>
  );
}

export function Sidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <nav
      className={`flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:flex-col md:items-stretch md:justify-start md:rounded-r-2xl md:overflow-hidden md:relative md:transition-all md:duration-300 md:ease-out ${
        collapsed ? 'md:w-[72px]' : 'md:w-64'
      }`}
    >
      {/* Decorative top glow */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-green/[0.04] to-transparent pointer-events-none" />

      {/* Brand */}
      <div
        className={`hidden md:flex md:items-center md:pb-7 md:relative ${
          collapsed ? 'md:justify-center md:px-0 md:pt-3' : 'md:gap-3 md:px-5 md:pt-3'
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green to-cyan shadow-lg shadow-green/20 shrink-0">
          <span className="text-sm font-bold text-white">P</span>
        </div>
        <span
          className={`text-base font-bold tracking-tight transition-opacity duration-200 ${
            collapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
          }`}
        >
          Prism
        </span>
      </div>

      {/* User card */}
      {session?.user && (
        <div
          className={`hidden w-full md:block md:pb-6 md:px-3 transition-all duration-200 ${
            collapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:pb-0' : 'md:opacity-100'
          }`}
        >
          <div className="rounded-xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] px-3.5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green/20 to-cyan/20 text-xs font-semibold text-green ring-1 ring-green/20 ring-offset-0">
                {getInitials(session.user.email ?? '')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white/90">
                  {session.user.name || session.user.email}
                </p>
                <p className="truncate text-xs text-grey-500">{session.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <div className="hidden w-full md:flex md:flex-col md:flex-1 md:relative">
        {NAV_GROUPS.map((group) => (
          <div key={group.heading} className="flex flex-col">
            {group.heading && (
              <span
                className={`block px-5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-grey-500/80 transition-opacity duration-200 ${
                  collapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:p-0' : 'opacity-100'
                }`}
              >
                {group.heading}
              </span>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  active={isActive(item.href)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-auto">
          {session?.user && (
            <>
              <div
                className={`mx-5 my-3 h-px bg-gradient-to-r from-green/20 via-white/10 to-transparent transition-opacity duration-200 ${
                  collapsed ? 'md:opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block px-5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-grey-500/80 transition-opacity duration-200 ${
                  collapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:p-0' : 'opacity-100'
                }`}
              >
                Account
              </span>
            </>
          )}

          <div className="flex flex-col gap-0.5">
            {session?.user ? (
              <>
                <SignOutDialog collapsed={collapsed} />
                <DeleteAccountDialog collapsed={collapsed} />
              </>
            ) : (
              <a
                href="/signin"
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 md:rounded-lg md:px-3 ${
                  collapsed ? 'md:justify-center md:px-0' : 'md:mx-1.5 md:py-2.5'
                } text-grey-400 hover:bg-white/[0.04] hover:text-white`}
                title={collapsed ? 'Sign In' : undefined}
              >
                <LogIn size={18} className="shrink-0 text-grey-400 group-hover:text-white" />
                <span
                  className={`transition-opacity duration-200 ${
                    collapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
                  }`}
                >
                  Sign In
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <span className="text-lg font-bold md:hidden">Prism</span>
      <ul className="flex items-center gap-0.5 md:hidden">
        {NAV_GROUPS[0].items.map((item) => (
          <li key={item.id}>
            <MobileNavLink item={item} />
          </li>
        ))}
        <li className="ml-0.5">
          <a
            href="/signin"
            className="flex items-center justify-center rounded-lg py-2 px-2 text-grey-400 hover:text-white min-h-[44px] min-w-[44px]"
          >
            <LogIn size={16} />
          </a>
        </li>
      </ul>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg border border-white/[0.06] text-grey-500 hover:bg-white/[0.04] hover:text-white transition-all duration-200 mt-3 mx-auto mb-0.5 shrink-0"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </nav>
  );
}
