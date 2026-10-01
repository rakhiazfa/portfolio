import Link from "next/link";
import type { Project, Settings, SkillCategory } from "@/lib/data";
import { AVAILABILITY, CONTRIBUTION, t } from "@/lib/format";

export function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {children && <p className="mt-2 max-w-2xl text-muted">{children}</p>}
    </div>
  );
}

export function Badge({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls = "inline-block rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted";
  return href ? (
    <Link href={href} className={`${cls} hover:border-accent hover:text-accent`}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}

export function AvailabilityBadge({ value }: { value: Settings["availability"] }) {
  const on = value !== "not_available";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm">
      <span className={`size-2 rounded-full ${on ? "bg-emerald-500" : "bg-zinc-400"}`} aria-hidden />
      {AVAILABILITY[value]}
    </span>
  );
}

export function SocialLinks({ s }: { s: Settings }) {
  const links = [
    s.linkedin_url && ["LinkedIn", s.linkedin_url],
    s.github_url && ["GitHub", s.github_url],
    s.email && ["Email", `mailto:${s.email}`],
    s.whatsapp && ["WhatsApp", `https://wa.me/${s.whatsapp}`],
  ].filter(Boolean) as [string, string][];
  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {links.map(([label, href]) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-4 hover:text-accent hover:underline">
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  const year = p.period_start?.slice(0, 4);
  return (
    <article className="group relative flex flex-col rounded-xl border border-line bg-card p-5 transition hover:border-accent">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="font-mono text-accent">{p.category}</span>
        <span aria-hidden>·</span>
        <span>{CONTRIBUTION[p.contribution_type]}</span>
        {p.is_confidential && (
          <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-700 dark:text-amber-400">Confidential</span>
        )}
      </div>
      <h3 className="font-semibold leading-snug">
        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0">
          {p.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">{t(p.summary)}</p>
      <p className="mt-3 text-xs text-muted">
        {[p.client, year].filter(Boolean).join(" · ")}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.skills.slice(0, 5).map((s) => (
          <Badge key={s.id}>{s.name}</Badge>
        ))}
      </div>
    </article>
  );
}

export function SkillGrid({ categories }: { categories: SkillCategory[] }) {
  const learning = categories.flatMap((c) => c.skills.filter((s) => s.is_learning));
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <div key={c.id}>
          <h3 className="mb-3 text-sm font-medium">{t(c.name)}</h3>
          <div className="flex flex-wrap gap-1.5">
            {c.skills
              .filter((s) => !s.is_learning)
              .map((s) => (
                <Badge key={s.id} href={s.count ? `/projects?stack=${s.slug}` : undefined}>
                  {s.name}
                  {s.count > 0 && <span className="ml-1 text-accent">{s.count}</span>}
                </Badge>
              ))}
          </div>
        </div>
      ))}
      {learning.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Currently Exploring</h3>
          <div className="flex flex-wrap gap-1.5">
            {learning.map((s) => (
              <Badge key={s.id}>{s.name}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
