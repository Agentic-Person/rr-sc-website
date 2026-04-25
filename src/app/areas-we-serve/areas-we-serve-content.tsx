"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Location } from "@/lib/data";
import { SectionHeader, PageHero, CTABanner } from "@/components/shared";
import { IMAGES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Spanish UI strings ────────────────────────────────────────────────────────
const ES = {
  // Page Hero
  heroTitle: "Áreas que Atendemos",
  heroSubtitle:
    "Atendemos con orgullo a 21 comunidades en el área metropolitana de Charleston y el Lowcountry de Carolina del Sur.",
  heroBody:
    "Desde las históricas calles del centro de Charleston hasta las islas barrera de la costa atlántica, Restoration Roofing ofrece servicios expertos de techado adaptados a la arquitectura única, los desafíos climáticos y los requisitos de construcción de cada comunidad. Con base en Mount Pleasant, conocemos el Lowcountry como nadie más.",

  // CTA Banner
  ctaTitle: "¿No Encuentra su Área?",
  ctaSubtitle:
    "Es posible que aún atendamos su comunidad. Llámenos para hablar sobre sus necesidades de techado — con gusto le ayudaremos.",

  // Barrier Islands section
  islandsEyebrow: "Islas Barrera",
  islandsTitle: "Comunidades Costeras e Islas Barrera",
  islandsSubtitle:
    "Estas comunidades frente al océano enfrentan las condiciones de techado más extremas en nuestra área de servicio: exposición directa a huracanes, intensa salinidad en el aire y abrasión por arena.",

  // Historic Cities section
  historicEyebrow: "Comunidades Históricas",
  historicTitle: "Ciudades y Pueblos Históricos",
  historicSubtitle:
    "Estas comunidades cuentan con arquitectura histórica significativa que requiere conocimientos especializados de techado y experiencia en preservación.",

  // Growing Communities section
  growingEyebrow: "Comunidades en Crecimiento",
  growingTitle: "Comunidades Suburbanas y en Crecimiento",
  growingSubtitle:
    "Estas prósperas comunidades representan la expansión del área metropolitana de Charleston, con una combinación de vecindarios establecidos y nuevas construcciones.",

  // Card labels
  barrierIsland: "Isla Barrera",
  more: "más",
} as const;

// ── Location Card ─────────────────────────────────────────────────────────────
function LocationCard({
  location,
  index,
  featured,
}: {
  location: Location;
  index: number;
  featured?: boolean;
}) {
  const { lang } = useLanguage();
  const es = lang === "es";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/areas-we-serve/${location.slug}`}>
        <div className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-amber/30 hover:shadow-2xl hover:-translate-y-1 card-halo transition-all duration-300 h-full">
          {/* Image */}
          {location.image && (
            <div
              className={`overflow-hidden relative ${featured ? "h-48" : "h-40"}`}
            >
              <img
                src={location.image}
                alt={`${location.name}, South Carolina`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white drop-shadow-md">
                    {location.name}
                  </h3>
                  <p className="text-xs text-white/80 drop-shadow-md">
                    {location.county}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
              <span>Pop. {location.population}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>{location.medianHomePrice}</span>
              {location.isBarrierIsland && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="text-amber font-medium">
                    {es ? ES.barrierIsland : "Barrier Island"}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
              {location.description.slice(0, 180)}...
            </p>
            <div className="flex flex-wrap gap-1.5">
              {location.housingStyles.slice(0, 3).map((style) => (
                <span
                  key={style}
                  className="text-xs bg-navy/5 text-navy/70 px-2.5 py-1 rounded-md"
                >
                  {style}
                </span>
              ))}
              {location.housingStyles.length > 3 && (
                <span className="text-xs text-gray-600 px-1 py-1">
                  +{location.housingStyles.length - 3}{" "}
                  {es ? ES.more : "more"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function AreasWeServeContent({
  barrierIslands,
  historicCities,
  otherCities,
}: {
  barrierIslands: Location[];
  historicCities: Location[];
  otherCities: Location[];
}) {
  const { lang } = useLanguage();
  const es = lang === "es";

  return (
    <>
      {/* Page Hero — rendered inside the client component so we can swap language */}
      <PageHero
        title={es ? ES.heroTitle : "Areas We Serve"}
        subtitle={
          es
            ? ES.heroSubtitle
            : "Proudly serving 21 communities across the Charleston metropolitan area and the South Carolina Lowcountry."
        }
        body={
          es
            ? ES.heroBody
            : "From the historic streets of downtown Charleston to the barrier islands of the Atlantic coast, Restoration Roofing provides expert roofing services tailored to each community's unique architecture, climate challenges, and building requirements. Based in Mount Pleasant, we understand the Lowcountry like no one else."
        }
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: es ? ES.heroTitle : "Areas We Serve" }]}
      />

      {/* Barrier Islands */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.islandsEyebrow : "Barrier Islands"}
            title={
              es ? ES.islandsTitle : "Coastal & Barrier Island Communities"
            }
            subtitle={
              es
                ? ES.islandsSubtitle
                : "These oceanfront communities face the most extreme roofing conditions in our service area — direct hurricane exposure, intense salt air, and sand abrasion."
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {barrierIslands.map((loc, i) => (
              <LocationCard key={loc.slug} location={loc} index={i} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Historic Cities */}
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.historicEyebrow : "Historic Communities"}
            title={es ? ES.historicTitle : "Historic Cities & Towns"}
            subtitle={
              es
                ? ES.historicSubtitle
                : "These communities feature significant historic architecture that requires specialized roofing knowledge and preservation expertise."
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {historicCities.map((loc, i) => (
              <LocationCard key={loc.slug} location={loc} index={i} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Other Communities */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={es ? ES.growingEyebrow : "Growing Communities"}
            title={
              es ? ES.growingTitle : "Suburban & Growing Communities"
            }
            subtitle={
              es
                ? ES.growingSubtitle
                : "These thriving communities represent the expanding Charleston metro area, with a mix of established neighborhoods and new construction."
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {otherCities.map((loc, i) => (
              <LocationCard key={loc.slug} location={loc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner — rendered here so language context is available */}
      <CTABanner
        title={es ? ES.ctaTitle : "Don't See Your Area?"}
        subtitle={
          es
            ? ES.ctaSubtitle
            : "We may still serve your community. Call us to discuss your roofing needs — we're happy to help."
        }
      />
    </>
  );
}
