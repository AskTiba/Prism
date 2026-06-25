import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { Providers } from '@/lib/providers';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Banknote,
  Receipt,
} from 'lucide-react';
import './globals.css';

const NAV_ICONS: Record<string, React.ReactNode> = {
  overview: <LayoutDashboard size={18} />,
  transactions: <ArrowLeftRight size={18} />,
  budgets: <Banknote size={18} />,
  pots: <PiggyBank size={18} />,
  bills: <Receipt size={18} />,
};

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Personal Finance App',
  description: 'Track your finances across budgets, pots, and bills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={publicSans.className}>
      <body className="min-h-screen bg-beige">
        <Providers>
          <div className="flex min-h-screen flex-col md:flex-row">
            <nav className="flex w-full items-center justify-between bg-grey-900 px-4 py-3 text-white md:w-64 md:flex-col md:items-start md:justify-start md:rounded-r-2xl md:p-6 md:pt-8">
              <span className="text-lg font-bold">finance</span>
              <ul className="flex flex-wrap justify-end gap-x-1 gap-y-0 md:mt-12 md:w-full md:flex-col md:gap-1">
                {[
                  { label: 'Overview', href: '/', icon: 'overview' },
                  { label: 'Transactions', href: '/transactions', icon: 'transactions' },
                  { label: 'Budgets', href: '/budgets', icon: 'budgets' },
                  { label: 'Pots', href: '/pots', icon: 'pots' },
                  { label: 'Recurring Bills', href: '/bills', icon: 'bills' },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-4 text-sm text-grey-300 transition-colors hover:bg-grey-500/20 hover:text-white"
                    >
                      {NAV_ICONS[item.icon]}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <main className="flex-1 px-4 py-6 md:px-10 md:py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
