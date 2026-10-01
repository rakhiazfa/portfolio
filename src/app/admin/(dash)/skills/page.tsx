import { sessionDb } from "@/lib/supabase";
import type { SkillCategory } from "@/lib/data";
import { t } from "@/lib/format";
import { deleteCategory, deleteSkill, saveCategory, saveSkill } from "../../actions";
import { BiField, Check, DeleteButton, Field } from "@/components/admin";

export default async function Skills() {
  const db = await sessionDb();
  const { data } = await db.from("skill_categories").select("*, skills(*)").order("display_order");
  const cats = (data ?? []) as SkillCategory[];
  cats.forEach((c) => c.skills.sort((a, b) => a.display_order - b.display_order));

  return (
    <>
      <h1 className="text-2xl font-semibold">Skills</h1>
      <p className="mt-1 text-sm text-muted">Skill ↔ project links are managed in the project form.</p>
      {cats.map((c) => (
        <section key={c.id} className="mt-6 rounded-xl border border-line bg-card p-4">
          <details>
            <summary className="cursor-pointer font-medium">{t(c.name)}</summary>
            <form action={saveCategory} className="mt-3 flex flex-wrap items-end gap-3">
              <input type="hidden" name="id" value={c.id} />
              <BiField label="Category name" name="name" value={c.name} />
              <Field label="Order" name="display_order" type="number" defaultValue={c.display_order} className="w-24" />
              <button className="btn">Save</button>
            </form>
            <div className="mt-2"><DeleteButton action={deleteCategory} fields={{ id: String(c.id) }} label="Delete category and its skills" /></div>
          </details>
          <ul className="mt-3 divide-y divide-line">
            {c.skills.map((s) => (
              <li key={s.id} className="flex flex-wrap items-end gap-3 py-2">
                <form action={saveSkill} className="flex flex-1 flex-wrap items-end gap-3">
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="category_id" value={c.id} />
                  <Field label="Name" name="name" defaultValue={s.name} required className="w-40" />
                  <Field label="Slug" name="slug" defaultValue={s.slug} className="w-36" />
                  <Field label="Order" name="display_order" type="number" defaultValue={s.display_order} className="w-20" />
                  <Check label="Learning" name="is_learning" defaultChecked={s.is_learning} />
                  <button className="btn-ghost !py-1.5">Save</button>
                </form>
                <DeleteButton action={deleteSkill} fields={{ id: String(s.id) }} />
              </li>
            ))}
          </ul>
          <form action={saveSkill} className="mt-3 flex flex-wrap items-end gap-3 border-t border-dashed border-line pt-3">
            <input type="hidden" name="category_id" value={c.id} />
            <Field label="New skill" name="name" required className="w-40" />
            <Field label="Order" name="display_order" type="number" defaultValue={c.skills.length + 1} className="w-20" />
            <Check label="Learning" name="is_learning" />
            <button className="btn !py-1.5">Add</button>
          </form>
        </section>
      ))}
      <form action={saveCategory} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-line p-4">
        <BiField label="New category" name="name" />
        <Field label="Order" name="display_order" type="number" defaultValue={cats.length + 1} className="w-24" />
        <button className="btn">Add category</button>
      </form>
    </>
  );
}
