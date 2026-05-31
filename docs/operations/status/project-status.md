# Restoration Roofing SC — Project Status
> Last updated: May 31, 2026

## 🟡 Status: Handed off to JD Plumbing Partners — Audit + Comparison Documents Delivered

---

## 🔄 Last Activity (May 31, 2026)

**Independent audit of JDMPS rebuild + Nova comparison documentation series**

### What shipped (commit `a08991a`)

JDMPS delivered a staging URL for the rebuilt Restoration Roofing SC site at
`rr.jdmps.com` (WordPress + Elementor + Yoast + Schema Pro + WP Rocket).
Independent audit and comparison documentation prepared for Tom Davis with
shareable client-facing PDFs and an internal Nova extraction checklist.

**Client-facing deliverables (Tom + JDMPS)**
- `docs/restoration-roofing-website-audit-2026-05-31.{md,pdf}` — joint audit
  documenting strengths (Yoast schema graph, canonicals, programmatic area×service
  pages, wider Lowcountry coverage), pre-launch items (license number duplication,
  template logo in schema, missing H1s, staging URLs in sitemap, missing FAQ
  schema, generic identical schema repeated across pages), AI-search readiness
  assessment, and features available for import from the original Next.js build.
- `docs/tom-three-website-comparison-2026-05-31.{md,pdf}` — brief, table-heavy
  comparison for Tom: what JDMPS changed, what cannot be cited by AI search
  engines, technical appendix with measured load-time data (JDMPS TTFB
  2.5–2.7s vs Nova 0.17–0.32s, ~10–15× delta) and plugin-sprawl observations,
  and the case for Nova covering classic SEO + GBP alignment + AI search
  optimization in one stack.

**Internal references**
- `docs/scorpion-site-audit-2026-05-31.md` — initial dead-end audit of the
  legacy `restorationroofingsc.com` (Scorpion CMS site, not our build).
  Documents the stale NAP and old `RBC 694` license still showing publicly —
  needs Tom action regardless of which site eventually owns the domain.
- `docs/jdmps-seo-team-audit-2026-05-31.md` — first-pass technical audit notes
  for rr.jdmps.com.
- `docs/jdmps-extraction-for-nova.md` — surgical extraction checklist of what
  JDMPS does well, with Next.js implementation patterns for porting into Nova.
- `docs/nova-vs-jdmps-comparison-2026-05-31.md` — internal status report
  mapping the extraction checklist against Nova's current state at
  `rr-nova-website.vercel.app`.
- `docs/nova-fixes-handoff-2026-05-31.md` — P0/P1/P2 fix list for the Nova
  repo, formatted for consumption by another Claude Code instance (SC→VA
  migration artifacts, FAQ schema rollout across all service pages,
  programmatic combo pages, MCP endpoint, etc.).
- `docs/client-executive-summary-2026-05-31-handoff.md` — Tom-only summary of
  the JDMPS handoff implications.

**Tooling**
- `scripts/md-to-pdf.js` — reusable markdown-to-PDF helper using Chrome
  headless + inline CSS template (Letter size, professional typography,
  table-friendly page breaks). Used for the audit and comparison PDFs;
  reusable for future deliverables.

### Key findings

- JDMPS rebuild is solid classic SEO foundation (Yoast schema, canonicals,
  programmatic area pages) but **removes the AI-native features that
  differentiated the original** (Claude chat, Roofle on every CTA, materials
  comparison, TAMKO HailGuard specs, calibrated pricing formula, Spanish
  toggle UI, mascot, custom About design, customized CTAs).
- **As currently scoped, the JDMPS site will not be cited by AI search
  engines.** Missing: FAQ schema, Service schema per page, Review/AggregateRating
  schema, entity graph @id linking, `sameAs` to GBP/FB/BBB, AI bot allow
  directives, `llms.txt`, on-site AI chat. All can be added on WordPress
  (most via plugins/config; the AI chat requires real custom development).
- Measured load-time delta is dramatic: JDMPS TTFB 2.5–2.7s vs Nova
  0.17–0.32s. JDMPS homepage loads 71 external assets from `<head>` (50 link
  tags, 17 scripts, 4 inline) vs Nova's 25. The slow page loads observed are
  structural to the stack, not internet speed.
- Nova (`rr-nova-website.vercel.app`) is meaningfully ahead of JDMPS on most
  AEO dimensions already: AI bot allows, llms.txt, schema entity graph with
  @id linking, RoofingContractor typed array, AggregateRating with real
  numbers (4.9/47), sameAs grounding, QuoteAction + makesOffer signals.
  Remaining work tracked in `docs/nova-fixes-handoff-2026-05-31.md`.

### Strategic posture
Restoration Roofing SC continues under JDMPS for classic SEO + agency ops.
Nova Roofing & Restoration is the AI-native, schema-rich build that covers
classic SEO + Google Business Profile alignment + AI search optimization in
one site. Tom is not locked in to JDMPS — evaluation runway is the next
60–90 days post-launch.

**Phase:** Site handed off to JDMPS for operations. Active development on
this repo paused; AI-native build work continues on Nova.
**Live:** https://rr-sc-website.vercel.app (our Next.js build, still up)
**JDMPS staging:** https://rr.jdmps.com (their WordPress rebuild)
**Nova build:** https://rr-nova-website.vercel.app
**Repo:** github.com/Agentic-Person/rr-sc-website
**Client Repo:** github.com/SCROOF1/restorationroofing

---

## 🔄 Last Activity (May 14, 2026)

**TAMKO HailGuard specs + team section cleanup**

### What shipped

**Commit `363c536` — TAMKO product rename and accurate specs**
- Corrected product name site-wide from "TAMKO Storm Fighter (Hail Guard)" →
  **TAMKO HailGuard™** (official TAMKO product name per brochure Phillipsburg 41002067 ©2026)
- `src/lib/materials.ts`: full spec rewrite — ImpactCore™ Technology, UL 2218 Class 4
  impact resistance, 160 mph system wind warranty, Limited Lifetime + industry-first
  hail warranty (as of March 2026), lifespan updated to 30–50 yrs, all 8 color options
  documented, hail warranty system requirements (Synthetic Guard™ + Moisture Guard®
  underlayments required)
- `src/lib/pricing.ts`: tier label updated to HailGuard / TAMKO HailGuard
- `src/app/roof-quote/roof-quote-content.tsx`: EN and ES shingle tier cards updated
  (name, tagline, description, highlights, lifespan); cost-driver FAQ copy updated
- `lib/knowledgebase/restoration-roofing-content.md`: spec block fully rewritten with
  all colors, UL report numbers (ER2919-01/02), CRRC note on Olde English Pewter,
  and hail warranty system requirements

**Commit `1ea3d23` — Team section: remove Devin Ringle, reflow to 3-col**
- `src/app/about/AboutContent.tsx`: removed Devin "D" Ringle (no longer on staff)
- Grid reflowed from `lg:grid-cols-4 gap-6 max-w-6xl` → `lg:grid-cols-3 gap-8 max-w-5xl`
  so remaining 3 cards (Josh McElroy, Matt Vannort, Chase Garrett) are wider and centered
- Image `sizes` hint updated from 22vw → 30vw for correct Next.js resolution at wider size

### Key marketing note
TAMKO HailGuard's primary differentiator: **first and only asphalt shingle system
with a hail warranty** (industry-first as of March 2026). Lean on this in SC storm
season marketing — can help homeowners avoid paying their deductible after hail events.

**Phase:** All website development done; remaining items are integrations (Zuper, SMS) and launch steps (domain, GA4, QA). See `docs/operations/phase-1.5-remaining.md` for the full remaining task list.
**Live:** https://rr-sc-website.vercel.app
**Repo:** github.com/Agentic-Person/rr-sc-website
**Client Repo:** github.com/SCROOF1/restorationroofing
**Previous Repo (Vite SPA):** github.com/Agentic-Person/restorationroofing-sc (archive only)

---

## 🔄 Last Activity (May 9, 2026)

**Pricing model: independent installed price per shingle tier**

### What shipped (commit `60f7d60`)

Refactored `pricing_config` so each shingle tier carries its own installed
price instead of deriving Oakridge and Hail Guard from Duration's price.
The duration-anchored formula made it impossible to set tier prices
independently of the underlying shingle cost — Tom now needs that
flexibility because installed price covers labor, overhead, and margin
which vary tier-to-tier outside the old single-formula model.

**1. Migration** (`supabase/migrations/005_pricing_per_tier_installed.sql`)
- Added `oak_installed` and `tamko_installed` columns to `pricing_config`.
- Backfilled the live row from the prior derivation (411 / 558) so the
  public site was unchanged at migration time.
- Then published new live values via service-role PATCH:
  Oakridge **$450**, Duration **$500**, Hail Guard **$700**.
  Shingle costs unchanged ($102 / $116 / $249).

**2. `src/lib/pricing.ts`**
- `PricingConfig` gains `oakInstalled` and `tamkoInstalled`.
- `computeTiers()` reads each tier's installed price directly. The
  `materialDelta` field is still surfaced (for admin display) but no
  longer drives the installed price.
- Consumers (`/roof-quote`, chat route) didn't change — they still read
  `tier.installedPerSquare`, which now comes straight from config.

**3. `/tools/pricing` admin form**
- New "Installed Price per Tier" card with three editable inputs;
  removed "Duration Installed Benchmark" from Core Variables.
- Spread table dropped the "Δ vs Duration" column; the formula
  breakdown is rewritten for the simpler model.
- `actions.ts` validation + persistence and `page.tsx` row mapper
  cover the new columns.

**4. Cache invalidation**
- Live row was updated via direct service-role PATCH (bypassing the
  admin Publish action), so the cached `getPricing()` read kept serving
  old values until Vercel redeployed on this push and busted the cache.

---

## 🔄 Previous Activity (May 6, 2026 — Session 4)

**Internal admin tool: gated `/tools/pricing` calculator drives live customer pricing**

### What shipped (commit `f46a1c1`)

A self-service pricing admin replacing the previous "tell Claude to edit
materials.ts" workflow. Same formula as the standalone HTML tool (Duration
installed price as benchmark, other shingles as cost deltas, ±10% range,
optional `+$30/sq` steep-slope), but now backed by Supabase and wired
through the chat assistant and the `/roof-quote` page.

**1. Routes**
- `/tools` — landing page (Header + Footer), card for the Pricing Formula,
  placeholder for SEO/AEO snapshot. Future home for additional internal tools.
- `/tools/pricing` — the calculator. Gated by middleware → redirects
  unauthenticated visits to `/admin/login?redirect=/tools/pricing`.
- `/admin/login` — Supabase Auth email/password sign-in.

**2. Storage**
- `supabase/migrations/004_pricing_config.sql` — single-row table (CHECK
  id=1), draft jsonb column, audit fields (`last_published_at`,
  `last_published_by`), RLS service-role-only. Seeded with current
  production values (22/24/$425/±10%/$30, $102/$116/$249 raw shingle costs).
- Edits go through three Server Actions (`src/app/tools/pricing/actions.ts`):
  Save Draft, Publish, Discard Draft. Auth verified server-side; writes
  go through the service-role client.

**3. Read side: `src/lib/pricing.ts`**
- `getPricing()` — async, server-only, reads `pricing_config` row 1,
  cached forever via `unstable_cache` with the `pricing` tag.
