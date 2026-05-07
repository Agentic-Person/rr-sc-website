import type { Metadata } from "next";
import { createSupabaseServiceClient } from "@/lib/supabase-server";
import type { PricingConfig } from "@/lib/pricing";
import PricingToolForm from "./pricing-tool-form";

export const metadata: Metadata = {
  title: "Pricing Formula",
  robots: { index: false, follow: false },
};

// This page is opted out of caching — we want every render to read the latest
// row from Supabase so the admin sees their own draft state correctly.
export const dynamic = "force-dynamic";

type PricingRow = {
  measured_squares: number;
  billable_squares: number;
  duration_installed: number;
  quote_range_pct: number;
  steep_slope_add: number;
  oak_cost: number;
  duration_cost: number;
  tamko_cost: number;
  labor_rate: number;
  dump_rate: number;
  permit_cost: number;
  eagle_cost: number;
  decking_sheets: number;
  decking_price: number;
  draft: Partial<PricingRow> | null;
  draft_updated_at: string | null;
  draft_updated_by: string | null;
  last_published_at: string | null;
  last_published_by: string | null;
};

const FALLBACK: PricingConfig = {
  measuredSquares: 22, billableSquares: 24, durationInstalled: 425,
  quoteRangePct: 10, steepSlopeAdd: 30,
  oakCost: 102, durationCost: 116, tamkoCost: 249,
  laborRate: 85, dumpRate: 15, permitCost: 352, eagleCost: 28,
  deckingSheets: 3, deckingPrice: 80,
  lastPublishedAt: null, lastPublishedBy: null,
};

function rowToConfig(row: PricingRow | null, useDraft: boolean): PricingConfig {
  if (!row) return { ...FALLBACK };
  const num = (key: keyof PricingRow) => {
    const fromDraft = useDraft && row.draft && row.draft[key];
    const v = fromDraft ?? row[key];
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const parsed = parseFloat(v);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  };
  return {
    measuredSquares: num("measured_squares"),
    billableSquares: num("billable_squares"),
    durationInstalled: num("duration_installed"),
    quoteRangePct: num("quote_range_pct"),
    steepSlopeAdd: num("steep_slope_add"),
    oakCost: num("oak_cost"),
    durationCost: num("duration_cost"),
    tamkoCost: num("tamko_cost"),
    laborRate: num("labor_rate"),
    dumpRate: num("dump_rate"),
    permitCost: num("permit_cost"),
    eagleCost: num("eagle_cost"),
    deckingSheets: Math.round(num("decking_sheets")),
    deckingPrice: num("decking_price"),
    lastPublishedAt: row.last_published_at,
    lastPublishedBy: row.last_published_by,
  };
}

export default async function PricingToolPage() {
  // Read with the service client so we can see the draft column even though
  // RLS is enabled. (Middleware already verified the user is signed in.)
  const service = createSupabaseServiceClient();
  const { data: row } = await service
    .from("pricing_config")
    .select("*")
    .eq("id", 1)
    .maybeSingle<PricingRow>();

  const published = rowToConfig(row, false);
  const initial = rowToConfig(row, true);
  const hasDraft = !!(row?.draft && Object.keys(row.draft).length > 0);

  return (
    <main className="bg-linen min-h-screen py-10">
      <div className="container max-w-7xl">
        <PricingToolForm
          initial={initial}
          published={published}
          hasDraft={hasDraft}
          draftUpdatedAt={row?.draft_updated_at ?? null}
          draftUpdatedBy={row?.draft_updated_by ?? null}
        />
      </div>
    </main>
  );
}
