# Nova Roofing & Restoration — Fix-It Handoff

**Date:** 2026-05-31
**Subject:** Actionable fix list for the Nova Roofing & Restoration website
**Target site:** https://rr-nova-website.vercel.app/ (production canonical: https://www.restorationroofingva.com/)
**Audience:** Claude Code instance running against the Nova repository

---

## Context

The Nova Roofing & Restoration website is a Next.js / Vercel build that already has strong SEO/AEO foundations: AI bot allowlist in robots.txt, llms.txt at site root, sophisticated schema entity graph with `@id` linking, `AggregateRating`, `FAQPage` schema on at least one service page, `["LocalBusiness", "RoofingContractor"]` typed schema on area pages, and a full set of supporting pages (`/materials-comparison`, `/reviews`, `/portfolio`, `/careers`, `/financing`, `/tools/pricing`).

An external audit on 2026-05-31 identified a set of issues that need to be addressed. Most are South-Carolina-to-Virginia migration artifacts (the build was templated from the Restoration Roofing SC site and not every locale-specific string got updated). A second set are AEO completeness items. A third set are strategic enhancements.

This document is the actionable checklist. Each item has: (1) what to fix, (2) where it likely lives in a Next.js codebase, (3) expected outcome after the fix.

The Nova repo path is not specified in this document — open the repo, locate the files using the hints provided, and execute the fixes.

---

## Re-audit setup (run this first to baseline the issues)

Before making changes, run these commands and save the output. They serve as the "before" snapshot. After fixes, re-run them and confirm the issues are gone.

```bash
# Save current state of each affected page
curl -sL https://rr-nova-website.vercel.app/ -o /tmp/nova-home-before.html
curl -sL https://rr-nova-website.vercel.app/about/ -o /tmp/nova-about-before.html
curl -sL https://rr-nova-website.vercel.app/areas-we-serve/ashburn/ -o /tmp/nova-ashburn-before.html
curl -sL https://rr-nova-website.vercel.app/materials-comparison/ -o /tmp/nova-mc-before.html
curl -sL https://rr-nova-website.vercel.app/services/shingle-roofing/ -o /tmp/nova-shingle-before.html
curl -sL https://rr-nova-website.vercel.app/llms.txt -o /tmp/nova-llms-before.txt
curl -sL https://rr-nova-website.vercel.app/robots.txt -o /tmp/nova-robots-before.txt
curl -sL https://rr-nova-website.vercel.app/sitemap.xml -o /tmp/nova-sitemap-before.xml
```

Verification commands appear at the end of each fix.

---

## P0 — Brand integrity and correctness (fix this week)

### P0-1. Area page H1s say "SC" instead of "VA"

**Bug:** `/areas-we-serve/ashburn/` H1 renders `Roofing Services in Ashburn, SC`. Should be `VA`. Likely affects all 12 area pages.

**Where it lives:**
- Look for `src/app/areas-we-serve/[city]/page.tsx` or similar dynamic route
- Or static area pages at `src/app/areas-we-serve/ashburn/page.tsx` etc.
- The string template producing the H1 likely contains `"SC"` literal or pulls a `state` field that's hardcoded
- Search the repo for `"SC"` and `"South Carolina"` to find all instances

**Fix:**
- If the H1 string is built from `${city}, ${state}`, ensure `state` is sourced from area data (`areas.json` or similar) and that every area record has `state: "VA"`.
- If a literal `"SC"` is in the template, change it to read from data or hardcode `"VA"`.
- Audit all 14 sitemap area entries: Ashburn, Arlington, Alexandria, Falls Church, Vienna, McLean, Great Falls, Reston, Herndon, Leesburg, Fairfax, Chantilly + the hub.

**Verify:**
```bash
for area in ashburn arlington alexandria falls-church vienna mclean great-falls reston herndon leesburg fairfax chantilly; do
  echo "$area: $(curl -sL https://rr-nova-website.vercel.app/areas-we-serve/$area/ | grep -oE '<h1[^>]*>[^<]+</h1>' | head -1)"
done
```
Every H1 should end with `, VA` (or `, Virginia`). No `, SC` anywhere.

