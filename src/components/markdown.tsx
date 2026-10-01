import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Mermaid } from "./mermaid";

// Works in both server and client components (admin live preview).
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        code({ className, children, ...rest }) {
          if (className?.includes("language-mermaid")) return <Mermaid chart={String(children)} />;
          return <code className={className} {...rest}>{children}</code>;
        },
        pre({ children, node }) {
          const isMermaid = node?.children.some(
            (c) => c.type === "element" && String(c.properties?.className ?? "").includes("language-mermaid"),
          );
          return isMermaid ? <>{children}</> : <pre>{children}</pre>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
