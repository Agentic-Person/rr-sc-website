import Link from "next/link";
import { COMPANY, IMAGES, SERVICES, LOCATIONS, TESTIMONIALS, PROCESS_STEPS, BLOG_POSTS } from "@/lib/data";
import { SectionHeader, StatsBar, TrustBadges, StarRating, JsonLdScript } from "@/components/shared";
import { FadeIn } from "@/components/FadeIn";
import {
  Phone, ArrowRight, ChevronRight, MapPin, Shield, Clock, FileCheck, Hammer, Search,
  Home as HomeIcon, Wrench, Droplets, Settings, Layers, Square, Gem, Building, Sun, SunDim,
  CloudLightning, ArrowDownToLine, PanelLeft, Star, CheckCircle2
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home: HomeIcon, Wrench, Droplets, Search, Settings, Shield, Layers, Square, Gem, Building,
  Sun, SunDim, CloudLightning, ArrowDownToLine, PanelLeft, Hammer, FileCheck,
};

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.heroHomepage}
          alt="Beautiful Lowcountry home with new roof in Charleston, SC"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/60 via-[#000000]/40 to-[#000000]/15" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 pl-6 md:pl-10 lg:pl-14">
        <div className="max-w-2xl">
          <FadeIn delay={0.1} inView={false}
            className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-1.5 mb-6"
          >
            <Star className="w-3.5 h-3.5 text-amber fill-amber" />
            <span className="text-sm text-amber font-medium">{COMPANY.googleRating} Stars on Google · {COMPANY.googleReviewCount}+ Reviews</span>
          </FadeIn>

          <FadeIn delay={0.2} y={30} inView={false}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Charleston&apos;s Most Trusted{" "}
              <span className="text-amber">Roofing Experts</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} y={30} inView={false}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Family-owned roofing contractor protecting Lowcountry homes since 2020. From hurricane damage repair to complete roof replacements — we handle it all, including your insurance claim.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={30} inView={false}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-amber px-8 py-4 rounded-md text-base inline-flex items-center gap-2"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {COMPANY.phone}
            </a>
          </FadeIn>

          <FadeIn delay={0.6} y={0} inView={false}
            className="flex items-center gap-6 mt-10 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber" />
              24/7 Emergency
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-amber" />
              Family Owned &amp; Operated
            </span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const featured = SERVICES.filter(s =>
    ["roof-installation", "roof-repairs", "metal-roofing", "storm-damage-repair", "gutter-installation", "gutter-repairs"].includes(s.slug)
  );

  return (
    <section id="services" className="section-padding bg-linen">
      <div className="container">
        <SectionHeader
          eyebrow="Our Services"
          title="Comprehensive Roofing Solutions for Coastal South Carolina"
          subtitle="From residential roof replacements to commercial flat roofing, we deliver expert craftsmanship built to withstand Charleston's unique coastal challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] || Shield;
            return (
              <FadeIn key={service.slug} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`}>
                  <article className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-border/40 hover:border-amber/30 transition-all duration-500 h-full flex flex-col ring-1 ring-black/[0.03]">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.shortTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 left-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5 text-navy" />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-semibold text-navy mb-2 group-hover:text-amber transition-colors">
                        {service.shortTitle}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                        {service.description.length > 140 ? service.description.slice(0, 140) + "..." : service.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber group-hover:gap-2.5 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services/roofing"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const processIconMap: Record<string, React.ElementType> = {
  Search, Shield, Home: HomeIcon, FileCheck, Hammer, Clock,
};

const processImages = [
  "/images/sc-process-01-inspection.webp",
  "/images/sc-process-02-consultation.webp",
  "/images/sc-process-03-insurance.webp",
  "/images/sc-process-04-installation-v5.webp",
  "/images/sc-process-05-walkthrough.webp",
  "/images/sc-process-06-checkin.webp",
];

function ProcessSection() {
  return (
    <section id="our-process" className="bg-white">
      {/* Banner — eyebrow + title only, centered */}
      <div className="relative overflow-hidden py-14 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/nova-city-centreville.webp"
          alt="Charleston-area neighborhood"
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/20" />
        <div className="container relative z-10 text-center">
          <span className="inline-block font-bold uppercase mb-4 text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] text-amber">
            Our Process
          </span>
          <h2 className="font-display font-bold section-title text-white">
            Simple, Transparent, Stress-Free
          </h2>
        </div>
      </div>

      {/* Decorator + subtitle + cards */}
      <div className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block h-px w-12 bg-amber/40" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rr-sc-ridge-logo-v3.webp"
                alt=""
                aria-hidden="true"
                className="h-5 w-auto opacity-80"
                style={{ mixBlendMode: "multiply" }}
              />
              <span className="block h-px w-12 bg-amber/40" />
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
              We take the complexity out of roofing. From your first call to the final cleanup, here&apos;s how we make it easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn
                key={step.step}
                delay={i * 0.1}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-amber/20 card-halo transition-all duration-500 flex flex-col ring-1 ring-black/[0.03]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={processImages[i]}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-semibold text-navy mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-padding bg-linen">
      <div className="container">
        <SectionHeader
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Don't just take our word for it. Here's what Charleston-area homeowners say about working with Restoration Roofing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <FadeIn
              key={t.name}
              delay={i * 0.08}
              className="bg-white rounded-xl border border-border/50 p-6 shadow-md hover:shadow-2xl hover:border-amber/30 card-halo transition-all duration-300 relative"
            >
              <span className="absolute top-3 right-4 font-display text-5xl text-amber/15 leading-none select-none">&ldquo;</span>
              <StarRating rating={t.rating} size="sm" />
              <p className="text-sm text-gray-800 leading-relaxed mt-3 mb-4 italic">
                &ldquo;{t.text.slice(0, 200)}{t.text.length > 200 ? "..." : ""}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-navy">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  {t.location && <div className="text-xs text-gray-600">{t.location}</div>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-amber transition-colors"
          >
            Read All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  const featured = LOCATIONS.filter(l =>
    ["charleston", "mount-pleasant", "summerville", "north-charleston", "daniel-island", "isle-of-palms", "folly-beach", "james-island"].includes(l.slug)
  );

  return (
    <section id="areas-we-serve">
      {/* Banner header with background image */}
      <div className="relative overflow-hidden py-14 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.heroAbout}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/25" />
        <div className="container relative z-10">
          <SectionHeader
            eyebrow="Service Areas"
            title="Proudly Serving 21 Communities Across the Lowcountry"
            subtitle="From historic downtown Charleston to the barrier islands, we're your local roofing experts."
            light
          />
        </div>
      </div>

      {/* Image card grid */}
      <div className="section-padding bg-linen">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featured.map((loc, i) => (
              <FadeIn key={loc.slug} delay={i * 0.05}>
                <Link href={`/areas-we-serve/${loc.slug}`}>
                  <div className="group relative h-44 md:h-52 rounded-xl overflow-hidden border border-border/50 shadow-md hover:border-amber/30 hover:shadow-xl transition-all duration-300 ring-1 ring-black/[0.03]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={loc.image}
                      alt={`${loc.name}, South Carolina`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-base md:text-lg font-bold text-white drop-shadow-md">
                          {loc.name}
                        </h3>
                        <p className="text-xs text-white/80 drop-shadow-md">{loc.county}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/areas-we-serve"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors"
            >
              View All 21 Service Areas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSection() {
  return (
    <section className="section-padding bg-linen-dark">
      <div className="container">
        <SectionHeader
          eyebrow="Roofing Resources"
          title="Expert Advice for Charleston Homeowners"
          subtitle="Stay informed with the latest roofing tips, maintenance guides, and industry insights from our team."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-amber/30 card-halo transition-all duration-300 ring-1 ring-black/[0.03]">
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded">{post.category}</span>
                      <span className="text-xs text-gray-600">{post.date}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy group-hover:text-amber transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-amber transition-colors"
          >
            Read More Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: COMPANY.fullName,
    url: "https://www.restorationroofingsc.com",
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1261 Pearwood Ct",
      addressLocality: "Mount Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.8468,
      longitude: -79.8203,
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

      <HeroSection />
      <StatsBar />
      <TrustBadges />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <LocationsSection />
      <BlogPreviewSection />
    </>
  );
}
