# Restoration Roofing SC — Tech Stack & Optimization Report

**Prepared for:** Tom Davis / Restoration Roofing SC
**Prepared by:** Agentic Personnel
**Date:** April 19, 2026
**Live site:** https://rr-sc-website.vercel.app (production DNS cutover to `restorationroofingsc.com` pending)

---

## 1. Executive Summary

Your website was rebuilt in April 2026 on a modern, search-engine-friendly foundation specifically engineered to win in four distinct search surfaces:

1. **SEO** — traditional Google / Bing blue-link rankings
2. **AEO** — Answer Engine Optimization (featured snippets, "People Also Ask," voice)
3. **GEO** — Geographic / Local SEO (Google Maps, local pack, "near me")
4. **AIO** — AI Overviews & AI-assistant citations (ChatGPT, Perplexity, Claude, Gemini, Bing Copilot)

The previous site was a Vite single-page app that served an empty shell to search engines. The new site ships **fully-rendered HTML with structured data baked in on 73 pages** — the single biggest AEO / AIO enabler available to a local service business.

---

## 2. Tech Stack

### Core Framework & Runtime

| Layer | Choice | Purpose |
|---|---|---|
| **Framework** | Next.js 16.2.2 (App Router) | Server-rendered HTML for every page — crawlers get complete content without executing JavaScript |
| **UI Library** | React 19.2.4 | Latest stable React with Server Components |
| **Language** | TypeScript 5 | Type safety, fewer production bugs |
| **Runtime** | Node.js 24 LTS on Vercel Fluid Compute | Edge-cached HTML worldwide, low cold-start latency |
| **Hosting** | Vercel (team: `sc-roofing`, project: `rr-sc-website`) | Automatic deploys on push, global CDN, Core Web Vitals monitoring |

### Styling & UI

| Layer | Choice | Purpose |
|---|---|---|
| **CSS Framework** | Tailwind CSS 4 | Utility-first styling, small bundle |
| **Component Primitives** | Radix UI (27 primitives) | Accessible, unstyled components (dialogs, menus, accordions, tabs, tooltips) |
| **Animation** | Framer Motion 12 | Motion with `prefers-reduced-motion` respect |
| **Icons** | Lucide React | Consistent icon system |
| **Fonts** | DM Sans + Playfair Display via `next/font` | Zero layout shift, self-hosted Google Fonts |
| **Theming** | `next-themes` | Light/dark mode support |

### Data & Forms

| Layer | Choice | Purpose |
|---|---|---|
| **Database** | Supabase (PostgreSQL) | Blog posts, reviews, lead capture |
| **Forms** | React Hook Form + Zod | Typed validation, accessible errors |
| **Carousels** | Embla Carousel | Portfolio, testimonials |
| **Charts** | Recharts | Financing calculators, data viz |
| **Notifications** | Sonner | Toast notifications |

### AI & Conversion

| Layer | Choice | Purpose |
|---|---|---|
| **On-site AI Chat** | OpenAI `gpt-4o-mini` + 13,000-word knowledge base | 24/7 lead qualification via giraffe mascot widget |
| **Quote Tool** | Roofle RoofQuote PRO slideout | Instant roof quotes site-wide |
| **Analytics** | Google Analytics 4 (`G-0LZW0PD82B`) | Attribution, conversion tracking |

### Deployment Pipeline

