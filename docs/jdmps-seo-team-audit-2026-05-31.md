# JDMPS SEO-Team Site Audit — rr.jdmps.com

**Date:** 2026-05-31
**Subject:** `https://rr.jdmps.com/` — agency staging site built by JDMPS
**Auditor:** Jimmy + Claude

---

## TL;DR

The SEO team (JDMPS) **did not modify our Next.js build**. They built a **brand-new WordPress site from scratch** on their own staging subdomain. The new site:

- Borrows our **team bios verbatim** from `/about` (Tailwind class fingerprints prove it)
- Borrows our **Roofle RoofQuote PRO widget integration** on `/price-my-roof/`
- Borrows our **updated address** (75 Port City Landing Ste 110)
- Imports the **blog content from the old Scorpion site** (with the same broken truncated slugs)
- Replicates Scorpion's **programmatic area × service URL pattern**
- Drops everything else we built: AI chat (Claude Sonnet 4.6), mascot, materials comparison, admin pricing tool, dedicated reviews page, TAMKO HailGuard product specs, Spanish bilingual toggle

The site is fully `noindex,nofollow` and unfinished (visible placeholder text, missing H1s, mixed license numbers, staging cruft in the sitemap). It is a *staging build*, not a launched site.

---

## Platform & stack

| Layer | Detail |
|---|---|
| CMS | WordPress 7.0 |
| Page builder | Elementor 4.1.1 + Elementor Pro |
| SEO plugin | Yoast SEO (generates schema graph + sitemap_index) |
| Schema plugin | Schema Pro (separate `HomeAndConstructionBusiness` block) |
| Performance | WP Rocket 3.21.3 (caching + lazy loading) |
| Theme | Hello Elementor + `hello-theme-child-master` |
| Hosting | Apache + h2 upgrade |
| Status | **`<meta name='robots' content='noindex,nofollow' />` on every page** — staging |
| Sitemap | `https://rr.jdmps.com/sitemap_index.xml` (Yoast) |
| Build started | 2026-05-08 (homepage `datePublished`) |
| Last edit | 2026-05-27 (homepage `dateModified`) |

---

## What they imported vs built from scratch

### From our Next.js build (confirmed)

1. **About-us team bios** — verbatim copy. Class names in the HTML are Tailwind utilities (`mt-4 text-base md:text-lg leading-relaxed max-w-md sm:max-w-lg md:max-w-xl mx-auto text-gray-600`). WordPress + Elementor doesn't ship Tailwind. They literally pasted our React-rendered HTML.
2. **Bilingual / Spanish-speaking community copy** — same phrasing as ours.
3. **Roofle RoofQuote PRO widget** — present on `/price-my-roof/` (4 roofle + 3 RoofQuote mentions, plus iframe references).
4. **Updated address** — 75 Port City Landing Ste 110, Mount Pleasant, SC 29464 (our May 1 update).
5. **Correct license RBS 67027** — appears alongside the old wrong one (see Cons).

### From the old Scorpion site (confirmed)

1. **Blog post slugs with the same truncation bug** — `gutter-maintenance-guide-for-charleston-homeowne`, `preparing-your-roof-for-severe-weather-in-charle`, `the-top-5-mistakes-to-avoid-during-a-roofing-ins`. These are Scorpion's CMS slugs imported directly.
2. **Programmatic area × service URL pattern** — `/areas-served/mount-pleasant/shingle-roofing/`, `/areas-served/summerville/roof-installation/`, etc. Matches Scorpion's `/areas-we-serve/[city]/[service]/` pattern.

### Built net-new by JDMPS

- Site architecture: `/roofing/[service]/` for service pages, `/gutters/[service]/`, `/areas-served/[city]/`, `/areas-served/[city]/[service]/`
- New pages we never had: `/careers/`, `/specials/`, `/service-overview/`, `/service-listing/`
- WP-native sitemap/blog/comments feed infrastructure
- Yoast schema graph (WebPage, Organization, WebSite + SearchAction, BreadcrumbList)
- Schema Pro `HomeAndConstructionBusiness` block

---

## Full sitemap (pages + blog posts)

**Pages (64):** /, /service-overview, /service-area, /gallery, /privacy-policy, /specials, /careers, /financing, /about-us, /contact-us, /blog, /price-my-roof, /service-listing, /service-listing-bk, /test, /roofing/, /gutters/, plus 13 `/roofing/[service]/` pages (concrete, flat, emergency, metal, coating-services, inspection, attic-venting, installation, leak-repairs, maintenance, shingle, skylight-installation, skylight-repair, new-construction, repair, slate, storm-damage), `/gutters/installation`, `/gutters/repair`, plus 18 `/areas-served/...` pages including 6 Mt Pleasant × service combos and 6 Summerville × service combos.

