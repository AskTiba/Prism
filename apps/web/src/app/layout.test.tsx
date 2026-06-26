import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/auth-actions', () => ({
  signOutAction: 'mocked-action' as any,
}));

vi.mock('@/lib/trpc', () => ({
  trpc: {
    data: {
      deleteAccount: {
        useMutation: () => ({ mutateAsync: vi.fn(), isError: false, error: null }),
      },
    },
  },
}));

import { Sidebar } from '@/components/Sidebar';

describe('Sidebar', () => {
  it('renders all five nav links', () => {
    render(<Sidebar session={null} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Budgets')).toBeInTheDocument();
    expect(screen.getByText('Pots')).toBeInTheDocument();
    expect(screen.getByText('Recurring Bills')).toBeInTheDocument();
  });

  it('shows Sign In link when unauthenticated', () => {
    render(<Sidebar session={null} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('shows Sign Out button when authenticated', () => {
    render(
      <Sidebar
        session={{
          user: { id: '1', name: 'Test User' },
          expires: '2099-01-01T00:00:00Z',
        }}
      />,
    );
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('has nav links with adequate vertical padding for touch targets', () => {
    render(<Sidebar session={null} />);
    const links = screen.getAllByRole('link').filter((l) => l.closest('nav'));
    for (const link of links) {
      expect(link.className).toMatch(/py-[3-9]/);
    }
  });

  it('renders SVG icons in the navigation', () => {
    render(<Sidebar session={null} />);
    const nav = screen.getByRole('navigation');
    const svgs = nav.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(5);
  });
});
