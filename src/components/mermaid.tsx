"use client";
import { useEffect, useId, useState } from "react";

// Mermaid is ~heavy; it is only downloaded on pages that contain a diagram.
export function Mermaid({ chart }: { chart: string }) {
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>();

  useEffect(() => {
    let alive = true;
    import("mermaid").then(async ({ default: mermaid }) => {
      const dark = matchMedia("(prefers-color-scheme: dark)").matches;
      mermaid.initialize({ startOnLoad: false, theme: dark ? "dark" : "neutral", securityLevel: "strict" });
      try {
        const out = await mermaid.render(id, chart);
        if (alive) setSvg(out.svg);
      } catch {
        if (alive) setSvg(undefined);
      }
    });
    return () => {
      alive = false;
    };
  }, [chart, id]);

  return svg ? (
    <figure className="my-6 overflow-x-auto rounded-lg border border-line bg-card p-4" dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <pre aria-label="Diagram">{chart}</pre>
  );
}
