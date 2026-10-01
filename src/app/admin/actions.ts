"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sessionDb } from "@/lib/supabase";

// ---------- helpers ----------

async function adminDb() {
  const db = await sessionDb();
  const { data } = await db.rpc("is_admin");
  if (!data) throw new Error("Unauthorized");
  return db;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim() || null;
const num = (fd: FormData, k: string) => Number(fd.get(k) ?? 0) || 0;
const bool = (fd: FormData, k: string) => fd.get(k) === "on";
const bi = (fd: FormData, k: string) => ({ id: str(fd, `${k}.id`) ?? "", en: str(fd, `${k}.en`) ?? "" });

function check<T extends { error: unknown }>(r: T) {
  if (r.error) throw new Error((r.error as { message?: string }).message ?? "Database error");
  return r;
}

// Every content change refreshes all public pages (FR-ADM-08).
const publish = () => revalidatePath("/", "layout");

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
// ponytail: 4 MB because Vercel caps function request bodies at 4.5 MB; upload straight from the browser to Storage if bigger files are needed.
const MAX_SIZE = 4 * 1024 * 1024;

async function upload(db: SupabaseClient, bucket: string, file: FormDataEntryValue | null, types: string[]) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!types.includes(file.type)) throw new Error(`Unsupported file type: ${file.type}`);
  if (file.size > MAX_SIZE) throw new Error("Maximum file size is 4 MB");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  check(await db.storage.from(bucket).upload(path, file, { contentType: file.type }));
  return path;
}

// ---------- auth ----------

export async function login(_: string | undefined, fd: FormData) {
  const db = await sessionDb();
  const { error } = await db.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
  if (error) return "Invalid email or password.";
  const { data: ok } = await db.rpc("is_admin");
  if (!ok) {
    await db.auth.signOut();
    return "This account does not have admin access.";
  }
  redirect("/admin");
}

export async function logout() {
  await (await sessionDb()).auth.signOut();
  redirect("/admin/login");
}

// ---------- settings ----------

export async function saveSettings(fd: FormData) {
  const db = await adminDb();
  const avatar = await upload(db, "avatars", fd.get("avatar"), IMAGE_TYPES);
  const highlights = String(fd.get("highlights") ?? "")
    .split("\n")
    .map((l) => l.split("|").map((x) => x.trim()))
    .filter(([v, id]) => v && id)
    .map(([value, id, en]) => ({ value, label: { id, en: en ?? id } }));
  check(
    await db.from("site_settings").update({
      full_name: str(fd, "full_name"),
      headline: bi(fd, "headline"),
      summary: bi(fd, "summary"),
      about: bi(fd, "about"),
      location: str(fd, "location"),
      email: str(fd, "email"),
      phone: str(fd, "phone"),
      whatsapp: str(fd, "whatsapp"),
      linkedin_url: str(fd, "linkedin_url"),
      github_url: str(fd, "github_url"),
      availability: str(fd, "availability"),
      highlights,
      ...(avatar && { avatar_path: avatar }),
      updated_at: new Date().toISOString(),
    }).eq("id", 1),
  );
  publish();
}

// ---------- experiences ----------

export async function saveExperience(fd: FormData) {
  const db = await adminDb();
  const row = {
    company: str(fd, "company"),
    role: str(fd, "role"),
    employment_type: str(fd, "employment_type"),
    start_date: str(fd, "start_date"),
    end_date: str(fd, "end_date"),
    location: str(fd, "location"),
    description: bi(fd, "description"),
    display_order: num(fd, "display_order"),
  };
  const id = str(fd, "id");
  check(id ? await db.from("experiences").update(row).eq("id", id) : await db.from("experiences").insert(row));
  publish();
}

export async function deleteExperience(fd: FormData) {
  check(await (await adminDb()).from("experiences").delete().eq("id", str(fd, "id")));
  publish();
}

// ---------- skills ----------

export async function saveCategory(fd: FormData) {
  const db = await adminDb();
  const row = { name: bi(fd, "name"), display_order: num(fd, "display_order") };
  const id = str(fd, "id");
  check(id ? await db.from("skill_categories").update(row).eq("id", id) : await db.from("skill_categories").insert(row));
  publish();
}

export async function deleteCategory(fd: FormData) {
  check(await (await adminDb()).from("skill_categories").delete().eq("id", str(fd, "id")));
  publish();
}

