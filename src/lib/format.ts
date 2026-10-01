// Pure helpers, safe for client and server.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rakhiazfa.vercel.app";

export type Bi = { id?: string; en?: string };
export const t = (v: Bi | null | undefined) => v?.en || v?.id || "";

export function duration(start: string, end: string | null) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth() + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(" ") || "< 1 mo";
}

export const monthYear = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";

export const AVAILABILITY: Record<"open_to_work" | "open_freelance" | "not_available", string> = {
  open_to_work: "Open to Work",
  open_freelance: "Open for Freelance",
  not_available: "Not Available",
};
export const CONTRIBUTION: Record<"from_scratch" | "development" | "maintenance", string> = {
  from_scratch: "Built from scratch",
  development: "Development",
  maintenance: "Maintenance & Enhancement",
};
export const EMPLOYMENT: Record<"full_time" | "freelance" | "intern" | "contract", string> = {
  full_time: "Full-time",
  freelance: "Freelance",
  intern: "Intern",
  contract: "Contract",
};
