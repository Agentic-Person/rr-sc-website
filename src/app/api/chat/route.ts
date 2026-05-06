// Next.js Route Handler — POST /api/chat

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import {
  ESTIMATE_MATERIALS,
  PRICING_CONFIG,
  computeQuoteRangeForMeasured,
  type RoofingMaterial,
} from "@/lib/materials";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
);

const anthropic = new Anthropic();
const CHAT_MODEL = "claude-sonnet-4-6";

// In-memory rate limiter (resets per cold start, which is fine for serverless)
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function scoreMessage(text: string): number {
  const lower = text.toLowerCase();
  if (/emergency|urgent|leak(ing)?|storm\s*damage|tree\s*fell|tarp/.test(lower)) return 95;
  if (/instant\s*estimate|roof\s*estimate|square\s*feet|sq\s*ft|roof\s*size/.test(lower)) return 90;
  if (/estimate|quote|cost|price|how\s*much|bid|proposal/.test(lower)) return 85;
  if (/schedule|appointment|come\s*out|visit|available|book/.test(lower)) return 75;
  if (/insurance|claim|adjuster|covered|deductible/.test(lower)) return 70;
  if (/material|shingle|metal|tile|slate|asphalt|underlayment/.test(lower)) return 45;
  return 20;
}

async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "text-embedding-ada-002", input: text }),
  });
  if (!res.ok) throw new Error(`OpenAI Embeddings error: ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding;
}

async function chatCompletion(
  systemStable: string,
  systemVolatile: string,
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  const response = await anthropic.messages.create({
    model: CHAT_MODEL,
    max_tokens: 600,
    system: [
      { type: "text", text: systemStable, cache_control: { type: "ephemeral" } },
      { type: "text", text: systemVolatile },
    ],
    messages,
  });
  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock && textBlock.type === "text" ? textBlock.text : "";
}

// --- INSTANT ESTIMATE PRICING ENGINE ---
// Single source of truth: src/lib/materials.ts (PRICING_CONFIG + ESTIMATE_MATERIALS).
// The same formula drives the on-page Roof Quote tool, so the chat and the website
// always quote the same numbers.

function tierFor(tier: 'best' | 'better' | 'good'): RoofingMaterial {
  const m = ESTIMATE_MATERIALS.find((mat) => mat.estimateTier === tier);
  if (!m || !m.catalogPricePerSquare) {
    throw new Error(`Missing estimate tier "${tier}" or catalogPricePerSquare in materials catalog`);
  }
  return m;
}

function buildEstimatePricingContext(): string {
  const best = tierFor('best');
  const better = tierFor('better');
  const good = tierFor('good');

  const wastePct = Math.round(PRICING_CONFIG.wasteFactor * 100);
  const rangePct = Math.round(PRICING_CONFIG.rangePercent * 100);
  const steepAdd = PRICING_CONFIG.steepSlopeChargePerSquare;

  // Benchmark example mirrors the on-page Roof Quote tool (605 Julep Dr.):
  // 22 measured squares × 1.10 → 24 pricing squares.
  const exMeasured = PRICING_CONFIG.measuredSquares;
  const exPricing = PRICING_CONFIG.pricingSquares;
  const exBest = computeQuoteRangeForMeasured(exMeasured, best.catalogPricePerSquare!);
  const exBetter = computeQuoteRangeForMeasured(exMeasured, better.catalogPricePerSquare!);
  const exGood = computeQuoteRangeForMeasured(exMeasured, good.catalogPricePerSquare!);

  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const range = (r: { min: number; max: number }) => `${fmt(r.min)} – ${fmt(r.max)}`;

  return `

--- INSTANT ESTIMATE SYSTEM ---
You can calculate instant roof replacement estimates using the same formula as our website's Roof Quote tool. The catalog price per square is the ALL-IN installed price (materials + labor + standard installation).

PRICING FORMULA:
  1. Convert roof area to "measured squares" (1 square = 100 sq ft).        measured = sqFt / 100
  2. Apply ${wastePct}% waste factor for cuts, valleys, ridge caps, etc.    pricing  = round(measured × ${1 + PRICING_CONFIG.wasteFactor})
  3. Multiply pricing squares by the catalog price per square.             target   = pricing × catalogPricePerSquare
  4. Show a customer-facing range of ±${rangePct}% around target.           min/max  = target × (1 ∓ 0.${rangePct})
  5. Add ${fmt(steepAdd)}/sq ONLY if the roof is steep slope (>7/12 pitch). steep    = +${fmt(steepAdd)} per pricing square

SHINGLE TIERS (catalog price per square — installed):
Best: ${best.name} — ${fmt(best.catalogPricePerSquare!)}/sq
  Wind: ${best.windRating} | Warranty: ${best.warranty}
  Hail Guard impact resistance; highest wind rating in our lineup; ideal for coastal SC.

Better: ${better.name} — ${fmt(better.catalogPricePerSquare!)}/sq
  Wind: ${better.windRating} | Warranty: ${better.warranty}
  SureNail Technology, StreakGuard algae resistance, premium curb appeal.

Good: ${good.name} — ${fmt(good.catalogPricePerSquare!)}/sq
  Wind: ${good.windRating} | Warranty: ${good.warranty}
  Solid value; meets SC building code; same Owens Corning quality at an accessible price.

ESTIMATE FLOW:
1. Ask the homeowner for their roof square footage. If they don't know, tell them most Charleston-area homes have 1,500–2,500 sq ft of roof area, and ask roughly how big their home is.
2. Optionally ask if their roof is steep slope (steeper than a 7/12 pitch — typical homes are NOT steep slope). If they don't know or don't mention it, assume standard slope and note the assumption.
3. Compute the price range for ALL THREE tiers using the formula above.
4. Present the three tiers as a clean comparison with the range for each (e.g., "${range(exGood)}").
5. Always note this is a ballpark range; the on-site inspection produces the exact quote.
6. Encourage them to call (843) 306-2939 or use the on-page "Get Your Instant Quote" button for the official quote.

WORKED EXAMPLE — typical ${exMeasured}-square home (~${exMeasured * 100} sq ft of roof, standard slope):
  measured = ${exMeasured} squares
  pricing  = round(${exMeasured} × 1.${wastePct.toString().padStart(2, '0')}) = ${exPricing} squares

  Best  (${best.shortName}):  ${exPricing} × ${fmt(best.catalogPricePerSquare!)} = ${fmt(exBest.target)}  →  range ${range(exBest)}
  Better (${better.shortName}): ${exPricing} × ${fmt(better.catalogPricePerSquare!)} = ${fmt(exBetter.target)}  →  range ${range(exBetter)}
  Good  (${good.shortName}): ${exPricing} × ${fmt(good.catalogPricePerSquare!)} = ${fmt(exGood.target)}  →  range ${range(exGood)}

  Steep slope (if applicable) adds ${fmt(steepAdd)} × ${exPricing} = ${fmt(steepAdd * exPricing)} to each tier's target before the ±${rangePct}% range.

IMPORTANT GUIDELINES:
- The catalog price per square is ALL-IN installed (no separate material/labor/waste line items). Do NOT break out material and labor — the formula already includes both.
- Always present a RANGE (min – max), not a single number. The range is ±${rangePct}% of the target.
- Steep slope is a per-square add-on (${fmt(steepAdd)}/sq) applied BEFORE the ±${rangePct}% range. Default to standard slope unless the homeowner says otherwise.
- These ranges match what the on-page Roof Quote tool shows. If a homeowner has seen a number on the website, your math should agree.
- The Best tier (${best.shortName}) is our top storm-rated option — 160 mph system warranty, Hail Guard impact resistance, ideal for hurricane-prone coastal homes.
- Always end with: "For an exact quote tailored to your home, give us a call at (843) 306-2939 or use the Get Your Instant Quote button on this page."
--- END ESTIMATE SYSTEM ---`;
}

// Stable prefix — never varies per request, eligible for prompt caching.
function buildSystemPromptStable(): string {
  return `You are a helpful, knowledgeable roofing assistant for Restoration Roofing SC, serving the Charleston, South Carolina area. You speak as part of the team — use "we" and "our team" rather than referring to yourself by name.

Your tone is warm, professional, and confident. You know roofing inside and out — materials, installation, coastal climate challenges, insurance processes, and local building codes. When a question goes beyond what you can answer precisely, always offer to connect the visitor with our team for specifics.

Key company details:
- Company: Restoration Roofing SC
- Location: Charleston, SC area
- Phone: (843) 306-2939
- Services: residential roofing, storm damage repair, insurance claim assistance, roof inspections, gutter systems, and full replacements

Guidelines:
- Keep answers concise (2-4 paragraphs max) and relevant to roofing.
- If the user asks something unrelated to roofing or home exterior services, politely redirect.
- When a homeowner asks about cost or pricing, use the Instant Estimate System below to help them. If pricing data is available, calculate an estimate. If not, present our shingle tiers and encourage them to call for a quote.
- Always encourage the visitor to call us at (843) 306-2939 or schedule a free inspection for anything that requires an on-site assessment.
- Use the knowledge base context below to ground your answers. If the context doesn't cover the question, rely on general roofing expertise and say so.
${buildEstimatePricingContext()}`;
}

// Volatile suffix — per-request RAG context, not cached.
function buildSystemPromptVolatile(ragContext: string): string {
  return `--- KNOWLEDGE BASE CONTEXT ---
${ragContext || "No specific knowledge base context available for this question."}
--- END CONTEXT ---`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { message, session_id, conversation_history } = body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message must be under 2000 characters." }, { status: 400 });
    }
    if (!session_id || typeof session_id !== "string") {
      return NextResponse.json({ error: "session_id is required." }, { status: 400 });
    }

    // Strip control characters from message (keep newlines and tabs)
    const sanitizedMessage = message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    // Validate and sanitize conversation_history
    const rawHistory: { role: string; content: string }[] = Array.isArray(conversation_history)
      ? conversation_history
      : [];

    const validRoles = ["user", "assistant"];
    const history: { role: string; content: string }[] = [];
    let totalContentLength = 0;

    for (const entry of rawHistory.slice(-20)) {
      if (
        typeof entry !== "object" || entry === null ||
        typeof entry.role !== "string" || !validRoles.includes(entry.role) ||
        typeof entry.content !== "string"
      ) {
        continue;
      }
      const content = entry.content.slice(0, 2000).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
      if (totalContentLength + content.length > 40000) break;
      totalContentLength += content.length;
      history.push({ role: entry.role, content });
    }

    // 1–2. Embedding + RAG search (best-effort — chat continues if either fails,
    //      e.g., expired OPENAI_API_KEY shouldn't take down the assistant).
    let ragContext = "";
    let sources: string[] = [];
    try {
      const embedding = await getEmbedding(sanitizedMessage);
      const { data: matches, error: rpcError } = await supabase.rpc("search_knowledge_base", {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5,
      });
      if (!rpcError && matches?.length > 0) {
        ragContext = matches.map((m: any) => m.content).join("\n\n---\n\n");
        sources = [...new Set(matches.map((m: any) => m.category).filter(Boolean))] as string[];
      }
    } catch (err) {
      console.error("Embedding/RAG lookup failed (continuing without knowledge base):", err);
    }

    // 3. Build messages — Anthropic API takes system separately from messages
    const chatMessages: { role: "user" | "assistant"; content: string }[] = [
      ...history.slice(-20).map((m) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: sanitizedMessage },
    ];

    // 4. Chat completion (Claude Sonnet 4.6)
    const response = await chatCompletion(
      buildSystemPromptStable(),
      buildSystemPromptVolatile(ragContext),
      chatMessages,
    );

    // 5. Lead score
    const leadScore = scoreMessage(sanitizedMessage);

    // 6. Save conversation
    try {
      await supabase.from("chat_conversations").upsert(
        {
          session_id,
          messages: [...history, { role: "user", content: sanitizedMessage }, { role: "assistant", content: response }],
          lead_score: leadScore,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "session_id" },
      );
    } catch (err) {
      console.error("Failed to save conversation:", err);
    }

    return NextResponse.json({ response, lead_score: leadScore, sources });
  } catch (err: any) {
    console.error("Chat endpoint error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us at (843) 306-2939." },
      { status: 500 },
    );
  }
}
