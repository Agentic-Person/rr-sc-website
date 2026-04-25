"use client";

import Link from "next/link";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import { COMPANY, IMAGES, SERVICES, LOCATIONS, TESTIMONIALS, PROCESS_STEPS, BLOG_POSTS } from "@/lib/data";
import { SectionHeader, StatsBar, TrustBadges, StarRating } from "@/components/shared";
import { FadeIn } from "@/components/FadeIn";
import {
  Phone, ArrowRight, Shield, FileCheck, Hammer, Search,
  Home as HomeIcon, Wrench, Droplets, Settings, Layers, Square, Gem, Building, Sun, SunDim,
  CloudLightning, ArrowDownToLine, PanelLeft, Star, CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ---------------------------------------------------------------------------
// Translation type + strings
// ---------------------------------------------------------------------------
interface HomeStrings {
  heroRating: string;
  heroH1a: string;
  heroH1b: string;
  heroSubtitle: string;
  heroCtaEstimate: string;
  heroBadgeLicensed: string;
  heroBadgeEmergency: string;
  heroBadgeFamily: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesLearnMore: string;
  servicesViewAll: string;
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonialsReadAll: string;
  locationsEyebrow: string;
  locationsTitle: string;
  locationsSubtitle: string;
  locationsViewAll: string;
  blogEyebrow: string;
  blogTitle: string;
  blogSubtitle: string;
  blogReadMore: string;
}

const HOME_EN: HomeStrings = {
  // Hero
  heroRating: `${COMPANY.googleRating} Stars on Google · ${COMPANY.googleReviewCount}+ Reviews`,
  heroH1a: "Charleston's Most Trusted",
  heroH1b: "Roofing Experts",
  heroSubtitle:
    "Family-owned roofing contractor protecting Lowcountry homes since 2020. From hurricane damage repair to complete roof replacements — we handle it all, including your insurance claim.",
  heroCtaEstimate: "Get Your Free Estimate",
  heroBadgeLicensed: "Licensed & Insured",
  heroBadgeEmergency: "24/7 Emergency",
  heroBadgeFamily: "Family Owned & Operated",

  // Services section
  servicesEyebrow: "Our Services",
  servicesTitle: "Comprehensive Roofing Solutions for Coastal South Carolina",
  servicesSubtitle:
    "From residential roof replacements to commercial flat roofing, we deliver expert craftsmanship built to withstand Charleston's unique coastal challenges.",
  servicesLearnMore: "Learn More",
  servicesViewAll: "View All Services",

  // Process section
  processEyebrow: "Our Process",
  processTitle: "Simple, Transparent, Stress-Free",
  processSubtitle:
    "We take the complexity out of roofing. From your first call to the final cleanup, here's how we make it easy.",

  // Testimonials section
  testimonialsEyebrow: "Customer Reviews",
  testimonialsTitle: "What Our Customers Say",
  testimonialsSubtitle:
    "Don't just take our word for it. Here's what Charleston-area homeowners say about working with Restoration Roofing.",
  testimonialsReadAll: "Read All Reviews",

  // Locations section
  locationsEyebrow: "Service Areas",
  locationsTitle: "Proudly Serving 21 Communities Across the Lowcountry",
  locationsSubtitle:
    "From historic downtown Charleston to the barrier islands, we're your local roofing experts.",
  locationsViewAll: "View All 21 Service Areas",

  // Blog section
  blogEyebrow: "Roofing Resources",
  blogTitle: "Expert Advice for Charleston Homeowners",
  blogSubtitle:
    "Stay informed with the latest roofing tips, maintenance guides, and industry insights from our team.",
  blogReadMore: "Read More Articles",
};

const HOME_ES: HomeStrings = {
  // Hero
  heroRating: `${COMPANY.googleRating} estrellas en Google · ${COMPANY.googleReviewCount}+ reseñas`,
  heroH1a: "Los Expertos en Techado",
  heroH1b: "de Mayor Confianza en Charleston",
  heroSubtitle:
    "Empresa familiar de techado protegiendo hogares del Lowcountry desde 2020. Desde reparación de daños por huracanes hasta reemplazos completos de techo — lo manejamos todo, incluyendo su reclamación de seguro.",
  heroCtaEstimate: "Obtenga su Presupuesto Gratuito",
  heroBadgeLicensed: "Con licencia y asegurada",
  heroBadgeEmergency: "Emergencias 24/7",
  heroBadgeFamily: "Empresa Familiar",

  // Services section
  servicesEyebrow: "Nuestros Servicios",
  servicesTitle: "Soluciones Completas de Techado para el Sur de Carolina del Sur",
  servicesSubtitle:
    "Desde reemplazos de techos residenciales hasta techado plano comercial, ofrecemos una artesanía experta diseñada para resistir los desafíos costeros únicos de Charleston.",
  servicesLearnMore: "Más información",
  servicesViewAll: "Ver todos los servicios",

  // Process section
  processEyebrow: "Nuestro Proceso",
  processTitle: "Sencillo, Transparente y Sin Estrés",
  processSubtitle:
    "Eliminamos la complejidad del techado. Desde su primera llamada hasta la limpieza final, así es como lo hacemos fácil.",

  // Testimonials section
  testimonialsEyebrow: "Reseñas de Clientes",
  testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
  testimonialsSubtitle:
    "No se quede solo con nuestra palabra. Esto es lo que dicen los propietarios del área de Charleston sobre trabajar con Restoration Roofing.",
  testimonialsReadAll: "Leer todas las reseñas",

  // Locations section
  locationsEyebrow: "Áreas de Servicio",
  locationsTitle: "Atendemos con orgullo a 21 comunidades del Lowcountry",
  locationsSubtitle:
    "Desde el histórico centro de Charleston hasta las islas costeras, somos sus expertos locales en techado.",
  locationsViewAll: "Ver las 21 áreas de servicio",

  // Blog section
  blogEyebrow: "Recursos de Techado",
  blogTitle: "Consejos Expertos para Propietarios de Charleston",
  blogSubtitle:
    "Manténgase informado con los últimos consejos sobre techado, guías de mantenimiento e información del sector de nuestro equipo.",
  blogReadMore: "Leer más artículos",
};

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ElementType> = {
  Home: HomeIcon, Wrench, Droplets, Search, Settings, Shield, Layers, Square, Gem, Building,
  Sun, SunDim, CloudLightning, ArrowDownToLine, PanelLeft, Hammer, FileCheck,
};

const processImages = [
  "/images/sc-process-01-inspection.webp",
  "/images/sc-process-02-consultation.webp",
  "/images/sc-process-03-insurance.webp",
  "/images/sc-process-04-installation-v5.webp",
  "/images/sc-process-05-walkthrough.webp",
  "/images/sc-process-06-checkin.webp",
];

// ---------------------------------------------------------------------------
// Section components (receive translated strings via props)
// ---------------------------------------------------------------------------

function HeroSection({ s }: { s: HomeStrings }) {
  return (
    <section className="relative min-h-[85svh] md:min-h-[90svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroHomepage}
          alt="Beautiful Lowcountry home with new roof in Charleston, SC"
          fill
          priority
          sizes="100vw"
          quality={85}
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
            <span className="text-sm text-amber font-medium">{s.heroRating}</span>
          </FadeIn>

          <FadeIn delay={0.2} y={30} inView={false}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              {s.heroH1a}{" "}
              <span className="text-amber">{s.heroH1b}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} y={30} inView={false}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              {s.heroSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={30} inView={false}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-amber px-8 py-4 rounded-md text-base inline-flex items-center gap-2"
            >
              {s.heroCtaEstimate}
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
              {s.heroBadgeLicensed}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber" />
              {s.heroBadgeEmergency}
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-amber" />
              {s.heroBadgeFamily}
            </span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ s }: { s: HomeStrings }) {
  const featured = SERVICES.filter(svc =>
    ["roof-installation", "roof-repairs", "metal-roofing", "storm-damage-repair", "gutter-installation", "gutter-repairs"].includes(svc.slug)
  );

  return (
    <section id="services" className="section-padding bg-linen">
      <div className="container">
        <SectionHeader
          eyebrow={s.servicesEyebrow}
          title={s.servicesTitle}
          subtitle={s.servicesSubtitle}
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
                      <Image
                        src={service.image}
                        alt={service.shortTitle}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                        {s.servicesLearnMore} <ArrowRight className="w-4 h-4" />
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
            {s.servicesViewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ s }: { s: HomeStrings }) {
  return (
    <section id="our-process" className="bg-white">
      {/* Banner — eyebrow + title only, centered */}
      <div className="relative overflow-hidden py-14 md:py-20">
        <Image
          src="/images/nova-city-centreville.webp"
          alt="Charleston-area neighborhood"
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/20" />
        <div className="container relative z-10 text-center">
          <span className="inline-block font-bold uppercase mb-4 text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] text-amber">
            {s.processEyebrow}
          </span>
          <h2 className="font-display font-bold section-title text-white">
            {s.processTitle}
          </h2>
        </div>
      </div>

      {/* Decorator + subtitle + cards */}
      <div className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block h-px w-12 bg-amber/40" />
              <Image
                src="/images/rr-sc-ridge-logo-v3.webp"
                alt=""
                aria-hidden="true"
                width={80}
                height={20}
                className="h-5 w-auto opacity-80"
                style={{ mixBlendMode: "multiply" }}
              />
              <span className="block h-px w-12 bg-amber/40" />
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
              {s.processSubtitle}
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
                  <Image
                    src={processImages[i]}
                    alt={step.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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

function TestimonialsSection({ s }: { s: HomeStrings }) {
  return (
    <section className="section-padding bg-linen">
      <div className="container">
        <SectionHeader
          eyebrow={s.testimonialsEyebrow}
          title={s.testimonialsTitle}
          subtitle={s.testimonialsSubtitle}
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
            {s.testimonialsReadAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LocationsSection({ s }: { s: HomeStrings }) {
  const featured = LOCATIONS.filter(l =>
    ["charleston", "mount-pleasant", "summerville", "north-charleston", "daniel-island", "isle-of-palms", "folly-beach", "james-island"].includes(l.slug)
  );

  return (
    <section id="areas-we-serve">
      {/* Banner header with background image */}
      <div className="relative overflow-hidden py-14 md:py-20">
        <Image
          src={IMAGES.heroAbout}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/25" />
        <div className="container relative z-10">
          <SectionHeader
            eyebrow={s.locationsEyebrow}
            title={s.locationsTitle}
            subtitle={s.locationsSubtitle}
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
                    <Image
                      src={loc.image}
                      alt={`${loc.name}, South Carolina`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              {s.locationsViewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSection({ s }: { s: HomeStrings }) {
  return (
    <section className="section-padding bg-linen-dark">
      <div className="container">
        <SectionHeader
          eyebrow={s.blogEyebrow}
          title={s.blogTitle}
          subtitle={s.blogSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-amber/30 card-halo transition-all duration-300 ring-1 ring-black/[0.03]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
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
            {s.blogReadMore} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Root client component
// ---------------------------------------------------------------------------
export default function HomeContent() {
  const { lang } = useLanguage();
  const s = lang === "es" ? HOME_ES : HOME_EN;

  return (
    <>
      <ChatWidget />

      <HeroSection s={s} />
      <StatsBar />
      <TrustBadges />
      <ServicesSection s={s} />
      <ProcessSection s={s} />
      <TestimonialsSection s={s} />
      <LocationsSection s={s} />
      <BlogPreviewSection s={s} />
    </>
  );
}
