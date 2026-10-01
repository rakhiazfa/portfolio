import { sessionDb } from "@/lib/supabase";
import type { Experience } from "@/lib/data";
import { EMPLOYMENT } from "@/lib/format";
import { deleteExperience, saveExperience } from "../../actions";
import { BiField, DeleteButton, Field, Select } from "@/components/admin";

function ExperienceForm({ e }: { e?: Experience }) {
  return (
    <form action={saveExperience} className="space-y-4">
      {e && <input type="hidden" name="id" value={e.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" defaultValue={e?.company} required />
        <Field label="Role" name="role" defaultValue={e?.role} required />
        <Select label="Type" name="employment_type" defaultValue={e?.employment_type} options={EMPLOYMENT} />
        <Field label="Location" name="location" defaultValue={e?.location ?? ""} />
        <Field label="Start" name="start_date" type="date" defaultValue={e?.start_date} required />
        <Field label="End (empty = present)" name="end_date" type="date" defaultValue={e?.end_date ?? ""} />
        <Field label="Order" name="display_order" type="number" defaultValue={e?.display_order ?? 0} />
      </div>
      <BiField label="Responsibilities" name="description" value={e?.description} rows={3} />
      <button className="btn">Save</button>
    </form>
  );
}

export default async function Experiences() {
  const db = await sessionDb();
  const { data } = await db.from("experiences").select("*").order("display_order");
  const rows = (data ?? []) as Experience[];

  return (
    <>
      <h1 className="text-2xl font-semibold">Experience</h1>
      <ul className="mt-6 space-y-3">
        {rows.map((e) => (
          <li key={e.id} className="rounded-xl border border-line bg-card p-4">
            <details>
              <summary className="cursor-pointer">
                <span className="font-medium">{e.company}</span> <span className="text-muted">· {e.role}</span>
              </summary>
              <div className="mt-4 space-y-4">
                <ExperienceForm e={e} />
                <DeleteButton action={deleteExperience} fields={{ id: e.id }} />
              </div>
            </details>
          </li>
        ))}
      </ul>
      <details className="mt-6 rounded-xl border border-dashed border-line p-4">
        <summary className="cursor-pointer text-accent">+ Add experience</summary>
        <div className="mt-4"><ExperienceForm /></div>
      </details>
    </>
  );
}
