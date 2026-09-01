import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function ShippingInfoSection() {
  return (
    <section className="border-y border-line bg-mist/55 py-16 text-cabin md:py-20">
      <MotionReveal className="container-page grid gap-9 md:grid-cols-[1.15fr_1fr_1fr] md:gap-12">
        <div>
          <p className="eyebrow">Shipping &amp; support</p>
          <p className="mt-3 max-w-xs font-display text-2xl font-semibold tracking-[-0.035em]">Clear information before you order.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-graphite-soft">Delivery estimates</p>
          <p className="mt-3 text-lg font-medium">Shown by product</p>
          <p className="mt-2 text-sm leading-6 text-graphite-soft">Final shipping options are confirmed at checkout.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-graphite-soft">Order updates</p>
          <p className="mt-3 text-lg font-medium">Tracking when available</p>
          <p className="mt-2 text-sm leading-6 text-graphite-soft">Updates are sent by email after shipment.</p>
        </div>
      </MotionReveal>
    </section>
  );
}
