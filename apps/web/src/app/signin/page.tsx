import { signInAction } from '@/lib/auth-actions';

export default function SignInPage() {
  return (
    <div className="mx-auto mt-20 max-w-sm">
      <h1 className="mb-6 text-2xl font-bold text-grey-900">Sign In</h1>
      <form action={signInAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-grey-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-grey-300 px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-grey-500">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-grey-300 px-4 py-3 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-grey-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-grey-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
