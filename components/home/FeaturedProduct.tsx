import Link from "next/link";
import { formatMoney } from "@/lib/utils/formatCurrency";
import { ProductImage } from "@/components/ui/ProductImage";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import { ParallaxMedia } from "@/components/ui/motion/ParallaxMedia";
import type { Product } from "@/lib/types/product";

export function FeaturedProduct({ product }: { product: Product }) {
  return (
    <section className="container-page py-16">
      <MotionReveal className="card grid gap-8 p-6 md:grid-cols-2 md:p-10">
        <ParallaxMedia travel={26} mobileTravel={10} scaleRange={0.015}>
          <ProductImage
            src={product.images[1] ?? product.images[0]}
            alt={product.title}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </ParallaxMedia>
        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-3">Featured</p>
          <h2 className="text-3xl">{product.title}</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">{product.tagline}</p>
          <ul className="mt-6 space-y-2">
            {product.benefits.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-mono text-xl">{formatMoney(product.price)}</span>
            <Link href={`/products/${product.handle}`} className="btn-primary">
              View product
            </Link>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