- `computeTiers(p)` — returns Good/Better/Best with installed price
  derived as `durationInstalled + (shingleCost − durationCost)`.
- `formatQuoteRange(p, installedPerSquare, steepSlope?)` and
  `computeQuoteRangeForMeasured(p, measured, installed, steep?)` — pure
  functions taking pricing as an argument (chat uses the latter for
  arbitrary roof sizes).
- Falls back to hard-coded defaults if Supabase is unreachable, so a
  transient outage never bricks the site.

**4. Cache invalidation**
- Publish action calls `updateTag("pricing")` (Next 16's read-your-own-writes
  cache invalidator). Cache busts immediately; next call to `getPricing()`
  refetches from Supabase. Chat and `/roof-quote` reflect the new numbers
  on the next request — no redeploy.
- DB hit roughly once per Publish, never on regular page renders.
  (Originally proposed a 60s revalidate window; user pushed back, correctly,
  and we landed on `revalidate: false` + explicit Publish-only invalidation.)

**5. Consumers refactored**
- `src/app/api/chat/route.ts` — pricing block in the system prompt is now
  built from `getPricing()` per request. The catalog price/install split,
  hard-coded $249/$116/$102 numbers, and 15%-waste-on-material logic are
  gone — replaced with the same Duration-baseline-plus-delta model the
  HTML tool uses. Worked example in the prompt mirrors the on-page Roof
  Quote tool exactly.
- `src/app/roof-quote/page.tsx` (server) fetches pricing and prop-drills
  it to `roof-quote-content.tsx`. The two-language `SHINGLE_TIERS` arrays
  no longer hard-code $411/$425/$558 — the priceRange/steepPriceRange
  strings are computed per-render from the prop.
- `src/lib/materials.ts` — legacy `PRICING_CONFIG`, `formatQuoteRange`,
  `computeQuoteRange`, `computeQuoteRangeForMeasured` removed (superseded
  by `pricing.ts`). Static catalog (names, warranties, descriptions,
  images) intact for the materials-comparison page.

**6. Auth**
- `@supabase/ssr` installed for App Router cookie handling.
- `src/lib/supabase-server.ts` — Server Component / Route Handler client
  (anon key, reads cookies for session) and a service-role client for
  admin actions.
- `src/middleware.ts` — gates `/tools/pricing` and any future `/tools/*`
  admin tool. `/tools` landing page is public.
- `src/app/admin/login/login-form.tsx` — client component using
  `@supabase/ssr`'s browser client + `signInWithPassword`.

### Why
RoofQuotePRO numbers move occasionally; the "tell Claude to edit
materials.ts" loop was a bottleneck. With this tool the client can
self-serve, see a live preview, and explicitly Publish when satisfied.
The chat and the on-page quote tool now share a single source of truth
they can never drift out of sync from.

### End-to-end verification
Walked the round trip on localhost:3006 with an ephemeral demo admin
(`claude-demo@agenticpersonnel.com`, deleted after the test):
1. Login → landed on `/tools` showing "Signed in as claude-demo@…"
2. Clicked Pricing Formula card → calculator rendered with seed values
3. Changed `durationInstalled` from $425 → $426 → all live previews
   updated (spread table, per-tier breakdown, formula explanation)
4. Clicked Publish → "Published — site updated" banner; Last published
   timestamp + email updated immediately
5. Verified Supabase row: `duration_installed: 426`,
   `last_published_by: claude-demo@agenticpersonnel.com` ✓
6. Hit `/roof-quote` HTTP 200; embedded RSC payload contained
   `"durationInstalled":426` — cache invalidation worked, no redeploy ✓
7. Reverted to $425 via second Publish → DB confirms `duration_installed: 425`
8. Demo user deleted from Supabase Auth.

### Pending operator setup (one-time)
- The admin Auth user has been created in the dashboard
  (`agenticpersonnel@gmail.com`); first-time sign-in works against the
  same `dxhjmyzttozjifhemifj` Supabase project (no separate dev/prod DB).
- Migration 004 was applied via the Supabase SQL Editor; row 1 is seeded.

### Files changed
- `package.json`, `package-lock.json` — added `@supabase/ssr`
- `src/lib/pricing.ts` (new, 216 lines) — getPricing + helpers
- `src/lib/supabase-server.ts` (new) — server + service-role clients
- `src/middleware.ts` (new) — auth gate for `/tools/pricing`
- `src/app/admin/login/page.tsx`, `login-form.tsx` (new)
- `src/app/tools/page.tsx` (new) — landing page
- `src/app/tools/pricing/page.tsx`, `pricing-tool-form.tsx`, `actions.ts` (new)
- `src/app/api/chat/route.ts` — uses `getPricing()`, system prompt updated
- `src/app/roof-quote/page.tsx` — async, fetches pricing
- `src/app/roof-quote/roof-quote-content.tsx` — accepts pricing prop
- `src/lib/materials.ts` — legacy pricing helpers removed
- `supabase/migrations/004_pricing_config.sql` (new)

---

## 🔄 Previous Activity (May 6, 2026 — Session 3)

**Mascot size reduction + roof quote red flags copy update**

### What shipped (commits `24a2885`, `85acb15`)

**1. Quote tab giraffe scaled down 15% (`24a2885`)**
- `QuoteGiraffeTab.tsx`: both Image elements and container div scaled 216→184px wide (height prop 288→245)
- `RoofleGiraffeOverlay.tsx`: Image scaled 160→136px wide (height prop 213→181)

**2. Red flags section — RR SC inclusions added (`85acb15`)**
- Red flag #2 (underlayment): copy now specifies two layers are standard and that every RR SC bid already includes both (synthetic full-deck + ice & water shield at eaves)
- Red flag #3 (decking): copy now states every RR SC bid includes up to three full 4×8 sheets of replacement plywood to avoid change-order surprises on install day

### Why
Client requested smaller mascot. Red flags section previously only described competitor shortfalls — adding the "we already include this" contrast turns each flag into a direct differentiator.

### Files changed
- `src/components/QuoteGiraffeTab.tsx`
- `src/components/RoofleGiraffeOverlay.tsx`
- `src/app/roof-quote/roof-quote-content.tsx`

---

## 🔄 Last Activity (May 6, 2026 — Session 2)

**Final client-approved mascot images swapped into quote tab widget**

### What shipped (commit `04ec490`)

**1. Quote tab giraffe replaced with final approved art**
- `public/images/giraffe-quote-tab-v5b.webp`: replaced prior draft with final mascot art from `RR_SC_Mascot_01.png` (42 KB, 432×576 WebP @ quality 85)
- `public/images/giraffe-quote-tab-v5b-wink.webp`: replaced prior winking draft with final variant from `RR_SC_Mascot_01a.png` (44 KB, 432×576 WebP @ quality 85)

### Why
Tom provided finalized mascot illustrations replacing the draft versions that had been in place since the v5b transparency fix. The new images are the client-approved final artwork. No component changes needed — `QuoteGiraffeTab.tsx` and `RoofleGiraffeOverlay.tsx` already reference the v5b filenames.

### Technical Details
- Both source PNGs are 1086×1448 (RGBA); output resized to 432px wide (2× the 216px display width for retina), sharp quality 85 / alphaQuality 90.
- Sizes changed: open-eyes 44888 → 42074 bytes; wink 43506 → 43928 bytes.

### Files changed
- `public/images/giraffe-quote-tab-v5b.webp`
- `public/images/giraffe-quote-tab-v5b-wink.webp`

---

## 🔄 Last Activity (May 6, 2026 — Session 1)

**Chat pricing alignment, site-wide chat widget, and giraffe transparency fix**

### What shipped (commits `f851a71`, `e3d5d17`, `a789051`, `654e417`)

**1. AI chat estimate engine aligned with calibrated pricing formula (`f851a71`)**
- `src/app/api/chat/route.ts` was carrying its own hard-coded shingle pricing (`$249` / `$116` / `$102` per sq + a separate `$100`–`$120` install tier + 15% waste) that pre-dated the May 5 RoofQuotePRO calibration. Homeowners asking the chatbot were getting estimates roughly half what the on-page Roof Quote tool displayed.
- Refactored the route to import `ESTIMATE_MATERIALS`, `PRICING_CONFIG`, and a new `computeQuoteRangeForMeasured()` helper from `src/lib/materials.ts` so the chat and the website now share a single source of truth.
- Added `computeQuoteRangeForMeasured(measuredSquares, catalogPricePerSquare, steepSlope?)` to `materials.ts` — generalizes the existing `computeQuoteRange` (which is hard-coded to the 22-sq benchmark) so the chat can quote arbitrary roof sizes via `pricingSquares = round(measured × 1.10)`.
- Rewrote the chat system prompt to explain the new formula: `measuredSquares × 1.10 → pricingSquares × catalogPricePerSquare → ±10%`, with `+$30/sq` as the only optional steep-slope add-on (install/labor is folded into the all-in catalog price). Removed the obsolete install-tier and 15%-waste-on-material-only logic.
- Worked example for the benchmark 22-square home now matches the published ranges exactly: OC Oakridge $8,878–$10,850, OC Duration $9,180–$11,220, TAMKO Storm Fighter $12,053–$14,731.

**2. Chat widget mounted site-wide via root layout (`e3d5d17`)**
- `ChatWidget` was only rendered on Home and the Roof Quote page, so navigating into `/services/[slug]`, `/areas-we-serve/[slug]`, `/materials-comparison`, `/blog`, `/contact`, `/financing`, `/portfolio`, `/reviews`, etc. silently dropped the assistant.
- Created `src/components/ChatWidgetMount.tsx` — a thin client wrapper that uses `usePathname()` to skip `/about` (and any sub-route under `/about/`).
- Mounted `<ChatWidgetMount />` once in `src/app/layout.tsx` next to the `QuoteGiraffeTab`, then removed the now-redundant per-page `<ChatWidget />` mounts (and imports) from `HomeContent.tsx` and `roof-quote-content.tsx` to prevent double-render on those two pages.
- Result: the chat widget is now present on every route except `/about`, which stays intentionally chat-free.

**3. Giraffe quote-tab transparency restored (`a789051` + `654e417`)**
- The giraffe-tab on the right edge had a visible white box behind it on every page. Root cause: `giraffe-quote-tab-v5.webp` and `giraffe-quote-tab-v5-wink.webp` had been exported as standard lossy WebP (VP8 fourcc) with **no alpha channel** — the white background was baked into RGB pixels.
- The user provided properly transparent PNG sources (`RR_SC_Mascot_01-tsp.png` and `RR_SC_Mascot_01-blink-tsp.png`, color type 6 RGBA). Re-encoded both via `sharp` to alpha-preserving WebP at 433×577 (2× the 216×288 display size for retina), quality 88, alphaQuality 100, effort 6 — both ~43 KB and verified at the byte level (VP8X fourcc with the alpha bit set).
- After replacing the files, every optimizer width returned correct transparent output **except `w=256`** — the exact size the browser was requesting. The Next.js dev image optimizer had cached an in-memory variant of the broken pre-swap file for that one width and was serving the stale non-alpha output. Disk file, optimizer logic, and the component were all correct; the optimizer's own RAM cache was poisoned.
- Cache-busted by renaming source files: `giraffe-quote-tab-v5.webp` → `giraffe-quote-tab-v5b.webp` (and the wink variant). New URL = new optimizer cache key = fresh optimization from the transparent source for every width. Updated `QuoteGiraffeTab.tsx` to point at the new filenames; also synced the (currently unused) `RoofleGiraffeOverlay.tsx` reference to keep the codebase consistent.
- Verified live via Chrome DevTools: every width (`128`, `256`, `384`, `640`) now returns VP8X with `alpha=true`, and the rendered giraffe sits on the photo with no white box.

