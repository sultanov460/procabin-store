import { ProductImage } from "@/components/ui/ProductImage";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function ProductDemo({ images, productTitle }: { images: string[]; productTitle: string }) {
  if (images.length === 0) return null;

  return (
    <section className="container-page py-16">
      <p className="eyebrow mb-6 text-center">How it works</p>
      <div className="grid gap-4 md:grid-cols-3">
        {images.slice(0, 3).map((src, i) => (
          <MotionReveal key={src} delayMs={i * 80}>
            <ProductImage
              src={src}
              alt={`${productTitle} in use, step ${i + 1}`}
              aspectClassName="aspect-[4/5]"
              fit="cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
