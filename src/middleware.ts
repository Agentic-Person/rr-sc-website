// Gate /tools/pricing (and any future /tools/* admin tool) behind a Supabase Auth session.
// Public pages and the /admin/login route are unaffected.
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_PATH_PREFIXES = ["/tools/pricing"];
const LOGIN_PATH = "/admin/login";

function requiresAuth(pathname: string): boolean {
  return ADMIN_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!requiresAuth(pathname)) return NextResponse.next();

  // Refresh the auth session by reading cookies and writing any rotated ones back.
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Run middleware on all routes EXCEPT static assets, the optimizer, and Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|fonts/|api/).*)"],
};
