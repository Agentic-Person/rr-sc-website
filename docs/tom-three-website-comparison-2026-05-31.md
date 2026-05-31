# What JDMPS Changed — and Why Nova Is Built Differently

**For:** Tom Davis  |  **From:** Jimmy Davidson  |  **May 31, 2026**

---

## Summary

JDMPS rebuilt the site from scratch on WordPress + Elementor. Their version (`rr.jdmps.com`) makes real improvements to classic SEO but removes most of the features that made the original site distinctive — and, more importantly, the way it's currently built means **AI search engines will not be able to find or cite this site.** That can be added later, but it isn't in their current scope.

That's the core reason we're building Nova Roofing & Restoration the way we are: Nova covers **both** classic SEO **and** AI search optimization in the same site.

---

## What JDMPS removed from the original

| Feature on the original site | On the JDMPS rebuild |
|---|---|
| Claude AI chat (every page) | ❌ Removed |
| Roofle widget on every CTA | ⚠️ One page only |
| Materials comparison page | ❌ Removed |
| TAMKO HailGuard product specs | ❌ Replaced with generic shingle copy |
| Pricing calculator + formula | ❌ Removed |
| Spanish bilingual toggle (UI) | ❌ Removed (copy still mentions it) |
| Dedicated /reviews page | ❌ Removed (scattered inline) |
| Brand mascot (Russell the giraffe) | ❌ Removed |
| Custom About-page design | ❌ Generic Elementor template |
| Customized CTA buttons + functionality (Roofle-wired, branded, page-specific positioning) | ❌ Replaced with generic Elementor button patterns |
| Modern performance (Next.js + Vercel edge) | ⚠️ WordPress + plugin load |

## What JDMPS added (real improvements)

| Capability | On JDMPS rebuild |
|---|---|
| Schema foundation (Organization, WebSite, BreadcrumbList) via Yoast | ✅ |
| Canonical tags on every page | ✅ |
| Programmatic area × service pages (~12 combos) | ✅ |
| Wider area coverage (Cherry Hill, Russellville, Ladson, Bonneau, Columbia, etc.) | ✅ |
| Yoast XML sitemap_index | ✅ |
| Standard agency pages (/careers, /specials, /gallery) | ✅ |
| Updated business address (75 Port City Landing) | ✅ |

These are genuine wins. Most were on our original roadmap but hadn't shipped before handoff.

---

## What JDMPS hasn't finished (pre-launch items)

Normal for a build still in development — flagged in the full audit document we already delivered.

- ⚠️ Two license numbers visible on same page (`RBS 67027` + old `RBC 694`)
- ⚠️ Wrong logo in schema (template default, not your actual logo)
- ⚠️ Missing H1 heading on homepage, About, Price My Roof, and Shingle pages
- ⚠️ Placeholder "Service Name" text visible on the homepage
- ⚠️ Staging pages (`/test/`, `/service-listing-bk/`) publicly accessible
- ⚠️ `/price-my-roof/` has no meta description

---

## What can still be added on their WordPress stack

JDMPS has full permission to import anything we built. Most features can be added with configuration, content work, or plugin additions; the AI chat is the only one requiring real custom development.

| Feature | Path on WordPress |
|---|---|
| Roofle on every CTA | Configuration |
| Materials comparison page | Elementor + content import |
| TAMKO HailGuard copy | Content update |
| Reviews page | Reviews plugin |
| Spanish toggle | WPML / Polylang plugin + translation |
| Brand mascot | Image assets |
| About-page polish | Custom Elementor design |
| FAQ + Service + Review schema | Schema Pro configuration |
| Customized CTA buttons + functionality | Custom Elementor or child-theme work |
| **Claude AI chat** | **Custom WP plugin development** |

---

## The critical gap: AI search engines cannot find this site

Search is shifting from blue-link Google to AI-generated answers (ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini). When customers ask an AI engine *"best roofer in Charleston for hail damage,"* those engines pick businesses to cite based on a specific set of signals. **None of those signals are currently present on the JDMPS site.**

