# Restoration Roofing SC — Bridge Status
> Last updated: April 7, 2026

## 🟢 Status: Next.js Migration Complete — Ready for Deployment

**Phase:** Deploy new Next.js build, then begin Zuper + estimator integrations
**Live:** https://td-rr-website.vercel.app *(pending redeployment from new repo)*
**New Repo:** github.com/Agentic-Person/rr-sc-website
**Previous Repo (Vite SPA):** github.com/SCROOF1/restorationroofing

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

## 🚫 Blockers
- **HIGH** — Need to set `NEXT_PUBLIC_*` env vars in Vercel and redeploy from new repo
- **HIGH** — Jimmy needs to pull pricing from ABC material list where applicable
- **MED** — Project photos + team headshots (team is working on getting real photos)
- ~~**MED** — Commercial services yes/no~~ **RESOLVED** — Tom confirmed no commercial services

## 🔨 In Progress
- [ ] Wire Vercel to new repo + set env vars + deploy
- [ ] Verify live site serves server-rendered HTML (view page source test)
- [ ] Run Lighthouse SEO audit on live deployment
- [ ] Add TAMKO Storm Fighter (Hail Guard) product specs (still need from Tom — not on ABC Supply)
- [ ] Jimmy to find pricing from ABC material list
- [ ] Team gathering real project photos + team headshots

## ⏳ Up Next
- [ ] **Zuper CRM integration** — wire contact form + chat leads into Zuper for lead management and follow-up
- [ ] **Instant roof estimator** — finalize and integrate estimator tool into the website
- [ ] **After-hours voice agent** — Zuper may handle natively; follow up with Zuper to confirm scope
- [ ] FAQ schema on service + location pages (AEO)
- [ ] HowTo schema for process pages (AEO)
- [ ] Google Reviews live feed (API integration)
- [ ] AggregateRating schema on Reviews page (after Google Reviews)
- [ ] Automated blog system — 9 posts per month (client confirmed)
- ~~Commercial services decision~~ — **Declined** by Tom (April 1)
- [ ] Domain transfer → restorationroofingsc.com
- [ ] GA4 + Search Console setup — Jimmy has Tom's GoDaddy account, can handle DNS verification
- [ ] Final QA + go-live

## 🔄 Recently Updated
- **Next.js 15 migration complete** — full SSR/SSG, 73 pages pre-rendered, new repo (April 7)
- Created tech stack, SEO & AEO documentation (April 7)
- Chat widget enlarged to ~half viewport width (April 3)
- Giraffe mascot widget — replaces generic chat FAB (April 3)
- Color scheme: black (#000000) + orange (#ED5A00) — client-requested rebrand (April 2)
- 9 custom blog images replacing Unsplash stock (April 1)
- Instant estimate engine in AI chat with Good/Better/Best tiers (April 1)

## ✅ Done
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
