import { Accordion } from "@/components/ui/Accordion";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function FaqSection({ items, title = "Frequently asked questions" }: { items: { question: string; answer: string }[]; title?: string }) {
  return (
    <section id="faq" className="container-page scroll-mt-24 py-16 md:py-24">
      <MotionReveal className="grid gap-8 lg:grid-cols-[minmax(240px,.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Good to know</p>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
        </div>
        <Accordion items={items} />
      </MotionReveal>
    </section>
  );
}
