# Executive Summary — Website Handoff to JD Plumbing Partners

**Date:** May 31, 2026
**For:** Tom Davis, Restoration Roofing SC
**From:** Jimmy Davidson, Agentic Personnel
**Subject:** Independent audit of the JDMPS build (rr.jdmps.com) and a clear picture of what continues, what pauses, and what we're carrying forward into Nova Roofing & Restoration.

---

## Why this document exists

You've made the decision to hand the public Restoration Roofing SC website over to JD Plumbing Partners (JDMPS) to run the SEO, content management, and Google Business integration going forward. That's a reasonable decision and a common pattern in the home-services industry. This document is not an argument against it — it's an honest, professional read on:

1. What the JDMPS build does well today
2. What is still incomplete on their site (typical for a staging build — flagged so it gets resolved before launch)
3. What capabilities from the Next.js build we delivered will not carry forward under their stack
4. What we're carrying forward into your **Nova Roofing & Restoration** website

The intent is to give you a clear baseline so that when you evaluate JDMPS's performance over the next 60–90 days, you have factual reference points rather than impressions.

---

## What the JDMPS build does well

The JDMPS site (`rr.jdmps.com`) is a WordPress build using Elementor, Yoast SEO, Schema Pro, and WP Rocket. They've laid down a solid SEO foundation:

| Strength | Detail |
|---|---|
| **Site-wide schema graph** | Yoast generates `Organization`, `WebSite`, `BreadcrumbList`, and `WebPage` schema on every page. This is exactly the foundational structure search engines and AI engines use to understand your business. |
| **Canonical tags on every page** | Prevents duplicate-content issues in Google's index. |
| **Breadcrumb navigation schema** | Properly populated on service and area pages. |
| **Programmatic area × service pages** | They've built a template that generates "[service] in [city]" pages — e.g., `/areas-served/mount-pleasant/shingle-roofing/`. This is genuinely good for local SEO. |
| **Wider geographic coverage** | They've added Cherry Hill, Russellville, Bonneau, Ladson, Woodhaven, Woodville, Columbia — areas we didn't cover. |
| **Standard agency pages** | `/careers`, `/specials`, `/gallery` round out the site. |
| **Yoast XML sitemap index** | Cleanly organized into pages, posts, and category sitemaps. |
| **Updated business address** | 75 Port City Landing Ste 110 is correctly reflected. |
| **Bilingual messaging preserved** | The Spanish-speaking community copy carried over from our build. |

If JDMPS does what good SEO agencies do over the next quarter — publishes blog posts on a regular cadence, fixes the items below, manages your Google Business Profile, and adds new local landing pages — you should see organic search traffic improve. That's the floor.

---

## What is still incomplete (typical for a staging build — flagged so it can be resolved before launch)

The site is currently in active development and not yet published to the public. The following items are normal staging-build issues, but they need to be cleaned up before the site goes live. Sharing them so you can confirm JDMPS has them on their pre-launch checklist:

| Item | Status | Why it matters |
|---|---|---|
| **License number appears in two forms on the same page** | Both `RBS 67027` (correct) and the older `RBC 694` are visible. | Customers and auditors should see one consistent license number. |
| **Logo in Yoast Organization schema points to a template default** (`nhg-logo.svg`) | Not the Restoration Roofing logo. | Affects how the business appears in Google's Knowledge Panel candidates and AI-generated business cards. |
| **Homepage and several other pages have no `<h1>` heading** | About Us, Price My Roof, and the Shingle Roofing service page show no H1. The Mount Pleasant area page does have one. | H1 is one of the strongest on-page SEO signals. Inconsistent application weakens it. |
| **Placeholder "Service Name" headings still visible on the homepage** | Three section headings render the literal text "Service Name." | Indicates the Elementor template hasn't been fully populated yet. |
| **Staging pages `/test/` and `/service-listing-bk/` are publicly accessible and in the sitemap** | These should be removed before launch. | They'd be indexed if the site were live, hurting site quality signals. |
| **FAQ content is present but not marked up with FAQ schema** | The shingle page has 5 Q&As as plain HTML. | Without FAQ schema, those Q&As cannot appear in Google's "People Also Ask" or in AI Overviews. |
| **The same generic business schema block repeats on every page** | All 64 pages output the identical `HomeAndConstructionBusiness` JSON-LD. | Service pages should have `Service` schema; review areas should have `Review` schema; etc. Generic repetition is a missed opportunity rather than a defect. |
| **The phone number in the site's schema (843-940-7883) differs from your business line (843-306-2939)** | This is likely a CallRail call-tracking number. | If intentional, that's a reasonable agency practice — but it needs to be reconciled with your Google Business Profile and citations across the web, or it will fragment your "NAP" (name/address/phone) consistency, which is a major local-SEO signal. |
| **`/price-my-roof/` has no meta description** | A blank meta description forces Google to auto-generate one, often poorly. | A two-minute fix per page in Yoast. |

