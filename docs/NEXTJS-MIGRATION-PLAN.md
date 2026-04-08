# Restoration Roofing SC — Next.js Migration Plan

> **Prepared:** April 7, 2026
> **Current Stack:** React 19 + Vite 7 (Client-Side SPA)
> **Target Stack:** Next.js 15 (App Router, SSR/SSG) + React 19
> **Why:** Server-side rendering for SEO/AEO, `next/image` optimization, Next.js Metadata API, better Core Web Vitals

---

## Migration Overview

| Aspect | Current | After Migration |
|---|---|---|
| Rendering | Client-side only (empty HTML → JS builds page) | SSR + SSG (fully-rendered HTML from server) |
| Routing | Wouter (client-side, 15+ files) | Next.js file-based routing (App Router) |
| SEO Meta | `SEOHead` component (dynamically sets `document.title` via `useEffect`) | Next.js `generateMetadata()` — rendered into HTML before it reaches the browser |
| Structured Data | `JsonLd` component (injects `<script>` via `useEffect`) | Server-rendered `<script type="application/ld+json">` in page output |
| Images | Manual WebP compression, `<img>` tags, Vite asset imports | `next/image` — automatic optimization, WebP/AVIF, responsive `srcset`, lazy loading |
| API Routes | Vercel serverless functions in `/api/` | Next.js Route Handlers in `app/api/` (nearly identical) |
| Env Vars | `VITE_` prefix for client vars | `NEXT_PUBLIC_` prefix for client vars |
| Build | Vite + esbuild (server bundle) | Next.js built-in (no separate server build) |
| Express Server | `server/index.ts` — manual SPA fallback | Eliminated — Next.js handles routing natively |

---

## What Stays the Same (No Changes Needed)

These technologies work identically in Next.js — zero migration effort:

