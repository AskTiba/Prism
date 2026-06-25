import { prisma } from './client'
import path from 'path'
import fs from 'fs'

type SeedTransaction = {
  avatar: string | null
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

type SeedBudget = {
  category: string
  maximum: number
  theme: string
}

type SeedPot = {
  name: string
  target: number
  total: number
  theme: string
}

type SeedData = {
  transactions: SeedTransaction[]
  budgets: SeedBudget[]
  pots: SeedPot[]
}

async function main() {
  const dataPath = path.join(__dirname, '..', 'prisma', 'data.json')
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const data: SeedData = JSON.parse(raw)

  const existingTransactions = await prisma.transaction.count()
  if (existingTransactions === 0) {
    for (const tx of data.transactions) {
      await prisma.transaction.create({
        data: {
          avatar: tx.avatar,
          name: tx.name,
          category: tx.category,
          date: new Date(tx.date),
          amount: tx.amount,
          recurring: tx.recurring,
        },
      })
    }
    console.log(`Seeded ${data.transactions.length} transactions`)
  } else {
    console.log(`Skipping transactions: ${existingTransactions} already exist`)
  }

  const existingBudgets = await prisma.budget.count()
  if (existingBudgets === 0) {
    for (const budget of data.budgets) {
      await prisma.budget.create({
        data: {
          category: budget.category,
          maximum: budget.maximum,
          theme: budget.theme,
        },
      })
    }
    console.log(`Seeded ${data.budgets.length} budgets`)
  } else {
    console.log(`Skipping budgets: ${existingBudgets} already exist`)
  }

  const existingPots = await prisma.pot.count()
  if (existingPots === 0) {
    for (const pot of data.pots) {
      await prisma.pot.create({
        data: {
          name: pot.name,
          target: pot.target,
          total: pot.total,
          theme: pot.theme,
        },
      })
    }
    console.log(`Seeded ${data.pots.length} pots`)
  } else {
    console.log(`Skipping pots: ${existingPots} already exist`)
  }

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
