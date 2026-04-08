"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/data";
import { COMPANY } from "@/lib/data";
import {
  CheckCircle2, AlertTriangle, Wrench, Package, ClipboardList, Calendar,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ServiceDetailContent({ service }: { service: Service }) {
  return (
    <>
      {/* Long Description */}
      <div className="prose prose-lg max-w-none">
        {service.longDescription.split("\n\n").map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-gray-800 leading-relaxed mb-5"
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* Additional Images Gallery */}
      {service.additionalImages && service.additionalImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`grid gap-4 ${
            service.additionalImages.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {service.additionalImages.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={img}
                alt={`${service.shortTitle} - Image ${i + 2}`}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* What to Expect */}
      {service.whatToExpect && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linen rounded-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              What to Expect
            </h3>
          </div>
          <div className="prose prose-sm max-w-none">
            {service.whatToExpect.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-gray-700 leading-relaxed mb-4 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Our Process */}
      {service.process && service.process.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-amber" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Our Process
            </h3>
          </div>
          <div className="space-y-0">
            {service.process.map((step, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Timeline line */}
                {i < service.process!.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-amber/20" />
                )}
                {/* Step number */}
                <div className="w-10 h-10 bg-amber text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 relative z-10">
                  {i + 1}
                </div>
                <div className="pb-6">
                  <h4 className="font-semibold text-navy text-sm mb-1">
                    {step.step}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Signs You Need This Service */}
      {service.signsYouNeed && service.signsYouNeed.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 border border-red-100 rounded-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Signs You Need {service.shortTitle}
            </h3>
          </div>
          <ul className="space-y-3">
            {service.signsYouNeed.map((sign, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-800 leading-relaxed">
                  {sign}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-red-200">
            <p className="text-sm text-gray-700">
              Noticing any of these signs?{" "}
              <Link
                href="/contact"
                className="text-amber font-semibold hover:underline"
              >
                Schedule a free inspection
              </Link>{" "}
              or call us at{" "}
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="text-amber font-semibold hover:underline"
              >
                {COMPANY.phone}
              </a>
              .
            </p>
          </div>
        </motion.div>
      )}

      {/* Seasonal Considerations */}
      {service.seasonalConsiderations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-sage/5 border border-sage/20 rounded-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-sage/15 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-sage" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Seasonal Considerations for South Carolina
            </h3>
          </div>
          <div className="prose prose-sm max-w-none">
            {service.seasonalConsiderations.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-gray-700 leading-relaxed mb-4 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Materials We Use */}
      {service.materialsWeUse && service.materialsWeUse.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Materials We Use
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.materialsWeUse.map((mat, i) => (
              <div
                key={i}
                className="bg-linen rounded-lg p-5 border border-amber/10"
              >
                <h4 className="font-semibold text-navy text-sm mb-2">
                  {mat.name}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {mat.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Features / What's Included */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-linen rounded-lg p-6 md:p-8"
      >
        <h3 className="font-display text-xl font-semibold text-navy mb-5">
          What&apos;s Included
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
              <span className="text-sm text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-xl font-semibold text-navy mb-5">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/50 rounded-lg px-5"
              >
                <AccordionTrigger className="text-sm font-semibold text-navy hover:text-amber text-left py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </>
  );
}
