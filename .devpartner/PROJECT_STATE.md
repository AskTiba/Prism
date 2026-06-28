# Project State

> Last updated: 2026-06-28 (session 2) by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field             | Value                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Project name      | Personal Finance App                                                                                                   |
| Primary stack     | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript + Recharts + Lucide React + ESLint |
| Repo / branch     | main (local, no remote)                                                                                                |
| Current milestone | All 13 core units + design alignment + P0.1–P0.5 + P1.2–P1.4 + Enhanced filters + UI/UX Polish |
| Overall status    | Green |

### Known Issue
- **tRPC 401 on first page load**: SessionProvider call to `/api/auth/session` returns 200 (session valid), but tRPC batch calls still return 401 on the first page load. After `SessionProvider` warms up, smaller batch calls succeed (200). The `getToken` approach in `route.ts` fixes this — reads JWT directly without Auth.js pipeline. No sign-out/in required. | Verifed fixed |

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
| tRPC routers                            | Transactions (list with pagination/search/sort/filter/subtype/tags/date), Budgets (CRUD + spent), Pots (CRUD + add/withdraw)                                                                                     | 17 router tests passing                                           |
| Overview page                           | SummaryCards (dark Current Balance, white Income/Expenses), RecentTransactions (avatar, category, date), BudgetSummary (Recharts donut chart), PotsSummary (Total Saved box + 2x2 grid), BillsSummary            | 18 overview tests                                                 |
| Transactions page                       | Search, category, subtype, tags, date range filters, sort dropdown, paginated table with Prev/Next, avatar column, recurring badge                                                                               | 17 tests                                                          |
| Budgets page                            | Budget cards with theme color, spent vs maximum, progress bars                                                                                                                                                   | 3 tests                                                           |
| Pots page                               | Pot cards with theme color, total vs target, progress bars                                                                                                                                                       | 2 tests                                                           |
| Recurring Bills page                    | List with paid/upcoming status, counts, search, avatar column                                                                                                                                                    | 2 tests                                                           |
| Budget form                             | Create form with Zod validation (category select, max input, error display)                                                                                                                                      | 3 tests                                                           |
| Pot form                                | Create form with Zod validation (name, target, theme select, error display)                                                                                                                                      | 4 tests                                                           |
| Pot add/withdraw form                   | Add/withdraw buttons with Zod validated amount input                                                                                                                                                             | 5 tests                                                           |
| Design alignment                        | Summary cards (dark/white), Pots (Total Saved box + 2x2 grid), Recent Transactions (avatars + dates), Nav (Lucide SVG icons), Budget Overview (Recharts donut chart), Tables (avatar columns + recurring badges) | Committed across 7+ PRs                                           |
| Multi-user auth (P0.1)                  | NextAuth.js v5 + Prisma adapter, Credentials provider, tRPC protectedProcedure, userId-scoped routers, auth UI in sidebar                                                                                        | 5 commits on main                                                 |
| CI/CD pipeline (P0.3)                   | `.github/workflows/ci.yml` — GitHub Actions (npm ci, Prisma generate, format:check, lint, typecheck, test, build)                                                                                                | Pre-scaffolded, activates on remote addition                      |
| ESLint config (P0.3)                    | `eslint.config.js` — ESLint v10 flat config with @eslint/js, typescript-eslint, react-hooks, @next/eslint-plugin-next                                                                                            | 0 errors, 5 warnings on current codebase                          |
| CI/CD skill hub                         | `.opencode/skills/ci-partner/` — reusable CI/CD scaffolding skill copied from ~/dev/skill5.0/ci-partner/                                                                                                         | Auto-detects stack from package.json/turbo.json/vitest.config.ts  |
| PostgreSQL migration (P0.2)             | Prisma schema provider changed to `postgresql`, `pg` driver installed, Neon cloud DB configured, seeded                                                                                                          | 7 tables created in Neon, 35 txns/5 budgets/4 pots seeded         |
| Data sovereignty (P0.4)                 | Export CSV api route + link on transactions page, delete account dialog in sidebar                                                                                                                               | Committed                                                         |
| Enhanced schema (P0.5)                  | tags + subtype fields on Transaction model, CSV export includes new columns, tag badges + subtype badge on transactions page                                                                                     | Committed                                                         |
| Net Worth Aggregator (P1.2)             | netWorth tRPC procedure + NetWorthCard on overview                                                                                                                                                               | 2 units committed                                                 |
| Cash Flow Calendar (P1.3)               | projectCashFlow pure function + cashFlowProjection tRPC + CashFlowCard on overview                                                                                                                               | 3 units committed                                                 |
| Subscription Radar (P1.4)               | detectSubscriptions pure function + detectedSubscriptions tRPC + widget on bills page                                                                                                                            | 3 units committed                                                 |
| Enhanced transaction filters            | subtype/tags/date filters added to tRPC list + filter UI on transactions page                                                                                                                                    | 2 units committed                                                 |
| Vercel deployment config                | `vercel.json`, Prisma postinstall, `.gitignore` update                                                                                                                                                           | 2 commits on main                                                 |

