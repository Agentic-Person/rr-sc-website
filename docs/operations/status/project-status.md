# Restoration Roofing SC — Project Status
> Last updated: April 22, 2026

## 🟡 Status: Phase 1.5 Pre-Launch Punch List In Motion

**Phase:** Client-driven pre-launch sprint — branding (OC → SC giraffe), mobile-first homepage, dedicated Instant Quote landing page, Zuper CRM + SMS integration, then domain cutover
**Live:** https://rr-sc-website.vercel.app
**Repo:** github.com/Agentic-Person/rr-sc-website
**Client Repo:** github.com/SCROOF1/restorationroofing
**Previous Repo (Vite SPA):** github.com/Agentic-Person/restorationroofing-sc (archive only)

---

## 🔄 Last Activity (April 22, 2026 — Session 4)

**Header CTA redesign: "Get Started — No Obligations" hover dropdown + SMS opt-in + legal pages**

### Motivation
Client wants a warmer, lower-commitment entry point for the target audience (35–45 year-old women arriving from social/referral). Static "Free Estimate" → /contact was too cold and forced a page jump. Replaced with a hover-activated dropdown offering three explicit paths, each with its own consent/legal treatment.

### Header refactor (`src/components/Header.tsx`)
- Desktop nav left-aligned adjacent to logo (removed `lg:absolute lg:left-1/2 -translate-x-1/2` centering) with `lg:ml-8` gap
- Header-row phone number removed on both desktop and mobile (top utility bar phone is the single source)
- CTA moved right after the nav via a left-cluster div, theme toggle (sun/moon) split into its own element with `ml-auto` pushing it to the far right corner
- "Free Estimate" / "Get Your Free Estimate" → `<GetStartedDropdownDesktop />` + `<GetStartedDropdownMobile onNavigate={() => setMobileOpen(false)} />`

### New component: `src/components/GetStartedDropdown.tsx`
Two exports. Desktop uses shadcn HoverCard (`openDelay={80}`, `closeDelay={150}`). Mobile uses AnimatePresence height-accordion. Explicit dark card styling (`bg-gray-900 border-gray-800 text-white shadow-2xl`) + amber-tinted hover overlay (`hover:bg-amber/20`) so rows are visible regardless of the current theme state.

Three options:
1. **Text us** — inline click-to-expand panel with consent checkbox (red verbiage until checked, gray after); "Copy (843) 306-2939" button gated behind opt-in, uses `navigator.clipboard.writeText` with "Copied!" feedback. Falls back to SMS handler only if clipboard API is unavailable. Mobile variant keeps the native `sms:` link.
2. **Have our friendly non-commissioned team contact you** — desktop expands an inline form (name, phone, email, preferred time) posting to existing `/api/contact` route; consent checkbox gates the submit button ("Send Friend Request"), which stays dim (`bg-amber/25 text-gray-900/50`) until opted in, then flips to full `btn-amber`. Mobile links to `/contact` instead (inline form in collapsed menu = bad UX).
3. **Get a quick estimate** — calls `openRoofleWidget()` from the new `QuoteWidgetContext` (Jerry handoff).

### Opt-in persistence
`usePersistedOptIn(storageKey)` custom hook reads/writes `localStorage`. Two independent keys to keep consent scopes legally distinct:
- `rr-sms-opted-in` — SMS-only (Text us row)
- `rr-contact-opted-in` — calls + text + email (callback form)
Gracefully falls back to in-memory state if `localStorage` is blocked.

### New context: `src/contexts/QuoteWidgetContext.tsx`
Extracted the imperative Roofle-opener from `QuoteGiraffeTab.tsx` into a shared provider (`QuoteWidgetProvider` wraps tree inside `<ThemeProvider>` in `src/app/layout.tsx`). `useQuoteWidget()` returns `{ openRoofleWidget }`. `QuoteGiraffeTab` now consumes the context; the DOM-observer logic that watches the Roofle panel state stays local to the tab.

