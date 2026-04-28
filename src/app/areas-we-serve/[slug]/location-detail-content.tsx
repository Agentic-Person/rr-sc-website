"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Location, Service, Testimonial } from "@/lib/data";
import { COMPANY } from "@/lib/data";
import { SectionHeader, StarRating, PageHero, CTABanner } from "@/components/shared";
import {
  CheckCircle2, Phone, ArrowRight, MapPin, Home, AlertTriangle,
  Landmark, CloudRain, Users, Building2, Shield,
  History, TreePine, Waves, Sun, Wind, Droplets,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuoteWidget } from "@/contexts/QuoteWidgetContext";

// ── Spanish UI chrome ─────────────────────────────────────────────────────────
const ES = {
  // Page Hero
  heroTitle: (city: string) => `Servicios de Techado en ${city}, SC`,
  heroSubtitle: (city: string) =>
    `Soluciones expertas de techado adaptadas a la arquitectura única y los desafíos del clima costero de ${city}.`,
  // Breadcrumbs
  breadcrumbAreas: "Áreas que Atendemos",

  // CTA Banner
  ctaTitle: (city: string) => `Proteja su Hogar en ${city}`,
  ctaSubtitle: (city: string) =>
    `Obtenga servicios expertos de techado adaptados al clima y la arquitectura únicos de ${city}. Presupuestos gratuitos, servicio de emergencia 24/7.`,
  // Quick-facts sidebar
  quickFacts: "Datos Rápidos",
  county: "Condado",
  population: "Población",
  medianHome: "Valor Medio",
  type: "Tipo",
  typeBarrier: "Isla Barrera",
  typeHistoric: "Distrito Histórico",
  typeCommunity: "Comunidad",
  freeEstimateBtn: (city: string) => `Presupuesto Gratuito en ${city}`,

  // About section
  aboutEyebrow: (city: string) => `Acerca de ${city}`,
  aboutHeading: (city: string) =>
    `Su Empresa de Techado de Confianza en ${city}, Carolina del Sur`,

  // Section headings (data from location object stays in English)
  historyTitle: "Historia e Identidad",
  communityTitle: "Carácter Comunitario",
  landmarksTitle: "Lugares de Interés y Atracciones",

  // Housing & Architecture
  archEyebrow: "Arquitectura Local",
  archTitle: (city: string) => `Vivienda y Arquitectura en ${city}`,
  archSubtitle: (city: string) =>
    `Conocer el parque habitacional único de ${city} nos permite ofrecer soluciones de techado que protegen y complementan el carácter arquitectónico de su hogar.`,
  archOverviewTitle: "Descripción Arquitectónica",
  archOverviewFallback: (city: string) =>
    `${city} cuenta con una variada combinación de estilos de vivienda típicos del Lowcountry de Carolina del Sur, cada uno requiriendo enfoques especializados de techado.`,
  housingStylesTitle: "Estilos de Vivienda Comunes",
  neighborhoodTitle: "Destaque del Vecindario",

  // Weather & Storms
  weatherEyebrow: "Clima y Tormentas",
  weatherTitle: (city: string) => `Desafíos Climáticos en ${city}`,
  weatherSubtitle: (city: string) =>
    `Comprender los patrones climáticos de ${city} es esencial para elegir los materiales de techado adecuados y el plan de mantenimiento correcto.`,
  stormHistoryTitle: "Historial de Tormentas",
  stormFallback: (city: string) =>
    `${city} es susceptible a huracanes y tormentas tropicales, incluido el devastador huracán Hugo en 1989 y tormentas más recientes como Matthew (2016) e Ian (2022).`,
  statHurricane: "Huracán",
  statWinds: "Vientos 74+ mph",
  statStormSurge: "Marejada Ciclónica",
  statHighRisk: "Alto Riesgo",
  statModRisk: "Riesgo Moderado",
  statHumidity: "Humedad",
  statHumidityVal: "75-85% Prom.",
  statUV: "Índice UV",
  statUVVal: "Alto (8-10)",
  roofingChallengesTitle: "Desafíos de Techado",
  challengesFallback: (city: string) =>
    `El techado en ${city} enfrenta desafíos del clima costero, la humedad y la exposición a tormentas que requieren materiales y técnicas de instalación especializados.`,

  // Services
  servicesEyebrow: "Nuestros Servicios",
  servicesTitle: (city: string) => `Servicios de Techado en ${city}`,
  servicesSubtitle: (city: string, county: string) =>
    `Desde reparaciones urgentes por tormenta hasta reemplazos completos de techo, ofrecemos servicios integrales de techado en todo ${city} y ${county}.`,
  learnMore: "Saber Más",

  // Testimonials
  testimonialsEyebrow: "Opiniones de Clientes",
  testimonialsTitle: (city: string) =>
    `Lo que Dicen los Propietarios de ${city}`,
  testimonialsSubtitle:
    "Opiniones reales de sus vecinos que confían en Restoration Roofing.",
  homeowner: "Propietario/a",

  // Nearby areas
  nearbyEyebrow: "Áreas Cercanas",
  nearbyTitle: (city: string) => `También Atendemos Cerca de ${city}`,
  nearbySubtitle: (county: string) =>
    `Ofrecemos los mismos servicios expertos de techado a comunidades en todo ${county} y más allá.`,
  viewAll: "Ver las 21 Áreas de Servicio",
} as const;