---

### P0-2. About page H1 uses old brand

**Bug:** `/about/` H1 reads `About Restoration Roofing`. Should reflect the Nova brand — `About NOVA Roofing and Restoration` (or whatever the canonical Nova brand string is).

**Where it lives:**
- `src/app/about/page.tsx` or `src/app/about/AboutContent.tsx`
- Look for an `<h1>` with `About` in it

**Fix:**
- Update to `About NOVA Roofing and Restoration`.
- Confirm the canonical brand name across the codebase. The site OG tags use `NOVA Roofing and Restoration`. The schema Organization name uses the same. Standardize.

**Verify:**
```bash
curl -sL https://rr-nova-website.vercel.app/about/ | grep -oE '<h1[^>]*>[^<]+</h1>' | head -1
```
Should contain "NOVA".

---

### P0-3. Title tags duplicate the brand name

**Bug:** Page titles read like `Shingle Roofing | NOVA Roofing and Restoration — Northern Virginia | NOVA Roofing and Restoration`. The brand appears twice. Affects every page.

**Where it lives:**
- Likely the root `layout.tsx` has `metadata.title.template = "%s | NOVA Roofing and Restoration"` (Next.js convention)
- Each page exports `generateMetadata` returning a title that already contains the brand suffix
- Both are concatenating, producing the doubling

**Fix:**
- Option A: keep `template` in root layout, change every page-level title to just the page-specific portion (e.g., `"Shingle Roofing — Northern Virginia"`)
- Option B: remove `template` from root layout, keep brand in each page title (more work, less consistent)
- Recommended: Option A. Audit every `page.tsx`'s `generateMetadata` and strip the trailing `| NOVA Roofing and Restoration` from any title strings.

**Verify:**
```bash
for path in / /about/ /services/shingle-roofing/ /areas-we-serve/ashburn/ /materials-comparison/; do
  title=$(curl -sL https://rr-nova-website.vercel.app$path | grep -oE '<title>[^<]+</title>' | head -1)
  echo "$path: $title"
done
```
"NOVA Roofing and Restoration" should appear exactly once in each title.

---

### P0-4. "Charleston" residue on homepage and in blog slugs

**Bug:** One stray "Charleston" mention in homepage body content. Three blog post slugs still end in `-in-charleston`:
- `/blog/preparing-your-roof-for-severe-weather-in-charleston`
- `/blog/how-to-handle-emergency-roof-repairs-in-charleston`
- `/blog/navigating-insurance-claims-for-roof-damage-in-charleston`

**Where it lives:**
- Homepage: `src/app/page.tsx` or its component imports. Search for `Charleston` case-insensitive across the repo.
- Blog content: probably under `src/app/blog/[slug]/` or as MDX files in `content/blog/` or similar
- The slug is determined by either folder name, filename, or frontmatter

**Fix:**
- **Homepage:** find and replace "Charleston" with the Northern Virginia equivalent. Likely "Northern Virginia" or a specific NoVA city, depending on context.
- **Blog slugs:** decide on new slugs:
  - `preparing-your-roof-for-severe-weather-in-charleston` → `preparing-your-roof-for-severe-weather-in-northern-virginia` (or just `preparing-your-roof-for-severe-weather`)
  - `how-to-handle-emergency-roof-repairs-in-charleston` → similar
  - `navigating-insurance-claims-for-roof-damage-in-charleston` → similar
- **Inside blog post content:** also do a body sweep — any references to "Charleston," "South Carolina," "SC," "Lowcountry," "hurricane season starting June," "Atlantic coast," "843" area code, etc., should be re-localized.
- **301 redirects:** add the old slugs as 301s to the new slugs in `next.config.js`:
  ```js
  async redirects() {
    return [
      { source: '/blog/preparing-your-roof-for-severe-weather-in-charleston', destination: '/blog/preparing-your-roof-for-severe-weather-in-northern-virginia', permanent: true },
      // ... etc
    ];
  }
  ```

