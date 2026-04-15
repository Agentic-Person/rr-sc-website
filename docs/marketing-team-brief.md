# Restoration Roofing SC — Website Technical Brief
*Prepared by Jimmy Davidson, Agentic Personnel — April 2026*

---

## Live Site

- **Staging URL:** https://rr-sc-website.vercel.app
- **Production domain:** Pending DNS connection — needs to be live before ad campaigns launch

---

## Tech Stack

### Framework & Rendering
- Built on **Next.js 15 (App Router)** with React 19 and TypeScript
- We use **Server-Side Rendering (SSR) and Static Site Generation (SSG)** — every page ships complete HTML to browsers and crawlers without needing JavaScript to render. This is a significant SEO advantage over older single-page app builds.
- All 73 pages are pre-rendered at build time

### Hosting & Infrastructure
- Hosted on **Vercel** — global CDN, automatic HTTPS, instant deployments
- **Supabase (PostgreSQL)** powers the database layer: blog posts, contact form submissions, and AI chat history
- Running Node.js 24 with Turbopack for fast builds

### Design & UI
- **Tailwind CSS 4** with a custom black-and-orange brand system
- **Framer Motion** for animations
- Fully responsive and mobile-first
- Light/dark mode with automatic system preference detection

### Fonts & Images
- Fonts served via `next/font` — zero layout shift, optimized loading (DM Sans body, Playfair Display headings)
- Images use `next/image` — automatic WebP conversion, lazy loading, responsive sizing out of the box

### Analytics
- **Google Analytics 4** is installed and tracking
- Measurement ID: `G-0LZW0PD82B`
- Loaded non-blocking — does not affect page performance scores

### AI Chat System
- Custom **AI chat widget** (the giraffe mascot) lives on every page
- Powered by **OpenAI gpt-4o-mini** with a 13,000-word knowledge base about the company's services, pricing, and coverage area
- Lead scoring is built in — every conversation is scored by intent (emergency, estimate request, scheduling, insurance claim)
- Includes an instant roof estimate engine inside the chat

### Contact & Forms
- Contact form submissions are server-validated and saved directly to the database
- Rate-limited to prevent spam (5 submissions/minute per IP)

---

## SEO Technical Foundation

### Server-Rendered Metadata
Every page on the site generates its own unique `<title>`, `<meta description>`, Open Graph, and Twitter Card tags server-side. These are baked into the HTML before it ever reaches Google — not injected by JavaScript after the fact.

### Structured Data (JSON-LD)
We've implemented rich structured data across all page types at launch:

| Schema Type | Where Used |
|-------------|------------|
| `RoofingContractor` / `LocalBusiness` | All 21 location pages |
| `Service` | All 32 individual service pages |
| `BreadcrumbList` | All interior pages |
| `FAQPage` | FAQ sections |

Location page schemas include geo coordinates, 24/7 business hours, price range, service area, and a full offer catalog — everything Google needs for local pack eligibility.

### Crawlability
- **Sitemap:** `https://rr-sc-website.vercel.app/sitemap.xml` — 100+ URLs, ready to submit to Google Search Console as soon as the production domain is live
- **robots.txt:** configured and live at `/robots.txt`
- **Geo meta tags** on every page: `geo.region`, `geo.placename`, `geo.position`, and `ICBM` coordinates

### URL Structure
Clean, keyword-rich URLs across the board:

```
/services/roof-replacement
/services/storm-damage-repair
/services/gutter-installation
/areas-we-serve/charleston
/areas-we-serve/mount-pleasant
/areas-we-serve/isle-of-palms
/blog/[slug]
```

### Internal Linking
We built a context-aware internal linking system that connects all 73 pages intelligently — service pages link to the most relevant locations, location pages surface the most relevant services. This maximizes crawl depth and distributes PageRank across the full site.

### Content Coverage at Launch
- 32 individual service pages across roofing, gutters, and storm damage
- 3 service hub/category pages
- 21 location pages covering the greater Charleston metro area
- 9 blog posts live in the database, more in the pipeline

---

## What's Ready Right Now

- Full server-rendered HTML on all 73 pages
- Unique meta tags on every page
- Structured data (RoofingContractor, Service, BreadcrumbList, FAQ)
- Sitemap + robots.txt
- GA4 analytics live and tracking
- AI chat with lead scoring
- Contact form saving to database
- Fully mobile-responsive with dark mode

---

## Pre-Campaign Checklist

These items need to be completed before Google Ads go live:

| Task | Status | Owner |
|------|--------|-------|
| Connect production domain (DNS) | Pending | Jimmy / Tom |
| Verify domain in Google Search Console | Pending | Marketing |
| Submit sitemap.xml to GSC | Pending | Marketing |
| Install Google Tag Manager | Pending | Jimmy |
| Set up GA4 conversion events (form submit, phone click) | Pending | Jimmy + Marketing |
| Set up Google Ads conversion tracking | Pending | Marketing (via GTM) |
| Call tracking number (CallRail or similar) | Pending | Marketing |
| Link Google Business Profile to production domain | Pending | Marketing / Tom |

---

## Questions? Technical Changes?

All content updates, new landing pages, conversion tracking setup, and GTM installation go through me.

**Jimmy Davidson** — jimmy@agenticpersonnel.com
