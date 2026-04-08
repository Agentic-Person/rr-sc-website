# Meta & SEO Implementation Plan — Restoration Roofing SC

> **Prepared:** April 7, 2026
> **Stack:** Next.js 15 (App Router)
> **Scope:** Metadata API setup, Open Graph tags, Twitter Cards, structured data, per-page SEO

---

## What This Covers

"Meta tags" are invisible HTML elements that control:

1. **How the site appears in Google search results** (title, description)
2. **How links look when shared on social media** (image, headline, summary)
3. **How search engines understand the business** (structured data / schema markup)

Next.js has a built-in Metadata API that handles all of this server-side — meaning the tags are baked into the HTML before it reaches Google or Facebook. This is a major upgrade from the current SPA approach where meta tags are injected client-side via JavaScript (which crawlers can miss).

---

## Architecture

### 1. Global Defaults (`app/layout.tsx`)

Set site-wide defaults that every page inherits automatically. These act as fallbacks — any page can override them.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://restorationroofingsc.com'),
  title: {
    default: 'Restoration Roofing SC | Roof Repair & Replacement in Columbia, SC',
    template: '%s | Restoration Roofing SC',
  },
  description:
    'Trusted roofing contractor in Columbia, SC. Residential & commercial roof repair, replacement, storm damage restoration, and free inspections. Licensed, insured, 5-star rated.',
  keywords: [
    'roofing contractor Columbia SC',
    'roof repair Columbia SC',
    'roof replacement South Carolina',
    'storm damage roof repair',
    'restoration roofing',
  ],
  authors: [{ name: 'Restoration Roofing SC' }],
  creator: 'Restoration Roofing SC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Restoration Roofing SC',
    images: [
      {
        url: '/images/og-default.jpg', // 1200x630 branded image
        width: 1200,
        height: 630,
        alt: 'Restoration Roofing SC — Trusted Roofing in Columbia, SC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    // Add @handle if/when the business has a Twitter/X account
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when accounts are set up:
    // google: 'verification-code-here',
    // yandex: 'verification-code-here',
  },
}
```

**What this gives you:** Every page on the site automatically has a professional title, description, and social sharing image — even if we forget to add page-specific meta.

---

### 2. Per-Page Metadata (Static Pages)

Each page exports its own `metadata` object that overrides the defaults. The `title.template` from the layout automatically appends `| Restoration Roofing SC`.

```tsx
// app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roofing Services', // Renders as: "Roofing Services | Restoration Roofing SC"
  description:
    'Full-service roofing in Columbia, SC — residential, commercial, storm damage repair, roof replacement, and free inspections.',
  openGraph: {
    title: 'Roofing Services — Restoration Roofing SC',
    description: 'Residential & commercial roofing services in Columbia, SC.',
    images: [{ url: '/images/og-services.jpg' }],
  },
}
```

---

### 3. Dynamic Metadata (Blog Posts, Service Area Pages)

For pages generated from data (blog posts, city-specific service pages), use `generateMetadata()`:

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage }],
    },
  }
}
```

---

### 4. Structured Data (JSON-LD)

Structured data tells Google *what the business is* — not just what's on the page. This powers rich results (star ratings, business hours, service areas in search).

Create a reusable component:

