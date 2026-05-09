"use server";

import { updateTag } from "next/cache";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase-server";
import { PRICING_CACHE_TAG, type PricingConfig } from "@/lib/pricing";

// Validate the form values before persisting. Returns null if valid.
function validate(p: Partial<PricingConfig>): string | null {
  const required: (keyof PricingConfig)[] = [
    "measuredSquares", "billableSquares",
    "durationInstalled", "oakInstalled", "tamkoInstalled",
    "quoteRangePct", "steepSlopeAdd",
    "oakCost", "durationCost", "tamkoCost",
    "laborRate", "dumpRate", "permitCost", "eagleCost", "deckingSheets", "deckingPrice",
  ];
  for (const k of required) {
    const v = p[k];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
      return `Field "${k}" must be a non-negative number`;
    }
  }
  if (p.measuredSquares! <= 0) return "Measured squares must be greater than zero";
  if (p.billableSquares! < p.measuredSquares!) {
    return "Pricing/billable squares must be ≥ measured squares";
  }
  return null;
}

function toRowColumns(p: PricingConfig) {
  return {
    measured_squares: p.measuredSquares,
    billable_squares: p.billableSquares,
    duration_installed: p.durationInstalled,
    oak_installed: p.oakInstalled,
    tamko_installed: p.tamkoInstalled,
    quote_range_pct: p.quoteRangePct,
    steep_slope_add: p.steepSlopeAdd,
    oak_cost: p.oakCost,
    duration_cost: p.durationCost,
    tamko_cost: p.tamkoCost,
    labor_rate: p.laborRate,
    dump_rate: p.dumpRate,
    permit_cost: p.permitCost,
    eagle_cost: p.eagleCost,
    decking_sheets: p.deckingSheets,
    decking_price: p.deckingPrice,
  };
}

async function requireUserEmail(): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) throw new Error("Not signed in");
  return user.email;
}

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Save the form values as a DRAFT (does not affect the live site).
 * Drafts let you walk away from the form without losing pending edits.
 */
export async function savePricingDraftAction(values: PricingConfig): Promise<ActionResult> {
  try {
    const email = await requireUserEmail();
    const validationError = validate(values);
    if (validationError) return { ok: false, error: validationError };

    const service = createSupabaseServiceClient();
    const { error } = await service
      .from("pricing_config")
      .update({
        draft: toRowColumns(values),
        draft_updated_at: new Date().toISOString(),
        draft_updated_by: email,
      })
      .eq("id", 1);

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Save failed" };
  }
}

/**
 * Publish the form values: write them to the live columns, clear the draft, bump the
 * audit timestamp, and invalidate the pricing cache so the chat + Roof Quote page
 * pick up the new numbers on the next request.
 */
export async function publishPricingAction(values: PricingConfig): Promise<ActionResult> {
  try {
    const email = await requireUserEmail();
    const validationError = validate(values);
    if (validationError) return { ok: false, error: validationError };

    const service = createSupabaseServiceClient();
    const { error } = await service
      .from("pricing_config")
      .update({
        ...toRowColumns(values),
        draft: null,
        draft_updated_at: null,
        draft_updated_by: null,
        last_published_at: new Date().toISOString(),
        last_published_by: email,
      })
      .eq("id", 1);

    if (error) return { ok: false, error: error.message };

    // Invalidate the cached read in src/lib/pricing.ts so the next call to
    // getPricing() refetches from Supabase and consumers see the new numbers.
    // updateTag (Next 16) gives read-your-own-writes semantics from a server action.
    updateTag(PRICING_CACHE_TAG);

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Publish failed" };
  }
}

/**
 * Discard the pending draft and revert the form to the published values.
 */
export async function discardPricingDraftAction(): Promise<ActionResult> {
  try {
    await requireUserEmail();
    const service = createSupabaseServiceClient();
    const { error } = await service
      .from("pricing_config")
      .update({
        draft: null,
        draft_updated_at: null,
        draft_updated_by: null,
      })
      .eq("id", 1);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Discard failed" };
  }
}