- **Tailwind CSS 4** + `@tailwindcss/typography`
- **shadcn/ui + Radix UI** (60+ components) — all work in Next.js with `'use client'`
- **Framer Motion** — works with `'use client'` directive
- **Supabase** client + server-side usage
- **OpenAI** integration (chat API, RAG, embeddings)
- **React Hook Form + Zod** validation
- **Lucide React** icons
- **Sonner** toast notifications
- **Google Fonts** (DM Sans, Playfair Display) — use `next/font` for better loading
- **All business content** in `data.ts` (~1,200 lines) — unchanged
- **All attached_assets/** images — unchanged
- **Knowledge base** (`lib/knowledgebase/`) — unchanged
- **Supabase migrations** — unchanged
- **Scripts** (ingest-knowledge, seed-blog-posts) — unchanged

---

## Phase 1: Project Initialization

**Goal:** Scaffold the Next.js 15 project, configure build tooling, verify it compiles.

### Tasks

1. **Initialize Next.js 15 with App Router**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
   ```
   - Or manually: install `next`, `react`, `react-dom`, update `package.json` scripts

2. **Update `package.json` scripts**
   ```json
   {
     "dev": "next dev",
     "build": "next build",
     "start": "next start"
   }
   ```
   - Remove Vite, esbuild, and Express dependencies
   - Remove `vite.config.ts`, `server/index.ts`

3. **Configure `next.config.ts`**
   ```ts
   import type { NextConfig } from 'next';

   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         { protocol: 'https', hostname: 'd2xsxph8kpxj0f.cloudfront.net' },
       ],
     },
   };

   export default nextConfig;
   ```

4. **Configure path aliases in `tsconfig.json`**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"],
         "@assets/*": ["./attached_assets/*"]
       }
     }
   }
   ```

5. **Set up Tailwind CSS 4 for Next.js**
   - Replace `@tailwindcss/vite` with `@tailwindcss/postcss`
   - Create `postcss.config.mjs`:
     ```js
     export default { plugins: { '@tailwindcss/postcss': {} } }
     ```

6. **Set up `next/font` for Google Fonts**
   ```tsx
   // src/app/layout.tsx
   import { DM_Sans, Playfair_Display } from 'next/font/google';

   const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
   const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
   ```

7. **Rename environment variables**
   - `VITE_SUPABASE_URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VITE_GA4_MEASUREMENT_ID` → `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - `VITE_FRONTEND_FORGE_API_KEY` → `NEXT_PUBLIC_FRONTEND_FORGE_API_KEY`
   - `VITE_FRONTEND_FORGE_API_URL` → `NEXT_PUBLIC_FRONTEND_FORGE_API_URL`
   - `VITE_ANALYTICS_ENDPOINT` → `NEXT_PUBLIC_ANALYTICS_ENDPOINT`
   - `VITE_ANALYTICS_WEBSITE_ID` → `NEXT_PUBLIC_ANALYTICS_WEBSITE_ID`
   - Server-side vars stay the same: `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, etc.
   - Update `.env.example` and Vercel env vars

8. **Update `vercel.json`**
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
           { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
         ]
       }
     ]
   }
   ```
   - Remove `buildCommand`, `outputDirectory`, `rewrites` — Next.js handles all of this
   - Security headers stay

**Deliverable:** `next dev` runs, blank app compiles, Tailwind works, fonts load.

---

## Phase 2: App Shell & Layout

**Goal:** Root layout, header, footer, theme provider, global styles.

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (html, body, providers, Header, Footer, ChatWidget)
│   ├── page.tsx                ← Home page
│   ├── globals.css             ← Current index.css (Tailwind + custom vars)
│   ├── not-found.tsx           ← 404 page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── financing/page.tsx
│   ├── portfolio/page.tsx
│   ├── reviews/page.tsx
│   ├── materials-comparison/page.tsx
│   ├── blog/
│   │   ├── page.tsx            ← Blog listing
│   │   └── [slug]/page.tsx     ← Blog post (SSR — fetches from Supabase)
│   ├── services/
│   │   ├── page.tsx            ← Services hub (redirect or main)
│   │   └── [slug]/page.tsx     ← Service detail OR service hub (roofing/gutters/storm-damage)
│   ├── areas-we-serve/
│   │   ├── page.tsx            ← Areas listing
│   │   └── [slug]/page.tsx     ← Location detail
│   └── api/
│       ├── chat/route.ts
│       ├── contact/route.ts
│       └── blog/
│           ├── route.ts        ← GET /api/blog
│           ├── [slug]/route.ts ← GET /api/blog/:slug
│           └── generate/route.ts
├── components/
│   ├── Header.tsx              ← 'use client' (scroll, mobile menu, useState)
│   ├── Footer.tsx              ← Server component (no state)
│   ├── ChatWidget.tsx          ← 'use client' (localStorage, fetch, useState)
│   ├── Layout.tsx              ← 'use client' (scroll-to-top, window.scrollY)
│   ├── Map.tsx                 ← 'use client' (Google Maps API)
│   ├── ErrorBoundary.tsx       ← 'use client' (class component)
│   ├── shared.tsx              ← Split: JsonLd becomes server, UI stays client
│   └── ui/                     ← All shadcn/ui components (unchanged, add 'use client')
├── contexts/
│   └── ThemeContext.tsx         ← 'use client' (localStorage, matchMedia)
├── lib/
│   ├── data.ts                 ← Unchanged (~1,200 lines of content)
│   ├── supabase.ts             ← Update env var names
│   ├── materials.ts            ← Unchanged
│   └── utils.ts                ← Unchanged
└── hooks/
    ├── useComposition.ts
    ├── useMobile.tsx
    └── usePersistFn.ts
```

### Tasks

1. **Create root `layout.tsx`**
   - `<html>`, `<body>`, font classes, theme class
   - Wrap children in `ThemeProvider`
   - Include `Header`, `Footer`, `ChatWidget`
   - GA4 script via `next/script`
   - Global metadata (geo tags, site name, Open Graph defaults)

2. **Move `index.css` → `globals.css`**
   - Import in `layout.tsx`
   - No content changes needed

3. **Migrate `ThemeContext.tsx`**
   - Add `'use client'` directive
   - Wrap `typeof window` checks (already partially there)
   - Or use `next-themes` (already in dependencies) for SSR-safe theme handling

4. **Migrate `Header.tsx`**
   - Add `'use client'` directive
   - Replace `import { Link, useLocation } from 'wouter'` with:
     ```tsx
     import Link from 'next/link';
     import { usePathname } from 'next/navigation';
     ```
   - Replace `useLocation()` → `usePathname()`
   - `<Link href="/">` works the same

5. **Migrate `Footer.tsx`**
   - Replace Wouter `Link` with `next/link`
   - Can remain a server component (no state, no effects)

6. **Migrate scroll-to-top logic from `Layout.tsx`**
   - Add `'use client'` directive
   - Replace `useLocation()` with `usePathname()`

**Deliverable:** Root layout renders with Header, Footer, ChatWidget. Navigation works. Theme toggle works. Scroll-to-top works.

---

## Phase 3: Page Migration (Static Pages First)

**Goal:** Migrate all pages, converting SEO from client-side to server-side.

### SEO Pattern Change

**Before (SPA — client-side, invisible to crawlers on first load):**
```tsx
export default function About() {
  return (
    <>
      <SEOHead title="About Us" description="..." />
      <JsonLd data={{ "@type": "Organization", ... }} />
      {/* page content */}
    </>
  );
}
```

**After (Next.js — server-rendered, in HTML before JavaScript loads):**
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Restoration Roofing SC',
  description: '...',
  openGraph: { title: '...', description: '...', url: '...' },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization", ...
        })}}
      />
      {/* page content */}
    </>
  );
}
```

