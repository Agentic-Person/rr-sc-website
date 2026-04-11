"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS, COMPANY, IMAGES } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, JsonLdScript, StarRating } from "@/components/shared";
import { Star, ExternalLink, Quote } from "lucide-react";

export default function ReviewsContent() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: COMPANY.fullName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.googleRating,
      reviewCount: COMPANY.googleReviewCount,
      bestRating: 5,
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating },
      reviewBody: t.text,
    })),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title="Customer Reviews"
        subtitle="Don't just take our word for it. Read what your neighbors say about working with Restoration Roofing."
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: "Reviews" }]}
      />

      {/* Rating Summary */}
      <section className="bg-white border-b border-border/50">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-navy">{COMPANY.googleRating}</div>
                <StarRating rating={5} size="md" />
                <div className="text-sm text-gray-600 mt-1">{COMPANY.googleReviewCount}+ Reviews</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-border" />
              <div className="space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = TESTIMONIALS.filter(t => t.rating === stars).length;
                  const pct = (count / TESTIMONIALS.length) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-3">{stars}</span>
                      <Star className="w-3 h-3 text-amber fill-amber" />
                      <div className="w-32 h-2 bg-navy/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-600 w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href={COMPANY.socialLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber px-6 py-3 rounded-md text-sm inline-flex items-center gap-2"
            >
              Leave Us a Review on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="section-padding bg-linen">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-border/50 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <StarRating rating={testimonial.rating} size="sm" />
                  <Quote className="w-5 h-5 text-amber/30" />
                </div>
                <p className="text-sm text-gray-800 leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-navy">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">{testimonial.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      {testimonial.location && <span>{testimonial.location}</span>}
                      {testimonial.service && (
                        <>
                          <span>·</span>
                          <span>{testimonial.service}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Reviews CTA */}
          <div className="mt-12 bg-navy rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-display text-xl font-bold text-white">Google Reviews</span>
            </div>
            <p className="text-white/70 mb-4 max-w-lg mx-auto">
              We&apos;re proud of our {COMPANY.googleRating}-star rating on Google. If you&apos;ve worked with us, we&apos;d love to hear about your experience.
            </p>
            <a
              href={COMPANY.socialLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber px-8 py-3 rounded-md text-sm inline-flex items-center gap-2"
            >
              Write a Review
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        title="Join Our Happy Customers"
        subtitle="Experience the Restoration Roofing difference. Get a free estimate and see why your neighbors trust us."
      />
    </>
  );
}
