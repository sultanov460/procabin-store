import type { Metadata } from "next";
import { DM_Sans, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/content/site-config";
import { getSiteUrl } from "@/lib/utils/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: siteConfig.brandName, template: `%s | ${siteConfig.brandName}` },
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.brandName,
    description: siteConfig.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brandName,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[200] rounded-pill bg-cabin px-4 py-2 text-sm font-semibold text-ivory focus:not-sr-only"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
