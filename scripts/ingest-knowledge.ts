/**
 * Knowledge Base Ingestion Script
 *
 * Reads the roofing knowledge markdown, splits it into chunks, generates
 * embeddings via OpenAI, and upserts them into the Supabase `roofing_knowledge` table.
 *
 * Usage:
 *   npx tsx scripts/ingest-knowledge.ts
 *
 * Requires a .env file at the project root with:
 *   OPENAI_API_KEY=...
 *   VITE_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import "dotenv/config";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CHUNK_TARGET_TOKENS = 800;
const CHUNK_OVERLAP_TOKENS = 100;
const BATCH_SIZE = 5;

const KNOWLEDGE_PATH = resolve(
  __dirname,
  "..",
  "lib",
  "knowledgebase",
  "restoration-roofing-content.md",
);

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Rough token estimate — ~4 chars per token for English text */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/** Detect a category from the closest heading context */
function detectCategory(chunk: string, headingContext: string): string {
  const text = (headingContext + " " + chunk).toLowerCase();

  if (/material|shingle|metal|tile|slate|asphalt|underlayment|synthetic/.test(text))
    return "materials";
  if (/climate|coast|hurricane|wind|salt|moisture|humid|storm|weather/.test(text))
    return "climate";
  if (/install|process|step|method|technique|flash|ventilat/.test(text))
    return "installation";
  if (/insurance|claim|adjuster|deductible|coverage|supplement/.test(text))
    return "insurance";
  if (/price|cost|estimat|budget|financ|invest|afford/.test(text)) return "pricing";
  if (/repair|patch|leak|damage|fix|restor/.test(text)) return "repair";
  if (/inspect|mainten|gutter|clean|check|prevent/.test(text)) return "maintenance";
  if (/commercial|flat|tpo|epdm|built-up|low.slope/.test(text)) return "commercial";
  if (/code|permit|regulat|zon|compliance|building\s*code/.test(text)) return "codes";
  if (/charleston|lowcountry|south\s*carolina|mount\s*pleasant|james\s*island/.test(text))
    return "local";

  return "general";
}

/** Split markdown into paragraph-boundary chunks of ~CHUNK_TARGET_TOKENS with overlap */
function chunkMarkdown(markdown: string): { text: string; headingContext: string }[] {
  const paragraphs = markdown.split(/\n\n+/);
  const chunks: { text: string; headingContext: string }[] = [];

  let currentChunk = "";
  let currentTokens = 0;
  let currentHeading = "";
  let overlapBuffer = ""; // trailing text for overlap into next chunk

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    // Track the most recent heading
    const headingMatch = trimmed.match(/^#{1,4}\s+(.+)/);
    if (headingMatch) {
      currentHeading = headingMatch[1];
    }

    const paraTokens = estimateTokens(trimmed);

    if (currentTokens + paraTokens > CHUNK_TARGET_TOKENS && currentChunk) {
      // Flush current chunk
      chunks.push({ text: currentChunk.trim(), headingContext: currentHeading });

      // Start new chunk with overlap from the tail of the previous chunk
      currentChunk = overlapBuffer ? overlapBuffer + "\n\n" + trimmed : trimmed;
      currentTokens = estimateTokens(currentChunk);
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + trimmed;
      currentTokens += paraTokens;
    }

    // Update overlap buffer: keep trailing text that fits within CHUNK_OVERLAP_TOKENS
    const sentences = currentChunk.split(/(?<=[.!?])\s+/);
    let overlap = "";
    for (let i = sentences.length - 1; i >= 0; i--) {
      const candidate = sentences[i] + (overlap ? " " + overlap : "");
      if (estimateTokens(candidate) > CHUNK_OVERLAP_TOKENS) break;
      overlap = candidate;
    }
    overlapBuffer = overlap;
  }

  // Flush remaining
  if (currentChunk.trim()) {
    chunks.push({ text: currentChunk.trim(), headingContext: currentHeading });
  }

  return chunks;
}

/** Generate an embedding via OpenAI */
async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input: text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI Embeddings error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.data[0].embedding;
}

/** Process chunks in batches */
async function processBatch(
  batch: { text: string; headingContext: string; index: number }[],
) {
  const embeddings = await Promise.all(batch.map((c) => getEmbedding(c.text)));

  for (let i = 0; i < batch.length; i++) {
    const chunk = batch[i];
    const category = detectCategory(chunk.text, chunk.headingContext);
    const chunkId = `${category}-${String(chunk.index).padStart(4, "0")}`;

    const { error } = await supabase.from("roofing_knowledge").upsert(
      {
        chunk_id: chunkId,
        content: chunk.text,
        category,
        embedding: embeddings[i],
      },
      { onConflict: "chunk_id" },
    );

    if (error) {
      console.error(`  Failed to upsert chunk ${chunkId}:`, error.message);
    } else {
      console.log(`  Upserted chunk ${chunkId} (${category}, ~${estimateTokens(chunk.text)} tokens)`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Knowledge Base Ingestion ===\n");

  // Validate env
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  if (!process.env.VITE_SUPABASE_URL) throw new Error("Missing VITE_SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  // Read markdown
  console.log(`Reading knowledge base from:\n  ${KNOWLEDGE_PATH}\n`);
  const markdown = readFileSync(KNOWLEDGE_PATH, "utf-8");
  console.log(`  Source file: ${(markdown.length / 1024).toFixed(1)} KB\n`);

  // Chunk
  const chunks = chunkMarkdown(markdown);
  console.log(`Split into ${chunks.length} chunks (~${CHUNK_TARGET_TOKENS} tokens each)\n`);

  // Process in batches
  const indexed = chunks.map((c, i) => ({ ...c, index: i }));

  for (let i = 0; i < indexed.length; i += BATCH_SIZE) {
    const batch = indexed.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(indexed.length / BATCH_SIZE);
    console.log(`Processing batch ${batchNum}/${totalBatches} (chunks ${i + 1}-${Math.min(i + BATCH_SIZE, indexed.length)})...`);

    await processBatch(batch);

    // Small delay between batches to respect rate limits
    if (i + BATCH_SIZE < indexed.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`\nDone! Ingested ${chunks.length} chunks into roofing_knowledge table.`);
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
