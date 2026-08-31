import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { shippingConfig } from "@/content/shipping-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "Where we ship, product-specific delivery estimates, and how order tracking works.",
};

export default function ShippingPage() {
  const us = shippingConfig.US;

  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-4xl">Shipping & Delivery</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg text-ink">Where we ship</h2>
          <p>Our current storefront is configured primarily for delivery to addresses within the United States.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">{us.label}</h2>
          <p>
            The Velora storefront is configured to present free standard shipping for eligible US orders. The final
            shipping option shown in Shopify checkout is the source of truth for each order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Processing & delivery estimates</h2>
          <p>
            Processing and transit times vary by product, warehouse, and shipping method. When a supplier-confirmed
            estimate is available for a product, we show it directly on that product page. Estimates are not
            guaranteed delivery dates and may change because of carrier or fulfillment conditions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Tracking</h2>
          <p>
            When the selected fulfillment and shipping service provides tracking, the tracking details are shared
            after shipment. Some services may provide different levels of tracking detail.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Order fulfillment</h2>
          <p>
            We may use third-party fulfillment and shipping partners to prepare and deliver orders. The specific
            warehouse or shipping route can vary by product and inventory availability.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Customs, duties & import charges</h2>
          <p>
            Depending on where a product is fulfilled from and the applicable rules at the time of shipment, taxes,
            duties, customs charges, or other import-related amounts may apply. Where Shopify checkout collects an
            applicable amount, it will be reflected there. We do not promise that every shipment is duty-free.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Incorrect addresses</h2>
          <p>
            Please double-check your shipping address at checkout. If you notice an error after placing an order,
            contact us as soon as possible. Once fulfillment has begun, an address change may no longer be possible.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Lost or damaged packages</h2>
          <p>
            If an order appears lost in transit or arrives damaged, contact us with your order number and relevant
            details so we can investigate with the carrier and fulfillment partner and determine the appropriate
            resolution.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Delays</h2>
          <p>
            Carrier disruptions, demand, customs processing, weather, and other events outside our control can affect
            delivery. If an order is significantly delayed, contact us and we&apos;ll help review the available tracking
            and fulfillment information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Contact</h2>
          <p>
            {siteConfig.supportEmail ? (
              <>
                Questions about shipping can be sent to{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-forest underline">
                  {siteConfig.supportEmail}
                </a>
                .
              </>
            ) : (
              <>
                Questions about shipping can be sent through our{" "}
                <a href="/contact" className="font-medium text-forest underline">Contact page</a>.
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
