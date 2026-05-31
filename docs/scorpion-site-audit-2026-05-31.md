# Scorpion Site Audit — restorationroofingsc.com vs Our Next.js Build

**Date:** 2026-05-31
**Auditor:** Jimmy + Claude
**Status:** Reference document. The user asked for an audit of "the SEO team's changes to our site" but supplied the wrong URL (`restorationroofingsc.com`). That URL turned out to be a separate legacy Scorpion CMS site, not our build. Audit findings preserved here for comparison reference; a separate audit of the actual updated build will follow.

---

## Headline finding

The live site at `https://www.restorationroofingsc.com` is **NOT** our Next.js codebase. It is a completely separate website operated by **Scorpion** (scorpion.co — a national home-services digital marketing agency that runs a proprietary CMS for thousands of contractors).

- Our build remains at `https://rr-sc-website.vercel.app`.
- The DNS cutover to `restorationroofingsc.com` (flagged as a BLOCKER in our April docs) was never executed.
- Scorpion has been operating their CMS site at that domain since at least 2023 (per sitemap lastmod values).
- The two sites share only the business name, phone (843-306-2939), and brand. Everything else differs.

---

## How we confirmed they're two different sites

| Signal | Scorpion site (live) | Our Next.js build |
|---|---|---|
| **URL structure** | `/roofing-services/roof-installation/` (trailing slash, nested) | `/services/roof-installation` (flat, no slash) |
| **Blog URLs** | `/blog/2026/april/gutter-maintenance-guide-for-charleston-homeowne/` (date hierarchy, trailing hyphen artifact) | `/blog/what-should-i-do-if-my-roof-is-leaking` |
| **Sitemap lastmod range** | 2023-03-08 → 2026-05-18 | 2026 content only |
| **Pages they have, we don't** | `/siding-services/`, `/areas-we-serve/ladson/`, `/russellville/`, `/bonneau/`, ~20 area×service combo pages | — |
| **Pages we have, they don't** | — | `/materials-comparison`, `/financing`, `/tools/pricing`, `/reviews` page |
| **Footer credit** | "Internet Marketing Experts" → scorpion.co | Restoration Roofing SC |
| **CMS fingerprints** | `/cms/svg/site/...`, cookies `SEOT` / `SEOV` / `T`, asset paths `.2303201505550.png` (date-stamped versioning) | Next.js / Vercel |
| **Office address** | **1261 Pearwood Ct, Mount Pleasant, SC 29464** (old) | 75 Port City Landing, Suite 110 (current) |
| **License #** | **RBC 694** (old/wrong) | RBS 67027 (correct, per Tom) |
| **Hosting headers** | Custom (CSP allows `*`, HSTS preload set, no Vercel signatures) | Vercel |

---

## Critical data integrity problems on the Scorpion site

Regardless of which site is canonical, these need to be fixed today on Scorpion's:

1. **Wrong office address** — Live shows old `1261 Pearwood Ct`. Tom moved to `75 Port City Landing, Suite 110` (we updated ours May 1, commit `eaae6a6`).
2. **Wrong license number** — Live shows `RBC 694`. Correct number is `RBS 67027` "Residential Specialty Contractor License" (we updated May 1, commits `e3dd36a` / `ff25086`).
3. **Wrong GeoCoordinates in JSON-LD** — `32.8364, -79.8076` corresponds to old Pearwood Ct, not Port City Landing.
4. **Phone matches** — 843-306-2939 on both. The one consistent data point.

These NAP/license inconsistencies actively harm local search and AI grounding queries today.

---

## What Scorpion does well (worth learning from)

