import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sessionDb, storageUrl } from "@/lib/supabase";
import type { Project, Skill } from "@/lib/data";
import { CONTRIBUTION } from "@/lib/format";
import { deleteMedia, deleteProject, saveProject } from "../../../actions";
import { BiField, Check, DeleteButton, Field, Select } from "@/components/admin";
import { MarkdownEditor } from "@/components/markdown-editor";

export default async function EditProject({ params, searchParams }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const saved = (await searchParams).saved;
  const db = await sessionDb();
  const isNew = id === "new";

  const [proj, skills, exps] = await Promise.all([
    isNew
      ? Promise.resolve({ data: null })
      : db.from("projects").select("*, project_skills(skill_id), media:project_media(path, alt, caption)").eq("id", id).maybeSingle(),
    db.from("skills").select("*").order("name"),
    db.from("experiences").select("id, company").order("display_order"),
  ]);
  if (!isNew && !proj.data) notFound();
  const p = proj.data as (Project & { project_skills: { skill_id: number }[] }) | null;
  const selected = new Set(p?.project_skills.map((s) => s.skill_id));
  const experiences = Object.fromEntries([["", "— Side project —"], ...(exps.data ?? []).map((e) => [e.id, e.company])]);

  return (
    <>
      <Link href="/admin/projects" className="text-sm text-muted hover:text-accent">← Projects</Link>
      <h1 className="mt-2 text-2xl font-semibold">{p?.title ?? "New project"}</h1>
      {saved && <p role="status" className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">Saved and republished.</p>}

      <form action={saveProject} className="mt-6 space-y-6">
        {p && <input type="hidden" name="id" value={p.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={p?.title} required />
          <Field label="Slug" name="slug" defaultValue={p?.slug} required pattern="[a-z0-9-]+" />
          <Field label="Client" name="client" defaultValue={p?.client ?? ""} />
          <Field label="Category" name="category" defaultValue={p?.category} required />
          <Select label="Contribution" name="contribution_type" defaultValue={p?.contribution_type} options={CONTRIBUTION} />
          <Select label="Company" name="experience_id" defaultValue={p?.experience_id ?? ""} options={experiences} />
          <Field label="Role" name="role_description" defaultValue={p?.role_description ?? ""} />
          <Select label="Status" name="status" defaultValue={p?.status ?? "draft"} options={{ draft: "Draft", published: "Published" }} />
          <Field label="Start" name="period_start" type="date" defaultValue={p?.period_start ?? ""} />
          <Field label="End" name="period_end" type="date" defaultValue={p?.period_end ?? ""} />
          <Field label="Live URL" name="live_url" type="url" defaultValue={p?.live_url ?? ""} />
          <Field label="Repo URL" name="repo_url" type="url" defaultValue={p?.repo_url ?? ""} />
          <Field label="Order" name="display_order" type="number" defaultValue={p?.display_order ?? 0} />
        </div>
        <div className="flex flex-wrap gap-6">
          <Check label="Featured" name="is_featured" defaultChecked={p?.is_featured} />
          <Check label="Confidential (NDA)" name="is_confidential" defaultChecked={p?.is_confidential} />
          <Check label="Lab / side project" name="is_lab" defaultChecked={(p as { is_lab?: boolean } | null)?.is_lab} />
        </div>
        <BiField label="Summary (1 sentence)" name="summary" value={p?.summary} rows={2} />

        <fieldset>
          <legend className="mb-2 text-sm text-muted">Stack</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {((skills.data ?? []) as Skill[]).map((s) => (
              <Check key={s.id} label={s.name} name="skills" value={s.id} defaultChecked={selected.has(s.id)} />
            ))}
          </div>
        </fieldset>

        <MarkdownEditor name="content" value={p?.content} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cover (jpg/png/webp/svg, max 4 MB)" name="cover" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" />
          <div className="grid gap-2">
            <Field label="Add gallery image" name="media" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" />
            <Field label="Gallery alt / caption" name="media_alt" />
          </div>
        </div>
        <button className="btn">Save</button>
      </form>

      {p && p.media.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-medium">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {p.media.map((m) => (
              <div key={m.path} className="space-y-1">
                <Image src={storageUrl("project-media", m.path)} alt={m.caption ?? ""} width={240} height={160} className="rounded border border-line object-cover" />
                <DeleteButton action={deleteMedia} fields={{ path: m.path }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {p && (
        <div className="mt-12 border-t border-line pt-6">
          <DeleteButton action={deleteProject} fields={{ id: p.id }} label="Delete this project" />
        </div>
      )}
    </>
  );
}
