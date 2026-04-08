"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Location, Service, Testimonial } from "@/lib/data";
import { COMPANY } from "@/lib/data";
import { SectionHeader, StarRating } from "@/components/shared";
import {
  CheckCircle2, Phone, ArrowRight, MapPin, Home, AlertTriangle,
  Landmark, CloudRain, Users, Building2, Shield,
  History, TreePine, Waves, Sun, Wind, Droplets,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5 },
};

export function LocationDetailContent({
  location,
  localTestimonials,
  nearbyLocations,
  featuredServices,
}: {
  location: Location;
  localTestimonials: Testimonial[];
  nearbyLocations: Location[];
  featuredServices: Service[];
}) {
  return (
    <>
      {/* Community Overview with Hero Image */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Community Image */}
            <motion.div {...fadeUp} className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow-lg sticky top-24">
                <img
                  src={location.image}
                  alt={`${location.name}, South Carolina`}
                  className="w-full h-[300px] lg:h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="bg-navy p-5 text-white">
                  <h3 className="font-display text-lg font-semibold mb-3">
                    Quick Facts
                  </h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        County
                      </dt>
                      <dd className="font-medium mt-0.5">{location.county}</dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        Population
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.population}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        Median Home
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.medianHomePrice}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/60 text-xs uppercase tracking-wider">
                        Type
                      </dt>
                      <dd className="font-medium mt-0.5">
                        {location.isBarrierIsland
                          ? "Barrier Island"
                          : location.isHistoric
                            ? "Historic District"
                            : "Community"}
                      </dd>
                    </div>
                  </dl>
                  {/* CTA */}
                  <div className="mt-5 space-y-2">
                    <Link
                      href="/contact"
                      className="btn-amber w-full py-3 rounded-md text-sm text-center block"
                    >
                      Free Estimate in {location.name}
                    </Link>
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
                    About {location.name}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-navy mb-4">
                  Your Trusted Roofer in {location.name}, South Carolina
                </h2>
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
                      History &amp; Identity
                    </h3>
                  </div>
                  <div className="bg-linen rounded-xl p-6 border-l-4 border-amber">
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
                      Community Character
                    </h3>
                  </div>
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
                      Notable Landmarks &amp; Attractions
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
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
            eyebrow="Local Architecture"
            title={`Housing & Architecture in ${location.name}`}
            subtitle={`Understanding ${location.name}'s unique housing stock helps us deliver roofing solutions that protect and complement your home's architectural character.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Architecture Description */}
            <motion.div {...fadeUp}>
              <div className="bg-white rounded-xl p-7 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold text-navy">
                    Architectural Overview
                  </h3>
                </div>
                {location.housingArchitecture ? (
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {location.housingArchitecture}
                  </p>
                ) : (
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {location.name} features a diverse mix of housing styles
                    typical of the South Carolina Lowcountry, each requiring
                    specialized roofing approaches.
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
                    Common Housing Styles
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
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
                  Neighborhood Spotlight
                </h3>
              </div>
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
            eyebrow="Weather & Storms"
            title={`Weather Challenges in ${location.name}`}
            subtitle={`Understanding ${location.name}'s weather patterns is essential for choosing the right roofing materials and maintenance schedule.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Storm History */}
            <motion.div {...fadeUp}>
              <div className="bg-gradient-to-br from-navy to-[#0f2a38] rounded-xl p-7 text-white h-full">
                <div className="flex items-center gap-2 mb-4">
                  <CloudRain className="w-5 h-5 text-amber" />
                  <h3 className="font-display text-lg font-semibold">
                    Storm History
                  </h3>
                </div>
                {location.weatherStorms ? (
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {location.weatherStorms}
                  </p>
                ) : (
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {location.name} is susceptible to hurricanes and tropical
                    storms, including the devastating Hurricane Hugo in 1989 and
                    more recent storms like Matthew (2016) and Ian (2022).
                  </p>
                )}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Wind className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      Hurricane
                    </span>
                    <span className="text-sm font-semibold">
                      Winds 74+ mph
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Waves className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      Storm Surge
                    </span>
                    <span className="text-sm font-semibold">
                      {location.isBarrierIsland ? "High Risk" : "Moderate Risk"}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Droplets className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      Humidity
                    </span>
                    <span className="text-sm font-semibold">75-85% Avg</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Sun className="w-5 h-5 text-amber mx-auto mb-1" />
                    <span className="text-xs text-white/60 block">
                      UV Index
                    </span>
                    <span className="text-sm font-semibold">High (8-10)</span>
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
                    Roofing Challenges
                  </h3>
                </div>
                {location.roofingChallengesDetail ? (
                  <p className="text-gray-800 leading-relaxed text-[15px] mb-5">
                    {location.roofingChallengesDetail}
                  </p>
                ) : (
                  <p className="text-gray-800 leading-relaxed text-[15px] mb-5">
                    Roofing in {location.name} faces challenges from coastal
                    weather, humidity, and storm exposure that require specialized
                    materials and installation techniques.
                  </p>
                )}
                <ul className="space-y-3">
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
            eyebrow="Our Services"
            title={`Roofing Services in ${location.name}`}
            subtitle={`From emergency storm repairs to complete roof replacements, we provide comprehensive roofing services throughout ${location.name} and ${location.county}.`}
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
                      <div className="h-36 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.shortTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
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
                        Learn More <ArrowRight className="w-3 h-3" />
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
              eyebrow="Customer Reviews"
              title={`What ${location.name} Homeowners Say`}
              subtitle="Real reviews from your neighbors who trust Restoration Roofing."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {localTestimonials.map((t) => (
                <motion.div key={t.name} {...fadeUp}>
                  <div className="bg-linen rounded-xl p-6">
                    <StarRating rating={t.rating} size="sm" />
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
                          {t.location || location.name} Homeowner
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
              eyebrow="Nearby Areas"
              title={`Also Serving Near ${location.name}`}
              subtitle={`We provide the same expert roofing services to communities throughout ${location.county} and beyond.`}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
              {nearbyLocations.map((loc) => (
                <Link key={loc.slug} href={`/areas-we-serve/${loc.slug}`}>
                  <motion.div
                    {...fadeUp}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    {loc.image && (
                      <div className="h-24 overflow-hidden">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-3 text-center">
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
                View All 21 Service Areas{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
