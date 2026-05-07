"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, Save, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  computeTiers,
  computeQuoteRangeForMeasured,
  type PricingConfig,
} from "@/lib/pricing";
import {
  savePricingDraftAction,
  publishPricingAction,
  discardPricingDraftAction,
} from "./actions";

type Props = {
  initial: PricingConfig;        // current form values (draft if present, else published)
  published: PricingConfig;      // what's currently live on the site
  hasDraft: boolean;
  draftUpdatedAt: string | null;
  draftUpdatedBy: string | null;
};

const SHINGLE_NAMES: Record<"good" | "better" | "best", string> = {
  good: "Owens Corning Oak Ridge",
  better: "Owens Corning Duration",
  best: "TAMKO Hail Guard",
};

function fmtMoney(v: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(v) ? v : 0);
}

function fmtDate(iso: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
    });
  } catch { return iso; }
}

export default function PricingToolForm({
  initial,
  published,
  hasDraft,
  draftUpdatedAt,
  draftUpdatedBy,
}: Props) {
  const router = useRouter();
  const [values, setValues] = useState<PricingConfig>(initial);
  const [steepOn, setSteepOn] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"good" | "better" | "best">("good");
  const [pending, startTransition] = useTransition();
  const [flash, setFlash] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const update = <K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const dirty = useMemo(() => {
    const keys = Object.keys(initial) as (keyof PricingConfig)[];
    return keys.some((k) => values[k] !== initial[k]);
  }, [values, initial]);

  // Live calculations from current form values (NOT from `published` — that's the live row)
  const tiers = computeTiers(values);
  const wastePct = values.measuredSquares
    ? ((values.billableSquares / values.measuredSquares) - 1) * 100
    : 0;

  const detailTier = tiers.find((t) => t.id === selectedTier) ?? tiers[0];
  const detailRange = computeQuoteRangeForMeasured(
    values,
    values.measuredSquares,
    detailTier.installedPerSquare,
    steepOn,
  );

  const reset = () => {
    setValues(published);
    setSteepOn(false);
    setSelectedTier("good");
  };

  const showFlash = (kind: "ok" | "err", msg: string) => {
    setFlash({ kind, msg });
    setTimeout(() => setFlash(null), 4000);
  };

  const onSaveDraft = () => {
    startTransition(async () => {
      const res = await savePricingDraftAction(values);
      if (res.ok) {
        showFlash("ok", "Draft saved");
        router.refresh();
      } else {
        showFlash("err", res.error);
      }
    });
  };

  const onPublish = () => {
    if (!confirm("Publish these numbers to the live site? The chat and Roof Quote page will update on the next request.")) return;
    startTransition(async () => {
      const res = await publishPricingAction(values);
      if (res.ok) {
        showFlash("ok", "Published — site updated");
        router.refresh();
      } else {
        showFlash("err", res.error);
      }
    });
  };

  const onDiscardDraft = () => {
    if (!confirm("Discard your draft and revert to the published values?")) return;
    startTransition(async () => {
      const res = await discardPricingDraftAction();
      if (res.ok) {
        setValues(published);
        showFlash("ok", "Draft discarded");
        router.refresh();
      } else {
        showFlash("err", res.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy mb-2">
            <ArrowLeft className="w-4 h-4" /> All tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold text-navy">Pricing Formula</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Adjust the live customer-facing roof quote variables. The calculator below previews
            changes locally — they only go live when you click <strong>Publish</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4" /> Reset to published
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={pending || !dirty}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold border border-navy/30 bg-white text-navy hover:bg-navy/5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            type="button"
            onClick={onPublish}
            disabled={pending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold btn-amber disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      {/* ── Status banner ──────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-500">Last published:</span>{" "}
            <strong className="text-navy">{fmtDate(published.lastPublishedAt) ?? "never"}</strong>
            {published.lastPublishedBy && (
              <span className="text-gray-500"> by {published.lastPublishedBy}</span>
            )}
          </div>
          {hasDraft && (
            <div className="flex items-center gap-2 text-amber-dark">
              <AlertCircle className="w-4 h-4" />
              Draft pending {fmtDate(draftUpdatedAt) ? `· ${fmtDate(draftUpdatedAt)}` : ""}
              {draftUpdatedBy ? ` by ${draftUpdatedBy}` : ""}
            </div>
          )}
        </div>
        {hasDraft && (
          <button
            type="button"
            onClick={onDiscardDraft}
            disabled={pending}
            className="text-sm text-gray-500 hover:text-red-600 underline-offset-2 hover:underline disabled:opacity-50"
          >
            Discard draft
          </button>
        )}
      </div>

      {flash && (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            flash.kind === "ok"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {flash.kind === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {flash.msg}
        </div>
      )}

      {/* ── Layout ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5">
        {/* Left: controls */}
        <aside className="space-y-5">
          <Card title="Core Variables" subtitle="Main formula inputs from the benchmark job.">
            <NumField
              label="Measured / Starting Roof Size"
              value={values.measuredSquares}
              onChange={(v) => update("measuredSquares", v)}
              suffix="sq" step={0.01}
              help="Rounded EagleView measurement (current default: 22 sq)."
            />
            <NumField
              label="Pricing / Billable Squares"
              value={values.billableSquares}
              onChange={(v) => update("billableSquares", v)}
              suffix="sq" step={0.01}
              help="The first company benchmark priced the job at 24 squares."
            />
            <NumField
              label="Duration Installed Benchmark"
              value={values.durationInstalled}
              onChange={(v) => update("durationInstalled", v)}
              prefix="$" suffix="/sq" step={0.01}
              help={`Baseline: ${values.billableSquares} × ${fmtMoney(values.durationInstalled, 2)} = ${fmtMoney(values.billableSquares * values.durationInstalled)}.`}
            />
            <NumField
              label="Customer Quote Range"
              value={values.quoteRangePct}
              onChange={(v) => update("quoteRangePct", v)}
              suffix="%" step={0.01}
              help="Public-facing band displayed as ±%."
            />
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700">Steep Slope Preview</div>
                  <div className="text-xs text-gray-500">Toggle the calculator preview only — not stored.</div>
                </div>
                <input
                  type="checkbox"
                  checked={steepOn}
                  onChange={(e) => setSteepOn(e.target.checked)}
                  className="w-5 h-5 accent-amber"
                />
              </div>
              <NumField
                label="Steep Slope Increase"
                value={values.steepSlopeAdd}
                onChange={(v) => update("steepSlopeAdd", v)}
                prefix="$" suffix="/sq" step={0.01}
                help="Manager-selected steep-slope add-on per pricing square."
              />
            </div>
          </Card>

          <Card title="Shingle Cost Inputs" subtitle="Raw shingle costs (drive each tier's installed price via the delta vs Duration).">
            <NumField
              label={SHINGLE_NAMES.good}
              value={values.oakCost}
              onChange={(v) => update("oakCost", v)}
              prefix="$" suffix="/sq" step={0.01}
            />
            <NumField
              label={SHINGLE_NAMES.better}
              value={values.durationCost}
              onChange={(v) => update("durationCost", v)}
              prefix="$" suffix="/sq" step={0.01}
            />
            <NumField
              label={SHINGLE_NAMES.best}
              value={values.tamkoCost}
              onChange={(v) => update("tamkoCost", v)}
              prefix="$" suffix="/sq" step={0.01}
            />
          </Card>

          <Card title="Reference Estimate Variables" subtitle="Documented for internal reference — not used in customer formula.">
            <NumField label="Normal Labor Rate" value={values.laborRate} onChange={(v) => update("laborRate", v)} prefix="$" suffix="/sq" step={0.01} />
            <NumField label="Dump Allowance" value={values.dumpRate} onChange={(v) => update("dumpRate", v)} prefix="$" suffix="/sq" step={0.01} />
            <NumField label="Permit Cost" value={values.permitCost} onChange={(v) => update("permitCost", v)} prefix="$" step={0.01} />
            <NumField label="EagleView Cost" value={values.eagleCost} onChange={(v) => update("eagleCost", v)} prefix="$" step={0.01} />
            <NumField label="Decking Allowance" value={values.deckingSheets} onChange={(v) => update("deckingSheets", v)} suffix="sheets" step={1} />
            <NumField label="Extra Decking Sheet Price" value={values.deckingPrice} onChange={(v) => update("deckingPrice", v)} prefix="$" suffix="/sheet" step={0.01} />
          </Card>
        </aside>

        {/* Right: live calculations */}
        <section className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Metric
              label="Waste / Pricing Factor"
              value={`${wastePct.toFixed(2)}%`}
              note={`${values.measuredSquares} sq → ${values.billableSquares} sq`}
            />
            <Metric
              label="Slope Mode (preview)"
              value={steepOn ? `+${fmtMoney(values.steepSlopeAdd)}/sq` : "Off"}
              note={steepOn ? "Steep roof preview" : "Regular roof preview"}
            />
            <Metric
              label="Quote Range"
              value={`±${values.quoteRangePct.toFixed(2)}%`}
              note="Customer low/high range"
            />
            <Metric
              label="Duration Benchmark"
              value={fmtMoney(values.durationInstalled)}
              note="Installed price per square"
            />
          </div>

          <Card title="Installed Pricing Spread" subtitle="Tiers calculated from the Duration benchmark. Update a shingle cost to see the installed price move by the same per-square delta.">
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                    <th className="py-2 pr-4">Product</th>
                    <th className="py-2 pr-4">Shingle Cost</th>
                    <th className="py-2 pr-4">Δ vs Duration</th>
                    <th className="py-2 pr-4">Installed / sq</th>
                    <th className="py-2 pr-4">Quote Total</th>
                    <th className="py-2 pr-4">± Range</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((t) => {
                    const installed = t.installedPerSquare + (steepOn ? values.steepSlopeAdd : 0);
                    const total = values.billableSquares * installed;
                    const range = computeQuoteRangeForMeasured(values, values.measuredSquares, t.installedPerSquare, steepOn);
                    return (
                      <tr key={t.id} className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-navy">{t.fullName}</div>
                          {t.id === "better" && (
                            <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wide bg-amber/15 text-amber-dark px-1.5 py-0.5 rounded">
                              Benchmark
                            </span>
                          )}
                        </td>
                        <td className="py-3 pr-4">{fmtMoney(t.shingleCost, 2)}</td>
                        <td className="py-3 pr-4">{t.materialDelta >= 0 ? "+" : ""}{fmtMoney(t.materialDelta, 2)}</td>
                        <td className="py-3 pr-4 font-semibold">{fmtMoney(installed, 2)}</td>
                        <td className="py-3 pr-4 font-semibold">{fmtMoney(total)}</td>
                        <td className="py-3 pr-4 text-gray-700">{fmtMoney(range.min)} – {fmtMoney(range.max)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            {(["good", "better", "best"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedTier(id)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition ${
                  selectedTier === id
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-gray-700 border-gray-300 hover:border-navy/40"
                }`}
              >
                {SHINGLE_NAMES[id]}
              </button>
            ))}
          </div>

          <Card title={SHINGLE_NAMES[selectedTier]} subtitle="Detailed formula view for the selected product tier.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Metric
                label="Installed / sq"
                value={fmtMoney(detailTier.installedPerSquare + (steepOn ? values.steepSlopeAdd : 0), 2)}
                note="Regular tier plus optional slope add-on"
              />
              <Metric
                label="Shingle-Only Total"
                value={fmtMoney(values.billableSquares * detailTier.shingleCost)}
                note="Billable squares × shingle cost"
              />
              <Metric
                label="Customer Range"
                value={`${fmtMoney(detailRange.min)} – ${fmtMoney(detailRange.max)}`}
                note={`±${values.quoteRangePct.toFixed(2)}% of target`}
              />
            </div>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4 font-mono text-xs leading-relaxed text-gray-700">
              Waste % = ((${values.billableSquares} ÷ ${values.measuredSquares}) − 1) × 100 = {wastePct.toFixed(2)}%<br />
              Material Δ = {fmtMoney(detailTier.shingleCost, 2)} − {fmtMoney(values.durationCost, 2)} = {detailTier.materialDelta >= 0 ? "+" : ""}{fmtMoney(detailTier.materialDelta, 2)}<br />
              Installed/sq = {fmtMoney(values.durationInstalled, 2)} + ({detailTier.materialDelta >= 0 ? "+" : ""}{fmtMoney(detailTier.materialDelta, 2)}){steepOn ? ` + ${fmtMoney(values.steepSlopeAdd, 2)} steep` : ""} = {fmtMoney(detailTier.installedPerSquare + (steepOn ? values.steepSlopeAdd : 0), 2)}<br />
              Total = {values.billableSquares} × {fmtMoney(detailTier.installedPerSquare + (steepOn ? values.steepSlopeAdd : 0), 2)} = {fmtMoney(values.billableSquares * (detailTier.installedPerSquare + (steepOn ? values.steepSlopeAdd : 0)))}<br />
              Range = ±{values.quoteRangePct.toFixed(2)}% → {fmtMoney(detailRange.min)} – {fmtMoney(detailRange.max)}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Card({
  title, subtitle, children,
}: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 pt-4">
        <h2 className="text-lg font-semibold text-navy">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-navy mt-0.5">{value}</div>
      {note && <div className="text-[11px] text-gray-500 mt-0.5">{note}</div>}
    </div>
  );
}

function NumField({
  label, value, onChange, prefix, suffix, step = 0.01, help,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  help?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-700 mb-1">{label}</span>
      <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 bg-white">
        {prefix && <span className="px-2 flex items-center text-sm text-gray-500 bg-gray-50 border-r border-gray-300">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(Number.isFinite(v) ? v : 0);
          }}
          className="flex-1 min-w-0 px-3 py-2 text-sm outline-none"
        />
        {suffix && <span className="px-2 flex items-center text-sm text-gray-500 bg-gray-50 border-l border-gray-300">{suffix}</span>}
      </div>
      {help && <span className="block text-[11px] text-gray-500 mt-1">{help}</span>}
    </label>
  );
}
