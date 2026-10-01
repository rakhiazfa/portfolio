import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTRIBUTION, SITE_URL, getProjects, monthYear, t } from "@/lib/data";
import { storageUrl } from "@/lib/supabase";
import { Markdown } from "@/components/markdown";
import { Badge, ProjectCard } from "@/components/ui";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

async function find(slug: string) {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  return { projects, i, p: projects[i] };
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { p } = await find((await params).slug);
  return {
    title: p.title,
    description: t(p.summary),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: t(p.summary), type: "article" },
  };
}

export default async function CaseStudy({ params }: PageProps<"/projects/[slug]">) {
  const { projects, i, p } = await find((await params).slug);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const stack = new Set(p.skills.map((s) => s.id));
  const related = projects
    .filter((o) => o.id !== p.id)
    .map((o) => ({ o, shared: o.skills.filter((s) => stack.has(s.id)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((x) => x.o);
  const content = t(p.content);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    abstract: t(p.summary),
    url: `${SITE_URL}/projects/${p.slug}`,
    author: { "@type": "Person", name: "Rakhi Azfa Rifansya" },
    keywords: p.skills.map((s) => s.name).join(", "),
  };

  return (
    <article>
      <Link href="/projects" className="text-sm text-muted hover:text-accent">← All projects</Link>
      <header className="mt-6 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.category}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{t(p.summary)}</p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-4">
          {[
            ["Client", p.client],
            ["Period", p.period_start && `${monthYear(p.period_start)} – ${monthYear(p.period_end)}`],
            ["Role", p.role_description],
            ["Contribution", CONTRIBUTION[p.contribution_type]],
          ].map(([k, v]) =>
            v ? (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ) : null,
          )}
        </dl>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.skills.map((s) => (
            <Badge key={s.id} href={`/projects?stack=${s.slug}`}>{s.name}</Badge>
          ))}
        </div>
        {p.is_confidential ? (
          <p className="mt-6 rounded-lg bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            Confidential / Client Project — only a high-level description and generic diagrams are shown.
          </p>
        ) : (
          (p.live_url || p.repo_url) && (
            <div className="mt-6 flex gap-3">
              {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="btn">Live demo</a>}
              {p.repo_url && <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost">Repository</a>}
            </div>
          )
        )}
      </header>

      <div className="prose mx-auto mt-10 max-w-3xl">
        {content ? <Markdown>{content}</Markdown> : <p className="text-muted">Full case study coming soon.</p>}
      </div>

      {!p.is_confidential && p.media.length > 0 && (
        <section className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2" aria-label="Gallery">
          {p.media.map((m) => (
            <a key={m.path} href={storageUrl("project-media", m.path)} target="_blank" rel="noopener noreferrer">
              <Image
                src={storageUrl("project-media", m.path)}
                alt={t(m.alt) || p.title}
                width={800}
                height={500}
                className="rounded-lg border border-line object-cover"
              />
              {m.caption && <span className="mt-1 block text-xs text-muted">{m.caption}</span>}
            </a>
          ))}
        </section>
      )}

      <nav className="mt-16 flex justify-between gap-4 border-t border-line pt-6 text-sm" aria-label="Project navigation">
        {prev ? <Link href={`/projects/${prev.slug}`} className="hover:text-accent">← {prev.title}</Link> : <span />}
        {next && <Link href={`/projects/${next.slug}`} className="text-right hover:text-accent">{next.title} →</Link>}
      </nav>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Related projects</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <ProjectCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </article>
  );
}
