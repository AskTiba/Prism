# Project State

> Last updated: 2026-06-27 by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field             | Value                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Project name      | Personal Finance App                                                                                          |
| Primary stack     | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript + Recharts + Lucide React |
| Repo / branch     | main (local, no remote)                                                                                       |
| Current milestone | All 13 core units complete + design alignment pass                                                            |
| Overall status    | Green                                                                                                         |

## 2. What Currently Works

| Feature                                 | Verified by                                                                                                                                                                                                      | Notes                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Root workspace config                   | `package.json`, `turbo.json`, `.gitignore`, `.prettierrc`                                                                                                                                                        | Monorepo foundation committed                                     |
| AI tooling files                        | `AGENTS.md`, `GEMINI.md`, `opencode.jsonc`, `.opencode/skills/`, `.devpartner/`                                                                                                                                  | All AI integration files committed                                |
| apps/web scaffold                       | `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`                                                                                                                     | Next.js App Router + Tailwind CSS configured                      |
| Skill hub structure (`~/dev/skill5.0/`) | Manual review                                                                                                                                                                                                    | Universal AI skill directory                                      |
| Root layout + sidebar                   | `layout.tsx`, `globals.css`                                                                                                                                                                                      | Responsive sidebar with 5 links, 48dp touch targets, Lucide icons |
| Data layer                              | Prisma schema (Transaction, Budget, Pot), client singleton, seed script                                                                                                                                          | SQLite + Prisma Client generated from data.json                   |
| Shared package                          | Constants, types, Zod schemas for budget/pot CRUD + transaction filters                                                                                                                                          | 30 tests passing                                                  |
| tRPC routers                            | Transactions (list with pagination/search/sort/filter), Budgets (CRUD + spent), Pots (CRUD + add/withdraw)                                                                                                       | 14 router tests passing                                           |
| Overview page                           | SummaryCards (dark Current Balance, white Income/Expenses), RecentTransactions (avatar, category, date), BudgetSummary (Recharts donut chart), PotsSummary (Total Saved box + 2x2 grid), BillsSummary            | 18 overview tests                                                 |
| Transactions page                       | Search, category filter, sort dropdown, paginated table with Prev/Next, avatar column, recurring badge                                                                                                           | 9 tests                                                           |
| Budgets page                            | Budget cards with theme color, spent vs maximum, progress bars                                                                                                                                                   | 3 tests                                                           |
| Pots page                               | Pot cards with theme color, total vs target, progress bars                                                                                                                                                       | 2 tests                                                           |
| Recurring Bills page                    | List with paid/upcoming status, counts, search, avatar column                                                                                                                                                    | 2 tests                                                           |
| Budget form                             | Create form with Zod validation (category select, max input, error display)                                                                                                                                      | 3 tests                                                           |
| Pot form                                | Create form with Zod validation (name, target, theme select, error display)                                                                                                                                      | 4 tests                                                           |
| Pot add/withdraw form                   | Add/withdraw buttons with Zod validated amount input                                                                                                                                                             | 5 tests                                                           |
| Design alignment                        | Summary cards (dark/white), Pots (Total Saved box + 2x2 grid), Recent Transactions (avatars + dates), Nav (Lucide SVG icons), Budget Overview (Recharts donut chart), Tables (avatar columns + recurring badges) | Committed across 7+ PRs                                           |

## 3. In Progress

**Current feature/task:** Phase 0.1 — Multi-user auth with NextAuth.js v5

**Unit decomposition (linear, one at a time):**

- [x] All 13 core units + DA-1 (complete)
- [x] P0.1 Unit 1 — Install NextAuth.js deps + add User/Session Prisma models + db:push
- [x] P0.1 Unit 2 — Auth config + API route handler
- [ ] P0.1 Unit 3 — tRPC auth context + protectedProcedure
- [ ] P0.1 Unit 4 — Wire userId into all routers + seed + tests
- [ ] P0.1 Unit 5 — Auth UI in sidebar

## 4. Known Issues / Blocked

| Issue                                                              | Impact                                                                | Blocked on                                   | Priority |
| ------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------- | -------- |
| Pre-existing TS error in budgets router test                       | `tsc --noEmit` fails on `budgets.test.ts:45` (category type mismatch) | Needs test type fix                          | Low      |
| No ESLint config configured                                        | `next lint` prompts interactive setup                                 | Needs `eslint.config.*` creation             | Low      |
| Vitest occasionally hangs running multiple test files concurrently | CI/cache env issue                                                    | Investigate vitest config or resource limits | Low      |

## 5. Up Next (Roadmap-aligned)

See `personal_finance_app_feature_brief.md` and `.devpartner/ROADMAP.md` for the full 4-phase plan. User is researching before Phase 0 kick-off.

### Phase 0 — Foundation (Pending user research)

1. Multi-user auth (NextAuth.js or Clerk)
2. PostgreSQL migration + Prisma
3. CI/CD pipeline (GitHub Actions)
4. Data sovereignty (export + delete)
5. Enhanced transaction schema (tags, subtypes)

## 6. Conventions & Environment

| Aspect                           | Convention                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Formatter / linter               | Prettier + ESLint (Turbo-managed — ESLint config not yet set up)               |
| Type-check command               | `turbo typecheck`                                                              |
| Test framework / command         | Vitest + RTL via `npx vitest run` (from apps/web)                              |
| Test strategy                    | Integration-focused: RTL + userEvent for components, Vitest for pure functions |
| Browser/platform support         | Last 2 versions of evergreen browsers                                          |
| Accessibility conformance target | WCAG 2.2 AA (partial — nav, touch targets addressed)                           |
| Branching model                  | Feature branches from main                                                     |
| Env setup command                | `npm install` at root                                                          |
| Secrets location                 | `.env` in project root                                                         |
| Key architectural pattern        | tRPC router → TanStack Query → React components; Prisma for data access        |

## 7. Checkpoints / Rollback Points

| Date | Tag / Branch | Created Before | Still Relevant? |
| ---- | ------------ | -------------- | --------------- |

## 8. Open Questions for User

- (unsolved during session — user researching)
