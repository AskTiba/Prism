# Roadmap

## Vision

A personal finance dashboard that gives users a complete view of their finances:
income/expenses overview, transaction history with search/filter, budget tracking
with spending limits, saving pots with progress, and recurring bill management.
Designed to scale from local single-user to full-stack multi-user with optional
React Native mobile app.

## Non-Functional Requirements

| Dimension | Target | Notes |
|---|---|---|
| Expected scale | Single-user initially; multi-user later | data.json has ~100 transactions as seed |
| Latency budget | Page loads < 2s, searches < 500ms | Measured after scaffold |
| Uptime / reliability | Local first; N/A for cloud | |
| Concurrency expectations | Single user | |
| Other constraints | Must work offline-capable (data in local SQLite) | |

## Performance Log

| Date | Metric | Target | Measured | Status |

## Milestones

| Milestone | Status | Target | Notes |
|---|---|---|---|
| Skill hub + project bootstrap | Done | 2026-06-25 | AGENTS.md, GEMINI.md, .devpartner/, .opencode/skills/ created |
| Project scaffold (Turborepo) | Done | 2026-06-25 | Next.js + Prisma + tRPC + Tailwind init |
| Data layer (Prisma schema + seed) | Done | 2026-06-25 | Schema from data.json |
| Layout + navigation | Done | 2026-06-25 | Responsive sidebar |
| 5 pages implementation | Done | 2026-06-27 | Overview, Transactions, Budgets, Pots, Recurring Bills |
| Form validation | Done | 2026-06-27 | Zod + error messages on Budget/Pot forms |
| Responsive + accessibility | Done | 2026-06-27 | Nav wrap, 48dp touch targets, truncation |
| Tests | Done | 2026-06-27 | 44+ tests across all units |
| Full-stack upgrade (bonus) | Not started | Future | Database, API routes, auth |
| React Native app (bonus) | Not started | Future | Expo app consuming same API |

## Tech Debt & Risk Register

| Date Identified | Item | Risk if Unaddressed | Deferred Because | Revisit When |
|---|---|---|---|---|
| 2026-06-27 | Pre-existing TS error in budgets.test.ts (category type) | `turbo typecheck` fails | Not introduced by any unit's changes; pre-existing in initial scaffold | Before any production deployment |
| 2026-06-27 | No ESLint config | `next lint` offers interactive setup | Not blocking development | Before CI setup |

## Backlog (Unscheduled)

- MSW integration tests for full-page workflows
- Dark mode support
- Automated E2E tests with Playwright
- CI/CD setup (GitHub Actions)
- Deployment config
- `next/image` optimization
- Multi-user auth + PostgreSQL migration
- Expo React Native app
