import { NextResponse } from "next/server";
import { getResumeUrl } from "@/lib/data";

// Stable link that always points at the active CV (FR-CV-01). Dynamic so a new upload applies instantly.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = await getResumeUrl();
  if (!url) return NextResponse.redirect(new URL("/contact", req.url));
  return NextResponse.redirect(`${url}?download=CV_Rakhi_Azfa_Rifansya.pdf`);
}
