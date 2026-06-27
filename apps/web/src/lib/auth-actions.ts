'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@repo/db/src/client';
import { signIn, signOut } from '@/auth';

export async function signInAction(formData: FormData) {
  await signIn('credentials', formData, { redirectTo: '/' });
}

export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('A user with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, hashedPassword, name: email.split('@')[0] },
  });

  redirect('/signin');
}

export async function signOutAction() {
  await signOut();
}
