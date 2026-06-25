# Project State

> Last updated: 2026-06-25 21:00 by Emily (Senior Dev Partner)
> This file is the source of truth for project continuity across sessions.

## 1. Project Snapshot

| Field | Value |
|---|---|
| Project name | Personal Finance App |
| Primary stack | Turborepo + Next.js App Router + Prisma + SQLite + tRPC + Tailwind CSS + TypeScript |
| Repo / branch | main (local, no remote) |
| Current milestone | Scaffold: root config committed — apps/web next |
| Overall status | Green |

## 2. What Currently Works

| Feature | Verified by | Notes |
|---|---|---|
| Root workspace config | `package.json`, `turbo.json`, `.gitignore`, `.prettierrc` | Monorepo foundation committed |
| AI tooling files | `AGENTS.md`, `GEMINI.md`, `opencode.jsonc`, `.opencode/skills/`, `.devpartner/` | All AI integration files committed |
| Skill hub structure (`~/dev/skill5.0/`) | Manual review | Universal AI skill directory — updated with mandatory work loop |

> Anything not yet verified belongs in section 3 as "implemented, unverified" —
> not here.

## 3. In Progress

**Current feature/task:** apps/web scaffold — Next.js App Router + Tailwind CSS

**Unit decomposition:**

- [x] Unit 1 — Root workspace config (package.json, turbo.json, .gitignore, .prettierrc) + AI tooling files
- [x] Unit 2 — apps/web: package.json, next.config.ts, tailwind.config.ts, tsconfig.json, postcss.config.js
- [ ] Unit 3 — apps/web: Root layout + global CSS + app/page.tsx
- [ ] Unit 4 — packages/db: Prisma schema + client
- [ ] Unit 5 — packages/shared: Types + Zod schemas
- [ ] Unit 6 — Install dependencies + verify `turbo dev`
- [ ] Unit 7 — Prisma schema matching data.json structure + seed script
- [ ] Unit 8 — tRPC router setup with initial queries
- [ ] Unit 9 — Layout shell with responsive sidebar navigation
- [ ] Unit 10 — Overview page
- [ ] Unit 11 — Transactions page (pagination, search, sort, filter)
- [ ] Unit 12 — Budgets page (CRUD + progress + latest transactions)
- [ ] Unit 13 — Pots page (CRUD + progress + add/withdraw)
- [ ] Unit 14 — Recurring Bills page (list + search + sort + status)
- [ ] Unit 15 — Form validation (Zod + error messages)
- [ ] Unit 16 — Tests (Vitest + RTL + MSW)

| Active unit | Files involved | Exact next step | Verification owed |
|---|---|---|---|
| Unit 2 | `apps/web/package.json`, `apps/web/next.config.ts`, `apps/web/tailwind.config.ts`, `apps/web/tsconfig.json`, `apps/web/postcss.config.js` | Write apps/web config files — one at a time | NPM install completes, no build errors |

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