**Verify:**
```bash
# Homepage should have zero Charleston mentions
curl -sL https://rr-nova-website.vercel.app/ | grep -ciE 'charleston|south carolina|lowcountry|843-' 
# Should output: 0
```

```bash
# Old blog URLs should 301 to new ones
curl -sI https://rr-nova-website.vercel.app/blog/preparing-your-roof-for-severe-weather-in-charleston/ | head -2
# Should show 301 or 308
```

---

### P0-5. Homepage H2 says "21 Communities" but sitemap has 14

**Bug:** `<h2>Proudly Serving 21 Communities Across Northern Virginia</h2>` — but only 12 areas (+ hub + areas-we-serve index) are in the sitemap.

**Where it lives:**
- Likely homepage areas section component, hardcoded "21"
- Or it might be pulled from a count variable that's wrong

**Fix — two options:**

**Option A (recommended if business reality supports it):** add 9 more area pages to reach 21. Suggested NoVA communities to consider:
- Sterling
- Centreville
- Manassas
- Lorton
- Burke
- Springfield
- Annandale
- Tysons
- Oakton
- Dulles
- Brambleton
- Aldie

Generate the new pages from the existing dynamic area template + data file.

**Option B:** change the H2 to match the actual count: `Proudly Serving 12 Communities Across Northern Virginia`. Update the count source so future additions automatically reflect.

**Verify:**
```bash
# Sitemap area count
curl -sL https://rr-nova-website.vercel.app/sitemap.xml | grep -c 'areas-we-serve/[a-z]'
# Homepage claim should match (or be replaced with dynamic count)
```

---

### P0-6. llms.txt content bugs

**Bug A:** Climate description says "Atlantic-coast storm season" — Northern Virginia is inland and doesn't see direct Atlantic-coast hurricanes. Mid-Atlantic / Blue Ridge framing is more accurate.

**Bug B:** llms.txt lists blog posts under `/services/...` URL paths that don't exist (would return 404 if an LLM follows them). Real blog URLs are under `/blog/`. Examples:
- `/services/what-should-i-do-if-my-roof-is-leaking` → should be `/blog/what-should-i-do-if-my-roof-is-leaking`
- `/services/preparing-your-roof-for-severe-weather-in-charleston` → should be `/blog/preparing-your-roof-for-severe-weather-in-northern-virginia` (after P0-4 rename)
- And several more

**Where it lives:**
- `src/app/llms.txt/route.ts` (Next.js route handler) or static `public/llms.txt`
- May also be generated from a typed data source

**Fix:**
- **Climate paragraph:** rewrite to something like:

  > "We handle roof replacement, repair, storm damage restoration, and emergency tarping for homeowners across the NoVA region — with specific knowledge of Northern Virginia's Mid-Atlantic storm patterns, including occasional tropical storm remnants moving north from the Gulf and Atlantic, hard freezes and ice storms in winter, summer heat and UV stress on shingles, and hail along the Blue Ridge foothills corridor."

  (Confirm with Tom for accuracy — he knows the local climate better than we do.)
- **Blog URL paths:** change `/services/` prefix to `/blog/` for all blog post entries. Cross-reference with the sitemap to confirm the actual canonical URL for each.
- **Re-localize titles:** "Preparing Your Roof For Severe Weather In Northern Virginia" (already done in some entries — confirm consistency across all).

**Verify:**
```bash
curl -sL https://rr-nova-website.vercel.app/llms.txt | grep -ciE 'atlantic-coast|charleston|south carolina'
# Should output: 0

curl -sL https://rr-nova-website.vercel.app/llms.txt | grep -oE '/services/(what-should|preparing-your|how-to-handle|navigating-insurance|how-long-does|maintaining-your|spring-roofing|the-best-roofing|top-roofing)' | wc -l
# Should output: 0 (these should be /blog/ paths)
```

---

### P0-7. `/tools/pricing/` is publicly indexable

**Bug:** Admin pricing calculator at `/tools/pricing/` is in the public sitemap. Likely also lacks `noindex`. Search engines and AI engines could surface it.

