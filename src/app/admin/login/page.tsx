import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-linen px-4 py-16">
      <LoginForm redirectTo={params.redirect ?? "/tools"} />
    </main>
  );
}
