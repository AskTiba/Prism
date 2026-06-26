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
  return (
    <nav className="flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:w-64 md:flex-col md:items-start md:justify-start md:rounded-r-2xl md:p-6 md:pt-8">
      <span className="text-lg font-bold">finance</span>
      <ul className="flex flex-wrap justify-end gap-x-1 gap-y-0 md:mt-12 md:w-full md:flex-col md:gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-sm text-grey-300 transition-colors hover:bg-grey-500/20 hover:text-white"
            >
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
        {session?.user ? (
          <>
            <li>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-4 text-sm text-grey-300 transition-colors hover:bg-grey-500/20 hover:text-white"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </form>
            </li>
            <li>
              <DeleteAccountDialog />
            </li>
          </>
        ) : (
          <li>
            <a
              href="/signin"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-sm text-grey-300 transition-colors hover:bg-grey-500/20 hover:text-white"
            >
              <LogIn size={18} />
              Sign In
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
