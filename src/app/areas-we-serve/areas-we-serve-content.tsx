"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Location } from "@/lib/data";
import { SectionHeader } from "@/components/shared";
import { ArrowRight } from "lucide-react";

function LocationCard({
  location,
  index,
  featured,
}: {
  location: Location;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/areas-we-serve/${location.slug}`}>
        <div className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-amber/30 hover:shadow-lg transition-all h-full">
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
                  <span className="text-amber font-medium">Barrier Island</span>
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
                  +{location.housingStyles.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AreasWeServeContent({
  barrierIslands,
  historicCities,
  otherCities,
}: {
  barrierIslands: Location[];
  historicCities: Location[];
  otherCities: Location[];
}) {
  return (
    <>
      {/* Barrier Islands */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow="Barrier Islands"
            title="Coastal & Barrier Island Communities"
            subtitle="These oceanfront communities face the most extreme roofing conditions in our service area — direct hurricane exposure, intense salt air, and sand abrasion."
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
            eyebrow="Historic Communities"
            title="Historic Cities & Towns"
            subtitle="These communities feature significant historic architecture that requires specialized roofing knowledge and preservation expertise."
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
            eyebrow="Growing Communities"
            title="Suburban & Growing Communities"
            subtitle="These thriving communities represent the expanding Charleston metro area, with a mix of established neighborhoods and new construction."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {otherCities.map((loc, i) => (
              <LocationCard key={loc.slug} location={loc} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
