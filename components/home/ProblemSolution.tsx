import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function ProblemSolution({ product }: { product: { title: string; tagline?: string } }) {
  return (
    <section className="bg-sand/40 py-16">
      <div className="container-page grid gap-10 md:grid-cols-2">
        <MotionReveal>
          <p className="eyebrow mb-3">Everyday kitchen friction</p>
          <h2 className="text-2xl leading-snug">Useful tools should make cooking simpler, not add clutter.</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Velora focuses on practical kitchen essentials with functions that are easy to understand and easy to use.
          </p>
        </MotionReveal>
        <MotionReveal delayMs={100}>
          <p className="eyebrow mb-3">Featured essential</p>
          <h2 className="text-2xl leading-snug">{product.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {product.tagline || "See the product details, variants, delivery estimate, and how it fits into your everyday kitchen routine."}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
