"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY, IMAGES } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, JsonLdScript } from "@/components/shared";
import { DollarSign, Calculator, Phone, ArrowRight, Percent, Calendar, CreditCard } from "lucide-react";

export default function FinancingContent() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(6.99);

  const monthlyPayment = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return loanAmount / term;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  }, [loanAmount, term, rate]);

  const totalCost = monthlyPayment * term;
  const totalInterest = totalCost - loanAmount;

  const options = [
    {
      title: "Same-As-Cash",
      term: "12 Months",
      rate: "0% APR",
      desc: "Pay off your roof within 12 months with zero interest. Perfect for homeowners who want to spread payments without extra cost.",
      highlight: true,
    },
    {
      title: "Low Monthly",
      term: "60 Months",
      rate: "From 6.99% APR",
      desc: "Affordable monthly payments over 5 years. Keep your savings intact while protecting your home with a new roof.",
      highlight: false,
    },
    {
      title: "Extended Term",
      term: "120 Months",
      rate: "From 9.99% APR",
      desc: "The lowest possible monthly payment spread over 10 years. Ideal for larger projects or budget-conscious homeowners.",
      highlight: false,
    },
  ];

  return (
    <>
      <JsonLdScript data={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        name: "Roofing Financing Plans",
        provider: { "@type": "Organization", name: "Restoration Roofing SC" },
        description: "Affordable roofing financing options including 0% APR plans for Charleston, SC homeowners.",
      }} />

      <PageHero
        title="Flexible Financing Options"
        subtitle="Don't let budget concerns delay protecting your home. We offer affordable financing plans to fit every budget."
        image={IMAGES.heroResidential}
        breadcrumbs={[{ label: "Financing" }]}
        compact
      />

      {/* Financing Options */}
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Payment Plans"
            title="Roofing Financing Made Easy"
            subtitle="We've partnered with leading lenders to offer flexible financing options. Quick approval, competitive rates, and no prepayment penalties."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {options.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-lg border p-6 text-center relative ${
                  opt.highlight
                    ? "border-amber bg-amber/5 shadow-lg"
                    : "border-border/50 bg-white"
                }`}
              >
                {opt.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-lg font-semibold text-navy mb-1">{opt.title}</h3>
                <div className="text-3xl font-display font-bold text-amber mb-1">{opt.rate}</div>
                <div className="text-sm text-gray-600 mb-4">{opt.term}</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">{opt.desc}</p>
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    opt.highlight
                      ? "btn-amber"
                      : "border border-navy text-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Calculator */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-linen rounded-xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-amber" />
                <h2 className="font-display text-2xl font-bold text-navy">Payment Calculator</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-navy mb-2">
                      <span>Loan Amount</span>
                      <span className="text-amber font-semibold">${loanAmount.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min={5000}
                      max={75000}
                      step={500}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-navy/10 accent-amber"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$5,000</span>
                      <span>$75,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-navy mb-2">
                      <span>Loan Term</span>
                      <span className="text-amber font-semibold">{term} months</span>
                    </label>
                    <input
                      type="range"
                      min={12}
                      max={180}
                      step={12}
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-navy/10 accent-amber"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>12 mo</span>
                      <span>180 mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-navy mb-2">
                      <span>Interest Rate (APR)</span>
                      <span className="text-amber font-semibold">{rate}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={18}
                      step={0.25}
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-navy/10 accent-amber"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0%</span>
                      <span>18%</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-lg p-6 border border-border/50">
                  <h3 className="font-display text-base font-semibold text-navy mb-4">Estimated Payment</h3>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-display font-bold text-amber mb-1">
                      ${monthlyPayment.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-medium text-navy">${loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-medium text-navy">${totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Total Cost</span>
                      <span className="font-semibold text-navy">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                    * This is an estimate only. Actual rates and terms depend on credit approval. Contact us for a personalized quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow="Why Finance?"
            title="Benefits of Financing Your Roof"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CreditCard, title: "Quick Approval", desc: "Get approved in minutes with our streamlined application process." },
              { icon: Percent, title: "Competitive Rates", desc: "Low interest rates starting at 0% APR for qualified borrowers." },
              { icon: Calendar, title: "Flexible Terms", desc: "Choose from 12 to 180 month terms to fit your budget." },
              { icon: DollarSign, title: "No Prepayment Penalty", desc: "Pay off your loan early without any additional fees." },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-amber" />
                </div>
                <h3 className="font-display text-base font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Get Started?"
        subtitle="Contact us today to discuss financing options and get a free estimate for your roofing project."
      />
    </>
  );
}
