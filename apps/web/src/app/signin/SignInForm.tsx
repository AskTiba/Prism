'use client';

import { useActionState, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import GlassInput from '@/components/ui/GlassInput';
import SubmitButton from '@/components/ui/SubmitButton';
import { signInAction } from '@/lib/auth-actions';

export default function SignInForm() {
  const [state, action] = useActionState(signInAction, undefined);
  const searchParams = useSearchParams();
  const [justRegistered, setJustRegistered] = useState(searchParams.get('registered') === 'true');

  useEffect(() => {
    if (justRegistered) {
      const timeout = setTimeout(() => setJustRegistered(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [justRegistered]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative flex h-48 flex-col justify-end overflow-hidden md:h-auto md:w-[60%] md:justify-center">
        <Image
          src="/auth-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-black/30" />
        <div className="relative z-10 px-6 pb-8 md:px-10 md:pb-0">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Prism
          </h1>
          <p className="mt-2 text-sm text-white/60 md:text-base">
            See your finances from every angle
          </p>
        </div>
      </div>

      <div className="flex md:w-[40%] items-center justify-center bg-white px-6 py-10 md:px-10">
        <div className="w-full max-w-sm">
          <h2 className="mb-8 text-2xl font-bold text-grey-900 md:text-3xl">Sign In</h2>
          <form action={action} className="flex flex-col gap-5">
            {justRegistered && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                Account created! Sign in below.
              </div>
            )}
            {state?.error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
                {state.error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-grey-500"
              >
                Email
              </label>
              <GlassInput
                id="email"
                name="email"
                type="email"
                variant="form"
                required
                className="w-full"
                error={state?.error ? true : undefined}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-grey-500"
              >
                Password
              </label>
              <GlassInput
                id="password"
                name="password"
                type="password"
                variant="form"
                required
                className="w-full"
                error={state?.error ? true : undefined}
              />
            </div>
            <SubmitButton>Sign In</SubmitButton>
          </form>
          <p className="mt-8 text-center text-sm text-grey-500">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="font-semibold text-grey-900 underline decoration-grey-900/30 transition-colors hover:decoration-grey-900"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