### Migration Order (simplest → most complex)

#### Batch 1: Pure Static Pages (Server Components — no `'use client'` needed)

These pages have zero client-side state. They become server components by default.

| Page | Route | Notes |
|---|---|---|
| About | `app/about/page.tsx` | Static content from `data.ts`, Organization schema |
| Reviews | `app/reviews/page.tsx` | Static testimonials, AggregateRating schema |
| Portfolio | `app/portfolio/page.tsx` | Project gallery — lightbox/modal needs `'use client'` wrapper |
| 404 | `app/not-found.tsx` | Next.js convention |

#### Batch 2: Interactive Static Pages (Server + Client Components)

These pages have static content but include interactive elements (calculators, filters).

| Page | Route | Notes |
|---|---|---|
| Financing | `app/financing/page.tsx` | Loan calculator → extract `<Calculator />` as `'use client'` |
| Materials Compare | `app/materials-comparison/page.tsx` | Filters/sorting → extract interactive parts as `'use client'` |
| Contact | `app/contact/page.tsx` | Form → `'use client'` for React Hook Form + submission |
| Home | `app/page.tsx` | Hero, stats, testimonials. Framer Motion sections → `'use client'` wrappers |

#### Batch 3: Data-Driven Pages (SSR/SSG with `generateStaticParams`)

| Page | Route | Rendering | Notes |
|---|---|---|---|
| Areas We Serve | `app/areas-we-serve/page.tsx` | Static | List of 21 locations |
| Location Detail | `app/areas-we-serve/[slug]/page.tsx` | **SSG** — `generateStaticParams()` from `LOCATIONS` | 21 pre-built pages, each with unique metadata |
| Service Hub | `app/services/[slug]/page.tsx` | **SSG** — handle both hub slugs and detail slugs | Route logic: if slug is `roofing`/`gutters`/`storm-damage` → hub, else → detail |
| Blog | `app/blog/page.tsx` | **SSR** — fetches from Supabase | Revalidates periodically |
| Blog Post | `app/blog/[slug]/page.tsx` | **SSR** — `generateMetadata()` pulls title/description from Supabase | Dynamic meta per post |

#### SSG Example: Location Pages

