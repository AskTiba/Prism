type TransactionInput = {
  name: string;
  amount: number;
  date: string;
  recurring: boolean;
};

export type ProjectedEntry = {
  date: string;
  amount: number;
  name: string;
  balance: number;
};

function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

export function projectCashFlow(transactions: TransactionInput[]): ProjectedEntry[] {
  const recurring = transactions.filter((t) => t.recurring);

  const groups = new Map<string, TransactionInput[]>();
  for (const tx of recurring) {
    const existing = groups.get(tx.name) ?? [];
    existing.push(tx);
    groups.set(tx.name, existing);
  }

  const projected: { date: Date; amount: number; name: string }[] = [];

  for (const [, txs] of groups) {
    if (txs.length < 2) continue;

    const sorted = [...txs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const amounts = new Set(sorted.map((t) => Math.abs(t.amount)));
    if (amounts.size > 1) continue;

    const intervals: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      intervals.push(
        daysBetween(new Date(sorted[i].date), new Date(sorted[i - 1].date)),
      );
    }

    const avgInterval =
      intervals.reduce((s, d) => s + d, 0) / intervals.length;

    if (avgInterval < 20 || avgInterval > 40) continue;

    const lastDate = new Date(sorted[sorted.length - 1].date);
    const amount = sorted[0].amount;

    for (let i = 1; i <= 3; i++) {
      const nextDate = addMonths(lastDate, i);
      if (daysBetween(nextDate, new Date()) > 90) break;
      projected.push({ date: nextDate, amount, name: txs[0].name });
    }
  }

  projected.sort((a, b) => a.date.getTime() - b.date.getTime());

  let balance = 0;
  return projected.map((entry) => {
    balance += entry.amount;
    return {
      date: entry.date.toISOString().split('T')[0],
      amount: entry.amount,
      name: entry.name,
      balance,
    };
  });
}
