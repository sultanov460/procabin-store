import { MotionReveal } from "@/components/ui/motion/MotionReveal";

const benefits = [
  { number: "01", title: "Practical automotive upgrades", body: "Useful additions selected around real driving needs and everyday functionality." },
  { number: "02", title: "Carefully selected accessories", body: "A focused range of driving technology, visibility tools and modern automotive gadgets." },
  { number: "03", title: "Secure Shopify checkout", body: "Cart and payment are completed through Shopify's hosted checkout experience." },
  { number: "04", title: "Straightforward delivery", body: "Available estimates are shown by product, with final shipping details confirmed at checkout." },
];

export function Benefits() {
  return (
    <section className="border-y border-line bg-white/30 py-16 md:py-20">
      <div className="container-page">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Why ProCabin</p>
          <h2 className="text-3xl md:text-4xl">Useful upgrades, clearly presented.</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <MotionReveal key={b.title} delayMs={i * 70} className="h-full bg-ivory p-6 lg:p-7">
            <p className="font-mono text-[11px] text-plum">{b.number}</p>
            <h3 className="mt-7 text-lg leading-snug">{b.title}</h3>
            <p className="mt-3 text-sm leading-6 text-graphite-soft">{b.body}</p>
          </MotionReveal>
        ))}
        </div>
      </div>
    </section>
  );
}
