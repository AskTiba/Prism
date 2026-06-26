import { auth } from '@/auth';
import { appRouter } from '@/server';
import { prisma } from '@repo/db/src/client';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const caller = appRouter.createCaller({ session, prisma });
  const csv = await caller.data.exportCsv();

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="transactions.csv"',
    },
  });
}