- **Primary repo:** `Agentic-Person/rr-sc-website` (GitHub) → Vercel auto-deploys on push to `main`
- **Client repo mirror:** `SCROOF1/restorationroofing` (Tom's GitHub)
- **Framework detection:** automatic (Next.js)
- **Build time:** ~1–2 minutes; 73 pages pre-rendered at build

---

## 3. Site Inventory

- **73 pages** pre-rendered at build time
- **21 dedicated city/location pages** (`/areas-we-serve/[slug]`)
- **32 individual service pages + 3 hub pages** (`/services/[slug]` — 10 roofing, 10 storm damage, 12 gutters; hubs: roofing, gutters, storm-damage)
- Hub pages: homepage, about, contact, portfolio, financing, materials-comparison, reviews, blog
- **9 blog posts drafted** in Supabase, pending launch approval

---

## 4. SEO — What's Implemented

Traditional search engine optimization for Google and Bing ranking.

### ✅ Shipped

- **Server-side rendering** on every page — Google and Bing receive complete HTML, not a JavaScript shell
- **Next.js Metadata API** with unique `<title>` and `<meta description>` on every route via `generateMetadata()`
- **Title template system** — `%s | Restoration Roofing SC` prevents brand-omission on sub-pages
- **Open Graph + Twitter Card tags** site-wide for social preview rendering
- **Static site generation (SSG)** — 73 pages pre-built at deploy, served as cached HTML from Vercel's global edge network
- **`generateStaticParams()`** on dynamic routes — all locations and services pre-rendered
- **Image optimization via `next/image`** — automatic WebP conversion, responsive `srcset`, lazy loading (19 images migrated in the April 18 mobile overhaul)
- **Font optimization via `next/font`** — self-hosted, preloaded, zero cumulative layout shift
- **Clean URL structure** — `/services/[slug]`, `/areas-we-serve/[slug]`, no query strings
- **Internal linking matrix** (`src/lib/linking.ts`) — automatic service ↔ location cross-links and nearby-city recommendations
- **Sitemap** at `/sitemap.xml` (currently static; dynamic version pending)
- **`robots.txt`** permissive and pointing to sitemap
- **Mobile-first responsive design** — April 18 overhaul included 44px tap targets, `svh` viewport units, and reduced-motion support
- **Core Web Vitals optimization** — LCP images use `priority`, fonts use `display: swap`

### ⚠️ Pending

- `alternates.canonical` URL on every page (prevents duplicate-content dilution)
- Convert `public/sitemap.xml` → dynamic `src/app/sitemap.ts` so blog posts auto-register
- Replace final raw `<img>` tag on `src/app/services/[slug]/page.tsx`
- Production DNS cutover to `restorationroofingsc.com` + Google Search Console verification

---

## 5. AEO — What's Implemented

Answer Engine Optimization. Winning featured snippets, "People Also Ask" boxes, and voice assistant answers. Most AEO crawlers **do not execute JavaScript** — if content isn't in the initial HTML response, it doesn't exist to them.

### ✅ Shipped

- **Server-rendered JSON-LD structured data** (not JavaScript-injected) on:
  - **Homepage** — `RoofingContractor` schema with `AggregateRating`, `GeoCoordinates`, `City`, `OpeningHours`
  - **21 location pages** — `RoofingContractor` + `Place` + `GeoCoordinates` + `BreadcrumbList` + `OfferCatalog`
  - **Service detail pages** — `Service` + `FAQPage` + `BreadcrumbList`
  - **Blog index** — `Blog` schema
- **`FAQPage` schema auto-generated** from service FAQ data — every service page ships a Q&A block eligible for rich-result carousels
- **`BreadcrumbList` schema** on deep pages — structured navigation path for search result enrichment
- **Semantic HTML5** — proper heading hierarchy (exactly one `<h1>` per page), `<nav>`, `<main>`, `<article>`, `<section>`
- **Context-aware internal linking** — reinforces topical authority clusters (service ↔ location ↔ related service)

### ⚠️ Pending

| Priority | Item |
|---|---|
| HIGH | Global `Organization` + `WebSite` w/ `SearchAction` schema in root layout |
| HIGH | **Launch the blog** (9 posts drafted) — long-form Q&A is the single biggest AEO lever |
| HIGH | Collect customer reviews → `Review` + `AggregateRating` schema for star ratings in SERPs |
| HIGH | `BlogPosting` schema on `/blog/[slug]` |
| MED  | Promote `/process` to standalone route with `HowTo` + `HowToStep[]` schema |
| MED  | `AboutPage` + `ContactPage` + `ItemList` schemas on their respective pages |
| MED  | `Speakable` schema on key Q&A blocks (voice assistant eligibility) |

---

## 6. GEO — What's Implemented

Geographic / Local SEO. Winning Google Maps, the local 3-pack, and "near me" queries.

### ✅ Shipped

- **Site-wide geo meta tags** in root layout (`src/app/layout.tsx:39-44`):
  - `geo.region = US-SC`
  - `geo.placename = Mount Pleasant`
  - `geo.position = 32.8468;-79.8203`
  - `ICBM = 32.8468, -79.8203`
- **21 dedicated location pages**, each with:
  - Unique server-rendered metadata
  - Full `LocalBusiness` / `RoofingContractor` JSON-LD including `GeoCoordinates`, `areaServed`, `openingHoursSpecification` (24/7), `priceRange`, physical address, and `OfferCatalog`
- **Physical address in every schema:** 75 Port City Landing, Suite 110, Mount Pleasant, SC 29464
- **All 21 cities declared in `areaServed`** on every service page — reinforces service coverage for each municipality
- **Service ↔ location cross-linking** via `getServiceAreaLinks()` — every service lists its coverage cities, every city lists available services
- **NAP consistency on-site** (Name / Address / Phone) — (843) 306-2939 present in schema, footer, and contact page

### ⚠️ Pending (Mostly External / Operational)

| Priority | Item |
|---|---|
| BLOCKER | **Production DNS cutover** to `restorationroofingsc.com` — blocks everything below |
| HIGH | Verify domain in Google Search Console + submit sitemap |
| HIGH | Verify in Bing Webmaster Tools (Bing powers ChatGPT Search and Copilot) |
| HIGH | Link Google Business Profile to production domain |
| HIGH | NAP consistency audit across GBP / Yelp / Facebook / Apple Maps / Nextdoor |
| MED  | Call tracking (e.g. CallRail) with dynamic number insertion for attribution |
| MED  | Per-city enrichment — neighborhoods, school districts, local landmarks |

---

## 7. AIO — What's Implemented

AI Overviews & AI-Assistant Citation. Being cited by ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot when users ask questions like "best roofing contractor in Mount Pleasant SC."

### ✅ Shipped (Crawlability Layer)

- **Fully SSR HTML on all 73 pages** — GPTBot, PerplexityBot, ClaudeBot, Google-Extended, and Amazonbot all receive complete rendered content, not a JavaScript shell
- **Rich entity graph** via per-page JSON-LD — gives LLMs clean structured data to ground citations
- **`robots.txt` currently allows all bots** (`User-agent: * / Allow: /`) — no AI crawlers blocked, sitemap linked
- **In-site AI chat widget** (giraffe mascot) — OpenAI `gpt-4o-mini` + 13k-word knowledge base with built-in lead scoring, keeps answers on first-party domain
- **Blog infrastructure built** (Supabase-backed, `src/app/blog/[slug]/page.tsx`) — 9 posts drafted and ready to publish

### ⚠️ Pending (Content Layer)

| Priority | Item |
|---|---|
| HIGH | **Launch the blog** — LLMs overwhelmingly cite long-form Q&A and "ultimate guide" content |
| HIGH | Add **direct-answer paragraphs** at the top of every service page ("Roof replacement in Charleston typically costs $X–$Y and takes Z days…") — LLMs lift these verbatim for grounding |
| HIGH | Convert `public/sitemap.xml` → `src/app/sitemap.ts` so blog posts auto-register |
| MED  | Publish a canonical **Fact Sheet** page (licenses, insurance, founded date, service polygon, materials carried, warranty terms) — LLMs use this to ground "is this company legit" queries |
| MED  | Add `llms.txt` at site root — emerging convention for AI crawler guidance |
| MED  | Explicit AI-crawler allow in `robots.txt` (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot, Amazonbot, Applebot-Extended) |
| MED  | `AggregateRating` + `Review` schema once reviews collected — trust signal LLMs use when recommending |
| LOW  | IndexNow submission on blog publish — near-instant Bing / Yandex indexing |
| LOW  | `QAPage` schema on question-style pages |

**Crawler Policy Recommendation:** For a local service business, **explicit allow** of all major AI crawlers is correct. We want citation, not a content moat — if ChatGPT cites Restoration Roofing SC when a Charleston homeowner asks "who does roofing near me," that is a direct lead source.

---

## 8. Competitive Position

Most roofing contractors in the Charleston / Mount Pleasant market are still running WordPress or Wix sites with:
- Client-side JavaScript rendering (invisible to most AI crawlers)
- No JSON-LD structured data
- No location-specific schema
- Generic meta descriptions

Restoration Roofing SC's site is **architecturally years ahead of the local competitive set** on the AEO / AIO axis. The AEO / AIO disciplines are young and the window for being an early citation source is open. Closing the remaining schema gaps and launching the blog compounds that lead.

---

## 9. Verification Targets

Once the full optimization pass is complete, the site should pass:

- **Lighthouse SEO ≥ 95** (target: 100 — matching the Alpine Peak Roofing reference implementation)
- **Lighthouse Accessibility ≥ 90**
- **`npm run build`** passes with strict TypeScript and ESLint flags
- **Google Rich Results Test** — valid structured data on homepage, service, location, and blog post
- **AI citation spot-check** — after ~2 weeks post-DNS-cutover, ChatGPT / Perplexity / Claude should cite Restoration Roofing SC for "best roofing contractor in Mount Pleasant SC" queries

---

## 10. Related Documents

- `docs/AEO-GEO-AIO-STRATEGY-restoration-roofing-SC.md` — full implementation strategy and priority stack
- `docs/META-SEO-IMPLEMENTATION-PLAN.md` — original metadata architecture plan
- `docs/NEXTJS-MIGRATION-PLAN.md` — migration rationale
- `docs/marketing-team-brief.md` — handoff brief for marketing team
- `docs/mobile-first-overhaul-2026-04-18.md` — April 18 mobile overhaul record
