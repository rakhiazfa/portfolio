import type { Bi } from "@/lib/format";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Field({ label, className, ...rest }: FieldProps) {
  return (
    <label className={`block text-sm ${className ?? ""}`}>
      <span className="text-muted">{label}</span>
      <input className="input mt-1" {...rest} />
    </label>
  );
}

export function Check({ label, ...rest }: FieldProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}

export function Select({ label, options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: Record<string, string> }) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <select className="input mt-1" {...rest}>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </label>
  );
}

// Bilingual field: posts `${name}.id` and `${name}.en` (FR-ADM-10).
export function BiField({ label, name, value, rows }: { label: string; name: string; value?: Bi; rows?: number }) {
  const Tag = rows ? "textarea" : "input";
  return (
    <fieldset className="grid gap-2 text-sm sm:grid-cols-2">
      <legend className="mb-1 text-muted">{label}</legend>
      {(["id", "en"] as const).map((l) => (
        <label key={l} className="block">
          <span className="font-mono text-xs uppercase text-muted">{l}</span>
          <Tag name={`${name}.${l}`} defaultValue={value?.[l] ?? ""} rows={rows} className="input mt-1" />
        </label>
      ))}
    </fieldset>
  );
}

export function DeleteButton({ action, fields, label = "Delete" }: { action: (fd: FormData) => Promise<void>; fields: Record<string, string>; label?: string }) {
  return (
    <form action={action}>
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button className="text-sm text-red-600 hover:underline dark:text-red-400">{label}</button>
    </form>
  );
}
