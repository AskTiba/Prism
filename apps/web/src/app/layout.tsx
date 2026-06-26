import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { auth } from '@/auth';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Personal Finance App',
  description: 'Track your finances across budgets, pots, and bills',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className={publicSans.className}>
      <body className="min-h-screen bg-beige">
        <Providers>
          <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar session={session} />
            <main className="flex-1 px-4 py-6 md:px-10 md:py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
