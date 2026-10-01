"use client";
import { useState } from "react";
import type { Bi } from "@/lib/format";
import { Markdown } from "./markdown";

// Markdown textarea with live preview (FR-ADM-04), one per locale.
export function MarkdownEditor({ name, value }: { name: string; value?: Bi }) {
  const [locale, setLocale] = useState<"id" | "en">("en");
  const [text, setText] = useState({ id: value?.id ?? "", en: value?.en ?? "" });

  return (
    <div className="text-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-muted">Case study (Markdown, ```mermaid supported)</span>
        {(["id", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={locale === l}
            onClick={() => setLocale(l)}
            className={`rounded px-2 py-0.5 font-mono text-xs uppercase ${locale === l ? "bg-accent text-background" : "border border-line"}`}
          >
            {l}
          </button>
        ))}
      </div>
      {(["id", "en"] as const).map((l) => (
        <input key={l} type="hidden" name={`${name}.${l}`} value={text[l]} />
      ))}
      <div className="grid gap-4 lg:grid-cols-2">
        <textarea
          aria-label={`Content (${locale})`}
          value={text[locale]}
          onChange={(e) => setText({ ...text, [locale]: e.target.value })}
          rows={24}
          className="input font-mono text-xs"
        />
        <div className="prose max-h-[34rem] overflow-y-auto rounded-md border border-line p-4">
          <Markdown>{text[locale]}</Markdown>
        </div>
      </div>
    </div>
  );
}
