import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, IMAGES, COMPANY, LOCATIONS, SITE_URL } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, JsonLdScript } from "@/components/shared";
import { ServiceHubContent } from "./service-hub-content";
import { ServiceDetailContent } from "./service-detail-content";
import { getRelatedServices, getServiceAreaLinks } from "@/lib/linking";
import {
  AlertTriangle, Phone,
} from "lucide-react";

// --- Hub configuration ---
const hubConfig: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string;
    category: string;
    intro: string;
  }
> = {
  roofing: {
    title: "Roofing Services",
    subtitle:
      "Complete residential and commercial roofing solutions built to withstand Charleston's coastal climate.",
    image: IMAGES.heroResidential,
    category: "roofing",
    intro: "Charleston's coastal environment demands roofing systems that can withstand hurricane-force winds, resist salt air corrosion, and endure intense UV radiation. At Restoration Roofing, every installation, repair, and maintenance service we provide is specifically tailored for the unique challenges of Lowcountry living. Whether you need a complete roof replacement on your Mount Pleasant home or emergency leak repair after a summer thunderstorm, our experienced team delivers quality craftsmanship backed by manufacturer warranties and our personal guarantee.",
  },
  gutters: {
    title: "Gutter Services",
    subtitle:
      "Seamless gutter installation and repair designed for Charleston's 51 inches of annual rainfall.",
    image: IMAGES.heroResidential,
    category: "gutters",
    intro: "With an average of 51 inches of rainfall annually — well above the national average — properly functioning gutters are essential for every Charleston-area home. Our seamless gutter systems are custom-fabricated on-site to fit your home perfectly, eliminating the joints and seams where traditional gutters fail. From installation to repair, we ensure your gutter system effectively manages water flow and protects your foundation, landscaping, and exterior.",
  },
  "storm-damage": {
    title: "Storm & Hurricane Damage",
    subtitle:
      "24/7 emergency storm damage response and complete restoration for Charleston-area homes.",
    image: IMAGES.heroStormDamage,
    category: "storm",
    intro: "When a hurricane or severe storm damages your roof, you need a contractor who responds immediately and handles the entire restoration process. From emergency tarping to insurance claim documentation to final repairs, Restoration Roofing has been helping Charleston-area homeowners recover from storm damage since our founding. We're not storm chasers — we're your neighbors, and we'll be here long after the storm passes.",
  },
};

const HUB_SLUGS = Object.keys(hubConfig);

// --- Static params: hub slugs + all individual service slugs ---
export function generateStaticParams() {
  const serviceSlugs = SERVICES.map((s) => ({ slug: s.slug }));
  const hubSlugs = HUB_SLUGS.map((slug) => ({ slug }));
  return [...hubSlugs, ...serviceSlugs];
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Hub page
  const hub = hubConfig[slug];
  if (hub) {
    return {
      title: `${hub.title} | Restoration Roofing SC - Charleston, SC`,
      description: hub.subtitle,
    };
  }

  // Service detail page
  const service = SERVICES.find((s) => s.slug === slug);
  if (service) {
    return {
      title: `${service.title} | Restoration Roofing SC - Charleston, SC`,
      description: service.description,
    };
  }

  return { title: "Service Not Found" };
}

// --- Category labels for breadcrumbs ---
const categoryLabels: Record<string, { label: string; href: string }> = {
  roofing: { label: "Roofing Services", href: "/services/roofing" },
  gutters: { label: "Gutter Services", href: "/services/gutters" },
  storm: { label: "Storm Damage", href: "/services/storm-damage" },
};

