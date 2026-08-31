import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function ShippingInfoSection() {
  return (
    <section className="bg-forest py-16 text-paper">
      <MotionReveal className="container-page grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/70">Shipping to United States</p>
          <p className="mt-3 font-display text-2xl">Free Standard Shipping</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/70">Delivery estimates</p>
          <p className="mt-3 font-display text-2xl">Shown by product</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/70">Order updates</p>
          <p className="mt-3 font-display text-2xl">Tracking when available</p>
        </div>
      </MotionReveal>
    </section>
  );
}
