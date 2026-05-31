# Nova Roofing & Restoration vs. JDMPS — SEO/AEO Comparison

**Date:** 2026-05-31
**Subject:** Mapping the JDMPS extraction checklist against Nova's current state at `https://rr-nova-website.vercel.app/` (production-canonical: `https://www.restorationroofingva.com/`)
**Audience:** Internal — Jimmy + Claude

---

## Headline

**Nova is meaningfully ahead of JDMPS on most axes that matter for AEO/GEO.** The AI bot allow directives, llms.txt, schema entity graph with @id linking, AggregateRating with real numbers, FAQPage schema, RoofingContractor typed array, Service schema with areaServed per city, `potentialAction.QuoteAction`, and `makesOffer` are all present on Nova and absent from JDMPS.

What's outstanding falls into three buckets:
1. **A handful of South-Carolina-to-Virginia migration bugs** — content/template artifacts that didn't get fully re-localized
2. **A few items from the JDMPS extraction checklist** that aren't yet on Nova
3. **A few advanced AEO items** I'd recommend adding regardless

Net assessment: Nova is roughly 80% of the way to "fully AI-native and AEO-optimized." The remaining 20% is real but achievable in a focused sprint.

---

## What's already done on Nova (vs. the JDMPS extraction checklist)

### Schema & structured data (Section A)

| Item from checklist | Status on Nova | Detail |
|---|---|---|
| A1. Site-wide schema graph in root layout | ✓ | `Organization` with `@id`, logo `ImageObject`, `ContactPoint`, `sameAs` (Facebook, Google Maps, BBB), `aggregateRating` (4.9/47), `potentialAction.QuoteAction`, `makesOffer`, `subOrganization` array referencing all area `@id`s. Sophisticated entity graph. |
| A2. `alternates.canonical` per page via `generateMetadata` | ✓ | Confirmed on homepage, /about, /services/shingle-roofing, /areas-we-serve/ashburn, /materials-comparison |
| A3. `BreadcrumbList` schema from route hierarchy | ✓ | Properly populated on service and area pages — e.g., Home → Services → Roofing Services → Shingle Roofing |
| A4. Service schema on every service page | ✓ | `Service` with `name`, `description`, `provider` (referencing Organization @id), `serviceType`, `areaServed` array of 12 City entities |
| A5. FAQPage schema | ⏳ | Present on `/services/shingle-roofing/`. Need to confirm coverage across all 30+ service pages — spot-checked only one. |
| A6. Review + AggregateRating schema | ✓ | `AggregateRating` (4.9 / 47 reviews) on Organization. Individual `Review` schema not visible — may be on /reviews page only. |
| A7. Per-page Open Graph image auto-generation | ⏳ | OG image is set per page but appears to be static (same `og:image` site-wide). Confirm whether `@vercel/og` is generating page-specific. |
| A8. Use most specific schema type | ✓ | Area pages use `["LocalBusiness", "RoofingContractor"]` typed array. Better than JDMPS's generic `HomeAndConstructionBusiness`. |

### URL architecture (Section B)

| Item | Status | Detail |
|---|---|---|
| B1. Programmatic area × service combo pages | ❌ | Probed `/services/shingle-roofing/ashburn/`, `/areas-we-serve/ashburn/shingle-roofing/`, `/areas-we-serve/ashburn/roof-installation/` — all 404. **Partial mitigation:** Service.areaServed already lists all cities via schema, so AI engines understand the area×service mapping. Missing the actual landing pages for queries like "shingle roofing in Ashburn." |
| B2. Wider geographic coverage | ⏳ | 14 areas in sitemap (Ashburn, Arlington, Alexandria, Falls Church, Vienna, McLean, Great Falls, Reston, Herndon, Leesburg, Fairfax, Chantilly + areas hub). **But homepage H2 says "21 Communities"** — need to add 7 more or fix the claim. |
| B3. Standard supporting pages | ✓ | `/careers` with two sub-positions (`general-manager-production-manager`, `roofing-sales-representative`), `/reviews`, `/portfolio`, `/financing`, `/privacy`, `/terms`, `/contact` — full set, plus `/materials-comparison` and `/tools/pricing` which JDMPS doesn't have at all |
| B4. Yoast-style sitemap_index pattern | ❌ | Single `/sitemap.xml` with all URLs. Could be split into pages/services/areas/posts via Next.js `generateSitemaps`. Low priority unless URL count grows past several hundred. |

