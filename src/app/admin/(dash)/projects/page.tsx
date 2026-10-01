import Link from "next/link";
import { sessionDb } from "@/lib/supabase";

type Row = { id: string; slug: string; title: string; status: string; is_featured: boolean; is_confidential: boolean; display_order: number };

export default async function Projects() {
  const db = await sessionDb();
  const { data } = await db
    .from("projects")
    .select("id, slug, title, status, is_featured, is_confidential, display_order")
    .order("display_order");
  const rows = (data ?? []) as Row[];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="btn">+ New project</Link>
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead className="text-muted">
          <tr>
            <th className="py-2 pr-3 font-normal">#</th>
            <th className="py-2 pr-3 font-normal">Title</th>
            <th className="py-2 pr-3 font-normal">Status</th>
            <th className="py-2 font-normal">Flag</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((p) => (
            <tr key={p.id}>
              <td className="py-2 pr-3 font-mono text-muted">{p.display_order}</td>
              <td className="py-2 pr-3">
                <Link href={`/admin/projects/${p.id}`} className="hover:text-accent">{p.title}</Link>
              </td>
              <td className="py-2 pr-3">
                <span className={p.status === "published" ? "text-emerald-600 dark:text-emerald-400" : "text-muted"}>{p.status}</span>
              </td>
              <td className="py-2 text-xs text-muted">
                {[p.is_featured && "featured", p.is_confidential && "NDA"].filter(Boolean).join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
