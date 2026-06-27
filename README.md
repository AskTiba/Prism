# Prism

See your finances from every angle. Full-stack finance dashboard with budgets, pots, bills, and analytics.

## Overview

Prism is a personal finance dashboard that gives you a complete view of your financial life. Track income and expenses, manage budgets, save toward goals with pots, monitor recurring bills, and gain insights through net worth tracking, cash flow projections, and subscription detection.

Built with Turborepo, Next.js, Prisma, tRPC, and Tailwind CSS. Deployed on Vercel with PostgreSQL via Neon.

## Features

- **Overview** -- Summary cards, recent transactions, budget donut chart, savings progress, bill summaries, net worth, and cash flow projection
- **Transactions** -- Search, filter by category/type/tags/date range, sort, paginated table with recurring badges and avatars
- **Budgets** -- Create/edit/delete budgets with spending limits, category-based auto-theming, and progress bars
- **Pots** -- Create/edit/delete savings pots with deposit/withdraw, target progress tracking
- **Recurring Bills** -- Track paid/upcoming/due bills with counts, search, subscription detection
- **Multi-User Auth** -- Sign-up/sign-in via NextAuth.js with Prisma adapter, per-user data isolation
- **Data Sovereignty** -- CSV export of all transactions, account deletion with cascade
- **CSV Export** -- One-click download of transaction history

## Tech Stack

| Layer     | Technology                           |
| --------- | ------------------------------------ |
| Framework | Next.js 15 (App Router)              |
| Monorepo  | Turborepo                            |
| Language  | TypeScript                           |
| Database  | PostgreSQL (Neon)                    |
| ORM       | Prisma                               |
| API       | tRPC                                 |
| Auth      | NextAuth.js v5                       |
| Styling   | Tailwind CSS                         |
| State     | TanStack Query                       |
| Forms     | react-hook-form + Zod                |
| Charts    | Recharts                             |
| Icons     | Lucide React                         |
| Testing   | Vitest + React Testing Library + MSW |
| CI        | GitHub Actions                       |

## Architecture

```
apps/
  web/                  Next.js App Router application
    src/app/             Pages and API routes
    src/components/      Shared UI components
packages/
  db/                   Prisma schema, client, and seed
    prisma/schema.prisma Database schema
    src/seed.ts          Seed script (from data.json)
  shared/               Types, Zod schemas, constants
```

Data flows: `data.json` -> Prisma seed -> Neon PostgreSQL -> Prisma client -> tRPC router -> TanStack Query -> React components

## Getting Started

### Prerequisites

- Node.js 20+
- npm 11+
- PostgreSQL database (local or Neon)

### Installation

```bash
git clone <repo-url>
cd prism
npm install
```

### Environment Variables

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

Create `apps/web/.env`:

```env
AUTH_SECRET="generate with: openssl rand -base64 32"
```

### Database Setup

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### Development

```bash
npm run dev
```

Open http://localhost:3000. Sign up with any email and password to start.

## Available Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development servers      |
| `npm run build`     | Production build               |
| `npm run lint`      | Run ESLint                     |
| `npm run test`      | Run tests                      |
| `npm run typecheck` | TypeScript type check          |
| `npm run format`    | Format code with Prettier      |
| `npm run db:push`   | Push Prisma schema to database |
| `npm run db:seed`   | Seed database                  |

## Deployment

Deploy to Vercel:

1. Import the repository into Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL` (Neon PostgreSQL connection string)
   - `AUTH_SECRET` (from `apps/web/.env`)
3. The `vercel.json` and Prisma postinstall handle the build pipeline

## Project Status

All core features are implemented and tested. Phase 1 features completed: multi-user auth, PostgreSQL migration, CI/CD, CSV export/account deletion, enhanced transaction schema, net worth tracking, cash flow calendar, and subscription detection.
