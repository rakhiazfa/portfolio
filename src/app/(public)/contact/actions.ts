"use server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { serviceDb } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Please enter a valid email"),
  subject: z.enum(["job", "freelance", "other"]),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be at most 2000 characters"),
});

export type ContactState = { ok?: boolean; error?: string; values?: Record<string, string> };

const RATE_LIMIT = 3; // per IP per hour (FR-CON-04)

export async function sendMessage(_: ContactState, fd: FormData): Promise<ContactState> {
  const values = Object.fromEntries(["name", "email", "subject", "message"].map((k) => [k, String(fd.get(k) ?? "")]));
  const fail = (error: string) => ({ error, values });

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (fd.get("website")) return { ok: true };

  const parsed = schema.safeParse(values);
  if (!parsed.success) return fail(parsed.error.issues[0].message);

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: String(fd.get("cf-turnstile-response") ?? ""), remoteip: ip }),
    }).then((r) => r.json() as Promise<{ success: boolean }>);
    if (!res.success) return fail("Spam check failed. Please try again.");
  }

  const ipHash = createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? ""))
    .digest("hex");
  const db = serviceDb();
  const { count } = await db
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", new Date(Date.now() - 3600_000).toISOString());
  if ((count ?? 0) >= RATE_LIMIT) return fail("Too many messages. Please try again in an hour.");

  const { error } = await db.from("contact_messages").insert({
    ...parsed.data,
    ip_hash: ipHash,
    user_agent: h.get("user-agent")?.slice(0, 300),
  });
  if (error) return fail("Could not send your message. Please try again or reach out by email.");
  return { ok: true };
}
