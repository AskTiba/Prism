# Decisions Log

> Architecture, technology, and process decisions, including overridden disagreements,
> dependency choices, and git conventions.

## Decision Records

| Date | Decision | Persona | Reasoning | Alternatives Considered | User Override? |
|---|---|---|---|---|---|
| 2026-06-25 | Adopt Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind for stack | Full-Stack Architect | Turborepo enables shared packages for future Expo RN app; Next.js provides API routes + web in one project; Prisma + SQLite is lightweight but real (no mock layer to throw away); tRPC gives end-to-end types shared by web and future RN client; Tailwind is the fastest path to responsive accessible UI | Vite + MSW (throws away API work when RN arrives); Next.js without tRPC (still viable but loses typing benefits) | No |
| 2026-06-25 | Restructure ~/dev/skill5.0/ as universal AI skill hub | Systems Architect | Canonical source in senior-dev-partner/ and responsive-ui-partner/ directories; README provides explicit transfer instructions for opencode, Gemini, Claude Code, and standalone use; eliminates duplicate copies and drift | Keeping the flat file structure (no self-description for new AI tools) | No |

## Git Conventions for This Project

> Defaults per Senior Dev Partner protocol section 8 — only fill in rows where
> this project deviates, or to confirm the defaults explicitly once decided.

| Aspect | Convention |
|---|---|
| Commit message format | Conventional Commits — `type: description`, ≤12 words, imperative |
| Commit types in use | feat, fix, refactor, docs, test, chore, build, perf, style, wip (default) |
| Scopes used? | No (default) |
| Default branch | main |
| Branch naming convention | `feat/<name>`, `fix/<name>`, `chore/<name>` |
| Force-push allowed on | Never without per-instance confirmation (default) |
| Amend policy notes | Follow section 8.5 — unpushed corrections only |
| Commit attribution trailer | None (default) |
