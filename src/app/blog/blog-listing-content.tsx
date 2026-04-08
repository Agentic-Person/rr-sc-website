"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/data";
import { Calendar, ArrowRight } from "lucide-react";

export function BlogListingContent({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-navy text-white"
                : "bg-linen text-gray-800 hover:bg-navy/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Link href={`/blog/${filtered[0].slug}`}>
            <div className="group grid grid-cols-1 md:grid-cols-2 gap-6 bg-linen rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-amber bg-amber/10 px-2.5 py-1 rounded">
                    {filtered[0].category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {filtered[0].date}
                  </span>
                  <span className="text-xs text-gray-600">5 min read</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy group-hover:text-amber transition-colors mb-3 leading-snug">
                  {filtered[0].title}
                </h2>
                <p className="text-gray-800 leading-relaxed mb-4">
                  {filtered[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-amber group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(1).map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="group bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-lg transition-all h-full">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-600">{post.date}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-navy group-hover:text-amber transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">5 min read</span>
                    <span className="text-sm font-medium text-amber group-hover:gap-2 transition-all inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
