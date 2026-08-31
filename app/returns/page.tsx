import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Our return eligibility, process, and refund policy.",
};

export default function ReturnsPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-4xl">Returns & Refunds</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg text-ink">Return window</h2>
          <p>
            You may request a return within {policiesConfig.returnWindowDays} days of the delivery date. Items must
            be unused, in their original condition, and in their original packaging where applicable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">How to request a return</h2>
          <p>
            {siteConfig.supportEmail ? (
              <>
                Contact us at{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                  {siteConfig.supportEmail}
                </a>
              </>
            ) : (
              <>
                Contact us through our <a href="/contact" className="font-medium text-forest underline">Contact page</a>
              </>
            )}{" "}
            with your order number and the reason for the return. We&apos;ll confirm eligibility and provide return
            instructions by email — please don&apos;t send items back before receiving these instructions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Damaged, defective, or incorrect items</h2>
          <p>
            If your item arrives damaged, defective, or different from what you ordered, contact us as soon as
            possible with your order number and photos of the item. We&apos;ll work with you and our fulfillment
            partner to arrange a replacement or refund.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Missing items</h2>
          <p>
            If part of your order is missing, contact us with your order number so we can look into it with our
            fulfillment partner and make it right.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Refund process & timing</h2>
          <p>
            Once your return is received and inspected, we&apos;ll notify you of the approval or rejection of your
            refund. Approved refunds are issued to your original payment method. Processing times can vary
            depending on your payment provider once a refund is issued on our end.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Shipping costs</h2>
          <p>
            Unless the return is due to our error (a damaged, defective, or incorrect item), return shipping costs
            are the responsibility of the customer. Original shipping charges, where applicable, are non-refundable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Non-returnable items</h2>
          <p>
            Items that have been used, are missing original packaging, or were marked as final sale at the time of
            purchase are not eligible for return.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">When a refund may be denied</h2>
          <p>
            We may decline a return or refund if the item shows signs of use or damage not present at delivery, if
            the request falls outside the return window above, or if the item is listed as non-returnable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Support</h2>
          <p>
            {siteConfig.supportEmail ? (
              <>
                We&apos;re happy to help with any return questions — reach us at{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                  {siteConfig.supportEmail}
                </a>
                .
              </>
            ) : (
              <>
                We&apos;re happy to help with any return questions — reach us through our{" "}
                <a href="/contact" className="font-medium text-forest underline">Contact page</a>.
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
