// Roofing Materials Comparison Data
// Pricing reflects Charleston, SC market rates (2025-2026)
// All prices are estimates and may vary based on roof complexity, pitch, and condition

export type EstimateTier = 'best' | 'better' | 'good';

export interface RoofingMaterial {
  id: string;
  name: string;
  shortName: string;
  category: 'asphalt' | 'metal' | 'flat';
  description: string;
  materialCostMin: number; // per sq ft
  materialCostMax: number;
  installedCostMin: number; // per sq ft
  installedCostMax: number;
  lifespanMin: number; // years
  lifespanMax: number;
  windRating: string; // mph
  warranty: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  scClimateNotes: string;
  hurricaneRating: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  humidityResistance: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  saltAirResistance: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  energyEfficiency: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  popularityRank: number; // 1 = most popular in Charleston area
  image: string;
  estimateTier?: EstimateTier; // Only shingles used in instant estimate tool
}

export const ROOFING_MATERIALS: RoofingMaterial[] = [
  {
    id: 'oc-duration',
    name: 'Owens Corning TruDefinition Duration',
    shortName: 'OC Duration',
    category: 'asphalt',
    estimateTier: 'best',
    description: 'Our premium shingle offering. Owens Corning TruDefinition Duration shingles deliver a rich, dimensional appearance with patented SureNail Technology for exceptional wind resistance. The heavyweight construction and advanced granule adhesion make this the top-tier choice for Charleston homeowners who want the best protection and curb appeal.',
    materialCostMin: 0, // TODO: Update with ABC pricing
    materialCostMax: 0,
    installedCostMin: 0,
    installedCostMax: 0,
    lifespanMin: 25,
    lifespanMax: 30,
    windRating: '130 mph',
    warranty: 'Lifetime Limited',
    bestFor: ['Homeowners wanting premium protection', 'New construction', 'Full roof replacements', 'High-visibility homes', 'Hurricane-prone coastal areas'],
    pros: ['SureNail Technology — triple layer of protection at the nail line', 'Class 4 impact resistance available', '130 mph wind warranty', 'TruDefinition color platform for bold, rich color', 'Algae-resistant with StreakGuard protection', 'Heavyweight construction for superior performance'],
    cons: ['Higher cost than standard architectural shingles', 'Premium pricing reflects premium product'],
    scClimateNotes: 'The Owens Corning Duration is an excellent fit for Charleston\'s hurricane-prone climate. The patented SureNail Technology provides a reinforced nailing zone that resists wind uplift — critical during tropical storms. The StreakGuard algae resistance combats the Lowcountry\'s humid conditions that promote dark algae streaks. When installed by a certified Owens Corning contractor with a 6-nail pattern, this shingle offers top-tier storm protection for South Carolina homes.',
    hurricaneRating: 'Very Good',
    humidityResistance: 'Very Good',
    saltAirResistance: 'Good',
    energyEfficiency: 'Good',
    popularityRank: 1,
    image: '', // TODO: Add product image
  },
  {
    id: 'oc-oakridge',
    name: 'Owens Corning Oakridge',
    shortName: 'OC Oakridge',
    category: 'asphalt',
    estimateTier: 'better',
    description: 'Our mid-tier shingle option. Owens Corning Oakridge shingles offer a great balance of performance, appearance, and value. These architectural shingles feature a dimensional wood-shake look with reliable wind and algae resistance — a proven choice for Charleston-area homes.',
    materialCostMin: 0, // TODO: Update with ABC pricing
    materialCostMax: 0,
    installedCostMin: 0,
    installedCostMax: 0,
    lifespanMin: 20,
    lifespanMax: 25,
    windRating: '110 mph',
    warranty: 'Lifetime Limited',
    bestFor: ['Value-conscious homeowners', 'Roof replacements', 'Rental and investment properties', 'General residential roofing'],
    pros: ['Excellent value for an architectural shingle', '110 mph wind resistance', 'Dimensional wood-shake appearance', 'Algae-resistant with StreakGuard', 'Wide range of color options', 'Trusted Owens Corning brand'],
    cons: ['Lower wind rating than Duration', 'Standard weight — not as heavy-duty as premium tier'],
    scClimateNotes: 'The Oakridge is a solid, reliable choice for Charleston-area homes. Its 110 mph wind rating meets South Carolina building code requirements, and the StreakGuard algae resistance helps maintain appearance in our humid Lowcountry climate. For homeowners who want quality Owens Corning performance at a more accessible price point, the Oakridge delivers dependable protection against our coastal weather.',
    hurricaneRating: 'Good',
    humidityResistance: 'Good',
    saltAirResistance: 'Good',
    energyEfficiency: 'Fair',
    popularityRank: 2,
    image: '', // TODO: Add product image
  },
  {
    id: 'tamko-storm-fighter',
    name: 'TAMKO Storm Fighter (Hail Guard)',
    shortName: 'Storm Fighter',
    category: 'asphalt',
    estimateTier: 'good',
    description: 'Our storm-rated shingle option. The TAMKO Storm Fighter with Hail Guard technology is engineered for extreme weather protection, with system warranties up to 160 mph winds. Purpose-built for regions that face hurricanes, hail, and severe storms — making it an ideal choice for the South Carolina coast.',
    materialCostMin: 0, // TODO: Update with ABC pricing
    materialCostMax: 0,
    installedCostMin: 0,
    installedCostMax: 0,
    lifespanMin: 20,
    lifespanMax: 30,
    windRating: '160 mph (system warranty)',
    warranty: 'Limited Lifetime',
    bestFor: ['Storm-prone areas', 'Homeowners prioritizing weather protection', 'Insurance discount seekers', 'Hail-prone locations', 'Coastal South Carolina homes'],
    pros: ['160 mph wind system warranty — exceeds Category 5 thresholds', 'Hail Guard impact resistance', 'Purpose-built for severe weather regions', 'May qualify for insurance premium discounts', 'Strong value for storm-rated protection'],
    cons: ['Fewer color options than Owens Corning lines', 'Less brand recognition than OC or GAF'],
    scClimateNotes: 'The TAMKO Storm Fighter is specifically designed for markets like Charleston where hurricanes and severe storms are a real threat. The 160 mph wind system warranty exceeds even Category 5 hurricane thresholds, providing exceptional peace of mind during storm season. The Hail Guard technology adds impact resistance that protects against wind-driven debris. Many South Carolina insurers offer premium discounts for shingles with this level of wind and impact rating.',
    hurricaneRating: 'Excellent',
    humidityResistance: 'Good',
    saltAirResistance: 'Good',
    energyEfficiency: 'Fair',
    popularityRank: 3,
    image: '', // TODO: Add product image
  },
  {
    id: 'standing-seam-metal',
    name: 'Standing Seam Metal Roof',
    shortName: 'Standing Seam',
    category: 'metal',
    description: 'The premier metal roofing system, standing seam features continuous panels running from ridge to eave with raised seams that interlock to form a watertight seal. This is the fastest-growing roofing choice in coastal South Carolina due to its exceptional hurricane resistance, longevity, and energy efficiency. Standing seam metal roofs can withstand winds up to 180 mph — well above Category 5 hurricane thresholds.',
    materialCostMin: 4.00,
    materialCostMax: 8.00,
    installedCostMin: 8.00,
    installedCostMax: 16.00,
    lifespanMin: 40,
    lifespanMax: 70,
    windRating: '140-180 mph',
    warranty: '30-50 years',
    bestFor: ['Hurricane-prone coastal homes', 'Energy-conscious homeowners', 'Modern and contemporary architecture', 'Long-term investment properties', 'Lowcountry raised homes'],
    pros: ['Exceptional hurricane resistance (140-180 mph)', 'Longest lifespan of common materials', 'Reflects solar heat — reduces cooling costs 25-40%', 'No exposed fasteners — superior leak protection', 'Resistant to mold, mildew, and algae', 'Recyclable at end of life', 'Increases home value significantly'],
    cons: ['Higher upfront cost', 'Can dent from large hail or falling branches', 'Expansion/contraction noise in extreme heat', 'Requires specialized installation skills', 'Limited color changes after installation'],
    scClimateNotes: 'Standing seam metal is arguably the best roofing choice for coastal South Carolina. Its interlocking panel design creates a virtually impenetrable barrier against wind-driven rain — critical during hurricane season. The reflective surface can reduce cooling costs by 25-40% during Charleston\'s hot, humid summers. Galvalume (steel with aluminum-zinc coating) or aluminum panels resist salt air corrosion. Many Isle of Palms, Sullivan\'s Island, and Folly Beach homes are switching to standing seam for its unmatched storm protection.',
    hurricaneRating: 'Excellent',
    humidityResistance: 'Excellent',
    saltAirResistance: 'Very Good',
    energyEfficiency: 'Excellent',
    popularityRank: 4,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
  },
  {
    id: 'tpo-flat',
    name: 'TPO Flat Roofing',
    shortName: 'TPO',
    category: 'flat',
    description: 'Thermoplastic Polyolefin (TPO) is the most popular single-ply membrane for flat and low-slope roofs. Its heat-welded seams create a watertight bond stronger than the membrane itself. TPO\'s white reflective surface is ideal for Charleston\'s hot climate, significantly reducing cooling costs. It\'s the go-to choice for commercial buildings, additions, porches, and any flat roof section.',
    materialCostMin: 2.00,
    materialCostMax: 4.00,
    installedCostMin: 5.00,
    installedCostMax: 12.00,
    lifespanMin: 20,
    lifespanMax: 30,
    windRating: 'Varies by attachment method',
    warranty: '15-25 years',
    bestFor: ['Flat and low-slope roofs', 'Commercial buildings', 'Porch and addition roofs', 'Energy-conscious building owners', 'Multi-family housing'],
    pros: ['Excellent energy efficiency — white reflective surface', 'Heat-welded seams are extremely strong', 'Resistant to UV, ozone, and chemical exposure', 'Lightweight and flexible', 'Cost-effective for flat roofs', 'Easy to repair'],
    cons: ['Only suitable for flat/low-slope roofs', 'Shorter lifespan than steep-slope materials', 'Can be punctured by foot traffic or debris', 'Seam quality depends heavily on installer skill', 'Limited aesthetic appeal'],
    scClimateNotes: 'TPO is the premier flat roofing choice for Charleston\'s climate. The white membrane reflects up to 90% of solar radiation, dramatically reducing cooling costs during the Lowcountry\'s long, hot summers. The heat-welded seams are critical for Charleston\'s heavy rainfall — they create a monolithic waterproof surface. For hurricane resistance, mechanically attached TPO with enhanced fastener patterns provides the best wind uplift performance. Many Charleston commercial buildings and historic home additions use TPO for flat roof sections.',
    hurricaneRating: 'Good',
    humidityResistance: 'Excellent',
    saltAirResistance: 'Very Good',
    energyEfficiency: 'Excellent',
    popularityRank: 5,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  },
  {
    id: 'epdm-flat',
    name: 'EPDM Rubber Roofing',
    shortName: 'EPDM',
    category: 'flat',
    description: 'Ethylene Propylene Diene Monomer (EPDM) is a synthetic rubber membrane that has been a reliable flat roofing solution for over 50 years. Available in black or white, EPDM is known for its flexibility, durability, and ease of repair. It\'s a proven, cost-effective option for flat and low-slope roofs throughout the Charleston area.',
    materialCostMin: 1.50,
    materialCostMax: 3.50,
    installedCostMin: 4.00,
    installedCostMax: 10.00,
    lifespanMin: 20,
    lifespanMax: 30,
    windRating: 'Varies by attachment method',
    warranty: '15-20 years',
    bestFor: ['Budget-conscious flat roof projects', 'Small commercial buildings', 'Garage and carport roofs', 'Porch roofs and additions'],
    pros: ['Lowest cost flat roofing option', 'Proven 50+ year track record', 'Extremely flexible — handles building movement', 'Easy to repair with patches', 'Resistant to UV and ozone', 'Available in large sheets — fewer seams'],
    cons: ['Black version absorbs heat', 'Seams are glued, not welded — weaker than TPO', 'Can shrink over time', 'Puncture-prone', 'Less aesthetically appealing', 'White version costs more'],
    scClimateNotes: 'EPDM works adequately in Charleston\'s climate but has some limitations. The traditional black membrane absorbs significant solar heat, increasing cooling costs during summer. White EPDM is available but costs more and still doesn\'t match TPO\'s reflectivity. The adhesive seams can be stressed by Charleston\'s thermal cycling and heavy rainfall. For budget-conscious flat roof projects, EPDM remains viable, but we generally recommend TPO for its superior seam strength and energy efficiency in our coastal climate.',
    hurricaneRating: 'Fair',
    humidityResistance: 'Good',
    saltAirResistance: 'Good',
    energyEfficiency: 'Fair',
    popularityRank: 6,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  },
];

