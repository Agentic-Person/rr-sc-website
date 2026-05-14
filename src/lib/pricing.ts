// Live pricing — single source of truth for /roof-quote and the AI chat.
// Numbers come from the pricing_config table in Supabase, edited via /tools/pricing.
//
// Caching strategy: read once and cache forever (revalidate: false). The "Publish"
// action in the admin tool calls revalidateTag("pricing") to invalidate this cache,
// so changes propagate immediately when published — and the DB is hit roughly once
// per publish, not on every page render.
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export const PRICING_CACHE_TAG = "pricing";

// Default values — match the production seed in 004_pricing_config.sql.
// Used as a fallback if Supabase is unreachable so the site never hard-fails on
// a transient outage.
const DEFAULTS = {
  measuredSquares: 22,
  billableSquares: 24,
  durationInstalled: 425,
  oakInstalled: 411,
  tamkoInstalled: 558,
  quoteRangePct: 10,
  steepSlopeAdd: 30,
  oakCost: 102,
  durationCost: 116,
  tamkoCost: 249,
  laborRate: 85,
  dumpRate: 15,
  permitCost: 352,
  eagleCost: 28,
  deckingSheets: 3,
  deckingPrice: 80,
  lastPublishedAt: null as string | null,
  lastPublishedBy: null as string | null,
} as const;

export type PricingConfig = {
  measuredSquares: number;
  billableSquares: number;
  durationInstalled: number;
  oakInstalled: number;
  tamkoInstalled: number;
  quoteRangePct: number;
  steepSlopeAdd: number;
  oakCost: number;
  durationCost: number;
  tamkoCost: number;
  laborRate: number;
  dumpRate: number;
  permitCost: number;
  eagleCost: number;
  deckingSheets: number;
  deckingPrice: number;
  lastPublishedAt: string | null;
  lastPublishedBy: string | null;
};

export type PricingTier = {
  id: "good" | "better" | "best";
  shortName: string;
  fullName: string;
  shingleCost: number;
  materialDelta: number;          // shingleCost - durationCost
  installedPerSquare: number;     // durationInstalled + materialDelta (steepSlope handled separately)
  steepInstalledPerSquare: number; // installedPerSquare + steepSlopeAdd
};

// Tier metadata (names/labels) lives here too so the chat and admin page can use
// the same labels without re-importing from materials.ts. The product names match
// the catalog entries in src/lib/materials.ts.
const TIER_LABELS: Record<PricingTier["id"], { shortName: string; fullName: string }> = {
  good: { shortName: "OC Oakridge", fullName: "Owens Corning Oakridge" },
  better: { shortName: "OC Duration", fullName: "Owens Corning TruDefinition Duration" },
  best: { shortName: "HailGuard", fullName: "TAMKO HailGuard" },
};

function toConfig(row: Record<string, unknown> | null | undefined): PricingConfig {
  if (!row) return { ...DEFAULTS };
  const num = (key: string, fallback: number): number => {
    const v = row[key];
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const parsed = parseFloat(v);
      return Number.isFinite(parsed) ? parsed : fallback;
    }
    return fallback;
  };
  return {
    measuredSquares: num("measured_squares", DEFAULTS.measuredSquares),
    billableSquares: num("billable_squares", DEFAULTS.billableSquares),
    durationInstalled: num("duration_installed", DEFAULTS.durationInstalled),
    oakInstalled: num("oak_installed", DEFAULTS.oakInstalled),
    tamkoInstalled: num("tamko_installed", DEFAULTS.tamkoInstalled),
    quoteRangePct: num("quote_range_pct", DEFAULTS.quoteRangePct),
    steepSlopeAdd: num("steep_slope_add", DEFAULTS.steepSlopeAdd),
    oakCost: num("oak_cost", DEFAULTS.oakCost),
    durationCost: num("duration_cost", DEFAULTS.durationCost),
    tamkoCost: num("tamko_cost", DEFAULTS.tamkoCost),
    laborRate: num("labor_rate", DEFAULTS.laborRate),
    dumpRate: num("dump_rate", DEFAULTS.dumpRate),
    permitCost: num("permit_cost", DEFAULTS.permitCost),
    eagleCost: num("eagle_cost", DEFAULTS.eagleCost),
    deckingSheets: Math.round(num("decking_sheets", DEFAULTS.deckingSheets)),
    deckingPrice: num("decking_price", DEFAULTS.deckingPrice),
    lastPublishedAt: typeof row.last_published_at === "string" ? row.last_published_at : null,
    lastPublishedBy: typeof row.last_published_by === "string" ? row.last_published_by : null,
  };
}

