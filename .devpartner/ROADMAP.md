# Roadmap

## Vision

A personal finance dashboard that gives users a complete view of their finances:
income/expenses overview, transaction history with search/filter, budget tracking
with spending limits, saving pots with progress, and recurring bill management.
Designed to scale from local single-user to full-stack multi-user with optional
React Native mobile app.

Long-term vision (per `personal_finance_app_feature_brief.md`): A full-scale fintech
platform with 20+ features across 7 categories — behavioral psychology, AI-powered
intelligence, investment/wealth management, smart planning, collaborative finance,
financial inclusion, and privacy/security.

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
| Tests | Done | 2026-06-27 | 44+ tests across all units, now 77 tests |
| Design alignment | Done | 2026-06-27 | Dark cards, donut chart, icons, avatars, badges |
| ESLint + CI/CD | Done | 2026-06-27 | ESLint v10 flat config + GitHub Actions pipeline |
| CI/CD skill hub | Done | 2026-06-27 | ci-partner skill copied to .opencode/skills/ |
| Full-stack upgrade (bonus) | Pending research | Future | Database, API routes, auth |
| React Native app (bonus) | Not started | Future | Expo app consuming same API |

## Feature Feasibility Assessment (from feature brief)

All 20+ features from `personal_finance_app_feature_brief.md` assessed:

| # | Feature | Complexity | Dependency | Risk | Phase |
|---|---|---|---|---|---|
| 3.2 | Net Worth Aggregator | Med-High | Plaid/open banking API | High | Phase 1 |
| 4.2 | Cash Flow Calendar | Med-High | Forward projection engine | Medium | Phase 1 |
| 4.5 | Subscription Radar | Medium | Recurring pattern analysis | Medium | Phase 1 |
| 6.2 | Offline-First Mode | **Critical** | CRDT sync + conflict resolution | Very High | Phase 1 |
| 7.1 | Data Sovereignty | Low | Export + deletion API | Low | Phase 1 |
| 2.2 | Anomaly Detection | High | ML pipeline + training data | High | Phase 2 |
| 2.4 | Receipt Scanner | Medium | OCR pipeline | Medium | Phase 2 |
| 2.5 | Scenario Engine | Med-High | Monte Carlo + visualization | Medium | Phase 2 |
| 4.1 | Goal Collision Detector | Medium | Multi-goal optimization | Medium | Phase 2 |
| 4.3 | Life Event Planner | Medium | Content + checklists | Low | Phase 2 |
| 4.4 | Micro-Savings Engine | Low-Med | Rule engine | Low | Phase 2 |
| 1.1 | Money Mood Tracker | Low | Simple journaling | Low | Phase 3 |
| 1.2 | Impulse Circuit Breaker | Medium | Real-time txns | Medium | Phase 3 |
| 1.3 | Money Archetype Engine | Low-Med | Quiz system | Low | Phase 3 |
| 1.4 | Savings Streaks | Low | Gamification | Low | Phase 3 |
| 1.5 | Future Self Visualizer | Low-Med | Projections | Low | Phase 3 |
| 3.4 | Opportunity Cost Lens | Low | Calculator | Low | Phase 3 |
| 5.1 | Shared Household Ledger | **Critical** | Multi-user auth + privacy | Very High | Phase 3 |
| 5.2 | Financial Literacy Missions | Medium | Content + gamification | Low | Phase 3 |
| 5.3 | Anonymous Benchmarking | Med-High | User base + stats | Medium | Phase 3 |
| 5.4 | Accountability Buddy | Low-Med | Peer pairing | Low | Phase 3 |
| 6.4 | Informal Income Tracker | Low | Logging + reporting | Low | Phase 3 |
| 7.3 | Private Mode | Low | UI state toggle | Low | Phase 3 |
| 2.1 | AI Co-Pilot | **Critical** | RAG + LLM + vector DB | Very High | Phase 4 |
| 2.3 | Bill Negotiation AI | High | Market data + NLP | High | Phase 4 |
| 3.1 | Tax-Loss Harvesting | **Critical** | Portfolio + tax rules | Very High | Phase 4 |
| 3.3 | Portfolio Stress Tester | Medium | Historical data | Medium | Phase 4 |
| 3.5 | Salary Wealth Map | Medium | External salary data | Medium | Phase 4 |
| 5.5 | Digital ROSCAs | **Critical** | Legal/regulatory + trust | Very High | Phase 4 |
| 6.1 | Multi-Currency View | Med-High | FX APIs + accounting | Medium | Phase 4 |
| 6.3 | Voice & Low-Literacy UI | Medium | Speech + i18n | Medium | Phase 4 |
| 6.5 | Credit-Building Toolkit | **Critical** | Credit bureau integration | Very High | Phase 4 |
| 7.2 | Behavioral Auth | **Critical** | Behavioral biometrics | High | Phase 4 |
| 7.4 | Decoy Account | Medium | Multi-profile | Medium | Phase 4 |
| 7.5 | Transparency Scorecard | Low | Static page | Low | Phase 4 |