### Why
The May 5 pricing calibration only updated the on-page Roof Quote tool — the chat had its own copy of the pricing constants from before and was silently quoting old, lower numbers. The chat widget being missing on most routes was a long-standing oversight that only surfaced once Tom started "surfing the website." The giraffe white-box bug had been live since v5 was first introduced; the original v5 export simply never had alpha.

### Technical Details
- **Pricing single source of truth:** `src/lib/materials.ts` is now the only place the chat and the page agree to look. `PRICING_CONFIG` + `computeQuoteRangeForMeasured()` is what both consume; the system prompt is built fresh from those constants on each cold start so future calibration changes auto-propagate to the assistant without code edits to the route.
- **Cache-control on `ChatWidgetMount`:** stays under the existing `cache_control: { type: "ephemeral" }` system-prompt cache because the prompt body is deterministic at module load.
- **Why not just clear the Next.js image cache:** dev-mode optimizer cache is in-memory (no `.next/cache/images/` directory exists). Restarting the dev server would have cleared it, but the user has multiple projects running; renaming the files achieved the same result without touching the running process.
- **Verification flow:** disk byte check (VP8X + alpha bit) → curl with browser `Accept` header against `/_next/image?...` for every width → DevTools `evaluate_script` to read the rendered `<img>` `currentSrc` and computed background colors → screenshot.
- `npx tsc --noEmit` passes clean across all three commits.

### Files changed
- `src/app/api/chat/route.ts` — replaced hard-coded pricing with imports from materials.ts; rewrote system prompt to match the new formula (+96/−110)
- `src/lib/materials.ts` — added `computeQuoteRangeForMeasured()` helper (+18/−0)
- `src/app/layout.tsx` — mounted `ChatWidgetMount` (+2/−0)
- `src/components/ChatWidgetMount.tsx` — new client-component wrapper with pathname gating (14 lines)
- `src/app/HomeContent.tsx` — removed redundant per-page mount (−3)
- `src/app/roof-quote/roof-quote-content.tsx` — removed redundant per-page mount (−3)
- `public/images/giraffe-quote-tab-v5b.webp` — renamed from v5; transparent (43.8 KB, VP8X alpha)
- `public/images/giraffe-quote-tab-v5b-wink.webp` — renamed from v5-wink; transparent (42.5 KB, VP8X alpha)
- `src/components/QuoteGiraffeTab.tsx` — updated image references to v5b
- `src/components/RoofleGiraffeOverlay.tsx` — synced unused-component reference to v5b

### Deployment
All four commits pushed to `origin` (Vercel auto-deploys) and `client` (`SCROOF1/restorationroofing`). Final HEAD: `654e417`.

---

## 🔄 Previous Activity (May 5, 2026 — Session 2)

**Giraffe mascot blink animation + artifact-free image swap**

### What shipped (commits `3cdabe0`, this session)

**1. Artifact-free mascot image (`3cdabe0`)**
- `src/components/QuoteGiraffeTab.tsx`: switched from `giraffe-quote-tab-v5.webp` (had render artifacts) to `giraffe-quote-tab-v4.webp`.
- `RoofleGiraffeOverlay.tsx` was already on v4 — no change needed there.

**2. Winking blink animation**
- `src/components/QuoteGiraffeTab.tsx`: added a `winking` state + `useEffect` interval. Two images are stacked (base + winking frame); the winking frame's opacity transitions from 0→1 over 40ms then back. First blink fires 3s after mount, then every 8s. Wink holds for 180ms.
- `public/images/giraffe-quote-tab-v4-orange-hat.png`: winking variant of the mascot, loaded with `priority` so it's preloaded before the first blink fires.

### Why
The v5 image had visible compression artifacts. The wink adds personality and subtle motion to an otherwise static UI element — makes the mascot feel alive without being distracting.

### Technical Details
- Overlay approach (two stacked images + CSS opacity) avoids any src-swap flash on first blink.
- `priority` prop on the winking image ensures it's in the browser cache before the 3s initial timer fires.
- `npx tsc --noEmit` passes clean.

### Files changed
- `src/components/QuoteGiraffeTab.tsx` — image swap + blink animation
- `public/images/giraffe-quote-tab-v4-orange-hat.png` — winking mascot asset

---

## 🔄 Last Activity (May 5, 2026 — Session 1)

**Shingle pricing formula calibrated from RoofQuotePRO config (22-square benchmark)**

### What shipped (commits `74a97a2`, `118c561`)

**1. Service card images (`74a97a2`)**
- Replaced storm damage and gutter installation card images in services section.

**2. Pricing formula overhaul (`118c561`)**
- `src/lib/materials.ts`: added `PRICING_CONFIG` constant (the single source of truth for all quote math):
  - `measuredSquares: 22` (21.66 from 605 Julep Dr. benchmark, rounded up)
  - `wasteFactor: 0.10` → 22 × 1.10 = 24.2 pricing squares, aligned to the manager's 24-square proposal
  - `pricingSquares: 24`
  - `steepSlopeChargePerSquare: 30` (manager-approved add-on)
  - `rangePercent: 0.10` (±10% over/under band, down from prior 15%)
- Added `catalogPricePerSquare` field to `RoofingMaterial` interface (dollars per roofing square = 100 sq ft).
- Updated catalog prices for all three estimate-tier shingles:
  - OC Oakridge: `$411/sq` installed (`$4.11/sq ft`)
  - OC Duration: `$425/sq` installed (`$4.25/sq ft`)
  - TAMKO Storm Fighter: `$558/sq` installed (`$5.58/sq ft`)
- Added `computeQuoteRange(catalogPricePerSquare, steepSlope?)` and `formatQuoteRange()` helpers. Formula: `pricingSquares × (catalogPricePerSquare [+ $30 steep]) × ±10%`.
- Fixed `formatPriceRange()` to display a single value when min === max.
- `src/app/roof-quote/roof-quote-content.tsx`: all six `priceRange` strings (EN + ES) now call `formatQuoteRange()` — no magic numbers. Resulting display ranges:
  - Oakridge regular: `$8,878 – $10,850` / steep: `$9,526 – $11,642`
  - Duration regular: `$9,180 – $11,220` / steep: `$9,828 – $12,012`
  - TAMKO regular: `$12,053 – $14,731` / steep: `$12,701 – $15,523`
- Added `steepPriceRange` property to each tier object (data in place; UI toggle not yet wired).
- Updated `priceNote` to `"typical home (22 squares / ~2,200 sq ft roof)"`.

### Why
RoofQuotePRO configuration doc provided exact catalog prices per roofing square and confirmed the correct waste factor (10%, not 20% — the prior version used 20 measured squares making the jump to 24 look like 20% waste; corrected working input is 22 squares). Prices were also significantly underpriced in the old data ($2.02–3.69/sq ft vs correct $4.11–5.58/sq ft).

### Technical Details
- **Unit distinction:** `installedCostMin/Max` (per sq ft, used by materials comparison table display) vs `catalogPricePerSquare` (per roofing square = 100 sq ft, used exclusively by quote formula). No factor-of-100 error — formula uses the full per-square values (411, 425, 558) directly.
- `npx tsc --noEmit` passes clean.

### Files changed
- `src/lib/materials.ts` — PRICING_CONFIG + helpers + updated shingle prices (+34/−4)
- `src/app/roof-quote/roof-quote-content.tsx` — formula-driven price ranges + steepPriceRange (+22/−14)

---

## 🔄 Last Activity (May 3, 2026 — Session 1)

**Chat backend migrated to Anthropic Claude Sonnet 4.6 + scroll-gated mascot fade**

### What shipped (commits `a16fe5e`, `737295c`)

**1. ChatWidget scroll-gated fade-in (`a16fe5e`)**
- `src/components/ChatWidget.tsx`: outer wrapper is now a `motion.div`
  with opacity controlled by a scroll listener. Below 50% of viewport
  height the widget renders at `opacity: 0` + `pointerEvents: none`;
  above the threshold it fades in (0.35s `easeOut`).
- Sticky-when-open guard: `widgetVisible = scrolledPastHero || chatOpen`
  so the chat panel doesn't disappear if the user scrolls back up after
  opening it.
- Position kept at bottom-left (`clamp(1rem, 8vw, 10rem)` from left,
  `bottom-6`) — tested center earlier in the session, felt intrusive.

**2. Anthropic chat migration (`737295c`)**
- `src/app/api/chat/route.ts`: replaced the OpenAI `gpt-4o-mini` call
  with the official `@anthropic-ai/sdk` (`claude-sonnet-4-6`,
  `max_tokens: 600`).
- System prompt split into a stable block (estimate pricing + persona)
  and a volatile block (per-request RAG context). Stable block carries
  `cache_control: { type: 'ephemeral' }` for 5-minute prompt caching —
  ~90% cheaper on cache reads, breaks even at two requests.
- Embedding + RAG lookup wrapped in a single try/catch — a dead
  `OPENAI_API_KEY` no longer 500s the route, chat just answers without
  knowledge-base grounding.
- `@anthropic-ai/sdk@^0.92` added to dependencies.
- `ANTHROPIC_API_KEY` added to Vercel env (Production / Preview /
  Development) before deploy so the new build doesn't crash.

### Why

**Mascot fade:** the giraffe was sitting on top of the hero CTA buttons
on Tom's screen, blocking the primary call-to-action. Moving it to
center didn't help — also intrusive. Fading it in only after the user
scrolls past the hero gives them a clean view of the CTAs while keeping
the chat available the moment they engage with the page.

**Anthropic migration:** intent was always Sonnet 4.6, but git history
showed the chat route was hardcoded to OpenAI `gpt-4o-mini` since the
original Apr 7 Next.js migration (`858f9ff`) — never on Anthropic in
this repo. Chat reportedly stopped responding; most likely cause was
the OpenAI key (revoked, quota, or expired). Migrating fixes the
breakage and gets onto the originally-intended provider.

### Technical Details
- **Why OpenAI stays on the embedding path:** Anthropic doesn't ship
  embeddings, and the Supabase KB is indexed against
  `text-embedding-ada-002` (1536-dim). Switching embedding providers
  would require a full re-index — separate project.
- **Roofle z-index safety:** Roofle slideout overlay = `z-index: 9998`,
  ChatWidget = `z-50`. When the Roofle estimator opens (covers right
  ~2/3 of viewport), it draws above the chat widget. Clicks on the
  Roofle panel cannot fall through to the giraffe.
- **Prompt caching:** stable system block is large enough to clear
  Sonnet 4.6's 2048-token minimum. Cache writes cost 1.25× input price,
  reads ~0.1×.
- `npx tsc --noEmit` passes clean.

### Files changed
- `src/components/ChatWidget.tsx` — scroll listener + framer-motion
  opacity gate (+24/−4)
- `src/app/api/chat/route.ts` — Anthropic SDK call + system-prompt
  split + best-effort embeddings