| AI-search requirement | Present on JDMPS site? |
|---|---|
| FAQ schema on service pages | ❌ |
| Service-specific schema (per page, not one generic block) | ❌ |
| Review / AggregateRating with real numbers | ❌ |
| Entity graph with @id linking (Organization → Service → LocalBusiness) | ❌ |
| `sameAs` to Facebook / Google Business Profile / BBB | ❌ |
| AI bot allow directives in `robots.txt` (GPTBot, ClaudeBot, etc.) | ❌ |
| `llms.txt` file at site root | ❌ |
| On-site AI chat (a conversational surface AI engines can verify against) | ❌ |
| Industry-specific schema type (`RoofingContractor`) | ❌ |
| Real product-specific content (TAMKO etc.) | ❌ |

**Result:** the JDMPS site will rank on classic Google for "Charleston roofer" searches. It will not appear when customers ask AI engines conversational questions. That dimension of search visibility has effectively been eliminated by the way the site is currently built.

This is fixable. Most of these signals can be added via Schema Pro configuration, content updates, and a custom AI chat plugin — but none of them are on JDMPS's current scope of work.

---

## Why we're building Nova differently

Nova Roofing & Restoration is being built to cover **both** layers in one site — classic search optimization **and** AI search optimization. Not one or the other.

### Classic Google SEO (matches what JDMPS does)
| | Nova |
|---|---|
| Schema foundation (Org / WebSite / Breadcrumb) | ✅ |
| Canonical tags every page | ✅ |
| Programmatic area × service pages | ⏳ Building |
| XML sitemap_index | ✅ |

### Google Business Profile alignment (local search)
| | Nova |
|---|---|
| NAP consistency (name / address / phone) | ✅ |
| `sameAs` to GBP, Facebook, BBB | ✅ |
| `AggregateRating` with real numbers (4.9 / 47 reviews) | ✅ |
| Industry-specific schema (`RoofingContractor`) | ✅ |
| Area pages with locale-specific content | ✅ |

### AI search optimization (what JDMPS does not do)
| | Nova |
|---|---|
| FAQ schema across service pages | ⏳ Expanding to all |
| Service schema with per-city `areaServed` array | ✅ |
| Entity graph with @id linking | ✅ |
| AI bot allow directives (11 specific crawlers) | ✅ |
| `llms.txt` at site root | ✅ |
| `QuoteAction` + `makesOffer` (agent-callable signals) | ✅ |
| Claude AI chat with knowledge-base grounding | ⏳ Porting |
| MCP endpoint (for AI agents to interact with) | ⏳ Next sprint |
| Vector-indexed chat with citation links | ⏳ Next sprint |
| Modern performance (Next.js + Vercel edge) | ✅ |

**Nova does what JDMPS does plus what JDMPS doesn't.** Customers find Nova on classic Google. Customers find Nova in the Google Map Pack via GBP. Customers find Nova when they ask ChatGPT, Claude, or Perplexity. All three at once, in one site.

---

---

## Appendix: How AI-search features would be added to the JDMPS site — and why it gets clunky

Every AI-search feature listed earlier *can* be added to a WordPress site. The path matters. Each item below shows how JDMPS would add it on WordPress vs. how we build it on Nova.

### Item-by-item implementation comparison

| Feature | JDMPS path (WordPress) | Nova path (Next.js) |
|---|---|---|
| FAQ schema on service pages | Editor adds Q&A in WP admin per page; Schema Pro emits JSON-LD. Manual per page. | Typed `faqs` field in `services.json`; schema generator emits FAQPage for all services automatically. |
| Service-specific schema | Configure Schema Pro rules per service page type. Manual setup. | Service page reads typed data; emits `Service` schema with provider, serviceType, areaServed automatically. |
| Review / AggregateRating | Install a reviews plugin + Schema Pro picks up data. | Reviews in Supabase or Google Reviews API; schema generated from typed data. |
| Entity graph with @id linking | Yoast + Schema Pro emit flat schema. Sophisticated graph requires a custom PHP plugin. **Real custom dev.** | Generated programmatically with proper @id structure. Already shipping. |
| `sameAs` (Facebook / GBP / BBB) | Yoast Organization settings → fill in fields. Easy. | Already in the Organization generator. |
| AI bot allow directives | Override robots.txt from Yoast or static file. Easy. | `src/app/robots.ts` with 11 directives. Already shipping. |
| `llms.txt` file | Static upload, or custom plugin to generate dynamically. | Dynamic route generates from typed data. Already shipping. |
| **Claude AI chat** | **(a)** iframe-embed our Vercel chat — easy, but chat lives on our server. **(b)** Generic chatbot SaaS — generic, doesn't ground in site content. **(c)** Custom WP plugin (PHP + JS + Anthropic API + knowledge base + vector store) — **1–3 weeks of custom dev, plus ongoing maintenance.** | React component + Next.js API route + typed knowledge base. Native, version-controlled. |
| Industry-specific schema (`RoofingContractor`) | Schema Pro custom type config. Hours. | Already shipping. |
| Product-specific content (TAMKO etc.) | Content work in WP admin. | Typed product data → Product schema + rendered content from same source. |

