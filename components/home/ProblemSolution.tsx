import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function ProblemSolution({ product }: { product: { title: string; tagline?: string } }) {
  const upgradeAreas = [
    "Helpful technology for the road",
    "Better visibility where it matters",
    "Accessories with everyday utility",
    "Modern additions for the cabin",
  ];

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <MotionReveal>
          <p className="eyebrow mb-3">Designed for the drive</p>
          <h2 className="max-w-md text-3xl leading-tight md:text-4xl">The right details can change the experience.</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-graphite-soft">
            ProCabin brings together useful technology and practical accessories that add function without making the drive feel complicated.
          </p>
        </MotionReveal>
        <MotionReveal delayMs={90} className="overflow-hidden rounded-card border border-line bg-white/45">
          <ul className="divide-y divide-line">
            {upgradeAreas.map((area, index) => (
              <li key={area} className="flex items-center gap-4 px-5 py-4 sm:px-7 sm:py-5">
                <span className="font-mono text-[11px] text-plum">0{index + 1}</span>
                <span className="text-sm font-medium text-cabin sm:text-base">{area}</span>
              </li>
            ))}
          </ul>
          <div className="bg-graphite px-5 py-5 text-ivory sm:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lavender/70">In the current collection</p>
            <p className="mt-2 text-sm leading-6 text-lavender">{product.tagline || `${product.title} is designed to make one part of the everyday drive work better.`}</p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
