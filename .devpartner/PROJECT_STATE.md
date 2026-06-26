# Project State

> Last updated: 2026-06-27 by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field             | Value                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Project name      | Personal Finance App                                                                                          |
| Primary stack     | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript + Recharts + Lucide React + ESLint |
| Repo / branch     | main (local, no remote)                                                                                       |
| Current milestone | All 13 core units + design alignment + P0.1 multi-user auth + P0.2 PostgreSQL + P0.3 CI/CD & ESLint |
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
| Design alignment | Summary cards (dark/white), Pots (Total Saved box + 2x2 grid), Recent Transactions (avatars + dates), Nav (Lucide SVG icons), Budget Overview (Recharts donut chart), Tables (avatar columns + recurring badges) | Committed across 7+ PRs |
| Multi-user auth (P0.1) | NextAuth.js v5 + Prisma adapter, Credentials provider, tRPC protectedProcedure, userId-scoped routers, auth UI in sidebar | 5 commits on main |
| CI/CD pipeline (P0.3) | `.github/workflows/ci.yml` — GitHub Actions (npm ci, Prisma generate, format:check, lint, typecheck, test, build) | Pre-scaffolded, activates on remote addition |
| ESLint config (P0.3) | `eslint.config.js` — ESLint v10 flat config with @eslint/js, typescript-eslint, react-hooks, @next/eslint-plugin-next | 0 errors, 5 warnings on current codebase |
| CI/CD skill hub | `.opencode/skills/ci-partner/` — reusable CI/CD scaffolding skill copied from ~/dev/skill5.0/ci-partner/ | Auto-detects stack from package.json/turbo.json/vitest.config.ts |
| PostgreSQL migration (P0.2) | Prisma schema provider changed to `postgresql`, `pg` driver installed, Neon cloud DB configured, seeded | 7 tables created in Neon, 35 txns/5 budgets/4 pots seeded |

## 3. In Progress

**Current feature/task:** All P0 items complete. Ready for Phase 1.

**Unit decomposition (linear, one at a time):**

- [x] All 13 core units + DA-1 (complete)
- [x] P0.1 Unit 1 — Install NextAuth.js deps + add User/Session Prisma models + db:push
- [x] P0.1 Unit 2 — Auth config + API route handler
- [x] P0.1 Unit 3 — tRPC auth context + protectedProcedure
- [x] P0.1 Unit 4 — Wire userId into all routers + seed + tests
- [x] P0.1 Unit 5 — Auth UI in sidebar
- [x] P0.2 Unit 1 — Schema provider to postgresql + pg driver + .env.example
- [x] P0.2 Unit 2 — Generate client + verify tests pass
- [x] P0.2 Unit 3 — db:push + db:seed against Neon PostgreSQL
- [x] P0.3 Unit 1 — Copy ci-partner to .opencode/skills/
- [x] P0.3 Unit 2 — Generate .github/workflows/ci.yml
- [x] P0.3 Unit 3 — Generate eslint.config.js
- [x] P0.3 Unit 4 — Install ESLint deps + wire turbo.json
- [x] P0.3 Unit 5 — Verify lint/typecheck/test/build pass

## 4. Known Issues / Blocked

| Issue                                                                        | Impact                                                                | Blocked on                                   | Priority |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------- | -------- |
| Pre-existing TS error in budgets router test                                 | `tsc --noEmit` fails on `budgets.test.ts:46` (category type mismatch) | Needs test type fix                          | Low      |
| Vitest occasionally hangs running multiple test files concurrently           | CI/cache env issue                                                    | Investigate vitest config or resource limits | Low      |

## 5. Up Next (Roadmap-aligned)

See `personal_finance_app_feature_brief.md` and `.devpartner/ROADMAP.md` for the full 4-phase plan.

### Phase 0 — Foundation (P0.1 complete)

- [x] P0.1: Multi-user auth (NextAuth.js v5)
- [x] P0.2: PostgreSQL migration + Prisma
- [x] P0.3: CI/CD pipeline (GitHub Actions)
- [ ] P0.4: Data sovereignty (export + delete)
- [ ] P0.5: Enhanced transaction schema (tags, subtypes)

## 6. Conventions & Environment

| Aspect                           | Convention                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Formatter / linter               | Prettier + ESLint (Turbo-managed)                                              |
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
