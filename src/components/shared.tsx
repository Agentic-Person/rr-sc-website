"use client";

import Link from "next/link";
import { COMPANY, STATS, TRUST_BADGES } from "@/lib/data";
import { Phone, Shield, Clock, Zap, DollarSign, Star, ChevronRight, ArrowRight, MapPin, Hammer, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Shield, Clock, Zap, DollarSign, Phone, MapPin, Hammer, FileCheck,
};

// ---- Wave Section Divider ----
export function WaveDividerTop({ color = "#F7F4EE" }: { color?: string }) {
  return (
    <div className="relative -mb-1">
      <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
        <path d="M0,60 C360,0 720,60 1080,20 C1260,0 1380,30 1440,60 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}

export function WaveDividerBottom({ color = "#F7F4EE" }: { color?: string }) {
  return (
    <div className="relative -mt-1">
      <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
        <path d="M0,0 C360,60 720,0 1080,40 C1260,60 1380,30 1440,0 L1440,0 L0,0 Z" fill={color} />
      </svg>
    </div>
  );
}

// ---- Stats Bar ----
export function StatsBar() {
  return (
    <div className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />
      <div className="container relative py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`text-center ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-amber">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1 tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Trust Badges Row ----
export function TrustBadges() {
  return (
    <div className="bg-linen-dark">
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = iconMap[badge.icon] || Shield;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-amber/10 border-2 border-amber/20" />
                  <div className="absolute inset-1.5 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber" />
                  </div>
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-black mb-1.5">{badge.title}</h3>
                <p className="text-sm text-gray-800 leading-relaxed max-w-[220px] mx-auto">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- CTA Banner ----
export function CTABanner({
  title = "Ready to Protect Your Home?",
  subtitle = "Get a free, no-obligation roof inspection and estimate from Charleston's most trusted roofing team.",
  variant = "navy",
}: {
  title?: string;
  subtitle?: string;
  variant?: "navy" | "amber" | "white";
}) {
  const isNavy = variant === "navy";
  const isWhite = variant === "white";
  return (
    <section className={`${isWhite ? "bg-white" : isNavy ? "bg-navy" : "bg-amber"} relative overflow-hidden`}>
      {!isWhite && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        </div>
      )}
      <div className="container py-14 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`font-display text-2xl md:text-4xl font-bold mb-4 ${isWhite ? "text-black" : isNavy ? "text-white" : "text-navy"}`}>
            {title}
          </h2>
          <p className={`text-base md:text-lg mb-8 ${isWhite ? "text-gray-700" : isNavy ? "text-white/70" : "text-navy/70"}`}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-amber px-8 py-3.5 rounded-md text-sm inline-flex items-center gap-2"
            >
              Get Your Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-md border text-sm font-semibold transition-colors ${
                isWhite
                  ? "border-black/30 text-black hover:bg-black/5"
                  : isNavy
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-navy/30 text-navy hover:bg-navy/10"
              }`}
            >
              <Phone className="w-4 h-4" />
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Section Header ----
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-block font-semibold uppercase mb-3 text-sm md:text-base lg:text-lg tracking-[0.18em] ${
            light ? "text-amber" : "text-amber"
          }`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className={`font-display font-bold section-title ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`flex items-center justify-center gap-3 mt-4 ${centered ? "mx-auto" : ""}`}
      >
        <span className={`block h-px w-12 ${light ? "bg-white/30" : "bg-amber/40"}`} />
        <svg width="20" height="20" viewBox="0 0 20 20" className={`${light ? "text-white/40" : "text-amber"}`}>
          <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" opacity="0.6" />
        </svg>
        <span className={`block h-px w-12 ${light ? "bg-white/30" : "bg-amber/40"}`} />
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ---- Star Rating ----
export function StarRating({ rating = 5, size = "sm" }: { rating?: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i < rating ? "text-amber fill-amber" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

// ---- Breadcrumbs ----
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            {item.href ? (
              <Link href={item.href} className="hover:text-navy transition-colors">{item.label}</Link>
            ) : (
              <span className="text-navy font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ---- Page Hero ----
export function PageHero({
  title,
  subtitle,
  body,
  image,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  body?: string;
  image: string;
  breadcrumbs?: { label: string; href?: string }[];
  compact?: boolean; // kept for backward compat, no longer used
}) {
  return (
    <section className="relative overflow-hidden min-h-[45vh] md:min-h-[50vh]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-[#000000]/55 to-[#000000]/30" />
      </div>
      <div className="container relative z-10 flex flex-col justify-end py-12 md:py-16 lg:py-20" style={{ minHeight: 'inherit' }}>
        {breadcrumbs && (
          <nav className="text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              {breadcrumbs.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.5, ease: "easeOut" }}
            className="mt-3 text-base md:text-lg text-white/90 max-w-2xl font-medium"
          >
            {subtitle}
          </motion.p>
        )}
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            className="mt-5 text-sm md:text-base text-white/85 max-w-2xl leading-relaxed"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}

// ---- JSON-LD Helper (server-safe) ----
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