### Per-page SEO discipline (Section C)

| Item | Status | Detail |
|---|---|---|
| C1. Per-page meta description with CI enforcement | ⏳ | Every page audited has a meta description. CI enforcement not confirmed. |
| C2. `dateModified` signal on every page | ❌ | Sitemap has `lastmod` per URL but the schema graph doesn't expose `dateModified` on WebPage entities (Nova doesn't appear to emit `WebPage` schema separately from the entity graph). |
| C3. `inLanguage` declaration | ❌ | Not currently declared in schema. Easy add. |

### Things Nova beats JDMPS on (Section D — modern AEO playbook)

| Item | Status | Detail |
|---|---|---|
| D1. `llms.txt` at site root | ✓ | Present at `/llms.txt`. **Has content bugs** (see issues section). Also references `/llms-full.txt` — confirm that file exists. |
| D2. Explicit AI bot allow directives in robots.txt | ✓ | Comprehensive: `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bytespider`, `CCBot`, `Meta-ExternalAgent`, `cohere-ai`, `Applebot-Extended`. Better than most sites in the industry. |
| D3. MCP endpoint | ❌ | Not exposed. Worth adding at `/api/mcp` exposing services, areas, contact, online-roof-estimate as agent-callable data. |
| D4. Vector-indexed knowledge base feeding AI chat | ❓ | AI chat presence on Nova not yet confirmed in this audit — need to check homepage/footer for chat widget. |
| D5. Real Spanish translation | ❌ | Not present. `next-intl` setup would deliver it. |
| D6. Performance budget enforced in CI | ❓ | Cannot tell from outside. |
| D7. AI-engine citation tracking | ❌ | Manual process; no specific tooling identified. |

### Features from the prior Next.js build (Section F)

| Feature | Status on Nova | Detail |
|---|---|---|
| Claude Sonnet 4.6 AI chat | ❓ | Not visible in homepage HTML markup audit. **Critical to confirm** — this is Nova's biggest AEO differentiator. |
| Roofle on every CTA | ❓ | `/online-roof-estimate/` exists as a dedicated page. Whether the widget is wired to all CTAs needs confirmation. |
| Calibrated pricing formula | ❓ | `/tools/pricing/` is in the sitemap — present. |
| Materials comparison page | ✓ | `/materials-comparison/` is live. |
| TAMKO HailGuard product-specific content | ❓ | Northern Virginia context — likely different shingle products. Need product-specific content for whatever Nova actually installs in VA. |
| Reviews dedicated page | ✓ | `/reviews/` is live. |
| Admin pricing calculator | ⏳ | `/tools/pricing/` exists. Should be `noindex`'d and removed from the public sitemap. |
| About page visual treatment | ⏳ | Page exists but H1 says "About Restoration Roofing" instead of "About NOVA Roofing and Restoration." Brand polish needed. |
| Spanish bilingual toggle | ❌ | Not present. |
| Brand mascot character | ❌ | Not visible. |

---

## What Nova is doing that JDMPS doesn't (Nova's lead)

These are wins worth documenting. JDMPS would need significant work to match any of them:

1. **AI bot allowlist in robots.txt** — 11 specific AI crawler directives
2. **`llms.txt` at site root** — the emerging standard JDMPS hasn't adopted
3. **Schema entity graph with @id linking** — Organization, LocalBusiness sub-orgs, Service all cross-referenced. JDMPS has a flat identical block on every page.
4. **`aggregateRating` with real numbers** (4.9 / 47) — JDMPS shows a stars image but no markup
5. **`sameAs` entity grounding** — Facebook, Google Business Profile (g.page), BBB — JDMPS has none of this
6. **`potentialAction.QuoteAction`** — agent-callable action declaration
7. **`makesOffer`** — structured offer for the online roof estimate
8. **`subOrganization` array** — entity graph linking Org to all 12 area locations
9. **`Service` schema with areaServed array of City entities** — per-service area mapping in structured data
10. **`["LocalBusiness", "RoofingContractor"]` typed array** — specific industry type, not generic
11. **`FAQPage` schema on service pages** — biggest single AEO miss for JDMPS
12. **`parentOrganization` back-reference** on each LocalBusiness — full entity graph
13. **`priceRange: "$$"`, `currenciesAccepted`, `paymentAccepted`** on area pages — sophisticated commerce-readiness signals
14. **Personal place-specific descriptions** on area pages ("Our home base. Ashburn is one of Northern Virginia's fastest-growing communities...") — citation-worthy local content
15. **Per-service description tied to local climate** ("...built for Northern Virginia's four-season climate") — niche-grounded content AI engines reward

