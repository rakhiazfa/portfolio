"use client";
import Script from "next/script";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "./actions";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, {});
  const v = state.values ?? {};

  if (state.ok)
    return (
      <div role="status" className="rounded-xl border border-accent bg-card p-8">
        <p className="text-lg font-semibold">Thanks! Your message has been sent.</p>
        <p className="mt-1 text-muted">I’ll reply as soon as possible, usually within 1–2 business days.</p>
      </div>
    );

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input name="name" required maxLength={100} defaultValue={v.name} className="input mt-1" autoComplete="name" />
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required defaultValue={v.email} className="input mt-1" autoComplete="email" />
        </label>
      </div>
      <label className="block text-sm">
        Subject
        <select name="subject" defaultValue={v.subject || "job"} className="input mt-1">
          <option value="job">Job Opportunity</option>
          <option value="freelance">Freelance Project</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required minLength={10} maxLength={2000} rows={6} defaultValue={v.message} className="input mt-1" />
      </label>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={SITE_KEY} />
        </>
      )}
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      <button className="btn" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
