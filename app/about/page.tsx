import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <p className="eyebrow mb-4">Our story</p>
      <h1 className="text-4xl">About {siteConfig.brandName}</h1>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        We started {siteConfig.brandName} because we couldn&apos;t find everyday goods that felt as good to use as
        they looked. Replace this placeholder copy with your real brand story — how you got started, what you
        believe in, and why customers should trust you.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        We work with a small number of manufacturing partners and are upfront about how products reach you: most
        orders ship from our fulfillment partner and typically arrive within the window shown at checkout.
      </p>
    </div>
  );
}
