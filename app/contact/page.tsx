import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container-page grid max-w-4xl gap-10 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-3xl">Get in touch</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Questions about an order, a product, or anything else — we&apos;re happy to help.
        </p>
        <div className="mt-6 space-y-2 text-sm">
          {siteConfig.supportEmail && (
            <p>
              Email:{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                {siteConfig.supportEmail}
              </a>
            </p>
          )}
          <p>
            Have a quick question?{" "}
            <Link href="/#faq" className="font-medium text-forest underline">
              Check our FAQ
            </Link>
          </p>
          <p className="text-ink-soft">Or use the form and we&apos;ll get back to you by email.</p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
