# AEO / GEO / AIO Strategy — Restoration Roofing SC

> **Status:** 🟡 **PROPOSAL — pending client approval from Tom Davis.**
> Most of what's listed under "✅ already in place" was shipped as part of the Next.js 15 migration (April 7) and mobile-first overhaul (April 18) — those were approved work. The AEO/GEO/AIO *optimization pass itself* (closing the remaining gaps, adding the missing schemas, publishing the blog, the domain cutover work) has not yet been approved. This doc exists so we can move fast when Tom green-lights it.
>
> **Prepared:** April 19, 2026
> **Stack:** Next.js 15 (App Router) + React 19 + TypeScript on Vercel
> **Live:** https://rr-sc-website.vercel.app (production DNS pending)
> **Reference playbook:** Alpine Peak Roofing keystone implementation (`C:/projects/APR/website/existing-repo/docs/SEO_AEO_PLAYBOOK.md`) — Lighthouse SEO 100 / Accessibility 92 / 91 routes clean. We are porting that pattern to this site.

---

## 1. Definitions

- **SEO** — Traditional Google/Bing blue-link rankings. Google can execute JavaScript, so client-rendered content eventually gets indexed, just less reliably.
- **AEO** — Answer Engine Optimization. Being the source of Google featured snippets, "People also ask," voice assistants, and direct-answer boxes. Most AEO crawlers **do not execute JavaScript** — if content isn't in the initial HTML response, it doesn't exist to them.
- **GEO** — In this playbook we use GEO for **Geographic/Local SEO** (local pack, Google Maps, "near me"). Some industry sources use GEO for *Generative* Engine Optimization; we fold that into AIO below to avoid the overload.
- **AIO** — AI-Overviews / AI-assistant citation. Being cited by ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot. Requires AEO-level HTML plus structured data (schema.org JSON-LD) that answer engines use to identify authoritative sources.

**Why this bet matters for a roofing contractor:** when someone asks ChatGPT "who does roofing in Mount Pleasant SC," the site that ships clean HTML with `RoofingContractor` schema gets cited. The site that ships a JavaScript bundle does not. AEO is the higher-leverage bet right now because the discipline is young and competition is weak.

---

## 2. Why Next.js 15 is the right foundation

The April 7 migration off the Vite SPA was the single biggest AEO/AIO enabler. AI crawlers mostly do not execute JavaScript. The old site served an empty `<div id="root">` shell to everyone. The new site ships fully-rendered HTML with metadata and JSON-LD baked in.

| Layer | Choice | Why it matters |
|---|---|---|
| Framework | Next.js 15 App Router | SSR/SSG — complete HTML for crawlers without JS |
| Runtime | Node.js 24 on Vercel Fluid Compute | Edge-cached HTML worldwide |
| Metadata | Next.js Metadata API + `generateMetadata()` | Server-rendered `<title>`/description/OG per page |
| Structured data | Inline `<script type="application/ld+json">` | In source HTML, not JS-injected |
| Images | `next/image` | Core Web Vitals → ranking signals |
| Fonts | `next/font` | Zero CLS from font swap |
| Sitemap | `public/sitemap.xml` (static — to be replaced) | Should become dynamic `app/sitemap.ts` |
| Robots | `public/robots.txt` | Currently permissive `Allow: /` |
| Analytics | GA4 (`G-0LZW0PD82B`) | Attribution, not ranking |
| Chat | OpenAI `gpt-4o-mini` + 13k-word KB | First-party answer surface on-site |

**Core rule:** a page file (`app/*/page.tsx`) should almost never start with `"use client"`. Interactivity belongs in small child components — *islands* — that the server page imports. For pages dominated by interactivity, use the server-wrapper-client pattern: server `page.tsx` holds metadata + schema, imports a client `*Content.tsx` child.

---

## 3. The ten-move strategy — RR SC status

Every roofing contractor site gets the same ten moves, in this order. Current RR SC status against each:

