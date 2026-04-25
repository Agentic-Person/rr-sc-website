import type { Metadata } from "next";
import { LOCATIONS, COMPANY } from "@/lib/data";
import { JsonLdScript } from "@/components/shared";
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

      {/*
        PageHero and CTABanner are rendered inside AreasWeServeContent
        so they have access to the LanguageContext for bilingual switching.
      */}
      <AreasWeServeContent
        barrierIslands={barrierIslands}
        historicCities={historicCities}
        otherCities={otherCities}
      />
    </>
  );
}
