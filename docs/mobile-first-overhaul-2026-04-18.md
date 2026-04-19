# Mobile-First Overhaul — April 18, 2026

> **Session:** Full mobile-first optimization pass on rr-sc-website
> **Branch:** `feature/mobile-first-overhaul` → merged to `main`
> **Squash commit:** `7d1ccaa`
> **Docs commit:** `e0b49f4`
> **Production deploy:** `rr-sc-website-9fkfs2sq7-sc-roofing.vercel.app` (Ready in 27s)
> **Live URL:** https://rr-sc-website.vercel.app

## Process

Ran this as an orchestrated team: 1 read-only audit agent (`vercel:performance-optimizer`) → 4 parallel implementation agents on disjoint files → verification → PR → hotfix → merge. Worked on feature branch `feature/mobile-first-overhaul`.

## What shipped

### Images (19 raw `<img>` → `next/image`)
- Homepage: 8 migrations, hero gets `priority` + responsive srcset (8 sizes, 640→3840w) preloaded
- `PageHero` in `shared.tsx` (used on every sub-page — the sub-page LCP element) migrated + `priority`
- ChatWidget: 5 giraffe mascot avatars migrated using `StaticImageData` (auto blur placeholder)
- Portfolio, About, location-detail, ridge-logo decorator — all swapped
- Effect: rendered HTML now has ~23 `_next/image` markers on homepage + hero preload link

### Accessibility / mobile UX
- Header tap targets bumped to `min-h/min-w [44px]` (hamburger, phone CTA, theme toggle, dropdown children) — WCAG 2.5.5 / iOS HIG
- Hamburger: `aria-expanded={mobileOpen}` + state-aware `aria-label` + `aria-controls="mobile-nav"`
- Global `@media (prefers-reduced-motion: reduce)` neutralizes all animation/transition durations (WCAG 2.3.3)
- `FadeIn` uses `useReducedMotion()` to skip animation for affected users
- `.ken-burns` hero zoom disabled on viewports ≤ 768px (GPU cost)

### Viewport stability + paint
- 4 `vh → svh` swaps (homepage hero, `PageHero`, portfolio modal `max-h-[90vh]`, materials hero) — fixes iOS Safari URL-bar collapse causing layout jump
- Removed 1.5s `motion.h1` fade on `PageHero` — h1 (sub-page LCP candidate) now paints at final position on frame 1
- `viewport` export in `layout.tsx` with `themeColor` light `#ffffff` / dark `#000000` via `prefers-color-scheme` media queries, `colorScheme: "light dark"`, `width: device-width`, `initialScale: 1` — iOS Safari address bar tints correctly
- `<link rel="preconnect">` + `dns-prefetch` to `app.roofle.com` — ~150ms faster widget handshake on 4G

### Collision fix
- `ChatWidget` `fixed bottom-4 right-4` → `bottom-24 md:bottom-4 right-4` — giraffe button clears Roofle's floating "Get Instant Roof Quote" on mobile; desktop unchanged

## The hotfix (worth understanding)

Preview deploy console threw `Uncaught SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` — not on prod. Root cause: `FadeIn` swapped rendered element types (`<div>` vs `<motion.div>`) based on `useReducedMotion()`. That hook can return different values between SSR and the first client hydration pass. **React 19's strict hydration reconciler cannot swap element types across renders** — it threw during commit.

Fix: keep `<motion.div>` constant in both branches; gate animation props instead (`initial={false}`, `duration={0}` when reduced motion). This is framer-motion's documented pattern. Pushed as `81b6a87`, preview re-verified clean.

## Verification chain

- All 4 agents reported `tsc --noEmit` clean
- `npm run build` — 73 static pages, no warnings
- 5 routes smoke-tested via curl (200 OK)
- Rendered HTML greps: theme-color (×2), preconnect, hero preload, 405 `_next/image` refs
- PR #1 opened with full test plan + rollback
- Vercel preview built; domain-allowlist issue ruled out as non-regression (Roofle widget missing on preview is expected for unrecognized hosts)
- Hotfix committed + re-verified before merge
- Squash-merged as `7d1ccaa` → `origin/main`
- Mirrored to `client/main`
- Prod deploy `9fkfs2sq7` Ready in 27s; live signals confirmed in prod HTML

## Deferred (separate tickets)

Flagged in PR #1 body as future work — each is a design or refactor decision that warrants its own pass:

1. Convert 6 `"use client"` content pages to server components (removes framer-motion from their critical JS)
2. Trim `FadeIn` 1.5s duration (design feel decision)
3. Remove Header `fadeScrollTo` 270ms white overlay on anchor nav
4. `lucide-react` ^1.7.0 version verification / upgrade
5. Playfair Display font weight trim
6. Header logo aspect ratio vs source dimensions check

## Files touched (13 total)

Source:
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/about/AboutContent.tsx`
- `src/app/areas-we-serve/[slug]/location-detail-content.tsx`
- `src/app/materials-comparison/materials-compare-content.tsx`
- `src/app/portfolio/PortfolioContent.tsx`
- `src/components/Header.tsx`
- `src/components/ChatWidget.tsx`
- `src/components/FadeIn.tsx`
- `src/components/shared.tsx`

Docs:
- `project-status.md`
- `BRIDGE_STATUS.md`

## Commits on main

- `7d1ccaa` perf: mobile-first overhaul — next/image, tap targets, reduced-motion, svh (#1)
- `e0b49f4` docs: capture mobile-first overhaul — April 18 session
