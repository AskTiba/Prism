import { SummaryCards } from '@/features/overview/summary-cards'
import { RecentTransactions } from '@/features/overview/recent-transactions'
import { BudgetSummary } from '@/features/overview/budget-summary'
import { PotsSummary } from '@/features/overview/pots-summary'
import { BillsSummary } from '@/features/overview/bills-summary'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <SummaryCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentTransactions />
        <BudgetSummary />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PotsSummary />
        <BillsSummary />
      </div>
    </div>
  )
}
