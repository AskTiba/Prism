'use server';

import { signIn, signOut } from '@/auth';

export async function signInAction(formData: FormData) {
  await signIn('credentials', formData, { redirectTo: '/' });
}

export async function signOutAction() {
  await signOut();
}
