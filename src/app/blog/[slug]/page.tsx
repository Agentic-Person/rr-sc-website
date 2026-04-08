import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, COMPANY, IMAGES } from "@/lib/data";
import type { BlogPost as BlogPostType } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { PageHero, CTABanner, JsonLdScript } from "@/components/shared";
import { Calendar, ArrowLeft, ArrowRight, Phone, Tag } from "lucide-react";

// --- Fetch all posts (with Supabase fallback to hardcoded) ---
async function getAllPosts(): Promise<BlogPostType[]> {
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
    return data.map((row: any) => ({
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
  } catch {
    return BLOG_POSTS;
  }
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Restoration Roofing SC Blog`,
    description: post.excerpt,
  };
}

// --- Markdown renderer ---
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ol" | "ul" | null = null;
  let key = 0;

  function flushList() {
    if (listItems.length === 0) return;
    const ListTag = listType === "ol" ? "ol" : "ul";
    elements.push(
      <ListTag
        key={key++}
        className={
          listType === "ol"
            ? "list-decimal pl-6 space-y-1"
            : "list-disc pl-6 space-y-1"
        }
      >
        {listItems.map((item, i) => (
          <li key={i}>{formatInline(item)}</li>
        ))}
      </ListTag>
    );
    listItems = [];
    listType = null;
  }

  function formatInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (level === 1)
        elements.push(<h1 key={key++}>{formatInline(text)}</h1>);
      else if (level === 2)
        elements.push(<h2 key={key++}>{formatInline(text)}</h2>);
      else if (level === 3)
        elements.push(<h3 key={key++}>{formatInline(text)}</h3>);
      else elements.push(<h4 key={key++}>{formatInline(text)}</h4>);
      continue;
    }

    // Numbered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(olMatch[1]);
      continue;
    }

    // Bullet list
    const ulMatch = trimmed.match(/^[-*]\s+(.+)/);
    if (ulMatch) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(ulMatch[1]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(<p key={key++}>{formatInline(trimmed)}</p>);
  }

  flushList();
  return elements;
}

// --- Page component ---
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = allPosts[postIndex];
  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const allCategories = Array.from(new Set(allPosts.map((p) => p.category)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: COMPANY.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.fullName,
    },
    description: post.excerpt,
    image: post.image,
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        image={post.image}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        compact
      />

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-amber bg-amber/10 px-2.5 py-1 rounded">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>

              <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-gray-800 prose-li:text-gray-800 prose-a:text-amber prose-strong:text-black">
                {renderMarkdown(post.content)}
              </article>

              {/* Post navigation */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center justify-between gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group flex items-center gap-2 text-sm text-gray-700 hover:text-navy transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <div>
                        <div className="text-xs text-gray-600">Previous</div>
                        <div className="font-medium text-gray-800 group-hover:text-amber transition-colors line-clamp-1">
                          {prevPost.title}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group flex items-center gap-2 text-sm text-gray-700 hover:text-navy transition-colors text-right"
                    >
                      <div>
                        <div className="text-xs text-gray-600">Next</div>
                        <div className="font-medium text-gray-800 group-hover:text-amber transition-colors line-clamp-1">
                          {nextPost.title}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA */}
                <div className="bg-navy rounded-lg p-6 text-white">
                  <h3 className="font-display text-lg font-semibold mb-2">
                    Need Roofing Help?
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Our team is ready to help with any roofing question or
                    concern. Free estimates available.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-amber w-full py-3 rounded-md text-sm text-center block mb-3"
                  >
                    Get a Free Estimate
                  </Link>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-md border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {COMPANY.phone}
                  </a>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-linen rounded-lg p-5">
                    <h3 className="font-display text-base font-semibold text-navy mb-3">
                      Related Articles
                    </h3>
                    <ul className="space-y-3">
                      {relatedPosts.map((rp) => (
                        <li key={rp.slug}>
                          <Link
                            href={`/blog/${rp.slug}`}
                            className="group"
                          >
                            <div className="flex gap-3">
                              <img
                                src={rp.image}
                                alt={rp.title}
                                className="w-16 h-12 rounded object-cover shrink-0"
                              />
                              <div>
                                <h4 className="text-sm font-medium text-navy group-hover:text-amber transition-colors leading-snug line-clamp-2">
                                  {rp.title}
                                </h4>
                                <span className="text-xs text-gray-600">
                                  {rp.date}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-linen rounded-lg p-5">
                  <h3 className="font-display text-base font-semibold text-navy mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((cat) => (
                      <Link
                        key={cat}
                        href="/blog"
                        className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1.5 rounded-full border border-gray-300 text-gray-800 hover:text-amber hover:border-amber/30 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
