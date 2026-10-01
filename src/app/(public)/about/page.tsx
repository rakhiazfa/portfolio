import Image from "next/image";
import type { Metadata } from "next";
import { getSettings, getSkillCategories, t } from "@/lib/data";
import { storageUrl } from "@/lib/supabase";
import { Markdown } from "@/components/markdown";
import { AvailabilityBadge, SectionTitle, SkillGrid } from "@/components/ui";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default async function About() {
  const [s, categories] = await Promise.all([getSettings(), getSkillCategories()]);
  return (
    <div className="space-y-16">
      <section className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {s.avatar_path && (
          <Image
            src={storageUrl("avatars", s.avatar_path)}
            alt={`Photo of ${s.full_name}`}
            width={160}
            height={160}
            priority
            className="size-40 shrink-0 rounded-2xl object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h1>
          <div className="mt-3">
            <AvailabilityBadge value={s.availability} />
          </div>
          <div className="prose mt-6 max-w-2xl">
            <Markdown>{t(s.about)}</Markdown>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Education" title="Education" />
        <div className="rounded-xl border border-line bg-card p-5">
          <p className="font-medium">SMK Balai Perguruan Putri Bandung</p>
          <p className="text-sm text-muted">Software Engineering · 2020 – 2023</p>
        </div>
      </section>

      <section id="skills">
        <SectionTitle eyebrow="Skills" title="Skill Matrix">
          No percentage bars — every skill links to the projects that use it.
        </SectionTitle>
        <SkillGrid categories={categories} />
      </section>
    </div>
  );
}
