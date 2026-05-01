import { COMPANY, LOCATIONS } from "@/lib/data";
import { JsonLdScript } from "@/components/shared";
import HomeContent from "./HomeContent";

export const metadata = {
  title: "Charleston Roofing Contractor | Restoration Roofing SC",
  description:
    "Family-owned roofing contractor in Charleston, SC. Expert roof installation, repair, storm damage, and gutter services. Free estimates. Call (843) 306-2939.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: COMPANY.fullName,
    url: "https://www.restorationroofingsc.com",
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "75 Port City Landing, Suite 110",
      addressLocality: "Mount Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.8009,
      longitude: -79.9048,
    },
    areaServed: LOCATIONS.map(l => ({
      "@type": "City",
      name: l.name + ", SC",
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.googleRating,
      reviewCount: COMPANY.googleReviewCount,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    description: COMPANY.description,
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HomeContent />
    </>
  );
}
