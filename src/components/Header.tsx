"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { COMPANY, NAV_ITEMS } from "@/lib/data";
import { Phone, Menu, X, ChevronDown, ChevronRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import logoImg from "@assets/rr_logo_ol.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleScrollNav = (sectionId: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white/90 text-sm hidden md:block">
        <div className="container flex justify-center items-center py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber" />
              <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-amber transition-colors font-medium">
                {COMPANY.phone}
              </a>
            </span>
            <span className="text-white/50">|</span>
            <span className="text-white/70">SC License {COMPANY.license}</span>
            <span className="text-white/50">|</span>
            <span className="text-amber font-medium">24/7 Emergency Service</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70">Serving Charleston &amp; the Lowcountry</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70">Se Habla Español</span>
          </div>
        </div>
      </div>

      {/* Main nav — white background with black text */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="container flex items-center justify-between py-0">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 ml-4 lg:ml-8">
            <Image
              src={logoImg}
              alt="Restoration Roofing SC"
              className="h-20 lg:h-24 w-auto py-1"
              width={96}
              height={96}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    onClick={() => handleScrollNav("services")}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-800 hover:text-black transition-colors rounded-md hover:bg-gray-100"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 mt-1"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3 text-amber" />
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.scrollTo ? (
                <button
                  key={item.label}
                  onClick={() => handleScrollNav(item.scrollTo!)}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-800 hover:text-black hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "text-black bg-gray-100"
                      : "text-gray-800 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Sun className={`w-4 h-4 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"} absolute`} />
              <Moon className={`w-4 h-4 transition-all duration-300 ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
            </button>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="flex items-center gap-2 text-black font-semibold text-sm hover:text-amber transition-colors"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              className="btn-amber px-5 py-2.5 rounded-md text-sm inline-flex items-center gap-2"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Sun className={`w-4 h-4 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"} absolute`} />
              <Moon className={`w-4 h-4 transition-all duration-300 ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
            </button>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="btn-amber p-2.5 rounded-md"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-black"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-gray-200 bg-white"
            >
              <div className="container py-4 space-y-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-800 hover:text-black rounded-md hover:bg-gray-100"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:text-black"
                              >
                                <ChevronRight className="w-3 h-3 text-amber" />
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.scrollTo ? (
                    <button
                      key={item.label}
                      onClick={() => handleScrollNav(item.scrollTo!)}
                      className="block w-full text-left px-3 py-3 text-sm font-medium text-gray-800 hover:text-black rounded-md hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className="block px-3 py-3 text-sm font-medium text-gray-800 hover:text-black rounded-md hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="pt-3 border-t border-gray-200 mt-3">
                  <Link
                    href="/contact"
                    className="btn-amber w-full py-3 rounded-md text-sm text-center block font-semibold"
                  >
                    Get Your Free Estimate
                  </Link>
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>24/7 Emergency: {COMPANY.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