### Legal pages
- **`src/app/privacy/page.tsx`** — Full Privacy Policy at `/privacy` with prominent SMS data notice banner, 10 sections (data collected, use, SMS compliance, sharing, security, cookies, user rights, third-party links, policy changes, contact). Explicitly excludes SMS originator opt-in data from third-party sharing.
- **`src/app/terms/page.tsx`** — Full Terms of Service at `/terms` with TCPA & CTIA compliance language, SMS program description, STOP/HELP opt-out, SC governing law, disclaimers.
- **`src/components/Footer.tsx`** — Added "Privacy Policy" and "Terms of Service" to Quick Links.

### Files modified/created
- `src/components/Header.tsx` — nav + CTA + theme-toggle layout (-22 lines net)
- `src/components/GetStartedDropdown.tsx` — new (~510 lines, dual desktop/mobile export)
- `src/contexts/QuoteWidgetContext.tsx` — new (shared Roofle opener)
- `src/components/QuoteGiraffeTab.tsx` — refactored to consume context
- `src/app/layout.tsx` — wrapped tree in `QuoteWidgetProvider`
- `src/app/privacy/page.tsx` — new
- `src/app/terms/page.tsx` — new
- `src/components/Footer.tsx` — added legal links

### Commits (both pushed to `origin` and `client`)
- **`d0cbd09`** — GetStartedDropdown, QuoteGiraffeTab Roofle wiring, Header refactor, QuoteWidgetProvider (includes subsequent polish: dark card styling, amber hover overlay, inline opt-in with red-until-checked verbiage, "Send Friend Request" button, "Have our friendly non-commissioned team contact you" copy, localStorage persistence)
- **`7390092`** — Privacy Policy + Terms of Service pages, footer legal links

### Verification
- `npx tsc --noEmit` — clean
- `npm run build` — 76 pages generated (up from 74; `/privacy` + `/terms` added), zero errors

### Follow-ups flagged (not yet wired)
- Point `NOTIFICATION_WEBHOOK_URL` env var at Zuper's inbound webhook so "Have our friendly non-commissioned team contact you" submissions land in the CRM automatically (currently fan-out via existing `/api/contact` → Supabase + generic webhook)
- Optional: analytics events (`get_started_hover`, `cta_text_us_opt_in`, `cta_callback_submit`, `cta_quick_estimate_click`) to measure which of the three paths converts best for the social/referral audience

---

## 🔄 Previous Activity (April 22, 2026 — Session 3)

**ChatWidget cross-screen positioning fix — client review session**

### Root cause
During a client review session, the giraffe chat widget was overlapping the hero headline, description, and CTA buttons on the client's screen. Two bugs caused this:

1. **Fixed pixel left offset (`md:left-[140px]`)** — On the dev's wide monitor (1920px), the hero container margin pushed content right ~350px, so 140px landed safely in the margin. On the client's narrower screen (~1280–1366px), the container has no centering margin and content starts at ~75px — so 140px landed right inside the hero text column.

2. **Vertical stacking on mobile/tablet (`flex-col` layout)** — The speech bubble stacked **above** the giraffe on smaller breakpoints, making the widget ~265px tall. Pinned 20px from the viewport bottom, the top of the stack reached into the hero CTA area on shorter viewports (laptops with browser toolbar, zoomed-in browsers).

### Fix (3 commits, all pushed)
- **`75b1f88`** — Layout: `flex-col md:flex-row` → always `flex-row items-center`. Widget height is now always exactly the giraffe height (175px), never taller from vertical stacking. Speech bubble moved to the RIGHT of the giraffe with a left-pointing tail. Anchor changed to `bottom-6 left-4`.
- **`25eaecc`** — Left offset: `left-4` (hardcoded 16px) → `style={{ left: 'clamp(1rem, 8vw, 10rem)' }}`. Scales proportionally with viewport: 30px at 375px / 102px at 1280px / 109px at 1366px / 154px at 1920px. No breakpoint logic needed.

### Files modified
- `src/components/ChatWidget.tsx` — positioning, layout direction, speech bubble side + tail, clamp offset

