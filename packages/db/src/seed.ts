import { prisma } from './client';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

type SeedTransaction = {
  avatar: string | null;
  name: string;
  category: string;
  subtype?: string;
  tags?: string[];
  date: string;
  amount: number;
  recurring: boolean;
};

type SeedBudget = {
  category: string;
  maximum: number;
  theme: string;
};

type SeedPot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

type SeedData = {
  transactions: SeedTransaction[];
  budgets: SeedBudget[];
  pots: SeedPot[];
};

async function main() {
  const dataPath = path.join(__dirname, '..', 'prisma', 'data.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data: SeedData = JSON.parse(raw);

  let userId = process.env.SEED_USER_ID;
  if (!userId) {
    const existing = await prisma.user.findFirst();
    if (existing) {
      userId = existing.id;
    } else {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await prisma.user.create({
        data: {
          name: 'Default User',
          email: 'user@example.com',
          hashedPassword,
        },
      });
      userId = user.id;
    }
  }

  const existingTransactions = await prisma.transaction.count();
  if (existingTransactions === 0) {
    for (const tx of data.transactions) {
      await prisma.transaction.create({
        data: {
          userId,
          avatar: tx.avatar,
          name: tx.name,
          category: tx.category,
          subtype: tx.subtype ?? null,
          tags: tx.tags ?? [],
          date: new Date(tx.date),
          amount: tx.amount,
          recurring: tx.recurring,
        },
      });
    }
    console.log(`Seeded ${data.transactions.length} transactions`);
  } else {
    const nullUserTx = await prisma.transaction.count({ where: { userId: null } });
    if (nullUserTx > 0) {
      await prisma.transaction.updateMany({
        where: { userId: null },
        data: { userId },
      });
      console.log(`Assigned userId to ${nullUserTx} existing transactions`);
    }
    console.log(`Skipping transactions: ${existingTransactions} already exist`);
  }

  const existingBudgets = await prisma.budget.count();
  if (existingBudgets === 0) {
    for (const budget of data.budgets) {
      await prisma.budget.create({
        data: {
          userId,
          category: budget.category,
          maximum: budget.maximum,
          theme: budget.theme,
        },
      });
    }
    console.log(`Seeded ${data.budgets.length} budgets`);
  } else {
    const nullUserBudgets = await prisma.budget.count({ where: { userId: null } });
    if (nullUserBudgets > 0) {
      await prisma.budget.updateMany({
        where: { userId: null },
        data: { userId },
      });
      console.log(`Assigned userId to ${nullUserBudgets} existing budgets`);
    }
    console.log(`Skipping budgets: ${existingBudgets} already exist`);
  }

  const existingPots = await prisma.pot.count();
  if (existingPots === 0) {
    for (const pot of data.pots) {
      await prisma.pot.create({
        data: {
          userId,
          name: pot.name,
          target: pot.target,
          total: pot.total,
          theme: pot.theme,
        },
      });
    }
    console.log(`Seeded ${data.pots.length} pots`);
  } else {
    const nullUserPots = await prisma.pot.count({ where: { userId: null } });
    if (nullUserPots > 0) {
      await prisma.pot.updateMany({
        where: { userId: null },
        data: { userId },
      });
      console.log(`Assigned userId to ${nullUserPots} existing pots`);
    }
    console.log(`Skipping pots: ${existingPots} already exist`);
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
