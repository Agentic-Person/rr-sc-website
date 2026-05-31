# JDMPS → Nova Extraction Checklist

**Date:** 2026-05-31
**Subject:** What JDMPS (rr.jdmps.com) did well that we need to incorporate into the Nova Roofing & Restoration build.
**Audience:** Internal — Jimmy + Claude. Not for client distribution.

---

## Purpose

Surgically pull every concrete SEO/technical pattern from the JDMPS WordPress build that's worth replicating in Nova's Next.js stack. Each item has:
- A description of what JDMPS does
- The Next.js implementation pattern for Nova
- A status placeholder (mark as ✓ done, ⏳ partial, ❌ not yet) — Jimmy fills these in after looking at the current Nova codebase

---

## A. Schema / structured data (the biggest gap from site #1)

### A1. Site-wide schema graph in root layout
**JDMPS pattern:** Yoast generates a `<script type="application/ld+json" class="yoast-schema-graph">` block on every page containing:
- `WebPage` (with `@id`, `url`, `name`, `isPartOf`, `about`, `breadcrumb`, `inLanguage`, `datePublished`, `dateModified`, `potentialAction.ReadAction`)
- `WebSite` (with `@id`, `url`, `name`, `publisher`, `potentialAction.SearchAction` template `?s={search_term_string}`)
- `Organization` (with `@id`, `name`, `url`, `logo`)
- `BreadcrumbList` (per-page breadcrumb)
- `ImageObject` (primary image of the page)

**Nova implementation:**
- Create `src/lib/seo/schema-graph.ts` that exports `buildSchemaGraph({ page, breadcrumbs, image })`
- Call from a root-level Server Component or per-route via `generateMetadata` + a `<Script>` injection
- Source data from typed config (`services.json`, `areas.json`, `pages.json`)

**Status:** ❌ / ⏳ / ✓

---

### A2. `alternates.canonical` per page via `generateMetadata`
**JDMPS pattern:** Yoast outputs `<link rel="canonical" href="https://rr.jdmps.com/[path]/" />` on every page.

**Nova implementation:**
- Every route exports `generateMetadata` returning `{ alternates: { canonical: \`${SITE_URL}${pathname}\` } }`
- Build a `defineMetadata({ path, title, description })` helper so every page uses the same canonical pattern
- Add a CI lint that fails if any page-level component is missing `generateMetadata`

**Status:** ❌ / ⏳ / ✓

---

### A3. `BreadcrumbList` schema from route hierarchy
**JDMPS pattern:** Per-page breadcrumb populated correctly — e.g., for `/roofing/shingle/`: Home → Roofing Services → Shingle Roofing.

**Nova implementation:**
- `src/lib/seo/breadcrumbs.ts` exports `buildBreadcrumbs(pathname, labelMap)` returning the schema and a renderable component
- Renders both the visible breadcrumb UI and the JSON-LD
- `labelMap` lives in typed config so adding `/areas/cherry-hill` automatically generates the right breadcrumb

**Status:** ❌ / ⏳ / ✓

---

### A4. Service schema on every service page
**JDMPS gap (we should beat them):** They put `HomeAndConstructionBusiness` on every page identically. They never put `Service` schema on service pages.

**Nova implementation:**
- `services.json` is the canonical typed list with `name`, `slug`, `description`, `category`, `areaServed`, `provider`, `offers`, `faqs`
- Each `/services/[slug]` page generates `Service` JSON-LD from this data
- `provider` references the global Organization `@id`
- `areaServed` references all relevant area `@id`s

**Status:** ❌ / ⏳ / ✓

---

### A5. FAQPage schema wherever there's FAQ content
**JDMPS gap (big AEO miss for them — we beat them here):** They have FAQ content as plain HTML on the shingle page (and likely others) but no FAQPage schema.

**Nova implementation:**
- FAQs stored as structured data in `services.json` / `areas.json` / dedicated `faqs.json`
- A `<FAQSection>` component renders both the visible HTML accordion and the FAQPage JSON-LD
- Lint: any page declaring FAQs in its frontmatter must export the schema

**Status:** ❌ / ⏳ / ✓

---

### A6. Review + AggregateRating schema
**JDMPS gap:** They show a Google-stars image but no markup. We should mark up real reviews.

**Nova implementation:**
- `reviews.json` (or pulled from a Google Reviews / Reviewable API)
- Each review serialized as `Review` JSON-LD with `author`, `reviewRating`, `datePublished`, `reviewBody`
- `AggregateRating` summarized from the same data and attached to the Organization schema
- Render visible review cards from the same source

**Status:** ❌ / ⏳ / ✓

---

### A7. Per-page Open Graph image auto-generation
**JDMPS gap:** They use one site-wide OG image. AI engines and social platforms prefer page-specific images.