**Where it lives:**
- Sitemap generation: `src/app/sitemap.ts` or `src/app/sitemap.xml/route.ts`
- The page: `src/app/tools/pricing/page.tsx`
- robots.txt: `public/robots.txt` or `src/app/robots.ts`

**Fix:**
1. Add `Disallow: /tools/` to robots.txt under each User-Agent block (or at the top-level `*` block to apply to all)
2. Add `export const metadata = { robots: { index: false, follow: false } }` to `src/app/tools/layout.tsx` (or each tools page)
3. Filter `/tools/*` out of sitemap generation in `sitemap.ts`
4. Confirm the page is auth-gated. If it's gated, double-check the gate doesn't accidentally allow public access.

**Verify:**
```bash
curl -sL https://rr-nova-website.vercel.app/sitemap.xml | grep -c 'tools/pricing'
# Should output: 0

curl -sL https://rr-nova-website.vercel.app/robots.txt | grep -ciE 'tools'
# Should output: at least 1

curl -sL https://rr-nova-website.vercel.app/tools/pricing/ | grep -ciE 'noindex'
# Should be > 0
```

---

## P1 — AEO completeness (close in next sprint)

### P1-1. Add `FAQPage` schema to every service page

**Status:** Only `/services/shingle-roofing/` confirmed to have FAQ schema. There are 30+ service pages — most likely missing.

**Where it lives:**
- Service page template: probably `src/app/services/[slug]/page.tsx`
- Or per-service static pages: `src/app/services/[service-name]/page.tsx`
- FAQ content may be stored in a typed config (`services.json`, `services.ts`) with a `faqs` field per service

**Fix:**
- Confirm the data model. If services data already has FAQ content, ensure the schema generator runs for every service.
- For services without FAQ content, write 4-6 Q&As per service. These should be:
  - Specific to the service
  - Locally grounded (Northern Virginia climate, regulations, common scenarios)
  - Honest and useful (not keyword-stuffed)
- Emit one `FAQPage` block per service page with a `Question`/`Answer` entity per Q&A.
- Reference pattern (from existing shingle-roofing page):
  ```json
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.restorationroofingva.com/services/[slug]/#faq",
    "mainEntity": [
      { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
    ]
  }
  ```

**Verify:**
```bash
for svc in roof-installation roof-repairs metal-roofing storm-damage-repair gutter-installation; do
  c=$(curl -sL https://rr-nova-website.vercel.app/services/$svc/ | grep -c 'FAQPage')
  echo "$svc: $c FAQPage blocks"
done
# Each should be ≥ 1
```

---

### P1-2. Build programmatic area × service combo pages

**Status:** None exist. Probed `/services/shingle-roofing/ashburn/`, `/areas-we-serve/ashburn/shingle-roofing/`, `/areas-we-serve/ashburn/roof-installation/` — all 404.

**Why this matters:** This was the strongest pattern in JDMPS's build. Queries like "shingle roofing in Ashburn" need a landing page to rank for. The Service schema's `areaServed` array partially compensates by mapping the relationship for AI engines, but real landing pages drive both classic SEO and AI-citation eligibility.

**Where it lives (build new):**
- Dynamic route: `src/app/areas-we-serve/[area]/[service]/page.tsx`
- Or: `src/app/services/[service]/areas/[area]/page.tsx` — pick one and stick with it. The first matches the existing `/areas-we-serve/[area]/` pattern.
- `generateStaticParams()` returns all valid `(area, service)` combinations from typed config
- Per-combo content: area-specific intro + service-specific copy + area-specific FAQs + per-combo Service schema with `areaServed: [{ City: area }]`

**Fix:**
- Start with high-intent combinations to avoid generating 360 thin pages. Suggested prioritization:
  - **Top 5 services × 12 areas = 60 pages first:** storm-damage-repair, roof-installation, roof-repairs, hail-damage-repair, gutter-installation
  - Add more service types in waves once the first 60 are quality-checked
