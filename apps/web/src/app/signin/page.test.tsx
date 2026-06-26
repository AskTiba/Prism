import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/auth-actions', () => ({
  signInAction: 'mocked-action' as any,
}));

import SignInPage from './page';

describe('SignInPage', () => {
  it('renders email and password inputs', () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<SignInPage />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