### Status
- **Pushed to `origin` and `client`** — Vercel auto-deploy triggered (`875ba2f..25eaecc`)

---

## 🔄 Previous Activity (April 22, 2026 — Session 2)

**Roof Quote page (`/roof-quote`) — hero image + shingle tier reorder**

### Hero section overhaul
- Swapped hero background image from remote CDN URL (`cloudfront.net/…/hero-homepage-…webp`) to new local asset `roofrecon-pair2-clean.webp`
- Converted `public/images/roofrecon-pair2-clean.jpg` → `public/images/roofrecon-pair2-clean.webp` using sharp (quality 85, 2752×1536, 415 KB)
- Lightened hero: `opacity-20` → `opacity-80` on the background image (was nearly blacked out, now fully visible)
- Lightened gradient overlay: `from-black/70 via-black/50` → `from-black/60 via-black/30` so the tech-scan aerial image reads through on the right half while headline text stays readable on the left

### Shingle tier reorder (Good / Better / Best)
Corrected tier order to match actual product tier hierarchy:

| Position | Before | After |
|---|---|---|
| GOOD | TAMKO Storm Fighter | **Owens Corning Oakridge** |
| BETTER (popular) | Owens Corning Oakridge | **Owens Corning Duration (130 mph)** |
| BEST | Owens Corning Duration | **TAMKO Storm Fighter (160 mph)** |

- Price ranges reassigned to match tier order: $9–14k (GOOD) → $11–16k (BETTER) → $14–20k (BEST)
- Badge colors maintained in hierarchy: sage (GOOD) → amber (BETTER/popular) → navy (BEST)
- `popular: true` badge moved from Oakridge to Duration (now the middle/recommended tier)

### Files modified
- `src/app/roof-quote/roof-quote-content.tsx` — hero image + opacity + gradient + full SHINGLE_TIERS reorder
- `public/images/roofrecon-pair2-clean.webp` — new asset (converted from JPG)

### Commits
- **`591d0e4`** — pushed to `origin` and `client`

---

## 🔄 Previous Activity (April 22, 2026 — Session 1)

- **P1.2 giraffe mascots live** — custom SC Roofing giraffe widgets replace Pink Panther/Roofle branding: (1) chat mascot (headset + tablet, `giraffe-chat-mascot.webp`, 98×175px) positioned `left-4 md:left-[140px] bottom-[20px]` on homepage only; (2) quote-tab peek-in giraffe (`giraffe-quote-tab.webp`, 216px wide) slides in from right on every page linking to `/roof-quote`
- **Roofle slideout widget disabled** — commented out of `layout.tsx`; replaced by custom QuoteGiraffeTab component; re-enable or replace with Roofle embed on dedicated landing page per P2.9
- **ChatWidget scoped to homepage only** — removed from root `layout.tsx`, added to `src/app/page.tsx` (Server Component import); avoids widget appearing on every service/location page
- **Positioning approach (superseded in Session 3)** — `md:left-[140px]` and `bottom-[20px]` were used but caused cross-screen overlap on the client's narrower monitor; replaced in Session 3 with `clamp()` + always-`flex-row` layout
- **next/image sizing fix** — `w-auto h-auto` class overrides `width` prop and renders at file's intrinsic size; use `style={{ width: "Xpx", height: "auto" }}` when display size must differ from natural file size
- **Committed:** `aae2700` — pushed to both `origin` and `client`

---

## 🚫 Blockers / Pending from Client
- **HIGH** — ABC Supply pricing for shingle tiers — Jimmy submitted a request through ABC Supply portal but has not received a response. **Will need to get prices directly from Dave** instead. Unblocked once Dave responds.
- **HIGH** — TAMKO Storm Fighter specs (not on ABC Supply yet — need from Tom)
- **MED** — Product images for 3 shingle tiers
- **MED** — Real project photos + team headshots
- **MED** — Real project photos + team headshots for remaining sections
- **MED** — "What Our Customers Say" reviews section — awaiting feedback from David or Tom
- ~~**HIGH** — Env vars + deploy from new repo~~ **RESOLVED** (April 9)
- ~~**MED** — Commercial services yes/no~~ **RESOLVED** — Tom confirmed no commercial services

