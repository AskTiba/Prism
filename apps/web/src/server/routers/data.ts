import { router, protectedProcedure } from '../trpc';
import { detectSubscriptions } from '@/lib/subscription-radar';

function escapeCsv(value: string | number | boolean): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const dataRouter = router({
  netWorth: protectedProcedure.query(async ({ ctx }) => {
    const [incomeResult, expenseResult, potsResult] = await Promise.all([
      ctx.prisma.transaction.aggregate({
        where: { userId: ctx.userId, amount: { gt: 0 } },
        _sum: { amount: true },
      }),
      ctx.prisma.transaction.aggregate({
        where: { userId: ctx.userId, amount: { lt: 0 } },
        _sum: { amount: true },
      }),
      ctx.prisma.pot.aggregate({
        where: { userId: ctx.userId },
        _sum: { total: true },
      }),
    ]);

    const totalIncome = incomeResult._sum.amount ?? 0;
    const totalExpenses = Math.abs(expenseResult._sum.amount ?? 0);
    const totalPots = potsResult._sum.total ?? 0;
    const netWorth = totalIncome - totalExpenses + totalPots;

    return { totalIncome, totalExpenses, totalPots, netWorth };
  }),
  detectedSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.prisma.transaction.findMany({
      where: { userId: ctx.userId },
      select: { name: true, amount: true, date: true },
    });
    return detectSubscriptions(
      transactions.map((tx) => ({
        name: tx.name,
        amount: tx.amount,
        date: tx.date.toISOString().split('T')[0],
      })),
    );
  }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.transaction.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.budget.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.pot.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.session.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.account.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.authenticator.deleteMany({ where: { userId: ctx.userId } });
    await ctx.prisma.user.delete({ where: { id: ctx.userId } });
    return { success: true };
  }),
  exportCsv: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.prisma.transaction.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: 'desc' },
    });

    const headers = ['Date', 'Name', 'Category', 'Amount', 'Recurring', 'Tags', 'Subtype'];
    const rows = transactions.map((tx) =>
      [
        tx.date.toISOString().split('T')[0],
        tx.name,
        tx.category,
        tx.amount,
        tx.recurring,
        tx.tags.join(';'),
        tx.subtype ?? '',
      ]
        .map(escapeCsv)
        .join(','),
    );

    return [headers.join(','), ...rows].join('\n');
  }),
});
