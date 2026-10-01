import { Suspense } from "react";
import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectFilter } from "./project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects across e-commerce, booking, CMS, HRIS, insurance and monitoring — with technical case studies.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
      <p className="mt-2 text-muted">Filter by technology, category or contribution type.</p>
      {/* Static page; filtering happens client-side from the URL (FR-PROJ-04). */}
      <Suspense>
        <ProjectFilter projects={projects} />
      </Suspense>
    </>
  );
}
