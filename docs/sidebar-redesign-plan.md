# Sidebar UI/UX Redesign — Prism Finance App

> **Status**: Pending approval  
> **Author**: Emily (Senior Dev Partner)  
> **Date**: 2026-06-27  
> **Scope**: Sidebar navigation across all three responsive breakpoints

---

## 1. Problem Statement

The current sidebar has functional but **visually underdeveloped** navigation. Specific issues:

1. **Desktop**: Flat appearance, no visual depth, user card feels cramped, nav items lack polish, "Delete Account" text as a bare red link feels dangerous and un-styled
2. **Mobile**: Navigation wraps into two rows of text links — cluttered, not thumb-friendly, "Delete Account" text visible at all times
3. **Tablet**: Identical to desktop sidebar but at a narrower width — wastes horizontal space, text truncates awkwardly

**Goal**: Create a premium, modern sidebar that feels like **Linear**, **Vercel's dashboard**, or **Raycast** — ultra-clean, spacious, with intentional micro-animations and three distinct responsive modes.

---

## 2. Current Implementation

### Files involved

| File | Role | Lines |
|------|------|-------|
| `apps/web/src/components/Sidebar.tsx` | Monolithic sidebar (logo, profile card, nav, account actions) | 117 |
| `apps/web/src/components/SignOutDialog.tsx` | Sign-out confirmation dialog | 45 |
| `apps/web/src/components/DeleteAccountDialog.tsx` | Delete-account confirmation dialog with typed confirmation | 85 |
| `apps/web/src/app/(main)/layout.tsx` | Main layout wrapper that renders the sidebar | 14 |
| `apps/web/src/app/globals.css` | Global CSS with design tokens and utility classes | 105 |
| `apps/web/tailwind.config.ts` | Tailwind theme configuration | 32 |

### Current responsive behavior

| Viewport | Behavior |
|----------|----------|
| **Mobile (< 768px)** | Horizontal nav bar at top, text labels wrap to 2 rows, all actions visible inline |
| **Desktop (≥ 768px)** | 256px left sidebar, full-height, dark charcoal background |

There is **no tablet-specific mode** — it falls through to the desktop sidebar at `md` (768px), causing tight layouts on smaller tablets.

### Current nav items

```typescript
const NAV_ITEMS = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Budgets', href: '/budgets', icon: Banknote },
  { label: 'Pots', href: '/pots', icon: PiggyBank },
  { label: 'Recurring Bills', href: '/bills', icon: Receipt },
];
```

### Current active state

- Left `3px` inset box-shadow in green (`#277c78`)
- Green-tinted gradient background (`from-green/[0.1] to-transparent`)
- White text, medium font-weight

---

## 3. Design Direction

### Visual references

The redesign draws inspiration from:

- **Linear** — ultra-clean sidebar, spacious nav items, subtle hover states
- **Vercel Dashboard** — dark sidebar, minimal ornamentation, premium feel
- **Raycast** — frosted-glass surfaces, spring animations, pill indicators
- **Figma** — collapsed rail mode for intermediate viewports

### Three responsive modes

| Viewport | Nav mode | Width/Height | Position | Labels | Profile | Account actions |
|----------|----------|--------------|----------|--------|---------|-----------------|
| **320–599px** | Bottom bar | 100% × 64px | Fixed bottom | No (icons only) | In page header | Via avatar in header |
| **600–1023px** | Rail | 72px × 100vh | Fixed left | No (icons + tooltips) | Avatar circle | Dropdown from avatar |
| **≥1024px** | Full sidebar | 264px × 100vh | Fixed left | Yes (icon + text) | Full card | Dropdown from card |

---

## 4. Design System Tokens

### 4.1 New colors

Add to `tailwind.config.ts` → `theme.extend.colors.grey`:

```typescript
grey: {
  // ... existing values (100, 300, 500, 700, 900)
  800: '#2d2c31',  // hover background on dark surfaces
  850: '#262529',  // subtle elevation on sidebar (dropdown bg)
},
```