export async function saveSkill(fd: FormData) {
  const db = await adminDb();
  const name = str(fd, "name") ?? "";
  const row = {
    category_id: num(fd, "category_id"),
    name,
    slug: str(fd, "slug") ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    icon: str(fd, "icon"),
    is_learning: bool(fd, "is_learning"),
    display_order: num(fd, "display_order"),
  };
  const id = str(fd, "id");
  check(id ? await db.from("skills").update(row).eq("id", id) : await db.from("skills").insert(row));
  publish();
}

export async function deleteSkill(fd: FormData) {
  check(await (await adminDb()).from("skills").delete().eq("id", str(fd, "id")));
  publish();
}

// ---------- projects ----------

export async function saveProject(fd: FormData) {
  const db = await adminDb();
  const cover = await upload(db, "project-media", fd.get("cover"), IMAGE_TYPES);
  const row = {
    slug: str(fd, "slug"),
    title: str(fd, "title"),
    client: str(fd, "client"),
    category: str(fd, "category"),
    contribution_type: str(fd, "contribution_type"),
    experience_id: str(fd, "experience_id"),
    summary: bi(fd, "summary"),
    content: bi(fd, "content"),
    role_description: str(fd, "role_description"),
    is_confidential: bool(fd, "is_confidential"),
    is_featured: bool(fd, "is_featured"),
    is_lab: bool(fd, "is_lab"),
    live_url: str(fd, "live_url"),
    repo_url: str(fd, "repo_url"),
    status: str(fd, "status"),
    period_start: str(fd, "period_start"),
    period_end: str(fd, "period_end"),
    display_order: num(fd, "display_order"),
    updated_at: new Date().toISOString(),
    ...(cover && { cover_path: cover }),
  };
  let id = str(fd, "id");
  if (id) check(await db.from("projects").update(row).eq("id", id));
  else id = check(await db.from("projects").insert(row).select("id").single()).data!.id as string;

  // ponytail: replace-all for the join table; fine for a dozen skills per project.
  check(await db.from("project_skills").delete().eq("project_id", id));
  const skills = fd.getAll("skills").map((s) => ({ project_id: id, skill_id: Number(s) }));
  if (skills.length) check(await db.from("project_skills").insert(skills));

  const media = await upload(db, "project-media", fd.get("media"), IMAGE_TYPES);
  if (media) {
    check(
      await db.from("project_media").insert({
        project_id: id,
        path: media,
        alt: { id: str(fd, "media_alt") ?? "", en: "" },
        caption: str(fd, "media_alt"),
      }),
    );
  }
  publish();
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function deleteProject(fd: FormData) {
  check(await (await adminDb()).from("projects").delete().eq("id", str(fd, "id")));
  publish();
  redirect("/admin/projects");
}

export async function deleteMedia(fd: FormData) {
  const db = await adminDb();
  const path = str(fd, "path")!;
  check(await db.from("project_media").delete().eq("path", path));
  await db.storage.from("project-media").remove([path]);
  publish();
}

// ---------- resumes ----------

export async function uploadResume(fd: FormData) {
  const db = await adminDb();
  const locale = str(fd, "locale") ?? "id";
  const path = await upload(db, "resumes", fd.get("file"), ["application/pdf"]);
  if (!path) throw new Error("Please choose a PDF file");
  const { data } = check(await db.from("resumes").insert({ locale, file_path: path }).select("id").single());
  await activate(db, data!.id, locale);
}

async function activate(db: SupabaseClient, id: string, locale: string) {
  check(await db.from("resumes").update({ is_active: false }).eq("locale", locale).eq("is_active", true));
  check(await db.from("resumes").update({ is_active: true }).eq("id", id));
  publish();
}

export async function activateResume(fd: FormData) {
  await activate(await adminDb(), str(fd, "id")!, str(fd, "locale")!);
}

export async function deleteResume(fd: FormData) {
  const db = await adminDb();
  check(await db.from("resumes").delete().eq("id", str(fd, "id")));
  await db.storage.from("resumes").remove([str(fd, "file_path")!]);
  publish();
}

// ---------- messages ----------

export async function setMessageStatus(fd: FormData) {
  check(await (await adminDb()).from("contact_messages").update({ status: str(fd, "status") }).eq("id", str(fd, "id")));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(fd: FormData) {
  check(await (await adminDb()).from("contact_messages").delete().eq("id", str(fd, "id")));
  revalidatePath("/admin", "layout");
}
