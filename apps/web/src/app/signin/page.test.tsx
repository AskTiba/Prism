import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/auth-actions', () => ({
  signInAction: 'mocked-action' as any,
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

import SignInPage from './page';
import { useSearchParams } from 'next/navigation';

beforeEach(() => {
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams());
});

describe('SignInPage', () => {
  it('renders email and password inputs', () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<SignInPage />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
