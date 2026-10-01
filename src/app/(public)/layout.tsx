import Link from "next/link";
import { getSettings, t, SITE_URL } from "@/lib/data";
import { SocialLinks } from "@/components/ui";
import { MobileNav } from "@/components/mobile-nav";

const NAV = [
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const s = await getSettings();
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: s.full_name,
    jobTitle: t(s.headline),
    url: SITE_URL,
    email: s.email ? `mailto:${s.email}` : undefined,
    address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
    sameAs: [s.linkedin_url, s.github_url].filter(Boolean),
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 btn z-50">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center gap-x-5 px-4 py-3 text-sm">
          <Link href="/" className="mr-auto font-semibold">
            rakhiazfa<span className="text-accent">.dev</span>
          </Link>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="hidden text-muted hover:text-foreground sm:block">
              {label}
            </Link>
          ))}
          <a href="/cv" className="btn !px-3 !py-1.5">
            Download CV
          </a>
          <MobileNav items={NAV} />
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-16">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted">
          <p>© {new Date().getFullYear()} {s.full_name} · {s.location}</p>
          <SocialLinks s={s} />
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