// --- Page component ---
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ===== HUB PAGE =====
  const hub = hubConfig[slug];
  if (hub) {
    const services = SERVICES.filter((s) => s.category === hub.category);
    const breadcrumbs = [{ label: "Services" }, { label: hub.title }];

    return (
      <>
        <PageHero
          title={hub.title}
          subtitle={hub.subtitle}
          body={hub.intro}
          image={hub.image}
          breadcrumbs={breadcrumbs}
        />

        {/* Services grid */}
        <section className="section-padding bg-linen">
          <div className="container">
            <SectionHeader
              eyebrow={hub.title}
              title={`Our ${hub.title}`}
              subtitle="Click on any service below to learn more about how we can help protect your home."
            />

            <ServiceHubContent services={services} />
          </div>
        </section>

        <CTABanner
          title={`Need ${hub.title}?`}
          subtitle="Get a free, no-obligation estimate from Charleston's most trusted roofing team. We respond same-day."
        />
      </>
    );
  }

  // ===== SERVICE DETAIL PAGE =====
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const catInfo = categoryLabels[service.category];
  const relatedServices = getRelatedServices(service, SERVICES, 4);
  const serviceAreaLinks = getServiceAreaLinks(service, LOCATIONS, 8);

  const heroImage =
    service.category === "storm"
      ? IMAGES.heroStormDamage
      : service.category === "roofing"
        ? IMAGES.heroResidential
        : IMAGES.heroHomepage;

  const breadcrumbs = [
    { label: "Services" },
    { label: catInfo.label, href: catInfo.href },
    { label: service.shortTitle },
  ];

  const serviceUrl = `${SITE_URL}/services/${service.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: service.title,
    description: service.description,
    url: serviceUrl,
    serviceType: service.shortTitle,
    provider: {
      "@type": "RoofingContractor",
      "@id": `${SITE_URL}/#business`,
      name: COMPANY.fullName,
      telephone: COMPANY.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1261 Pearwood Ct",
        addressLocality: "Mount Pleasant",
        addressRegion: "SC",
        postalCode: "29464",
        addressCountry: "US",
      },
    },
    areaServed: LOCATIONS.map((l) => ({
      "@type": "City",
      name: `${l.name}, SC`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features.map((feature, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: feature,
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
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: catInfo.label,
        item: `${SITE_URL}${catInfo.href}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: service.shortTitle,
        item: serviceUrl,
      },
    ],
  };

  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLdScript data={faqJsonLd} />}

      <PageHero
        title={service.title}
        subtitle={service.description}
        image={heroImage}
        breadcrumbs={breadcrumbs}
      />

      {/* Emergency Banner for Storm Services */}
      {service.emergencyInfo && (
        <div className="bg-red-700 text-white py-4">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 shrink-0 animate-pulse" />
              <div>
                <p className="font-semibold text-sm">
                  24/7 Emergency Service
                </p>
                <p className="text-xs text-white/80">
                  {service.emergencyInfo}
                </p>
              </div>
            </div>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="bg-white text-red-700 font-bold px-5 py-2 rounded-md text-sm hover:bg-white/90 transition-colors shrink-0"
            >
              Call {COMPANY.phone} Now
            </a>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <ServiceDetailContent
                service={service}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Service Image */}
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={service.image}
                    alt={service.shortTitle}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>

                {/* CTA Card */}
                <div className="bg-navy rounded-lg p-6 text-white">
                  <h3 className="font-display text-lg font-semibold mb-2">
                    Get a Free Estimate
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Schedule your free, no-obligation inspection today. We
                    respond same-day.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-amber w-full py-3 rounded-md text-sm text-center block mb-3"
                  >
                    Request Free Estimate
                  </Link>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-md border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {COMPANY.phone}
                  </a>
                  <p className="text-xs text-white/50 text-center mt-3">
                    24/7 Emergency Service Available
                  </p>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-linen rounded-lg p-5">
                    <h3 className="font-display text-base font-semibold text-navy mb-3">
                      Related Services
                    </h3>
                    <ul className="space-y-2">
                      {relatedServices.map((rs) => (
                        <li key={rs.slug}>
                          <Link
                            href={`/services/${rs.slug}`}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-amber transition-colors py-1"
                          >
                            <span className="w-3.5 h-3.5 text-amber">&#8594;</span>
                            {rs.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Service Areas */}
                <div className="bg-linen rounded-lg p-5">
                  <h3 className="font-display text-base font-semibold text-navy mb-3">
                    We Serve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreaLinks.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/areas-we-serve/${loc.slug}`}
                        className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1.5 rounded border border-border/50 text-gray-700 hover:text-amber hover:border-amber/30 transition-colors"
                      >
                        {loc.name}
                      </Link>
                    ))}
                    <Link
                      href="/areas-we-serve"
                      className="inline-flex items-center gap-1 text-xs text-amber font-medium px-2.5 py-1.5"
                    >
                      +{LOCATIONS.length - serviceAreaLinks.length} more
                    </Link>
                  </div>
                </div>

                {/* Financing CTA */}
                <div className="bg-sage/10 border border-sage/20 rounded-lg p-5">
                  <h3 className="font-display text-base font-semibold text-navy mb-2">
                    Flexible Financing
                  </h3>
                  <p className="text-xs text-gray-700 mb-3">
                    We offer financing options to make your roofing project
                    affordable. Low monthly payments available.
                  </p>
                  <Link
                    href="/financing"
                    className="text-sm text-amber font-semibold hover:underline flex items-center gap-1"
                  >
                    Learn About Financing &#8594;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Service Areas — full-width link grid for crawlability */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow="Service Area"
            title="Available Across the Lowcountry"
            subtitle={`We bring expert ${service.shortTitle.toLowerCase()} to every community throughout the Charleston metro area and beyond.`}
          />
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/areas-we-serve/${loc.slug}`}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-border/50 text-sm text-gray-700 font-medium hover:bg-amber hover:text-white hover:border-amber transition-colors shadow-sm"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={`Ready for ${service.shortTitle}?`}
        subtitle="Contact us today for a free estimate. We serve Charleston, Mount Pleasant, and the entire Lowcountry."
      />
    </>
  );
}