This is genuinely sophisticated work and significantly outclasses the JDMPS approach on the same dimensions.

---

## Nova-specific issues to fix (SC→VA migration cleanup)

These look like artifacts from porting/templating from the Restoration Roofing SC build. None are critical, but they hurt brand polish and AEO entity consistency.

### Brand / locality bugs

1. **🐛 `/areas-we-serve/ashburn/` H1 says "Roofing Services in Ashburn, SC"** — should be "VA". Confirm all 12 area page H1s use the correct state.
2. **🐛 `/about/` H1 says "About Restoration Roofing"** — should be "About NOVA Roofing and Restoration" (or whatever Nova's actual brand is).
3. **🐛 Title tags double the brand name**: e.g., "Shingle Roofing | NOVA Roofing and Restoration — Northern Virginia | NOVA Roofing and Restoration." Likely a `generateMetadata` template that's adding brand even when the page already has it. Fix in the `defineMetadata` helper.
4. **🐛 Homepage has 1 "Charleston" mention** somewhere in body content. Find and replace.
5. **🐛 Blog post slugs still say `-in-charleston`**: `preparing-your-roof-for-severe-weather-in-charleston`, `how-to-handle-emergency-roof-repairs-in-charleston`, `navigating-insurance-claims-for-roof-damage-in-charleston`. Rename to `-in-northern-virginia` (or remove the geo qualifier) and 301 the old slugs.
6. **🐛 Homepage H2 says "Proudly Serving 21 Communities"** but sitemap has only 14 areas (12 actual cities + 2 hub pages). Either add 7 more areas or change the H2.

### llms.txt content bugs

The llms.txt file exists but has several issues:

7. **🐛 Climate description is wrong for inland NoVA:** "Atlantic-coast storm season" — Northern Virginia is well inland. Should be something like "the Mid-Atlantic storm corridor, occasional tropical storm remnants moving north, hard freezes and ice storms in winter, summer heat and UV stress, and hail along the Blue Ridge foothills." Tom would know the right framing.
8. **🐛 Blog posts listed under `/services/` paths** in llms.txt — e.g., `/services/what-should-i-do-if-my-roof-is-leaking`, `/services/preparing-your-roof-for-severe-weather-in-charleston`. Real blog URLs are under `/blog/`. These broken paths return 404 if an LLM follows them.
9. **🐛 "Charleston" still in llms.txt links** to blog content. Update slugs + correct llms.txt references.

### Structural & schema gaps

10. **`/tools/pricing/` is in the public sitemap and not noindexed.** Admin tool should be excluded. Add to robots.txt `Disallow:` and remove from sitemap output.
11. **No `inLanguage: "en-US"` declarations** in schema. Add to all WebPage/Article entities.
12. **No `dateModified`** in schema. Nova has lastmod in sitemap but not in schema. Pipe through.
13. **OG image appears to be site-wide static.** Per-page generation via `@vercel/og` would improve social and AI-snippet behavior.

### Missing programmatic combo pages

14. **No `/areas-we-serve/[area]/[service]/` pages** — confirmed via 404 probes. The Service schema's `areaServed` array partially compensates by mapping the relationships, but actual landing pages for "shingle roofing in Ashburn"-style queries are not built. This was the strongest pattern in JDMPS's build (~12 combo pages already generated).

**Calculation if we build them:** 12 areas × ~30 services = 360 combo pages from one dynamic route + typed data. Many will be thin without locale-specific copy, so prioritize the high-intent combinations first (storm damage, roof installation, gutter installation × each city).

---

## Recommended priorities

Working from highest impact / lowest effort to lower impact / higher effort:

### P0 — fix this week (brand integrity + correctness)

1. Fix Ashburn (and all 12 area pages) H1 from "SC" to "VA"
2. Fix About page H1 to use the correct brand
3. Fix duplicate brand name in title tags (one-line change in `defineMetadata`)
4. Fix homepage Charleston mention
5. Rename blog post slugs from `-in-charleston` to either `-in-northern-virginia` or no geo qualifier, with 301s
6. Fix llms.txt: correct climate description, correct blog URLs (move from `/services/` to `/blog/`)
7. Remove `/tools/pricing/` from public sitemap; add `Disallow: /tools/` to robots.txt

### P1 — close in the next sprint (real AEO wins)

8. Add `FAQPage` schema to all service pages (not just shingle-roofing) — biggest single AEO multiplier left
9. Build programmatic area × service combo pages — `/areas-we-serve/[area]/[service]/` — start with the top 5 services × 12 areas (60 pages) before going broader
10. Add 7 more area pages to match the "21 Communities" claim (or change the claim)
11. Add `inLanguage: "en-US"` and `dateModified` to schema
12. Confirm and document Spanish translation plan (or remove bilingual claims if not pursuing)
13. Confirm AI chat is wired up on the homepage (if not, port from site #1)
14. Per-page OG image generation via `@vercel/og`

### P2 — strategic differentiators (next 30 days)

15. Add `/api/mcp` endpoint exposing services, areas, contact, and online-roof-estimate as agent-callable data
16. Vector-index the content + wire AI chat to return citation URLs
17. Add `llms-full.txt` (referenced from llms.txt — confirm it exists and is current)
18. Performance budget in CI (Lighthouse mobile ≥ 90)
19. Add `Review` schema for individual testimonials on /reviews

---

## What we already nailed (worth noting for confidence)

This work is genuinely good and ahead of the industry. Things to be proud of:

- **Entity graph sophistication** — @id cross-references between Org / LocalBusiness sub-orgs / Service is something most contractor sites don't have at any agency
- **Sophisticated commerce signals** — `QuoteAction`, `makesOffer`, `priceRange`, `currenciesAccepted`, `paymentAccepted` together signal a mature business to both search and AI engines
- **Local content quality** — area page descriptions that mention specific neighborhoods (Brambleton, Ashburn Farm, Loudoun Valley Estates) and tie back to the team's presence
- **Climate-grounded service descriptions** — shingle copy mentioning "Northern Virginia's four-season climate" is the kind of locale-specific framing AI engines reward
- **AI infrastructure foundations** — llms.txt + comprehensive AI bot allows put Nova ahead of nearly every contractor site in the country

The 80% that's already done is the hard part. The 20% remaining is mostly cleanup.

---

## Net comparison summary

| Dimension | JDMPS | Nova | Winner |
|---|---|---|---|
| Foundation schema (Org/WebSite/Breadcrumb) | ✓ via Yoast | ✓ via custom | Tie |
| Entity graph with @id linking | ❌ | ✓ | **Nova** |
| Specific industry schema type | ❌ generic | ✓ `RoofingContractor` | **Nova** |
| FAQ schema | ❌ | ⏳ (1 page confirmed) | **Nova** |
| Review/AggregateRating schema | ❌ | ✓ | **Nova** |
| sameAs entity grounding | ❌ | ✓ | **Nova** |
| QuoteAction / makesOffer | ❌ | ✓ | **Nova** |
| llms.txt | ❌ | ✓ (with bugs) | **Nova** |
| AI bot allows | ❌ | ✓ | **Nova** |
| Programmatic area × service pages | ✓ (12 pages) | ❌ | **JDMPS** |
| AI chat / conversational surface | ❌ | ❓ (verify) | **TBD** |
| Materials comparison page | ❌ | ✓ | **Nova** |
| Admin pricing tool | ❌ | ✓ (but exposed) | **Nova** |
| Brand consistency | ⏳ (license bugs) | ⏳ (SC residue) | Tie |
| Localization quality | ✓ (VA-native) | ⏳ (Charleston residue) | **JDMPS** |
| Performance ceiling | ~ Elementor bloat | ~ RSC clean | **Nova** |
| Vendor lock-in | WordPress + JDMPS | None | **Nova** |

**Final assessment:** Nova is the AI-native, AEO-optimized future of contractor sites. JDMPS is solid conventional SEO. With a focused cleanup pass on the SC→VA artifacts and the addition of programmatic combo pages + FAQPage schema across all service pages, Nova will outclass JDMPS on every dimension that matters for the next 3+ years.