- Each page needs at minimum:
  - H1: "{Service Name} in {Area Name}, VA" (e.g., "Storm Damage Repair in Ashburn, VA")
  - Meta title + description that incorporate both terms
  - Intro paragraph specific to the area (population, common housing types, local climate considerations)
  - Service content reused from the parent service page
  - At least 2 area-specific FAQs ("How quickly can you respond to storm damage in Ashburn?", etc.)
  - Service schema with `areaServed: [{ "@type": "City", "name": "Ashburn" }]`
  - BreadcrumbList: Home → Areas We Serve → Ashburn → Storm Damage Repair

**Verify:**
```bash
# Sample 3 combo URLs after build
for combo in "ashburn/storm-damage-repair" "arlington/roof-installation" "alexandria/gutter-installation"; do
  echo "$combo: $(curl -sI https://rr-nova-website.vercel.app/areas-we-serve/$combo/ 2>&1 | head -1)"
done
# All should return 200
```

---

### P1-3. Add `inLanguage` and `dateModified` to schema

**Status:** Not declared. The sitemap has `lastmod` per URL but it's not piped into schema.

**Where it lives:**
- Schema generation helper, probably `src/lib/seo/` or wherever the JSON-LD blocks are built
- For `dateModified`: source from git log (`git log -1 --format=%aI` per file) or from a manual `updated` field in MDX frontmatter / typed config
- For `inLanguage`: add `"inLanguage": "en-US"` to all `WebPage`, `Service`, `Article`, and `FAQPage` entities

**Fix:**
- In the WebPage / Service / FAQPage / Article schema generators, add `inLanguage: "en-US"`
- Add `dateModified` to the same entities, sourced from the same data the sitemap uses
- Optional: render visibly on each page: "Last updated: [date]" — freshness signal humans see too

**Verify:**
```bash
curl -sL https://rr-nova-website.vercel.app/services/shingle-roofing/ | grep -oE 'inLanguage|dateModified' | sort -u
# Should show both
```

---

### P1-4. Confirm AI chat is present (port from site #1 if not)

**Status:** Not visible in homepage HTML audit. Critical if missing — this is Nova's biggest AEO differentiator.

**Where it lives if present:**
- `src/components/ChatWidget.tsx` or similar
- `src/app/api/chat/route.ts` or similar
- Mounted in `src/app/layout.tsx`

