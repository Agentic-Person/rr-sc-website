"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Zap,
  DollarSign,
  Home,
  FileText,
} from "lucide-react";
import { COMPANY } from "@/lib/data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function openRoofleWidget() {
  const selectors = [
    '[class*="rfq-pro"]',
    '[class*="roofle"]',
    '[id*="rfq"]',
    '[id*="roofle"]',
    'button[class*="quote"]',
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (el) {
      el.click();
      return;
    }
  }
  // Fallback: scroll to the CTA anchor on this page
  document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" });
}

function QuoteButton({
  label = "Get Your Instant Quote Now",
  size = "lg",
}: {
  label?: string;
  size?: "lg" | "md";
}) {
  const cls =
    size === "lg"
      ? "btn-amber px-8 py-4 rounded-md text-base font-semibold inline-flex items-center gap-2 shadow-lg"
      : "btn-amber px-6 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2";
  return (
    <button onClick={openRoofleWidget} className={cls}>
      <Zap className="w-4 h-4" />
      {label}
    </button>
  );
}

// ─── Shingle tier data ────────────────────────────────────────────────────────

const SHINGLE_TIERS = [
  {
    tier: "Storm-Rated",
    label: "GOOD",
    name: "TAMKO Storm Fighter",
    tagline: "Built for hurricane season",
    description:
      "Engineered for the South Carolina coast. 160 mph system wind warranty, Hail Guard impact protection, and Class 4 rating — may qualify for insurance discounts.",
    windRating: "160 mph system",
    lifespan: "20–30 years",
    priceRange: "$9,000 – $14,000",
    priceNote: "typical 1,500–2,500 sq ft home",
    highlights: ["160 mph wind warranty", "Hail Guard impact resistance", "Insurance discount eligible", "Built for coastal SC"],
    houseImage: "/images/material-tamko-house.webp",
    badgeColor: "bg-sage text-white",
    borderColor: "border-sage/40",
    accentColor: "text-sage",
  },
  {
    tier: "Architectural",
    label: "BETTER",
    name: "Owens Corning Oakridge",
    tagline: "Quality & curb appeal, balanced",
    description:
      "Dimensional wood-shake appearance with proven Owens Corning performance. StreakGuard algae resistance fights the Lowcountry humidity. 110 mph rated, Lifetime Limited warranty.",
    windRating: "110 mph",
    lifespan: "20–25 years",
    priceRange: "$11,000 – $16,000",
    priceNote: "typical 1,500–2,500 sq ft home",
    highlights: ["Dimensional appearance", "StreakGuard algae resistance", "Owens Corning Lifetime warranty", "Wide color selection"],
    houseImage: "/images/material-oc-oakridge-house.webp",
    badgeColor: "bg-amber text-black",
    borderColor: "border-amber/40",
    accentColor: "text-amber-dark",
    popular: true,
  },
  {
    tier: "Premium",
    label: "BEST",
    name: "Owens Corning Duration",
    tagline: "Top-tier protection & appearance",
    description:
      "Our flagship shingle. SureNail Technology for a reinforced nail zone, 130 mph wind warranty, bold TruDefinition color, and StreakGuard protection. The go-to for premium curb appeal on Lowcountry homes.",
    windRating: "130 mph",
    lifespan: "25–30 years",
    priceRange: "$14,000 – $20,000",
    priceNote: "typical 1,500–2,500 sq ft home",
    highlights: ["SureNail Technology", "130 mph wind warranty", "Class 4 impact option", "TruDefinition color platform"],
    houseImage: "/images/material-oc-duration-house.webp",
    badgeColor: "bg-navy text-white",
    borderColor: "border-navy/30",
    accentColor: "text-navy",
  },
];

// ─── Cost driver data ─────────────────────────────────────────────────────────

