# Website Audit — Restoration Roofing SC

**Prepared:** May 31, 2026
**Build under audit:** https://rr.jdmps.com/
**Prepared by:** Jimmy Davidson, Agentic Personnel
**Distribution:** Tom Davis (Restoration Roofing SC), JD Plumbing Partners

---

## Purpose

This document presents an independent audit of the in-development Restoration Roofing SC website at `rr.jdmps.com`. Its intent is to:

1. Document the foundation the build has established
2. Identify items typical of an in-progress staging environment that would benefit from attention before launch
3. Outline AI and conversational-search considerations relevant to the brand's positioning
4. Reference customer-facing features that exist on the prior Next.js build, so that launch planning can decide which to carry forward

This is an observational audit. Findings are presented as recommendations and reference points to support a successful launch.

---

## Audit methodology

The audit examined the following on May 31, 2026:

- Homepage (`/`)
- About Us (`/about-us/`)
- Price My Roof (`/price-my-roof/`)
- Shingle Roofing service (`/roofing/shingle/`)
- Mount Pleasant service area (`/areas-served/mount-pleasant/`)
- Blog post sample (`/what-should-i-do-if-my-roof-is-leaking/`)
- `/robots.txt`, `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`

Inspected: HTTP headers, HTML head and body, JSON-LD structured data, sitemap completeness, canonical URLs, meta tags, schema graph, business NAP consistency, and on-page heading structure.

---

## Stack identified

| Component | Detail |
|---|---|
| CMS | WordPress 7.0 |
| Page builder | Elementor 4.1.1 (Pro) |
| SEO | Yoast SEO |
| Schema | Schema Pro |
| Performance | WP Rocket 3.21.3 |
| Theme | Hello Elementor + child theme |
| Hosting | Apache + HTTP/2 |
| Indexation | Site-wide `noindex,nofollow` (appropriate for staging) |

---

## Strengths

The build has established a solid SEO foundation. The following are present and configured well:

### 1. Schema foundation
Yoast generates a complete schema graph on every page, including:
- `Organization`
- `WebSite` with `SearchAction`
- `BreadcrumbList`
- `WebPage`
- `ImageObject`

Schema Pro additionally outputs a `HomeAndConstructionBusiness` block with NAP, geo, and opening hours. This is a strong foundation; many contractor sites lack any of it.

### 2. Canonical tags
A `<link rel="canonical">` is present on every page, preventing duplicate-content issues in search.

### 3. Programmatic area × service pages
The build includes combination pages following the pattern `/areas-served/[city]/[service]/` — e.g., `/areas-served/mount-pleasant/shingle-roofing/`, `/areas-served/summerville/roof-installation/`. This is a sound local-SEO pattern that compounds well over time.

### 4. Geographic coverage
The sitemap includes service-area pages for Cherry Hill, Russellville, Bonneau, Ladson, Woodhaven, Woodville, and Columbia in addition to the core Charleston Lowcountry cities.

### 5. Performance plugin configured
WP Rocket is enabled with preconnect, lazy rendering, and OCI optimizations, which should support reasonable Core Web Vitals once content is finalized.

### 6. Sitemap structure
A Yoast XML sitemap index is in place at `/sitemap_index.xml` with separate sitemaps for pages, posts, and categories.

### 7. Updated business address
The site reflects the current address: 75 Port City Landing Ste 110, Mount Pleasant, SC 29464.

### 8. Bilingual messaging
Spanish-speaking community messaging is preserved in the content.

### 9. Search engine verification readiness
Yoast structure supports easy addition of Google Search Console and Bing Webmaster verification meta tags at launch.

---

## Items observed during development

These are items typical of an in-progress staging build. They are listed here in one place so they can be addressed before launch.

### 1. License number consistency
**Observation:** Both `RBS 67027` (current) and `RBC 694` (a prior identifier) are visible on several pages.
**Recommendation:** Consolidate to the current license number (`RBS 67027 — Residential Specialty Contractor License`) site-wide.

