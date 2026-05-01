# Restoration Roofing SC — Project Status
> Last updated: May 1, 2026

## 🟡 Status: Phase 1.5 Nearly Complete — Blocked on Zuper/SMS + Domain Cutover

**Phase:** All website development done; remaining items are integrations (Zuper, SMS) and launch steps (domain, GA4, QA). See `docs/operations/phase-1.5-remaining.md` for the full remaining task list.
**Live:** https://rr-sc-website.vercel.app
**Repo:** github.com/Agentic-Person/rr-sc-website
**Client Repo:** github.com/SCROOF1/restorationroofing
**Previous Repo (Vite SPA):** github.com/Agentic-Person/restorationroofing-sc (archive only)

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
