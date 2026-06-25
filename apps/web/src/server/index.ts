import { router } from './trpc'
import { transactionsRouter } from './routers/transactions'
import { budgetsRouter } from './routers/budgets'
import { potsRouter } from './routers/pots'

export const appRouter = router({
  transactions: transactionsRouter,
  budgets: budgetsRouter,
  pots: potsRouter,
})

export type AppRouter = typeof appRouter