**Nova implementation:**
- Use `@vercel/og` to generate OG images at the edge
- Each page exports `generateMetadata` with `openGraph.images = [\`${SITE_URL}/api/og?title=...&service=...\`]`
- Visual template lives in `src/app/api/og/route.tsx`

**Status:** ❌ / ⏳ / ✓

---

### A8. Use the most specific schema type
**JDMPS gap:** They use generic `HomeAndConstructionBusiness`. The more specific `RoofingContractor` is in schema.org and is recommended.

**Nova implementation:**
- Organization schema uses `@type: ["Organization", "RoofingContractor", "LocalBusiness"]` array for maximum specificity + fallback
- Set `priceRange` credibly (`$$` for premium positioning, not `"$"`)
- Set realistic opening hours (regular hours + a separate emergency note in description, not `00:00–23:59` claim everywhere)

**Status:** ❌ / ⏳ / ✓

---

## B. URL architecture and route structure

### B1. Programmatic area × service combo pages
**JDMPS pattern:** `/areas-served/[city]/[service]/` — 12+ combo pages generated.

**Nova implementation:**
- `src/app/areas/[area]/[service]/page.tsx` dynamic route
- `generateStaticParams()` returns all valid `(area, service)` combinations from typed config
- Page template inserts area-specific copy, area-specific FAQs, area-specific Service schema with `areaServed`
- Sitemap automatically includes all combos

**Calculation for Nova:** ~21 areas × ~10 services = ~210 generated pages. Tom's competitors don't do this.

**Status:** ❌ / ⏳ / ✓

---

### B2. Wider geographic coverage
**JDMPS additions vs our site #1:** Cherry Hill, Russellville, Bonneau, Ladson, Woodhaven, Woodville, Columbia.

**Nova implementation:**
- Port the full area list into `src/data/areas.json`
- Each entry: `slug`, `name`, `region`, `lat`, `lng`, `population`, `localContent` (anything we can say specifically), `services` (which services apply)
- Add Charleston Lowcountry coverage from Scorpion + JDMPS + our original list, deduped

**Status:** ❌ / ⏳ / ✓

---

### B3. Standard supporting pages
**JDMPS pages we didn't have:** `/careers`, `/specials`, `/gallery`.

**Nova implementation:**
- `/careers` — even a stub page with "we're not currently hiring, here's how to apply when we are" is useful for SEO and brand
- `/specials` — seasonal promotions hub, links from ad campaigns
- `/gallery` — distinct from `/portfolio`, more visual/Instagram-style
- All three need the schema graph + canonical + meta description

**Status:** ❌ / ⏳ / ✓

---

### B4. Yoast-style sitemap_index pattern
**JDMPS pattern:** `/sitemap_index.xml` → references `/page-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml`. Each is auto-generated.

**Nova implementation:**
- Next.js 15 `app/sitemap.ts` can return multiple sitemaps via `generateSitemaps`
- Generate separate sitemaps for: pages, services, areas, area-service combos, blog posts
- Sitemap index references all of them
- Each sitemap auto-updates from typed data

**Status:** ❌ / ⏳ / ✓

---

## C. Per-page SEO discipline

### C1. Per-page meta description (with CI enforcement)
**JDMPS pattern:** Yoast forces editors to fill in a meta description before publish. Most JDMPS pages have one (they did miss `/price-my-roof/`).

**Nova implementation:**
- `defineMetadata({ title, description, canonical })` helper requires both fields
- TypeScript types make `description` non-optional
- Lint rule / build check: fail if any page has no meta description or one >160 chars

**Status:** ❌ / ⏳ / ✓

---

### C2. `dateModified` signal on every page
**JDMPS pattern:** Yoast auto-populates `dateModified` in the schema graph based on WP last-edit timestamp. Useful freshness signal for Google and AI engines.

**Nova implementation:**
- Use git log to compute last-modified time of the source MDX/JSON for each route
- Inject into the WebPage schema's `dateModified` field
- Optionally render visibly: "Last updated: May 31, 2026"

**Status:** ❌ / ⏳ / ✓

---

### C3. `inLanguage` declaration
**JDMPS pattern:** Every page declares `"inLanguage":"en-US"` in WebPage schema.

**Nova implementation:**
- Default `inLanguage: "en-US"` on all English routes
- When Spanish translation lands, the Spanish routes declare `"es-US"` and pages link via hreflang

**Status:** ❌ / ⏳ / ✓

---

## D. Things JDMPS missed that we should beat them on

These aren't extractions from JDMPS — they're items JDMPS doesn't have that the modern AEO playbook calls for. Listed here so Nova doesn't miss them.

### D1. `llms.txt` at site root
- `https://novaroofing.com/llms.txt` — modern standard for instructing LLMs where the canonical content is
- Short, structured summary of the business and links to the most citation-worthy pages
- `llms-full.txt` for richer context

