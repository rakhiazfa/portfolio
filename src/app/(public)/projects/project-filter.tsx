"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/lib/data";
import { CONTRIBUTION, t } from "@/lib/format";
import { ProjectCard } from "@/components/ui";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [resets, setResets] = useState(0); // remounts the uncontrolled search box on reset

  const stack = params.get("stack")?.split(",").filter(Boolean) ?? [];
  const category = params.get("category") ?? "";
  const type = params.get("type") ?? "";
  const q = params.get("q") ?? "";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };
  const toggleStack = (slug: string) =>
    set("stack", (stack.includes(slug) ? stack.filter((s) => s !== slug) : [...stack, slug]).join(","));

  const allSkills = [...new Map(projects.flatMap((p) => p.skills).map((s) => [s.slug, s])).values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const categories = [...new Set(projects.map((p) => p.category))].sort();
  const needle = q.toLowerCase();

  const shown = projects.filter(
    (p) =>
      stack.every((s) => p.skills.some((ps) => ps.slug === s)) &&
      (!category || p.category === category) &&
      (!type || p.contribution_type === type) &&
      (!needle || `${p.title} ${t(p.summary)}`.toLowerCase().includes(needle)),
  );

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          <span className="sr-only">Search projects</span>
          <input
            key={resets}
            type="search"
            className="input"
            placeholder="Search title or summary…"
            defaultValue={q}
            onChange={(e) => set("q", e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="sr-only">Category</span>
          <select className="input" value={category} onChange={(e) => set("category", e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="sr-only">Contribution type</span>
          <select className="input" value={type} onChange={(e) => set("type", e.target.value)}>
            <option value="">All contribution types</option>
            {Object.entries(CONTRIBUTION).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-4 flex flex-wrap gap-1.5">
        <legend className="sr-only">Technologies</legend>
        {allSkills.map((s) => {
          const on = stack.includes(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={on}
              onClick={() => toggleStack(s.slug)}
              className={`rounded-md border px-2 py-0.5 font-mono text-xs ${on ? "border-accent bg-accent text-background" : "border-line text-muted hover:border-accent"}`}
            >
              {s.name}
            </button>
          );
        })}
      </fieldset>

      <p className="mt-6 text-sm text-muted" aria-live="polite">{shown.length} {shown.length === 1 ? "project" : "projects"}</p>
      {shown.length ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-line p-10 text-center">
          <p>No projects match these filters.</p>
          <button type="button" className="btn-ghost mt-4" onClick={() => {
              setResets((n) => n + 1);
              router.replace(pathname, { scroll: false });
            }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
