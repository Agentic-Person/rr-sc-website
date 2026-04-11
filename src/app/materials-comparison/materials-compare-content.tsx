"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, ArrowRight, Check, X, Shield, Droplets, Wind, Sun,
  ChevronDown, ChevronUp, Star, Info, DollarSign, Clock, Award,
  Zap, Filter, BarChart3, ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROOFING_MATERIALS, getRatingBgColor, formatPriceRange, getCategoryLabel, type RoofingMaterial } from '@/lib/materials';
import { COMPANY } from '@/lib/data';
import { JsonLdScript } from '@/components/shared';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/112751785/QzW5An8GggbtcG7rNRpiT7/materials-comparison-hero-if6wAVxL5RX4ZgvkcwQt7z.webp';

type SortField = 'name' | 'installedCost' | 'lifespan' | 'popularity';
type SortDir = 'asc' | 'desc';

function RatingBadge({ rating }: { rating: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRatingBgColor(rating)}`}>
      {rating}
    </span>
  );
}

function MaterialCard({ material, isSelected, onToggle }: {
  material: RoofingMaterial;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 transition-all duration-300 overflow-hidden bg-white ${
        isSelected ? 'border-[#ED5A00] shadow-lg shadow-amber-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* House Image (if available) */}
      {material.houseImage && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={material.houseImage}
            alt={`Home with ${material.name} installed`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {material.popularityRank <= 3 && (
            <div className="absolute top-3 left-3 bg-[#ED5A00] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> #{material.popularityRank} Most Popular
            </div>
          )}
          <button
            onClick={onToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-[#ED5A00] text-white'
                : 'bg-white/90 text-gray-600 hover:bg-[#ED5A00] hover:text-white'
            }`}
            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isSelected ? <Check className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Card Header with Material Close-up */}
      <div className={`relative ${material.houseImage ? 'h-44' : 'h-48'} overflow-hidden`}>
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">
            {getCategoryLabel(material.category)}
          </span>
          <h3 className="text-lg font-bold text-white font-serif">{material.name}</h3>
        </div>
        {!material.houseImage && (
          <>
            <button
              onClick={onToggle}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#ED5A00] text-white'
                  : 'bg-white/90 text-gray-600 hover:bg-[#ED5A00] hover:text-white'
              }`}
              title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
            >
              {isSelected ? <Check className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
            </button>
            {material.popularityRank <= 3 && (
              <div className="absolute top-3 left-3 bg-[#ED5A00] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> #{material.popularityRank} Most Popular
              </div>
            )}
          </>
        )}
      </div>

      {/* Pricing */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Material Only</p>
            <p className="text-base font-bold text-[#000000]">
              {formatPriceRange(material.materialCostMin, material.materialCostMax)}
              <span className="text-xs font-normal text-gray-500"> /sq ft</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Installed</p>
            <p className="text-base font-bold text-[#ED5A00]">
              {formatPriceRange(material.installedCostMin, material.installedCostMax)}
              <span className="text-xs font-normal text-gray-500"> /sq ft</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6B8F71]" />
            <span className="text-gray-600">{material.lifespanMin}-{material.lifespanMax} years</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#6B8F71]" />
            <span className="text-gray-600">{material.windRating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#6B8F71]" />
            <span className="text-gray-600">{material.warranty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#6B8F71]" />
            <RatingBadge rating={material.hurricaneRating} />
          </div>
        </div>
      </div>

      {/* SC Climate Ratings */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SC Climate Performance</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" /> Hurricane
            </span>
            <RatingBadge rating={material.hurricaneRating} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" /> Humidity
            </span>
            <RatingBadge rating={material.humidityResistance} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Salt Air
            </span>
            <RatingBadge rating={material.saltAirResistance} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" /> Energy Efficiency
            </span>
            <RatingBadge rating={material.energyEfficiency} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{material.description}</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-[#ED5A00] hover:text-[#C44B00] flex items-center gap-1"
        >
          {expanded ? 'Show Less' : 'Show More Details'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Best For */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Best For</p>
                <div className="flex flex-wrap gap-1.5">
                  {material.bestFor.map((item, i) => (
                    <span key={i} className="text-xs bg-[#F7F4EE] text-[#000000] px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>
              </div>

              {/* Pros */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Advantages</p>
                <ul className="space-y-1">
                  {material.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Considerations</p>
                <ul className="space-y-1">
                  {material.cons.map((con, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SC Climate Notes */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Charleston Climate Notes
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">{material.scClimateNotes}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ComparisonTable({ materials }: { materials: RoofingMaterial[] }) {
  if (materials.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-[#000000] px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white font-serif">Side-by-Side Comparison</h3>
        <span className="text-sm text-gray-300">{materials.length} material{materials.length > 1 ? 's' : ''} selected</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F7F4EE]">
              <th className="text-left px-4 py-3 text-sm font-semibold text-[#000000] w-48">Feature</th>
              {materials.map(m => (
                <th key={m.id} className="text-center px-4 py-3 text-sm font-semibold text-[#000000] min-w-[180px]">
                  {m.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#ED5A00]" /> Material Cost
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-sm text-center text-gray-700">
                  {formatPriceRange(m.materialCostMin, m.materialCostMax)}/sf
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#ED5A00]" /> Installed Cost
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-sm text-center font-semibold text-[#ED5A00]">
                  {formatPriceRange(m.installedCostMin, m.installedCostMax)}/sf
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6B8F71]" /> Lifespan
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-sm text-center text-gray-700">
                  {m.lifespanMin}-{m.lifespanMax} years
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#6B8F71]" /> Wind Rating
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-sm text-center text-gray-700">{m.windRating}</td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#6B8F71]" /> Warranty
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-sm text-center text-gray-700">{m.warranty}</td>
              ))}
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6B8F71]" /> Hurricane Rating
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-center"><RatingBadge rating={m.hurricaneRating} /></td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#6B8F71]" /> Humidity Resistance
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-center"><RatingBadge rating={m.humidityResistance} /></td>
              ))}
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#6B8F71]" /> Salt Air Resistance
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-center"><RatingBadge rating={m.saltAirResistance} /></td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#6B8F71]" /> Energy Efficiency
              </td>
              {materials.map(m => (
                <td key={m.id} className="px-4 py-3 text-center"><RatingBadge rating={m.energyEfficiency} /></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cost Estimate Calculator */}
      <div className="border-t border-gray-200 bg-[#F7F4EE] p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#000000]">Ready to See Your Exact Price?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Get a personalized estimate based on your roof's exact measurements — no obligation, no pressure.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-[#ED5A00] hover:bg-[#C44B00] text-white px-6 py-3 text-base font-semibold rounded-lg whitespace-nowrap">
              Get Your Instant Estimate <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MaterialsCompareContent() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('popularity');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const toggleMaterial = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 4) {
        next.add(id);
      }
      return next;
    });
  };

  const categories = useMemo(() => {
    const cats = new Set(ROOFING_MATERIALS.map(m => m.category));
    return Array.from(cats);
  }, []);

  const filteredMaterials = useMemo(() => {
    let materials = [...ROOFING_MATERIALS];
    if (categoryFilter !== 'all') {
      materials = materials.filter(m => m.category === categoryFilter);
    }
    materials.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'installedCost': cmp = a.installedCostMin - b.installedCostMin; break;
        case 'lifespan': cmp = a.lifespanMax - b.lifespanMax; break;
        case 'popularity': cmp = a.popularityRank - b.popularityRank; break;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return materials;
  }, [categoryFilter, sortField, sortDir]);

  const selectedMaterials = useMemo(() => {
    return ROOFING_MATERIALS.filter(m => selectedIds.has(m.id));
  }, [selectedIds]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  return (
    <>
      <JsonLdScript data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Roofing Materials Comparison Tool',
        description: 'Interactive comparison of 13 roofing materials with pricing, specifications, and South Carolina climate performance ratings.',
        provider: {
          '@type': 'RoofingContractor',
          name: COMPANY.fullName,
          telephone: COMPANY.phone,
        },
      }} />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Various roofing materials on Charleston Lowcountry homes"
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-[#000000]/55 to-[#000000]/30" />
        <div className="relative h-full container flex items-end pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="inline-block text-[#ED5A00] font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Transparent Pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1.5, ease: "easeOut" }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            >
              Roofing Materials<br />Comparison
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              className="text-lg text-gray-200 leading-relaxed max-w-xl mb-6"
            >
              Compare 13 roofing materials side by side. Real prices, honest ratings, and how each performs
              in Charleston&apos;s hurricanes, humidity, and salt air. No surprises — just transparency.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <a href={`tel:${COMPANY.phone}`}>
                <Button className="bg-[#ED5A00] hover:bg-[#C44B00] text-white px-6 py-3 text-base font-semibold rounded-lg">
                  <Phone className="w-4 h-4 mr-2" /> Call for Free Estimate
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-base font-semibold rounded-lg">
                  Get Your Instant Estimate <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#000000] py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-300">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ED5A00]" /> Prices Updated March 2026</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ED5A00]" /> Charleston SC Market Rates</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ED5A00]" /> No Hidden Fees</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ED5A00]" /> Free In-Home Estimates</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#000000] mb-3">How to Use This Tool</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse all 13 materials below, then select up to 4 to compare side by side. 
              Each card shows real pricing, lifespan, and how the material handles Charleston's unique coastal challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Browse Materials', desc: 'Explore all 13 roofing options with pricing and SC climate ratings' },
              { step: '2', title: 'Select & Compare', desc: 'Click the compare icon on up to 4 materials to see them side by side' },
              { step: '3', title: 'Get Your Estimate', desc: 'Contact us for a free, no-obligation estimate based on your roof' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#ED5A00] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#000000] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table (sticky when materials selected) */}
      {selectedMaterials.length > 0 && (
        <section className="py-8 bg-[#F7F4EE]">
          <div className="container">
            <ComparisonTable materials={selectedMaterials} />
          </div>
        </section>
      )}

      {/* Materials Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#000000]">
                All Roofing Materials
              </h2>
              <p className="text-gray-600 mt-1">
                {selectedIds.size > 0
                  ? `${selectedIds.size} of 4 materials selected for comparison`
                  : 'Select up to 4 materials to compare side by side'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <div className="flex items-center gap-1 bg-[#F7F4EE] rounded-lg p-1">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    categoryFilter === 'all' ? 'bg-[#000000] text-white' : 'text-gray-600 hover:text-[#000000]'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 inline mr-1" /> All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                      categoryFilter === cat ? 'bg-[#000000] text-white' : 'text-gray-600 hover:text-[#000000]'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by:</span>
            {([
              ['popularity', 'Popularity'],
              ['installedCost', 'Price'],
              ['lifespan', 'Lifespan'],
              ['name', 'Name'],
            ] as [SortField, string][]).map(([field, label]) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  sortField === field
                    ? 'bg-[#000000] text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label} {sortField === field && (sortDir === 'asc' ? '↑' : '↓')}
              </button>
            ))}
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map(material => (
              <MaterialCard
                key={material.id}
                material={material}
                isSelected={selectedIds.has(material.id)}
                onToggle={() => toggleMaterial(material.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Price Disclaimer */}
      <section className="py-8 bg-[#F7F4EE]">
        <div className="container">
          <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#ED5A00] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">Important Pricing Notes</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    All prices shown reflect the Charleston, South Carolina market as of March 2026. Actual costs 
                    may vary based on your roof's size, pitch, complexity, accessibility, and any necessary structural 
                    repairs or decking replacement.
                  </p>
                  <p>
                    <strong>Material cost</strong> represents the raw material price per square foot. <strong>Installed cost</strong> includes 
                    materials, labor, underlayment, flashing, cleanup, and standard warranty. Tear-off of existing roofing, 
                    permits, and any structural modifications are additional.
                  </p>
                  <p>
                    We provide free, no-obligation in-home estimates with exact pricing for your specific roof. 
                    Call us at <a href={`tel:${COMPANY.phone}`} className="text-[#ED5A00] font-semibold hover:underline">{COMPANY.phone}</a> or 
                    {' '}<Link href="/contact" className="text-[#ED5A00] font-semibold hover:underline">request an estimate online</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#000000]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Choose Your Roof?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Our team will help you select the perfect material for your home, budget, and Charleston's 
            coastal climate. Free estimates, no pressure — just honest advice from local experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${COMPANY.phone}`}>
              <Button className="bg-[#ED5A00] hover:bg-[#C44B00] text-white px-8 py-4 text-lg font-semibold rounded-lg">
                <Phone className="w-5 h-5 mr-2" /> {COMPANY.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg">
                Schedule Free Estimate <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
