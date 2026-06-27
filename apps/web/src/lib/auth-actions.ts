'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@repo/db/src/client';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export type ActionState = {
  error?: string;
};

export async function signInAction(
  prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    await signIn('credentials', formData, { redirectTo: '/' });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    
    // next/navigation redirect throws an error, so we need to rethrow it
    // otherwise it gets caught and the redirect fails
    if ((error as Error).message.includes('NEXT_REDIRECT') || (error as Error).message.includes('REDIRECT')) {
      throw error;
    }

    return { error: 'Something went wrong.' };
  }
}

export async function signUpAction(
  prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: 'A user with this email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, hashedPassword, name: email.split('@')[0] },
    });
  } catch {
    return { error: 'An unexpected error occurred' };
  }

  redirect('/signin');
}

export async function signOutAction() {
  await signOut();
}
