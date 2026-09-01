import type { Metadata } from "next";
import Link from "next/link";
import { getSupportEmail } from "@/content/support-config";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ProCabin about products, orders, shipping, or customer support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const supportEmail = getSupportEmail();

  return (
    <div className="container-page py-12 sm:py-16 md:py-20">
      <div className="grid overflow-hidden rounded-[22px] border border-line/80 bg-white/45 shadow-soft lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)]">
      <div className="relative overflow-hidden bg-cabin p-7 text-ivory sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -left-24 bottom-[-8rem] h-64 w-64 rounded-full bg-plum/20 blur-[80px]" aria-hidden="true" />
        <p className="eyebrow text-plum-light">Customer care</p>
        <h1 className="relative mt-3 text-4xl text-ivory sm:text-5xl">How can we help?</h1>
        <p className="relative mt-5 max-w-md text-sm leading-7 text-ivory/70">
          Ask about a product, compatibility, delivery or an existing order. We&apos;ll reply by email.
        </p>
        <div className="mt-8 space-y-4 border-t border-white/10 pt-7 text-sm text-ivory/70">
          {supportEmail && (
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-lavender/60">Support</span>
              <a href={`mailto:${supportEmail}`} className="mt-1 inline-block font-medium text-ivory underline decoration-white/35 underline-offset-4 hover:decoration-white">
                {supportEmail}
              </a>
            </p>
          )}
          <p>
            Have a quick question?{" "}
            <Link href="/#faq" className="font-medium text-ivory underline underline-offset-4">
              Check our FAQ
            </Link>
          </p>
          <p>Or use the form and we&apos;ll get back to you by email.</p>
        </div>
      </div>

      <div className="p-7 sm:p-10 lg:p-12">
        <ContactForm />
      </div>
      </div>
    </div>
  );
}
