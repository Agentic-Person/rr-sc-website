"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY, IMAGES } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, JsonLdScript } from "@/components/shared";
import { DollarSign, Calculator, Phone, ArrowRight, Percent, Calendar, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FIN_ES = {
  // Hero
  heroTitle: "Opciones de Financiamiento Flexibles",
  heroSubtitle:
    "No deje que el presupuesto postergue la protección de su hogar. Ofrecemos planes de financiamiento accesibles para adaptarse a cualquier situación económica.",
  heroBreadcrumb: "Financiamiento",

  // Options section
  optionsSectionEyebrow: "Planes de Pago",
  optionsSectionTitle: "Financiamiento de Techos Sin Complicaciones",
  optionsSectionSubtitle:
    "Nos hemos asociado con prestamistas líderes para ofrecer opciones de financiamiento con plazos flexibles. Aprobación rápida, tasas competitivas y sin penalidad por pago anticipado.",

  // Option cards
  option1Title: "Igual que en Efectivo",
  option1Term: "12 Meses",
  option1Desc:
    "Pague su techo en 12 meses sin ningún interés. Ideal para propietarios que desean distribuir los pagos sin costo adicional.",
  option2Title: "Cuota Mensual Baja",
  option2Term: "60 Meses",
  option2Desc:
    "Pagos mensuales accesibles durante 5 años. Mantenga sus ahorros intactos mientras protege su hogar con un techo nuevo.",
  option3Title: "Plazo Extendido",
  option3Term: "120 Meses",
  option3Desc:
    "El pago mensual más bajo posible distribuido a lo largo de 10 años. Perfecto para proyectos de mayor envergadura o propietarios con presupuesto ajustado.",
  mostPopular: "Más Popular",
  applyNow: "Solicite Ahora",

  // Calculator
  calcHeading: "Calculadora de Pagos",
  labelLoanAmount: "Monto del Préstamo",
  labelLoanTerm: "Plazo del Préstamo",
  labelInterestRate: "Tasa de Interés (APR)",
  termMonths: "meses",
  rangeMin12: "12 meses",
  rangeMax180: "180 meses",

  // Results panel
  estimatedPayment: "Pago Estimado",
  perMonth: "por mes",
  rowLoanAmount: "Monto del Préstamo",
  rowTotalInterest: "Interés Total",
  rowTotalCost: "Costo Total",
  calcDisclaimer:
    "* Este es un estimado únicamente. Las tasas y los plazos reales dependen de la aprobación crediticia. Contáctenos para obtener una cotización personalizada.",

  // Benefits section
  benefitsEyebrow: "¿Por Qué Financiar?",
  benefitsTitle: "Ventajas de Financiar su Techo",
  benefit1Title: "Aprobación Rápida",
  benefit1Desc:
    "Obtenga aprobación en minutos gracias a nuestro proceso de solicitud simplificado.",
  benefit2Title: "Tasas Competitivas",
  benefit2Desc:
    "Tasas de interés bajas desde 0% APR para prestatarios calificados.",
  benefit3Title: "Plazos Flexibles",
  benefit3Desc:
    "Elija entre plazos de 12 a 180 meses para adaptarse a su presupuesto.",
  benefit4Title: "Sin Penalidad por Pago Anticipado",
  benefit4Desc:
    "Cancele su préstamo antes de tiempo sin ningún cargo adicional.",

  // CTA Banner
  ctaTitle: "¿Listo para Comenzar?",
  ctaSubtitle:
    "Contáctenos hoy para conocer las opciones de financiamiento y obtener un presupuesto gratuito para su proyecto de techado.",
};

export default function FinancingContent() {
  const { lang } = useLanguage();
  const es = lang === "es";

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
      title: es ? FIN_ES.option1Title : "Same-As-Cash",
      term: es ? FIN_ES.option1Term : "12 Months",
      rate: "0% APR",
      desc: es ? FIN_ES.option1Desc : "Pay off your roof within 12 months with zero interest. Perfect for homeowners who want to spread payments without extra cost.",
      highlight: true,
    },
    {
      title: es ? FIN_ES.option2Title : "Low Monthly",
      term: es ? FIN_ES.option2Term : "60 Months",
      rate: "From 6.99% APR",
      desc: es ? FIN_ES.option2Desc : "Affordable monthly payments over 5 years. Keep your savings intact while protecting your home with a new roof.",
      highlight: false,
    },
    {
      title: es ? FIN_ES.option3Title : "Extended Term",
      term: es ? FIN_ES.option3Term : "120 Months",
      rate: "From 9.99% APR",
      desc: es ? FIN_ES.option3Desc : "The lowest possible monthly payment spread over 10 years. Ideal for larger projects or budget-conscious homeowners.",
      highlight: false,
    },
  ];

  const benefits = [
    {
      icon: CreditCard,
      title: es ? FIN_ES.benefit1Title : "Quick Approval",
      desc: es ? FIN_ES.benefit1Desc : "Get approved in minutes with our streamlined application process.",
    },
    {
      icon: Percent,
      title: es ? FIN_ES.benefit2Title : "Competitive Rates",
      desc: es ? FIN_ES.benefit2Desc : "Low interest rates starting at 0% APR for qualified borrowers.",
    },
    {
      icon: Calendar,
      title: es ? FIN_ES.benefit3Title : "Flexible Terms",
      desc: es ? FIN_ES.benefit3Desc : "Choose from 12 to 180 month terms to fit your budget.",
    },
    {
      icon: DollarSign,
      title: es ? FIN_ES.benefit4Title : "No Prepayment Penalty",
      desc: es ? FIN_ES.benefit4Desc : "Pay off your loan early without any additional fees.",
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
        title={es ? FIN_ES.heroTitle : "Flexible Financing Options"}
        subtitle={es ? FIN_ES.heroSubtitle : "Don't let budget concerns delay protecting your home. We offer affordable financing plans to fit every budget."}
        image={IMAGES.heroResidential}
        breadcrumbs={[{ label: es ? FIN_ES.heroBreadcrumb : "Financing" }]}
      />

      {/* Financing Options */}
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeader
            eyebrow={es ? FIN_ES.optionsSectionEyebrow : "Payment Plans"}
            title={es ? FIN_ES.optionsSectionTitle : "Roofing Financing Made Easy"}
            subtitle={es ? FIN_ES.optionsSectionSubtitle : "We've partnered with leading lenders to offer flexible financing options. Quick approval, competitive rates, and no prepayment penalties."}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {options.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-lg border p-6 text-center relative card-halo transition-all duration-300 ${
                  opt.highlight
                    ? "border-amber bg-amber/5 shadow-lg hover:shadow-2xl"
                    : "border-border/50 bg-white hover:shadow-lg hover:border-amber/30"
                }`}
              >
                {opt.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-white text-xs font-bold px-3 py-1 rounded-full">
                    {es ? FIN_ES.mostPopular : "Most Popular"}
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
                  {es ? FIN_ES.applyNow : "Apply Now"} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Calculator */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-linen rounded-xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-amber" />
                <h2 className="font-display text-2xl font-bold text-navy">
                  {es ? FIN_ES.calcHeading : "Payment Calculator"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-navy mb-2">
                      <span>{es ? FIN_ES.labelLoanAmount : "Loan Amount"}</span>
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
                      <span>{es ? FIN_ES.labelLoanTerm : "Loan Term"}</span>
                      <span className="text-amber font-semibold">{term} {es ? FIN_ES.termMonths : "months"}</span>
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
                      <span>{es ? FIN_ES.rangeMin12 : "12 mo"}</span>
                      <span>{es ? FIN_ES.rangeMax180 : "180 mo"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-navy mb-2">
                      <span>{es ? FIN_ES.labelInterestRate : "Interest Rate (APR)"}</span>
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
                  <h3 className="font-display text-base font-semibold text-navy mb-4">
                    {es ? FIN_ES.estimatedPayment : "Estimated Payment"}
                  </h3>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-display font-bold text-amber mb-1">
                      ${monthlyPayment.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">{es ? FIN_ES.perMonth : "per month"}</div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-gray-600">{es ? FIN_ES.rowLoanAmount : "Loan Amount"}</span>
                      <span className="font-medium text-navy">${loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-gray-600">{es ? FIN_ES.rowTotalInterest : "Total Interest"}</span>
                      <span className="font-medium text-navy">${totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{es ? FIN_ES.rowTotalCost : "Total Cost"}</span>
                      <span className="font-semibold text-navy">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                    {es ? FIN_ES.calcDisclaimer : "* This is an estimate only. Actual rates and terms depend on credit approval. Contact us for a personalized quote."}
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
            eyebrow={es ? FIN_ES.benefitsEyebrow : "Why Finance?"}
            title={es ? FIN_ES.benefitsTitle : "Benefits of Financing Your Roof"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
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
        title={es ? FIN_ES.ctaTitle : "Ready to Get Started?"}
        subtitle={es ? FIN_ES.ctaSubtitle : "Contact us today to discuss financing options and get a free estimate for your roofing project."}
      />
    </>
  );
}