- `package.json`, `package-lock.json` — `@anthropic-ai/sdk@^0.92`

---

## 🔄 Last Activity (May 1, 2026 — Session 17)

**About hero shortened ~20% to pull Our Team above the fold**

### What shipped (commit `f09ea7b`)
- Revived the dormant `compact` prop on `PageHero` (`src/components/shared.tsx`). When set, hero `min-h` shrinks from `45svh / 50svh` to `36svh / 40svh` — roughly a 20% reduction.
- Passed `compact` on the About-page `PageHero` (`src/app/about/AboutContent.tsx`). All other pages still render the full-size hero.

### Why
With the new section ordering (Our Team directly under the hero, per Session 15), Tom wanted the team section to land in the above-the-fold zone on first paint. Shrinking the About hero by ~20% pulls the team cards visibly into view without scrolling.

### Technical Details
- The `compact` prop was already in `PageHero`'s type signature with a "kept for backward compat, no longer used" comment. Reused it instead of inventing a new flag and rewrote the doc-comment to describe the new behavior.
- Inner padding (`py-12 md:py-16 lg:py-20`) and the `flex flex-col justify-end` content layout are untouched, so the title/subtitle still sit at the bottom of the shorter hero with the same breathing room.

---

## 🔄 Last Activity (May 1, 2026 — Session 16)

**About page visual polish — sheen on cards, dark Values panel, editorial accents**

### What shipped (commit `2e6e628`)
- **New utilities in `globals.css`:**
  - `.card-sheen` — amber-iridescent overlay with a radial highlight that follows the cursor (via `--mx`/`--my` CSS variables) plus a diagonal sweep on hover. `screen` blend-mode keeps it bronze, not neon.
  - `.bg-team-bloom` — warm-white field with a soft amber sunrise + sage corner glow.
  - `.bg-blueprint-grid` — flat medium-gray (`#4a4a4a`) panel for the Values section.
  - `.editorial-dropcap` — Playfair amber initial via `::first-letter`.
  - `.ridge-rule` — decorative amber-fade horizontal rule (kept for future use).
- **Team section** (`bg-team-bloom`): each card got the sheen, a framer `whileHover` lift (-6px), an italic Playfair `Nº 01–04` stamp in the top-left of the photo, and an editorial caption strip at the bottom of the photo (amber rule + tracked-out value tag over a navy gradient). The amber underline beneath each name now grows from `w-8` to `w-20` on hover.
- **Values section** (`bg-blueprint-grid`): dark medium-gray panel, `light` SectionHeader (white title, `white/70` subtitle). All six elements in the row — both family flank photos plus the four value cards — share a 1px black border so the row reads as a unified set. Cards have the sheen + an amber halo ring around the icon that scales 1.1× and grows a 6px outer amber glow on hover.
- **Our Story:** editorial Playfair amber dropcap on the opening paragraph + an amber drafting frame in the upper-left of the photo and a soft navy counter-frame in the lower-right (architectural drafting feel).
- Inline `trackSheen` helper in `AboutContent.tsx` updates `--mx`/`--my` on `onMouseMove` so the sheen radial follows the cursor on Team cards, Values cards, and both family-flank photos.

### Why
Cards on the About page felt flat — generic white-on-white with only a faint shadow on hover. User asked for a "holographic" feel and more design density without changing layout. Settled on an amber-iridescent sheen (in-brand bronze, not rainbow chrome) and a darker Values panel so the white cards pop. Iterated on the Values background a few times — initial blueprint-grid pattern muddied the white cards, so the final treatment is a flat `#4a4a4a`. Section order and copy unchanged; this is purely a surface-quality pass.

### Technical Details
- All hover transforms run through framer-motion `whileHover` so CSS pseudo-elements never fight the JS-driven entry transforms (avoids the transform-jitter footgun).
- Decorative pseudo-elements use `pointer-events: none`; decorative DOM elements are `aria-hidden="true"`.
- Existing `prefers-reduced-motion` reset in `globals.css` (lines 30-43) auto-disables the sheen transitions for users who request it.

### Files changed
- `src/app/globals.css` — five new utility classes (+88 lines)
- `src/app/about/AboutContent.tsx` — Team / Values / Story upgrades + `trackSheen` helper

---

## 🔄 Last Activity (May 1, 2026 — Session 15)

**About page reorder + Our Story header refresh**

### What shipped (commit `6b38e48`)
- Reordered the About page so visitors meet the people first. New flow: `PageHero → Our Team → Our Values → Our Story → StatsBar → Insurance → Bilingual → Timeline → CTA`. Previous flow led with Story, then StatsBar, then Team, then Values.
- Replaced Our Story's small inline `<span>` eyebrow + bare `<h2>` with the shared `SectionHeader` component (animated eyebrow, large display title, amber + ridge-logo divider) — same treatment Our Team and Our Values already use, so the page now has a consistent header rhythm.
- Story body unchanged: 2-column grid with EN/ES paragraphs on the left and the Charleston neighborhood photo + "500+ projects completed" navy badge on the right.

### Why
Tom asked to put the team up top right under the hero, then values, then the story — and called out that Our Story's title was undersized vs. the rest of the page. Hoisting the SectionHeader above the existing 2-col grid fixed both without touching copy.

### Files changed
- `src/app/about/AboutContent.tsx` (single-file refactor: 60 insertions / 61 deletions, no copy or string changes)

---

## 🔄 Last Activity (May 1, 2026 — Session 14)

**License number + descriptor refresh, GeoCoordinates fix, logo WebP set committed**

### What shipped
- **License number** (commit `e3dd36a`): `RBC 694` → `RBS 67027` site-wide (15 occurrences across 6 files)
  - `src/lib/data.ts` — `COMPANY.license` (single source — feeds Header + Footer body via `{COMPANY.license}` and `{tr.license}`), FAQ storm-chaser answer, emergency-roof blog post body, TRUST_BADGES "Licensed & Insured" description
  - `src/components/Footer.tsx` — bottom-bar copyright (was hardcoded)
  - `src/app/roof-quote/roof-quote-content.tsx` — hero trust badges + promise-footer trust copy (EN + ES, 4 spots)
  - `src/app/api/blog/generate/route.ts` — blog generation AI prompt
  - `lib/knowledgebase/restoration-roofing-content.md` — chatbot knowledge base (4 spots: licensing intro, Licensing & Insurance section, FAQ answer, footer block)
  - `scripts/seed-blog-posts.ts` — emergency-services blog seed
- **License descriptor** (commit `ff25086`): `Residential Builders License` → `Residential Specialty Contractor License` (3 occurrences in chatbot knowledge base) — matches SC LLR's actual category for an RBS license (vs. RBC = Residential Builder Contractor)
- **GeoCoordinates** (commit `d97ec25`): `32.8468, -79.8203` → `32.8009, -79.9048` to match the new Port City Landing office. Updated in homepage RoofingContractor schema, all 21 location-page schemas, site-wide `geo.position` + `ICBM` meta tags in `src/app/layout.tsx`, and the three SEO strategy docs. Completes the NAP refresh started in `eaae6a6` — no stale coords remain.
- **Logo WebP set + conversion script** (commit `b1d36ca`): committed 12 responsive WebP variants (`v1`, `v2`, `v2-white` × 400/800/1500/full) plus `scripts/convert-logos.mjs` (sharp-based generator). `.gitignore` extended to exclude source PNGs (`RestorationRoofing_Logo_*.png`, `JerryLogo.png`, `MattFamily.png`) per the existing convention.
  - **Note:** the new logo WebPs are NOT yet referenced anywhere in `src/` — staged in repo for upcoming logo placement work. Currently-active site logo is still `rr-sc-ridge-logo-v3.webp`.

### Why
Tom delivered the official SC license number (`RBS 67027`), the new office GPS coords, and the logo source PNGs in this session. NAP/Map Pack consistency requires every schema, footer, FAQ, and chatbot context to match — leaving any stale references would split the local-SEO signal. Descriptor was a follow-up after confirming with the client that RBS = Residential Specialty Contractor (not the prior "Residential Builders License" copy carried over from RBC days).

### Files changed
- License #: `src/lib/data.ts`, `src/components/Footer.tsx`, `src/app/roof-quote/roof-quote-content.tsx`, `src/app/api/blog/generate/route.ts`, `lib/knowledgebase/restoration-roofing-content.md`, `scripts/seed-blog-posts.ts`
- License descriptor: `lib/knowledgebase/restoration-roofing-content.md`
- GeoCoordinates: `src/app/page.tsx`, `src/app/areas-we-serve/[slug]/page.tsx`, `src/app/layout.tsx`, plus 3 SEO strategy docs
- Assets: `public/images/restoration-roofing-logo-v{1,2,2-white}{,-400,-800,-1500}.webp` (12 files), `scripts/convert-logos.mjs`, `.gitignore`

---

## 🔄 Last Activity (May 1, 2026 — Session 13)

**Site-wide business info refresh: new office address + Google rating bump**

### What shipped (commit eaae6a6)
- **Address change:** `1261 Pearwood Ct` → `75 Port City Landing, Suite 110, Mount Pleasant, SC 29464`
  - `COMPANY.address` in `src/lib/data.ts` (single source of truth — propagates to Footer + Contact display)
  - `streetAddress` in all 5 RoofingContractor JSON-LD schemas: `src/app/page.tsx`, `contact/ContactContent.tsx`, `services/[slug]/page.tsx`, `areas-we-serve/[slug]/page.tsx`, `roof-quote/page.tsx`
  - Hardcoded blocks on `privacy/page.tsx` and `terms/page.tsx`
  - Chatbot knowledge base (`lib/knowledgebase/restoration-roofing-content.md`) — 5 instances (about, contact, Mount Pleasant section, FAQ, footer)
  - Strategic / SEO reference docs — AEO-GEO-AIO Strategy, Tech Stack Optimization, Strategic Recommendations
- **Google rating bump:** `4.9★ / 47 reviews` → `5★ / 186 reviews`
  - `COMPANY.googleRating`, `COMPANY.googleReviewCount`, and `STATS` Google rating value in `src/lib/data.ts`
  - `/reviews` page metadata title + description + OG ("4.9-Star" → "5-Star", "100+" → "186+")
  - Hero rating pill in `HomeContent.tsx` now renders 5 stroked-and-filled amber stars with yellow-200 stroke and a 2px amber drop-shadow glow (replaces the prior single-star icon)

### Why
NAP (Name/Address/Phone) consistency is a primary local-SEO ranking factor — every schema, footer, and contact surface has to match. Tom relayed the new address (Port City Landing) and the updated Google rating numbers; both needed to ship in lockstep so structured-data validators and AI tools see one consistent story. The 5-star visual treatment in the hero reinforces the rating at a glance rather than burying it as a prefix number.

### Files changed
- `src/lib/data.ts` — COMPANY address + rating, STATS rating
- `src/app/page.tsx`, `contact/ContactContent.tsx`, `services/[slug]/page.tsx`, `areas-we-serve/[slug]/page.tsx`, `roof-quote/page.tsx` — JSON-LD streetAddress
- `src/app/privacy/page.tsx`, `terms/page.tsx` — visible address block
- `src/app/reviews/page.tsx` — rating-related metadata
- `src/app/HomeContent.tsx` — hero star row (1 star → 5 stars with halo)
- `lib/knowledgebase/restoration-roofing-content.md` — 5 address mentions
- `docs/AEO-GEO-AIO-STRATEGY-restoration-roofing-SC.md`, `RR-SC-Website-Tech Stack Optimization.md`, `Strategic_Recommendations_Restoration_Roofing_SC (1).md` — address callouts