None of these are dealbreakers. They are the items I'd ask any agency to confirm are on their pre-launch QA list.

---

## What you originally had and what doesn't carry forward

The Next.js build we delivered was designed around an AI-native approach: a site that participates in the conversational, AI-driven web that's emerging. JDMPS's stack (WordPress + Elementor + plugins) is a more traditional SEO architecture and doesn't carry those features forward. Here's the honest list of what your customers and the search ecosystem won't see going forward:

### Customer-facing features that don't continue

| Feature we built | Status on JDMPS site |
|---|---|
| **Claude Sonnet 4.6 AI chat on every page** — Customers could ask roofing questions, get explanations of materials, hear about your specific process, and receive ballpark estimates 24/7. | Not present. |
| **Roofle quote widget on every "Get Free Estimate" CTA** | Present on one page only (`/price-my-roof/`), not across the site. |
| **Russell the giraffe brand mascot** | Not present. |
| **`/materials-comparison` page** — In-depth side-by-side of shingle, metal, slate, and TAMKO HailGuard with specs and warranty terms. | Not present. |
| **TAMKO HailGuard product-specific copy** with calibrated specs from our May 14 update. | Replaced with generic shingle copy. |
| **Calibrated pricing formula** powering the AI chat estimates (15% material waste factor, tier-specific installed prices from your RoofQuotePRO config). | Not present. |
| **`/tools/pricing` admin calculator** (internal-use, gated). | Not present. |
| **Spanish bilingual toggle (UI)** | Not present — bilingual messaging remains in copy, but no actual Spanish UI. |
| **About page visual polish** — Sheen on cards, dark Values panel, family flank photos. | Replaced with stock Elementor template. |
| **Dedicated `/reviews` page** consolidating testimonials. | Not present — testimonials appear inline on some pages. |

### What carried over

For the record: JDMPS did port your **team bios** (verbatim — they pasted the HTML directly from our `/about` page), your **updated address**, your **correct license number** (alongside the old one, as noted above), and your **bilingual messaging in copy**.

---

## The biggest strategic shift: AI search engine visibility

This is the most important section of this document, because it's where the world is moving and where the implications of the stack choice are felt the most.

Search behavior is shifting from "ten blue links" to AI-generated answers. ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews now write paragraph-form responses to questions like "best roofer in Charleston for hurricane damage" and cite 2–5 sources by name. The businesses that get cited are those with:

1. **Structured, machine-readable content** — schema markup that goes beyond the basics, especially FAQ, Service, Review, and AggregateRating schema
2. **Distinctive, verifiable content** — product specifics, real warranty terms, named team members with credentials, real reviews
3. **Consistent entity grounding** — same NAP and licensing across the web
4. **Direct conversational surfaces** — an on-site chat that AI engines can probe to verify what you actually do

### Where the JDMPS site stands today on AI-search readiness

| Capability | JDMPS site |
|---|---|
| **Foundation schema (Organization, WebSite, Breadcrumb)** | Present ✓ |
| **FAQ schema** | Not present |
| **Per-service Service schema with `areaServed` / `provider`** | Not present (generic block repeated) |
| **Review / AggregateRating schema** | Not present |
| **Product-specific content (TAMKO HailGuard, calibrated specs)** | Not present (generic copy) |
| **AI chat surface for engines to probe** | Not present |
| **`llms.txt` for AI-engine guidance** | Not present |
| **Explicit allow directives for GPTBot, ClaudeBot, PerplexityBot** | Not present |
| **MCP endpoint for agent-callable web** | Not present |
| **Vector-indexed knowledge base for AI grounding** | Not present |

