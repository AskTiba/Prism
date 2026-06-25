# Project State

> Last updated: 2026-06-25 by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field | Value |
|---|---|
| Project name | Personal Finance App |
| Primary stack | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript |
| Repo / branch | local, no remote yet |
| Current milestone | Project bootstrap — skill files and state files created |
| Overall status | Green |

## 2. What Currently Works

| Feature | Verified by | Notes |
|---|---|---|
| Skill hub structure (`~/dev/skill5.0/`) | Manual review | Universal AI skill directory with README, MANIFEST, source SKILLs, templates |
| Project AGENTS.md | Written | opencode project instructions referencing both skills |
| Project GEMINI.md | Written | Self-contained Gemini instructions with inlined protocol |
| opencode.jsonc | Written | Config with skill/agent setup |
| `.devpartner/*.md` files | Written | Bootstrap state files with initial architecture decision |
| `.opencode/skills/` | Copy from source | Both skills registered for opencode discovery |

> Anything not yet verified belongs in section 3 as "implemented, unverified" —
> not here.

## 3. In Progress

**Current feature/task:** Project scaffold — initialize Turborepo monorepo

**Unit decomposition:**

- [ ] Unit 1 — Turborepo init with Next.js + Prisma + shared packages
- [ ] Unit 2 — Prisma schema matching data.json structure + seed script
- [ ] Unit 3 — tRPC router setup with initial queries
- [ ] Unit 4 — Layout shell with responsive sidebar navigation
- [ ] Unit 5 — Overview page
- [ ] Unit 6 — Transactions page (pagination, search, sort, filter)
- [ ] Unit 7 — Budgets page (CRUD + progress + latest transactions)
- [ ] Unit 8 — Pots page (CRUD + progress + add/withdraw)
- [ ] Unit 9 — Recurring Bills page (list + search + sort + status)
- [ ] Unit 10 — Form validation (Zod + error messages)
- [ ] Unit 11 — Tests (Vitest + RTL + MSW)

| Active unit | Files involved | Exact next step | Verification owed |
|---|---|---|---|
| Unit 1 | `package.json`, `turbo.json`, `apps/web/`, `packages/db/`, `packages/shared/` | Initialize Turborepo and install dependencies | `turbo dev` starts without errors |

> **Session boundary note**: If the active unit is incomplete, use
> `git stash push -m "description"` (preferred) rather than a `wip:` commit. Record the
> stash description here so the next session knows exactly where to resume. If a `wip:`
> commit was used instead, note it here — it must be amended before any push.

## 4. Known Issues / Blocked

| Issue | Impact | Blocked on | Priority |
|---|---|---|---|
| — | — | — | — |

## 5. Up Next (Roadmap-aligned)

1. Initialize Turborepo project scaffold (Unit 1)
2. Define Prisma schema and seed (Unit 2)
3. Set up tRPC router (Unit 3)
4. Build layout and navigation (Unit 4)
5. Implement all five pages (Units 5-9)

## 6. Conventions & Environment

| Aspect | Convention |
|---|---|
| Formatter / linter | Prettier + ESLint (Turbo-managed) |
| Type-check command | `turbo typecheck` |
| Test framework / command | Vitest + RTL + MSW via `turbo test` |
| Test strategy | Integration-focused (Testing Trophy): RTL + userEvent + MSW for components, Vitest for pure functions, Playwright for E2E |
| Browser/platform support | Last 2 versions of evergreen browsers |
| Accessibility conformance target | WCAG 2.2 AA |
| Branching model | Feature branches from main |
| Env setup command | `npm install` at root |
| Secrets location | `.env` in project root |
| Key architectural pattern | tRPC router → TanStack Query → React components; Prisma for data access |

## 7. Checkpoints / Rollback Points

| Date | Tag / Branch | Created Before | Still Relevant? |
|---|---|---|---|
| — | — | — | — |

> Created before any hard-to-undo operation (migrations, bulk delete, force-push,
> large refactors) per the Pre-Risk Checkpoints rule. Remove rows once the change
> they protect is confirmed stable and the checkpoint is no longer needed.

## 8. Open Questions for User

- Confirm the name of the default/main branch (`main` or `master`)?
