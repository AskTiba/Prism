import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { potCreateSchema, potUpdateSchema, potAddWithdrawSchema } from '@repo/shared'

export const potsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const pots = await ctx.prisma.pot.findMany()
    return pots
  }),

  create: publicProcedure
    .input(potCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pot.create({ data: input })
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: potUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: input.data,
      })
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pot.delete({ where: { id: input.id } })
    }),

  addMoney: publicProcedure
    .input(z.object({ id: z.string(), amount: potAddWithdrawSchema.shape.amount }))
    .mutation(async ({ ctx, input }) => {
      const pot = await ctx.prisma.pot.findUniqueOrThrow({ where: { id: input.id } })
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: { total: pot.total + input.amount },
      })
    }),

  withdraw: publicProcedure
    .input(z.object({ id: z.string(), amount: potAddWithdrawSchema.shape.amount }))
    .mutation(async ({ ctx, input }) => {
      const pot = await ctx.prisma.pot.findUniqueOrThrow({ where: { id: input.id } })
      return ctx.prisma.pot.update({
        where: { id: input.id },
        data: { total: pot.total - input.amount },
      })
    }),
})