// Instant estimate materials (Good/Better/Best shingle tiers)
export const ESTIMATE_MATERIALS = ROOFING_MATERIALS.filter(m => m.estimateTier);

// Helper to get tier label
export function getTierLabel(tier: EstimateTier): string {
  const labels: Record<EstimateTier, string> = {
    best: 'Best',
    better: 'Better',
    good: 'Good',
  };
  return labels[tier];
}

// Helper to format price range
export function formatPriceRange(min: number, max: number): string {
  return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

// Helper to get category label
export function getCategoryLabel(category: RoofingMaterial['category']): string {
  const labels: Record<RoofingMaterial['category'], string> = {
    asphalt: 'Asphalt Shingles',
    metal: 'Metal Roofing',
    flat: 'Flat Roof Systems',
  };
  return labels[category];
}

// Helper to get rating color
export function getRatingColor(rating: string): string {
  switch (rating) {
    case 'Excellent': return 'text-emerald-600';
    case 'Very Good': return 'text-green-600';
    case 'Good': return 'text-amber-600';
    case 'Fair': return 'text-orange-500';
    case 'Poor': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

// Helper to get rating bg color
export function getRatingBgColor(rating: string): string {
  switch (rating) {
    case 'Excellent': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Very Good': return 'bg-green-50 text-green-700 border-green-200';
    case 'Good': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Fair': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Poor': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}