### 2. Organization logo in schema
**Observation:** The Yoast Organization schema references `/wp-content/uploads/2022/07/nhg-logo.svg` as the brand logo.
**Recommendation:** Replace with the current Restoration Roofing logo so the brand is correctly represented in Google's Knowledge Panel candidates and AI-generated business summaries.

### 3. H1 presence across pages
**Observation:** Several primary pages render without an `<h1>` heading: homepage, `/about-us/`, `/price-my-roof/`, and `/roofing/shingle/`. The Mount Pleasant area page does include one.
**Recommendation:** Configure the Elementor heading widget as H1 on these pages, with exactly one H1 per page.

### 4. Placeholder text on homepage
**Observation:** Three section headings on the homepage render the literal text "Service Name."
**Recommendation:** Populate with the intended service names.

### 5. Staging URLs in public sitemap
**Observation:** `/test/` and `/service-listing-bk/` are accessible (HTTP 200) and listed in `page-sitemap.xml`.
**Recommendation:** Remove these pages and confirm they no longer appear in the sitemap before launch.

### 6. FAQ content present without FAQPage schema
**Observation:** The shingle roofing page presents five Q&As as plain HTML. No FAQPage schema was found on any page audited.
**Recommendation:** Add FAQPage schema (Schema Pro supports this) wherever FAQ content appears. This makes the Q&As eligible for "People Also Ask" panels in Google and for citation in AI Overviews.

### 7. Service schema on service pages
**Observation:** Each page outputs an identical `HomeAndConstructionBusiness` schema block. Service-specific pages (e.g., `/roofing/shingle/`, `/roofing/metal/`) do not currently emit `Service` schema with `provider`, `areaServed`, or `serviceType` properties.
**Recommendation:** Configure Schema Pro to emit page-specific `Service` schema on service pages.

### 8. Review / AggregateRating schema
**Observation:** The homepage displays a Google-stars image, but no `Review` or `AggregateRating` schema markup is present.
**Recommendation:** Add `AggregateRating` schema (and `Review` schema where individual review text is shown) so star ratings are eligible for rich results.

### 9. Phone number in business schema vs. business line
**Observation:** The schema `telephone` value is `843-940-7883`, while the historical business line is `843-306-2939`. Both appear in various places on the site.
**Recommendation:** If `843-940-7883` is a call-tracking number, confirm the rollout plan. Ensure Google Business Profile, citations, and the on-site schema all reference a single, consistent number to preserve NAP (name/address/phone) consistency, which is a major local-search signal.

### 10. Meta description on `/price-my-roof/`
**Observation:** No meta description is currently set on this page.
**Recommendation:** Add a 140–160 character meta description for every public page before launch.

### 11. Schema type specificity
**Observation:** The business schema uses `HomeAndConstructionBusiness`. The more specific `RoofingContractor` type is available in schema.org and is conventional for the industry.
**Recommendation:** Update the business schema `@type` to `RoofingContractor` (or use a typed array including both).

### 12. Opening hours
**Observation:** All pages declare `00:00–23:59` opening hours for every day of the week.
**Recommendation:** Decide whether this is intentional (24/7 emergency availability) or whether standard business hours should be shown with emergency availability noted separately. Either is defensible; consistency with Google Business Profile is what matters.

### 13. Blog post slug artifacts
**Observation:** Several blog post URLs end with truncated slugs — for example:
- `/what-should-i-do-if-my-roof-is-leaking/`
- `/preparing-your-roof-for-severe-weather-in-charle/`
- `/gutter-maintenance-guide-for-charleston-homeowne/`

These appear to be imported from a prior site with auto-generated slugs that truncated at a character limit.
**Recommendation:** Restore slugs to full readable forms and add 301 redirects from the legacy URLs.

### 14. Telephone formatting in schema
**Observation:** Schema `telephone` is `"8439407883"` without separators.
**Recommendation:** Use E.164 format (`+1-843-940-7883`) for cleaner parsing by Google and AI engines.

---

## AI and conversational-search considerations

A growing share of customer research is shifting from traditional search-result pages to AI-generated answers via ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini. These engines select which businesses to cite based on a specific set of signals, several of which differ from classic SEO factors.

