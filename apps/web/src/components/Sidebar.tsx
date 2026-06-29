'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { SignOutDialog } from './SignOutDialog';
import {
  Home,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  Receipt,
  LogIn,
  PanelLeftClose,
  PanelLeftOpen,
  Gem,
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
      { id: 'overview', label: 'Overview', href: '/', icon: Home },
      { id: 'transactions', label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
      { id: 'budgets', label: 'Budgets', href: '/budgets', icon: Wallet },
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
      className={`group relative flex items-center rounded-xl transition-all duration-200 ${
        collapsed
          ? 'md:justify-center md:h-10 md:w-10 md:mx-auto'
          : 'md:mx-1.5 md:gap-3 md:px-3 md:py-2.5'
      } ${
        active
          ? 'bg-white/10 text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
          : 'text-grey-400 hover:bg-white/[0.08] hover:text-white'
      }`}
      title={collapsed ? item.label : undefined}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-green shadow-[0_0_8px_rgba(39,124,120,0.5)]" />
      )}
      <Icon
        size={20}
        strokeWidth={active ? 2.2 : 1.8}
        className={`shrink-0 transition-colors duration-200 ${
          active ? 'text-green' : 'text-grey-400 group-hover:text-white'
        }`}
      />
      {!collapsed && (
        <span className="md:block">{item.label}</span>
      )}
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
      className={`hidden md:flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:sticky md:top-0 md:h-screen md:flex-col md:items-stretch md:justify-start md:rounded-r-2xl md:overflow-hidden md:relative md:transition-all md:duration-300 md:ease-out ${
        collapsed ? 'md:w-[72px]' : 'md:w-64'
      }`}
    >
      {/* Decorative top glow */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-green/[0.04] to-transparent pointer-events-none" />

      {/* Brand — Gem logo + trigger with justify-between */}
      <div
        className={`hidden md:flex md:items-center md:relative ${
          collapsed ? 'md:justify-center md:pt-3 md:pb-7' : 'md:justify-between md:px-5 md:pt-3 md:pb-7'
        }`}
      >
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="group relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
            title="Expand sidebar"
          >
            {/* Logo — visible by default, fades on hover */}
            <Gem
              size={20}
              strokeWidth={1.8}
              className="absolute text-green opacity-100 group-hover:opacity-0 transition-opacity duration-200"
            />
            {/* Expand icon — hidden by default, appears on hover */}
            <PanelLeftOpen
              size={20}
              strokeWidth={1.8}
              className="absolute text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </button>
        ) : (
          <>
            <Gem size={20} strokeWidth={1.8} className="text-green shrink-0" />
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center h-9 w-9 rounded-lg text-grey-500 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              title="Minimize Menu"
            >
              <PanelLeftClose size={20} strokeWidth={1.8} />
            </button>
          </>
        )}
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
                className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                  collapsed
                    ? 'md:justify-center md:h-10 md:w-10 md:mx-auto'
                    : 'md:mx-1.5 md:gap-3 md:px-3 md:py-2.5'
                } text-grey-400 hover:bg-white/[0.08] hover:text-white`}
                title={collapsed ? 'Sign In' : undefined}
              >
                <LogIn size={20} strokeWidth={1.8} className="shrink-0 text-grey-400 group-hover:text-white" />
                {!collapsed && <span className="md:block">Sign In</span>}
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