## 🔨 In Progress — Phase 1.5 Pre-Launch Punch List (April 20 client meeting)

**Priority 1 — Immediate homepage + branding work (Week 1–2)**
- [~] **P1.1** Strip all Pink Panther / Owens Corning branding — Roofle slideout widget disabled; in-chat bubble avatars still use old sporty giraffe B (needs swap to headset/tablet mascot)
- [~] **P1.2** Custom giraffe tool visuals — chat mascot (headset + tablet + SC Roofing uniform, 98×175px WebP) + quote-tab peek-in giraffe (right-side, 216×289px WebP) both live; positions finalized: chat widget `left-4 md:left-[140px] bottom-[20px]`, quote tab `right-0 top-1/2`; sizing fix applied (inline style over `w-auto h-auto`)
- [ ] **P1.3** Reorganize homepage above-the-fold (mobile-first) with 3 primary CTAs: Talk to a person now / Get instant online quote / Request callback
- [ ] **P1.4** Rewrite CTA copy — kill generic "Free Estimate"; distinct copy for phone/text, instant quote, callback request
- [ ] **P1.5** Apply all previously submitted minor edits in next deployment cycle

**Priority 2 — Instant Quote landing page (Week 3)**
- [ ] **P2.6** Build dedicated `/instant-quote` landing page (standalone destination for the Roofle tool)
- [ ] **P2.7** Educational content — what the tool IS and is NOT, how to use it, factors affecting pricing; structured for AEO snippet wins
- [ ] **P2.8** Supporting visuals — pricing-variability diagrams + estimator giraffe from P1.2
- [ ] **P2.9** Integrate Roofle embed on the landing page with pre-entry context above the address input

**Priority 3 — Integrations + compliance (Week 2–4)**
- [ ] **P3.10** Finish lead routing widget integration (not urgent — site not live, so no leads being dropped)
- [ ] **P3.11** Configure Zuper CRM intake — source tagging, handoff spec
- [ ] **P3.12** Confirm "Text My Roofer" SMS workflow — Zuper native vs. external provider
- [ ] **P3.13** SMS compliance — Privacy Policy page, Terms & Conditions page, opt-in language on all CTAs, 10DLC carrier registration (triggered if P3.12 green-lights SMS; 10DLC lead time is 1–3 weeks)
- [ ] **P3.14** Document tech-stack ownership — confirm Next.js 16 + React 19 + Vercel + Roofle + Zuper stays through launch; define dev vs. marketing/SEO team responsibilities

**Priority 4 — Deferred backlog (post-launch)**
- [ ] P4.15 Spanish language toggle, Careers page, Referral / lead-gen landing page

## 🔨 In Progress — Domain + Launch QA (Week 4)
- [ ] Run Lighthouse audit — target SEO score ≥ 95
- [ ] Run Google Rich Results Test on key pages
- [ ] Connect production domain in Vercel (restorationroofingsc.com)
- [ ] Update sitemap.xml URLs to production domain
- [ ] GA4 + Search Console setup — Jimmy has Tom's GoDaddy account, can handle DNS verification
- [ ] Submit sitemap to Google Search Console
- [ ] Final QA + go-live

## ⏳ Up Next — Phase 2 (Integrations continued)
- [x] **Instant roof estimator** — Roofle RoofQuote PRO slideout integrated site-wide (April 16, 2026); loads in `<head>` per Roofle install spec
- [ ] **After-hours voice agent** — Zuper may handle natively; follow up with Zuper to confirm scope
- [ ] **Blog content launch** — infrastructure built, content ready; major AEO lever once live
- [ ] **Automated blog system** — 9 posts per month (client confirmed)

