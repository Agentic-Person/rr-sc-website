"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "@/lib/data";
import { PageHero, CTABanner, JsonLdScript } from "@/components/shared";
import { X, MapPin, CheckCircle2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  image: string;
  details: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Complete Roof Replacement",
    location: "Mount Pleasant, SC",
    type: "Architectural Shingles",
    description: "Full tear-off and replacement with GAF Timberline HDZ architectural shingles on this Lowcountry-style home. Included new ridge vent, drip edge, and ice & water shield.",
    image: IMAGES.heroResidential,
    details: ["GAF Timberline HDZ", "Full tear-off", "New ridge vent", "Ice & water shield", "10-year workmanship warranty"],
  },
  {
    id: 2,
    title: "Hurricane Damage Restoration",
    location: "Isle of Palms, SC",
    type: "Storm Damage Repair",
    description: "Emergency response and complete restoration after hurricane damage. Managed the entire insurance claim process and restored the roof to better-than-original condition.",
    image: IMAGES.heroStormDamage,
    details: ["Emergency tarping", "Insurance claim managed", "Full restoration", "Impact-resistant shingles", "Wind-rated installation"],
  },
  {
    id: 3,
    title: "Standing Seam Metal Roof",
    location: "Daniel Island, SC",
    type: "Metal Roofing",
    description: "Premium standing seam metal roof installation on a new construction home. Galvalume panels with concealed fasteners for maximum durability and coastal performance.",
    image: IMAGES.heroCommercial,
    details: ["Standing seam panels", "Galvalume finish", "Concealed fasteners", "50-year warranty", "Hurricane-rated"],
  },
  {
    id: 4,
    title: "Historic Home Restoration",
    location: "Charleston, SC",
    type: "Slate-Look Shingles",
    description: "Careful restoration of a historic Charleston single house roof. Used synthetic slate shingles to maintain the historic aesthetic while providing modern performance.",
    image: IMAGES.heroAbout,
    details: ["Synthetic slate", "Historic preservation", "Custom copper flashing", "Period-appropriate design", "BAR approved"],
  },
  {
    id: 5,
    title: "Gutter System Installation",
    location: "Summerville, SC",
    type: "Seamless Gutters",
    description: "Complete seamless gutter system installation with leaf guards on a large colonial home. Custom color-matched to the existing trim for a seamless look.",
    image: IMAGES.heroResidential,
    details: ["6-inch seamless gutters", "Leaf guard system", "Custom color match", "Oversized downspouts", "Lifetime warranty"],
  },
  {
    id: 6,
    title: "Commercial Flat Roof",
    location: "North Charleston, SC",
    type: "TPO Membrane",
    description: "Commercial flat roof replacement with TPO membrane system. Energy-efficient white membrane reduces cooling costs in Charleston's hot summers.",
    image: IMAGES.heroCommercial,
    details: ["TPO membrane", "Energy Star rated", "20-year warranty", "Tapered insulation", "Commercial grade"],
  },
];

const categories = ["All", "Shingles", "Metal", "Storm Damage", "Gutters", "Commercial"];

export default function PortfolioContent() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <JsonLdScript data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Restoration Roofing SC Project Portfolio",
        description: "Completed roofing projects across Charleston, SC including roof replacements, storm damage repairs, and metal roofing installations.",
        url: "https://www.restorationroofingsc.com/portfolio",
      }} />

      <PageHero
        title="Our Work"
        subtitle="Browse our portfolio of completed roofing projects across the Charleston area. Every project reflects our commitment to quality craftsmanship."
        image={IMAGES.heroResidential}
        breadcrumbs={[{ label: "Portfolio" }]}
        compact
      />

      <section className="section-padding bg-white">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-navy text-white"
                    : "bg-linen text-gray-700 hover:bg-navy/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors flex items-center justify-center">
                        <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-navy/80 px-4 py-2 rounded-md">
                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded">{project.type}</span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-navy mb-1">{project.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-[16/9] object-cover rounded-t-xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded">{selectedProject.type}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {selectedProject.location}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy mb-4">{selectedProject.title}</h2>
                <p className="text-gray-800 leading-relaxed mb-6">{selectedProject.description}</p>
                <h3 className="font-display text-base font-semibold text-navy mb-3">Project Details</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner
        title="Ready to Start Your Project?"
        subtitle="Join our growing portfolio of satisfied customers. Get a free estimate today."
      />
    </>
  );
}