// ── Animation preset ──────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5 },
};

// ── Main component ────────────────────────────────────────────────────────────
export function LocationDetailContent({
  location,
  heroImage,
  localTestimonials,
  nearbyLocations,
  featuredServices,
}: {
  location: Location;
  heroImage: string;
  localTestimonials: Testimonial[];
  nearbyLocations: Location[];
  featuredServices: Service[];
}) {
  const { lang } = useLanguage();
  const es = lang === "es";
  const { openRoofleWidget } = useQuoteWidget();

  const breadcrumbs = [
    {
      label: es ? ES.breadcrumbAreas : "Areas We Serve",
      href: "/areas-we-serve",
    },
    { label: location.name },
  ];

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={
          es
            ? ES.heroTitle(location.name)
            : `Roofing Services in ${location.name}, SC`
        }
        subtitle={
          es
            ? ES.heroSubtitle(location.name)
            : `Expert roofing solutions tailored for ${location.name}'s unique architecture and coastal climate challenges.`
        }
        image={heroImage}
        breadcrumbs={breadcrumbs}
      />

      {/* Community Overview with Hero Image */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Community Image */}
            <motion.div {...fadeUp} className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow-lg sticky top-24">
                <div className="relative w-full h-[300px] lg:h-[420px]">
                  <Image
                    src={location.image}
                    alt={`${location.name}, South Carolina`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="bg-navy p-5 text-white">
                  <h3 className="font-display text-lg font-semibold mb-3">
                    {es ? ES.quickFacts : "Quick Facts"}
                  </h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        {es ? ES.county : "County"}
                      </dt>
                      <dd className="font-medium mt-0.5">{location.county}</dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        {es ? ES.population : "Population"}
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.population}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        {es ? ES.medianHome : "Median Home"}
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.medianHomePrice}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        {es ? ES.type : "Type"}
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.isBarrierIsland
                          ? es ? ES.typeBarrier : "Barrier Island"
                          : location.isHistoric
                            ? es ? ES.typeHistoric : "Historic District"
                            : es ? ES.typeCommunity : "Community"}
                      </dd>
                    </div>
                  </dl>
                  {/* CTA */}
                  <div className="mt-5 space-y-2">
                    <button
                      onClick={openRoofleWidget}
                      className="btn-amber w-full py-3 rounded-md text-sm text-center block"
                    >
                      {es
                        ? ES.freeEstimateBtn(location.name)
                        : `Free Estimate in ${location.name}`}
                    </button>
                    <a
                      href={`tel:${COMPANY.phoneRaw}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* About */}
              <motion.div {...fadeUp}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-amber" />
                  <span className="text-xs uppercase tracking-widest text-amber font-semibold">
                    {es
                      ? ES.aboutEyebrow(location.name)
                      : `About ${location.name}`}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-navy mb-4">
                  {es
                    ? ES.aboutHeading(location.name)
                    : `Your Trusted Roofer in ${location.name}, South Carolina`}
                </h2>
                {/* location.description comes from data.ts — not translated */}
                <p className="text-gray-800 leading-relaxed text-[15px] mb-4">
                  {location.description}
                </p>
                {location.populationDetail && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {location.populationDetail}
                  </p>
                )}
              </motion.div>

              {/* History & Identity */}
              {location.historyIdentity && (
                <motion.div {...fadeUp}>
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-5 h-5 text-amber" />
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {es ? ES.historyTitle : "History & Identity"}
                    </h3>
                  </div>
                  <div className="bg-linen rounded-xl p-6 border-l-4 border-amber">
                    {/* location.historyIdentity from data.ts — not translated */}
                    <p className="text-gray-800 leading-relaxed text-[15px]">
                      {location.historyIdentity}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Community Character */}
              {location.communityCharacter && (
                <motion.div {...fadeUp}>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-amber" />
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {es ? ES.communityTitle : "Community Character"}
                    </h3>
                  </div>
                  {/* location.communityCharacter from data.ts — not translated */}
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {location.communityCharacter}
                  </p>
                </motion.div>
              )}

              {/* Notable Landmarks */}
              {location.landmarks.length > 0 && (
                <motion.div {...fadeUp}>
                  <div className="flex items-center gap-2 mb-4">
                    <Landmark className="w-5 h-5 text-amber" />
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {es
                        ? ES.landmarksTitle
                        : "Notable Landmarks & Attractions"}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* landmark names are proper nouns — not translated */}
                    {location.landmarks.map((landmark) => (
                      <span
                        key={landmark}
                        className="text-sm bg-amber/10 text-amber-dark px-4 py-2 rounded-full border border-amber/20 font-medium"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Housing & Architecture Section */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.archEyebrow : "Local Architecture"}
            title={
              es
                ? ES.archTitle(location.name)
                : `Housing & Architecture in ${location.name}`
            }
            subtitle={
              es
                ? ES.archSubtitle(location.name)
                : `Understanding ${location.name}'s unique housing stock helps us deliver roofing solutions that protect and complement your home's architectural character.`
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Architecture Description */}
            <motion.div {...fadeUp}>
              <div className="bg-white rounded-xl p-7 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {es ? ES.archOverviewTitle : "Architectural Overview"}
                  </h3>
                </div>
                {location.housingArchitecture ? (
                  /* location.housingArchitecture from data.ts — not translated */
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {location.housingArchitecture}
                  </p>
                ) : (
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {es
                      ? ES.archOverviewFallback(location.name)
                      : `${location.name} features a diverse mix of housing styles typical of the South Carolina Lowcountry, each requiring specialized roofing approaches.`}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Housing Styles Grid */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <div className="bg-white rounded-xl p-7 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {es ? ES.housingStylesTitle : "Common Housing Styles"}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* housingStyles are architectural terms — not translated */}
                  {location.housingStyles.map((style) => (
                    <div
                      key={style}
                      className="flex items-center gap-2 bg-linen rounded-lg px-4 py-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                      <span className="text-sm text-gray-800">{style}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Neighborhood Highlight */}
          <motion.div {...fadeUp} className="mt-8">
            <div className="bg-navy rounded-xl p-7 text-white">
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="w-5 h-5 text-amber" />
                <h3 className="font-display text-lg font-semibold">
                  {es ? ES.neighborhoodTitle : "Neighborhood Spotlight"}
                </h3>
              </div>
              {/* location.neighborhoodHighlight from data.ts — not translated */}
              <p className="text-white/80 leading-relaxed text-[15px]">
                {location.neighborhoodHighlight}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weather & Storm History */}
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.weatherEyebrow : "Weather & Storms"}
            title={
              es
                ? ES.weatherTitle(location.name)
                : `Weather Challenges in ${location.name}`
            }
            subtitle={
              es
                ? ES.weatherSubtitle(location.name)
                : `Understanding ${location.name}'s weather patterns is essential for choosing the right roofing materials and maintenance schedule.`
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Storm History */}
            <motion.div {...fadeUp}>
              <div className="bg-gradient-to-br from-navy to-[#0f2a38] rounded-xl p-7 text-white h-full">
                <div className="flex items-center gap-2 mb-4">
                  <CloudRain className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold">
                    {es ? ES.stormHistoryTitle : "Storm History"}
                  </h3>
                </div>
                {location.weatherStorms ? (
                  /* location.weatherStorms from data.ts — not translated */
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {location.weatherStorms}
                  </p>
                ) : (
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {es
                      ? ES.stormFallback(location.name)
                      : `${location.name} is susceptible to hurricanes and tropical storms, including the devastating Hurricane Hugo in 1989 and more recent storms like Matthew (2016) and Ian (2022).`}
                  </p>
                )}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Wind className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      {es ? ES.statHurricane : "Hurricane"}
                    </span>
                    <span className="text-sm font-semibold">
                      {es ? ES.statWinds : "Winds 74+ mph"}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Waves className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      {es ? ES.statStormSurge : "Storm Surge"}
                    </span>
                    <span className="text-sm font-semibold">
                      {location.isBarrierIsland
                        ? es ? ES.statHighRisk : "High Risk"
                        : es ? ES.statModRisk : "Moderate Risk"}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Droplets className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      {es ? ES.statHumidity : "Humidity"}
                    </span>
                    <span className="text-sm font-semibold">
                      {es ? ES.statHumidityVal : "75-85% Avg"}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Sun className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      {es ? ES.statUV : "UV Index"}
                    </span>
                    <span className="text-sm font-semibold">
                      {es ? ES.statUVVal : "High (8-10)"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Roofing Challenges Detail */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <div className="bg-linen rounded-xl p-7 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {es ? ES.roofingChallengesTitle : "Roofing Challenges"}
                  </h3>
                </div>
                {location.roofingChallengesDetail ? (
                  /* location.roofingChallengesDetail from data.ts — not translated */
                  <p className="text-gray-800 leading-relaxed text-[15px] mb-5">
                    {location.roofingChallengesDetail}
                  </p>
                ) : (
                  <p className="text-gray-800 leading-relaxed text-[15px] mb-5">
                    {es
                      ? ES.challengesFallback(location.name)
                      : `Roofing in ${location.name} faces challenges from coastal weather, humidity, and storm exposure that require specialized materials and installation techniques.`}
                  </p>
                )}
                <ul className="space-y-3">
                  {/* roofingChallenges items from data.ts — not translated */}
                  {location.roofingChallenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-800 leading-relaxed">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.servicesEyebrow : "Our Services"}
            title={
              es
                ? ES.servicesTitle(location.name)
                : `Roofing Services in ${location.name}`
            }
            subtitle={
              es
                ? ES.servicesSubtitle(location.name, location.county)
                : `From emergency storm repairs to complete roof replacements, we provide comprehensive roofing services throughout ${location.name} and ${location.county}.`
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {featuredServices.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-transparent hover:border-amber/20">
                    {service.image && (
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.shortTitle}
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-display font-semibold text-navy group-hover:text-amber transition-colors">
                        {service.shortTitle}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {service.description.slice(0, 100)}...
                      </p>
                      <span className="flex items-center gap-1 text-xs text-amber font-medium mt-2 group-hover:gap-2 transition-all">
                        {es ? ES.learnMore : "Learn More"}{" "}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials from this area */}
      {localTestimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container">
            <SectionHeader
              eyebrow={es ? ES.testimonialsEyebrow : "Customer Reviews"}
              title={
                es
                  ? ES.testimonialsTitle(location.name)
                  : `What ${location.name} Homeowners Say`
              }
              subtitle={
                es
                  ? ES.testimonialsSubtitle
                  : "Real reviews from your neighbors who trust Restoration Roofing."
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {localTestimonials.map((t) => (
                <motion.div key={t.name} {...fadeUp}>
                  <div className="bg-linen rounded-xl p-6">
                    <StarRating rating={t.rating} size="sm" />
                    {/* testimonial text from data.ts — not translated */}
                    <p className="text-gray-800 leading-relaxed mt-3 italic text-[15px]">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy">
                          {t.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t.location || location.name}{" "}
                          {es ? ES.homeowner : "Homeowner"}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Service Areas */}
      {nearbyLocations.length > 0 && (
        <section className="section-padding bg-linen">
          <div className="container">
            <SectionHeader
              eyebrow={es ? ES.nearbyEyebrow : "Nearby Areas"}
              title={
                es
                  ? ES.nearbyTitle(location.name)
                  : `Also Serving Near ${location.name}`
              }
              subtitle={
                es
                  ? ES.nearbySubtitle(location.county)
                  : `We provide the same expert roofing services to communities throughout ${location.county} and beyond.`
              }
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
              {nearbyLocations.map((loc) => (
                <Link key={loc.slug} href={`/areas-we-serve/${loc.slug}`}>
                  <motion.div
                    {...fadeUp}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    {loc.image && (
                      <div className="relative h-24 overflow-hidden">
                        <Image
                          src={loc.image}
                          alt={loc.name}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-3 text-center">
                      {/* city names are proper nouns — not translated */}
                      <span className="text-sm font-semibold text-navy group-hover:text-amber transition-colors">
                        {loc.name}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/areas-we-serve"
                className="inline-flex items-center gap-2 text-amber font-semibold hover:gap-3 transition-all"
              >
                {es ? ES.viewAll : "View All 21 Service Areas"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner
        title={
          es
            ? ES.ctaTitle(location.name)
            : `Protect Your ${location.name} Home`
        }
        subtitle={
          es
            ? ES.ctaSubtitle(location.name)
            : `Get expert roofing services tailored for ${location.name}'s unique climate and architecture. Free estimates, 24/7 emergency service.`
        }
      />
    </>
  );
}