### The bigger picture — why WordPress gets clunky as features stack

WordPress can check every box. What it can't easily do is **stay coherent as the site grows.** Each new feature is another plugin or another set of Schema Pro rules. Plugins update independently and fight each other. The site gets slower with each addition. This is the well-documented downside of the page-builder + plugin approach.

### Real numbers from the current sites

We measured both sites today (May 31, 2026, three runs each, raw HTTP):

| Measurement | JDMPS site (`rr.jdmps.com`) | Nova site (`rr-nova-website.vercel.app`) |
|---|---|---|
| Server response (Time To First Byte) | **2.5 – 2.7 seconds** | 0.17 – 0.32 seconds |
| Total HTML delivery | **2.85 – 3.53 seconds** | 0.20 – 0.35 seconds |
| Homepage HTML size | 218 KB | 185 KB |
| External script tags loaded | 17 | 14 |
| External link tags (CSS / fonts / icons) | **50** | 10 |
| Inline script blocks | 4 | 1 |
| Total HTTP requests just from the head | **71** | 25 |

**Jimmy's observation of 5–8 second page loads is real and matches the data.** What's actually happening: 3 seconds of HTML transfer, plus 2–5 more seconds of browser-side plugin JavaScript execution, Elementor's runtime initialization, WP Rocket's lazy rendering, font loading, and image hydration. That's the JDMPS site **today**, before any of the AI-search features get added.

For comparison: Nova returns its first byte in **0.17 seconds** — roughly **15× faster** — and the total HTTP delivery is **~10× faster**. That's not because we wrote it more carefully; it's because the stack (Next.js + React Server Components + Vercel edge) is structurally faster than PHP + Elementor + 50 plugin assets. The difference is architectural, not effort.

### What happens when JDMPS adds the AI-search features

Every feature in the AI-search list requires either:

- **A new plugin** (FAQ schema, reviews schema, AI chat, etc.) — each one is more JS to load, more CSS to parse, more PHP processing per request
- **More Schema Pro / Yoast configuration** — more rules to maintain, more chances for conflicts on plugin updates
- **Or real custom PHP development** — for the AI chat especially, plus the sophisticated entity graph

The JDMPS site today loads **71 external assets** just from the HTML head. Adding the AI-search features as Tom described would realistically push that toward **120+ assets** — and the load time with it. WordPress sites in this configuration commonly hit 8–12 second load times once they've accumulated the plugin set a contractor marketing agency typically deploys.

### Honest framing on WordPress

WordPress core isn't outdated technology — it's mature, well-supported, and runs roughly 40% of the web. What's outdated is **how it's typically deployed for contractor marketing:** page builder (Elementor) + plugin stacking. That approach predates modern web architecture and trades long-term performance for short-term convenience.

Performance-sensitive, AI-native business sites in 2026 are built on stacks like **Next.js + React Server Components + edge rendering** — the same stack used by enterprise brands like TikTok, Notion, Doordash, Twitch, and most modern SaaS companies. The reason isn't style — it's that these stacks structurally avoid the slowdown and brittleness that comes from plugin stacking.

**Nova is built on that modern stack.** That's why a fresh Next.js site can already deliver pages 10–15× faster than a WordPress site that's been polished for weeks — *before* either site has added all the AI-search features. Once those features are added, the gap widens further.

---

## In one sentence

**The JDMPS rebuild is solid classic SEO that, as currently scoped, cannot be cited by AI search engines — and adding those features on its stack means more plugins, more weight, and a site that's already loading in 3+ seconds of HTML before the browser even starts rendering. Nova is being built to do all of it — classic search, local search, and AI search — in one fast, modern site.**

— Jimmy Davidson · Agentic Personnel · jimmy@agenticpersonnel.com