**Blog posts (19):** All imported from Scorpion with truncated slugs.

---

## SEO/Technical findings

### What they got right (pros)

| Item | Detail |
|---|---|
| **Yoast schema graph on every page** | Full graph: `WebPage`, `Organization`, `WebSite` with `SearchAction`, `BreadcrumbList`, `ImageObject`. This is exactly the global schema setup we identified as a gap in our build. |
| **BreadcrumbList schema is actually populated** | E.g., on `/roofing/shingle/`: Home → Roofing Services → Shingle Roofing with full URLs. |
| **Canonical tags on every page** (Yoast default) | Closes the gap we never fixed on our build. |
| **`Schema Pro` `HomeAndConstructionBusiness` block** | Includes address, geo (32.7936, -79.8604 — Charleston center), telephone, opening hours, priceRange. |
| **Yoast XML sitemap_index** | `/sitemap_index.xml` → `post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`. Standard Yoast structure. |
| **Clean robots.txt** | `User-agent: * / Disallow:` + sitemap reference. Yoast block marker. |
| **WP Rocket caching configured** | Lazy rendering, preconnect, OCI enabled — should give them decent Core Web Vitals once content is finalized. |
| **More area pages than we had** | Adds Cherry Hill, Russellville, Bonneau, Ladson, Woodhaven, Woodville, Columbia — Lowcountry coverage. |
| **Programmatic area × service template** | 12 generated combo pages (6 Mt Pleasant × 6 Summerville × services). Exactly the local-SEO pattern we recommended adding to our build. |
| **Address corrected to current** | 75 Port City Landing Ste 110. |
| **OG + Twitter cards** | Configured site-wide (Yoast defaults). |
| **HTTPS + h2** | Apache with HTTP/2 upgrade. |
| **Yoast generates `dateModified`** | Useful freshness signal. |

### What they got wrong (cons / regressions / unfinished)