### What AI engines reward, mapped to the current build

| Signal AI engines reward | Status on current build |
|---|---|
| Foundational schema (Organization, WebSite, Breadcrumb) | Present ✓ |
| FAQ schema | Not currently present |
| Service-specific schema with `provider` and `areaServed` | Not currently present |
| Review / AggregateRating schema | Not currently present |
| Distinctive, verifiable content (specific products, named credentials, structured data points) | Partial |
| Consistent business identity (NAP, license, schema) across the web | Currently inconsistent (see items 1, 9) |
| Explicit guidance to AI crawlers (`llms.txt`, `robots.txt` directives) | Not currently configured |
| Conversational surface (on-site chat) AI engines can probe | Not present |

### Recommendations specific to AI / conversational search

1. **Add FAQPage schema** wherever FAQ content appears — the single highest-impact item for AI-search eligibility on this build
2. **Add page-specific Service schema** on each service page (`provider`, `areaServed`, `serviceType`, `category`, `offers`)
3. **Add Review / AggregateRating schema** for star eligibility
4. **Reconcile license number and phone NAP** across the site, Google Business Profile, and major citation sites
5. **Add `llms.txt`** at the site root with a structured summary of the business and links to key pages (an emerging standard supported by major AI engines)
6. **Add explicit allow directives in `robots.txt`** for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `GoogleOther`, `applebot-extended`, and `anthropic-ai`
7. **Consider an embedded AI chat** that can answer customer questions grounded in the site's structured content. This serves two purposes: a direct customer engagement surface and a verification surface that AI engines can use to ground their answers.

Items 1–6 are direct configuration changes within the current stack. Item 7 typically requires a separate technical track.

---

## Reference: features available for import from the prior Next.js build

The prior Restoration Roofing SC website — built on Next.js and currently deployed at `https://rr-sc-website.vercel.app` — includes a set of customer-facing features that have not yet been built on the rr.jdmps.com site. JDMPS has full permission from the client to import, adapt, or rebuild any of these features as part of the new build. They are listed here so launch planning can prioritize which to bring in, in what order, and through which implementation path.

All features in the table below **can be built on the WordPress / Elementor stack.** The "Implementation path" column indicates the typical level of effort and the most direct approach. None of these features are exclusive to Next.js — the original build's framework is incidental.

| Feature | Description | Implementation path on WordPress |
|---|---|---|
| Roofle RoofQuote PRO on every CTA | All "Get Free Estimate" CTAs open the Roofle slideout for instant pricing. Currently active on `/price-my-roof/` only. | **Configuration.** Add the Roofle embed script to a global CTA component and link the CTAs across the site. Hours. |
| `/materials-comparison` page | Side-by-side comparison of shingle, metal, slate, and TAMKO HailGuard with specs and warranty terms. | **Content + Elementor.** Build as an Elementor page with a comparison table block. Content already exists in the prior build and can be imported. Half a day to a day. |
| TAMKO HailGuard product-specific content | Calibrated specs on the shingle Restoration Roofing actually installs. | **Content.** Update the shingle service page with the product-specific copy already written. Hours. |
| `/reviews` dedicated page | Consolidated testimonials with structured presentation. | **Standard page + reviews plugin.** Build with a WordPress reviews plugin (e.g., Site Reviews, Trustindex) or hand-curated content. Half a day. |
| Spanish bilingual toggle (UI) | Active toggle that switches the interface, not just messaging in copy. | **Plugin.** WPML or Polylang. Translation work is the real effort; the toggle itself is plugin-driven. Plugin setup is hours; translation depends on content scope. |
| Brand mascot character | A roofing-themed mascot used as a brand differentiator. | **Asset import.** Image assets and integration into hero / CTA components. Hours. |
| About-page visual treatment | Elevated visual design including sheen on cards, dark Values panel, and family photographs. | **Design work.** Custom Elementor styling or a child-theme CSS pass. A day or two of design + build. |
| Admin pricing calculator (gated `/tools/pricing`) | Internal-use calculator pulling live pricing data. | **Custom plugin or page.** Build as a custom Gutenberg block or shortcode, gated by WordPress user role. Pricing data can live in WP custom post types or in the existing Supabase database via a small API plugin. A few days. |
| Calibrated pricing formula | Quote logic based on RoofQuote PRO configuration plus a 15% material waste factor. | **Logic port.** The formula is portable to PHP/JavaScript. Bundles with the calculator above. A day or two on top of the calculator. |
| Claude Sonnet 4.6 AI chat | Embedded on every page; answers roofing questions, explains materials and process, and generates ballpark estimates 24/7. Grounded in a Restoration Roofing-specific knowledge base. | **Custom development.** Several practical paths exist: (a) embed the existing Vercel-hosted chat as an iframe widget on the WordPress site, (b) build a custom WordPress plugin that calls the Anthropic API with the knowledge base content and renders a chat UI, or (c) use a third-party chatbot platform (Tidio, Intercom, Botpress) integrated to Anthropic. The custom plugin path is the closest match to the prior build's behavior. The knowledge base content is ready to import. Estimated effort: 1–3 weeks depending on path. |

