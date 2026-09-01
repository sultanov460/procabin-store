import Link from "next/link";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import type { Product } from "@/lib/types/product";

export function FinalCta({ product }: { product: Product }) {
  return (
    <section className="container-page py-16 md:py-24">
      <MotionReveal className="relative overflow-hidden rounded-[26px] bg-cabin px-5 py-14 text-center text-ivory shadow-cabin sm:px-10 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-full h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-plum/25 blur-[90px]" aria-hidden="true" />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-lavender">Explore ProCabin</p>
        <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl leading-tight text-ivory md:text-5xl">Bring smarter function to every drive.</h2>
        <p className="relative mx-auto mt-5 max-w-lg text-sm leading-7 text-lavender/80">Discover useful automotive technology, lighting and practical accessories for the road ahead.</p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 min-[390px]:flex-row">
          <Link href="/collections/all" className="btn bg-ivory text-cabin hover:bg-white">
            Shop Accessories
          </Link>
          <Link href={`/products/${product.handle}`} className="btn border border-white/20 bg-white/5 text-ivory hover:bg-white/10">
            View featured product
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
}
