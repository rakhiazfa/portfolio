import Link from "next/link";
import { sessionDb } from "@/lib/supabase";
import { deleteMessage, setMessageStatus } from "../../actions";
import { DeleteButton } from "@/components/admin";

const SUBJECT = { job: "Job Opportunity", freelance: "Freelance Project", other: "Other" } as const;
const TABS = ["new", "read", "archived"] as const;

type Msg = { id: string; name: string; email: string; subject: keyof typeof SUBJECT; message: string; status: string; created_at: string };

export default async function Messages({ searchParams }: PageProps<"/admin/messages">) {
  const raw = (await searchParams).status;
  const status = TABS.includes(raw as (typeof TABS)[number]) ? (raw as string) : "new";
  const db = await sessionDb();
  const { data } = await db.from("contact_messages").select("*").eq("status", status).order("created_at", { ascending: false });
  const messages = (data ?? []) as Msg[];

  return (
    <>
      <h1 className="text-2xl font-semibold">Inbox</h1>
      <div className="mt-4 flex gap-2 text-sm">
        {TABS.map((s) => (
          <Link key={s} href={`?status=${s}`} className={s === status ? "btn !py-1" : "btn-ghost !py-1"}>{s}</Link>
        ))}
      </div>
      {messages.length === 0 && <p className="mt-8 text-muted">No messages.</p>}
      <ul className="mt-6 space-y-4">
        {messages.map((m) => (
          <li key={m.id} className="rounded-xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium">
                {m.name} · <a href={`mailto:${m.email}?subject=Re: ${SUBJECT[m.subject]}`} className="text-accent">{m.email}</a>
              </p>
              <p className="text-xs text-muted">{new Date(m.created_at).toLocaleString("en-US")}</p>
            </div>
            <p className="mt-1 text-xs font-mono text-muted">{SUBJECT[m.subject]}</p>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {TABS.filter((s) => s !== m.status).map((s) => (
                <form key={s} action={setMessageStatus}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="status" value={s} />
                  <button className="text-sm text-accent hover:underline">Mark as {s}</button>
                </form>
              ))}
              <DeleteButton action={deleteMessage} fields={{ id: m.id }} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