async function fetchPricingFromSupabase(): Promise<PricingConfig> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[pricing] Supabase env vars missing; using defaults");
    return { ...DEFAULTS };
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("pricing_config")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) {
      console.warn("[pricing] Supabase read failed; using defaults:", error.message);
      return { ...DEFAULTS };
    }
    return toConfig(data);
  } catch (err) {
    console.warn("[pricing] Unexpected error reading pricing_config:", err);
    return { ...DEFAULTS };
  }
}

// Cached forever — only invalidated by revalidateTag(PRICING_CACHE_TAG)
// (called from the admin page's Publish action).
const cachedFetch = unstable_cache(
  fetchPricingFromSupabase,
  ["pricing-config-v1"],
  { revalidate: false, tags: [PRICING_CACHE_TAG] },
);

/**
 * Read the current live pricing. Cached until the admin tool publishes a change.
 * Server-only — do not import from a client component.
 */
export async function getPricing(): Promise<PricingConfig> {
  return cachedFetch();
}

/**
 * Compute per-tier installed prices. Each tier now stores its own installed
 * price independently in pricing_config (oak_installed, duration_installed,
 * tamko_installed) — the prior duration-anchored derivation was dropped so
 * Tom can set tier prices independently of the underlying shingle cost.
 *
 * `materialDelta` is still surfaced (shingleCost − durationCost) for display
 * purposes in the admin tool, but no longer drives the installed price.
 *
 * Returns tiers in the order they're displayed on /roof-quote (good → better → best).
 */
export function computeTiers(p: PricingConfig): PricingTier[] {
  const make = (
    id: PricingTier["id"],
    shingleCost: number,
    installed: number,
  ): PricingTier => ({
    id,
    shortName: TIER_LABELS[id].shortName,
    fullName: TIER_LABELS[id].fullName,
    shingleCost,
    materialDelta: shingleCost - p.durationCost,
    installedPerSquare: installed,
    steepInstalledPerSquare: installed + p.steepSlopeAdd,
  });
  return [
    make("good", p.oakCost, p.oakInstalled),
    make("better", p.durationCost, p.durationInstalled),
    make("best", p.tamkoCost, p.tamkoInstalled),
  ];
}

/**
 * Customer-facing quote range for the BENCHMARK roof (billableSquares from config).
 * This is what /roof-quote and the chat default to when no specific roof size is given.
 */
export function computeQuoteRange(
  p: PricingConfig,
  installedPerSquare: number,
  steepSlope = false,
) {
  const total = p.billableSquares * installedPerSquare + (steepSlope ? p.billableSquares * p.steepSlopeAdd : 0);
  const factor = p.quoteRangePct / 100;
  return {
    target: total,
    min: Math.round(total * (1 - factor)),
    max: Math.round(total * (1 + factor)),
  };
}

export function formatQuoteRange(
  p: PricingConfig,
  installedPerSquare: number,
  steepSlope = false,
): string {
  const { min, max } = computeQuoteRange(p, installedPerSquare, steepSlope);
  return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
}

/**
 * Same formula generalized to any roof size (chat uses this for arbitrary homes).
 * Pricing squares = round(measuredSquares × billableSquares / config.measuredSquares).
 * Falls back to the proportional waste factor implied by the benchmark row.
 */
export function computeQuoteRangeForMeasured(
  p: PricingConfig,
  measuredSquares: number,
  installedPerSquare: number,
  steepSlope = false,
) {
  const wasteRatio = p.billableSquares / p.measuredSquares;
  const pricingSquares = Math.round(measuredSquares * wasteRatio);
  const totalPerSquare = installedPerSquare + (steepSlope ? p.steepSlopeAdd : 0);
  const target = pricingSquares * totalPerSquare;
  const factor = p.quoteRangePct / 100;
  return {
    pricingSquares,
    target,
    min: Math.round(target * (1 - factor)),
    max: Math.round(target * (1 + factor)),
  };
}
