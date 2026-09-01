import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { getSupportEmail } from "@/content/support-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and website operator information for ProCabin.",
  alternates: { canonical: "/legal-notice" },
};

export default function LegalNoticePage() {
  const supportEmail = getSupportEmail();

  return (
    <div className="policy-shell">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="text-4xl sm:text-5xl">Legal Notice</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="policy-content">
        <section>
          <h2 className="mb-2 text-lg text-ink">Website operator</h2>
          <p>
            This website is operated under the {siteConfig.brandName} name. Requests for formal operator
            information can be submitted through the contact method below.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Contact</h2>
          <p>
            {supportEmail ? (
              <>
                For legal inquiries, please contact{" "}
                <a href={`mailto:${supportEmail}`} className="font-medium text-forest underline">
                  {supportEmail}
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
