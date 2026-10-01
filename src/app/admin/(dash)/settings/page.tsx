import { sessionDb } from "@/lib/supabase";
import type { Settings } from "@/lib/data";
import { AVAILABILITY, t } from "@/lib/format";
import { saveSettings } from "../../actions";
import { BiField, Field, Select } from "@/components/admin";

export default async function SettingsPage() {
  const db = await sessionDb();
  const { data } = await db.from("site_settings").select("*").eq("id", 1).single();
  const s = data as Settings;

  return (
    <form action={saveSettings} className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile & Settings</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="full_name" defaultValue={s.full_name} required />
        <Select label="Availability" name="availability" defaultValue={s.availability} options={AVAILABILITY} />
        <Field label="Location" name="location" defaultValue={s.location ?? ""} />
        <Field label="Email" name="email" type="email" defaultValue={s.email ?? ""} />
        <Field label="Phone" name="phone" defaultValue={s.phone ?? ""} />
        <Field label="WhatsApp (62… format)" name="whatsapp" defaultValue={s.whatsapp ?? ""} pattern="[0-9]+" />
        <Field label="LinkedIn URL" name="linkedin_url" type="url" defaultValue={s.linkedin_url ?? ""} />
        <Field label="GitHub URL" name="github_url" type="url" defaultValue={s.github_url ?? ""} />
      </div>
      <BiField label="Headline" name="headline" value={s.headline} />
      <BiField label="Summary (hero)" name="summary" value={s.summary} rows={3} />
      <BiField label="About (Markdown)" name="about" value={s.about} rows={10} />
      <label className="block text-sm">
        <span className="text-muted">Highlights — one per line: <code>value | ID label | EN label</code></span>
        <textarea
          name="highlights"
          rows={5}
          className="input mt-1 font-mono text-xs"
          defaultValue={s.highlights.map((h) => [h.value, t(h.label), h.label.en].join(" | ")).join("\n")}
        />
      </label>
      <Field label="Profile photo (jpg/png/webp/svg, max 4 MB)" name="avatar" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" />
      <button className="btn">Save</button>
    </form>
  );
}