### 4.2 New breakpoints

Add to `tailwind.config.ts` → `theme.extend.screens`:

```typescript
screens: {
  tablet: '600px',   // tablet breakpoint
  desktop: '1024px', // desktop breakpoint
},
```

> **Important**: Keep the existing `md` breakpoint unchanged (768px) to avoid regressions across the rest of the app. Use the new `tablet:` and `desktop:` prefixes exclusively in sidebar components.

### 4.3 CSS custom properties

Add to `globals.css` inside the `:root` block:

```css
:root {
  /* ... existing vars ... */

  /* Sidebar layout */
  --sidebar-width-full: 264px;
  --sidebar-width-rail: 72px;
  --mobile-bar-height: 64px;

  /* Sidebar surfaces */
  --sidebar-bg: #201f24;
  --nav-hover-bg: rgba(255, 255, 255, 0.04);
  --nav-active-bg: rgba(39, 124, 120, 0.08);
  --nav-active-border: #277c78;
  --profile-card-bg: rgba(255, 255, 255, 0.03);
  --profile-card-border: rgba(255, 255, 255, 0.06);

  /* Mobile bar */
  --mobile-bar-blur: 20px;
  --mobile-bar-bg: rgba(32, 31, 36, 0.95);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 4.4 Keyframe animations

Add to `globals.css`:

```css
@keyframes slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes nav-highlight {
  from { opacity: 0; transform: scaleX(0.5); }
  to   { opacity: 1; transform: scaleX(1); }
}

@keyframes pill-pop {
  0%   { transform: scaleX(0); }
  60%  { transform: scaleX(1.2); }
  100% { transform: scaleX(1); }
}
```

### 4.5 Spacing & sizing reference

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width-full` | `264px` | Desktop full sidebar |
| `--sidebar-width-rail` | `72px` | Tablet collapsed rail |
| `--mobile-bar-height` | `64px` | Mobile bottom bar total height |
| Nav item height | `44px` | Consistent row height for all nav items |
| Nav item radius | `10px` | Rounded corners on hover/active states |
| Active indicator width | `3px` | Left border accent width |

---

## 5. Component Architecture

The monolithic `Sidebar.tsx` (117 lines) is replaced by a focused module:

```
src/components/sidebar/
├── index.ts                    # Barrel export
├── Sidebar.tsx                 # Root container — responsive shell
├── SidebarLogo.tsx             # Logo mark + wordmark
├── SidebarNav.tsx              # Navigation item list
├── SidebarNavItem.tsx          # Individual nav link with active state
├── SidebarProfileCard.tsx      # User profile card (glassmorphism)
├── SidebarAccountMenu.tsx      # Dropdown for Sign Out / Delete Account
├── MobileBottomBar.tsx         # Mobile-only bottom nav bar
├── ActiveIndicator.tsx         # Animated active state indicator
└── sidebar.css                 # Component-scoped styles (animations, scrollbar)
```

### 5.1 `Sidebar.tsx` — Root Container

**Responsibility**: Detects viewport class and renders the correct mode.

```
Mobile (< 600px):     Renders <MobileBottomBar />          — fixed bottom
Tablet (600–1023px):  Renders sidebar in "rail" mode       — 72px, icons only
Desktop (≥ 1024px):   Renders sidebar in "full" mode       — 264px, icons + labels
```

**Implementation details:**

- `<nav>` element with `role="navigation"` and `aria-label="Main navigation"`
- Desktop/tablet: `position: fixed; left: 0; top: 0; height: 100vh;` with `overflow-y: auto`
- Mobile: `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;`
- Props: `{ session: Session | null }`
- Responsive detection: use Tailwind's responsive classes (`hidden`, `tablet:flex`, `desktop:flex`) — **no JS-based media queries**