**Fix if missing:**
- Port the Claude Sonnet 4.6 AI chat from the RR-SC repo (path: site #1)
- Source files in RR-SC:
  - `src/components/ChatWidget.tsx`
  - `src/app/api/chat/route.ts`
  - `lib/knowledgebase/restoration-roofing-content.md` (replace with Nova-specific content)
- Mount in Nova's root layout
- **Update the knowledge base to Nova / Northern Virginia content** — don't import the SC knowledge base verbatim. Tom or you write the Nova version: services, areas, products, team, climate, common scenarios.
- Confirm `ANTHROPIC_API_KEY` is set in Vercel env vars

**Verify:**
```bash
curl -sL https://rr-nova-website.vercel.app/ | grep -ciE 'chat|widget|claude|anthropic'
# Should be > 0 if chat is mounted
```

Plus manual: open the homepage in a browser and verify the chat opens, accepts a question, and returns a grounded answer.

---

### P1-5. Spanish translation infrastructure (decision needed)

**Status:** Not present. If Nova doesn't market to Spanish speakers, remove any English copy that implies bilingual service.

**Where it lives:**
- Search the codebase for "Spanish," "bilingual," "Hispanic," "Hispano"
- May be in About page, services pages, or hero copy

**Fix — two paths:**
1. **If we're committing to bilingual service:** set up `next-intl` or `next-i18next`, add `es-US` route tree, translate the top pages (home, services index, top 5 service pages, about, contact). Add `hreflang` cross-references.
2. **If we're not:** remove any bilingual claims from the site.

Decision point — discuss with Tom before executing.

---

### P1-6. Per-page Open Graph image generation

**Status:** OG image appears to be static site-wide (same `og:image` URL).

**Where it lives if dynamic:**
- `src/app/api/og/route.tsx` — Next.js convention for `@vercel/og`
- Page-level `generateMetadata` references it: `openGraph.images = [\`/api/og?title=${...}\`]`

**Fix:**
- Build an OG image template at `src/app/api/og/route.tsx` using `@vercel/og`
- Pass the page title (and optionally service/area name) as query params
- Each `generateMetadata` returns `openGraph.images = [\`https://www.restorationroofingva.com/api/og?title=${encodeURIComponent(title)}\`]`

**Verify:**
```bash
for path in / /about/ /services/shingle-roofing/ /areas-we-serve/ashburn/; do
  og=$(curl -sL https://rr-nova-website.vercel.app$path | grep -oE 'og:image" content="[^"]+"' | head -1)
  echo "$path: $og"
done
# Each should have a unique og:image URL
```

---

## P2 — Strategic enhancements (next 30 days)

### P2-1. `/api/mcp` agent-callable endpoint

**Build new:** A Model Context Protocol endpoint exposing services, areas, contact info, online roof estimate availability as agent-callable data. Use case: AI agents (Claude, ChatGPT) booking services or quoting jobs on behalf of users in 12-24 months.

**Implementation:**
- `src/app/api/mcp/route.ts` — handles MCP JSON-RPC over HTTP/SSE
- Tools to expose:
  - `list_services`
  - `list_areas`
  - `get_service_details(slug)`
  - `get_area_details(slug)`
  - `request_estimate(name, email, phone, area, service, description)`
- Reference: https://modelcontextprotocol.io

### P2-2. Vector-indexed knowledge base + chat citations

**Build new:** When the AI chat answers, return citation URLs to specific pages it grounded on.

**Implementation:**
- Set up Supabase pgvector
- Index all page content + knowledge base
- Modify chat API route to: (a) retrieve top-k chunks before generating, (b) return cited URLs alongside the answer text
- Render citations as `[1] [2] [3]` clickable links at the bottom of each chat response

### P2-3. Confirm `/llms-full.txt` exists

**Bug:** `/llms.txt` references `https://www.restorationroofingva.com/llms-full.txt` — confirm this file actually exists and contains a richer site dump for LLMs.

**Verify:**
```bash
curl -sI https://rr-nova-website.vercel.app/llms-full.txt | head -1
```
Should return 200. If 404, build it.

### P2-4. Performance budget in CI

**Build new:** Lighthouse CI step in the GitHub Actions workflow. Fail the build if mobile performance score drops below 90, accessibility below 95, SEO below 95.

**Implementation:**
- Add `@lhci/cli` to dev dependencies
- Add a `.lighthouserc.json` with budgets
- Add a workflow step that runs on every PR

### P2-5. `Review` schema for individual testimonials

**Status:** `AggregateRating` is present on Organization. Individual `Review` schema not visible.

**Where it lives:**
- `/reviews/` page — confirm Review schema is present, if not add it
- Per-review: `Review` entity with `author`, `reviewRating`, `datePublished`, `reviewBody`

### P2-6. AI-engine citation tracking

**Build new ops process:** Monthly manual check (or automated via tools like Profound, AthenaHQ) — query major AI engines with target phrases and log whether Nova appears.

Target queries:
- "best roofer in northern virginia"
- "roof installation ashburn va"
- "storm damage repair fairfax county"
- "how to handle insurance claim for hail damage roof"

Track results in a spreadsheet over time.

---

## Final verification checklist

After all P0 and P1 fixes are deployed, run the full re-audit:

```bash
# Brand integrity
echo "=== P0-1 Area H1s ==="
for area in ashburn arlington alexandria falls-church vienna mclean great-falls reston herndon leesburg fairfax chantilly; do
  h1=$(curl -sL https://rr-nova-website.vercel.app/areas-we-serve/$area/ | grep -oE '<h1[^>]*>[^<]+</h1>' | head -1)
  if echo "$h1" | grep -q ", SC"; then echo "FAIL $area: $h1"; else echo "OK   $area"; fi
done

echo ""
echo "=== P0-2 About H1 ==="
about_h1=$(curl -sL https://rr-nova-website.vercel.app/about/ | grep -oE '<h1[^>]*>[^<]+</h1>' | head -1)
echo "$about_h1"

echo ""
echo "=== P0-3 Title tag duplication ==="
for path in / /about/ /services/shingle-roofing/ /areas-we-serve/ashburn/; do
  title=$(curl -sL https://rr-nova-website.vercel.app$path | grep -oE '<title>[^<]+</title>' | head -1)
  count=$(echo "$title" | grep -oE 'NOVA Roofing' | wc -l)
  echo "$path: $count occurrences of brand"
done

echo ""
echo "=== P0-4 Charleston residue ==="
curl -sL https://rr-nova-website.vercel.app/ | grep -ciE 'charleston|south carolina|lowcountry'

echo ""
echo "=== P0-6 llms.txt ==="
curl -sL https://rr-nova-website.vercel.app/llms.txt | grep -ciE 'atlantic-coast|charleston'

echo ""
echo "=== P0-7 tools/pricing exclusion ==="
curl -sL https://rr-nova-website.vercel.app/sitemap.xml | grep -c 'tools/pricing'

echo ""
echo "=== P1-1 FAQ schema coverage ==="
for svc in shingle-roofing roof-installation roof-repairs metal-roofing storm-damage-repair gutter-installation; do
  c=$(curl -sL https://rr-nova-website.vercel.app/services/$svc/ | grep -c 'FAQPage')
  echo "$svc: $c FAQPage blocks"
done

echo ""
echo "=== P1-2 combo pages ==="
for combo in "ashburn/storm-damage-repair" "arlington/roof-installation" "alexandria/gutter-installation"; do
  code=$(curl -sI -o /dev/null -w "%{http_code}" https://rr-nova-website.vercel.app/areas-we-serve/$combo/)
  echo "$combo: $code"
done
```

All checks should show OK / 0 / 200 / ≥1 as appropriate.

---

## Summary table

| Item | Priority | Effort | Status |
|---|---|---|---|
| P0-1. Area H1 SC→VA | P0 | XS | ❌ |
| P0-2. About H1 brand | P0 | XS | ❌ |
| P0-3. Title duplication | P0 | S | ❌ |
| P0-4. Charleston residue | P0 | S | ❌ |
| P0-5. "21 Communities" | P0 | S–L | ❌ |
| P0-6. llms.txt content | P0 | S | ❌ |
| P0-7. /tools/pricing exclusion | P0 | XS | ❌ |
| P1-1. FAQ schema all services | P1 | M | ⏳ |
| P1-2. Combo pages | P1 | M | ❌ |
| P1-3. inLanguage + dateModified | P1 | XS | ❌ |
| P1-4. AI chat confirmation/port | P1 | XS–L | ❓ |
| P1-5. Spanish translation decision | P1 | — | ❓ |
| P1-6. Per-page OG images | P1 | S | ❌ |
| P2-1. MCP endpoint | P2 | M | ❌ |
| P2-2. Vector chat citations | P2 | L | ❌ |
| P2-3. /llms-full.txt verify | P2 | XS | ❓ |
| P2-4. Lighthouse CI | P2 | S | ❌ |
| P2-5. Review schema | P2 | S | ❌ |
| P2-6. AI citation tracking | P2 | — | — |

Effort scale: XS = <1 hr, S = 1-4 hr, M = half day to 1 day, L = multi-day

---

## Notes for the executing Claude Code instance

- Make changes in small commits per item. Each commit message should reference the item number (e.g., `fix(area-pages): correct H1 state to VA — P0-1`).
- Run the relevant verification command after each fix and confirm it passes before moving on.
- If you encounter unexpected state (a file isn't where this doc expects), do not delete or overwrite — read the surrounding code, understand it, then proceed.
- If a fix would require changing >50 lines, surface the plan in a commit message or PR description before committing.
- Use the project's existing TypeScript types and helpers — don't invent new patterns when there's an established one.
- The site is in production. Test in preview deployments before merging to main.
