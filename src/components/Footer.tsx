import Link from "next/link";
import Image from "next/image";
import { COMPANY, LOCATIONS } from "@/lib/data";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import logoImg from "@assets/rr_logo_ol-removebg-preview.png";

function WaveDivider() {
  return (
    <div className="relative -mt-1">
      <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-16 lg:h-20">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="#000000"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const primaryLocations = LOCATIONS.filter(l =>
    ["charleston", "mount-pleasant", "summerville", "north-charleston", "daniel-island", "isle-of-palms", "sullivans-island", "folly-beach", "james-island", "johns-island"].includes(l.slug)
  );

  return (
    <>
      <WaveDivider />
      <footer className="bg-navy text-white/80">
        {/* Main footer */}
        <div className="container py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <Link href="/" className="block mb-3">
                <Image
                  src={logoImg}
                  alt="Restoration Roofing SC"
                  className="h-28 lg:h-32 w-auto"
                  width={128}
                  height={128}
                />
              </Link>
              <p className="font-display text-xl font-bold !text-white mb-4">Restoration Roofing SC</p>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                Family-owned roofing contractor serving Charleston and the Lowcountry. Licensed, insured, and committed to protecting your home with expert craftsmanship.
              </p>
              <div className="space-y-3">
                <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2.5 text-sm hover:text-amber transition-colors">
                  <Phone className="w-4 h-4 text-amber" />
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm hover:text-amber transition-colors">
                  <Mail className="w-4 h-4 text-amber" />
                  {COMPANY.email}
                </a>
                <div className="flex items-start gap-2.5 text-sm">
                  <MapPin className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                  {COMPANY.address}
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-amber" />
                  24/7 Emergency Service
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Shield className="w-4 h-4 text-amber" />
                  SC License {COMPANY.license}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-display text-white text-base font-semibold mb-4 tracking-wide">Our Services</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Roof Installation", href: "/services/roof-installation" },
                  { label: "Roof Repair", href: "/services/roof-repairs" },
                  { label: "Metal Roofing", href: "/services/metal-roofing" },
                  { label: "Shingle Roofing", href: "/services/shingle-roofing" },
                  { label: "Storm Damage", href: "/services/storm-damage" },
                  { label: "Gutter Installation", href: "/services/gutter-installation" },
                  { label: "Roof Inspections", href: "/services/roof-inspections" },
                  { label: "Flat Roofing", href: "/services/flat-roofing" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-amber transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas We Serve */}
            <div>
              <h3 className="font-display text-white text-base font-semibold mb-4 tracking-wide">Areas We Serve</h3>
              <ul className="space-y-2.5">
                {primaryLocations.map((loc) => (
                  <li key={loc.slug}>
                    <Link href={`/areas-we-serve/${loc.slug}`} className="text-sm text-white/60 hover:text-amber transition-colors">
                      {loc.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/areas-we-serve" className="text-sm text-amber hover:text-amber-light transition-colors font-medium">
                    View All 21 Locations →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links & CTA */}
            <div>
              <h3 className="font-display text-white text-base font-semibold mb-4 tracking-wide">Quick Links</h3>
              <ul className="space-y-2.5 mb-6">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Reviews", href: "/reviews" },
                  { label: "Financing", href: "/financing" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "AI Assistant", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-amber transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-white font-semibold mb-2">Need Emergency Service?</p>
                <p className="text-xs text-white/50 mb-3">We respond 24/7 to roofing emergencies throughout the Charleston area.</p>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="btn-amber w-full py-2.5 rounded-md text-sm text-center block"
                >
                  Call Now: {COMPANY.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <a href={COMPANY.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber/20 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </a>
                <a href={COMPANY.socialLinks.google} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber/20 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Restoration Roofing SC. All rights reserved. SC License RBC 694.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