---

## 🔄 Last Activity (May 1, 2026 — Session 12)

**About page: Our Team section + family photo flanks for Our Values**

### What shipped (commit f3e29c8)
- New "Our Team" section on `/about`, placed between StatsBar and Our Values
  - 4-up responsive card grid (1 col mobile / 2 col tablet / 4 col desktop) for Josh McElroy (Project Manager), Matt Vannort (Roofing Specialist), Chase Garrett (Project Specialist, Coast Guard veteran), and Devin "D" Ringle (Project Specialist)
  - Cards reuse the existing Values-card visual language (white bg, rounded, amber hover border, card-halo) and add `aspect-[4/5]` portrait headshots with `object-cover object-top` so all four faces frame consistently regardless of source crop
  - Each card has a navy/amber value-tag pill (Craftsmanship / Family / Integrity / Community) tying the team member to the Values pillar they embody
  - Bilingual EN/ES copy added to `ABOUT_ES` for role, value tag, bio, and the section header
- Restructured "Our Values" section into a 4-column flank layout
  - Left col: Chase family photo (310×467 webp)
  - Center 2 cols: existing 4 value cards in a 2×2 sub-grid (styling untouched — what the user said to preserve)
  - Right col: Matt family photo, cropped from 941×1672 to 941×1418 so its aspect (0.6636) matches Chase's (0.6638) and both photos render at identical sizes side-by-side
  - Mobile: cards first as `col-span-2`, then both photos side-by-side below
- Section reorder on `/about`: Story → StatsBar → **Team → Values** → Insurance → Bilingual → Timeline → CTA (Team now precedes Values per client request)
- Image optimization
  - `MattFamily.png` 2.86 MB → `team-matt-family-v2.webp` 365 KB (88% reduction) at 941×1418
  - `Screenshot 2026-05-01 132029.png` 298 KB → `team-family.webp` 37 KB (87% reduction) at native 310×467
- Source bios extracted from `Head Shots- Bio's.docx` and rewritten in tighter card-length form (~2 sentences each, EN + ES)

### Files changed
- `src/app/about/AboutContent.tsx` — Team section JSX, Values-section flank restructure, team data + ES translations, localizedTeam mapping
- `public/images/team/josh-mcelroy.jpeg`, `matt-vannort.jpeg`, `chase-garrett.png`, `devin-ringle.jpeg` — team headshots (extracted from source docx, plus a re-shot tan-bg replacement for Chase)
- `public/images/team/team-family.webp`, `team-matt-family-v2.webp` — optimized family photos for the Values flank

### Notes
- Both flank images use explicit `width`/`height` attrs + `w-full h-auto` instead of `aspect-[…]` classes — Tailwind v4's JIT was inconsistently generating the arbitrary aspect-ratio utility for new values mid-session, leaving containers with zero height
- The Matt webp filename is intentionally `-v2` to bust browser/Next image-optimizer cache after the re-crop; can be renamed back during a future cleanup

---

## 🔄 Last Activity (April 30, 2026 — Session 11)

**AI Chat Wizard: shingle pricing refresh, tier reassignment, and 15% waste factor**

### What shipped (part 1 — pricing & tier reassignment, commit 57c77b0)
- Updated the instant-estimate engine in the AI Chat Wizard with current ABC supplier pricing
- Swapped the Good/Better/Best tier order to match the actual price hierarchy:
  - **Best:** TAMKO Storm Fighter (Hail Guard) — **$249/sq material** (was Good)
  - **Better:** Owens Corning TruDefinition Duration — **$116/sq material** (was Best)
  - **Good:** Owens Corning Oakridge — **$102/sq material** (was Better)
- Rewrote tier-explanation guideline so the AI presents Storm Fighter as the premium storm-rated option, not a budget pick
- Populated previously-zero `materialCost` and `installedCost` fields in the marketing site's materials data so the materials-comparison page and chat now quote consistent numbers
- Updated the lead-in description phrases for each shingle to reflect their new tier positioning

### What shipped (part 2 — 15% material waste factor)
- Added a `WASTE_FACTOR` constant (0.15) to the estimate engine
- Estimates now show a four-line breakdown for every tier: **Material / Install / Waste / Total**
- Waste is applied to material only, NEVER to install labor (industry-standard practice — labor is bid for actual roof area, not over-ordered material)
- Replaced the worked example with a 2,000 sqft / Custom-complexity walkthrough:
  - Best (Storm Fighter): Material $4,980 + Install $2,200 + Waste $747 = **$7,927**
  - Better (OC Duration): Material $2,320 + Install $2,200 + Waste $348 = **$4,868**
  - Good (OC Oakridge): Material $2,040 + Install $2,200 + Waste $306 = **$4,546**
- Updated the AI's instructions: when a homeowner doesn't know or doesn't mention roof complexity, default to **Custom** ($110/sq labor) and tell them you've assumed Custom so they can correct if needed
- Added explicit guideline that the AI must always show the four-line breakdown — never just the total