```tsx
// app/areas-we-serve/[slug]/page.tsx
import { LOCATIONS } from '@/lib/data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = LOCATIONS.find(l => l.slug === params.slug);
  return {
    title: `Roofing Services in ${location?.name} | Restoration Roofing SC`,
    description: `Professional roofing, gutters, and storm damage repair in ${location?.name}, SC...`,
    openGraph: { ... },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = LOCATIONS.find(l => l.slug === params.slug);
  // ... render page content (server component — no 'use client' needed)
}
```

**This is the SEO game-changer:** 21 location pages pre-rendered as static HTML at build time, each with unique meta tags baked into the HTML. Google sees the content instantly — no JavaScript execution required.

### Tasks Per Page

For each page:
1. Create the route file (`app/[route]/page.tsx`)
2. Convert `SEOHead` call → `export const metadata` or `generateMetadata()`
3. Convert `JsonLd` call → inline `<script type="application/ld+json">`
4. Replace Wouter `Link` → `next/link`
5. Extract interactive sections into `'use client'` sub-components
6. Replace `<img>` → `<Image>` from `next/image`

**Deliverable:** All 13 pages render at their correct routes with server-side metadata and structured data.

---

## Phase 4: API Route Migration

**Goal:** Move serverless functions to Next.js Route Handlers.

### Current → Next.js Mapping

| Current | Next.js | Changes |
|---|---|---|
| `api/chat.ts` | `app/api/chat/route.ts` | Minimal — change export pattern |
| `api/contact.ts` | `app/api/contact/route.ts` | Minimal — change export pattern |
| `api/blog/index.ts` | `app/api/blog/route.ts` | Minimal |
| `api/blog/[slug].ts` | `app/api/blog/[slug]/route.ts` | Minimal |
| `api/blog/generate.ts` | `app/api/blog/generate/route.ts` | Minimal |

### Export Pattern Change

**Before (Vercel serverless):**
```ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ data });
}
```

**After (Next.js Route Handler):**
```ts
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ data });
}
```

### Tasks

1. Convert each API route to the Next.js Route Handler export pattern
2. Replace `req.body` → `await request.json()`
3. Replace `res.status(200).json()` → `NextResponse.json()`
4. Replace `req.headers['x-forwarded-for']` → `request.headers.get('x-forwarded-for')`
5. Rate limiting stays the same (in-memory maps)
6. Remove `@vercel/node` dependency
7. Delete `server/` directory entirely (Express no longer needed)

**Deliverable:** All 5 API endpoints work identically at the same URLs.

---

## Phase 5: Image Optimization

**Goal:** Replace manual image handling with `next/image`.

### Tasks

1. **Replace `<img>` tags with `<Image>`**
   ```tsx
   import Image from 'next/image';

   // Before
   <img src={heroImage} alt="..." className="..." />

   // After
   <Image src={heroImage} alt="..." width={1200} height={600} className="..." />
   ```

2. **Static imports stay the same**
   ```tsx
   import blogImage from '@assets/sc-blog-roof-leaking-v3.webp';
   // Works identically — Next.js handles the optimization
   ```

3. **Remote images (CloudFront CDN)**
   - Already configured in `next.config.ts` `remotePatterns`
   - Use `<Image src="https://d2xsxph8kpxj0f.cloudfront.net/..." width={...} height={...} />`

4. **Remove manual compression workflow**
   - `next/image` handles WebP/AVIF conversion, resizing, and `srcset` automatically
   - Existing pre-compressed images still work and skip re-processing

**Deliverable:** All images serve optimized, responsive versions. No manual compression needed for future images.

---

## Phase 6: ChatWidget Migration

**Goal:** Chat widget works identically in the Next.js app.

### Tasks

1. Add `'use client'` at top of `ChatWidget.tsx`
2. No other changes needed — it's already a fully client-side component
3. Include in `layout.tsx` (renders on every page, same as before)
4. Verify localStorage session persistence works
5. Verify API calls to `/api/chat` work

**This is one of the easiest pieces** — the chat widget is entirely client-side and doesn't benefit from SSR. It just needs the directive.

---

## Phase 7: Cleanup & Verification

**Goal:** Remove legacy files, verify everything works.

