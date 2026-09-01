import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how ProCabin curates useful automotive technology and practical accessories for everyday driving.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const focusAreas = [
    { title: "Driving technology", body: "Useful electronic accessories that add information or function where it matters." },
    { title: "Visibility & lighting", body: "Practical tools selected around clearer sight and changing conditions." },
    { title: "Everyday utility", body: "Modern automotive gadgets chosen for a clear, useful role on the road." },
  ];

  return (
    <div>
      <section className="page-intro">
        <div className="container-page py-14 md:py-20 lg:py-24">
          <p className="eyebrow mb-4">About {siteConfig.brandName}</p>
          <h1 className="max-w-[14ch] text-4xl leading-[1.03] sm:text-5xl md:text-6xl">Useful technology for the way you drive now.</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-graphite-soft">
            ProCabin curates automotive accessories that bring practical functionality, useful technology and modern upgrades into everyday driving.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-graphite-soft">
            We keep the experience focused: clear product information, visible availability, product-specific delivery details when available, and secure Shopify checkout.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,.68fr)_minmax(0,1.32fr)] lg:gap-16">
          <div>
            <p className="eyebrow">What we curate</p>
            <h2 className="mt-3 max-w-[13ch] text-3xl leading-tight">A focused range for the road ahead.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {focusAreas.map((area, index) => (
              <article key={area.title} className="rounded-card border border-line/80 bg-white/45 p-5 shadow-[0_18px_40px_-36px_rgba(20,18,24,.5)] sm:p-6">
                <p className="font-mono text-xs text-plum">0{index + 1}</p>
                <h3 className="mt-5 text-lg">{area.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite-soft">{area.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-[22px] bg-cabin px-6 py-9 text-ivory shadow-cabin sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="eyebrow text-plum-light">Our approach</p>
            <h2 className="mt-3 text-2xl text-ivory sm:text-3xl">Clear details before bold promises.</h2>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-7 text-ivory/65 lg:mt-0">
            We prioritize understandable product information, visible availability and product-specific delivery details when those estimates are available.
          </p>
        </div>
      </section>
    </div>
  );
}
