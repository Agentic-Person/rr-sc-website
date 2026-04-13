# Restoration Roofing SC — Bridge Status
> Last updated: April 12, 2026

## 🟢 Status: Site Live — Domain Connection + Integrations Next

**Phase:** Connect production domain, then begin Zuper CRM + estimator integrations
**Live:** https://rr-sc-website.vercel.app
**Repo:** github.com/Agentic-Person/rr-sc-website
**Client Repo:** github.com/SCROOF1/restorationroofing
**Previous Repo (Vite SPA):** github.com/Agentic-Person/restorationroofing-sc (archive only)

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

## 🚫 Blockers / Pending from Client
- **HIGH** — ABC Supply pricing for shingle tiers — Jimmy submitted a request through ABC Supply portal but has not received a response. **Will need to get prices directly from Dave** instead. Unblocked once Dave responds.
- **HIGH** — TAMKO Storm Fighter specs (not on ABC Supply yet — need from Tom)
- **MED** — Product images for 3 shingle tiers
- **MED** — Real project photos + team headshots
- **MED** — Client review needed: "Our Process" section (layout + 3 images) and "What Our Customers Say" reviews section on homepage — awaiting feedback from David or Tom
- ~~**HIGH** — Env vars + deploy from new repo~~ **RESOLVED** (April 9)
- ~~**MED** — Commercial services yes/no~~ **RESOLVED** — Tom confirmed no commercial services

## 🔨 In Progress — Phase 1 Remaining
- [ ] Run Lighthouse audit — target SEO score ≥ 95
- [ ] Run Google Rich Results Test on key pages
- [ ] Connect production domain in Vercel (restorationroofingsc.com)
- [ ] Update sitemap.xml URLs to production domain
- [ ] GA4 + Search Console setup — Jimmy has Tom's GoDaddy account, can handle DNS verification
- [ ] Submit sitemap to Google Search Console
- [ ] Final QA + go-live

## ⏳ Up Next — Phase 2 (Integrations)
- [ ] **Zuper CRM integration** — wire contact form + chat leads into Zuper for lead management and follow-up
- [ ] **Instant roof estimator** — finalize and integrate estimator tool into the website
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
- [ ] Spanish language pages (`/es/` route)
- [ ] Accessibility audit (WCAG 2.1 AA)

## 🔄 Recently Updated
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
