import Link from "next/link";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { MotionStagger } from "@/components/ui/motion/MotionStagger";
import { ParallaxMedia } from "@/components/ui/motion/ParallaxMedia";
import type { Product } from "@/lib/types/product";

export function Hero({ product }: { product: Product }) {
  return (
    <section className="container-page grid items-center gap-10 py-10 md:grid-cols-2 md:py-20">
      <MotionStagger className="order-2 md:order-1" staggerMs={90}>
        <p className="eyebrow mb-4">{product.tagline}</p>
        <h1 className="text-4xl leading-[1.1] md:text-6xl">
          Smart kitchen essentials for a calmer, easier home.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href={`/products/${product.handle}`} className="btn-primary">
            Shop {product.title}
          </Link>
          <Link href="/about" className="btn-secondary">
            Our story
          </Link>
        </div>
      </MotionStagger>

      <div className="order-1 md:order-2">
        <ParallaxMedia travel={56} mobileTravel={18}>
          <ArchFrame src={product.images[0]} alt={product.title} className="aspect-[4/5] w-full" priority />
        </ParallaxMedia>
      </div>
    </section>
  );
}