### Suggested feature-import order

If JDMPS plans to bring some or all of these into the launch, a sensible order is:

1. Roofle on every CTA (lowest effort, highest conversion impact)
2. TAMKO HailGuard product content on the shingle page
3. Materials comparison page
4. Reviews page
5. About-page visual treatment
6. Spanish bilingual toggle + translation
7. Admin pricing calculator (if Tom uses it internally)
8. Mascot character (if Tom wants it preserved)
9. AI chat (largest effort, but also the largest brand-differentiator and AI-search asset)

The AI chat is the only feature in this list that requires custom development rather than configuration, plugins, or content work. It is also the feature most aligned with the AI / conversational-search considerations described in the prior section, so it warrants explicit launch-planning attention regardless of which implementation path is chosen.

---

## Suggested pre-launch checklist

A consolidated checklist of the items above, grouped for action:

**Brand and identity**
- [ ] Consolidate license number to RBS 67027 site-wide
- [ ] Replace logo in Yoast Organization schema with current brand asset
- [ ] Update business schema `@type` to `RoofingContractor`
- [ ] Confirm and document call-tracking phone strategy; reconcile NAP across site, GBP, and citations
- [ ] Decide on opening hours representation

**Content and structure**
- [ ] Ensure every primary page has exactly one `<h1>`
- [ ] Replace "Service Name" placeholder headings on the homepage
- [ ] Add meta descriptions to all public pages (including `/price-my-roof/`)
- [ ] Restore blog post slugs to full readable forms with 301 redirects from legacy URLs

**Schema additions**
- [ ] FAQPage schema on all pages with FAQ content
- [ ] Page-specific Service schema on each service page
- [ ] Review / AggregateRating schema for star eligibility
- [ ] Telephone formatting in E.164 (`+1-843-...`)

**Sitemap and crawlability**
- [ ] Remove `/test/` and `/service-listing-bk/`; confirm they're not in the sitemap
- [ ] Add `llms.txt` at site root
- [ ] Add explicit AI bot allow directives in `robots.txt`
- [ ] Flip site from `noindex,nofollow` to `index,follow` at launch
- [ ] Confirm 301 redirect map from legacy URLs to the new structure
- [ ] Confirm Google Search Console change-of-address and Google Business Profile URL update plan at launch

**Feature import from prior build (see Reference section)**
- [ ] Confirm import scope and order for features available from the prior Next.js build
- [ ] Decide implementation path for the AI chat (iframe embed, custom plugin, or third-party integration)

---

## Closing note

The build under audit demonstrates a solid SEO foundation and is making good progress toward launch. The items identified here are typical of a staging environment and are listed in one place to support efficient pre-launch planning. The AI / conversational search section is included because it represents a rapidly evolving area where small additions can produce meaningful differentiation in how the brand appears in AI-generated answers.

I'm available to coordinate with the JDMPS team on any item — particularly the AI-related considerations, which intersect with technologies less commonly addressed in traditional SEO workflows.

— Jimmy Davidson
Agentic Personnel
jimmy@agenticpersonnel.com
