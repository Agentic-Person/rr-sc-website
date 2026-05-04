// Next.js Route Handler — POST /api/chat

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

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
const MATERIAL_PRICING = {
  best: {
    name: 'TAMKO Storm Fighter (Hail Guard)',
    shortName: 'Storm Fighter',
    tier: 'Best',
    perSquare: 249,
    windRating: '160 mph (system warranty)',
    warranty: 'Limited Lifetime',
    features: 'Hail Guard impact resistance, highest wind rating in our lineup',
  },
  better: {
    name: 'Owens Corning TruDefinition Duration',
    shortName: 'OC Duration',
    tier: 'Better',
    perSquare: 116,
    windRating: '130 mph',
    warranty: 'Lifetime Limited',
    features: 'SureNail Technology, Class 3 impact resistance, StreakGuard algae resistance',
  },
  good: {
    name: 'Owens Corning Oakridge',
    shortName: 'OC Oakridge',
    tier: 'Good',
    perSquare: 102,
    windRating: '110 mph (4-nail) / 130 mph (6-nail)',
    warranty: 'Lifetime Limited',
    features: 'Double-layer nailing zone, StreakGuard algae resistance',
  },
};

const INSTALL_PRICING = {
  basic:   { label: 'Basic',   perSquare: 100, description: 'Standard roof — simple layout, walkable pitch, minimal cuts' },
  custom:  { label: 'Custom',  perSquare: 110, description: 'Moderate complexity — multiple slopes, some dormers or valleys' },
  complex: { label: 'Complex', perSquare: 120, description: 'High complexity — steep pitch, many gables/valleys/dormers, difficult access' },
};

const WASTE_FACTOR = 0.15; // 15% material waste — covers cuts, valleys, ridge caps, hip starters, accidental damage

function buildEstimatePricingContext(): string {
  const m = MATERIAL_PRICING;
  const i = INSTALL_PRICING;

  return `

--- INSTANT ESTIMATE SYSTEM ---
You can calculate instant roof estimates. When a homeowner provides their roof square footage, calculate the estimate using the pricing below.

IMPORTANT: Roofing is priced in "squares" — 1 square = 100 sq ft. Convert the homeowner's sq ft to squares first (divide by 100).

Every estimate has THREE line items plus a total:
  1. Material  = squares × material_per_square
  2. Install   = squares × install_per_square
  3. Waste     = Material × ${WASTE_FACTOR * 100}%   (covers cuts, valleys, ridge caps, accidental damage — applied to material only, NEVER to labor)
  Total      = Material + Install + Waste

Equivalent shorthand: squares × ((material × ${1 + WASTE_FACTOR}) + install)

SHINGLE TIERS (material cost per square):
Best: ${m.best.name} — $${m.best.perSquare}/sq
  Wind: ${m.best.windRating} | Warranty: ${m.best.warranty}
  ${m.best.features}

Better: ${m.better.name} — $${m.better.perSquare}/sq
  Wind: ${m.better.windRating} | Warranty: ${m.better.warranty}
  ${m.better.features}

Good: ${m.good.name} — $${m.good.perSquare}/sq
  Wind: ${m.good.windRating} | Warranty: ${m.good.warranty}
  ${m.good.features}

INSTALL COST TIERS (labor per square):
${i.basic.label}: $${i.basic.perSquare}/sq — ${i.basic.description}
${i.custom.label}: $${i.custom.perSquare}/sq — ${i.custom.description}
${i.complex.label}: $${i.complex.perSquare}/sq — ${i.complex.description}

ESTIMATE FLOW:
1. Ask the homeowner for their roof square footage. If they don't know, tell them the average Charleston-area home is 1,500-2,500 sq ft of roof area.
2. Ask about their roof complexity (basic, custom, or complex). Give them the descriptions to help them choose. If they don't know or don't mention complexity, default to Custom ($${i.custom.perSquare}/sq) and note that you've assumed Custom — they can clarify if their roof is simpler or more complex.
3. Calculate estimates for all three shingle tiers using their sq ft and the chosen install tier.
4. Present a neat comparison showing all three options with the four-line breakdown (Material / Install / Waste / Total).
5. After presenting, encourage them to schedule a free inspection for an exact quote: (843) 306-2939.

EXAMPLE — 2,000 sq ft roof, Custom complexity (default):
Squares: 2,000 / 100 = 20 squares

Best (Storm Fighter):
  Material:  20 × $249 = $4,980
  Install:   20 × $110 = $2,200
  Waste:     $4,980 × 0.15 = $747
  Total:     $7,927

Better (OC Duration):
  Material:  20 × $116 = $2,320
  Install:   20 × $110 = $2,200
  Waste:     $2,320 × 0.15 = $348
  Total:     $4,868

Good (OC Oakridge):
  Material:  20 × $102 = $2,040
  Install:   20 × $110 = $2,200
  Waste:     $2,040 × 0.15 = $306
  Total:     $4,546

IMPORTANT GUIDELINES:
- ALWAYS show the four-line breakdown (Material / Install / Waste / Total) for each tier — never just the total.
- Apply the 15% waste factor to MATERIAL ONLY. Do NOT apply waste to install/labor.
- Note that these are ballpark estimates — final pricing depends on on-site inspection.
- Material pricing is based on current market rates and may vary.
- The Storm Fighter (Best tier) carries the highest price because of its 160 mph wind system warranty and Hail Guard impact resistance — it's our top-tier storm-rated shingle, ideal for coastal South Carolina homes. All three options are quality products; the tier reflects price and protection level.
- Always end with: "For an exact quote tailored to your home, give us a call at (843) 306-2939 or schedule a free roof inspection."
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
