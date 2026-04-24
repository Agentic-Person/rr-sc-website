# Website Progress Update Phase 1.5
**April 23, 2026 | Prepared by Agentic Personnel**

---

## What We've Built: Site Overview

Your website is a full, 73-page server-rendered website built on Next.js 15 — a modern framework used by enterprise brands. It is currently live at **https://rr-sc-website.vercel.app**, with the production domain cutover to **restorationroofingsc.com** as the next major milestone.

---

## What's Been Done — Recent Sessions

### Branding & Mascot (April 22)
Your custom SC Roofing giraffe mascot is now live across the site in two places:
- **Chat widget** (bottom-left, homepage only) — blue hard hat + headset, holding a tablet with action buttons: text us, chat with AI, and schedule
- **Quote tab** (slides in from the right, every page) — "peek" pose with a "GET ESTIMATE" prompt that opens the Roofle instant estimator

Both use v5 assets you provided, converted to high-performance WebP format (97% file size reduction on the quote giraffe). All Pink Panther / Owens Corning branding is stripped.

### "Get Started" Header CTA (April 22)
The old cold "Free Estimate" button is gone. In its place is a warm hover-dropdown with three explicit paths designed for your target audience (35–45-year-old homeowners arriving from social/referral):

1. **Text us** — inline opt-in panel with legal consent language (TCPA-compliant)
2. **Have our team contact you** — no-pressure callback form with a "Send Friend Request" button
3. **Get a quick estimate** — opens the Roofle instant estimator inline

### SMS Compliance (April 22–23)
Every text/SMS action on the site now goes through a proper opt-in flow:
- Consent checkbox with legally required language before any SMS action unlocks
- Shared opt-in state across all CTAs (if someone opts in from the header, the chat widget remembers it)
- **Privacy Policy** (`/privacy`) and **Terms of Service** (`/terms`) pages are live and linked in the footer
- The remaining step is 10DLC carrier registration (1–3 week process with your SMS provider once you confirm whether Zuper handles SMS natively)

### Zuper CRM Placeholder (April 23)
The "schedule" button in the chat widget now shows a "Connecting to Zuper" card with a tap-to-call fallback, so visitors have a real action while the integration is being configured. It's swap-ready — one line of code to replace with the real Zuper scheduler URL.

### Roof Quote Page (April 22)
- New aerial hero photo (your actual job-site image, replacing a stock placeholder)
- Shingle tiers corrected to proper Good / Better / Best hierarchy:
  - **GOOD** — Owens Corning Oakridge ($9–14k)
  - **BETTER** (recommended) — Owens Corning Duration 130 mph ($11–16k)
  - **BEST** — TAMKO Storm Fighter 160 mph ($14–20k)
- Visual elements are still being refined — see blockers below for what we need from you

### Mobile-First Overhaul (April 18) — 3 Hours of Build Time

This was a full performance and accessibility audit followed by targeted fixes across every page of the site. Here's what was done and why each item matters:

**Image optimization**
Every image on the site was converted to use Next.js's built-in image component, which automatically generates multiple sizes (640px through 3840px wide), serves next-generation AVIF or WebP format depending on the visitor's browser, and defers off-screen images from loading until needed. Google uses image load speed as a direct ranking signal — specifically the LCP (Largest Contentful Paint) metric. The homepage hero now has a preloaded responsive image set of 8 sizes and loads as fast as the browser physically can.

**Tap target sizing**
Every button and link on mobile was audited against Apple's iOS Human Interface Guidelines and Google's accessibility standards, both of which require a minimum 44×44px touch target. The header hamburger menu, mobile phone CTA, and theme toggle all failed this threshold. All fixed. Google factors mobile usability into its ranking scores.

**iOS Safari URL-bar jump fix**
On every iPhone, the browser toolbar shows and hides as you scroll, shifting the visible viewport height. Pages using the standard CSS viewport unit would visually jump or resize as the toolbar appeared and disappeared. Converted all hero sections, modals, and overlays to use the updated `svh` unit, which accounts for the toolbar offset. This was affecting every iPhone visitor on the site.

**Accessibility: reduce motion**
All animations and transitions on the site now automatically disable themselves if a visitor has the "reduce motion" preference enabled on their device. This is a WCAG 2.3.3 accessibility requirement, and Google's quality scoring increasingly incorporates accessibility signals.

**LCP paint improvement on sub-pages**
Each service page and location page was opening with a 1.5-second animated fade-in on the page headline. While smooth, this delayed when the browser — and Google — could paint the H1, which is a ranking signal. Removed the delay. Headlines now paint instantly on load.

**Mobile widget collision fix**
The giraffe chat widget and the Roofle "Get Instant Roof Quote" button were overlapping on small phones. Repositioned the chat widget to clear the Roofle button on mobile screen sizes.