## ⏳ Phase 3 — SEO/AEO Enhancements
- [ ] HowTo schema for process pages (AEO)
- [ ] Speakable schema for voice search eligibility
- [ ] Google Reviews live feed (API integration)
- [ ] AggregateRating schema on Reviews page (after Google Reviews)
- [ ] Expand knowledge base for long-tail local queries
- [ ] Enrich gutter & storm damage service pages (deeper content, more images)
- ~~Commercial services decision~~ — **Declined** by Tom (April 1)

## ⏳ Phase 4 — New Features
- [ ] Accessibility audit (WCAG 2.1 AA)

## 🔄 Previously Updated (April 20, 2026)
- **Phase 1.5 punch list captured** from client meeting with Tom — 15 tasks across 4 priority buckets (see "In Progress" above). Status shifted from "Site Live — Domain Connection Next" to "Pre-Launch Punch List In Motion"
- **P3.10 (lead routing) re-scoped** from "HIGH emergency" to normal priority — Tom confirmed it's a widget wire-up gap, not data loss; site is not live yet so no leads are being missed
- **Owl Roofing `/roof-quote/` analyzed** as architectural reference for the P2 Instant Quote landing page build. 19-section narrative arc documented (frustration → education → empowerment → reassurance → promise). Borrowing section order + narrative structure only — not copy, not images, not design system. Their weak points (broken image tags, no social proof numbers, no FAQ schema, vague financing, unclear tool mechanics) flagged as deliberate opportunities for us to beat
- **Roofle tool alignment noted** — Owl Roofing runs the same RoofQuotePRO™ widget we integrated April 16, so their tool-specific framing is directly reusable
- **Proposed 4-week sequencing:** Week 1 parallel (P1.1 branding, P1.2 giraffes, P1.5 minor edits, P3.10 widget fix) → Week 2 (P1.3 + P1.4 mobile hero + CTA copy; Zuper/SMS kickoff) → Week 3 (P2.6–P2.9 Instant Quote page; 10DLC filing in motion) → Week 4 (P3.14 ownership doc; domain cutover; final QA)

## 🔄 Previously Updated (April 18, 2026)
- **Mobile-first overhaul shipped to production** — Full phone-ready pass executed by a team of agents (Phase 1 deep perf audit → 4 parallel implementation agents on disjoint files → hotfix → PR review → merge to `main`). Production deploy verified live and phone-tested
- **Images fully optimized** — 19 raw `<img>` tags migrated to `next/image` across homepage, `PageHero`, ChatWidget giraffe avatars, portfolio, about, and location details. Homepage hero now has a preloaded responsive `srcSet` (8 sizes, 640→3840w, AVIF/WebP auto-negotiated) as the LCP element
- **Tap targets meet WCAG / iOS HIG** — Header hamburger, mobile phone CTA, theme toggle, and dropdown children all now `min-h/min-w [44px]`. Hamburger has state-aware `aria-label` + `aria-expanded` + `aria-controls`
- **Accessibility uplift** — `prefers-reduced-motion` globally neutralizes all animation/transition durations (WCAG 2.3.3); `.ken-burns` hero zoom additionally disabled on mobile; `FadeIn` uses `useReducedMotion()` from framer-motion
- **iOS Safari URL-bar jump fixed** — all hero/modal `vh` units swapped to `svh` (homepage hero, all sub-page `PageHero`, portfolio modal, materials-comparison hero)
- **iOS address-bar tint + preconnect** — `viewport` export with `themeColor` (light `#ffffff` / dark `#000000` via media queries), `colorScheme: "light dark"`. `preconnect` + `dns-prefetch` added to `app.roofle.com` for ~150ms faster widget handshake on 4G
- **LCP paint unblocked on sub-page heroes** — removed 1.5s `motion.h1` fade-in on `PageHero`; the `h1` (LCP candidate on every sub-page) now paints at final position on the first frame
- **ChatWidget / Roofle collision resolved on mobile** — chat button moved to `bottom-24` on phones so the giraffe clears Roofle's "Get Instant Roof Quote" button; desktop unchanged
- **Hotfix: React 19 + framer-motion hydration mismatch** — `FadeIn` was swapping the rendered element type (`<div>` vs `<motion.div>`) based on `useReducedMotion()`, which React 19's strict hydration cannot reconcile across SSR/client renders. Manifested as `appendChild` SyntaxError on the Vercel preview. Fix: keep `<motion.div>` constant, gate animation props instead — framer-motion's documented pattern
- **Phase 4 accessibility audit partially addressed** — tap-target sizes (WCAG 2.5.5), reduced-motion (2.3.3), and aria improvements on hamburger shipped as part of this overhaul; full WCAG 2.1 AA sweep still open as a dedicated pass

