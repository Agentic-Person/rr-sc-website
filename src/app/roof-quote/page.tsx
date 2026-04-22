import type { Metadata } from "next";
import RoofQuoteContent from "./roof-quote-content";
import { COMPANY, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Instant Roof Quote | Restoration Roofing SC",
  description:
    "Get a real roof price estimate in under 60 seconds — no pressure, no appointment, no surprises. Charleston's most transparent roofing quote process. Licensed, insured, family-owned.",
  openGraph: {
    title: "Get an Instant Roof Quote | Restoration Roofing SC",
    description:
      "Most companies start with pressure. We start with transparency. Get a real estimate for your Lowcountry home — free, fast, no commitment.",
    url: `${SITE_URL}/roof-quote`,
    images: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/112751785/QzW5An8GggbtcG7rNRpiT7/hero-homepage-jkwKvpQJahreMKq2qj8Y5j.webp",
        width: 1200,
        height: 630,
        alt: "Restoration Roofing SC — Instant Roof Quote",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/roof-quote`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Instant Roof Quote | Restoration Roofing SC",
  description:
    "Get a transparent, no-pressure instant roof price estimate for your Charleston, SC home. Powered by satellite measurement technology.",
  url: `${SITE_URL}/roof-quote`,
  provider: {
    "@type": "RoofingContractor",
    name: COMPANY.fullName,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1261 Pearwood Ct",
      addressLocality: "Mount Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
    },
    url: SITE_URL,
    areaServed: "Charleston, SC Metro Area",
    priceRange: "$$",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Instant Roof Quote",
        item: `${SITE_URL}/roof-quote`,
      },
    ],
  },
};

export default function RoofQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoofQuoteContent />
    </>
  );
}
