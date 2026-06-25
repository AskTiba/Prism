# Decisions Log

> Architecture, technology, and process decisions, including overridden disagreements,
> dependency choices, and git conventions.

## Decision Records

| Date | Decision | Persona | Reasoning | Alternatives Considered | User Override? |
|---|---|---|---|---|---|
| 2026-06-25 | Adopt Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind for stack | Full-Stack Architect | Turborepo enables shared packages for future Expo RN app; Next.js provides API routes + web in one project; Prisma + SQLite is lightweight but real (no mock layer to throw away); tRPC gives end-to-end types shared by web and future RN client; Tailwind is the fastest path to responsive accessible UI | Vite + MSW (throws away API work when RN arrives); Next.js without tRPC (still viable but loses typing benefits) | No |
| 2026-06-25 | Restructure ~/dev/skill5.0/ as universal AI skill hub | Systems Architect | Canonical source in senior-dev-partner/ and responsive-ui-partner/ directories; README provides explicit transfer instructions for opencode, Gemini, Claude Code, and standalone use; eliminates duplicate copies and drift | Keeping the flat file structure (no self-description for new AI tools) | No |
| 2026-06-26 | Test mocking: vi.mock for tRPC hooks over MSW for page tests | Test Architect | Faster to write and simpler to maintain for current scope; MSW retained as dependency for future integration tests | MSW (more realistic but slower setup) | No |
| 2026-06-26 | Auto-assign theme color from CATEGORY_THEMES for budget creation | UX Designer | Reduces form friction — user picks category, theme auto-fills | Separate color picker (more complex UX) | No |

## Git Conventions for This Project

| Aspect | Convention |
|---|---|
| Commit message format | Conventional Commits — `type: description`, ≤12 words, imperative |
| Commit types in use | feat, fix, refactor, docs, test, chore, build, perf, style |
| Scopes used? | No |
| Default branch | main |
| Branch naming convention | `feat/<name>`, `fix/<name>`, `chore/<name>` |
| Force-push allowed on | Never without per-instance confirmation |
| Amend policy notes | Follow section 8.5 — unpushed corrections only |
| Commit attribution trailer | None |

## Commits on main

```
734ca93 feat: add pots page with progress bars
4168419 feat: add recurring bills page with status
6f53065 feat: add budget create form with Zod validation
2729cc7 feat: add pot create form with Zod validation
7d67ca2 feat: add pot add/withdraw form with validation
6faf811 fix: mobile nav wrap and 48dp touch targets
3926465 fix: 48dp touch targets on transaction filters and pagination
58e1563 fix: 48dp touch targets on overview widget links
8790c0e fix: truncate long transaction names in overview
```