## 🔄 Previously Updated (April 17, 2026)
- **Vercel deploy pipeline fixed (critical)** — `rr-sc-website` Vercel project was silently linked to the OLD Vite SPA archive repo (`Agentic-Person/restorationroofing-sc`), so every push to the Next.js repo since the April 7 migration was being ignored and `rr-sc-website.vercel.app` was serving stale Vite SPA HTML. Relinked the project to `Agentic-Person/rr-sc-website` on `main` via the Vercel API. Production now serving `dpl_Am5a7bFfiUsQ12fRXAgartshpAZe` (Next.js build) with the Roofle slideout live in `<head>`
- **Vercel CLI installed and authed** — `vercel` CLI now available locally on team `sc-roofing` for direct deploy/inspect/relink without going through the dashboard
- **Old deploy hooks dead** — relinking the Vercel project wiped its deploy hooks; the URLs in CLAUDE.md (`…/3Od4x8p5su`, `…/QcPRUiXCDI`) no longer work. Not needed going forward — the GitHub integration auto-deploys on every push to `origin main`. CLAUDE.md updated accordingly
- **Roofle RoofQuote PRO slideout confirmed live** — verified in production HTML on `rr-sc-website.vercel.app`; widget loads on every page via root layout

## 🔄 Previously Updated (April 16, 2026)
- **Roofle RoofQuote PRO slideout integrated** — instant roof estimator widget added via root layout (`src/app/layout.tsx`); appears as a teaser tab on the right edge of every page; site visitors can now self-serve a roof quote without waiting for a callback. Script loads in `<head>` per Roofle's install requirement (slideout variant)
- **Hydration warning silenced** — `suppressHydrationWarning` added to `<body>` to handle ColorZilla browser extension's `cz-shortcut-listen` attribute mismatch (cosmetic-only, not a real bug)

## 🔄 Previously Updated (April 15, 2026)
- **Favicon live** — browser tab now shows the orange ridge logo on black background; proper multi-size ICO (16/32/48) + 512px PNG for `<link rel="icon">`; multiple fix iterations required (invalid ICO format, then zero-contrast orange-on-orange)
- **Deploy workflow simplified** — CLAUDE.md updated: GitHub integration auto-deploys on push to `origin main`; deploy hook removed from standard workflow to prevent duplicate simultaneous deploys
- **Marketing team brief prepared** — `docs/marketing-team-brief.md` ready to share; covers tech stack, SEO foundation, GA4 ID, structured data, URL structure, and pre-campaign checklist

## 🔄 Previously Updated (April 14, 2026)
- **Section header eyebrow fix** — removed inline `style` props from SectionHeader that were overriding all CSS/Tailwind size changes; eyebrow labels ("Our Services", "Our Process", etc.) now render at 2xl–4xl responsive sizes; section titles use `.section-title` CSS class
- **Client review items added** — "Our Process" section and "What Our Customers Say" section flagged for David/Tom feedback in blockers

