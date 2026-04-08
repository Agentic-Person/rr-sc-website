// Next.js Route Handler — POST /api/blog/generate
// AI-powered blog post generation using OpenAI gpt-4o-mini
// Protected by ADMIN_SECRET environment variable

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate with ADMIN_SECRET
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token || token !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders },
      );
    }

    const body = await request.json();
    const { topic, category } = body || {};

    if (!topic || !category) {
      return NextResponse.json(
        { error: "topic and category are required" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500, headers: corsHeaders },
      );
    }

    // Generate blog post content with OpenAI
    const contentResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are a content writer for Restoration Roofing SC, a trusted roofing company based in Charleston, South Carolina. Write blog posts that:
- Are written from the perspective of Restoration Roofing SC (use "we", "our team", etc.)
- Include local Charleston, SC references (neighborhoods, weather patterns, local landmarks, coastal climate)
- Are SEO-friendly with natural keyword usage related to roofing in Charleston
- Use markdown formatting with ## headings to break up sections
- Are between 800-1200 words
- Include practical, actionable advice for homeowners
- Mention the company phone number (843) 306-2939 where appropriate
- Reference SC licensing (RBC 694) when relevant
- Have a professional but approachable tone

Return ONLY the blog post content in markdown format. Do not include the title as an H1 — it will be displayed separately.`,
          },
          {
            role: "user",
            content: `Write a blog post about: ${topic}\nCategory: ${category}`,
          },
        ],
      }),
    });

    if (!contentResponse.ok) {
      const errBody = await contentResponse.text();
      console.error("OpenAI content error:", errBody);
      throw new Error("Failed to generate blog content");
    }

    const contentData = await contentResponse.json();
    const content = contentData.choices[0]?.message?.content?.trim();

    if (!content) throw new Error("No content generated");

    // Generate title and excerpt
    const metaResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `Given a blog post about roofing in Charleston SC, generate a JSON object with:
- "title": An SEO-friendly blog post title (50-70 characters, compelling, includes relevant keywords)
- "excerpt": A 2-sentence summary that entices readers to click (under 200 characters)

Return ONLY valid JSON, no markdown code fences.`,
          },
          {
            role: "user",
            content: `Topic: ${topic}\nCategory: ${category}\n\nBlog content:\n${content.substring(0, 1000)}`,
          },
        ],
      }),
    });

    if (!metaResponse.ok) {
      throw new Error("Failed to generate title/excerpt");
    }

    const metaData = await metaResponse.json();
    const metaText = metaData.choices[0]?.message?.content?.trim();
    const meta = JSON.parse(metaText);

    const title = meta.title;
    const excerpt = meta.excerpt;
    const slug = slugify(title);

    // Insert into Supabase as draft
    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt,
        content,
        category,
        author: "Restoration Roofing SC",
        published: false,
        metadata: { generated: true, topic },
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    return NextResponse.json({ post }, { status: 201, headers: corsHeaders });
  } catch (err: any) {
    console.error("Blog generation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate blog post" },
      { status: 500, headers: corsHeaders },
    );
  }
}
