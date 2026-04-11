import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, IMAGES } from "@/lib/data";
import type { BlogPost } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { PageHero, CTABanner, JsonLdScript } from "@/components/shared";
import { BlogListingContent } from "./blog-listing-content";

export const metadata: Metadata = {
  title: "Roofing Blog | Restoration Roofing SC - Expert Tips & Advice",
  description:
    "Expert roofing advice for Charleston homeowners. Tips on maintenance, storm preparation, insurance claims, and choosing the right roofing materials.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, category, image, author, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return BLOG_POSTS;
    }

    const localImageMap = new Map(BLOG_POSTS.map((p) => [p.slug, p.image]));
    const mapped: BlogPost[] = data.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      category: row.category,
      image: localImageMap.get(row.slug) || row.image || "",
      date: row.published_at
        ? new Date(row.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
    }));

    return mapped;
  } catch {
    return BLOG_POSTS;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Restoration Roofing SC Blog",
    description: "Expert roofing advice for Charleston homeowners.",
    url: "https://www.restorationroofingsc.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Restoration Roofing SC",
    },
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title="Roofing Resources & Blog"
        subtitle="Expert advice, maintenance tips, and industry insights from Charleston's trusted roofing professionals."
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="section-padding bg-white">
        <div className="container">
          <BlogListingContent posts={posts} categories={categories} />
        </div>
      </section>

      <CTABanner
        title="Have a Roofing Question?"
        subtitle="Our team is here to help. Contact us for expert advice on any roofing topic."
      />
    </>
  );
}
