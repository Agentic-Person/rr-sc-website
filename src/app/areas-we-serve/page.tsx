import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS, IMAGES, COMPANY } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, JsonLdScript } from "@/components/shared";
import { AreasWeServeContent } from "./areas-we-serve-content";

export const metadata: Metadata = {
  title: "Areas We Serve | Restoration Roofing SC - Charleston & Lowcountry",
  description:
    "Restoration Roofing serves 21 communities across the Charleston metro area and Lowcountry. Find your local roofing experts.",
};

export default function AreasWeServePage() {
  const barrierIslands = LOCATIONS.filter((l) => l.isBarrierIsland);
  const historicCities = LOCATIONS.filter(
    (l) => l.isHistoric && !l.isBarrierIsland
  );
  const otherCities = LOCATIONS.filter(
    (l) => !l.isBarrierIsland && !l.isHistoric
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Roofing Services - Charleston Metro Area",
    description:
      "Restoration Roofing serves 21 communities across the Charleston metro area and Lowcountry.",
    provider: {
      "@type": "RoofingContractor",
      name: COMPANY.fullName,
      telephone: COMPANY.phone,
    },
    areaServed: LOCATIONS.map((l) => ({
      "@type": "City",
      name: `${l.name}, SC`,
    })),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title="Areas We Serve"
        subtitle="Proudly serving 21 communities across the Charleston metropolitan area and the South Carolina Lowcountry."
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: "Areas We Serve" }]}
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              From the historic streets of downtown Charleston to the barrier
              islands of the Atlantic coast, Restoration Roofing provides expert
              roofing services tailored to each community&apos;s unique architecture,
              climate challenges, and building requirements. Based in Mount
              Pleasant, we understand the Lowcountry like no one else.
            </p>
          </div>
        </div>
      </section>

      <AreasWeServeContent
        barrierIslands={barrierIslands}
        historicCities={historicCities}
        otherCities={otherCities}
      />

      <CTABanner
        title="Don't See Your Area?"
        subtitle="We may still serve your community. Call us to discuss your roofing needs — we're happy to help."
      />
    </>
  );
}
