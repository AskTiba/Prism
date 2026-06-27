import Image from 'next/image';
import GlassInput from '@/components/ui/GlassInput';
import { signUpAction } from '@/lib/auth-actions';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative flex h-48 flex-col justify-end overflow-hidden md:h-auto md:w-[45%] md:justify-center">
        <Image
          src="/auth-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45vw"
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

      <div className="flex flex-1 items-center justify-center bg-white px-6 py-10 md:px-10">
        <div className="w-full max-w-sm">
          <h2 className="mb-8 text-2xl font-bold text-grey-900 md:text-3xl">Sign Up</h2>
          <form action={signUpAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-grey-500">
                Email
              </label>
              <GlassInput id="email" name="email" type="email" required className="w-full" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-grey-500">
                Password
              </label>
              <GlassInput
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-grey-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:bg-grey-700 active:scale-[0.98]"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-grey-500">
            Already have an account?{' '}
            <a
              href="/signin"
              className="font-semibold text-grey-900 underline decoration-grey-900/30 transition-colors hover:decoration-grey-900"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
