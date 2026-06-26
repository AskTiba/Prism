import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { budgetCreateSchema, budgetUpdateSchema } from '@repo/shared';

export const budgetsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const budgets = await ctx.prisma.budget.findMany({
      where: { userId: ctx.userId },
    });
    return Promise.all(
      budgets.map(async (budget) => {
        const spent = await ctx.prisma.transaction.aggregate({
          where: { category: budget.category },
          _sum: { amount: true },
        });
        return {
          ...budget,
          spent: Math.abs(spent._sum.amount ?? 0),
        };
      }),
    );
  }),

  create: protectedProcedure
    .input(budgetCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.create({
        data: { ...input, userId: ctx.userId },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: budgetUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.delete({
        where: { id: input.id },
      });
    }),
});
