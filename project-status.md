# Restoration Roofing SC — Project Status

> **Client:** Tom Davis
> **Repo:** github.com/Agentic-Person/rr-sc-website
> **Previous Repo (Vite SPA):** github.com/SCROOF1/restorationroofing
> **Live URL:** https://rr-sc-website.vercel.app
> **Vercel Team:** sc-roofing
> **Last updated:** April 18, 2026

---

## Last Activity — April 18, 2026

**Session summary:** Full mobile-first overhaul executed by a team of agents — Phase 1 deep perf audit followed by 4 parallel implementation agents on disjoint files, then a hotfix commit for a React 19 hydration regression caught on the preview deploy. Shipped via feature branch + PR review flow to production. Phone-tested and confirmed live.

**Work completed:**
- **19 raw `<img>` tags migrated to `next/image`** across `page.tsx` (8, incl. hero LCP), `shared.tsx` (PageHero + ridge-logo decorator), `ChatWidget.tsx` (5 giraffe avatars), `PortfolioContent.tsx` (2), `AboutContent.tsx`, `location-detail-content.tsx` — rendered homepage HTML now includes a `<link rel="preload" as="image">` with 8 responsive sizes (640→3840w) pointing at the CloudFront hero, and ~23 `_next/image` optimization markers
- **Tap targets bumped to 44×44 minimum** (WCAG 2.5.5 / iOS HIG) on Header hamburger, mobile phone CTA, theme toggle, and mobile dropdown children. Hamburger now has state-aware `aria-label` + `aria-expanded` + `aria-controls`
- **`prefers-reduced-motion` support added globally** via `globals.css` media query (neutralizes all `animation-duration`/`transition-duration` for users with the OS setting on) + `FadeIn` component uses `useReducedMotion()` from framer-motion. `.ken-burns` zoom effect additionally gated off on viewports ≤ 768px (GPU-expensive on low-end Androids)
- **`vh` → `svh` swaps** on hero `min-h-[85vh]` (homepage), PageHero `min-h-[45vh]/50vh` (all sub-pages), portfolio modal `max-h-[90vh]`, materials-comparison hero — prevents iOS Safari URL-bar collapse from causing layout jump
- **`viewport` export added to `src/app/layout.tsx`** with `themeColor` for light (`#ffffff`) + dark (`#000000`) via `prefers-color-scheme` media queries (iOS Safari address bar tints correctly), `colorScheme: "light dark"`, `width: device-width`, `initialScale: 1`
- **`<link rel="preconnect">` + `<link rel="dns-prefetch">` to `app.roofle.com`** added to layout — saves ~150ms on Roofle widget handshake over 4G
- **LCP unblocked on sub-page hero** — removed 1.5s `motion.h1` fade on `PageHero` in `shared.tsx`; the `h1` (LCP element on every sub-page) now paints at final position on the first frame
- **ChatWidget/Roofle mobile collision resolved** — ChatWidget moved from `bottom-4` → `bottom-24 md:bottom-4` so the giraffe chat button clears Roofle's floating "Get Instant Roof Quote" button on phones; desktop unchanged
- **Hotfix: `FadeIn` React 19 hydration mismatch** — original implementation returned a plain `<div>` when `useReducedMotion()` was truthy and `<motion.div>` otherwise. `useReducedMotion()` can return different values between SSR and client hydration, and React 19's strict hydration reconciler cannot swap element types across renders — manifested as `Uncaught SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` on the Vercel preview (not present on prod). Fix: keep `<motion.div>` constant, gate animation props (`initial={false}`, `duration={0}`) instead — framer-motion's documented pattern
- **Workflow:** branched `feature/mobile-first-overhaul`, pushed to origin + client, opened PR #1 with full test plan + rollback instructions, Vercel auto-deployed preview, ran curl/build verification (73 static pages, `tsc` clean, 5 routes smoke-tested 200 OK), caught hydration regression via preview console, patched + re-pushed, merged via squash to `main`, mirrored main to `client` remote
- **Deferred items** (flagged in PR body, separate tickets): convert 6 `"use client"` content pages to server components (framer-motion bundle reduction), trim `FadeIn` 1.5s duration (design call), remove Header `fadeScrollTo` 270ms white overlay (behavior change), `lucide-react` upgrade, Playfair weight trim, Header logo aspect ratio verification

