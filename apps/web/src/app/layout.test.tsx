import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';
import '@testing-library/jest-dom/vitest';

vi.mock('next/font/google', () => ({
  Public_Sans: () => ({ className: 'public-sans' }),
}));

vi.mock('@/lib/providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RootLayout', () => {
  it('renders all five nav links', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Budgets')).toBeInTheDocument();
    expect(screen.getByText('Pots')).toBeInTheDocument();
    expect(screen.getByText('Recurring Bills')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <RootLayout>
        <div>test content</div>
      </RootLayout>,
    );
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  it('has nav links with adequate vertical padding for touch targets', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>,
    );
    const links = screen.getAllByRole('link').filter((l) => l.closest('nav'));
    for (const link of links) {
      expect(link.className).toMatch(/py-[3-9]/);
    }
  });

  it('renders SVG icons in the navigation', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>,
    );
    const nav = screen.getByRole('navigation');
    const svgs = nav.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(5);
  });
});
