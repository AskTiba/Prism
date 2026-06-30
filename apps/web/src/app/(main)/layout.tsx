import { auth } from '@/auth';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex flex-col min-w-0 max-w-full md:flex-row md:h-screen md:overflow-hidden">
      <Sidebar session={session} />
      <main className="flex-1 min-w-0 max-w-full overflow-y-auto overflow-x-hidden px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-8">{children}</main>
      <BottomNav />
    </div>
  );
}
