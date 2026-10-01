import Link from "next/link";
import type { Metadata } from "next";
import { EMPLOYMENT, duration, getExperiences, monthYear, t } from "@/lib/data";

export const metadata: Metadata = { title: "Experience", alternates: { canonical: "/experience" } };

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h1>
      <ol className="mt-10 border-l border-line">
        {experiences.map((e) => (
          <li key={e.id} className="relative mb-10 pl-6 last:mb-0">
            <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent" aria-hidden />
            <p className="font-mono text-xs text-muted">
              {monthYear(e.start_date)} – {monthYear(e.end_date)} · {duration(e.start_date, e.end_date)}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{e.role}</h2>
            <p className="text-muted">
              {e.company} · {EMPLOYMENT[e.employment_type]}
              {e.location && ` · ${e.location}`}
            </p>
            {t(e.description) && (
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer text-accent">Responsibilities</summary>
                <p className="mt-2 text-muted">{t(e.description)}</p>
              </details>
            )}
            {e.projects.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {e.projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="text-sm underline-offset-4 hover:text-accent hover:underline">
                      {p.title.split(" — ")[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
