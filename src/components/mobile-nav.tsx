"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Native <details> menu; keyed on pathname so it closes after navigating.
export function MobileNav({ items }: { items: readonly (readonly [string, string])[] }) {
  const pathname = usePathname();
  return (
    <details key={pathname} className="group sm:hidden">
      <summary
        aria-label="Menu"
        className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-line [&::-webkit-details-marker]:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden size-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </summary>
      <ul className="absolute inset-x-0 top-full border-b border-line bg-background px-4 py-2">
        {items.map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className="block py-3 text-base text-muted hover:text-foreground aria-[current=page]:text-accent"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
