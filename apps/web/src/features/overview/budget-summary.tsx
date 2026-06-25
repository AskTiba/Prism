'use client';

import { trpc } from '@/lib/trpc';
import { PieChart, Pie, Cell } from 'recharts';

export function BudgetSummary() {
  const { data: budgets } = trpc.budgets.list.useQuery();
  const items = budgets ?? [];
  const totalBudget = items.reduce((s, b) => s + b.maximum, 0);

  const data = items.map((b) => ({
    name: b.category,
    value: b.maximum,
    color: b.theme,
    spent: b.spent,
  }));

  return (
    <div className="rounded-xl bg-white px-5 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Budgets</h2>
        <a href="/budgets" className="py-3 text-sm text-grey-500 hover:text-grey-900">
          See Details
        </a>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative flex items-center justify-center">
          <PieChart width={140} height={140}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={64}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute flex flex-col items-center">
            <p className="text-2xl font-bold text-grey-900">${totalBudget}</p>
            <p className="text-xs text-grey-500">of $ limit</p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
          {data.map((entry) => (
            <li key={entry.name} className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <p className="text-xs text-grey-500">{entry.name}</p>
                <p className="text-sm font-bold text-grey-900">
                  ${entry.spent.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
