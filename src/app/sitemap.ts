import type { MetadataRoute } from "next";
import { SITE_URL, getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/projects", "/experience", "/about", "/contact"].map((p) => ({ url: SITE_URL + p }));
  const projects = (await getProjects()).map((p) => ({ url: `${SITE_URL}/projects/${p.slug}` }));
  return [...pages, ...projects];
}
