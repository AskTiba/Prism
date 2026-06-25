# Roadmap

## Vision

A personal finance dashboard that gives users a complete view of their finances:
income/expenses overview, transaction history with search/filter, budget tracking
with spending limits, saving pots with progress, and recurring bill management.
Designed to scale from local single-user to full-stack multi-user with optional
React Native mobile app.

## Non-Functional Requirements

> Concrete targets so "performance" and "scalability" decisions have something real
> to design against. Fill in as soon as they're known.

| Dimension | Target | Notes |
|---|---|---|
| Expected scale (users / data volume / requests) | Single-user initially; multi-user later | Data.json has ~100 transactions as seed |
| Latency budget | Page loads < 2s, searches < 500ms | Measured after scaffold |
| Uptime / reliability | Local first; N/A for cloud | |
| Concurrency expectations | Single user | |
| Other constraints | Must work offline-capable (data in local SQLite) | |

## Performance Log

> Owned by the Performance Tracker standing persona. Measured-vs-target over time.

| Date | Metric | Target | Measured | Status |
|---|---|---|---|---|

## Milestones

| Milestone | Status | Target | Notes |
|---|---|---|---|
| Skill hub + project bootstrap | Done | 2026-06-25 | AGENTS.md, GEMINI.md, .devpartner/, .opencode/skills/ created |
| Project scaffold (Turborepo) | Not started | Next | Next.js + Prisma + tRPC + Tailwind init |
| Data layer (Prisma schema + seed) | Not started | Next | Schema from data.json |
| Layout + navigation | Not started | Next | Responsive sidebar |
| 5 pages implementation | Not started | Next | Overview, Transactions, Budgets, Pots, Recurring Bills |
| Form validation | Not started | Next | Zod + error messages |
| Tests | Not started | Next | Vitest + RTL + MSW |
| Full-stack upgrade (bonus) | Not started | Future | Database, API routes, auth |
| React Native app (bonus) | Not started | Future | Expo app consuming same API |

## Tech Debt & Risk Register

> Things knowingly deferred or accepted as risk.

| Date Identified | Item | Risk if Unaddressed | Deferred Because | Revisit When |
|---|---|---|---|---|

## Backlog (Unscheduled)

- Responsive image optimization with `next/image`
- Dark mode support
- Automated E2E tests with Playwright
- CI/CD setup (GitHub Actions)
- Deployment config
