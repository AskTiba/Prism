import { initTRPC, TRPCError } from '@trpc/server';

export interface Context {
  prisma: typeof import('@repo/db/src/client').prisma;
  session: import('next-auth').Session | null;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, userId: ctx.session.user.id } });
});
