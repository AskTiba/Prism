'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc'
import { CATEGORIES, SORT_OPTIONS, PAGE_SIZE } from '@repo/shared'

function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? '' : '+'
  return `${prefix}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)

  const { data } = trpc.transactions.list.useQuery({
    search: search || undefined,
    category: (category || undefined) as any,
    sort: sort as any,
    page,
    pageSize: PAGE_SIZE,
  })

  const transactions = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="rounded-lg border border-grey-300 bg-white px-4 py-2 text-sm"
          aria-label="Search transactions"
        />

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1) }}
          className="rounded-lg border border-grey-300 bg-white px-4 py-2 text-sm"
          aria-label="Category filter"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1) }}
          className="rounded-lg border border-grey-300 bg-white px-4 py-2 text-sm"
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-grey-100 text-grey-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-grey-100 last:border-0">
                <td className="px-5 py-3 font-medium">{tx.name}</td>
                <td className="px-5 py-3 text-grey-500">{tx.category}</td>
                <td className="px-5 py-3 text-grey-500">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className={`px-5 py-3 text-right font-bold ${tx.amount < 0 ? '' : 'text-green'}`}>
                  {formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-grey-500">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-grey-300 px-4 py-2 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg border border-grey-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
