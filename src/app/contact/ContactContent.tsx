"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY, IMAGES } from "@/lib/data";
import { PageHero, JsonLdScript } from "@/components/shared";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
    preferredContact: "phone",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || "",
          phone: formData.phone,
          address: formData.address || "",
          service: formData.service || "",
          message: formData.message || "",
          preferred_contact: formData.preferredContact,
        }),
      });

      const result = await response.json();

      setSubmitting(false);

      if (!response.ok) {
        console.error("Form submission error:", result.error);
        toast.error(result.error || "Something went wrong. Please call us directly or try again.");
        return;
      }
    } catch (err) {
      setSubmitting(false);
      console.error("Form submission error:", err);
      toast.error("Something went wrong. Please call us directly or try again.");
      return;
    }

    setSubmitted(true);
    toast.success("Thank you! We'll contact you within 24 hours.");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: COMPANY.fullName,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1261 Pearwood Ct",
      addressLocality: "Mount Pleasant",
      addressRegion: "SC",
      postalCode: "29464",
      addressCountry: "US",
    },
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title="Contact Us"
        subtitle="Get a free, no-obligation roof inspection and estimate. We respond to all inquiries within 24 hours."
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: "Contact" }]}
        compact
      />

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-navy mb-2">Request a Free Estimate</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-sage/10 border border-sage/30 rounded-lg p-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-sage mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">Thank You!</h3>
                  <p className="text-gray-700 mb-4">
                    We&apos;ve received your request and will contact you within 24 hours. For immediate assistance, call us at{" "}
                    <a href={`tel:${COMPANY.phoneRaw}`} className="text-amber font-semibold">{COMPANY.phone}</a>.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another Request</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                        placeholder="(843) 555-0123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Property Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                        placeholder="123 Main St, Charleston, SC"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="roof-installation">Roof Installation / Replacement</option>
                      <option value="roof-repair">Roof Repair</option>
                      <option value="storm-damage">Storm / Hurricane Damage</option>
                      <option value="metal-roofing">Metal Roofing</option>
                      <option value="shingle-roofing">Shingle Roofing</option>
                      <option value="flat-roofing">Flat / Low-Slope Roofing</option>
                      <option value="gutter">Gutter Installation / Repair</option>
                      <option value="inspection">Roof Inspection</option>
                      <option value="insurance">Insurance Claim Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors resize-none"
                      placeholder="Tell us about your roofing needs..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Preferred Contact Method</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="text-amber focus:ring-amber"
                        />
                        <span className="text-sm text-gray-800">Phone</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="text-amber focus:ring-amber"
                        />
                        <span className="text-sm text-gray-800">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="text"
                          checked={formData.preferredContact === "text"}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="text-amber focus:ring-amber"
                        />
                        <span className="text-sm text-gray-800">Text</span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="btn-amber px-8 py-3.5 rounded-md text-sm w-full sm:w-auto" disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {submitting ? "Sending..." : "Send Request"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                {/* Emergency Banner */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-display text-base font-semibold text-red-800">Emergency Roof Damage?</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-3">
                    Don&apos;t wait — call us now for immediate emergency tarping and repair service. Available 24/7.
                  </p>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now: {COMPANY.phone}
                  </a>
                </div>

                {/* Contact Details */}
                <div className="bg-linen rounded-lg p-6">
                  <h3 className="font-display text-lg font-semibold text-navy mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-3 text-sm text-gray-800 hover:text-amber transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-amber" />
                      </div>
                      <div>
                        <div className="font-medium text-navy">{COMPANY.phone}</div>
                        <div className="text-xs text-gray-600">Available 24/7</div>
                      </div>
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-gray-800 hover:text-amber transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-amber" />
                      </div>
                      <div>
                        <div className="font-medium text-navy">{COMPANY.email}</div>
                        <div className="text-xs text-gray-600">Response within 24 hours</div>
                      </div>
                    </a>
                    <div className="flex items-start gap-3 text-sm text-gray-800">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-amber" />
                      </div>
                      <div>
                        <div className="font-medium text-navy">{COMPANY.address}</div>
                        <div className="text-xs text-gray-600">Mount Pleasant, SC</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-800">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-amber" />
                      </div>
                      <div>
                        <div className="font-medium text-navy">Mon-Sat: 7:00 AM - 7:00 PM</div>
                        <div className="text-xs text-gray-600">Emergency: 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Se Habla Español */}
                <div className="bg-navy rounded-lg p-5 text-center">
                  <p className="text-amber font-display text-lg font-semibold mb-1">Se Habla Español</p>
                  <p className="text-sm text-white/70">Nuestro equipo bilingüe está listo para ayudarle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
