import Link from "next/link";
import { getProjects, getSettings, getSkillCategories, t } from "@/lib/data";
import { AvailabilityBadge, ProjectCard, SectionTitle, SkillGrid, SocialLinks } from "@/components/ui";

export default async function Home() {
  const [s, projects, categories] = await Promise.all([getSettings(), getProjects(), getSkillCategories()]);
  const featured = projects.filter((p) => p.is_featured).slice(0, 4);

  return (
    <div className="space-y-24">
      <section className="fade-in">
        <AvailabilityBadge value={s.availability} />
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">{s.full_name}</h1>
        <p className="mt-3 text-xl text-accent sm:text-2xl">
          {t(s.headline)} <span className="text-muted">· {s.location}</span>
        </p>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t(s.summary)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn">View Projects</Link>
          <a href="/cv" className="btn-ghost">Download CV</a>
        </div>
        <div className="mt-6">
          <SocialLinks s={s} />
        </div>
      </section>

      {s.highlights.length > 0 && (
        <section aria-label="Highlights" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {s.highlights.map((h) => (
            <div key={h.value + t(h.label)} className="rounded-xl border border-line bg-card p-5">
              <p className="text-3xl font-bold text-accent">{h.value}</p>
              <p className="mt-1 text-sm text-muted">{t(h.label)}</p>
            </div>
          ))}
        </section>
      )}

      <section>
        <SectionTitle eyebrow="Featured" title="Featured Projects">
          Technical case studies: the problem, the solution, the architecture and the trade-offs.
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        <Link href="/projects" className="mt-6 inline-block text-accent hover:underline">
          All projects ({projects.length}) →
        </Link>
      </section>

      <section>
        <SectionTitle eyebrow="Stack" title="Tech Stack">
          Numbers show how many projects use each technology — click one to see them.
        </SectionTitle>
        <SkillGrid categories={categories} />
      </section>

      <section className="rounded-2xl border border-line bg-card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold">Have a project or a role in mind?</h2>
        <p className="mt-2 text-muted">I’m open to both full-time roles and freelance projects.</p>
        <Link href="/contact" className="btn mt-6">Get in Touch</Link>
      </section>
    </div>
  );
}
