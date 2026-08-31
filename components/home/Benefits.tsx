import { MotionReveal } from "@/components/ui/motion/MotionReveal";

const benefits = [
  { title: "Free standard shipping", body: "US orders use the shipping option shown at checkout, with no separate storefront shipping charge." },
  { title: "Secure checkout", body: "Checkout and payment are handled through our secure, encrypted checkout experience." },
  { title: "Clear customer care", body: "Shipping, returns, privacy, and contact information are easy to find before you order." },
];

export function Benefits() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 md:grid-cols-3">
        {benefits.map((b, i) => (
          <MotionReveal key={b.title} delayMs={i * 80}>
            <div className="mb-4 h-10 w-10 rounded-full border border-forest/30 bg-forest/5" aria-hidden="true" />
            <h3 className="text-lg">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
