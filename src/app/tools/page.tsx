import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, LineChart } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Internal Tools",
  robots: { index: false, follow: false },
};

const TOOLS = [
  {
    slug: "pricing",
    name: "Pricing Formula",
    description:
      "Adjust the live customer-facing roof quote variables. Powers the Roof Quote page and the AI chat assistant.",
    icon: Calculator,
    available: true,
  },
  {
    slug: "seo",
    name: "SEO / AEO Snapshot",
    description: "Coming soon — track keyword rankings, AEO query coverage, and content gaps.",
    icon: LineChart,
    available: false,
  },
];

export default async function ToolsLandingPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="bg-linen min-h-[70vh] py-16">
      <div className="container max-w-5xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-dark">
            Internal Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-navy mt-2 leading-tight">
            Restoration Roofing SC — Operations
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl">
            Custom tools for managing the website, pricing, SEO, and AI chat. Sign in
            with your admin account to make changes.
          </p>
          {user ? (
            <p className="text-xs text-gray-500 mt-3">Signed in as {user.email}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-3">
              Not signed in.{" "}
              <Link href="/admin/login" className="text-amber-dark underline">
                Sign in
              </Link>{" "}
              to use the tools below.
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const inner = (
              <div
                className={`relative h-full bg-white rounded-2xl p-6 border transition shadow-sm ${
                  tool.available
                    ? "border-gray-200 hover:border-amber hover:shadow-lg"
                    : "border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber/10 text-amber-dark flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-navy">{tool.name}</h2>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                    {tool.available && (
                      <span className="inline-flex items-center gap-1 text-amber-dark font-semibold text-sm mt-3">
                        Open <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return tool.available ? (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block h-full">
                {inner}
              </Link>
            ) : (
              <div key={tool.slug} className="h-full cursor-not-allowed">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
