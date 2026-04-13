// Internal linking utility — context-aware, scored cross-linking between services and locations.
// No "use client" — all logic is synchronous array computation for server components.

import type { Service, Location } from "@/lib/data";

// ---------------------------------------------------------------------------
// Cross-category service relationships
// Maps a service slug to 1-2 related slugs from OTHER categories
// ---------------------------------------------------------------------------
const CROSS_CATEGORY_MAP: Record<string, string[]> = {
  // Roofing → Storm / Gutters
  "roof-installation": ["roof-inspections", "gutter-installation"],
  "roof-repairs": ["roof-leak", "roof-inspections"],
  "roof-leak": ["emergency-tarping", "roof-inspections"],
  "roof-inspections": ["roof-repairs", "post-storm-inspection"],
  "metal-roofing": ["roof-installation", "hurricane-damage-repair"],
  "flat-roofing": ["roof-repairs", "gutter-installation"],
  // Storm → Roofing / Insurance
  "storm-damage-repair": ["roof-repairs", "insurance-claims-assistance"],
  "hurricane-damage-repair": ["roof-installation", "insurance-claims-assistance"],
  "wind-damage-repair": ["roof-repairs", "emergency-tarping"],
  "hail-damage-repair": ["roof-repairs", "insurance-claims-assistance"],
  "emergency-tarping": ["roof-repairs", "storm-damage-repair"],
  "insurance-claims-assistance": ["storm-damage-repair", "post-storm-inspection"],
  // Gutters → Roofing / Other gutters
  "gutter-installation": ["downspout-systems", "gutter-guards"],
  "gutter-repairs": ["gutter-installation", "gutter-cleaning"],
  "gutter-guards": ["gutter-installation", "gutter-cleaning"],
  "downspout-systems": ["gutter-installation", "gutter-repairs"],
};

// ---------------------------------------------------------------------------
// County adjacency for fallback location matching
// ---------------------------------------------------------------------------
const COUNTY_ADJACENCY: Record<string, string[]> = {
  "Charleston County": ["Berkeley County", "Dorchester County"],
  "Berkeley County": ["Charleston County", "Dorchester County"],
  "Dorchester County": ["Charleston County", "Berkeley County"],
  "Richland County": ["Lexington County"],
  "Lexington County": ["Richland County"],
};

// ---------------------------------------------------------------------------
// 1. getRelatedServices
// Primary: same category (excluding self)
// Secondary: cross-category entries from CROSS_CATEGORY_MAP
// ---------------------------------------------------------------------------
export function getRelatedServices(
  currentService: Service,
  allServices: Service[],
  limit = 4
): Service[] {
  const seen = new Set<string>([currentService.slug]);
  const results: Service[] = [];

  // Primary: same category
  for (const s of allServices) {
    if (!seen.has(s.slug) && s.category === currentService.category) {
      seen.add(s.slug);
      results.push(s);
    }
  }

  // Secondary: cross-category
  const crossSlugs = CROSS_CATEGORY_MAP[currentService.slug] ?? [];
  for (const slug of crossSlugs) {
    if (results.length >= limit) break;
    if (!seen.has(slug)) {
      const found = allServices.find((s) => s.slug === slug);
      if (found) {
        seen.add(slug);
        results.push(found);
      }
    }
  }

  return results.slice(0, limit);
}

// ---------------------------------------------------------------------------
// 2. getServiceAreaLinks
// Score each location by relevance to the service, then sort and cap.
// ---------------------------------------------------------------------------
export function getServiceAreaLinks(
  service: Service,
  allLocations: Location[],
  limit = 8
): Location[] {
  const scored = allLocations.map((loc, idx) => {
    let score = 0;

    if (service.category === "storm" && loc.isBarrierIsland) score += 3;
    if (service.category === "roofing" && loc.isHistoric) score += 2;
    if (
      (service.category === "roofing" || service.category === "storm") &&
      loc.county === "Charleston County"
    ) {
      score += 1;
    }
    if (
      service.category === "gutters" &&
      (loc.county === "Dorchester County" || loc.county === "Berkeley County")
    ) {
      score += 1;
    }

    return { loc, score, idx };
  });

  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);

  return scored.slice(0, limit).map((item) => item.loc);
}

// ---------------------------------------------------------------------------
// 3. getNearbyLocations
// Primary: same county (excluding self)
// Fallback: supplement with barrier-island peers or adjacent-county locations
// ---------------------------------------------------------------------------
export function getNearbyLocations(
  currentLocation: Location,
  allLocations: Location[],
  limit = 6
): Location[] {
  const seen = new Set<string>([currentLocation.slug]);
  const results: Location[] = [];

  // Primary: same county
  for (const loc of allLocations) {
    if (!seen.has(loc.slug) && loc.county === currentLocation.county) {
      seen.add(loc.slug);
      results.push(loc);
    }
  }

  // Fallback: supplement if fewer than 3
  if (results.length < 3) {
    // Same barrier-island status
    if (currentLocation.isBarrierIsland) {
      for (const loc of allLocations) {
        if (results.length >= limit) break;
        if (!seen.has(loc.slug) && loc.isBarrierIsland) {
          seen.add(loc.slug);
          results.push(loc);
        }
      }
    }

    // Adjacent counties
    const adjacentCounties = COUNTY_ADJACENCY[currentLocation.county] ?? [];
    for (const county of adjacentCounties) {
      for (const loc of allLocations) {
        if (results.length >= limit) break;
        if (!seen.has(loc.slug) && loc.county === county) {
          seen.add(loc.slug);
          results.push(loc);
        }
      }
      if (results.length >= limit) break;
    }
  }

  return results.slice(0, limit);
}

// ---------------------------------------------------------------------------
// 4. getFeaturedServicesForLocation
// Score each service by relevance to the location's characteristics.
// ---------------------------------------------------------------------------

// Coastal / barrier-island relevant services
const COASTAL_SERVICE_SLUGS = new Set(["metal-roofing", "hurricane-damage-repair"]);

// Historic-district relevant services
const HISTORIC_SERVICE_SLUGS = new Set(["roof-inspections"]);

// Universal high-value services
const HIGH_VALUE_SLUGS = new Set(["storm-damage-repair", "roof-installation", "roof-repairs"]);

// Universal rain / gutter relevance
const GUTTER_SLUGS = new Set(["gutter-installation", "gutter-guards"]);

export function getFeaturedServicesForLocation(
  location: Location,
  allServices: Service[],
  limit = 6
): Service[] {
  const scored = allServices.map((svc, idx) => {
    let score = 0;

    if (location.isBarrierIsland && COASTAL_SERVICE_SLUGS.has(svc.slug)) score += 3;
    if (location.isHistoric && HISTORIC_SERVICE_SLUGS.has(svc.slug)) score += 3;
    if (HIGH_VALUE_SLUGS.has(svc.slug)) score += 2;
    if (GUTTER_SLUGS.has(svc.slug)) score += 1;
    if (
      (location.isBarrierIsland || location.isHistoric) &&
      svc.slug === "insurance-claims-assistance"
    ) {
      score += 1;
    }

    return { svc, score, idx };
  });

  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);

  return scored.slice(0, limit).map((item) => item.svc);
}
