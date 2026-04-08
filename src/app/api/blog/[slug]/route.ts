// Next.js Route Handler — GET /api/blog/[slug]
// Returns a single published blog post by slug

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400, headers: corsHeaders },
      );
    }

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    return NextResponse.json({ post }, { status: 200, headers: corsHeaders });
  } catch (err: any) {
    console.error("Blog post error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500, headers: corsHeaders },
    );
  }
}
