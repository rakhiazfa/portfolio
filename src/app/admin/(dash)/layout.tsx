import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { sessionDb } from "@/lib/supabase";
import { logout } from "../actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

const NAV = [
  ["/admin/messages", "Messages"],
  ["/admin/projects", "Projects"],
  ["/admin/experiences", "Experience"],
  ["/admin/skills", "Skills"],
  ["/admin/resumes", "CV"],
  ["/admin/settings", "Profile"],
] as const;

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const db = await sessionDb();
  const { data: isAdmin } = await db.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login");
  const { count } = await db.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row">
      <nav className="flex shrink-0 flex-wrap gap-1 text-sm md:w-44 md:flex-col">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-card">
            {label}
            {href === "/admin/messages" && !!count && (
              <span className="ml-2 rounded-full bg-accent px-2 text-xs text-background">{count}</span>
            )}
          </Link>
        ))}
        <Link href="/" className="rounded-md px-3 py-2 text-muted hover:bg-card">View site ↗</Link>
        <form action={logout}>
          <button className="rounded-md px-3 py-2 text-muted hover:bg-card">Sign out</button>
        </form>
      </nav>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
