import type { Metadata } from "next";
import { getSupportEmail } from "@/content/support-config";
import { shippingConfig } from "@/content/shipping-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "Where we ship, product-specific delivery estimates, and how order tracking works.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  const us = shippingConfig.US;
  const supportEmail = getSupportEmail();

  return (
    <div>
      <section className="page-intro">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Order information</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Shipping &amp; Delivery</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-graphite-soft">
            Product-specific estimates appear where confirmed. Shopify checkout shows the final shipping option for your order.
          </p>
          <p className="mt-3 text-xs text-graphite-soft">Last updated: {policiesConfig.lastUpdated}</p>
        </div>
      </section>

      <div className="container-page grid gap-4 py-12 text-sm leading-7 text-graphite-soft md:grid-cols-2 md:gap-5 md:py-16">
        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Where we ship</h2>
          <p>Our current storefront is configured primarily for delivery to addresses within the United States.</p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">{us.label}</h2>
          <p>
            The ProCabin storefront is configured to present free standard shipping for eligible US orders. The final
            shipping option shown in Shopify checkout is the source of truth for each order.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6 md:col-span-2 md:p-7">
          <h2 className="mb-3 text-xl text-cabin">Processing &amp; delivery estimates</h2>
          <p>
            Processing and transit times vary by product, fulfillment location, and shipping method. When a confirmed
            estimate is available for a product, we show it directly on that product page. Estimates are not
            guaranteed delivery dates and may change because of carrier or fulfillment conditions.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Tracking</h2>
          <p>
            When the selected fulfillment and shipping service provides tracking, the tracking details are shared
            after shipment. Some services may provide different levels of tracking detail.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Order fulfillment</h2>
          <p>
            We may use third-party fulfillment and shipping partners to prepare and deliver orders. The specific
            fulfillment location or shipping route can vary by product and inventory availability.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6 md:col-span-2 md:p-7">
          <h2 className="mb-3 text-xl text-cabin">Customs, duties &amp; import charges</h2>
          <p>
            Depending on where a product is fulfilled from and the applicable rules at the time of shipment, taxes,
            duties, customs charges, or other import-related amounts may apply. Where Shopify checkout collects an
            applicable amount, it will be reflected there. We do not promise that every shipment is duty-free.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Incorrect addresses</h2>
          <p>
            Please double-check your shipping address at checkout. If you notice an error after placing an order,
            contact us as soon as possible. Once fulfillment has begun, an address change may no longer be possible.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Lost or damaged packages</h2>
          <p>
            If an order appears lost in transit or arrives damaged, contact us with your order number and relevant
            details so we can investigate with the carrier and fulfillment partner and determine the appropriate
            resolution.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-white/45 p-6">
          <h2 className="mb-3 text-xl text-cabin">Delays</h2>
          <p>
            Carrier disruptions, demand, customs processing, weather, and other events outside our control can affect
            delivery. If an order is significantly delayed, contact us and we&apos;ll help review the available tracking
            and fulfillment information.
          </p>
        </section>

        <section className="rounded-card border border-line/80 bg-cabin p-6 text-ivory/70 shadow-lift">
          <h2 className="mb-3 text-xl text-ivory">Contact</h2>
          <p>
            {supportEmail ? (
              <>
                Questions about shipping can be sent to{" "}
                <a href={`mailto:${supportEmail}`} className="font-medium text-ivory underline underline-offset-4">
                  {supportEmail}
                </a>
                .
              </>
            ) : (
              <>
                Questions about shipping can be sent through our{" "}
                <a href="/contact" className="font-medium text-ivory underline underline-offset-4">Contact page</a>.
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