**Roofle preconnect**
Added a browser preconnect hint for the Roofle script. This tells the visitor's browser to start the Roofle server connection approximately 150ms earlier on mobile networks — meaningful on 4G/LTE where every round trip counts.

### Why We Built on Next.js

Your site runs on Next.js 15 with server-side rendering, hosted on Vercel — the platform built by the Next.js team. Every page delivers complete, fully-rendered HTML to any browser, search engine, or AI assistant that visits. This includes Google's crawlers, ChatGPT's GPTBot, Perplexity's crawler, voice assistants, and Bing Copilot. All 73 pages are pre-rendered at build time, meaning there's no delay or JavaScript execution required for your content to be readable.

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Rendering | Server-side + static (73 pages pre-rendered at build time) |
| SEO | Metadata API — all titles, descriptions, and schema baked into HTML source |
| Styling | Tailwind CSS + shadcn/ui component library |
| Database | Supabase (PostgreSQL + vector search for AI chat) |
| AI Chat | OpenAI GPT-4o Mini + 13,000-word knowledge base |
| Hosting | Vercel (native Next.js, global CDN) |
| Analytics | Google Analytics 4 |

---

## SEO Already In Place

These are active and live on the site right now:

| Feature | Status |
|---|---|
| Server-rendered HTML on all 73 pages | ✅ Live |
| Unique title + description per page | ✅ Live |
| JSON-LD structured data on all service + location pages | ✅ Live |
| LocalBusiness + RoofingContractor schema on homepage | ✅ Live |
| FAQPage schema (auto-generated on every service page) | ✅ Live |
| BreadcrumbList schema on service + location pages | ✅ Live |
| Internal linking system (service to location cross-linking) | ✅ Live |
| 21 dedicated location pages with unique geo metadata | ✅ Live |
| Site-wide geo meta tags (SC region, Mount Pleasant coordinates) | ✅ Live |
| Physical address embedded in all schemas | ✅ Live |
| Privacy Policy + Terms of Service (TCPA/CTIA compliant) | ✅ Live |
| robots.txt allowing all crawlers | ✅ Live |
| sitemap.xml linked from robots.txt | ✅ Live |
| GA4 analytics | ✅ Live |
| Blog infrastructure (Supabase-backed, 9 posts drafted) | ✅ Built, not yet published |
| AI chat widget with 13,000-word knowledge base (RAG) | ✅ Live |

---

## The AEO / GEO / AIO Strategy — Overview for Tom

This is a plan we have fully designed and documented. **It has not been implemented yet — we need your green light.**

### What these three things mean (in plain English)

**SEO** is traditional Google — showing up in the blue-link results when someone searches "roofing company Mount Pleasant SC."

**AEO (Answer Engine Optimization)** is being the source that Google pulls for featured snippets, the "People also ask" boxes, and voice assistant answers. When someone asks Google "how much does a roof replacement cost in Charleston?" — we want your site to be the answer that appears above the organic results.

**GEO (Geographic/Local SEO)** is dominating Google Maps and the local pack — the three businesses that appear on the map when someone searches "roofers near me." This requires the production domain to be live and connected to your Google Business Profile.

**AIO (AI Overview Optimization)** is being cited when someone asks ChatGPT, Perplexity, Claude, or Google's AI Overview "who is the best roofing contractor in Mount Pleasant?" AI models pull answers from sites that have clean HTML, rich structured data, and authoritative long-form content. This is an early-mover opportunity — most competitors' sites are invisible to AI crawlers.

### Why We're Positioned to Win This

Your site is built on a stack that was designed with search visibility as a first principle. AI crawlers — ChatGPT's GPTBot, Google's crawlers, Perplexity — do not execute JavaScript. Sites that deliver JavaScript bundles instead of rendered HTML serve these crawlers an empty page. Your site delivers complete, structured HTML on all 73 pages, with schema markup already baked in for every location and service page. Competitors running older or lighter-weight web technologies simply don't show up.

We're at **5 of 10 fully complete** on the optimization checklist, with 4 more partially done. The remaining work is targeted and well-defined — no guesswork, no bloated scope.

---

## What Needs Your Green Light

The items below are designed, documented, and ready to implement. They represent the difference between "a good website" and "a site that gets cited by ChatGPT and dominates the local pack."

---

### AEO Completion

**1. Global brand schema in root layout**
Add `Organization`, `LocalBusiness`, and `WebSite` (with search action) to the root layout so every page on the site carries your brand entity. This is currently missing and is table stakes for AI citation. *One PR, 2–3 hours of work.*

**2. Canonical tags on every page**
Every page needs to declare its own URL as the canonical to prevent duplicate-content dilution in Google's index. Currently zero pages do this. *One PR, ~1 hour.*