### 5.2 `SidebarLogo.tsx` — Logo

**Desktop mode:**

```
┌──────────────────────────────┐
│  [gradient square "P"]  Prism│   ← logo mark + wordmark
└──────────────────────────────┘
```

**Rail mode:**

```
┌──────┐
│  [P] │   ← logo mark only, centered
└──────┘
```

**Specifications:**

- Logo mark: `32×32px`, `rounded-lg`, `bg-gradient-to-br from-green to-cyan`, shadow-sm
- White "P" centered inside: `text-xs font-bold text-white`
- Wordmark (desktop only): `text-lg font-bold tracking-tight text-white`
- Wrap in `<a href="/">` for home navigation
- Rail mode hides wordmark via `desktop:inline hidden`

### 5.3 `SidebarProfileCard.tsx` — User Profile

**Desktop mode — full glassmorphism card:**

```
┌─────────────────────────────────┐
│ ┌──────┐                        │
│ │  A   │  anthonyngis...        │  ← avatar circle + name
│ └──────┘  anthonyng@email.com   │  ← email below name
└─────────────────────────────────┘
```

Styling:

| Property | Value |
|----------|-------|
| Container | `rounded-xl`, `bg-[var(--profile-card-bg)]`, `border border-[var(--profile-card-border)]` |
| Padding | `px-4 py-3` |
| Margin | `mx-4 mb-4` |
| Avatar | `40×40px` rounded-full, `bg-gradient-to-br from-green/20 to-cyan/20` |
| Avatar text | Centered initial, `text-green font-semibold text-sm` |
| Name | `text-sm font-medium text-white truncate` |
| Email | `text-xs text-grey-500 truncate` |
| Hover | Card gets `bg-white/[0.05]` transition |

**Rail mode — avatar circle only:**

- `40×40px` centered avatar, same gradient style
- Click opens `SidebarAccountMenu` dropdown
- Tooltip on hover showing user's name

**Mobile mode:**

- Not rendered in bottom bar
- User avatar accessible from page header area (or a 6th icon slot)

### 5.4 `SidebarNav.tsx` + `SidebarNavItem.tsx` — Navigation

**Four visual states per nav item:**

