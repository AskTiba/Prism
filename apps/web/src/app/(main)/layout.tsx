import { auth } from '@/auth';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar session={session} />
      <main className="flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-8">{children}</main>
      <BottomNav />
    </div>
  );
}
