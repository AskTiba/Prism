import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import {
  budgetCreateSchema,
  budgetUpdateSchema,
} from '@repo/shared'

export const budgetsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const budgets = await ctx.prisma.budget.findMany()
    return Promise.all(
      budgets.map(async (budget) => {
        const spent = await ctx.prisma.transaction.aggregate({
          where: { category: budget.category },
          _sum: { amount: true },
        })
        return {
          ...budget,
          spent: Math.abs(spent._sum.amount ?? 0),
        }
      })
    )
  }),

  create: publicProcedure
    .input(budgetCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.create({ data: input })
    }),

  update: publicProcedure
    .input(
      z.object({ id: z.string(), data: budgetUpdateSchema })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.update({
        where: { id: input.id },
        data: input.data,
      })
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget.delete({
        where: { id: input.id },
      })
    }),
})
