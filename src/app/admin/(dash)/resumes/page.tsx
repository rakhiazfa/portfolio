import { sessionDb, storageUrl } from "@/lib/supabase";
import { activateResume, deleteResume, uploadResume } from "../../actions";
import { DeleteButton, Select } from "@/components/admin";

type Resume = { id: string; locale: string; file_path: string; is_active: boolean; uploaded_at: string };

export default async function Resumes() {
  const db = await sessionDb();
  const { data } = await db.from("resumes").select("*").order("uploaded_at", { ascending: false });
  const rows = (data ?? []) as Resume[];

  return (
    <>
      <h1 className="text-2xl font-semibold">CV</h1>
      <p className="mt-1 text-sm text-muted">An uploaded file immediately becomes the active CV for its locale. Public link: <code>/cv</code>.</p>
      <form action={uploadResume} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-line p-4">
        <Select label="Locale" name="locale" options={{ id: "Indonesia", en: "English" }} />
        <label className="text-sm">
          <span className="text-muted">PDF (max 4 MB)</span>
          <input name="file" type="file" accept="application/pdf" required className="input mt-1" />
        </label>
        <button className="btn">Upload</button>
      </form>
      <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-4 p-4 text-sm">
            <span className="font-mono uppercase">{r.locale}</span>
            <a href={storageUrl("resumes", r.file_path)} target="_blank" rel="noopener noreferrer" className="flex-1 text-accent hover:underline">
              {new Date(r.uploaded_at).toLocaleString("en-US")}
            </a>
            {r.is_active ? (
              <span className="rounded bg-accent px-2 text-xs text-background">active</span>
            ) : (
              <form action={activateResume}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="locale" value={r.locale} />
                <button className="text-accent hover:underline">Make active</button>
              </form>
            )}
            <DeleteButton action={deleteResume} fields={{ id: r.id, file_path: r.file_path }} />
          </li>
        ))}
      </ul>
    </>
  );
}
