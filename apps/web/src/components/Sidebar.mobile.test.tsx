import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

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

import { Sidebar } from './Sidebar';

describe('Sidebar - Mobile Layout', () => {
  it('sidebar nav element is hidden on mobile (has hidden md:flex)', () => {
    render(<Sidebar session={null} />);
    const nav = screen.getByRole('navigation');
    // On mobile, sidebar should be hidden - check for hidden class
    expect(nav.className).toMatch(/hidden/);
    expect(nav.className).toMatch(/md:flex/);
  });

  it('does NOT render Prism brand text in mobile header', () => {
    render(<Sidebar session={null} />);
    // The mobile header with "Prism" text should NOT exist
    const prismText = screen.queryByText('Prism');
    // If prism text exists, it should only be visible on desktop, not mobile
    // But per design, Prism text shouldn't be in sidebar at all on mobile
    expect(prismText).not.toBeInTheDocument();
  });

  it('nav links are hidden on mobile (desktop only)', () => {
    render(<Sidebar session={null} />);
    const overviewLink = screen.getByText('Overview');
    // The link container should have desktop-only classes
    const linkParent = overviewLink.closest('a');
    expect(linkParent?.className).toMatch(/md:/);
  });
});
