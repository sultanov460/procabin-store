import Link from "next/link";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import type { Product } from "@/lib/types/product";

export function FinalCta({ product }: { product: Product }) {
  return (
    <section className="container-page py-20 text-center">
      <MotionReveal>
        <h2 className="mx-auto max-w-xl text-3xl md:text-4xl">Bring a little more calm to your kitchen.</h2>
        <div className="mt-8">
          <Link href={`/products/${product.handle}`} className="btn-primary">
            Shop {product.title}
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
}
