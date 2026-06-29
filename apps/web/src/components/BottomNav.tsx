'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Banknote,
  PiggyBank,
  Receipt,
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '/', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { id: 'budgets', label: 'Budgets', href: '/budgets', icon: Banknote },
  { id: 'pots', label: 'Pots', href: '/pots', icon: PiggyBank },
  { id: 'bills', label: 'Recurring Bills', href: '/bills', icon: Receipt },
];

export function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-grey-900 md:hidden" role="navigation" aria-label="Main navigation">
      <ul className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.id}>
              <a
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 min-h-[48px] min-w-[48px] transition-colors ${
                  active
                    ? 'bg-green/20 text-green'
                    : 'text-grey-400 hover:text-white'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium hidden tablet:block">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