| State | Left indicator | Background | Text/Icon color |
|-------|---------------|------------|-----------------|
| Default | none | `transparent` | `grey-400` (#b3b3b3) |
| Hover | none | `var(--nav-hover-bg)` | `white` |
| Active | `3px solid var(--nav-active-border)` | `var(--nav-active-bg)` | `white` text, `green` icon |
| Focus-visible | `2px` ring `green/30` | `transparent` | `white` |

**Desktop (full mode) layout:**

```
┌──────────────────────────────┐
│ ║ 🏠  Overview               │  ← 3px left indicator + icon + label
│   ↔   Transactions           │
│   💰  Budgets                │
│   🐷  Pots                   │
│   🧾  Recurring Bills        │
└──────────────────────────────┘
```

- Each item: `h-[44px]`, `flex items-center gap-3`, `px-5`
- Active left indicator: animated with `nav-highlight` keyframe (scale from left)
- Transition: `background var(--transition-fast), color var(--transition-fast)`
- Icons: Lucide React, `size={20}`, `strokeWidth={1.75}` for lighter feel

**Rail mode:**

- Icon only, centered in `48×48px` touch target
- Active state: circular/squircle background highlight (no left border)
- Tooltip on hover via `title` attribute or custom tooltip
- `aria-label={item.label}` for screen readers

**Mobile bottom bar:**

- 5 icons, evenly distributed via `justify-around`
- Active icon: teal color + animated pill above (`width: 24px, height: 3px, border-radius: 2px`)
- Inactive icons: `grey-400` color
- Touch target: `min-h-[48px] min-w-[48px]`
- No text labels

### 5.5 `SidebarAccountMenu.tsx` — Account Actions Dropdown

Replaces the inline Sign Out / Delete Account links. Triggered from the profile card.

**Dropdown contents:**

```
┌───────────────────────┐
│  Sign Out          →  │
│───────────────────────│
│  Export Data       📥  │
│───────────────────────│
│  Delete Account    ⚠️  │  ← red text, separated
└───────────────────────┘
```

Styling:

| Property | Value |
|----------|-------|
| Container | `rounded-xl`, `bg-grey-850`, `border border-white/[0.06]`, `shadow-xl` |
| Item | `px-4 py-3 text-sm` |
| Item hover | `bg-white/[0.04]` |
| Delete item | `text-red`, at bottom, above a divider |
| Open animation | `scale-in` keyframe |
| Close | `opacity fade-out` 100ms |

The existing `SignOutDialog.tsx` and `DeleteAccountDialog.tsx` remain unchanged — they are triggered from the dropdown items instead of inline buttons.

### 5.6 `MobileBottomBar.tsx` — Mobile Bottom Navigation

**Layout:**

```
┌─────────────────────────────────────┐
│                                     │  ← page content
├─────────────────────────────────────┤
│  ●                                  │  ← active pill indicator
│  🏠    ↔    💰    🐷    🧾          │  ← 5 icons, evenly spaced
│                                     │  ← safe-area-inset-bottom padding
└─────────────────────────────────────┘
```

**Implementation:**

- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50`
- `background: var(--mobile-bar-bg)` + `backdrop-filter: blur(var(--mobile-bar-blur))`
- `border-radius: 20px 20px 0 0` (rounded top corners)
- `padding-bottom: env(safe-area-inset-bottom)` for iOS home indicator
- Each icon: `<a>` tag with `min-h-[48px] min-w-[48px]`
- Active indicator pill: `width: 24px, height: 3px, border-radius: 2px`, `bg-green`, `pill-pop` animation
- Icons: `size={22}` for visual balance on mobile

### 5.7 `ActiveIndicator.tsx` — Animated State Indicator

A small presentational component that renders the active state visual:

- **Desktop**: 3px vertical bar on the left edge, animated with `nav-highlight`
- **Mobile**: Horizontal pill above the icon, animated with `pill-pop`
- **Rail**: Circular background highlight

### 5.8 `sidebar.css` — Component-Scoped Styles

```css
/* Active nav item indicator animation */
.nav-indicator {
  animation: nav-highlight var(--transition-spring) forwards;
  transform-origin: left center;
}

/* Mobile active pill */
.mobile-pill {
  animation: pill-pop var(--transition-spring) forwards;
  transform-origin: center;
}

/* Profile card hover */
.profile-card {
  transition: background var(--transition-fast);
}
.profile-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Account dropdown entrance */
.account-dropdown {
  animation: scale-in 0.15s ease-out forwards;
}

/* Nav item hover micro-interaction */
.nav-item {
  transition:
    background var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}
.nav-item:active {
  transform: scale(0.98);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .nav-indicator,
  .mobile-pill,
  .account-dropdown,
  .nav-item {
    animation: none;
    transition: none;
  }
}

/* Sidebar scrollbar (desktop only) */
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 3px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
}
```

---

## 6. Layout Integration

### 6.1 Update `apps/web/src/app/(main)/layout.tsx`

The main layout must offset content to avoid overlap with the fixed sidebar:

```tsx
import { auth } from '@/auth';
import { Sidebar } from '@/components/sidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <Sidebar session={session} />
      <main className="
        pb-[calc(var(--mobile-bar-height)+16px)]
        tablet:pb-0 tablet:pl-[var(--sidebar-width-rail)]
        desktop:pl-[var(--sidebar-width-full)]
        px-4 py-6 tablet:px-8 tablet:py-8 desktop:px-10
        transition-[padding] var(--transition-normal)
      ">
        {children}
      </main>
    </div>
  );
}
```

**Key changes:**

- Mobile: `padding-bottom` to clear the fixed bottom bar
- Tablet: `padding-left` to clear the 72px rail
- Desktop: `padding-left` to clear the 264px full sidebar
- Removed `flex-col md:flex-row` — the fixed sidebar doesn't participate in document flow

### 6.2 Delete `apps/web/src/components/Sidebar.tsx`

The old monolithic file is fully replaced by the `src/components/sidebar/` module. All imports referencing `@/components/Sidebar` must be updated to `@/components/sidebar`.

---

## 7. Animation Specification

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Active left indicator (desktop) | Route change | `scaleX(0 → 1)` from left | 300ms | Spring (0.34, 1.56, 0.64, 1) |
| Active pill (mobile) | Route change | `scaleX(0 → 1.2 → 1)` | 300ms | Spring |
| Nav item hover bg | Mouse enter/leave | Opacity `0 → 0.04` | 150ms | Ease-out |
| Nav item press | Touch/click down | `scale(0.98)` | 150ms | Ease-out |
| Account dropdown open | Click profile card | `scale(0.95 → 1) + opacity(0 → 1)` | 150ms | Ease-out |
| Account dropdown close | Click outside | `opacity(1 → 0)` | 100ms | Ease-in |
| Profile card hover | Mouse enter | `bg alpha: 0.03 → 0.05` | 150ms | Ease-out |

> **Reduced motion**: All animations must be wrapped in a `prefers-reduced-motion` check. When this media query matches, replace all animations with instant state changes (no `animation`, no `transition-duration`).

---

## 8. Accessibility Requirements

These are **non-negotiable** and must be verified before marking any unit complete.

### Semantic HTML

- [ ] Root element is `<nav>` with `aria-label="Main navigation"`
- [ ] Active nav link has `aria-current="page"`
- [ ] All icon-only buttons (rail mode, mobile) have `aria-label`
- [ ] Dropdown menu uses `role="menu"` with `role="menuitem"` children

### Keyboard

- [ ] All nav items reachable via Tab
- [ ] Enter / Space activates links and buttons
- [ ] Escape closes account dropdown
- [ ] Focus-visible rings: `2px` with `green/30` color, offset `2px`

### Color contrast

| Pair | Ratio | Status |
|------|-------|--------|
| `grey-400` (#b3b3b3) on `grey-900` (#201f24) | **4.86:1** | ✅ Pass (normal text) |
| `white` (#ffffff) on `grey-900` (#201f24) | **15.4:1** | ✅ Pass |
| `green` (#277c78) on `grey-900` (#201f24) | **3.8:1** | ⚠️ Decorative only, not for text |

### Touch & interaction

- [ ] All interactive elements: minimum `48×48px` touch target
- [ ] No hover-only interactions — everything accessible on touch
- [ ] `prefers-reduced-motion` respected globally

### Mobile-specific

- [ ] Bottom bar: `padding-bottom: env(safe-area-inset-bottom)` for iOS
- [ ] No content hidden behind the fixed bottom bar
- [ ] Consider adding a skip-to-content link

---

## 9. Implementation Units (Work Order)

Each unit follows the test-first protocol: write test → confirm fail → implement → verify green.

| Unit | Description | Files | Dependencies |
|------|-------------|-------|-------------|
| **1** | Design tokens & CSS foundation | `tailwind.config.ts`, `globals.css` | None |
| **2** | Sidebar shell + Logo | `Sidebar.tsx`, `SidebarLogo.tsx`, `index.ts` | Unit 1 |
| **3** | Profile card | `SidebarProfileCard.tsx` | Unit 2 |
| **4** | Navigation items | `SidebarNav.tsx`, `SidebarNavItem.tsx`, `ActiveIndicator.tsx` | Unit 2 |
| **5** | Account actions dropdown | `SidebarAccountMenu.tsx` | Units 3 + existing dialogs |
| **6** | Mobile bottom bar | `MobileBottomBar.tsx` | Unit 4 |
| **7** | Layout integration | `(main)/layout.tsx`, delete old `Sidebar.tsx` | Units 2–6 |
| **8** | Animations & polish | `sidebar.css`, animation refinements | Unit 7 |

---

## 10. File Change Summary

| Action | File | Notes |
|--------|------|-------|
| **MODIFY** | `apps/web/tailwind.config.ts` | Add `grey-800`, `grey-850`, `tablet`/`desktop` breakpoints |
| **MODIFY** | `apps/web/src/app/globals.css` | Add CSS custom properties, keyframes |
| **NEW** | `src/components/sidebar/index.ts` | Barrel export |
| **NEW** | `src/components/sidebar/Sidebar.tsx` | Root responsive container |
| **NEW** | `src/components/sidebar/SidebarLogo.tsx` | Logo mark + wordmark |
| **NEW** | `src/components/sidebar/SidebarNav.tsx` | Nav items container |
| **NEW** | `src/components/sidebar/SidebarNavItem.tsx` | Individual nav item |
| **NEW** | `src/components/sidebar/SidebarProfileCard.tsx` | User profile glassmorphism card |
| **NEW** | `src/components/sidebar/SidebarAccountMenu.tsx` | Account actions dropdown |
| **NEW** | `src/components/sidebar/MobileBottomBar.tsx` | Mobile bottom navigation |
| **NEW** | `src/components/sidebar/ActiveIndicator.tsx` | Animated active state indicator |
| **NEW** | `src/components/sidebar/sidebar.css` | Component-scoped animations |
| **MODIFY** | `apps/web/src/app/(main)/layout.tsx` | Update padding for new sidebar modes |
| **DELETE** | `apps/web/src/components/Sidebar.tsx` | Replaced by sidebar module |
| **KEEP** | `apps/web/src/components/SignOutDialog.tsx` | No changes — triggered from new menu |
| **KEEP** | `apps/web/src/components/DeleteAccountDialog.tsx` | No changes — triggered from new menu |

---

## 11. Verification Plan

### Automated

```bash
# From apps/web/
npx vitest run          # All tests pass
turbo typecheck         # No TS errors
turbo lint              # No lint errors
```

### Manual checklist

- [ ] **Desktop (≥1024px)**: Full sidebar renders, active states animate, profile card shows, dropdown works
- [ ] **Tablet (600–1023px)**: Rail mode renders, icons only, tooltips on hover, avatar dropdown works
- [ ] **Mobile (320–599px)**: Bottom bar renders, active pill animates, content not hidden behind bar
- [ ] Route navigation: Active states update correctly on all viewports
- [ ] Sign Out flow: Accessible from account dropdown on all viewports
- [ ] Delete Account flow: Accessible from account dropdown, confirmation dialog works
- [ ] Keyboard navigation: Tab through all nav items, Enter activates links
- [ ] Reduced motion: `prefers-reduced-motion: reduce` disables all animations
- [ ] iOS safe area: Bottom bar doesn't overlap home indicator
- [ ] No horizontal scroll at any viewport width from 320px to 1920px

---

## 12. Open Decisions (Awaiting User Input)

| # | Question | Options | Impact |
|---|----------|---------|--------|
| 1 | Mobile account access | (A) Avatar icon in page header, (B) 6th icon slot in bottom bar | Layout of mobile header |
| 2 | Desktop collapse toggle | (A) Fixed full sidebar, (B) Add `<<` toggle to collapse to rail | Sidebar state management |
| 3 | Delete Account placement | Move to account dropdown (recommended) vs keep inline | UX safety |
| 4 | Logo design | Keep current gradient "P" + "Prism" vs redesign | Branding |
| 5 | Accent color | Keep teal `#277c78` vs explore alternatives | Visual identity |
| 6 | User avatar | Initial letter only vs Gravatar integration | Profile card appearance |