## 3. In Progress

**Current feature/task:** UI/UX Polish (Auth form refactor to useActionState, password visibility, GlassButton standardization, lint cleanup) — Complete.

**Unit decomposition (linear, one at a time):**

- [x] All 13 core units + DA-1 (complete)
- [x] P0.1-P0.5 (all units complete)
- [x] P1.2 Unit 1 — netWorth tRPC procedure + tests
- [x] P1.2 Unit 2 — NetWorthCard widget on overview + tests
- [x] P1.3 Unit 1 — projectCashFlow pure function + tests
- [x] P1.3 Unit 2 — cashFlowProjection tRPC procedure + tests
- [x] P1.3 Unit 3 — CashFlowCard widget on overview + tests
- [x] P1.4 Unit 1 — detectSubscriptions pure function + tests
- [x] P1.4 Unit 2 — detectedSubscriptions tRPC procedure + tests
- [x] P1.4 Unit 3 — DetectedSubscriptions widget on bills page + tests
- [x] Enhanced filter Unit 1 — Add subtype/tags/date range to tRPC list + tests
- [x] Enhanced filter Unit 2 — Add filter UI to transactions page + tests
- [x] UI/UX Polish Unit 1 — Refactor auth actions to ActionState
- [x] UI/UX Polish Unit 2 — Password toggle in GlassInput
- [x] UI/UX Polish Unit 3 — SubmitButton with useFormStatus
- [x] UI/UX Polish Unit 4 — useActionState integration in signin/signup
- [x] UI/UX Polish Unit 5 — GlassButton standardization & hover effects
- [x] Tech Debt Cleanup — Resolve lint warnings (next/image, any types)
- [x] Session 2: Unify UGX formatting via `formatCurrency` + `CURRENCY_CONFIG`
- [x] Session 2: Expand seed data (140 txns, 8 budgets, 8 pots) with Ugandan merchants
- [x] Session 2: Fix tRPC 401 by replacing `auth()` with `getToken` in route handler
- [x] Session 2: Fix test assertions (`\u00a0` → regex), add `SessionProvider`
- [x] Session 2: Fix AUTH_URL missing in dev, add `next.config.ts` fallback

## 4. Known Issues / Blocked

| Issue                                                              | Impact                                                                | Blocked on                                   | Priority |
| ------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------- | -------- |
| Pre-existing TS error in budgets router test                       | `tsc --noEmit` fails on `budgets.test.ts:46` (category type mismatch) | Needs test type fix                          | Low      |
| Vitest occasionally hangs running multiple test files concurrently | CI/cache env issue                                                    | Investigate vitest config or resource limits | Low      |

## 5. Up Next (Roadmap-aligned)

See `personal_finance_app_feature_brief.md` and `.devpartner/ROADMAP.md` for the full 4-phase plan.

### Phase 0 — Foundation (P0.1 complete)

- [x] P0.1: Multi-user auth (NextAuth.js v5)
- [x] P0.2: PostgreSQL migration + Prisma
- [x] P0.3: CI/CD pipeline (GitHub Actions)
- [x] P0.4: Data sovereignty (export + delete)
- [x] P0.5: Enhanced transaction schema (tags, subtypes)

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
