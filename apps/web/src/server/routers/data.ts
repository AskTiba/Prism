import { router, protectedProcedure } from '../trpc';

function escapeCsv(value: string | number | boolean): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const dataRouter = router({
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