**Status:** ❌

---

### D2. Explicit AI bot allow directives in robots.txt
- Allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `GoogleOther`, `applebot-extended`, `anthropic-ai`, `cohere-ai`, `CCBot`
- Some businesses block these — for Nova we want maximum AI visibility

**Status:** ❌

---

### D3. MCP endpoint
- `/api/mcp` exposing services, areas, pricing tiers, contact, current promotions
- Agent-callable structured API
- Future-proofing for the agent-driven web (12–24 months out)

**Status:** ❌

---

### D4. Vector-indexed knowledge base feeding the AI chat
- Knowledge base content embedded into a vector store (Supabase pgvector)
- AI chat retrieves citation-worthy chunks before generating an answer
- Each chat answer includes citation links to the specific pages it grounded on
- This is the AEO multiplier — humans see verified answers, AI engines see citation patterns

**Status:** ❌

---

### D5. Real Spanish translation (not just a toggle)
- `next-intl` or `next-i18next` with `en-US` and `es-US` route trees
- Translated MDX content for major pages and service pages
- Proper `hreflang` cross-references
- Spanish-specific schema (`inLanguage: "es-US"`)

**Status:** ❌

---

### D6. Performance budget enforced in CI
- Lighthouse CI runs on every deployment
- Fails the build if mobile performance score drops below 90
- Catches plugin/dependency creep before it ships

**Status:** ❌

---

### D7. AI-engine citation tracking
- Track which AI engines (ChatGPT, Perplexity, Google AI Overviews, etc.) cite the Nova site
- Tools: manual queries scheduled monthly, or services like Profound / AthenaHQ if budget allows
- Quarterly report so we know whether AEO investments are paying off

**Status:** ❌

---

## E. Call-tracking decision (architecture, not SEO)

JDMPS uses `843-940-7883` (likely CallRail) in their schema and contact areas, with the real `843-306-2939` also appearing in some places. This is dual-NAP and risky.

**Nova decision points:**
- Do we want call tracking? (Probably yes for attribution.)
- If yes, use CallRail's dynamic number insertion (DNI) — JavaScript swaps numbers per traffic source — but keep ONE canonical number in the schema, GBP, and footer.
- DNI swaps the visible number on the page; the schema and citations stay consistent.
- The opposite — putting the tracking number in schema and on GBP — fragments NAP across the web.

**Status:** Decision pending — needs Nova client conversation.

---

## F. Things we built that JDMPS didn't (already in our stack — port to Nova)

Documenting these so they don't get forgotten in the Nova build:

| Feature | Source in site #1 repo | Port priority |
|---|---|---|
| Claude Sonnet 4.6 AI chat with grounded knowledge base | `src/components/ChatWidget.tsx` + `src/app/api/chat/route.ts` + `lib/knowledgebase/` | **Critical — this is Nova's moat** |
| Roofle RoofQuote PRO widget integration on all CTAs | Pattern from commit `597e4ce` | High |
| Calibrated pricing formula (15% waste factor, tier-specific installed prices) | `src/lib/materials.ts` | High (adapt to Nova's actual pricing) |
| Materials comparison page | `src/app/materials-comparison/page.tsx` | High |
| Admin pricing tool gated by auth | `src/app/tools/pricing/page.tsx` | Medium (Nova-specific decision) |
| About page visual treatment — sheen, dark Values panel, family flank photos | `src/app/about/` components | High |
| Bilingual messaging in copy | Throughout | High (and pair with D5 above for real translation) |
| Project-status documentation pattern | `project-status.md` + dated docs | Keep as standard practice |

---

## G. Recommended port order

If we're prioritizing what to bring to Nova first:

1. **A1, A2, A3** — schema graph + canonical + breadcrumbs. Foundation. ~1 day.
2. **B1, B2** — programmatic area × service pages + wide area coverage. ~1 day.
3. **A4, A5** — Service + FAQPage schema. ~1 day.
4. **A6** — Review schema. ~half day.
5. **B4** — sitemap_index pattern. ~half day.
6. **D1, D2** — `llms.txt` + AI bot directives. ~2 hours.
7. **D4** — vector-indexed knowledge base + cited chat. ~2 days.
8. **A7** — per-page OG images. ~half day.
9. **D5** — Spanish translation infrastructure. ~2 days.
10. **D3** — MCP endpoint. ~1 day.
11. **D6** — Lighthouse CI performance budget. ~2 hours.
12. **D7** — AI citation tracking. Ongoing.

Most of this is a 2-week sprint to get a fully AI-native, schema-complete site that beats JDMPS on every axis where it matters.

---

## H. Next step for Jimmy

Open the Nova repo. For each item in sections A–F, mark the status. The ones currently ❌ become a backlog Claude can work through with you.