| # | Move | RR SC status |
|---|---|---|
| 1 | **Fix the build** — `ignoreBuildErrors: false` + `ignoreDuringBuilds: false` in `next.config.ts` | ✅ Not set → defaults to strict in Next 15 |
| 2 | **Strip `"use client"` from main pages** | ✅ Zero `"use client"` at the top of any `app/*/page.tsx` |
| 3 | **Extract interactive bits into islands** | ⚠️ Using server-wrapper-client (page → `*Content.tsx` w/ `"use client"`). Lower AEO ceiling than full islands but still passes canonical + schema. Deferred from April 18 PR: convert 6 content pages to full server components. |
| 4 | **`generateMetadata()` per route with `alternates.canonical`** | ⚠️ Every page has metadata, **zero pages set `alternates.canonical`**. Closing this is a small, high-leverage edit. |
| 5 | **`generateStaticParams()` on `[slug]` routes** | ✅ Locations + services |
| 6 | **Per-page JSON-LD schema** (see matrix §4) | ⚠️ Partial — core shipped, many gaps |
| 7 | **Kill duplicate `-seo` pages** | ✅ None exist |
| 8 | **Dynamic sitemap from data files** | ❌ Static `public/sitemap.xml` — won't auto-register blog posts |
| 9 | **Internal linking matrix** | ✅ `src/lib/linking.ts` — service↔location + nearby locations |
| 10 | **`next/image` everywhere** with proper `sizes`, `priority` on LCP | ⚠️ 19 migrated April 18; **one raw `<img>` remains** at `src/app/services/[slug]/page.tsx:301-306` (sidebar image — queued as follow-up PR) |

**Implementation scorecard:** 5 of 10 fully shipped, 4 partial, 1 not started. The partials are mostly small completions.

---

## 4. Schema type matrix — RR SC status

Which schema each page needs, and whether it's emitted today.

