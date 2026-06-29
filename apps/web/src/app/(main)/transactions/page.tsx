'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { trpc } from '@/lib/trpc';
import {
  CATEGORIES,
  SUBTYPES,
  SORT_OPTIONS,
  PAGE_SIZE,
  type Category,
  type Subtype,
  type SortOption,
} from '@repo/shared';
import { GlassDialog } from '@/components/ui/GlassDialog';
import GlassInput from '@/components/ui/GlassInput';
import GlassSelect from '@/components/ui/GlassSelect';
import GlassButton from '@/components/ui/GlassButton';
import { formatCurrency, formatCurrencyCompact } from '@repo/shared';
import { TransactionForm } from './TransactionForm';

export default function TransactionsPage() {
  const [newOpen, setNewOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [subtype, setSubtype] = useState('');
  const [tags, setTags] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const utils = trpc.useUtils();

  const { data } = trpc.transactions.list.useQuery({
    search: search || undefined,
    category: (category || undefined) as Category | undefined,
    subtype: (subtype || undefined) as Subtype | undefined,
    tags: tags || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    sort: sort as SortOption,
    page,
    pageSize: PAGE_SIZE,
  });

  const transactions = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <GlassButton type="button" variant="primary" onClick={() => setNewOpen(true)}>
          <Plus size={16} />
          New Transaction
        </GlassButton>
      </div>

      <div className="flex flex-wrap gap-3">
        <GlassInput
          type="search"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          aria-label="Search transactions"
        />

        <GlassSelect
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          placeholder="All Categories"
          aria-label="Category filter"
        />

        <GlassSelect
          value={subtype}
          onChange={(v) => {
            setSubtype(v);
            setPage(1);
          }}
          options={SUBTYPES.map((s) => ({ value: s, label: s }))}
          placeholder="All Subtypes"
          aria-label="Subtype filter"
        />

        <GlassInput
          type="search"
          placeholder="Search tags"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            setPage(1);
          }}
          aria-label="Search tags"
        />

        <GlassInput
          type="date"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
            setPage(1);
          }}
          aria-label="From date"
        />

        <GlassInput
          type="date"
          value={dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
            setPage(1);
          }}
          aria-label="To date"
        />

        <GlassSelect
          value={sort}
          onChange={(v) => {
            setSort(v);
            setPage(1);
          }}
          options={SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          placeholder="Sort by"
          aria-label="Sort by"
        />

        <a href="/api/export/transactions">
          <GlassButton type="button">Export CSV</GlassButton>
        </a>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-grey-100 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-grey-100 text-grey-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Tags</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-grey-100 last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {tx.avatar ? (
                      <Image
                        src={tx.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-100 text-xs font-bold text-grey-500">
                        {tx.name.charAt(0)}
                      </span>
                    )}
                    <span className="font-medium">{tx.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-grey-500">
                  {tx.category}
                  {tx.subtype && (
                    <span className="ml-2 rounded bg-beige px-2 py-0.5 text-xs text-grey-500">
                      {tx.subtype}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {tx.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-grey-100 px-2 py-0.5 text-xs text-grey-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 text-grey-500">
                  {new Date(tx.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`font-bold ${tx.amount < 0 ? 'text-grey-900' : 'text-green'}`}
                    >
                      {formatCurrencyCompact(tx.amount)}
                    </span>
                    {tx.recurring && (
                      <span className="rounded-full bg-grey-100 px-2 py-0.5 text-xs text-grey-500">
                        Monthly
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-grey-900">No transactions found</h3>
            <p className="mt-1 text-sm text-grey-500">
              Add a transaction or adjust your filters to see results.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-grey-500">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <GlassButton
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </GlassButton>
          <GlassButton
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </GlassButton>
        </div>
      </div>

      <GlassDialog
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New Transaction"
      >
        <TransactionForm
          onSuccess={() => {
            setNewOpen(false);
            utils.transactions.list.invalidate();
          }}
        />
      </GlassDialog>
    </div>
  );
}
