import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignOutDialog } from './SignOutDialog';
import '@testing-library/jest-dom/vitest';

const mockSignOutAction = vi.hoisted(() => vi.fn());

vi.mock('@/lib/auth-actions', () => ({
  signOutAction: mockSignOutAction,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SignOutDialog', () => {
  it('renders the sign out button', () => {
    render(<SignOutDialog />);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('shows confirmation dialog when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SignOutDialog />);
    await user.click(screen.getByRole('button', { name: /sign out/i }));
    expect(screen.getByText((c) => c.includes('Are you sure'))).toBeInTheDocument();
  });

  it('calls signOutAction when confirm is clicked', async () => {
    const user = userEvent.setup();
    render(<SignOutDialog />);
    await user.click(screen.getByRole('button', { name: /sign out/i }));
    const confirmBtn = screen.getAllByRole('button', { name: /sign out/i })[1];
    await user.click(confirmBtn);
    expect(mockSignOutAction).toHaveBeenCalled();
  });

  it('closes dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<SignOutDialog />);
    await user.click(screen.getByRole('button', { name: /sign out/i }));
    expect(screen.getByText((c) => c.includes('Are you sure'))).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText((c) => c.includes('Are you sure'))).not.toBeInTheDocument();
  });
});