### Files to Remove

| File/Directory | Reason |
|---|---|
| `client/` | Entire directory — replaced by `src/` |
| `server/` | Express server — replaced by Next.js |
| `vite.config.ts` | Vite build config — replaced by `next.config.ts` |
| `client/index.html` | SPA entry point — replaced by `layout.tsx` |
| `client/src/main.tsx` | React entry point — Next.js handles this |
| `client/src/App.tsx` | Wouter router — replaced by file-based routing |
| `client/src/components/shared.tsx` `SEOHead` | Replaced by Next.js Metadata API |
| `client/src/components/shared.tsx` `JsonLd` | Replaced by inline server-rendered `<script>` |

### Files to Keep (moved into `src/`)

- All components (with `'use client'` where needed)
- All `lib/` files (`data.ts`, `supabase.ts`, `materials.ts`, `utils.ts`)
- All hooks
- `ThemeContext.tsx`
- `globals.css` (was `index.css`)
- `attached_assets/` (stays at project root)
- `lib/knowledgebase/` (stays at project root)
- `supabase/migrations/` (stays at project root)
- `scripts/` (stays at project root)

### Verification Checklist

- [ ] `next build` completes with zero errors
- [ ] All 13 page types render correctly
- [ ] All 21 location pages have unique, server-rendered meta tags
- [ ] All 34 service pages (12 roofing + 12 gutter + 10 storm) render
- [ ] Blog listing fetches from Supabase
- [ ] Blog posts render with correct metadata
- [ ] Contact form submits successfully
- [ ] AI chat works (send message, receive RAG response)
- [ ] Dark mode toggle works
- [ ] Mobile navigation works
- [ ] Scroll-to-top works
- [ ] All images load (local + CDN)
- [ ] 404 page renders for invalid routes
- [ ] Lighthouse SEO score ≥ 95
- [ ] View page source shows full HTML content (not empty `<div id="root">`)
- [ ] Structured data validates in Google Rich Results Test
- [ ] All 5 API endpoints respond correctly
- [ ] GA4 tracking fires on page views

---

## Phase 8: Deploy

### Tasks

1. Update Vercel project settings:
   - Framework Preset: **Next.js** (auto-detected)
   - Remove custom build command and output directory overrides
2. Rename all `VITE_*` environment variables to `NEXT_PUBLIC_*` in Vercel dashboard
3. Deploy via CLI:
   ```bash
   git push origin main
   git push agentic main
   vercel --prod --scope sc-roofing --yes
   ```
4. Verify live site at https://td-rr-website.vercel.app
5. Run Lighthouse audit on live URL
6. Run Google Rich Results Test on key pages
7. View page source to confirm server-rendered HTML

---

## Effort Estimate

| Phase | Scope | Components |
|---|---|---|
| Phase 1 | Project init, config, env vars | 8 config files |
| Phase 2 | App shell, layout, header, footer | 5 components |
| Phase 3 | 13 page types, SEO conversion | 13 pages + sub-components |
| Phase 4 | 5 API routes | 5 route handlers |
| Phase 5 | Image optimization | All image references |
| Phase 6 | ChatWidget | 1 component |
| Phase 7 | Cleanup, QA | Verification checklist |
| Phase 8 | Deploy | Vercel config + env vars |

**Key advantage:** All content, design, images, Supabase schema, AI chat logic, and business data are unchanged. This is a framework swap — not a rebuild of the product.

---

## Risk Mitigation

1. **Keep current site live** — don't touch the existing deployment until Next.js version is verified
2. **Work in a separate branch** (`nextjs-migration`) — merge only when fully verified
3. **Test SSR meta tags** — view page source, not just the rendered page, to confirm Google sees content
4. **Preserve all URLs** — every current URL must work at the same path (no SEO disruption)
5. **Original color scheme backup** — `index.original.css` carries over as `globals.original.css`

---

*This plan covers the complete migration from React+Vite SPA to Next.js 15 App Router with zero content loss and significantly improved SEO/AEO performance.*
