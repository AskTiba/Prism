import { initTRPC, TRPCError } from '@trpc/server';
import { prisma } from '@repo/db/src/client';
import { auth } from '@/auth';

export async function createContext() {
  const session = await auth();
  return { prisma, session };
}

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, userId: ctx.session.user.id } });
});