**Key commits:**
- `7d1ccaa` perf: mobile-first overhaul — next/image, tap targets, reduced-motion, svh (#1)

**Notes:**
- Production verified live: theme-color meta (light + dark), `_next/image` markers, roofle preconnect, Roofle widget back (domain allowlist matches)
- Feature branch `feature/mobile-first-overhaul` still exists on both remotes — safe to delete once retention window passes; commits are preserved in main history via the squash

---

## Previous Activity — April 17, 2026

**Session summary:** Diagnosed and fixed a critical Vercel deployment misconfiguration — the `rr-sc-website` Vercel project was silently connected to the old Vite SPA archive repo (`Agentic-Person/restorationroofing-sc`) instead of the Next.js repo (`Agentic-Person/rr-sc-website`). Every commit since the Next.js migration was being ignored, and the production URL was serving a stale Vite SPA build from the archive.

**Work completed:**
- **Vercel CLI installed** (`npm i -g vercel`) and authed as `jimihacks` on team `sc-roofing`
- **Root cause identified** — `vercel git connect` confirmed the project was bound to `Agentic-Person/restorationroofing-sc` (Vite archive). HTML inspection of `rr-sc-website.vercel.app` showed Vite-style `/assets/index-*.js` + `<div id="root">` instead of Next.js `_next/static/chunks/...`
- **Vercel project relinked** via API (`POST /v9/projects/:id/link`) to `Agentic-Person/rr-sc-website` on `main`. Required DELETE on existing link first since project was "already linked to a different repository"
- **Side effect: deploy hooks wiped** during relink — old hook URLs `prj_jgABxNWBIU98USh0Py4MkXCXJYPq/3Od4x8p5su` and `…/QcPRUiXCDI` are now dead. Going forward the GitHub integration auto-deploys, no hook needed
- **Production deploy verified** — `vercel deploy --prod` produced `dpl_Am5a7bFfiUsQ12fRXAgartshpAZe`; `rr-sc-website.vercel.app` now serves the Next.js build with the Roofle slideout in `<head>`
- **Stale alias / second project documented** — `td-rr-website` (project `prj_C14FFEZ1g3RyCo63zONpsxoV5HpT`, Vite framework preset) still exists on the team and should not be touched; it's the legacy build with its own `api/contact.ts` (Zod v3) that fails to compile under current code

**Why this happened:** the Next.js migration created the new Vercel project `rr-sc-website`, but the project's git connection was apparently pointed at the archive repo instead of the new repo. Because the framework preset was set to `nextjs` and deployments succeeded (against the wrong source), this went unnoticed for ~10 days. CLAUDE.md's note that "the GitHub integration auto-deploys on push to origin" was true *for the wrong repo*.

**Key commits:**
- `3fdfba5` feat: integrate Roofle RoofQuote PRO slideout widget site-wide

---

## Previous Activity — April 16, 2026

**Session summary:** Roofle RoofQuote PRO slideout widget integrated site-wide via root layout; Roofle install requirements verified (must load in `<head>`); hydration warning from browser extension suppressed.

**Work completed:**
- **Roofle RoofQuote PRO slideout integrated** (`src/app/layout.tsx`) — added `<script async src="https://app.roofle.com/roof-quote-pro-widget.js?id=zco42W_V9MeL04LBXPBx9">` to root layout so the slideout teaser appears on every page
- **Script placement verified against Roofle docs** — confirmed via Roofle install guide that the slideout variant *must* live in `<head>` (the embedded variant goes in `<body>`); first attempt used `next/script` strategy `afterInteractive` (renders before `</body>`), then `beforeInteractive` (errored under Next.js 16 / React 19 with "Encountered a script tag while rendering React component"), final solution uses a plain `<script async>` tag which React 19 automatically hoists into `<head>` and dedupes
- **Hydration warning fix** — added `suppressHydrationWarning` to `<body>` in root layout to silence ColorZilla extension's `cz-shortcut-listen="true"` attribute mismatch (extension modifies DOM before React hydrates)
- **Live verified in DevTools** — Roofle script confirmed present inside `<head>` via View Page Source; widget renders on right edge as expected

---

## Previous Activity — April 15, 2026

**Session summary:** Favicon replaced with branded ridge logo, deploy workflow fixed (GitHub integration only), marketing team brief prepared.

**Work completed:**
- **Favicon replaced** (`src/app/icon.png`, `src/app/favicon.ico`) — custom ridge logo now shows in browser tabs; went through three iterations: initial PNG-as-ICO (invalid magic bytes), orange-on-orange (no contrast), final orange ridge logo on black background; white background of source WebP removed via alpha thresholding before compositing; proper multi-size ICO built (16/32/48px frames with correct `00 00 01 00` header)
- **Deploy workflow fixed** (`CLAUDE.md`) — removed deploy hook from standard workflow; Vercel GitHub integration auto-deploys on every push to `origin main`; running hook simultaneously was causing duplicate deployments racing to set the production alias; new hook URL documented for reference only
- **New Vercel deploy hook confirmed** — tested hook `Pw4HMxoxvX` (project `prj_C14FFEZ1g3RyCo63zONpsxoV5HpT`), returned PENDING; superseded by GitHub integration which is now the sole deploy trigger
- **Marketing team brief created** (`docs/marketing-team-brief.md`) — full technical handoff document covering tech stack, SEO foundation, structured data, URL structure, GA4 measurement ID, and pre-campaign checklist; written from Jimmy's voice for sharing with Tom's marketing team

**Key commits:**
- `fcd1e02` feat: replace favicon with ridge logo icon
- `a833c90` fix: rebuild favicon.ico as valid multi-size ICO (was PNG bytes)
- `b4a100d` fix: favicon — orange ridge logo on black background
- `c50e771` chore: update Vercel deploy hook URL in CLAUDE.md
- `fa39eae` fix: remove duplicate deploy hook from workflow — GitHub integration handles deploys

---

## Previous Activity — April 13, 2026 (session 3)

**Session summary:** Header font bump across all nav elements, site-wide card hover polish with amber glow utility, Vercel connection verified.

**Work completed:**
- **Header font bump** (`src/components/Header.tsx`) — nav links bumped `text-sm` → `text-base` on desktop and mobile; Free Estimate button, phone link, and dropdown items also bumped (`text-[15px]`)
- **`.card-halo` utility** (`src/app/globals.css`) — new amber glow `box-shadow` utility class safe for Framer Motion elements; applies on hover
- **Process cards** (`src/app/page.tsx`) — added `group` class + image `scale-105` on hover + amber border + `.card-halo` glow
- **Testimonial cards** — upgraded to `shadow-2xl` + amber border + `.card-halo` on hover
- **Blog cards** — added `hover:-translate-y-1` lift + amber border + `.card-halo` (grandchild of `FadeIn`, CSS transform safe)
- **Trust badges** — icon ring pulses amber, inner circle scales, icon scales 110% on hover
- **Reviews page** — added `shadow` + amber border glow to flat cards
- **About values** — added `shadow` + amber border glow to flat cards
- **Portfolio cards** — added lift + `shadow-2xl` + amber border (regular `div` inside `motion.div`, CSS safe)
- **Areas-we-serve cards** — added lift + `shadow-2xl` + `.card-halo` (grandchild of `motion.div`)
- **Financing option cards** — added `.card-halo`
- **Vercel connection verified** — project `rr-sc-website` on team `sc-roofing` confirmed connected to `Agentic-Person/rr-sc-website` on `main`; latest deploy `d809885` status READY

**Key commits:**
- `d809885` feat: header font bump + card hover polish across all pages

---

## Previous Activity — April 13, 2026 (session 2)

**Session summary:** Process section overhaul (3 → 6 steps), logo decorator in all section headers, eased scroll nav, mobile subtitle responsiveness, brand copy updates.

**Work completed:**
- **Process section rebuilt** (`src/app/page.tsx`, `src/lib/data.ts`) — expanded from 3 to 6 homeowner-facing steps: Instant Estimate → Free Inspection → Personal Consultation → Insurance & Financing → Expert Installation → 30-Day Follow-Up; added aerial photo banner with ken-burns animation; 3×2 card grid with placeholder images; removed step number badges
- **Logo decorator** (`src/components/shared.tsx`) — replaced star SVG divider with company ridge logo (rr-sc-ridge-logo-v3.webp) flanked by amber lines; appears in every SectionHeader across the site
- **Eased scroll nav** (`src/components/Header.tsx`, `src/app/layout.tsx`) — replaced native scrollIntoView with custom cubic-bezier ease-in-out over 900ms; added data-scroll-behavior="smooth" to html element
- **Subtitle responsiveness** (`src/components/shared.tsx`) — added max-w-md/lg/xl constraints on subtitle paragraphs so descriptions wrap sooner on mobile/tablet
- **Brand copy** — "Se Habla Español" → "Family Owned & Operated" in header top bar and hero trust badges
- **Process images live** — 6 AI-generated images (`sc-process-0[1-6]-*.webp`) converted from JPG to 1200px WebP and wired to each step card; placeholder removed
- **Fade scroll nav** — "Our Process" nav click now fades out/in instead of animated scroll (Header.tsx)

---

## Last Activity — April 12, 2026 (evening)

**Session summary:** Fixed service page hero images, fixed storm-damage slug collision, replaced roof leak repair flashing image with new WebP, bumped section title font sizes.

**Work completed:**
- **Service page hero now uses service-specific image** (`src/app/services/[slug]/page.tsx`) — replaced category-based fallback (heroResidential/heroStormDamage/heroHomepage) with `service.image`; each of the 12 service pages now shows its own card image as the header
- **Storm & Hurricane Damage Repair slug renamed** (`src/lib/data.ts`, `src/lib/linking.ts`, `src/app/page.tsx`) — slug was `storm-damage` which collided with the hub route key; renamed to `storm-damage-repair` so clicking the card routes to the detail page; hub URL `/services/storm-damage` unchanged
- **Roof leak repair flashing image replaced** (`public/images/sc-leak-repair-flashing-v2.webp`, `src/lib/data.ts`) — new photo of roofer installing step flashing at chimney; converted from 8.2 MB PNG to 129 KB WebP (98% reduction) via sharp at 1200px/q82
- **Section title font sizes bumped** (`src/app/globals.css`, `src/components/shared.tsx`) — mobile 2.75rem, md 4rem, lg 5rem; SectionHeader refactored from inline styles to `.section-title` CSS class

---

## Last Activity — April 12, 2026

**Session summary:** Removed decommissioned roofing services, fixed Ken Burns hero animation direction, increased section title font sizes, added local skylight installation image, and reordered the roofing services grid.

**Work completed:**
- **Removed slate roofing + concrete/tile roofing services** (`src/lib/data.ts`) — Tom confirmed these are no longer offered; also cleaned orphaned slug references from `src/lib/linking.ts`
- **Ken Burns animation fixed** (`src/app/globals.css`) — animation was zooming OUT (scale 1.08→1); corrected to zoom IN (scale 1→1.08)
- **Section title font sizes** (`src/components/shared.tsx`) — Tailwind classes were being silently overridden by CSS layer cascade; replaced with inline `style={{ fontSize: 'clamp(2.25rem, 4vw, 4rem)' }}` and eyebrow label bumped from `text-xs` to `1rem`; also bumped service card h3 and process step h3 one size class each in `src/app/page.tsx`
- **Skylight installation image updated** — new local WebP (`public/images/skylight-install-two-roofers.webp`, 1200×805, 277KB) showing two roofers installing a skylight with Spanish moss background; replaced cloudfront placeholder in `data.ts`
- **Roofing services reordered** — flat-roofing moved from position 8 to after skylight-repair so the grid shows: shingle/skylight-install/skylight-repair on row 3, flat-roofing alone on row 4
- **Added local images for TPO and EPDM** materials (prior session, same deploy) — `tpo- flat-roofing-material-commercial.webp` and `epdm-rubber--roofing-material-commercial.webp` wired into `src/lib/materials.ts`

---

## Previous Activity — April 9, 2026

**Session summary:** Deployed site to Vercel, verified all 73 pages live, validated SEO/structured data, set up deploy hook, and cleaned up environment variable config.

**Work completed:**
- **Site deployed and verified live** — all 73 pages returning 200 with full server-rendered HTML
- **Deploy hook configured** — replaced `vercel --prod` CLI with Vercel deploy hook URL in CLAUDE.md; deploy now triggers via `curl` POST after pushing to GitHub
- **Environment variables set in Vercel** — all 6 required vars confirmed (Supabase, OpenAI, GA4, Admin Secret)
- **`.env.example` cleaned up** — removed stale `VITE_*` prefixes (now `NEXT_PUBLIC_*`), removed unused Frontend Forge / Umami / PORT / NODE_ENV entries, added missing `ADMIN_SECRET`
- **Full verification passed (14/14 checks):**
  - Homepage, service pages, location pages, blog — all SSR with real content
  - JSON-LD structured data on all page types (RoofingContractor, Service, BreadcrumbList, FAQPage)
  - Meta tags (title, og:title, og:description) on all pages
  - sitemap.xml and robots.txt accessible
  - Blog API endpoints returning JSON
  - Security headers present (HSTS, X-Frame-Options, CSP, etc.)

---

## Previous Activity — April 7, 2026

**Session summary:** Implemented enriched JSON-LD structured data across all service and location pages, built a context-aware internal linking system, and converted the homepage from client-side to server-rendered for full SEO crawlability.

**Work completed:**
- **Homepage converted to Server Component** — removed `"use client"` directive; extracted Framer Motion animations into a reusable `FadeIn` client component (`src/components/FadeIn.tsx`); homepage now delivers fully server-rendered HTML with all content, headings, links, and JSON-LD baked in at build time — previously served a JS shell to crawlers
- Enriched JSON-LD structured data on all 28 service pages — `Service` schema with full provider, service type, offer catalog (built from features), area served (all 21 locations), and 4-level `BreadcrumbList`
- Enriched JSON-LD structured data on all 21 location pages — corrected schema from `Service` to `RoofingContractor`/`LocalBusiness` with geo coordinates, business hours (24/7), price range, offer catalog, and 3-level `BreadcrumbList`
- Created `src/lib/linking.ts` — context-aware internal linking utility with 4 scoring functions
- Service pages: "Related Services" now pulls cross-category (19-entry cross-category map), "We Serve" locations scored by relevance (barrier islands for storm services, historic areas for roofing)
- Location pages: "Featured Services" scored by location characteristics (coastal, historic, inland), "Nearby Areas" with county-adjacency fallback for thin counties
- Added full-width "Available Across the Lowcountry" section on every service detail page — all 21 locations as pill links for maximum crawlable cross-link density
- Added `SITE_URL` constant to `data.ts` to eliminate URL string duplication
- Removed mock `aggregateRating` (4.9/47 reviews) from all new schemas — will add back when real Google Reviews are integrated

---

## Previous Activity — April 7, 2026

**Session summary:** Full framework migration from React+Vite SPA to Next.js 15 (App Router) for server-side rendering and SEO/AEO optimization. Pushed to new repo.

**Work completed:**
- Migrated entire website from React 19 + Vite 7 (client-side SPA) to Next.js 15 (App Router) with SSR/SSG
- 73 pages pre-rendered at build time — every page delivers full HTML to crawlers
- Replaced client-side `SEOHead` (useEffect-based) with Next.js `generateMetadata()` — meta tags now baked into server-rendered HTML
- Replaced client-side `JsonLd` (useEffect-based) with server-rendered `<script type="application/ld+json">`
- 21 location pages + 36 service pages use `generateStaticParams()` for SSG with unique per-page metadata
- Blog pages use SSR with Supabase fetch + hardcoded fallback
- 5 API routes converted from Vercel serverless functions to Next.js Route Handlers
- `next/font` for optimized Google Fonts loading (DM Sans, Playfair Display)
- GA4 analytics via `next/script` (afterInteractive strategy)
- Environment variables renamed: `VITE_*` → `NEXT_PUBLIC_*`
- All shadcn/ui, Framer Motion, Supabase, OpenAI integrations preserved
- Giraffe mascot chat widget, contact form, blog CMS all working
- Removed Express server, Wouter router, Vite build config — all replaced by Next.js
- New repo created: github.com/Agentic-Person/rr-sc-website

---

## Previous Activity — March 26 through April 7, 2026

*See the previous repo (SCROOF1/restorationroofing) for full build history from initial setup through the Vite SPA era.*

**Key milestones from previous build:**
- March 26: Initial project setup, Vercel + GA4, chat widget UI
- March 27: RAG chat system, blog CMS, contact form API, dark mode, security hardening
- March 30: Materials Comparison Tool rebuilt with branded products, gutter service cleanup
- April 1: Giraffe logo, instant estimator in AI chat, Vercel pipeline fixed
- April 1–2: Full visual rebrand (black/orange), custom blog images, text readability fixes
- April 3: Giraffe mascot widget redesign, chat widget enlarged
- April 7: Tech stack documentation, SEO/AEO audit, Next.js migration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 15 (App Router)** + React 19 + TypeScript 5.6 |
| Rendering | **SSR + SSG** (73 pages pre-rendered at build time) |
| Routing | **Next.js file-based routing** (App Router) |
| SEO | **Next.js Metadata API** (`generateMetadata`, `metadata` exports) |
| Styling | Tailwind CSS 4.1 + shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Images | `next/image` ready (automatic optimization) |
| Fonts | `next/font` (DM Sans + Playfair Display, optimized loading) |
| Icons | Lucide React |
| Hosting | Vercel (Next.js native integration) |
| Database | Supabase (PostgreSQL + pgvector) |
| AI/LLM | OpenAI gpt-4o-mini + text-embedding-ada-002 |
| Analytics | Google Analytics 4 (G-0LZW0PD82B) via `next/script` |

---

## What's Been Built

### Core Website (73 pages)
- 13 page types, fully responsive, mobile-first
- 12 roofing services, 12 gutter services, 10 storm damage services — all SSG with unique metadata
- 21 location pages (Charleston metro area) — all SSG with unique metadata
- 3 service hub pages (roofing, gutters, storm-damage)
- 9 blog posts with categories and navigation (database-driven, SSR)
- 8 customer testimonials with star ratings
- Materials comparison tool (6 materials: 3 branded shingle tiers + metal + 2 flat)
- Portfolio/gallery with project showcase and lightbox
- Financing page with payment calculator
- About page with company story, values, timeline
- Dark mode with Sun/Moon toggle (system preference + localStorage)
- 404 page

### AI Chat System (RAG)
- Giraffe mascot floating chat widget on every page
- 13,000-word knowledge base covering all services, materials, pricing, insurance, climate, emergencies
- 33 embedded chunks in Supabase pgvector (text-embedding-ada-002)
- Cosine similarity search with 0.7 threshold
- gpt-4o-mini for responses with RAG context injection
- Lead scoring (emergency=95, estimate=85, scheduling=75, insurance=70)
- Instant roof estimate engine with 3 material tiers × 3 complexity levels
- Conversation persistence in Supabase (chat_conversations table)
- Session management via localStorage (nanoid)
- Rate limiting: 20 req/min per IP
- Three action buttons: Text (SMS), Chat (AI), Book (/contact)

### Contact Form (Server-Side)
- POST /api/contact — Next.js Route Handler
- Zod validation (name, phone, email, address, service, message)
- Saves to Supabase contact_submissions table
- Webhook notification support (NOTIFICATION_WEBHOOK_URL)
- Rate limiting: 5 submissions/min per IP

### Blog CMS
- blog_posts table in Supabase with RLS (anon reads published only)
- 9 posts seeded from hardcoded data
- Blog listing (SSR) + Blog post detail (SSR) with hardcoded fallback
- API endpoints: GET /api/blog, GET /api/blog/[slug]
- AI blog generator: POST /api/blog/generate (ADMIN_SECRET protected)

### SEO & Structured Data
- **Server-rendered metadata** on every page via Next.js Metadata API
- **Server-rendered JSON-LD** structured data (RoofingContractor, LocalBusiness, BlogPosting, FAQPage, Service, BreadcrumbList)
- **Enriched Service schema** on all 28 service pages — service type, offer catalog, area served, full provider block
- **RoofingContractor/LocalBusiness schema** on all 21 location pages — geo, hours, offers, city-specific areaServed
- **BreadcrumbList schema** on all service and location pages
- Open Graph + Twitter Card meta tags
- Sitemap.xml (100+ URLs) + robots.txt
- Geo meta tags for local SEO (geo.region, geo.placename, geo.position, ICBM)
- Breadcrumb navigation on all interior pages
- `generateStaticParams()` ensures unique meta per service and location page

### Internal Linking System
- **Context-aware cross-linking** via `src/lib/linking.ts` — 4 scoring functions
- Service pages: related services pulled cross-category (not just same bucket), location links scored by relevance to service type
- Location pages: featured services scored by location characteristics (coastal, historic, inland), nearby areas with county-adjacency fallback
- Full-width "Available Across the Lowcountry" section on every service detail page — all 21 locations as crawlable pill links
- 19-entry cross-category service map for semantic relatedness
- County adjacency map for thin-county fallback on nearby locations

### Security
- Security headers via vercel.json: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- Chat API input validation: control char stripping, role whitelisting, history validation, 40K char cap
- Contact form: server-side Zod validation
- RLS on all Supabase tables
- Service role key server-side only (never NEXT_PUBLIC_ prefixed)
- .env properly gitignored, never committed

### Design System ("Black & Orange")
- Light + Dark mode with full CSS variable system
- Black (#000000), Orange (#ED5A00), Sage (#6B8F71), Linen (#F7F4EE)
- Original navy/gold scheme saved as `src/app/globals.original.css`
- Playfair Display (headings) + DM Sans (body) via `next/font`
- Custom wave dividers, trust badges, stats bar
- shadcn/ui components (accordion, button, card, dialog, input, label, separator, sheet, skeleton, textarea, toggle, tooltip)

---

## What's Working

- [x] All 73 pages render and route correctly
- [x] **Server-side rendered HTML** — view source shows full content
- [x] **SSG for services + locations** — 57 pages pre-built with unique metadata
- [x] Responsive design (mobile, tablet, desktop)
- [x] Dark mode toggle
- [x] GA4 analytics tracking
- [x] SEO meta tags + structured data server-rendered on all pages
- [x] Enriched JSON-LD on all service pages (Service + BreadcrumbList)
- [x] Enriched JSON-LD on all location pages (RoofingContractor/LocalBusiness + BreadcrumbList)
- [x] Context-aware internal linking system (cross-category services, scored locations, nearby areas)
- [x] Sitemap + robots.txt
- [x] AI chat widget (RAG-powered, giraffe mascot)
- [x] Contact form → Supabase (server-side validated)
- [x] Blog CMS (Supabase-backed with hardcoded fallback)
- [x] AI blog post generator endpoint
- [x] Knowledge base: 33 chunks embedded in pgvector
- [x] Lead scoring on chat conversations
- [x] Security headers on all routes
- [x] Image CDN (CloudFront) — all URLs returning 200
- [x] `next build` passes with zero errors (73 pages generated)

---

## Supabase Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| contact_submissions | Form submissions | anon insert, service_role read |
| roofing_knowledge | RAG knowledge chunks (33 rows, pgvector) | anon read, service_role full |
| chat_conversations | Chat session history + lead scores | anon insert/select own, service_role full |
| blog_posts | Blog content (9 seeded) | anon select published, service_role full |

---

## API Endpoints (Next.js Route Handlers)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /api/chat | POST | none (rate limited) | RAG chat with lead scoring |
| /api/contact | POST | none (rate limited) | Contact form submission |
| /api/blog | GET | none | List published blog posts |
| /api/blog/[slug] | GET | none | Single blog post by slug |
| /api/blog/generate | POST | ADMIN_SECRET | AI-generate a new blog post |

---

## What's Next

### Priority 1 — Deployment & Verification
- [x] ~~Wire Vercel to new repo (Agentic-Person/rr-sc-website)~~ — **Done** (April 9, deploy hook)
- [x] ~~Set NEXT_PUBLIC_* environment variables in Vercel~~ — **Done** (April 9, 6 vars set)
- [x] ~~Deploy and verify live site~~ — **Done** (April 9, 14/14 checks passed)
- [x] ~~View page source to confirm server-rendered HTML on live site~~ — **Done** (April 9, verified SSR)
- [ ] Run Lighthouse audit — target SEO score ≥ 95
- [ ] Run Google Rich Results Test on key pages
- [ ] Connect production domain in Vercel
- [ ] Update sitemap.xml URLs to production domain
- [ ] Submit sitemap to Google Search Console

### Priority 2 — Integrations
- [ ] **Zuper CRM integration** — wire contact form + chat leads into Zuper for lead management and follow-up workflows
- [ ] **Instant roof estimator** — finalize and integrate the estimator tool into the website
- [ ] **After-hours voice agent** — Zuper may handle natively; follow up with Zuper to confirm scope before building separately

### Priority 3 — SEO/AEO Enhancements
- [x] ~~Structured data on service and location pages~~ — **Done** (April 7)
- [x] ~~Internal linking system~~ — **Done** (April 7)
- [ ] **Blog content launch** — infrastructure built, content ready; launching is a major AEO lever (AI engines cite long-form Q&A articles)
- [ ] HowTo schema for process-oriented content
- [ ] AggregateRating schema on Reviews page (once Google Reviews integrated)
- [ ] Speakable schema for voice search eligibility
- [ ] Expand knowledge base for more long-tail local queries
- [ ] Enrich gutter & storm damage service pages (deeper content, more images)
- [ ] Google Reviews live feed (API integration)

### Priority 4 — New Features
- [ ] Automated blog system — 9 posts per month
- [ ] Spanish language pages (/es/ route)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Jimmy to pull pricing from ABC material list where applicable

### Pending from Client
- [ ] ABC Supply pricing verification for shingle tiers
- [ ] TAMKO Storm Fighter specs (not on ABC Supply yet)
- [ ] Product images for 3 shingle tiers
- [ ] Real project photos + team headshots

---

## Content Inventory

| Content Type | Count |
|-------------|-------|
| Roofing services | 10 |
| Gutter services | 12 |
| Storm damage services | 10 |
| Service hub pages | 3 |
| Location pages | 21 |
| Blog posts | 9 (in Supabase) |
| Testimonials | 8 |
| Roofing materials (comparison) | 6 |
| Knowledge base chunks | 33 |
| Portfolio projects | varies |
| **Total pre-rendered pages** | **73** |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout (fonts, providers, Header, Footer, ChatWidget, GA4) |
| `src/app/page.tsx` | Home page |
| `src/app/services/[slug]/page.tsx` | Service hub + detail (SSG, 36 pages) |
| `src/app/areas-we-serve/[slug]/page.tsx` | Location detail (SSG, 21 pages) |
| `src/app/blog/[slug]/page.tsx` | Blog post (SSR from Supabase) |
| `src/lib/data.ts` | All business content (~1,400 lines) |
| `src/lib/linking.ts` | Context-aware internal linking (cross-category, scored locations, nearby areas) |
| `src/lib/supabase.ts` | Supabase client |
| `src/components/ChatWidget.tsx` | Giraffe mascot AI chat widget |
| `src/components/FadeIn.tsx` | Reusable client-side animation wrapper (Framer Motion) |
| `src/components/shared.tsx` | Shared UI components (PageHero, CTABanner, SectionHeader, etc.) |
| `src/components/Header.tsx` | Navigation with services dropdown |
| `src/components/Footer.tsx` | Footer with location links |
| `lib/knowledgebase/restoration-roofing-content.md` | RAG knowledge base (13,000 words) |
| `src/app/api/chat/route.ts` | Chat API (Next.js Route Handler) |
| `src/app/api/contact/route.ts` | Contact form API |
| `src/app/api/blog/generate/route.ts` | AI blog generator |
| `scripts/ingest-knowledge.ts` | Knowledge base embedding pipeline |
| `scripts/seed-blog-posts.ts` | Blog post seeder |
| `supabase/migrations/` | Database schema (3 migrations) |
| `next.config.ts` | Next.js config (images, Turbopack alias) |
| `vercel.json` | Security headers |
| `.env.example` | Required environment variables |

---

## Environment Variables (Vercel — needs updating for new repo)

| Variable | Set | Purpose |
|----------|-----|---------|
| OPENAI_API_KEY | Needs setting | Chat + blog generation |
| NEXT_PUBLIC_SUPABASE_URL | Needs setting | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Needs setting | Supabase public key (frontend) |
| SUPABASE_SERVICE_ROLE_KEY | Needs setting | Supabase admin key (server-side only) |
| ADMIN_SECRET | Needs setting | Blog generator auth |
| NEXT_PUBLIC_GA4_MEASUREMENT_ID | Needs setting | Google Analytics 4 |
| NEXT_PUBLIC_FRONTEND_FORGE_API_KEY | Needs setting | Google Maps proxy |
| NEXT_PUBLIC_FRONTEND_FORGE_API_URL | Needs setting | Google Maps proxy URL |
| NOTIFICATION_WEBHOOK_URL | Not yet configured | Contact form webhook (Zuper integration pending) |

---

## Project Structure

```
rr-sc-website/
├── src/
│   ├── app/                    ← Next.js App Router (pages + API routes)
│   │   ├── layout.tsx          ← Root layout
│   │   ├── page.tsx            ← Home
│   │   ├── about/              ← About page
│   │   ├── contact/            ← Contact page
│   │   ├── financing/          ← Financing page
│   │   ├── portfolio/          ← Portfolio page
│   │   ├── reviews/            ← Reviews page
│   │   ├── blog/               ← Blog listing + [slug]
│   │   ├── services/[slug]/    ← Service hubs + details (SSG)
│   │   ├── areas-we-serve/     ← Locations listing + [slug] (SSG)
│   │   ├── materials-comparison/ ← Materials tool
│   │   ├── not-found.tsx       ← 404
│   │   └── api/                ← Route Handlers (chat, contact, blog)
│   ├── components/             ← React components
│   ├── contexts/               ← ThemeContext
│   ├── hooks/                  ← Custom hooks
│   └── lib/                    ← Data, Supabase client, utilities
├── attached_assets/            ← Images (logos, blog, process photos)
├── lib/knowledgebase/          ← RAG knowledge base
├── public/                     ← sitemap.xml, robots.txt
├── supabase/migrations/        ← Database schema
├── scripts/                    ← Seed + ingest scripts
├── next.config.ts
├── vercel.json
├── .env.example
└── project-status.md           ← This file
```

---

## Color Scheme Reference

- **Current ("Black & Orange"):** Primary #000000, Accent #ED5A00, Linen #F7F4EE, Sage #6B8F71
- **Original ("Coastal Heritage"):** Primary #1B3A4B, Accent #D4922A, Linen #F7F4EE
- Revert: copy `src/app/globals.original.css` → `src/app/globals.css`
