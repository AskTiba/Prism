import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signInAction, signUpAction } from './auth-actions';
import { prisma } from '@repo/db/src/client';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

vi.mock('next-auth', () => {
  return {
    AuthError: class AuthError extends Error {
      type: string;
      constructor(msg: string) {
        super(msg);
        this.type = 'CredentialsSignin';
      }
    },
    default: vi.fn(),
  };
});

vi.mock('@/auth', () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// We need to mock next/navigation to catch redirect
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url) => {
    throw new Error(`REDIRECT_TO_${url}`);
  }),
}));

describe('auth-actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInAction', () => {
    it('returns error when AuthError is thrown', async () => {
      vi.mocked(signIn).mockRejectedValueOnce(new AuthError('Invalid credentials'));

      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'wrong');

      const result = await signInAction(undefined, formData);
      expect(result).toEqual({ error: 'Invalid credentials.' });
    });

    it('returns unexpected error when generic error is thrown', async () => {
      vi.mocked(signIn).mockRejectedValueOnce(new Error('Some other error'));

      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'wrong');

      const result = await signInAction(undefined, formData);
      expect(result).toEqual({ error: 'Something went wrong.' });
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
