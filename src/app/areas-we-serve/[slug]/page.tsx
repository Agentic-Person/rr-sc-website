import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, SERVICES, COMPANY, IMAGES, TESTIMONIALS, SITE_URL } from "@/lib/data";
import { JsonLdScript } from "@/components/shared";
import { LocationDetailContent } from "./location-detail-content";
import { getNearbyLocations, getFeaturedServicesForLocation } from "@/lib/linking";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);
  if (!location) {
    return { title: "Location Not Found" };
  }
  return {
    title: `Roofing Services in ${location.name}, SC | Restoration Roofing SC`,
    description: `Expert roofing contractor serving ${location.name}, South Carolina. Roof installation, repair, storm damage, and insurance claims. Call (843) 306-2939.`,
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const heroImage =
    location.image ||
    (location.isBarrierIsland ? IMAGES.heroHomepage : IMAGES.heroAbout);
  const localTestimonials = TESTIMONIALS.filter((t) =>
    t.location
      ?.toLowerCase()
      .includes(location.name.toLowerCase().split(" ")[0])
  );
  const nearbyLocations = getNearbyLocations(location, LOCATIONS, 6);
  const featuredServices = getFeaturedServicesForLocation(location, SERVICES, 6);

  const locationUrl = `${SITE_URL}/areas-we-serve/${location.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "LocalBusiness"],
    "@id": `${locationUrl}#business`,
    name: `${COMPANY.fullName} – ${location.name}, SC`,
    description: `Expert roofing contractor serving ${location.name}, South Carolina. ${location.description.slice(0, 150)}`,
    url: locationUrl,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "75 Port City Landing, Suite 110",
      addressLocality: "Mount Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${location.name}, SC`,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.8009,
      longitude: -79.9048,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Roofing Services in ${location.name}, SC`,
      itemListElement: featuredServices.map((svc, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: svc.title,
          description: svc.description,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Serve",
        item: `${SITE_URL}/areas-we-serve`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${location.name}, SC`,
        item: locationUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />

      {/*
        PageHero and CTABanner are rendered inside LocationDetailContent
        so they have access to LanguageContext for bilingual switching.
        We pass heroImage so the server component can resolve the image path.
      */}
      <LocationDetailContent
        location={location}
        heroImage={heroImage}
        localTestimonials={localTestimonials}
        nearbyLocations={nearbyLocations}
        featuredServices={featuredServices}
      />
    </>
  );
}
