type TransactionInput = {
  name: string;
  amount: number;
  date: string;
};

type DetectedSubscription = {
  name: string;
  amount: number;
  interval: 'monthly';
  lastDate: string;
  nextDate: string;
};

function daysBetween(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function detectSubscriptions(
  transactions: TransactionInput[],
): DetectedSubscription[] {
  const groups = new Map<string, TransactionInput[]>();

  for (const tx of transactions) {
    if (tx.amount >= 0) continue;
    const existing = groups.get(tx.name) ?? [];
    existing.push(tx);
    groups.set(tx.name, existing);
  }

  const result: DetectedSubscription[] = [];

  for (const [name, txs] of groups) {
    if (txs.length < 3) continue;

    const sorted = txs.sort(
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

    if (avgInterval >= 25 && avgInterval <= 35) {
      const lastDate = new Date(sorted[sorted.length - 1].date);
      const nextDate = addMonths(lastDate, 1);
      result.push({
        name,
        amount: Math.abs(sorted[0].amount),
        interval: 'monthly',
        lastDate: lastDate.toISOString().split('T')[0],
        nextDate: nextDate.toISOString().split('T')[0],
      });
    }
  }

  return result;
}