### Install labor tiers (unchanged — kept the descriptive complexity names)
- Basic: $100/sq — simple layout, walkable pitch
- Custom: $110/sq — moderate complexity (the default if homeowner doesn't specify)
- Complex: $120/sq — steep pitch, many gables/valleys/dormers

### Files changed
- `src/app/api/chat/route.ts` — `MATERIAL_PRICING` swapped/repriced; `WASTE_FACTOR` added; estimate flow + worked example rewritten with four-line breakdown; default-to-Custom guidance hardened
- `src/lib/materials.ts` — `estimateTier` swapped on three asphalt shingles; per-sq-ft pricing populated; descriptions updated

---

## 🔄 Last Activity (April 28, 2026 — Session 10)

**Sitewide: all 'Get Free Estimate' CTAs wired to Roofle instant quote widget**

### What shipped
- All CTA buttons/links labelled "Get Your Free Estimate", "Request Free Estimate", "Free Estimate in {city}", "Schedule Free Estimate", "Get Your Instant Estimate", "Schedule a free inspection", and "request an estimate online" now trigger the Roofle RoofQuote PRO slideout widget instead of navigating to /contact
- New `FreeEstimateButton` client component exported from `shared.tsx` — lets server component pages (blog, services) use the Roofle hook without becoming client components themselves
- `CTABanner` (used on About, Portfolio, Reviews, Financing, Location, and other pages) now fires Roofle widget from its primary CTA

### Files changed (commit 597e4ce)
- `src/components/shared.tsx` — new FreeEstimateButton export; CTABanner CTA → widget
- `src/app/HomeContent.tsx` — hero primary CTA → widget
- `src/app/blog/[slug]/page.tsx` — sidebar estimate CTA → widget
- `src/app/services/[slug]/page.tsx` — sidebar estimate CTA → widget
- `src/app/services/[slug]/service-detail-content.tsx` — inline inspection link → widget
- `src/app/areas-we-serve/[slug]/location-detail-content.tsx` — city estimate CTA → widget
- `src/app/materials-comparison/materials-compare-content.tsx` — 4 CTAs → widget

---

## 🔄 Last Activity (April 24, 2026 — Session 9)

**Roof quote page: branded infographics, hero gradient, Roofle CTA wiring**

### What shipped

**3 branded infographics added:**
- `why-quotes-vary-infographic.png` → replaces Unsplash stock house photo in "Why Getting a Roof Quote Feels Stressful" section; paired with Emy Phillips' authentic 5-star review
- `what-real-quote-includes-infographic.webp` (1448×1086, 170KB) → added below compact "Our Quote Includes All 13" card in the real-quote section; card padding reduced (p-8→p-5) to make room
- `what-drives-roof-cost-infographic.webp` (1448×1086, 181KB) → replaces 8-card cost drivers grid under "What Really Affects the Cost of a Roof in South Carolina"; title/description/footer note preserved

**Hero header gradient:**
- Overlay strengthened from `from-black/20 via-black/5 to-transparent` → `from-black/80 via-black/20 to-transparent`
- Left side now 80% opaque (image barely visible), fades to 20% at midpoint, fully transparent on right

**Roofle CTA buttons wired correctly (6 buttons):**
- Removed standalone `openRoofleWidget` function duplicated inside `roof-quote-content.tsx`
- `QuoteButton` now uses `useQuoteWidget()` hook from `QuoteWidgetContext` — same path as the giraffe tab
- `QuoteWidgetContext` trigger hardened: tries `window.RoofQuotePro.open()` / `rfqPro.open()` / `roofle.open()` before falling back to DOM selectors

**String fixes:**
- Smart/curly quotes introduced by edit tool converted to straight quotes + template literals throughout `roof-quote-content.tsx`
- Authentic testimonial: Emy Phillips' real Google review replaces placeholder text

### Commits
- (this session)

---

## 🔄 Previous Activity (April 24, 2026 — Session 8)

**Bilingual Spanish toggle + roof quote page overhaul**

### Motivation
Spanish-speaking homeowners in Charleston need to read the site in Spanish. Roof quote page hero was too dark, missing ChatWidget, and had heavy navy backgrounds throughout that needed lightening.

### What shipped

**i18n system (site-wide):**
- New `src/contexts/LanguageContext.tsx` — React context with `lang`/`toggleLang`, persists to `localStorage`, sets `document.documentElement.lang`
- New `src/lib/translations.ts` — global EN/ES strings for Header, nav, GetStartedDropdown (all form + consent copy), Footer
- Header: plain amber "¿Habla Español?" / "Speak English?" toggle (no icon, no border)
- Footer, GetStartedDropdown, Header top bar all fully bilingual

**Page translations (5 pages):**
- Homepage (`HomeContent.tsx` extracted as client component, `HOME_EN`/`HOME_ES` with 28 keys)
- Roof Quote page (`RQ_ES` ~120 keys, shingle tiers, cost drivers, process steps bilingual)
- About Us (`ABOUT_ES`, 30 switch points, bilingual arrays for values/milestones/insurance)
- Financing (`FIN_ES`, 42 swaps, full calculator bilingual)
- Areas We Serve + location detail pages (committed separately in prior session)

**Roof quote page improvements:**
- Hero image brightness: overlay reduced from black/60 → black/20; image opacity 80→100
- Google rating corrected to 5.0★
- All `bg-navy` sections replaced with bg-white/bg-linen/bg-amber/10
- `<ChatWidget />` added
- Roofle tool preview: WebP screenshot (1052×846, 64KB) with satellite measurement cards (Main roof 3,240 sq ft / Second roof 260 sq ft)

**Docs cleanup:** HTML proposals moved from `public/` → `docs/` (not web-served)

### Commits
- `a34535b` — feat(i18n): bilingual Spanish toggle + roof quote page overhaul (14 files, +2159/-950)
- `59e5ee9` — feat(i18n): add Spanish translations to Areas We Serve pages

---

## 🔄 Previous Activity (April 24, 2026 — Session 7)

**Client progress update document — Phase 1.5 website update report**

### Motivation
Tom needed a shareable progress update covering all recent work, the SEO already in place, and the AEO/GEO/AIO strategy pending his green light. Required both an editable MD version and a branded PDF for client delivery.

### Documents produced

**`docs/client-progress-update-2026-04-23.md`** — Full markdown source, structured as:
- Recent session summaries (Sessions 1–6: mascot, CTA, SMS, Zuper, roof quote, mobile overhaul, Next.js rationale)
- SEO already in place (16-item table)
- AEO/GEO/AIO strategy explanation in plain English
- What needs a green light (13 items across AEO, GEO, AIO sections)
- Recommended sequence split into 3 tiers: Do First / Schedule Within 30 Days / Can Wait
- Current blockers table

**`docs/client-progress-update-2026-04-23.pdf`** — 8-page branded PDF generated via reportlab:
- Orange header banner (matching section headers — client preferred over black)
- Orange H2 section banners, dark table headers with orange accent lines
- `CondPageBreak` before each H2/H3 so orange headers never orphan at page bottom
- `KeepTogether` groups headings with first paragraph
- Black footer with orange accent line, page numbers, company name on every page

### Key editorial decisions
- No mention of old Vite SPA (internal context, not relevant to client)
- No "migration" framing — reframed as "Why We Built on Next.js"
- Mobile-first overhaul expanded to 7 itemized callouts with "what + why" for each, justifying the 3-hour build charge
- Process page time estimate corrected from "half-day" to "2 hours"
- Recommended sequence tiered so client can see urgency without feeling overwhelmed
- Roof quote page verbiage review added to blockers (Tom's sign-off needed)
- Product photos removed from blockers (not relevant to share); headshots note softened to "we know you're working on this"

### Commits
- **`docs/client-progress-update-2026-04-23.md`** — new
- **`docs/client-progress-update-2026-04-23.pdf`** — new
- **`docs/operations/status/project-status.md`** — updated

---

## 🔄 Previous Activity (April 23, 2026 — Session 6)

**Chat widget phone + schedule button upgrades — SMS opt-in panel, device-aware copy, Zuper placeholder**

### Motivation
The giraffe mascot's phone button was a bare `sms:` link with zero consent capture. The CTA header dropdown already had a proper opt-in panel (from Session 4); this session brought the chat widget up to the same standard. The schedule button was pointing at `/contact` as a placeholder — replaced with an explicit "Connecting to Zuper" popup so users understand the integration is in progress.

### SMS opt-in panel (`src/components/ChatWidget.tsx`)

The phone/text button now toggles a dark card (same visual language as the CTA dropdown's `TextUsRowDesktop`):
- **Consent checkbox** — red italic legal copy until checked, turns gray on check. Same verbiage as the CTA: "By checking this box, I consent to receive non-marketing text messages…"
- **Persistence** — uses the shared localStorage key `rr-sms-opted-in`; if a visitor already opted in from the header CTA, the box arrives pre-checked (and vice versa)
- **Action gated behind opt-in** — button is visually disabled (`bg-amber/25`, cursor-not-allowed) until checkbox is checked
- **Device-aware action:**
  - **Mobile (iOS/Android)** — "Open in Messages" — native `sms:+1{phoneRaw}?body=Hi Restoration Roofing…` link; user hits send
  - **Desktop (Windows/Mac)** — "Copy (843) 306-2939" — `navigator.clipboard.writeText` with "Copied!" toast for 2 s; matches the CTA dropdown's desktop behavior exactly
  - Device detected once on mount via `navigator.userAgent`; no re-render flash
- **Active state** — phone button turns amber while panel is open; closes automatically when the widget collapses

### Zuper scheduling placeholder (`src/components/ChatWidget.tsx`)

The calendar/schedule button no longer links to `/contact`:
- Clicking it opens a dark card reading **"Connecting to Zuper"** with a brief "scheduling integration coming soon — text or call us to book" note
- Tap-to-call fallback: `tel:+1{phoneRaw}` amber button so users have a real action
- Same active-state treatment (button turns amber), mutually exclusive with the SMS panel (opening one closes the other)
- Swap-ready: when Zuper is wired, replace this panel with the real scheduler link/embed

### Commits (all pushed to `origin` and `client`)
- **`16edad3`** — feat: add SMS opt-in panel to chat widget phone button
- **`54490b2`** — feat: device-aware SMS action in chat widget opt-in panel
- **`067bdbb`** — feat: Zuper placeholder popup on chat widget schedule button

### Verification
- `npx tsc --noEmit` — clean (all three iterations)

### Follow-ups
- Wire the Zuper real scheduler URL into the placeholder panel once P3.11 is complete
- P3.13 SMS compliance: 10DLC carrier registration should now be in scope — opt-in language is live on all CTAs (header dropdown + chat widget); Privacy Policy and Terms pages already deployed from Session 4

---

## 🔄 Previous Activity (April 22, 2026 — Session 5)

**New mascot assets (v5) + QuoteGiraffeTab simplification**

### Mascot image upgrade
Two new giraffe mascot images provided by client, optimized and converted to WebP via Sharp:

| Asset | Source | Output | Reduction |
|---|---|---|---|
| `giraffe-quote-tab-v5.webp` | `peek_FINAL_transparent.png` (1.7 MB, 1176×1534) | 57 KB, 432×564px, 2× retina | 97% |
| `giraffe-chat-mascot-v5.webp` | `Screenshot_2026-04-22…removebg-preview.png` | 26 KB, 196×430px, 2× retina | 31% vs v4 WebP |

Both retain full RGBA transparency. Converted with `quality: 90, effort: 6, alphaQuality: 100`.

- **Quote tab giraffe (v5):** Blue hard hat, "peek" pose, holding tablet with "GET ESTIMATE" — replaces the orange-hat v4 in `QuoteGiraffeTab.tsx` and `RoofleGiraffeOverlay.tsx`
- **Chat mascot (v5):** Blue hard hat + headset, full-body standing with tablet — replaces v4 in `ChatWidget.tsx`; `height` prop updated from 175 → 215 to match taller aspect ratio

### QuoteGiraffeTab — custom drawer scrapped, reverted to direct Roofle trigger
A custom 2/3-width slide-in drawer was built and tested during the session but the client preferred simplicity: click giraffe → Roofle panel opens → giraffe disappears → Roofle closes → giraffe reappears. Final implementation:
- `onClick` → `openRoofleWidget()` (from `QuoteWidgetContext`)
- `MutationObserver` watches Roofle DOM attrs (`class`, `style`, `aria-expanded`) to detect open/close state
- `AnimatePresence` spring-exits the giraffe when `panelOpen === true`, spring-enters on close
- `firstEntry` ref ensures the 1.2s entrance delay only fires on initial page load, not on every Roofle-close reappearance
- Click-based polling fallback (150ms) handles cases where Roofle's DOM mutation doesn't fire reliably

### Files changed (bundled into commit `d0cbd09`)
- `public/images/giraffe-quote-tab-v5.webp` — new
- `public/images/giraffe-chat-mascot-v5.webp` — new
- `src/components/QuoteGiraffeTab.tsx` — simplified to Roofle trigger + panel-state observer
- `src/components/ChatWidget.tsx` — v5 mascot, height 215px

### Verification
- `npx tsc --noEmit` — clean
- `npx next build` — zero errors

---

## 🔄 Previous Activity (April 22, 2026 — Session 4)

**Header CTA redesign: "Get Started — No Obligations" hover dropdown + SMS opt-in + legal pages**

### Motivation
Client wants a warmer, lower-commitment entry point for the target audience (35–45 year-old women arriving from social/referral). Static "Free Estimate" → /contact was too cold and forced a page jump. Replaced with a hover-activated dropdown offering three explicit paths, each with its own consent/legal treatment.

### Header refactor (`src/components/Header.tsx`)
- Desktop nav left-aligned adjacent to logo (removed `lg:absolute lg:left-1/2 -translate-x-1/2` centering) with `lg:ml-8` gap
- Header-row phone number removed on both desktop and mobile (top utility bar phone is the single source)
- CTA moved right after the nav via a left-cluster div, theme toggle (sun/moon) split into its own element with `ml-auto` pushing it to the far right corner
- "Free Estimate" / "Get Your Free Estimate" → `<GetStartedDropdownDesktop />` + `<GetStartedDropdownMobile onNavigate={() => setMobileOpen(false)} />`

### New component: `src/components/GetStartedDropdown.tsx`
Two exports. Desktop uses shadcn HoverCard (`openDelay={80}`, `closeDelay={150}`). Mobile uses AnimatePresence height-accordion. Explicit dark card styling (`bg-gray-900 border-gray-800 text-white shadow-2xl`) + amber-tinted hover overlay (`hover:bg-amber/20`) so rows are visible regardless of the current theme state.

Three options:
1. **Text us** — inline click-to-expand panel with consent checkbox (red verbiage until checked, gray after); "Copy (843) 306-2939" button gated behind opt-in, uses `navigator.clipboard.writeText` with "Copied!" feedback. Falls back to SMS handler only if clipboard API is unavailable. Mobile variant keeps the native `sms:` link.
2. **Have our friendly non-commissioned team contact you** — desktop expands an inline form (name, phone, email, preferred time) posting to existing `/api/contact` route; consent checkbox gates the submit button ("Send Friend Request"), which stays dim (`bg-amber/25 text-gray-900/50`) until opted in, then flips to full `btn-amber`. Mobile links to `/contact` instead (inline form in collapsed menu = bad UX).
3. **Get a quick estimate** — calls `openRoofleWidget()` from the new `QuoteWidgetContext` (Jerry handoff).

### Opt-in persistence
`usePersistedOptIn(storageKey)` custom hook reads/writes `localStorage`. Two independent keys to keep consent scopes legally distinct:
- `rr-sms-opted-in` — SMS-only (Text us row)
- `rr-contact-opted-in` — calls + text + email (callback form)
Gracefully falls back to in-memory state if `localStorage` is blocked.

### New context: `src/contexts/QuoteWidgetContext.tsx`
Extracted the imperative Roofle-opener from `QuoteGiraffeTab.tsx` into a shared provider (`QuoteWidgetProvider` wraps tree inside `<ThemeProvider>` in `src/app/layout.tsx`). `useQuoteWidget()` returns `{ openRoofleWidget }`. `QuoteGiraffeTab` now consumes the context; the DOM-observer logic that watches the Roofle panel state stays local to the tab.

### Legal pages
- **`src/app/privacy/page.tsx`** — Full Privacy Policy at `/privacy` with prominent SMS data notice banner, 10 sections (data collected, use, SMS compliance, sharing, security, cookies, user rights, third-party links, policy changes, contact). Explicitly excludes SMS originator opt-in data from third-party sharing.
- **`src/app/terms/page.tsx`** — Full Terms of Service at `/terms` with TCPA & CTIA compliance language, SMS program description, STOP/HELP opt-out, SC governing law, disclaimers.
- **`src/components/Footer.tsx`** — Added "Privacy Policy" and "Terms of Service" to Quick Links.

### Files modified/created
- `src/components/Header.tsx` — nav + CTA + theme-toggle layout (-22 lines net)
- `src/components/GetStartedDropdown.tsx` — new (~510 lines, dual desktop/mobile export)
- `src/contexts/QuoteWidgetContext.tsx` — new (shared Roofle opener)
- `src/components/QuoteGiraffeTab.tsx` — refactored to consume context
- `src/app/layout.tsx` — wrapped tree in `QuoteWidgetProvider`
- `src/app/privacy/page.tsx` — new
- `src/app/terms/page.tsx` — new
- `src/components/Footer.tsx` — added legal links

### Commits (both pushed to `origin` and `client`)
- **`d0cbd09`** — GetStartedDropdown, QuoteGiraffeTab Roofle wiring, Header refactor, QuoteWidgetProvider (includes subsequent polish: dark card styling, amber hover overlay, inline opt-in with red-until-checked verbiage, "Send Friend Request" button, "Have our friendly non-commissioned team contact you" copy, localStorage persistence)
- **`7390092`** — Privacy Policy + Terms of Service pages, footer legal links

### Verification
- `npx tsc --noEmit` — clean
- `npm run build` — 76 pages generated (up from 74; `/privacy` + `/terms` added), zero errors

### Follow-ups flagged (not yet wired)
- Point `NOTIFICATION_WEBHOOK_URL` env var at Zuper's inbound webhook so "Have our friendly non-commissioned team contact you" submissions land in the CRM automatically (currently fan-out via existing `/api/contact` → Supabase + generic webhook)
- Optional: analytics events (`get_started_hover`, `cta_text_us_opt_in`, `cta_callback_submit`, `cta_quick_estimate_click`) to measure which of the three paths converts best for the social/referral audience

---

## 🔄 Previous Activity (April 22, 2026 — Session 3)

**ChatWidget cross-screen positioning fix — client review session**

### Root cause
During a client review session, the giraffe chat widget was overlapping the hero headline, description, and CTA buttons on the client's screen. Two bugs caused this:

1. **Fixed pixel left offset (`md:left-[140px]`)** — On the dev's wide monitor (1920px), the hero container margin pushed content right ~350px, so 140px landed safely in the margin. On the client's narrower screen (~1280–1366px), the container has no centering margin and content starts at ~75px — so 140px landed right inside the hero text column.

2. **Vertical stacking on mobile/tablet (`flex-col` layout)** — The speech bubble stacked **above** the giraffe on smaller breakpoints, making the widget ~265px tall. Pinned 20px from the viewport bottom, the top of the stack reached into the hero CTA area on shorter viewports (laptops with browser toolbar, zoomed-in browsers).

### Fix (3 commits, all pushed)
- **`75b1f88`** — Layout: `flex-col md:flex-row` → always `flex-row items-center`. Widget height is now always exactly the giraffe height (175px), never taller from vertical stacking. Speech bubble moved to the RIGHT of the giraffe with a left-pointing tail. Anchor changed to `bottom-6 left-4`.
- **`25eaecc`** — Left offset: `left-4` (hardcoded 16px) → `style={{ left: 'clamp(1rem, 8vw, 10rem)' }}`. Scales proportionally with viewport: 30px at 375px / 102px at 1280px / 109px at 1366px / 154px at 1920px. No breakpoint logic needed.

### Files modified
- `src/components/ChatWidget.tsx` — positioning, layout direction, speech bubble side + tail, clamp offset

### Status
- **Pushed to `origin` and `client`** — Vercel auto-deploy triggered (`875ba2f..25eaecc`)

---

## 🔄 Previous Activity (April 22, 2026 — Session 2)

**Roof Quote page (`/roof-quote`) — hero image + shingle tier reorder**

### Hero section overhaul
- Swapped hero background image from remote CDN URL (`cloudfront.net/…/hero-homepage-…webp`) to new local asset `roofrecon-pair2-clean.webp`
- Converted `public/images/roofrecon-pair2-clean.jpg` → `public/images/roofrecon-pair2-clean.webp` using sharp (quality 85, 2752×1536, 415 KB)
- Lightened hero: `opacity-20` → `opacity-80` on the background image (was nearly blacked out, now fully visible)
- Lightened gradient overlay: `from-black/70 via-black/50` → `from-black/60 via-black/30` so the tech-scan aerial image reads through on the right half while headline text stays readable on the left

### Shingle tier reorder (Good / Better / Best)
Corrected tier order to match actual product tier hierarchy:

| Position | Before | After |
|---|---|---|
| GOOD | TAMKO Storm Fighter | **Owens Corning Oakridge** |
| BETTER (popular) | Owens Corning Oakridge | **Owens Corning Duration (130 mph)** |
| BEST | Owens Corning Duration | **TAMKO Storm Fighter (160 mph)** |

- Price ranges reassigned to match tier order: $9–14k (GOOD) → $11–16k (BETTER) → $14–20k (BEST)
- Badge colors maintained in hierarchy: sage (GOOD) → amber (BETTER/popular) → navy (BEST)
- `popular: true` badge moved from Oakridge to Duration (now the middle/recommended tier)

### Files modified
- `src/app/roof-quote/roof-quote-content.tsx` — hero image + opacity + gradient + full SHINGLE_TIERS reorder
- `public/images/roofrecon-pair2-clean.webp` — new asset (converted from JPG)

### Commits
- **`591d0e4`** — pushed to `origin` and `client`

---

## 🔄 Previous Activity (April 22, 2026 — Session 1)

- **P1.2 giraffe mascots live** — custom SC Roofing giraffe widgets replace Pink Panther/Roofle branding: (1) chat mascot (headset + tablet, `giraffe-chat-mascot.webp`, 98×175px) positioned `left-4 md:left-[140px] bottom-[20px]` on homepage only; (2) quote-tab peek-in giraffe (`giraffe-quote-tab.webp`, 216px wide) slides in from right on every page linking to `/roof-quote`
- **Roofle slideout widget disabled** — commented out of `layout.tsx`; replaced by custom QuoteGiraffeTab component; re-enable or replace with Roofle embed on dedicated landing page per P2.9
- **ChatWidget scoped to homepage only** — removed from root `layout.tsx`, added to `src/app/page.tsx` (Server Component import); avoids widget appearing on every service/location page
- **Positioning approach (superseded in Session 3)** — `md:left-[140px]` and `bottom-[20px]` were used but caused cross-screen overlap on the client's narrower monitor; replaced in Session 3 with `clamp()` + always-`flex-row` layout
- **next/image sizing fix** — `w-auto h-auto` class overrides `width` prop and renders at file's intrinsic size; use `style={{ width: "Xpx", height: "auto" }}` when display size must differ from natural file size
- **Committed:** `aae2700` — pushed to both `origin` and `client`

---

## 🚫 Blockers / Pending from Client
- **HIGH** — ABC Supply pricing for shingle tiers — Jimmy submitted a request through ABC Supply portal but has not received a response. **Will need to get prices directly from Dave** instead. Unblocked once Dave responds.
- **HIGH** — TAMKO Storm Fighter specs (not on ABC Supply yet — need from Tom)
- **MED** — Product images for 3 shingle tiers
- **MED** — Real project photos + team headshots
- **MED** — Real project photos + team headshots for remaining sections
- **MED** — "What Our Customers Say" reviews section — awaiting feedback from David or Tom
- ~~**HIGH** — Env vars + deploy from new repo~~ **RESOLVED** (April 9)
- ~~**MED** — Commercial services yes/no~~ **RESOLVED** — Tom confirmed no commercial services

## ✅ Complete — Phase 1.5 Pre-Launch Punch List (April 20 client meeting)

**Priority 1 — Immediate homepage + branding work**
- [x] **P1.1** Strip all Pink Panther / Owens Corning branding — Roofle slideout disabled (Session 1); in-chat bubble avatars swapped to v5 headset/tablet mascot (Session 10, commit `e1bd664`)
- [x] **P1.2** Custom giraffe tool visuals — v5 chat mascot + v5 quote-tab giraffe both live; clamp-based positioning; `MutationObserver` panel-state tracking (Sessions 1–5)
- [x] **P1.3** Homepage 3-CTA reorganization — "Get Started — No Obligations" hover dropdown with 3 explicit paths: Text us / Have our friendly non-commissioned team contact you / Get a quick estimate (Session 4)
- [x] **P1.4** CTA copy rewrite — "Free Estimate" removed; all 3 paths have distinct bilingual copy; consent-gated actions throughout (Session 4)
- [x] **P1.5** Minor edits applied across deployment cycles (Sessions 1–9)

**Priority 2 — Instant Quote landing page**
- [x] **P2.6** `/roof-quote` IS the dedicated instant quote landing page — full standalone page with its own hero, narrative arc, and Roofle integration (Sessions 2, 8, 9)
- [x] **P2.7** Educational content live — shingle tiers (Good/Better/Best), cost drivers, 6-step process, FAQ, financing options; bilingual (Session 8)
- [x] **P2.8** Supporting visuals — 3 branded infographics: `why-quotes-vary-infographic.png`, `what-real-quote-includes-infographic.webp`, `what-drives-roof-cost-infographic.webp` (Session 9)
- [x] **P2.9** Roofle embed wired — 6 CTA buttons on `/roof-quote` trigger the widget via `QuoteWidgetContext`; hardened API fallback chain (Session 9)

**Priority 3 — Integrations + compliance**
- [ ] **P3.10** Lead routing widget integration — *blocked: need to know which widget Tom wants*
- [ ] **P3.11** Configure Zuper CRM intake — *blocked: need Zuper credentials/webhook URL from Tom*
- [ ] **P3.12** Confirm SMS workflow provider — *blocked: Tom to decide Zuper native vs. external*
- [x] **P3.13** SMS compliance — Privacy Policy ✅, Terms of Service ✅, opt-in language on all CTAs ✅ (header dropdown + chat widget). **Remaining:** 10DLC carrier registration (external, trigger once P3.12 resolved)
- [ ] **P3.14** Tech-stack ownership doc — *can write now; not yet done*

**Priority 4**
- [x] **P4.15** Spanish language toggle — full bilingual site with `LanguageContext`, `translations.ts`, 5 pages translated (Sessions 8–9). Careers + Referral pages deferred post-launch.

## 🔨 In Progress — Domain + Launch QA (Week 4)
- [ ] Run Lighthouse audit — target SEO score ≥ 95
- [ ] Run Google Rich Results Test on key pages
- [ ] Connect production domain in Vercel (restorationroofingsc.com)
- [ ] Update sitemap.xml URLs to production domain
- [ ] GA4 + Search Console setup — Jimmy has Tom's GoDaddy account, can handle DNS verification
- [ ] Submit sitemap to Google Search Console
- [ ] Final QA + go-live

## ⏳ Up Next — Phase 2 (Integrations continued)
- [x] **Instant roof estimator** — Roofle RoofQuote PRO slideout integrated site-wide (April 16, 2026); loads in `<head>` per Roofle install spec
- [ ] **After-hours voice agent** — Zuper may handle natively; follow up with Zuper to confirm scope
- [ ] **Blog content launch** — infrastructure built, content ready; major AEO lever once live
- [ ] **Automated blog system** — 9 posts per month (client confirmed)

## ⏳ Phase 3 — SEO/AEO Enhancements
- [ ] HowTo schema for process pages (AEO)
- [ ] Speakable schema for voice search eligibility
- [ ] Google Reviews live feed (API integration)
- [ ] AggregateRating schema on Reviews page (after Google Reviews)
- [ ] Expand knowledge base for long-tail local queries
- [ ] Enrich gutter & storm damage service pages (deeper content, more images)
- ~~Commercial services decision~~ — **Declined** by Tom (April 1)

## ⏳ Phase 4 — New Features
- [ ] Accessibility audit (WCAG 2.1 AA)

## 🔄 Previously Updated (April 20, 2026)
- **Phase 1.5 punch list captured** from client meeting with Tom — 15 tasks across 4 priority buckets (see "In Progress" above). Status shifted from "Site Live — Domain Connection Next" to "Pre-Launch Punch List In Motion"
- **P3.10 (lead routing) re-scoped** from "HIGH emergency" to normal priority — Tom confirmed it's a widget wire-up gap, not data loss; site is not live yet so no leads are being missed
- **Owl Roofing `/roof-quote/` analyzed** as architectural reference for the P2 Instant Quote landing page build. 19-section narrative arc documented (frustration → education → empowerment → reassurance → promise). Borrowing section order + narrative structure only — not copy, not images, not design system. Their weak points (broken image tags, no social proof numbers, no FAQ schema, vague financing, unclear tool mechanics) flagged as deliberate opportunities for us to beat
- **Roofle tool alignment noted** — Owl Roofing runs the same RoofQuotePRO™ widget we integrated April 16, so their tool-specific framing is directly reusable
- **Proposed 4-week sequencing:** Week 1 parallel (P1.1 branding, P1.2 giraffes, P1.5 minor edits, P3.10 widget fix) → Week 2 (P1.3 + P1.4 mobile hero + CTA copy; Zuper/SMS kickoff) → Week 3 (P2.6–P2.9 Instant Quote page; 10DLC filing in motion) → Week 4 (P3.14 ownership doc; domain cutover; final QA)

## 🔄 Previously Updated (April 18, 2026)
- **Mobile-first overhaul shipped to production** — Full phone-ready pass executed by a team of agents (Phase 1 deep perf audit → 4 parallel implementation agents on disjoint files → hotfix → PR review → merge to `main`). Production deploy verified live and phone-tested
- **Images fully optimized** — 19 raw `<img>` tags migrated to `next/image` across homepage, `PageHero`, ChatWidget giraffe avatars, portfolio, about, and location details. Homepage hero now has a preloaded responsive `srcSet` (8 sizes, 640→3840w, AVIF/WebP auto-negotiated) as the LCP element
- **Tap targets meet WCAG / iOS HIG** — Header hamburger, mobile phone CTA, theme toggle, and dropdown children all now `min-h/min-w [44px]`. Hamburger has state-aware `aria-label` + `aria-expanded` + `aria-controls`
- **Accessibility uplift** — `prefers-reduced-motion` globally neutralizes all animation/transition durations (WCAG 2.3.3); `.ken-burns` hero zoom additionally disabled on mobile; `FadeIn` uses `useReducedMotion()` from framer-motion
- **iOS Safari URL-bar jump fixed** — all hero/modal `vh` units swapped to `svh` (homepage hero, all sub-page `PageHero`, portfolio modal, materials-comparison hero)
- **iOS address-bar tint + preconnect** — `viewport` export with `themeColor` (light `#ffffff` / dark `#000000` via media queries), `colorScheme: "light dark"`. `preconnect` + `dns-prefetch` added to `app.roofle.com` for ~150ms faster widget handshake on 4G
- **LCP paint unblocked on sub-page heroes** — removed 1.5s `motion.h1` fade-in on `PageHero`; the `h1` (LCP candidate on every sub-page) now paints at final position on the first frame
- **ChatWidget / Roofle collision resolved on mobile** — chat button moved to `bottom-24` on phones so the giraffe clears Roofle's "Get Instant Roof Quote" button; desktop unchanged
- **Hotfix: React 19 + framer-motion hydration mismatch** — `FadeIn` was swapping the rendered element type (`<div>` vs `<motion.div>`) based on `useReducedMotion()`, which React 19's strict hydration cannot reconcile across SSR/client renders. Manifested as `appendChild` SyntaxError on the Vercel preview. Fix: keep `<motion.div>` constant, gate animation props instead — framer-motion's documented pattern
- **Phase 4 accessibility audit partially addressed** — tap-target sizes (WCAG 2.5.5), reduced-motion (2.3.3), and aria improvements on hamburger shipped as part of this overhaul; full WCAG 2.1 AA sweep still open as a dedicated pass

## 🔄 Previously Updated (April 17, 2026)
- **Vercel deploy pipeline fixed (critical)** — `rr-sc-website` Vercel project was silently linked to the OLD Vite SPA archive repo (`Agentic-Person/restorationroofing-sc`), so every push to the Next.js repo since the April 7 migration was being ignored and `rr-sc-website.vercel.app` was serving stale Vite SPA HTML. Relinked the project to `Agentic-Person/rr-sc-website` on `main` via the Vercel API. Production now serving `dpl_Am5a7bFfiUsQ12fRXAgartshpAZe` (Next.js build) with the Roofle slideout live in `<head>`
- **Vercel CLI installed and authed** — `vercel` CLI now available locally on team `sc-roofing` for direct deploy/inspect/relink without going through the dashboard
- **Old deploy hooks dead** — relinking the Vercel project wiped its deploy hooks; the URLs in CLAUDE.md (`…/3Od4x8p5su`, `…/QcPRUiXCDI`) no longer work. Not needed going forward — the GitHub integration auto-deploys on every push to `origin main`. CLAUDE.md updated accordingly
- **Roofle RoofQuote PRO slideout confirmed live** — verified in production HTML on `rr-sc-website.vercel.app`; widget loads on every page via root layout

## 🔄 Previously Updated (April 16, 2026)
- **Roofle RoofQuote PRO slideout integrated** — instant roof estimator widget added via root layout (`src/app/layout.tsx`); appears as a teaser tab on the right edge of every page; site visitors can now self-serve a roof quote without waiting for a callback. Script loads in `<head>` per Roofle's install requirement (slideout variant)
- **Hydration warning silenced** — `suppressHydrationWarning` added to `<body>` to handle ColorZilla browser extension's `cz-shortcut-listen` attribute mismatch (cosmetic-only, not a real bug)

## 🔄 Previously Updated (April 15, 2026)
- **Favicon live** — browser tab now shows the orange ridge logo on black background; proper multi-size ICO (16/32/48) + 512px PNG for `<link rel="icon">`; multiple fix iterations required (invalid ICO format, then zero-contrast orange-on-orange)
- **Deploy workflow simplified** — CLAUDE.md updated: GitHub integration auto-deploys on push to `origin main`; deploy hook removed from standard workflow to prevent duplicate simultaneous deploys
- **Marketing team brief prepared** — `docs/marketing-team-brief.md` ready to share; covers tech stack, SEO foundation, GA4 ID, structured data, URL structure, and pre-campaign checklist

## 🔄 Previously Updated (April 14, 2026)
- **Section header eyebrow fix** — removed inline `style` props from SectionHeader that were overriding all CSS/Tailwind size changes; eyebrow labels ("Our Services", "Our Process", etc.) now render at 2xl–4xl responsive sizes; section titles use `.section-title` CSS class
- **Client review items added** — "Our Process" section and "What Our Customers Say" section flagged for David/Tom feedback in blockers

## 🔄 Previously Updated (April 13, 2026)
- **Process section rebuilt** — expanded from 3 → 6 steps with new homeowner-focused copy; aerial photo banner added; 6 AI-generated WebP images wired to each step card (3×2 grid)
- **Logo decorator** — company ridge logo replaces star divider in all SectionHeader components across the site
- **Fade scroll nav** — "Our Process" / "Areas We Serve" nav clicks now fade out → instant jump → fade in instead of animated scroll
- **Service page heroes** — each of the 12 service pages now shows its own card image as the hero instead of a shared category fallback
- **Storm-damage slug fix** — "Storm & Hurricane Damage Repair" card was routing to the hub page; renamed slug to storm-damage-repair
- **Subtitle responsiveness** — description text under section headers wraps sooner on mobile/tablet via max-width constraints
- **Brand copy** — "Se Habla Español" replaced with "Family Owned & Operated" throughout
- **Spanish language pages** removed from roadmap (user confirmed not needed)

## 🔄 Previously Updated (April 9)
- **Site deployed and verified live** — 14/14 verification checks passed, all 73 pages SSR confirmed (April 9)
- **Deploy hook configured** — Vercel redeploy via webhook after every push (April 9)
- **Environment variables set in Vercel** — all 6 required vars configured (April 9)
- **.env.example cleaned up** — removed stale VITE_* prefixes, added missing ADMIN_SECRET (April 9)
- **Homepage converted to Server Component** — now fully server-rendered; animations extracted to reusable FadeIn client component (April 7)
- **Enriched JSON-LD structured data** on all 28 service pages + 21 location pages (April 7)
- **Context-aware internal linking system** — cross-category services, scored locations, nearby areas (April 7)
- **Next.js 15 migration complete** — full SSR/SSG, 73 pages pre-rendered, new repo (April 7)

## ✅ Done
- **Homepage SSR conversion** — removed `"use client"`, all homepage content now server-rendered with full HTML to crawlers (April 7)
- **Enriched JSON-LD structured data** — Service + BreadcrumbList on all service pages, RoofingContractor/LocalBusiness + BreadcrumbList on all location pages (April 7)
- **Internal linking system** — `src/lib/linking.ts` with 4 scoring functions, cross-category map, county adjacency, full-width location strip on service pages (April 7)
- **Next.js 15 migration** — SSR/SSG, 73 pages, Metadata API, server-rendered JSON-LD
- Full 73-page site (12 roofing, 12 gutter, 10 storm damage, 21 locations, 3 hubs, blog, static pages)
- RAG-powered AI chat widget with giraffe mascot (live)
- Blog CMS (Supabase-backed, 9 posts, SSR)
- Contact form → Supabase (server-side Zod validated)
- 5 API routes (chat, contact, blog listing, blog detail, blog generator)
- Dark mode, security headers, SEO/structured data
- Materials Comparison Tool (6 materials: 3 branded shingle tiers + standing seam + TPO + EPDM)
- 60+ custom AI images + 9 custom blog images
- Visual rebrand: black & orange color scheme (original saved as fallback)
- Global text readability fix across all pages
- Giraffe mascot chat widget with Text/Chat/Book action buttons
- Instant estimate engine in AI chat

---

## 🚀 Major Milestone: Next.js 15 Migration (April 7, 2026)

Migrated the entire website from React+Vite (client-side SPA) to **Next.js 15 (App Router)** with server-side rendering. This was the #1 priority for SEO — the old SPA served an empty HTML shell to Google and relied on JavaScript to build the page. Now every page delivers fully-rendered HTML with metadata baked in.

**Key results:**
- **73 pages pre-rendered at build time** (was client-side only)
- **21 location pages** with unique server-rendered metadata per city
- **36 service pages** with unique server-rendered metadata per service
- All JSON-LD structured data now in the HTML source (not injected via JS)
- `next build` passes clean — zero errors
- New repo, clean history, pushed to github.com/Agentic-Person/rr-sc-website

---

## Tech Stack (Post-Migration)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + React 19 |
| Rendering | SSR + SSG (73 pages at build time) |
| SEO | Next.js Metadata API (server-rendered) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Supabase (PostgreSQL + pgvector) |
| AI/Chat | OpenAI gpt-4o-mini + RAG |
| Hosting | Vercel (native Next.js) |
| Analytics | GA4 via next/script |

---
*Update this file + push to sync the Bridge.*
