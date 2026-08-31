import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and website operator information for Velora.",
};

export default function LegalNoticePage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-4xl">Legal Notice</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg text-ink">Website operator</h2>
          <p>
            This website is operated by {siteConfig.brandName}. Formal business registration details for{" "}
            {siteConfig.brandName} will be published on this page once finalized.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Contact</h2>
          <p>
            {siteConfig.supportEmail ? (
              <>
                For legal inquiries, please contact{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                  {siteConfig.supportEmail}
                </a>
                .
              </>
            ) : (
              <>
                For legal inquiries, please reach out through our{" "}
                <a href="/contact" className="font-medium text-forest underline">Contact page</a>.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Related policies</h2>
          <p>
            See our <a href="/terms" className="font-medium text-forest underline">Terms & Conditions</a> and{" "}
            <a href="/privacy" className="font-medium text-forest underline">Privacy Policy</a> for the terms
            governing use of this site and how we handle your personal information.
          </p>
        </section>
      </div>
    </div>
  );
}
