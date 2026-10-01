import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default async function ContactPage() {
  const s = await getSettings();
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-2 mb-8 text-muted">Have a job opportunity or a project? Send a message and I’ll get back to you soon.</p>
        <ContactForm />
      </section>
      <aside className="space-y-3">
        <h2 className="text-sm font-medium text-muted">Other channels</h2>
        {s.whatsapp && (
          <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn w-full justify-center">
            WhatsApp
          </a>
        )}
        {s.email && <a href={`mailto:${s.email}`} className="btn-ghost w-full justify-center">{s.email}</a>}
        {s.linkedin_url && (
          <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-center">
            LinkedIn
          </a>
        )}
      </aside>
    </div>
  );
}
