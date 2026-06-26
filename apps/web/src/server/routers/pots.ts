import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { potCreateSchema, potUpdateSchema, potAddWithdrawSchema } from '@repo/shared';

export const potsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const pots = await ctx.prisma.pot.findMany({
      where: { userId: ctx.userId },
    });
    return pots;
  }),

  create: protectedProcedure.input(potCreateSchema).mutation(async ({ ctx, input }) => {
    return ctx.prisma.pot.create({
      data: { ...input, userId: ctx.userId },
    });
  }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: potUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pot.delete({ where: { id: input.id } });
    }),

  addMoney: protectedProcedure
    .input(z.object({ id: z.string(), amount: potAddWithdrawSchema.shape.amount }))
    .mutation(async ({ ctx, input }) => {
      const pot = await ctx.prisma.pot.findUniqueOrThrow({ where: { id: input.id } });
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: { total: pot.total + input.amount },
      });
    }),

  withdraw: protectedProcedure
    .input(z.object({ id: z.string(), amount: potAddWithdrawSchema.shape.amount }))
    .mutation(async ({ ctx, input }) => {
      const pot = await ctx.prisma.pot.findUniqueOrThrow({ where: { id: input.id } });
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: { total: pot.total - input.amount },
      });
    }),
});
