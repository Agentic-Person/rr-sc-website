// Next.js Route Handler — GET /api/blog
// Returns published blog posts with pagination

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10") || 10));
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // Get paginated posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, category, image, author, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json(
      {
        posts: posts || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
      { status: 200, headers: corsHeaders },
    );
  } catch (err: any) {
    console.error("Blog list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500, headers: corsHeaders },
    );
  }
}
