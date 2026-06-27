import GlassInput from '@/components/ui/GlassInput';
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
          <GlassInput id="email" name="email" type="email" required className="w-full" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-grey-500">
            Password
          </label>
          <GlassInput
            id="password"
            name="password"
            type="password"
            required
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-grey-700 shadow-lg shadow-black/10"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
