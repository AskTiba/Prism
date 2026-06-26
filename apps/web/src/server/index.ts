import { router } from './trpc'
import { transactionsRouter } from './routers/transactions'
import { budgetsRouter } from './routers/budgets'
import { potsRouter } from './routers/pots'
import { dataRouter } from './routers/data'

export const appRouter = router({
  transactions: transactionsRouter,
  budgets: budgetsRouter,
  pots: potsRouter,
  data: dataRouter,
})

export type AppRouter = typeof appRouter