| Page | Primary | Secondary | Shipped? |
|---|---|---|---|
| `/` homepage | LocalBusiness + RoofingContractor | WebPage, Organization | ✅ RoofingContractor w/ AggregateRating, GeoCoordinates, City, OpeningHours (`src/app/page.tsx:434`) |
| `/about` | AboutPage | Organization | ❌ No schema |
| `/services` (index) | ItemList | BreadcrumbList | ❌ Not emitted |
| `/services/[hub]` (roofing, gutters, storm-damage) | Service | BreadcrumbList | ❌ Not emitted on hubs |
| `/services/[slug]` (detail) | Service | FAQPage + BreadcrumbList | ✅ All three (`src/app/services/[slug]/page.tsx:160,231,200`) |
| `/process` (dedicated page) | **HowTo** + HowToStep[] | BreadcrumbList | ❌ No standalone `/process` page — lives as section on homepage. HowTo is AEO gold for "how does a roof replacement work" — **strong argument for promoting this to its own route** |
| `/materials-comparison` | ItemList | BreadcrumbList | ❌ No schema |
| `/materials/[slug]` (doesn't exist yet) | Product | BreadcrumbList | ❌ Blocked on ABC Supply / Dave pricing data |
| `/areas-we-serve` (index) | ItemList | BreadcrumbList | ❌ Not emitted |
| `/areas-we-serve/[slug]` | RoofingContractor | Place + GeoCoordinates + BreadcrumbList + OfferCatalog | ✅ All (`src/app/areas-we-serve/[slug]/page.tsx:62`) |
| `/portfolio` | CollectionPage | CreativeWork[] via `hasPart` | ❌ No schema |
| `/financing` | FinancialProduct (one per plan) | WebPage | ❌ No schema |
| `/contact` | ContactPage + RoofingContractor | full `contactPoint[]`, 24/7 emergency | ❌ No schema |
| `/reviews` | Review + AggregateRating | — | ❌ Blocked on review collection (Dave/Tom) |
| `/blog` index | Blog | — | ✅ (`src/app/blog/page.tsx:59`) |
| `/blog/[slug]` | BlogPosting | BreadcrumbList | ❌ No schema per audit |
| **Root layout (global)** | Organization + LocalBusiness + WebSite w/ SearchAction | — | ❌ Layout has metadata + geo tags but **no global JSON-LD** |

**Global schemas** (emitted once in root layout, apply to all pages): `Organization`, `LocalBusiness`, `WebSite` with `SearchAction`. These are table stakes and currently missing.

---

## 5. AEO — what's shipped + what's pending

### Shipped (from Next.js migration work, already approved)
- Server-rendered JSON-LD on location and service detail pages (RoofingContractor, LocalBusiness, Service, FAQPage, BreadcrumbList)
- Server-rendered metadata via `generateMetadata()` on all dynamic routes
- 73 pages pre-rendered at build time
- Clean URL structure
- Context-aware internal linking (`src/lib/linking.ts`)
- `FAQPage` schema auto-generated from service FAQ data (`src/app/services/[slug]/page.tsx:231-245`)

### Pending (needs approval)

| Priority | Item | AEO impact |
|---|---|---|
| HIGH | Add `alternates.canonical` to every page | Basic — prevents duplicate-content dilution |
| HIGH | Global `Organization` + `WebSite` w/ `SearchAction` in root layout | Brand entity recognition |
| HIGH | Launch the blog (9 posts ready in DB, infra built) | Long-form Q&A is the single biggest AEO lever |
| HIGH | Collect customer reviews → `Review` + `AggregateRating` schema | Star ratings in SERPs |
| HIGH | `BlogPosting` schema on `/blog/[slug]` | Article rich results |
| MED | Promote `/process` to standalone route with `HowTo` schema | Rich-result carousel for "how to" queries |
| MED | `AboutPage` schema | Entity clarity |
| MED | `ContactPage` + `RoofingContractor` w/ full `contactPoint` array on `/contact` | Rich contact actions |
| MED | `ItemList` on `/services`, `/areas-we-serve` index pages | Collection recognition |
| MED | `Speakable` schema on key Q&A for voice eligibility | Google Assistant readout |
| LOW | `CollectionPage` on `/portfolio` with `CreativeWork[]` | Portfolio carousel |
| LOW | `FinancialProduct` on `/financing` (one per plan) | Financing rich results |

---

## 6. GEO — what's shipped + what's pending

### Shipped
- Site-wide geo meta tags (`src/app/layout.tsx:39-44`): `geo.region=US-SC`, `geo.placename=Mount Pleasant`, `geo.position=32.8468;-79.8203`, `ICBM`
- 21 dedicated location pages each with unique `generateMetadata()` and full LocalBusiness JSON-LD (GeoCoordinates, `areaServed`, `openingHoursSpecification` 24/7, `priceRange`, address, OfferCatalog)
- Physical address in all schemas: 75 Port City Landing, Suite 110, Mount Pleasant, SC 29464
- Service pages declare all 21 cities in `areaServed`
- Service ↔ location cross-linking (`getServiceAreaLinks`)

### Pending

| Priority | Item | GEO impact |
|---|---|---|
| BLOCKER | Production DNS cutover to `restorationroofingsc.com` | Blocks GSC, GBP, citation consistency |
| HIGH | Verify domain in Google Search Console + submit sitemap | Indexing + performance reporting |
| HIGH | Verify in Bing Webmaster Tools | Bing powers ChatGPT/Copilot search |
| HIGH | Link Google Business Profile to production domain | Local pack + Maps |
| HIGH | NAP consistency audit across GBP / Yelp / Facebook / Apple Maps | Local citation signals |
| MED | Call tracking (CallRail) with DNI numbers | Attribute calls to organic vs paid vs local pack |
| MED | Per-city page enrichment — neighborhoods, school districts, landmarks | Long-tail "[service] in [neighborhood]" |
| LOW | Sub-location pages under cities | Hyper-local — after core 21 rank |

---

## 7. AIO — what's shipped + what's pending

### Shipped (crawlability piece)
- Fully SSR HTML on all 73 pages — GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Amazonbot all receive complete content
- Rich entity graph via JSON-LD on location + service pages
- `robots.txt` currently allows all bots (`User-agent: * \n Allow: /`) — no AI crawlers blocked
- Sitemap linked from robots.txt
- In-site AI chat (giraffe mascot, `src/components/ChatWidget.tsx`): OpenAI `gpt-4o-mini` + 13k-word KB with lead scoring
- Blog infrastructure in place (Supabase-backed, `src/app/blog/[slug]/page.tsx`) — 9 posts drafted

### Pending (content/structure piece)

| Priority | Item | AIO impact |
|---|---|---|
| HIGH | **Launch the blog** | LLMs overwhelmingly cite long-form Q&A and "ultimate guide" content |
| HIGH | Add **direct-answer paragraphs** at top of every service page ("Roof replacement in Charleston typically costs $X–$Y and takes Z days…") | LLMs lift direct-answer snippets for grounding |
| HIGH | Convert `public/sitemap.xml` → `src/app/sitemap.ts` | Blog posts auto-register on publish |
| MED | Decide AI crawler policy in `robots.txt` — **explicit allow** (we want citation, not a moat) | Documents intent; prevents future accidents |
| MED | Add `llms.txt` at site root — emerging convention | Early-mover signal |
| MED | Publish a canonical **Fact Sheet** page (licenses, insurance, founded, service area polygon, materials, warranty terms) | LLMs ground "is this legit" queries |
| MED | `AggregateRating` + `Review` schema once reviews collected | Trust signal LLMs use when recommending |
| LOW | IndexNow submission on blog publish | Near-instant Bing/Yandex indexing |
| LOW | `QAPage` schema for "can you [X]" style pages | AIO citation surface |

**Crawler policy recommendation:** for a local service business, explicit allow of GPTBot / ChatGPT-User / PerplexityBot / ClaudeBot / anthropic-ai / Google-Extended / CCBot / Amazonbot / Applebot-Extended is almost always correct. We want citation, not content moat.

---

## 8. Common pitfalls (from the playbook)

Things that look right but are wrong — keep this list in mind during implementation:

1. **Passing icon components across the server→client boundary.** `<ServicesGrid services={[{ icon: Home, ... }]} />` throws at build time when `ServicesGrid` is a client component. Fix: move the icon map inside the island, key by string.
2. **`next/image` with `unoptimized` as a workaround.** If you reach for `unoptimized`, you're probably missing a hostname in `next.config.ts` `images.remotePatterns`. Add the hostname instead.
3. **Hardcoded business address when you don't have one.** Flag a blocker in `BRIDGE_STATUS.md` — don't let a fake address go to production.
4. **`alternates.canonical` pointing to the homepage on every page.** A canonical should point to itself (or to the consolidated version when de-duplicating). Self-canonical is the default.
5. **Duplicate `-seo` page folders.** Delete the duplicate after merging unique copy — don't leave both indexable.
6. **Dynamic routes without `generateStaticParams()`.** Become server-rendered at request time instead of static HTML — slower TTFB, worse CWV.
7. **`'use client'` at the top of a page just because one child is interactive.** Reverse it: server page imports an island. If the whole page is a wizard, use the server-wrapper-client pattern.
8. **HowTo schema on a service page instead of the process page.** HowTo belongs on `/process` — it describes *how the work is done*. Service schema goes on service pages.
9. **Root-layout schemas treated as a substitute for per-page schemas.** Global `LocalBusiness` covers the brand. Per-page schemas cover the topic. You need both.
10. **Flipping `ignoreBuildErrors` back to `true` to unblock a deploy.** Fix the error. There's always a root cause and it's usually small.

---

## 9. Priority stack — proposed order once approved

1. **Production DNS cutover** (unblocks GEO — GSC, GBP, Bing Webmaster, citation consistency)
2. **Launch the blog** (unblocks AEO + AIO — largest single lever)
3. **`alternates.canonical` on every page** + **global `Organization` / `WebSite` / `SearchAction` schemas** in root layout (one short PR, covers §3 move 4 + §4 global row)
4. **`BlogPosting` schema** on `/blog/[slug]` (so blog posts carry full rich-result metadata)
5. **`ContactPage` + `AboutPage` + `ItemList` on index pages** (small PR, closes §4 gaps)
6. **Promote `/process` to standalone route** with `HowTo` + HowToStep[] (AEO gold)
7. **Convert static sitemap → `app/sitemap.ts`** (so blog posts auto-register)
8. **Direct-answer paragraphs** at top of service pages (AIO lift)
9. **Collect customer reviews** → `Review` + `AggregateRating` schema
10. **Verify in GSC + Bing Webmaster Tools**, submit sitemap, link GBP, NAP audit
11. **Publish Fact Sheet page** + add `llms.txt` + explicit AI crawler policy in `robots.txt`
12. **`CollectionPage` on portfolio + `FinancialProduct` on financing** (lower priority, small PRs)
13. **`Product` schema on `/materials/[slug]`** (blocked on ABC Supply / Dave pricing)
14. **`Speakable` schema + `QAPage` schema + IndexNow** (polish)

Orchestration pattern (from the playbook, worth keeping in mind for execution): run multiple implementation agents in parallel on disjoint file scopes, each running `npx tsc --noEmit` in-place; only one serial agent runs `npm run build` at the end (concurrent `.next` writes clobber each other).

---

## 10. Verification checklist

Before declaring AEO/GEO/AIO work "done" it should pass:

### Automated
- [ ] `npm run build` passes with strict flags on
- [ ] `npx tsc --noEmit` returns zero errors
- [ ] `npm run lint` returns zero errors
- [ ] Lighthouse SEO ≥ 95 (playbook target: 100)
- [ ] Lighthouse Accessibility ≥ 90

### Manual crawl check
For each key route, `curl -s https://<host>/<route>` and verify the response body contains:
- Expected visible text (city name, service name) — **not** an empty React shell
- At least one `<script type="application/ld+json">` block
- Exactly one `<h1>`

Routes to check: `/`, `/about`, `/services`, `/services/roofing`, `/services/storm-damage`, `/services/roof-repairs`, `/areas-we-serve`, `/areas-we-serve/mount-pleasant`, `/portfolio`, `/contact`, `/blog`, `/blog/[any-slug]`, `/sitemap.xml`

### Schema validation
- Google Rich Results Test — https://search.google.com/test/rich-results — on homepage, a service, a location, a blog post
- Schema.org Validator — https://validator.schema.org/ — for plain JSON-LD validation

### Sitemap sanity
- `/sitemap.xml` returns valid XML
- Every public route present
- All URLs use the canonical host (no mix of www / apex / http)

### AI citation spot-check
- After ~2 weeks of indexing post-DNS-cutover, ask ChatGPT / Perplexity / Claude: "best roofing contractor in Mount Pleasant SC" — see whether we're cited. This is a rough signal, not a KPI — LLM answers are noisy — but repeated non-citation after 30 days means something is wrong.

---

## 11. File reference

Production-critical files touching these strategies:

- `src/app/layout.tsx` — site-wide metadata defaults, geo tags, viewport/themeColor. **Target for global JSON-LD addition.**
- `src/app/page.tsx` — homepage RoofingContractor schema
- `src/app/areas-we-serve/[slug]/page.tsx` — per-location metadata + LocalBusiness/RoofingContractor/BreadcrumbList JSON-LD
- `src/app/services/[slug]/page.tsx` — per-service metadata + Service/BreadcrumbList/FAQPage JSON-LD. **Also has remaining raw `<img>` at line 301-306.**
- `src/app/blog/[slug]/page.tsx` — target for `BlogPosting` schema
- `src/app/{about,contact,financing,portfolio,materials-comparison,reviews}/page.tsx` — all need per-page schema
- `src/components/shared.tsx` — `JsonLdScript` component used across routes
- `src/lib/data.ts` — LOCATIONS, SERVICES, COMPANY, SITE_URL, TESTIMONIALS (source of truth)
- `src/lib/linking.ts` — `getRelatedServices`, `getServiceAreaLinks`, `getNearbyLocations`
- `public/sitemap.xml` — to be replaced by dynamic `src/app/sitemap.ts`
- `public/robots.txt` — to be augmented with explicit AI crawler policy
- `next.config.ts` — strict build flags already default; `images.remotePatterns` whitelist

---

## 12. Related docs

- `docs/META-SEO-IMPLEMENTATION-PLAN.md` — original metadata architecture plan (April 7)
- `docs/NEXTJS-MIGRATION-PLAN.md` — migration rationale including SEO/AEO motivation
- `docs/marketing-team-brief.md` — handoff brief for Tom's marketing team
- `docs/mobile-first-overhaul-2026-04-18.md` — April 18 mobile overhaul record
- `BRIDGE_STATUS.md` — phase tracker (AEO items currently under Phase 3)
- `project-status.md` — session-by-session activity log
- **Reference playbook:** `C:/projects/APR/website/existing-repo/docs/SEO_AEO_PLAYBOOK.md` — Alpine Peak Roofing keystone implementation; canonical pattern we're porting
