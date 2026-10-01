import "server-only";
import { cache } from "react";
import { publicDb, storageUrl } from "./supabase";
import type { Bi } from "./format";
export * from "./format";

// ponytail: hand-written row types; swap for `supabase gen types` output once the project is linked.

export type Availability = "open_to_work" | "open_freelance" | "not_available";
export type Settings = {
  full_name: string;
  headline: Bi;
  summary: Bi;
  about: Bi;
  location: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  availability: Availability;
  avatar_path: string | null;
  highlights: { label: Bi; value: string }[];
};
export type Skill = { id: number; category_id: number; name: string; slug: string; is_learning: boolean; display_order: number };
export type SkillCategory = { id: number; name: Bi; display_order: number; skills: (Skill & { count: number })[] };
export type Project = {
  id: string;
  experience_id: string | null;
  slug: string;
  title: string;
  client: string | null;
  category: string;
  contribution_type: "from_scratch" | "development" | "maintenance";
  summary: Bi;
  content: Bi;
  role_description: string | null;
  is_confidential: boolean;
  is_featured: boolean;
  live_url: string | null;
  repo_url: string | null;
  cover_path: string | null;
  status: "draft" | "published";
  period_start: string | null;
  period_end: string | null;
  display_order: number;
  skills: Skill[];
  media: { path: string; alt: Bi; caption: string | null }[];
};
export type Experience = {
  id: string;
  company: string;
  role: string;
  employment_type: "full_time" | "freelance" | "intern" | "contract";
  start_date: string;
  end_date: string | null;
  location: string | null;
  description: Bi;
  display_order: number;
  projects: Pick<Project, "slug" | "title" | "display_order">[];
};

function must<T>({ data, error }: { data: T | null; error: unknown }): T {
  if (error) throw error;
  return data as T;
}

export const getSettings = cache(async () =>
  must<Settings>(await publicDb().from("site_settings").select("*").eq("id", 1).single()),
);

export const getProjects = cache(async () => {
  const rows = must<(Omit<Project, "skills"> & { project_skills: { skills: Skill }[] })[]>(
    await publicDb()
      .from("projects")
      .select("*, project_skills(skills(*)), media:project_media(path, alt, caption)")
      .eq("status", "published")
      .eq("is_lab", false)
      .order("display_order"),
  );
  return rows.map(({ project_skills, ...p }) => ({
    ...p,
    skills: project_skills.map((ps) => ps.skills).sort((a, b) => a.display_order - b.display_order),
  })) as Project[];
});

export const getExperiences = cache(async () => {
  const rows = must<Experience[]>(
    await publicDb()
      .from("experiences")
      .select("*, projects(slug, title, display_order)")
      .order("display_order"),
  );
  // RLS already hides drafts from the embedded projects.
  rows.forEach((e) => e.projects.sort((a, b) => a.display_order - b.display_order));
  return rows;
});

export const getSkillCategories = cache(async () => {
  const [cats, links] = await Promise.all([
    publicDb().from("skill_categories").select("*, skills(*)").order("display_order"),
    publicDb().from("project_skills").select("skill_id, projects!inner(status)").eq("projects.status", "published"),
  ]);
  const counts = new Map<number, number>();
  for (const l of must<{ skill_id: number }[]>(links)) counts.set(l.skill_id, (counts.get(l.skill_id) ?? 0) + 1);
  return must<SkillCategory[]>(cats).map((c) => ({
    ...c,
    skills: c.skills
      .sort((a, b) => a.display_order - b.display_order)
      .map((s) => ({ ...s, count: counts.get(s.id) ?? 0 })),
  }));
});

export const getResumeUrl = cache(async (locale = "id") => {
  const { data } = await publicDb()
    .from("resumes")
    .select("file_path")
    .eq("is_active", true)
    .eq("locale", locale)
    .maybeSingle();
  return data ? storageUrl("resumes", data.file_path) : null;
});
