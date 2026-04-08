import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCATIONS, SERVICES, COMPANY, IMAGES, TESTIMONIALS } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, StarRating, JsonLdScript } from "@/components/shared";
import { LocationDetailContent } from "./location-detail-content";
import {
  Phone, ArrowRight, MapPin,
} from "lucide-react";

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
  const nearbyLocations = LOCATIONS.filter(
    (l) => l.slug !== location.slug && l.county === location.county
  ).slice(0, 6);
  const featuredServices = SERVICES.filter((s) =>
    [
      "roof-installation",
      "roof-repairs",
      "storm-damage",
      "metal-roofing",
      "gutter-installation",
      "gutter-repairs",
    ].includes(s.slug)
  );

  const breadcrumbs = [
    { label: "Areas We Serve", href: "/areas-we-serve" },
    { label: location.name },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Roofing Services in ${location.name}, SC`,
    description: `Expert roofing contractor serving ${location.name}, South Carolina. ${location.description.slice(0, 150)}`,
    provider: {
      "@type": "RoofingContractor",
      name: COMPANY.fullName,
      telephone: COMPANY.phone,
    },
    areaServed: {
      "@type": "City",
      name: `${location.name}, SC`,
    },
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title={`Roofing Services in ${location.name}, SC`}
        subtitle={`Expert roofing solutions tailored for ${location.name}'s unique architecture and coastal climate challenges.`}
        image={heroImage}
        breadcrumbs={breadcrumbs}
        compact
      />

      <LocationDetailContent
        location={location}
        localTestimonials={localTestimonials}
        nearbyLocations={nearbyLocations}
        featuredServices={featuredServices}
      />

      <CTABanner
        title={`Protect Your ${location.name} Home`}
        subtitle={`Get expert roofing services tailored for ${location.name}'s unique climate and architecture. Free estimates, 24/7 emergency service.`}
      />
    </>
  );
}
