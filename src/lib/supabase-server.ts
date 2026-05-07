// Supabase server client for use in Server Components, Route Handlers, and Server Actions.
// Reads cookies for the user session so we can check auth status.
//
// IMPORTANT: never import this from a "use client" component — server-only.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // In Server Components cookie writes are no-ops (Next.js limitation);
          // Server Actions and Route Handlers will set them properly via the
          // returned response cookies in middleware.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — safe to ignore.
          }
        },
      },
    },
  );
}

// Service-role client for admin operations (bypasses RLS).
// Used by Server Actions on /tools/pricing to write the pricing_config row.
import { createClient as createServiceClient } from "@supabase/supabase-js";

export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role credentials missing");
  }
  return createServiceClient(url, key, { auth: { persistSession: false } });
}
