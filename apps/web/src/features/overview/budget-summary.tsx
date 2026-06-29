'use client';

import { trpc } from '@/lib/trpc';
import { PieChart, Pie, Cell } from 'recharts';
import { formatCurrencyCompact } from '@repo/shared';
import { PieChartSkeleton } from '@/components/WidgetSkeleton';

export function BudgetSummary() {
  const { data: budgets, isLoading } = trpc.budgets.list.useQuery();
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

      {isLoading ? (
        <PieChartSkeleton />
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative flex shrink-0 items-center justify-center">
            <PieChart width={180} height={180}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                cornerRadius={4}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-base font-bold text-grey-900 leading-tight whitespace-nowrap">
                {formatCurrencyCompact(totalBudget)}
              </p>
              <p className="text-[11px] text-grey-500">of budget limit</p>
            </div>
          </div>

          <ul className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-3 flex-1">
            {data.map((entry) => (
              <li key={entry.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <div>
                  <p className="text-xs text-grey-500">{entry.name}</p>
                  <p className="text-sm font-bold text-grey-900">
                    {formatCurrencyCompact(entry.spent)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
