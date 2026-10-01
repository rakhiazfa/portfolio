import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/format";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rakhi Azfa Rifansya — Full-Stack Developer Bandung", template: "%s · Rakhi Azfa Rifansya" },
  description:
    "Portfolio and case studies of Rakhi Azfa Rifansya, a Bandung-based Full-Stack Developer: Laravel, NestJS, Spring Boot, Vue, Next.js, PostgreSQL.",
  openGraph: { type: "website", siteName: "Rakhi Azfa Rifansya", locale: "en_US" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
