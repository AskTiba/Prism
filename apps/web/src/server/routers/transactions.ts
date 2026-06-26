import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { transactionFiltersSchema } from '@repo/shared';

export const transactionsRouter = router({
  list: protectedProcedure
    .input(transactionFiltersSchema)
    .query(async ({ ctx, input }) => {
      const where: Record<string, unknown> = { userId: ctx.userId };
      if (input.category) where.category = input.category;
      if (input.search) {
        where.name = { contains: input.search };
      }

      const orderBy: Record<string, string> = {};
      switch (input.sort) {
        case 'latest':
          orderBy.date = 'desc';
          break;
        case 'oldest':
          orderBy.date = 'asc';
          break;
        case 'a-z':
          orderBy.name = 'asc';
          break;
        case 'z-a':
          orderBy.name = 'desc';
          break;
        case 'highest':
          orderBy.amount = 'desc';
          break;
        case 'lowest':
          orderBy.amount = 'asc';
          break;
        default:
          orderBy.date = 'desc';
      }

      const page = input.page ?? 1;
      const pageSize = input.pageSize ?? 10;
      const skip = (page - 1) * pageSize;

      const [items, total] = await Promise.all([
        ctx.prisma.transaction.findMany({
          where,
          orderBy,
          skip,
          take: pageSize,
        }),
        ctx.prisma.transaction.count({ where }),
      ]);

      return {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    }),
});
