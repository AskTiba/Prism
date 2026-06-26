import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import '@testing-library/jest-dom/vitest';

const mockDeleteAccount = vi.hoisted(() => vi.fn());

vi.mock('@/lib/trpc', () => ({
  trpc: {
    data: {
      deleteAccount: {
        useMutation: () => ({ mutateAsync: mockDeleteAccount, isError: false, error: null }),
      },
    },
  },
}));

vi.mock('@/lib/auth-actions', () => ({
  signOutAction: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockDeleteAccount.mockResolvedValue({ success: true });
});

describe('DeleteAccountDialog', () => {
  it('renders the delete account button', () => {
    render(<DeleteAccountDialog />);
    expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
  });

  it('shows confirmation dialog when button is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountDialog />);
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    expect(screen.getByText((c) => c.includes('delete your account'))).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();
  });

  it('enables confirm button only when DELETE is typed', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountDialog />);
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    const confirmBtn = screen.getByRole('button', { name: /confirm delete/i });
    expect(confirmBtn).toBeDisabled();
    await user.type(screen.getByRole('textbox'), 'DELETE');
    expect(confirmBtn).not.toBeDisabled();
  });

  it('calls deleteAccount mutation and signs out on confirm', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountDialog />);
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.type(screen.getByRole('textbox'), 'DELETE');
    await user.click(screen.getByRole('button', { name: /confirm delete/i }));
    expect(mockDeleteAccount).toHaveBeenCalled();
  });

  it('closes dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountDialog />);
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    expect(screen.getByText((c) => c.includes('delete your account'))).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText((c) => c.includes('delete your account'))).not.toBeInTheDocument();
  });
});
