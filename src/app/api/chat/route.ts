// Next.js Route Handler — POST /api/chat

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
);

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

async function chatCompletion(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "gpt-4o-mini", messages, temperature: 0.7, max_tokens: 600 }),
  });
  if (!res.ok) throw new Error(`OpenAI Chat error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

// --- INSTANT ESTIMATE PRICING ENGINE ---
const MATERIAL_PRICING = {
  best: {
    name: 'Owens Corning TruDefinition Duration',
    shortName: 'OC Duration',
    tier: 'Best',
    perSquare: 113,
    windRating: '130 mph',
    warranty: 'Lifetime Limited',
    features: 'SureNail Technology, Class 3 impact resistance, StreakGuard algae resistance',
  },
  better: {
    name: 'Owens Corning Oakridge',
    shortName: 'OC Oakridge',
    tier: 'Better',
    perSquare: 107,
    windRating: '110 mph (4-nail) / 130 mph (6-nail)',
    warranty: 'Lifetime Limited',
    features: 'Double-layer nailing zone, StreakGuard algae resistance',
  },
  good: {
    name: 'TAMKO Storm Fighter (Hail Guard)',
    shortName: 'Storm Fighter',
    tier: 'Good',
    perSquare: 125,
    windRating: '160 mph (system warranty)',
    warranty: 'Limited Lifetime',
    features: 'Hail Guard impact resistance, highest wind rating in our lineup',
  },
};

const INSTALL_PRICING = {
  basic:   { label: 'Basic',   perSquare: 100, description: 'Standard roof — simple layout, walkable pitch, minimal cuts' },
  custom:  { label: 'Custom',  perSquare: 110, description: 'Moderate complexity — multiple slopes, some dormers or valleys' },
  complex: { label: 'Complex', perSquare: 120, description: 'High complexity — steep pitch, many gables/valleys/dormers, difficult access' },
};

function buildEstimatePricingContext(): string {
  const m = MATERIAL_PRICING;
  const i = INSTALL_PRICING;

  return `

--- INSTANT ESTIMATE SYSTEM ---
You can calculate instant roof estimates. When a homeowner provides their roof square footage, calculate the estimate using the pricing below.

IMPORTANT: Roofing is priced in "squares" — 1 square = 100 sq ft. Convert the homeowner's sq ft to squares first (divide by 100).

Formula: (roof_sqft / 100) x (material_per_square + install_per_square) = estimated total

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
2. Ask about their roof complexity (basic, custom, or complex). Give them the descriptions to help them choose. If unsure, default to Custom.
3. Calculate estimates for all three shingle tiers using their sq ft and complexity level.
4. Present a neat comparison showing all three options with the total cost.
5. After presenting, encourage them to schedule a free inspection for an exact quote: (843) 306-2939.

EXAMPLE — 2,200 sq ft roof, Custom complexity:
Squares: 2,200 / 100 = 22 squares
Best (OC Duration):  22 x ($113 + $110) = 22 x $223 = $4,906
Better (OC Oakridge): 22 x ($107 + $110) = 22 x $217 = $4,774
Good (Storm Fighter): 22 x ($125 + $110) = 22 x $235 = $5,170

IMPORTANT GUIDELINES:
- Always show the math clearly so the homeowner can follow along.
- Note that these are ballpark estimates — final pricing depends on on-site inspection.
- Material pricing is based on current market rates and may vary.
- The Storm Fighter (Good tier) has the highest wind rating at 160 mph despite being the "Good" tier — it's called "Good" because of its price point, not quality. Make sure homeowners understand all three are quality products.
- Always end with: "For an exact quote tailored to your home, give us a call at (843) 306-2939 or schedule a free roof inspection."
--- END ESTIMATE SYSTEM ---`;
}

function buildSystemPrompt(ragContext: string): string {
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
${buildEstimatePricingContext()}

--- KNOWLEDGE BASE CONTEXT ---
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

    // 1. Embedding
    const embedding = await getEmbedding(sanitizedMessage);

    // 2. RAG search
    let ragContext = "";
    let sources: string[] = [];
    try {
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
      console.error("Knowledge base search failed:", err);
    }

    // 3. Build messages
    const chatMessages: { role: string; content: string }[] = [
      { role: "system", content: buildSystemPrompt(ragContext) },
      ...history.slice(-20).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: sanitizedMessage },
    ];

    // 4. Chat completion
    const response = await chatCompletion(chatMessages);

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
