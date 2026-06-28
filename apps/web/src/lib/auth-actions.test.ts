import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signInAction, signUpAction } from './auth-actions';
import { prisma } from '@repo/db/src/client';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';

vi.mock('@repo/db/src/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}));

vi.mock('@/auth', () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({ redirect: vi.fn() }));

describe('auth-actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInAction', () => {
    it('returns error when credentials are invalid', async () => {
      vi.mocked(signIn).mockResolvedValueOnce({ error: 'CredentialsSignin' } as any);

      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'wrong');

      const result = await signInAction(undefined, formData);
      expect(result).toEqual({ error: 'Invalid credentials.' });
    });

    it('redirects to home on successful sign-in', async () => {
      vi.mocked(signIn).mockResolvedValueOnce({ url: '/' } as any);

      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'correct');

      await signInAction(undefined, formData);
      const { redirect } = await import('next/navigation');
      expect(redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('signUpAction', () => {
    it('returns error when missing fields', async () => {
      const formData = new FormData();
      const result = await signUpAction(undefined, formData);
      expect(result).toEqual({ error: 'Email and password are required' });
    });

    it('returns error when password is too short', async () => {
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', '12345');
      const result = await signUpAction(undefined, formData);
      expect(result).toEqual({ error: 'Password must be at least 6 characters' });
    });

    it('returns error when user already exists', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ id: '1', email: 'test@test.com' } as any);
      
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', '123456');
      
      const result = await signUpAction(undefined, formData);
      expect(result).toEqual({ error: 'A user with this email already exists' });
    });
  });
});