| Item | Severity | Detail |
|---|---|---|
| **Whole site `noindex,nofollow`** | Expected for staging | Intentional during build. Must be flipped before launch. |
| **No H1 on the homepage, /about-us, /price-my-roof, /roofing/shingle/** | High | Elementor heading widget configured as H2/H3 instead of H1. Mt Pleasant page has H1; others don't. Inconsistent. |
| **"Service Name" placeholder H3s on homepage** | High | Three `<h3>Service Name</h3>` blocks rendering verbatim — template hasn't been populated. |
| **No FAQ schema anywhere on the site** | High | Same gap as Scorpion. FAQ content exists in copy but is not marked up. Direct AEO loss. |
| **No Service schema on service pages** | Medium | Generic `HomeAndConstructionBusiness` is identical on every page. Should have `Service` schema on `/roofing/shingle/`, `/roofing/metal/`, etc. with `provider`, `areaServed`, `serviceType`. |
| **No `AggregateRating` schema** | Medium | They show a Google-stars image but no markup. Star snippets won't appear. |
| **No `Review` schema** | Medium | Testimonials are plain HTML. |
| **Mixed license numbers on the same page** | **CRITICAL** | Pages display BOTH `License RBS 67027` (correct, twice) AND `License RBC 694` (Scorpion's old wrong number, once). Tom must not display two license numbers — pick one. |
| **Wrong logo in Organization schema** | High | Yoast schema's Organization logo points to `nhg-logo.svg` (a JDMPS template default, not Restoration Roofing's logo). Will surface in Knowledge Panel candidates. |
| **Phone is a call-tracking number** | Medium | Schema/contact shows `843-940-7883` (likely CallRail). Real business line `843-306-2939` also appears in some footer/contact areas. Dual phones can confuse NAP. Decide on strategy before launch. |
| **`telephone:"8439407883"` schema is missing dashes** | Low | Cosmetic but Google prefers `+1-843-940-7883`. |
| **Generic `HomeAndConstructionBusiness` schema type** | Low | More specific `RoofingContractor` (Scorpion used this) is recommended. |
| **`priceRange:"$"` on every page** | Low | Meaningless without context. Either remove or set credibly (`$$` for premium positioning). |
| **`openingHoursSpecification` claims 24/7** | Low | True for emergencies, misleading for normal business queries. |
| **Static identical schema block on every page** | Medium | Schema Pro outputs the exact same `HomeAndConstructionBusiness` JSON-LD on every URL. Should be page-contextualized. |
| **Staging cruft in public sitemap** | High | `/test/` and `/service-listing-bk/` are HTTP 200 AND listed in `page-sitemap.xml`. Must be deleted or noindexed before launch. |
| **Truncated blog slugs preserved from Scorpion** | High for migration | URLs end with hanging hyphens like `/what-should-i-do-if-my-roof-is-leaking/` (where the original title was a question). On Scorpion the artifact was `/...is-leaking-/` (extra hyphen). JDMPS cleaned the hyphen but didn't restore the full word. Easy to fix; should be done before launch with redirects from any indexed Scorpion URLs. |
| **`/price-my-roof/` has no meta description** | Medium | Empty `<meta name="description">`. Yoast snippet defaults will be auto-generated, often poorly. |
| **Visible content uses smart quotes / em-dash heavily** | Low | AI-detector signal — possibly LLM-generated copy passed through unedited. Worth a copy editing pass. |

---

## What was lost vs our Next.js build (regressions)

These were features we built that are **not present** on the JDMPS WordPress site:

| Lost feature | Where it lived in our build | Impact |
|---|---|---|
| **Claude Sonnet 4.6 AI chat widget** | Site-wide via root layout | Big AEO surface gone. The chat itself was an "answer engine" people could query directly. |
| **`/tools/pricing` admin calculator** | Gated route | Admin-only; not customer-facing, but Tom's internal tool. |
| **Roofle integration on every CTA** | All "Get Free Estimate" CTAs | They isolated Roofle to one page (`/price-my-roof/`) instead of every CTA. Lower conversion surface. |
| **Mascot v5b giraffe** | Quote tab on homepage | Brand differentiation gone. |
| **`/materials-comparison`** | Top-level page | Content depth lost. |
| **`/reviews` dedicated page** | Top-level page | Testimonials are now scattered, not consolidated. |
| **TAMKO HailGuard product specs** | `/services/shingle-roofing` / `/services/roof-installation` | We had detailed product-specific content (May 14 commit). Their shingle page is generic. |
| **Spanish bilingual toggle** | Header | Bilingual messaging in copy survived; the actual UI toggle did not. |
| **Sheen + dark Values panel polish** | About page (May 1 commits) | Visual brand polish gone. |
| **`/about` "Our Team" reorder + family flank photos** | About page | Some content preserved (team bios), but the visual story is replaced by stock Elementor template. |

---

## AEO / GEO / AIO strategy implications

**What changed in the strategic landscape:**

### Net positive for AEO/GEO (vs our current build)
1. **Site-wide Yoast schema graph** — Organization, WebSite, BreadcrumbList, WebPage are exactly the foundational entities AI engines use for grounding. We don't have these.
2. **Canonical tags everywhere** — closes our biggest known SEO gap.
3. **Programmatic area × service pages** — these are AEO gold for "[service] in [city]" queries.
4. **More area coverage** — Cherry Hill, Russellville, Bonneau, etc. expand entity reach.

### Net negative for AEO/GEO (vs our current build)
1. **No FAQ schema** — they have FAQ content; we have FAQ content; *neither* of us has the schema markup. JDMPS missed this opportunity and AEO engines won't pull Q&A snippets cleanly.
2. **No AI chat surface** — our Claude widget was itself an entity LLMs could index/test against; gone.
3. **Generic identical schema on every page** — they have the foundation but not the per-page specificity. A Service schema on `/roofing/shingle/` with `provider`, `areaServed`, `category`, `offers` would dramatically outperform their current setup.
4. **Wrong logo in Organization schema** — Knowledge Panel risk.
5. **Dual license numbers visible** — direct factual contradiction on the same page is a trust signal red flag for both Google's quality raters and LLMs.
6. **Tracking-number-only contact** — if `843-940-7883` is what shows up in Google Business Profile and across citations, and they later switch off the tracking number, the entire NAP citation graph breaks.

### Net neutral / TBD
1. **WordPress vs Next.js** — performance ceiling is lower on WP+Elementor, but WP Rocket and image lazy loading get them most of the way. Real test is post-launch Lighthouse.
2. **Bilingual messaging without translation** — copy says "we serve Spanish-speaking community" but no Spanish content. Same as our build. Net wash.

---

## Things Tom should clarify with JDMPS before anything else

1. **Phone strategy.** Is `843-940-7883` a CallRail tracking number? If so, what's the rollout plan — does it forward to `843-306-2939`? When does it go live? What happens to GBP / Yelp / BBB citations?
2. **License display.** Why is `RBC 694` still showing on multiple pages alongside `RBS 67027`? Pick one. The correct one is `RBS 67027`.
3. **Logo in schema.** The Yoast Organization logo URL is `nhg-logo.svg` — that's a template default, not Restoration Roofing's actual logo. Get them to fix.
4. **AI chat decision.** Did JDMPS deliberately remove our Claude chat widget, or did they not know about it? It was a major investment.
5. **Roofle scope.** Only `/price-my-roof/` has the widget. Is that an intentional scope reduction, or do they plan to wire all CTAs to it the way we did?
6. **Launch plan & 301 map.** When DNS cuts over to `restorationroofingsc.com`:
   - All Scorpion URLs (`/roofing-services/...`) need 301s to JDMPS URLs (`/roofing/...`)
   - All Scorpion blog URLs (`/blog/2026/april/...`) need 301s to flat JDMPS slugs
   - All Scorpion area pages need 301s
   - Our Next.js Vercel URLs need 301s (or, more realistically, our build is abandoned)
   - GSC change-of-address from Scorpion property to new property
   - GBP website URL update
7. **Staging cruft removal.** `/test/` and `/service-listing-bk/` must be deleted (not just unpublished) before launch.
8. **Pre-launch noindex flip.** Confirm they have a launch checklist that flips `noindex,nofollow` off — easy to forget.

---

## Recommendations

### For Tom (high priority, regardless of whether our build ships or not)

1. **Get the license number fixed today.** Mixed `RBS 67027` and `RBC 694` on the same page is a legal/trust issue.
2. **Decide on phone strategy with JDMPS before launch.** Tracking number is fine but the rollout matters.
3. **Push JDMPS to add FAQ schema** — they're losing AEO every day they don't.
4. **Push JDMPS to fix the Organization logo in Yoast** — wrong logo in schema.

### For our build (if it ever ships)

If our Next.js build is going to ship instead of (or alongside) JDMPS's WordPress, the gap analysis from this audit tells us exactly what to copy:

1. Add full Yoast-equivalent schema graph in root layout (Organization, WebSite + SearchAction, WebPage). ~2 hrs.
2. Add `alternates.canonical` to every page. ~1 hr.
3. Add `BreadcrumbList` schema site-wide. ~2 hrs.
4. Add `FAQPage` schema wherever we have FAQ content — beat JDMPS to it. ~1 hr per page.
5. Build programmatic area × service pages from one template (`/services/[service]/[area]` or `/areas-we-serve/[area]/[service]`). ~4 hrs once. ~126 pages output.
6. Add `Service` schema with `areaServed` and `provider` on service pages. ~2 hrs.
7. Add `Review` and `AggregateRating` schema. ~1 hr.

### For the strategic call

The JDMPS site is **not finished** (placeholder text, missing H1s, staging URLs in sitemap, mixed license numbers, wrong logo in schema). It's also **not yet indexed** (noindex everywhere). So there is still time for Tom to decide:

1. **Ship JDMPS as the canonical site.** Most likely outcome given the financial/contractual investment in their agency. Audit findings give Tom the punch list to demand from JDMPS before launch.
2. **Ship our Next.js build as canonical.** Requires us to close the schema/canonical/area-page gaps above, plus a defensible migration plan from Scorpion's existing indexed URLs.
3. **Hybrid.** JDMPS marketing site + our AI chat + our knowledge base as a subdomain or sub-path. Possible but operationally complex.

I'd lead with: "JDMPS has the SEO foundation. We have the AI/UX differentiation. The version that wins is the one that has both."

---

## Appendix: raw findings summary

- Live URL: `https://rr.jdmps.com/` (HTTP 200, noindex,nofollow)
- Homepage size: 218,070 bytes (heavy)
- Yoast SEO + Schema Pro + WP Rocket + Elementor Pro
- 64 pages + 19 blog posts in sitemap_index
- Schema phone: 843-940-7883 (tracking)
- Schema address: 75 Port City Landing Ste 110, Mount Pleasant, SC 29464 ✓
- Schema geo: 32.7936, -79.8604 (Charleston center)
- License: displayed as both RBS 67027 (correct) and RBC 694 (incorrect) on multiple pages
- Logo in Organization schema: `nhg-logo.svg` (wrong logo)
- No AI chat, no mascot, no materials-comparison, no admin pricing tool
- Roofle widget present on `/price-my-roof/` only
- Bilingual messaging preserved in copy; no Spanish translation UI
- Team bios copied from our build (Tailwind class fingerprints)
- Blog imported from Scorpion (truncated slug artifacts)
