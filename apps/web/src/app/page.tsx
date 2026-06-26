import { SummaryCards } from '@/features/overview/summary-cards'
import { NetWorthCard } from '@/features/overview/net-worth-card'
import { CashFlowCard } from '@/features/overview/cash-flow-card'
import { RecentTransactions } from '@/features/overview/recent-transactions'
import { BudgetSummary } from '@/features/overview/budget-summary'
import { PotsSummary } from '@/features/overview/pots-summary'
import { BillsSummary } from '@/features/overview/bills-summary'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <SummaryCards />
      <NetWorthCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <CashFlowCard />
        <RecentTransactions />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BudgetSummary />
        <PotsSummary />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BillsSummary />
      </div>
    </div>
  )
}