const COST_DRIVERS = [
  {
    number: "01",
    title: "Roof Size & Square Footage",
    body: "Roofing is priced by the \"square\" (100 sq ft). A 2,000 sq ft home doesn't always have 2,000 sq ft of roof — pitch, overhangs, and valleys all add to the measurement.",
  },
  {
    number: "02",
    title: "Pitch & Steepness",
    body: "Steep roofs require harnesses, scaffolding, and more labor time. A low-slope Charleston bungalow costs significantly less to reroof than a steep Victorian in the Historic District.",
  },
  {
    number: "03",
    title: "Roof Complexity",
    body: "Every valley, hip, dormer, skylight, and chimney adds time and material waste. Simple gable roofs are the most affordable; complex hip-and-valley roofs cost more.",
  },
  {
    number: "04",
    title: "Tear-Off vs. Overlay",
    body: "South Carolina code allows a second layer of shingles over the first. An overlay saves money short-term but masks deck issues. We always recommend full tear-off for quality and longevity.",
  },
  {
    number: "05",
    title: "Shingle Tier & Material",
    body: "TAMKO Storm Fighter, OC Oakridge, and OC Duration each carry different material costs and wind warranties. The difference in installed cost between tiers is typically $2–$5 per square foot.",
  },
  {
    number: "06",
    title: "Hurricane & Storm Prep",
    body: "Coastal SC homes near water often require enhanced underlayment, self-adhering ice & water shield at eaves, and additional fastener patterns for wind uplift resistance. This is non-negotiable near the coast.",
  },
  {
    number: "07",
    title: "Decking Condition",
    body: "If we find rotted or soft plywood after tear-off, we replace it. In coastal SC, moisture intrusion and humidity take a real toll on OSB and plywood sheeting — especially on older homes.",
  },
  {
    number: "08",
    title: "Ventilation System",
    body: "Proper ridge and soffit ventilation extends your roof's life by 5–10 years in our climate. Poor ventilation in South Carolina's heat and humidity causes premature shingle failure from the underside up. We factor this in every estimate.",
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Your Instant Estimate Arrives",
    body: "The tool measures your roof from satellite imagery and gives you a real price range — fast. No appointment, no waiting, no commitment required.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "2",
    title: "We Reach Out — Friendly, Not Pushy",
    body: "If you share contact info, one of our team members will follow up. We answer questions. We explain options. We don't pressure or use countdown timers.",
    image: "/images/sc-process-02-consultation.webp",
  },
  {
    number: "3",
    title: "Free Roof Inspection (15–20 Minutes)",
    body: "We come look at your roof — decking, ventilation, flashing, underlayment, signs of ice dam or moisture damage. We take photos so you can see what we see.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "4",
    title: "Line-Item Proposal With Photos",
    body: "You get a written proposal with photos, material specs, tear-off cost, labor, warranty details — every line item explained in plain English. Multiple options included.",
    image: "/images/sc-process-03-insurance.webp",
  },
  {
    number: "5",
    title: "You Decide — On Your Timeline",
    body: "Accept, ask questions, or walk away. The decision is 100% yours. We don't do same-day pressure tactics or disappearing discounts. Good work speaks for itself.",
    image: "/images/sc-process-05-walkthrough.webp",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RoofQuoteContent() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="bg-navy relative overflow-hidden min-h-[60svh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/112751785/QzW5An8GggbtcG7rNRpiT7/hero-homepage-jkwKvpQJahreMKq2qj8Y5j.webp"
            alt="Charleston home with new roof"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-amber" />
              <span className="text-amber text-xs font-semibold uppercase tracking-widest">
                Instant Roof Quote
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            >
              Most roofing companies start with pressure.{" "}
              <span className="text-amber">We start with transparency.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Get a real price estimate for your Lowcountry home in under 60
              seconds — no appointment, no jargon, no games. Family-owned.
              Licensed. Honest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <QuoteButton />
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60"
            >
              {[
                "Family Owned & Operated",
                "License RBC 694",
                "4.9★ Google Rating",
                "24/7 Emergency Service",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber flex-shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUOTE TOOL SECTION ── */}
      <section id="get-quote" className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              The Tool That Changes Everything
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              Get a Roof Quote You Can Trust — Fast
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block h-px w-12 bg-amber/40" />
              <Image src="/images/rr-sc-ridge-logo-v3.webp" alt="" aria-hidden width={20} height={20} sizes="20px" className="h-5 w-auto opacity-80" style={{ mixBlendMode: "multiply" }} />
              <span className="block h-px w-12 bg-amber/40" />
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Most Lowcountry homeowners get the same experience: one company
              quotes $11,000, another quotes $19,000, and nobody explains why.
              Our instant quote tool uses satellite measurements of your actual
              home to give you a real price range — before anyone steps foot on
              your property.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-10">
              No salesperson showing up unannounced. No high-pressure tactics.
              No vague "it depends" non-answers. Just a transparent number you
              can actually use to plan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <QuoteButton label="Start My Instant Quote →" />
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 text-navy text-sm font-semibold hover:text-amber transition-colors"
              >
                <Phone className="w-4 h-4" />
                Prefer to talk? {COMPANY.phone}
              </a>
            </div>

            <p className="text-xs text-gray-500">
              Powered by satellite roof measurement technology. Estimates are
              ranges, not final bids — a free inspection confirms exact scope.
            </p>
          </div>
        </div>
      </section>

      {/* ── SHINGLE TIERS / "WHAT YOUR ROOF COULD LOOK LIKE" ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              See Your Options
            </span>
            <h2 className="font-display section-title text-navy mb-4">
              What Would Your New Roof Look Like?
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Browse our three shingle tiers — each with a real price range and
              an actual photo of the product on a home. Shop before you call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SHINGLE_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 ${tier.borderColor} bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group`}
              >
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-amber text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* House photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={tier.houseImage}
                    alt={`${tier.name} shingle on a Charleston home`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute bottom-3 left-3 ${tier.badgeColor} text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full`}>
                    {tier.label}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    {tier.tier}
                  </p>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-4">{tier.tagline}</p>

                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  {/* Specs row */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-linen rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-0.5">Wind Rating</p>
                      <p className="text-sm font-bold text-navy">{tier.windRating}</p>
                    </div>
                    <div className="bg-linen rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-0.5">Lifespan</p>
                      <p className="text-sm font-bold text-navy">{tier.lifespan}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {tier.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-500 mb-1">Estimated Installed Range</p>
                    <p className={`font-display text-2xl font-bold ${tier.accentColor}`}>
                      {tier.priceRange}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{tier.priceNote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-4">
              Prices vary by roof size, pitch, and complexity. Get your exact number →
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteButton size="md" label="Get My Instant Quote" />
              <Link
                href="/materials-comparison"
                className="text-sm font-semibold text-navy hover:text-amber transition-colors inline-flex items-center gap-1"
              >
                Full Materials Comparison <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ROOF QUOTES FEEL STRESSFUL ── */}
      <section className="bg-navy section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-4">
                We Get It
              </span>
              <h2 className="font-display section-title text-white mb-6">
                Why Getting a Roof Quote Feels Stressful
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                Most Lowcountry homeowners replace their roof once or twice in a
                lifetime. That means you&apos;re making a $10,000–$25,000+
                decision with almost no experience — and an industry that
                historically hasn&apos;t made it easy to understand what
                you&apos;re paying for.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Quotes that vary by $5,000–$8,000 with no explanation why",
                  "Roofing jargon designed to confuse, not inform",
                  "High-pressure tactics and time-limited \"deals\"",
                  "\"That's just what it costs\" when you ask for a breakdown",
                  "Slow or no-show contractors who won't give straight answers",
                  "No photos, no documentation, just a number on a napkin",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white/60 text-sm italic leading-relaxed border-l-2 border-amber/40 pl-4">
                "Hope isn&apos;t a strategy. When you&apos;re spending this kind
                of money on your home, you deserve a number you can actually
                trust — and a contractor who explains the why behind it."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Charleston home with shingle roof"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber fill-amber" />
                      ))}
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      &ldquo;Finally a contractor who explained every single
                      line of the quote. No surprises. Exactly what we
                      needed.&rdquo;
                    </p>
                    <p className="text-white/60 text-xs mt-2">
                      — Mount Pleasant homeowner
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT OUR TOOL CHANGES ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                Our Approach
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                The Tool Above Changes Everything
              </h2>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Our instant quote tool is powered by RoofQuote PRO™ satellite
              measurement technology — the same platform used by leading
              roofing contractors across the country. Here&apos;s what that
              means for you:
            </p>

            <div className="space-y-5 mb-8">
              {[
                {
                  icon: Home,
                  title: "Your actual roof, measured from satellite",
                  body: "We don't guess square footage. The tool pulls satellite imagery and calculates real measurements of your specific home.",
                },
                {
                  icon: DollarSign,
                  title: "A real price range — not a bait number",
                  body: "The estimate reflects current Charleston-area material and labor costs for your roof size and the shingle tier you choose.",
                },
                {
                  icon: Shield,
                  title: "Transparent, line-by-line breakdown",
                  body: "You can see what drives the cost — tear-off, materials, labor, disposal. No black box pricing.",
                },
                {
                  icon: Clock,
                  title: "No scheduling, no waiting",
                  body: "Get a number in under 60 seconds. No appointment. No salesperson in your driveway before you're ready.",
                },
                {
                  icon: FileText,
                  title: "A starting point, not a final number",
                  body: "The instant quote gives you a planning range. Our free inspection confirms the exact scope — especially for older roofs, complex pitches, or decking concerns.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">
                It&apos;s the first step toward confidence — not commitment.
              </p>
              <QuoteButton size="md" label="Get My Price Range →" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT A REAL QUOTE SHOULD INCLUDE ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                Buyer Education
              </span>
              <h2 className="font-display section-title text-navy mb-2">
                What a Real Roof Quote Should Include
              </h2>
              <p className="text-amber font-semibold italic mb-6">(Most Don&apos;t)</p>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                A legitimate written proposal — whether you hire us or someone
                else — should cover all of the following. If a contractor hands
                you a single number without explanation, that&apos;s your first
                red flag.
              </p>

              <ul className="space-y-3">
                {[
                  "Total square footage of your roof, verified",
                  "Number of existing shingle layers (affects tear-off cost)",
                  "Roof pitch / steepness classification",
                  "Underlayment type and specifications",
                  "Ice & water shield coverage plan (critical near the coast)",
                  "Ventilation assessment and upgrade plan",
                  "Flashing details — chimney, valleys, pipe boots",
                  "Decking condition and replacement scope",
                  "Material brand, product line, and color selection",
                  "Tear-off and disposal included or separate",
                  "Labor breakdown with crew scope",
                  "Manufacturer and workmanship warranty details",
                  "Local building code compliance and permit filing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-navy font-bold text-base border-l-4 border-amber pl-4">
                Missing items = missing protection. Every line matters.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-4">
                  Our Quote Includes All 13
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  When we hand you a proposal, every line above is covered.
                  Photos from the inspection. Material specs. Clear warranty
                  terms. No guessing.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Written, line-item proposal",
                    "Photos from your actual roof",
                    "Multiple material options",
                    "Financing information available",
                    "Insurance claim assistance if applicable",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber flex-shrink-0" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <QuoteButton size="md" label="Start Here — It's Free" />
                <p className="text-white/40 text-xs mt-3">
                  No commitment. No pressure.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT DRIVES ROOF COSTS IN SC ── */}
      <section className="bg-navy section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              Know Before You Shop
            </span>
            <h2 className="font-display section-title text-white mb-5">
              What Really Affects the Cost of a Roof in South Carolina
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Roof pricing in the Lowcountry is driven by factors specific to
              our coastal climate — hurricane exposure, salt air, humidity, and
              building codes that exceed inland standards. Here&apos;s what
              moves the number.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {COST_DRIVERS.map((driver, i) => (
              <motion.div
                key={driver.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-3xl font-bold text-amber/30 flex-shrink-0 leading-none">
                    {driver.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{driver.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{driver.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-10 max-w-lg mx-auto">
            Phone quotes are never real quotes. Any number given without seeing
            your specific roof is a guess — and guesses lead to surprises.
          </p>
        </div>
      </section>

      {/* ── THE #1 THING HOMEOWNERS WANT ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              The Real Goal
            </span>
            <h2 className="font-display section-title text-navy mb-6">
              The #1 Thing Every Homeowner Wants
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Not the cheapest number. Not the fastest install. Not the slickest
              sales pitch.
            </p>
            <p className="font-display text-5xl font-bold text-amber mb-8">
              Confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
              {[
                {
                  icon: DollarSign,
                  title: "Fair pricing they can verify",
                  body: "A number that reflects real market rates — not one contractor's margin target.",
                },
                {
                  icon: Shield,
                  title: "Quality they can see and document",
                  body: "Photos before, during, and after. A roof you don't have to wonder about.",
                },
                {
                  icon: FileText,
                  title: "Clear communication throughout",
                  body: "Know what's happening, when it's happening, and what comes next.",
                },
                {
                  icon: Clock,
                  title: "Longevity they can count on",
                  body: "Materials and installation that hold up through hurricane season — not just good weather.",
                },
                {
                  icon: Home,
                  title: "A protected home they can be proud of",
                  body: "Curb appeal and structural protection in the same package.",
                },
                {
                  icon: Star,
                  title: "A sound financial decision",
                  body: "The right scope, at the right tier, for their actual budget — not oversold, not undersold.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1">{title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              That&apos;s what we aim to deliver. Not just a roof — peace of
              mind and a path forward. The instant quote is the first step toward
              getting there without the stress.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW TO KNOW YOU HAVE A GOOD QUOTE ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                Practical Checklist
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                How to Know You&apos;re Getting a Good Quote
              </h2>
            </div>

            <div className="bg-linen rounded-2xl p-8 mb-10">
              <h3 className="font-display text-xl font-bold text-navy mb-6">
                A contractor worth hiring will:
              </h3>
              <div className="space-y-4">
                {[
                  "Document your existing roof with photos — before quoting",
                  "Explain your material options in plain English, not jargon",
                  "Justify every cost line without being asked",
                  "Offer at least two or three product tiers",
                  "Walk you through the warranty — manufacturer AND workmanship",
                  "Discuss your attic ventilation and why it matters",
                  "Answer every question without rushing you toward a signature",
                  "Outline what happens before, during, and after install",
                  "Leave you feeling informed — not pressured",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Why an Instant Quote Gives You an Advantage
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Most homeowners go into contractor meetings with no baseline —
                so they can&apos;t tell a fair quote from an inflated one. The
                instant quote changes that.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "You arrive with a real number, not a blank slate",
                  "You can intelligently compare quotes from multiple companies",
                  "Lowball offers become obvious red flags, not exciting deals",
                  "You know whether repair or replacement makes financial sense",
                  "You understand what complexity means for your specific roof",
                  "You can ask better questions — and spot incomplete answers",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs italic">
                Think of the instant quote as a baseline, a compass, and a
                confidence booster — all in one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RED FLAGS ── */}
      <section className="bg-navy section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                Protect Yourself
              </span>
              <h2 className="font-display section-title text-white mb-5">
                Red Flags in Cheap Roof Quotes
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                Low prices are appealing. But in roofing, cheap usually means
                something got left out — and you won&apos;t find out until
                after a tropical storm.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  n: "1",
                  title: "No mention of ventilation",
                  body: "Proper attic ventilation is critical in South Carolina's heat and humidity. A contractor who skips this topic is leaving your new roof at risk of premature failure from the inside out.",
                },
                {
                  n: "2",
                  title: "Only one layer of underlayment proposed",
                  body: "In a coastal climate with hurricane exposure, synthetic underlayment paired with self-adhering ice & water shield at the eaves is standard. One layer is not enough.",
                },
                {
                  n: "3",
                  title: "No discussion of your decking",
                  body: "They can't know your decking condition without tearing off the old roof. A contractor who doesn't mention this isn't planning to check — or to be accountable for what they find.",
                },
                {
                  n: "4",
                  title: "No photos, no documentation",
                  body: "If they can quote you without inspecting your roof and documenting what they see, the quote isn't based on your roof. It's a guess.",
                },
                {
                  n: "5",
                  title: "Verbal-only quotes with no written breakdown",
                  body: "\"We'll do it for $11,500\" is not a proposal. A legitimate contractor provides a written, line-item proposal you can review, compare, and refer back to.",
                },
                {
                  n: "6",
                  title: "Pressure tactics and time-limited pricing",
                  body: "\"This price is only good until Friday\" is a sales manipulation tactic, not a business reality. A quality contractor's pricing doesn't expire on a deadline.",
                },
                {
                  n: "7",
                  title: "Missing or vague warranty information",
                  body: "Every proposal should clearly distinguish between the manufacturer's shingle warranty and the contractor's workmanship warranty. If they can't explain both — that's a problem.",
                },
              ].map((flag) => (
                <div
                  key={flag.n}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">{flag.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{flag.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-white/40 text-sm mt-8">
              Cheap quotes win jobs. They rarely win lasting satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* ── REPAIR OR REPLACE? ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                Honest Guidance
              </span>
              <h2 className="font-display section-title text-navy mb-4">
                Repair or Replace?
              </h2>
              <p className="text-amber font-semibold italic mb-5">
                Here&apos;s the Honest Breakdown
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                It&apos;s a normal question. The answer depends on your
                roof&apos;s age, condition, and what your goals are. Good
                contractors help you think through it — they don&apos;t push
                you toward the more expensive option.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-sage" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    A repair makes sense when:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Damage is isolated to one section or slope",
                    "Shingles are still flexible and granules intact",
                    "Roof is under 10–12 years old",
                    "Storm damage is limited to a small area",
                    "Problem is isolated flashing failure, not shingle failure",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-amber" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    A full replacement makes sense when:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Shingles are brittle, curling, or losing granules widely",
                    "Multiple areas showing wear or leak points",
                    "Roof is 15–25+ years old",
                    "Attic shows poor ventilation history",
                    "Insurance claim is covering storm damage",
                    "You're planning to sell or refinance within 5 years",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              A trustworthy contractor shows you the evidence — and lets you
              make the call. We bring photos and explain what we see, not what
              we want to sell.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINANCING ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              Financial Options
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              How Financing Fits Into a Roof Quote
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Most homeowners haven&apos;t budgeted specifically for a roof
              replacement — and that&apos;s completely normal. Here&apos;s how
              the numbers typically work.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                {
                  icon: Shield,
                  title: "Insurance is covering the damage",
                  body: "Your out-of-pocket cost is typically your deductible — often $1,000–$2,500. We work with all major carriers and document everything the adjuster needs.",
                },
                {
                  icon: DollarSign,
                  title: "No insurance coverage involved",
                  body: "We offer financing options that let you spread the cost over time with manageable payments. Ask us about current rates and terms.",
                },
                {
                  icon: ArrowRight,
                  title: "You want to upgrade your materials",
                  body: "The step from mid-tier to premium is often $2,000–$4,000 — a small monthly payment difference that buys significant long-term protection.",
                },
                {
                  icon: Clock,
                  title: "You need time to decide",
                  body: "There&apos;s no rush. Our quotes don&apos;t expire, and we don&apos;t pressure with artificial deadlines. Plan on your timeline.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-linen rounded-xl p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1.5">{title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/financing"
                className="inline-flex items-center gap-2 text-amber font-semibold text-sm hover:underline"
              >
                See full financing options <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS AFTER ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              Our Process
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              What Happens After Your Instant Quote
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              The tool gives you a number. Here&apos;s what the path forward
              looks like — at whatever pace works for you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber flex items-center justify-center">
                    <span className="text-xs font-bold text-black">{step.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND PROMISE / CTA ── */}
      <section className="bg-navy section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-4">
              Our Promise
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              A Roof Quote Should Make You Feel One Thing:{" "}
              <span className="text-amber">Relief.</span>
            </h2>

            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              Your home is your nest — your biggest investment and the place
              your family comes home to. We take that seriously. Not with
              pressure, but with process.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-left">
              {[
                "Clear communication at every step",
                "Transparent pricing — no hidden costs",
                "Photos documenting all work performed",
                "Your time respected, always",
                "Zero high-pressure tactics, ever",
                "A roof that protects what matters most",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-amber/80 font-display text-xl italic mb-8">
              We protect your home — and we make the process calm, not chaotic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteButton label="Get Your Free Instant Quote" />
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
            </div>

            <p className="text-white/40 text-xs mt-6">
              Licensed Roofing Contractor · RBC 694 · Mount Pleasant, SC ·
              Family Owned & Operated
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL BREADCRUMB + TRUST ── */}
      <section className="bg-linen py-8">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-navy font-medium">Instant Roof Quote</span>
            <span className="hidden sm:block text-gray-300">·</span>
            <Link href="/services/residential-roofing" className="hover:text-navy transition-colors">Roofing Services</Link>
            <span className="hidden sm:block text-gray-300">·</span>
            <Link href="/materials-comparison" className="hover:text-navy transition-colors">Materials Comparison</Link>
            <span className="hidden sm:block text-gray-300">·</span>
            <Link href="/financing" className="hover:text-navy transition-colors">Financing</Link>
            <span className="hidden sm:block text-gray-300">·</span>
            <Link href="/contact" className="hover:text-navy transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