### What this means in practical terms

Under JDMPS, the site will be **findable** in classic Google search for terms like "Charleston roofer" and "shingle installation Mount Pleasant." You should see organic traffic over time.

The site is **unlikely to be cited** in AI Overviews, ChatGPT answers, Perplexity responses, or similar AI surfaces. The reasons are structural to the build — not a criticism of JDMPS's work, but a consequence of the stack and content approach. They're optimizing for the search world as it existed in 2018–2022. The AI-search world that's emerging in 2025–2027 needs a different set of signals, and the JDMPS build doesn't currently include them.

### What we were planning to do

The Next.js build was on a roadmap toward AI-search citation. Items we had documented in `docs/AEO-GEO-AIO-STRATEGY-restoration-roofing-SC.md` and were planning to implement:

- Full schema graph (Organization, WebSite + SearchAction, BreadcrumbList, Service per page, FAQPage, Review, AggregateRating)
- `alternates.canonical` on every page
- Programmatic area × service pages (the same pattern JDMPS uses, which we'd have built natively in Next.js)
- `llms.txt` and explicit AI-bot allow directives
- MCP server exposing services, areas, and pricing as agent-callable data
- Real Spanish translation (not just toggle)
- Vector-indexed knowledge base feeding the chat with cited URLs
- AI chat that returns citations to specific pages, enabling AI engines to grade the site as a verified source

That roadmap pauses on the Restoration Roofing SC site under JDMPS's stewardship. It's possible they will eventually add some of these items; it's reasonable to ask them whether and when.

---

## What carries forward to Nova Roofing & Restoration

The work didn't disappear — it evolved. Your second site, **Nova Roofing & Restoration**, is being built on Next.js with the AI-native architecture baked in from day one, plus all the SEO foundations JDMPS does well. Specifically:

- AI chat grounded in Nova's own content with citation links
- Full schema graph and canonical structure from launch
- FAQ schema, Service schema, Review schema — all the markup AI engines reward
- Programmatic area × service pages
- Real Spanish translation infrastructure
- `llms.txt` and AI-bot allow directives in `robots.txt`
- MCP endpoint preparing for agent-callable commerce
- Performance budget enforced (Next.js + Vercel edge architecture, no plugin bloat)
- Per-page OG image generation
- Content as structured data, queryable by the site front-end *and* the AI chat
- Direct git-tracked changes with full transparency on what was changed when and why

So the AI-search-engine-visible version of "what Tom Davis can deliver" continues at Nova. Restoration Roofing SC under JDMPS pursues the conventional-SEO path.

---

## Recommendation

Give JDMPS the runway they need to launch and demonstrate results. Reasonable evaluation criteria for the 60–90 day window after launch:

1. **Pre-launch cleanup** — are the staging items above all resolved before the site goes live?
2. **Organic traffic** — is Google Search Console traffic on `restorationroofingsc.com` trending up vs. the legacy Scorpion site baseline?
3. **GBP performance** — are calls, direction requests, and profile views increasing?
4. **AI citation presence** — when you ask ChatGPT / Perplexity / Google AI Overviews "best roofer in Charleston / Mount Pleasant," does Restoration Roofing appear in the cited list? (This is the test JDMPS's stack is unlikely to pass without intervention.)
5. **Transparency** — are you getting clear monthly reports of what they actually shipped, what they're working on, and what's blocked?

If at the 90-day mark organic and GBP are improving but AI presence is absent, that's the moment to decide whether to ask JDMPS to add the AI-native layer or to revisit the stack.

In the meantime, the work continues at Nova on the architecture that *does* address all of the above.

---

*Prepared by Agentic Personnel. This document is intended for Tom Davis's personal review and is not a public-facing communication. Any decisions about how to discuss the audit with JDMPS are entirely at Tom's discretion.*
