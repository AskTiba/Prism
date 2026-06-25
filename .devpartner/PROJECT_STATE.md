# Project State

> Last updated: 2026-06-27 by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field | Value |
|---|---|
| Project name | Personal Finance App |
| Primary stack | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript |
| Repo / branch | main (local, no remote) |
| Current milestone | All 13 core units complete — app fully functional |
| Overall status | Green |

## 2. What Currently Works

| Feature | Verified by | Notes |
|---|---|---|
| Root workspace config | `package.json`, `turbo.json`, `.gitignore`, `.prettierrc` | Monorepo foundation committed |
| AI tooling files | `AGENTS.md`, `GEMINI.md`, `opencode.jsonc`, `.opencode/skills/`, `.devpartner/` | All AI integration files committed |
| apps/web scaffold | `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js` | Next.js App Router + Tailwind CSS configured |
| Skill hub structure (`~/dev/skill5.0/`) | Manual review | Universal AI skill directory |
| Root layout + sidebar | `layout.tsx`, `globals.css` | Responsive sidebar with 5 links, 48dp touch targets |
| Data layer | Prisma schema (Transaction, Budget, Pot), client singleton, seed script | SQLite + Prisma Client generated from data.json |
| Shared package | Constants, types, Zod schemas for budget/pot CRUD + transaction filters | 30 tests passing |
| tRPC routers | Transactions (list with pagination/search/sort/filter), Budgets (CRUD + spent), Pots (CRUD + add/withdraw) | 14 router tests passing |
| Overview page | SummaryCards, RecentTransactions, BudgetSummary, PotsSummary, BillsSummary | 1 integration test |
| Transactions page | Search, category filter, sort dropdown, paginated table with Prev/Next | 6 tests |
| Budgets page | Budget cards with theme color, spent vs maximum, progress bars | 3 tests |
| Pots page | Pot cards with theme color, total vs target, progress bars | 2 tests |
| Recurring Bills page | List with paid/upcoming status, counts, search | 2 tests |
| Budget form | Create form with Zod validation (category select, max input, error display) | 3 tests |
| Pot form | Create form with Zod validation (name, target, theme select, error display) | 4 tests |
| Pot add/withdraw form | Add/withdraw buttons with Zod validated amount input | 5 tests |
| Responsive accessibility fixes | Nav wrap + 48dp touch targets on nav, filters, pagination, widget links; truncated long names | 8 tests across layout, transactions, widgets |

## 3. In Progress

**Current feature/task:** None — all 13 units complete.

**Unit decomposition (linear, one at a time):**

- [x] Unit 1 — Root workspace config + AI tooling files
- [x] Unit 2 — apps/web scaffold (Next.js + Tailwind + npm install)
- [x] Unit 3 — Root layout + global CSS + responsive sidebar navigation
- [x] Unit 4 — packages/db: Prisma schema + client + seed from data.json
- [x] Unit 5 — packages/shared: Types + Zod schemas + constants
- [x] Unit 6 — tRPC router + TanStack Query provider setup
- [x] Unit 7 — Overview page
- [x] Unit 8 — Transactions page (table, pagination, search, sort, filter)
- [x] Unit 9 — Budgets page (progress bars, list)
- [x] Unit 10 — Pots page (progress bars, list)
- [x] Unit 11 — Recurring Bills page (list, search, sort, status)
- [x] Unit 12 — Form validation (Budget create, Pot create, Pot add/withdraw)
- [x] Unit 13 — Responsive audit + accessibility fixes (nav, touch targets, overflow)

## 4. Known Issues / Blocked

| Issue | Impact | Blocked on | Priority |
|---|---|---|---|
| Pre-existing TS error in budgets router test | `tsc --noEmit` fails on `budgets.test.ts:45` (category type mismatch) | Needs test type fix | Low |
| No ESLint config configured | `next lint` prompts interactive setup | Needs `eslint.config.*` creation | Low |

## 5. Up Next (Roadmap-aligned)

1. Full-stack upgrade: multi-user auth, PostgreSQL migration
2. React Native mobile app consuming same tRPC API
3. MSW integration tests for full-page workflows
4. Dark mode support
5. E2E tests with Playwright
6. CI/CD setup (GitHub Actions)

## 6. Conventions & Environment

| Aspect | Convention |
|---|---|
| Formatter / linter | Prettier + ESLint (Turbo-managed — ESLint config not yet set up) |
| Type-check command | `turbo typecheck` |
| Test framework / command | Vitest + RTL via `npx vitest run` (from apps/web) |
| Test strategy | Integration-focused: RTL + userEvent for components, Vitest for pure functions |
| Browser/platform support | Last 2 versions of evergreen browsers |
| Accessibility conformance target | WCAG 2.2 AA (partial — nav, touch targets addressed) |
| Branching model | Feature branches from main |
| Env setup command | `npm install` at root |
| Secrets location | `.env` in project root |
| Key architectural pattern | tRPC router → TanStack Query → React components; Prisma for data access |

## 7. Checkpoints / Rollback Points

| Date | Tag / Branch | Created Before | Still Relevant? |
|---|---|---|---|

## 8. Open Questions for User

- (none)
