import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { Providers } from '@/lib/providers';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prism',
  description: 'See your finances from every angle',
  icons: '/favicon.svg',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={publicSans.className}>
      <body className="min-h-screen bg-beige">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
