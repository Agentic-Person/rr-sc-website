"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPANY, IMAGES } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, StatsBar, JsonLdScript } from "@/components/shared";
import { Shield, Heart, Users, Award, FileCheck, CheckCircle2 } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Family Values",
    description: "We treat every home like it's our own. As a family-owned business, our reputation is personal — and we protect it by delivering exceptional work on every project.",
  },
  {
    icon: Shield,
    title: "Integrity First",
    description: "We provide honest assessments, fair pricing, and transparent communication. If a repair will solve your problem, we won't recommend a replacement.",
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "We live and work in the Charleston area. We're your neighbors, not storm chasers. When we finish your project, we're still right here if you need us.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Our team brings years of experience in coastal roofing. We use hurricane-rated installation methods and premium materials designed for the Lowcountry climate.",
  },
];

const milestones = [
  { year: "2020", title: "Company Founded", description: "Restoration Roofing SC established in Mount Pleasant to serve the Charleston metro area." },
  { year: "2021", title: "Growing Team", description: "Expanded our crew to handle the growing demand for quality roofing services in the Lowcountry." },
  { year: "2022", title: "Insurance Expertise", description: "Became one of the area's leading contractors for insurance claim management and storm damage restoration." },
  { year: "2023", title: "500+ Projects", description: "Reached a milestone of over 500 completed roofing projects across the Charleston area." },
  { year: "2024", title: "Bilingual Service", description: "Added bilingual team members to better serve our diverse community. Se Habla Español." },
  { year: "2025", title: "Expanded Coverage", description: "Extended our service area to 21 communities across the Lowcountry and Midlands." },
];

export default function AboutContent() {
  return (
    <>
      <JsonLdScript data={{
        "@context": "https://schema.org",
        "@type": "RoofingContractor",
        name: COMPANY.fullName,
        url: "https://www.restorationroofingsc.com",
        telephone: COMPANY.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mount Pleasant",
          addressRegion: "SC",
          addressCountry: "US",
        },
        areaServed: "Charleston, SC metropolitan area",
        description: "Family-owned roofing contractor serving the Charleston, SC area with expert roof installation, repair, and storm damage restoration.",
      }} />

      <PageHero
        title="About Restoration Roofing"
        subtitle="Family-owned, community-focused, and committed to protecting Lowcountry homes with expert craftsmanship."
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
                Built on Trust, Rooted in the Lowcountry
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  Restoration Roofing was founded with a simple mission: to provide Charleston-area homeowners with honest, high-quality roofing services they can trust. Based in Mount Pleasant, we understand the unique challenges that coastal South Carolina weather presents to your home&apos;s most important protective system.
                </p>
                <p>
                  What sets us apart is our approach to the complete roofing experience. We don&apos;t just install and repair roofs — we guide homeowners through every step of the process, including the often-overwhelming insurance claims process. Our team has managed hundreds of insurance claims, and we know how to document damage thoroughly and advocate for fair settlements.
                </p>
                <p>
                  As a family-owned business, our reputation is everything. Every project we complete is a reflection of our values — integrity, craftsmanship, and genuine care for our customers and community. We&apos;re not a national chain or a storm-chasing outfit. We&apos;re your neighbors, and we take that responsibility seriously.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src={IMAGES.heroResidential}
                alt="Charleston neighborhood with beautiful homes"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-navy text-white rounded-lg p-5 shadow-xl max-w-xs hidden md:block">
                <div className="font-display text-2xl font-bold text-amber mb-1">{COMPANY.projectsCompleted}+</div>
                <div className="text-sm text-white/80">Projects completed across the Lowcountry</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Our Values */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="These aren't just words on a wall — they're the principles that guide every decision we make and every project we complete."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg border border-border/50 p-6 hover:shadow-lg hover:border-amber/30 card-halo transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-amber mb-4" />
                <h3 className="font-display text-lg font-semibold text-navy mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Expertise */}
      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">Insurance Claims</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                We Handle Your Insurance Claim
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Dealing with roof damage is stressful enough without the added complexity of insurance claims. Our team has managed hundreds of claims and knows exactly how to document damage, communicate with adjusters, and advocate for fair settlements.
              </p>
              <ul className="space-y-3">
                {[
                  "Complete damage documentation with photos and reports",
                  "Direct communication with your insurance adjuster",
                  "Attendance at adjuster inspections on your behalf",
                  "Supplemental claim filing when initial offers are insufficient",
                  "Coordination of repairs with claim approval timeline",
                  "No out-of-pocket costs beyond your deductible (for covered claims)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <FileCheck className="w-12 h-12 text-amber mb-4" />
              <h3 className="font-display text-xl font-semibold text-white mb-3">The Claims Process</h3>
              <ol className="space-y-4">
                {[
                  "We inspect your roof and document all damage",
                  "We file the claim with your insurance company",
                  "We meet with the adjuster at your property",
                  "We review the settlement and negotiate if needed",
                  "We complete repairs once the claim is approved",
                  "We handle all paperwork and follow-up",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-amber">{i + 1}</span>
                    </div>
                    <span className="text-sm text-white/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual Team */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">Se Habla Español</span>
            <h2 className="font-display text-3xl font-bold text-navy mb-4">Bilingual Team</h2>
            <p className="text-gray-800 leading-relaxed mb-6">
              We&apos;re proud to serve Charleston&apos;s diverse community with bilingual team members who can communicate in both English and Spanish. Whether you prefer to discuss your roofing needs in English or Spanish, we&apos;re here to help you understand every aspect of your project.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-linen rounded-lg px-6 py-4 text-center">
                <div className="font-display text-lg font-semibold text-navy">English</div>
                <div className="text-sm text-gray-600">Full service</div>
              </div>
              <div className="bg-linen rounded-lg px-6 py-4 text-center">
                <div className="font-display text-lg font-semibold text-navy">Español</div>
                <div className="text-sm text-gray-600">Servicio completo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow="Our Journey"
            title="Growing With the Lowcountry"
          />

          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-amber">{milestone.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-full bg-navy/20 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-base font-semibold text-navy mb-1">{milestone.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Work With Us?"
        subtitle="Experience the Restoration Roofing difference. Get a free estimate and see why your neighbors trust us with their homes."
      />
    </>
  );
}