## 4-Phase Roadmap

### Phase 0 — Foundation (est. 6 weeks)
Infrastructure upgrades required before building Phase 1 features:
- [x] P0.1: Multi-user auth (NextAuth.js or Clerk)
- [x] P0.2: PostgreSQL migration + Prisma schema update
- [x] P0.3: CI/CD pipeline (GitHub Actions + lint + test + build)
- P0.4: Data sovereignty (one-click export + deletion)
- P0.5: Enhanced transaction schema (tags, subtypes, recurring metadata)

### Phase 1 — Core Finance Engine (est. 12 weeks)
- P1.1: Plaid/Stitch open banking link + sync
- P1.2: True Net Worth Aggregator (3.2)
- P1.3: Cash Flow Calendar — 90-day forward view (4.2)
- P1.4: Subscription Radar — auto-detect recurring charges (4.5)
- P1.5: Offline-First Mode — CRDT-based sync (6.2)

### Phase 2 — Intelligence Layer (est. 12 weeks)
- P2.1: Receipt & Document Scanner — OCR pipeline (2.4)
- P2.2: Financial Scenario Engine — Monte Carlo simulations (2.5)
- P2.3: Goal Collision Detector — multi-goal optimization (4.1)
- P2.4: Micro-Savings Engine — round-ups, rules, triggers (4.4)
- P2.5: Life Event Planner — 20+ life event modules (4.3)
- P2.6: Anomaly & Fraud Detection — ML baseline modelling (2.2)

### Phase 3 — Behavioral & Social (est. 18 weeks)
- Money Mood Tracker (1.1), Impulse Circuit Breaker (1.2), Archetype Engine (1.3)
- Savings Streaks (1.4), Future Self Visualizer (1.5), Opportunity Cost Lens (3.4)
- Shared Household Ledger (5.1), Accountability Buddy (5.4), Peer Benchmarking (5.3)
- Financial Literacy Missions (5.2), Informal Income Tracker (6.4)
- Private Mode (7.3)

### Phase 4 — Advanced (est. 24+ weeks)
- AI Co-Pilot (2.1), Bill Negotiation AI (2.3)
- Tax-Loss Harvesting (3.1), Portfolio Stress Tester (3.3), Salary Wealth Map (3.5)
- Digital ROSCAs (5.5), Multi-Currency View (6.1)
- Voice & Low-Literacy UI (6.3), Credit-Building Toolkit (6.5)
- Behavioral Authentication (7.2), Decoy Account (7.4), Transparency Scorecard (7.5)

## Open Questions (deferred for user research)
1. Open banking: Plaid (US/UK/EU), Mono/Stitch (Africa), or both?
3. Mobile: Expo RN app alongside Phase 1, or web-only for now?
4. AI Co-Pilot: BYO LLM key (OpenAI/Anthropic) or self-hosted (Llama)?
5. Budget timeline: Incremental or milestone-targeted?

## Tech Debt & Risk Register

| Date Identified | Item | Risk if Unaddressed | Deferred Because | Revisit When |
|---|---|---|---|---|
| 2026-06-27 | Pre-existing TS error in budgets.test.ts (category type) | `turbo typecheck` fails | Not introduced by any unit's changes; pre-existing in initial scaffold | Before any production deployment |
| 2026-06-27 | 5 pre-existing ESLint warnings (no-img-element, no-explicit-any) | Can't reach zero-warning CI gate | Pre-existing design choices (img tags, any types in mocks) | Before production deployment |
| 2026-06-27 | Vitest hangs with concurrent test files | Can't run full suite in one pass | Environment/resource issue | Before CI setup |
| 2026-06-27 | No multi-user auth | Blocks all social/inclusion features | User researching options | Phase 0 start |
| 2026-06-27 | PostgreSQL multi-user concurrency | Needs connection pooling at scale | Single-user MVP fits free Neon tier | Phase 1 start |
| 2026-06-27 | PostgreSQL multi-user concurrency | Needs connection pooling at scale | Single-user MVP fits free Neon tier | Phase 1 start |
| 2026-06-27 | No offline sync layer | Offline-first features blocked | Deferred to Phase 1 | Phase 1 start |

## Backlog (Unscheduled)

- MSW integration tests for full-page workflows
- Dark mode support
- Automated E2E tests with Playwright
- `next/image` optimization
- Expo React Native app