| Pro | Detail |
|---|---|
| **Programmatic area × service pages** | 2-level matrix: `/areas-we-serve/summerville/roof-installation/`, `/areas-we-serve/mount-pleasant/metal-roofs/`, etc. ~20 such pages. Classic local SEO. |
| **Canonical tags on every page** | `<link rel="canonical">` present on every URL. Gap we documented in April that's still open on our build. |
| **Google + Bing webmaster verification** | `google-site-verification` and `msvalidate.01` meta tags in head. They own both properties. |
| **OG + Twitter cards** | Full set on homepage. |
| **Schema (minimal)** | `RoofingContractor` JSON-LD on homepage with name, address, geo, phone, url. Starting point. |
| **More area pages than ours** | Ladson, Russellville, Bonneau — areas we don't have. |
| **GBP cid link** | `https://www.google.com/maps?cid=10988337180772387721` — canonical GBP pointer for entity confirmation. |
| **Clean robots + sitemap** | `User-Agent: * / Disallow:` + sitemap reference. |
| **HSTS preload** | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`. |

## What Scorpion does poorly

| Con | Detail |
|---|---|
| **Stale on basic facts** | Old address, old license, old geo. |
| **No FAQ schema despite having FAQ content** | Shingle Roofing page has 5 Q&As as plain HTML. AI Overviews / PAA opportunity completely missed. |
| **No Service, AggregateRating, Review, BreadcrumbList schema** | Only bare LocalBusiness block. Massive AEO/GEO leak. |
| **No `areaServed` in schema** | Implied via area pages, not declared. |
| **Keyword-stuffed boilerplate titles** | "Roofers in Charleston, SC \| Free Estimates & Same-Day Services" — Scorpion template. H1 matches title verbatim. |
| **Slug bugs** | `what-should-i-do-if-my-roof-is-leaking-/` — trailing hyphen from titles ending in `?`. |
| **Bloated sitemap with low-value taxonomy** | `/blog/2026/april/`, `/blog/categories/gutters/` archives dilute crawl budget. |
| **Heavy HTML payload** | 126,229 bytes on homepage alone — likely poor Core Web Vitals. |
| **No `hreflang`** | Copy mentions "English and Spanish-speaking communities" but no Spanish version exists. We at least have the Spanish toggle pattern. |
| **`telePhone` typo in JSON-LD** | Should be `telephone`. Tolerated but technically wrong. |

---

## AEO / GEO / AIO strategic implications

**Where Scorpion helps Tom:**
- Owns the entity association: Google has indexed `restorationroofingsc.com` since 2023, with established GBP linkage, GSC/Bing verification, backlinks, and 3+ years of crawl history.
- Area × service programmatic pattern is genuinely good for AEO.

**Where Scorpion hurts Tom:**
- Stale NAP poisons every AI grounding query — ChatGPT/Perplexity/Gemini will pull the wrong address/license.
- No FAQ/Service/Review schema means LLMs can't extract Q&A blocks; AI Overviews favor competitors who do markup.
- Blog content from 2023 hasn't been refreshed.

**Our build's AEO/GEO strengths:**
- Knowledge base at `lib/knowledgebase/restoration-roofing-content.md` structured for LLM ingestion.
- AI chat with Claude Sonnet 4.6 is itself an AEO surface.
- Materials comparison page, TAMKO HailGuard specs, pricing tool, detailed team bios — original depth-y content.
- Correct, current NAP/license/geo.

**Our build's open gaps (Scorpion fixed two of them, we still have them):**
- ❌ No `alternates.canonical` per page
- ❌ No global `Organization` / `WebSite` / `SearchAction` schema in root layout
- ❌ No FAQPage / Service / BreadcrumbList / Review schema
- ❌ No programmatic area × service pages

---

## Nothing in our codebase was changed or broken

All confirmed intact (no Scorpion contact with our repo):
- Roofle quote widget on all CTAs
- Claude Sonnet 4.6 AI chat
- Site-wide chat widget via root layout
- Calibrated pricing formula + 15% waste factor
- TAMKO HailGuard content (May 14)
- Updated team (Devin Ringle removed)
- `/tools/pricing` admin calculator
- Mascot v5b transparent images
- About page sheen / dark Values panel polish
- Spanish bilingual toggle

What's "lost" is at the domain level: Scorpion's site holds the 3 years of accumulated authority, GBP link, GSC ownership, and verified search-console properties at `restorationroofingsc.com`. Any cutover needs to manage that transition (301 map, GSC change-of-address, GBP URL update).

---

## Three strategic forks (for Tom)

1. **Cut over to our Next.js build.** Modern stack, AI chat, correct NAP. Loses 3 years of Scorpion authority unless migrated deliberately (comprehensive 301 redirect map, GSC change-of-address, GBP URL update, port area×service pages before cutover).
2. **Stay with Scorpion, retire our build.** Keeps existing authority but throws away everything built, leaves NAP/license issues unresolved unless Scorpion fixes, no AI chat, no pricing calc.
3. **Hybrid.** Rarely worth the operational complexity.

**Unconditional recommendation:** fix Scorpion's NAP and license errors today (single email to their account rep). Wrong address + wrong license are bleeding into GBP, Yelp, BBB, and AI-engine answers right now.

---

## Quick wins for our build (cutover or not)

1. Add `alternates.canonical` to every page (~1 hr) — closes the highest-impact gap.
2. Add global `Organization` + `WebSite` + `LocalBusiness` schema in root layout (~2 hr), including `areaServed`, `aggregateRating`, social `sameAs` array.
3. Wrap existing FAQ content in `FAQPage` schema — Scorpion didn't do this; doing it gives us an AEO edge.
4. Build programmatic area × service pages (~21 areas × ~6 services ≈ 126 pages from one template).
5. Add `BreadcrumbList` schema site-wide.
6. Confirm with Tom whether to add `/siding-services/` (Scorpion has it; could be an offering gap).
7. Set up GSC + Bing Webmaster verification meta tags now so they're in place before any DNS cutover.
