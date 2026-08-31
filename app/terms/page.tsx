import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of the Velora website and purchases made through it.",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-4xl">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg text-ink">Acceptance of terms</h2>
          <p>
            By accessing or using this website, you agree to be bound by these Terms & Conditions. If you do not
            agree to these terms, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Use of the website</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not infringe the rights
            of, restrict, or inhibit anyone else&apos;s use of the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Eligibility</h2>
          <p>
            You must be able to form a legally binding contract to place an order through this site. By placing an
            order, you represent that you meet this requirement.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Product information & availability</h2>
          <p>
            We try to display product details, including images, descriptions, and specifications, as accurately as
            possible. However, we do not warrant that product descriptions or other content are error-free.
            Products are subject to availability, and we reserve the right to limit quantities or discontinue any
            product at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Pricing & currency</h2>
          <p>
            Prices are displayed in the currency presented for the applicable Shopify market and checkout context. The US
            storefront is configured to use USD. Prices are subject to change without notice. We make reasonable
            efforts to ensure pricing is accurate, but errors may occur; if a product is listed at an incorrect
            price, we reserve the right to cancel any order placed at the incorrect price.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Orders & order acceptance</h2>
          <p>
            When you place an order, you are making an offer to purchase. We reserve the right to accept or decline
            any order, or limit the order quantity, for any reason, including suspected fraud or errors in pricing
            or product information. Order processing and checkout are handled securely through Shopify.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Payment</h2>
          <p>
            Payments are processed by Shopify and/or its payment service providers. We do not directly store your
            full payment card details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Cancellations</h2>
          <p>
            If you need to cancel or change an order, contact us as soon as possible. Once an order has been
            processed for shipment by our fulfillment partner, we may not be able to cancel or modify it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Shipping & delivery</h2>
          <p>
            See our <a href="/shipping" className="font-medium text-forest underline">Shipping & Delivery</a> page
            for current shipping destinations, estimates, and related terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Returns & refunds</h2>
          <p>
            See our <a href="/returns" className="font-medium text-forest underline">Returns & Refunds</a> page for
            our current policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Intellectual property</h2>
          <p>
            All content on this site — including text, graphics, logos, and images — is the property of{" "}
            {siteConfig.brandName} or its licensors and is protected by applicable intellectual property laws. You
            may not reproduce, distribute, or use this content without our prior written permission.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Prohibited use</h2>
          <p>
            You agree not to use the site to transmit unlawful, harmful, or fraudulent content, to attempt to gain
            unauthorized access to any part of the site or its systems, or to interfere with the site&apos;s normal
            operation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Website availability</h2>
          <p>
            We do not guarantee that the site will be available at all times or free of errors. We may suspend,
            withdraw, or restrict availability of all or part of the site for business or operational reasons.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Third-party services</h2>
          <p>
            This site relies on third-party services, including Shopify for ecommerce infrastructure and checkout,
            and a third-party fulfillment partner for order processing and shipping. We are not responsible for the
            availability or practices of third-party services beyond our reasonable control.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Disclaimers & limitation of liability</h2>
          <p>
            The site and its content are provided &quot;as is&quot; without warranties of any kind, to the fullest
            extent permitted by applicable law. To the fullest extent permitted by law, {siteConfig.brandName} will
            not be liable for any indirect, incidental, or consequential damages arising from your use of the site
            or purchase of products through it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Changes to these terms</h2>
          <p>
            We may update these Terms & Conditions from time to time. Changes take effect once posted on this page,
            with the &quot;Last updated&quot; date revised accordingly.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Applicable law</h2>
          <p>
            These terms are governed by the laws applicable to {siteConfig.brandName}&apos;s place of business,
            without regard to conflict-of-law principles, except where applicable consumer protection law in your
            jurisdiction provides otherwise.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Contact</h2>
          {siteConfig.supportEmail ? (
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          ) : (
            <p>
              Questions about these terms can be sent through our{" "}
              <a href="/contact" className="font-medium text-forest underline">Contact page</a>.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