## 🔄 Previously Updated (April 13, 2026)
- **Process section rebuilt** — expanded from 3 → 6 steps with new homeowner-focused copy; aerial photo banner added; 6 AI-generated WebP images wired to each step card (3×2 grid)
- **Logo decorator** — company ridge logo replaces star divider in all SectionHeader components across the site
- **Fade scroll nav** — "Our Process" / "Areas We Serve" nav clicks now fade out → instant jump → fade in instead of animated scroll
- **Service page heroes** — each of the 12 service pages now shows its own card image as the hero instead of a shared category fallback
- **Storm-damage slug fix** — "Storm & Hurricane Damage Repair" card was routing to the hub page; renamed slug to storm-damage-repair
- **Subtitle responsiveness** — description text under section headers wraps sooner on mobile/tablet via max-width constraints
- **Brand copy** — "Se Habla Español" replaced with "Family Owned & Operated" throughout
- **Spanish language pages** removed from roadmap (user confirmed not needed)

## 🔄 Previously Updated (April 9)
- **Site deployed and verified live** — 14/14 verification checks passed, all 73 pages SSR confirmed (April 9)
- **Deploy hook configured** — Vercel redeploy via webhook after every push (April 9)
- **Environment variables set in Vercel** — all 6 required vars configured (April 9)
- **.env.example cleaned up** — removed stale VITE_* prefixes, added missing ADMIN_SECRET (April 9)
- **Homepage converted to Server Component** — now fully server-rendered; animations extracted to reusable FadeIn client component (April 7)
- **Enriched JSON-LD structured data** on all 28 service pages + 21 location pages (April 7)
- **Context-aware internal linking system** — cross-category services, scored locations, nearby areas (April 7)
- **Next.js 15 migration complete** — full SSR/SSG, 73 pages pre-rendered, new repo (April 7)

## ✅ Done
- **Homepage SSR conversion** — removed `"use client"`, all homepage content now server-rendered with full HTML to crawlers (April 7)
- **Enriched JSON-LD structured data** — Service + BreadcrumbList on all service pages, RoofingContractor/LocalBusiness + BreadcrumbList on all location pages (April 7)
- **Internal linking system** — `src/lib/linking.ts` with 4 scoring functions, cross-category map, county adjacency, full-width location strip on service pages (April 7)
- **Next.js 15 migration** — SSR/SSG, 73 pages, Metadata API, server-rendered JSON-LD
- Full 73-page site (12 roofing, 12 gutter, 10 storm damage, 21 locations, 3 hubs, blog, static pages)
- RAG-powered AI chat widget with giraffe mascot (live)
- Blog CMS (Supabase-backed, 9 posts, SSR)
- Contact form → Supabase (server-side Zod validated)
- 5 API routes (chat, contact, blog listing, blog detail, blog generator)
- Dark mode, security headers, SEO/structured data
- Materials Comparison Tool (6 materials: 3 branded shingle tiers + standing seam + TPO + EPDM)
- 60+ custom AI images + 9 custom blog images
- Visual rebrand: black & orange color scheme (original saved as fallback)
- Global text readability fix across all pages
- Giraffe mascot chat widget with Text/Chat/Book action buttons
- Instant estimate engine in AI chat

---

## 🚀 Major Milestone: Next.js 15 Migration (April 7, 2026)

Migrated the entire website from React+Vite (client-side SPA) to **Next.js 15 (App Router)** with server-side rendering. This was the #1 priority for SEO — the old SPA served an empty HTML shell to Google and relied on JavaScript to build the page. Now every page delivers fully-rendered HTML with metadata baked in.

**Key results:**
- **73 pages pre-rendered at build time** (was client-side only)
- **21 location pages** with unique server-rendered metadata per city
- **36 service pages** with unique server-rendered metadata per service
- All JSON-LD structured data now in the HTML source (not injected via JS)
- `next build` passes clean — zero errors
- New repo, clean history, pushed to github.com/Agentic-Person/rr-sc-website

---

## Tech Stack (Post-Migration)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + React 19 |
| Rendering | SSR + SSG (73 pages at build time) |
| SEO | Next.js Metadata API (server-rendered) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Supabase (PostgreSQL + pgvector) |
| AI/Chat | OpenAI gpt-4o-mini + RAG |
| Hosting | Vercel (native Next.js) |
| Analytics | GA4 via next/script |

---
*Update this file + push to sync the Bridge.*
