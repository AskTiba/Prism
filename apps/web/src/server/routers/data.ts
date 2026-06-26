import { router, protectedProcedure } from '../trpc';

function escapeCsv(value: string | number | boolean): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const dataRouter = router({
  exportCsv: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.prisma.transaction.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: 'desc' },
    });

    const headers = ['Date', 'Name', 'Category', 'Amount', 'Recurring'];
    const rows = transactions.map((tx) =>
      [
        tx.date.toISOString().split('T')[0],
        tx.name,
        tx.category,
        tx.amount,
        tx.recurring,
      ]
        .map(escapeCsv)
        .join(','),
    );

    return [headers.join(','), ...rows].join('\n');
  }),
});