```tsx
// components/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

Then use it in pages:

```tsx
// app/layout.tsx — site-wide business schema
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Restoration Roofing SC',
  url: 'https://restorationroofingsc.com',
  telephone: '+1-803-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Columbia',
    addressRegion: 'SC',
    postalCode: '29201',
  },
  areaServed: ['Columbia SC', 'Lexington SC', 'Irmo SC', 'Chapin SC'],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '150',
  },
}} />
```

**Structured data types to implement:**
| Schema Type | Where | Why |
|---|---|---|
| `RoofingContractor` | Layout (global) | Business identity, hours, contact |
| `LocalBusiness` | Layout (global) | Google Maps / local pack eligibility |
| `Service` | Each service page | Individual service descriptions |
| `FAQPage` | FAQ sections | FAQ rich results in search |
| `Article` / `BlogPosting` | Blog posts | Article rich results |
| `BreadcrumbList` | All pages | Breadcrumb navigation in search results |
| `Review` | Testimonials page | Star ratings in search |

---

### 5. Additional SEO Files

These are auto-generated by Next.js from simple config:

| File | Purpose | Implementation |
|---|---|---|
| `app/sitemap.ts` | XML sitemap for search engines | Export a function that returns all page URLs |
| `app/robots.ts` | Crawl rules | Allow all, point to sitemap URL |
| `app/manifest.ts` | PWA manifest | App name, colors, icons |
| `app/favicon.ico` + `app/icon.tsx` | Favicons | Place files in `app/` directory |

```tsx
// app/sitemap.ts
export default async function sitemap() {
  const staticPages = [
    '', '/services', '/about', '/contact', '/gallery',
    '/faq', '/testimonials', '/blog',
  ].map((route) => ({
    url: `https://restorationroofingsc.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const blogPosts = await getAllPosts()
  const blogPages = blogPosts.map((post) => ({
    url: `https://restorationroofingsc.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
```

---

## Page-by-Page Meta Checklist

Every page needs these filled in before launch:

| Page | Title | Description | OG Image | Schema |
|---|---|---|---|---|
| Homepage | `Restoration Roofing SC \| Roof Repair & Replacement in Columbia, SC` | Full description with keywords | Branded hero image | RoofingContractor, LocalBusiness |
| Services | `Roofing Services` | List key services + location | Services collage | Service (per service) |
| About | `About Us` | Company story, credentials | Team photo | Organization |
| Contact | `Contact Us \| Free Roof Inspection` | CTA-focused description | Contact/office image | LocalBusiness (with contact point) |
| Gallery | `Project Gallery` | Showcase description | Best project photo | ImageGallery |
| FAQ | `Frequently Asked Questions` | Common roofing questions | Branded | FAQPage |
| Testimonials | `Customer Reviews` | Social proof description | Review screenshot | Review, AggregateRating |
| Blog (index) | `Roofing Blog` | What topics are covered | Branded | Blog |
| Blog (post) | `{Post Title}` | `{Post Excerpt}` | Post cover image | BlogPosting |
| Service Areas | `Roofing in {City}, SC` | City-specific description | City-relevant image | LocalBusiness (per city) |

---

## OG Image Requirements

Create these branded images (1200x630px, JPG or PNG):

- [ ] `og-default.jpg` — General branded image (logo + tagline + hero photo)
- [ ] `og-services.jpg` — Services-focused
- [ ] `og-about.jpg` — Team / company
- [ ] `og-contact.jpg` — Contact CTA
- [ ] `og-gallery.jpg` — Best project photo
- [ ] `og-blog.jpg` — Blog-branded default

**Optional (Phase 2):** Use `next/og` (ImageResponse API) to auto-generate OG images for blog posts with the post title overlaid on a branded template.

---

## Implementation Order

1. **Set up global defaults** in `app/layout.tsx` — immediate baseline coverage
2. **Add `JsonLd` component** — reusable across all pages
3. **Wire up `sitemap.ts` and `robots.ts`** — let search engines discover pages
4. **Add per-page metadata** to each route — work through the checklist above
5. **Create OG images** — branded sharing images for each major page
6. **Add structured data** per page — RoofingContractor, FAQPage, etc.
7. **Test everything** — use Google Rich Results Test, Facebook Sharing Debugger, Twitter Card Validator
8. **Submit sitemap** to Google Search Console after launch

---

## Validation & Testing Tools

After implementation, verify with:

- **Google Rich Results Test** — validates structured data
- **Google Search Console** — submit sitemap, monitor indexing
- **Facebook Sharing Debugger** — preview OG tags for Facebook/LinkedIn
- **Twitter Card Validator** — preview Twitter card appearance
- **Lighthouse SEO audit** — built into Chrome DevTools
- **Schema.org Validator** — validates JSON-LD syntax

---

## Notes

- The `metadataBase` URL should be updated to the final production domain once DNS is configured
- Phone number, address, and review counts in structured data should be pulled from a central config so they stay in sync
- The `title.template` pattern means you only write the unique part of each page title — the brand name is appended automatically
- All of this is server-rendered with Next.js — no client-side JavaScript required for meta tags to work