**3. Launch the blog (9 posts ready)**
You already confirmed 9 posts per month automated. We have 9 posts drafted and the infrastructure is fully built — it just isn't turned on. Long-form Q&A content is the single largest AEO and AIO lever. LLMs overwhelmingly cite "ultimate guide" style content. Every day this sits unpublished is a missed citation opportunity. *Flip a switch — the system is built.*

**4. BlogPosting schema on blog posts**
Once the blog launches, each post needs its own Article/BlogPosting structured data so Google can surface rich results (author, date, breadcrumb). *Bundled with the blog launch, no extra step.*

**5. /process page with HowTo schema**
The 6-step roofing process currently lives as a section on the homepage. Promoting it to `/process` with HowTo schema makes it eligible for Google's rich-result carousel when someone searches "how does a roof replacement work." This is AEO gold in the roofing vertical. *~2 hours.*

**6. Schema on remaining pages** (About, Contact, Portfolio, Financing, service index, areas index)
These pages have content but no structured data. Adding the appropriate schemas closes the gaps. *One PR, 2–3 hours.*

**7. Dynamic sitemap**
The current sitemap is a static file that won't include new blog posts automatically. Converting to a dynamic version means every post auto-registers the moment it goes live. *~2 hours.*

**8. Direct-answer paragraphs on service pages**
Each service page should open with a direct-answer sentence: "Roof replacement in Charleston typically costs $X–$Y and takes 1–2 days." This is the format LLMs lift verbatim into AI Overviews. Requires real pricing data from Dave. *Content-dependent.*

---

### GEO (Local Pack)

**9. Production DNS cutover to restorationroofingsc.com**
This is the unlocker for everything GEO. Until the domain is live, we can't verify in Google Search Console, we can't link the Google Business Profile, and your citation signals are scattered. *We handle this in GoDaddy.*

**10. Google Search Console + Bing Webmaster + GBP link + NAP audit**
After the domain goes live: submit the sitemap, verify with Google and Bing (Bing powers ChatGPT and Copilot), link the Google Business Profile to the production domain, and audit Name/Address/Phone consistency across Yelp, Facebook, Apple Maps, and GBP. *1–2 hours combined; requires your GBP access.*

---

### AIO (AI Citation)

**11. llms.txt + explicit AI crawler policy**
An `llms.txt` file tells AI models what your site covers and how to cite it (an emerging convention like `robots.txt` for AI). Making the allow list explicit in `robots.txt` ensures future policy changes don't accidentally block your AI citation surface. *~45 minutes.*

**12. Fact Sheet page**
A dedicated page with your licenses, insurance, founded year, service area, materials, and warranty terms. LLMs use this to answer "is this contractor legit?" queries. *~2 hours for content + build.*

**13. Customer review collection → AggregateRating schema**
Star ratings in Google SERPs require `AggregateRating` structured data. Infrastructure is ready — blocked on review collection. *Pending David/Tom.*

---

## Recommended Sequence — What to Prioritize

### Do These First — Highest ROI, Low Effort

| Step | Task | Effort |
|---|---|---|
| 1 | Production DNS cutover — unblocks all GEO tracking | 30 min |
| 2 | Launch the blog — biggest AEO/AIO lever, system is built | Flip a switch |
| 3 | Global schemas + canonical tags — one PR, highest schema ROI | 3–4 hours |
| 4 | BlogPosting schema + dynamic sitemap — bundle with blog launch | 2 hours |

These four items can be executed in a single sprint and represent the sharpest return on investment.

### Schedule These Within 30 Days

| Step | Task | Effort |
|---|---|---|
| 5 | GSC + Bing Webmaster + GBP domain link (requires your GBP access) | 1–2 hours |
| 6 | /process page with HowTo schema — AEO carousel opportunity | 2 hours |
| 7 | Remaining page schemas (About, Contact, Portfolio, Financing) | 2–3 hours |

### Can Wait — Post-Launch Optimization

| Step | Task | Effort |
|---|---|---|
| 8 | Fact Sheet + llms.txt + AI crawler policy | 1–2 hours |
| 9 | Direct-answer paragraphs on service pages | Waiting on Dave pricing |
| 10 | AggregateRating schema | Waiting on review collection |

---

## Current Blockers Waiting on You / Dave

| Item | Waiting On |
|---|---|
| Roof quote page verbiage review | Tom — verbiage needs your sign-off before we lock in the page |
| ABC Supply shingle pricing (TAMKO Storm Fighter + tier prices) | Dave |
| Real team headshots + project photos | Tom — we know you're working on this |
| "What Our Customers Say" reviews section | David or Tom |
| 10DLC carrier registration | Confirm SMS provider (Zuper native vs. external) |
| Zuper CRM intake config | Zuper onboarding |

---

*Questions or want to schedule a call to walk through the AEO/GEO/AIO strategy? We can prioritize whatever makes the most sense for your launch timeline.*
