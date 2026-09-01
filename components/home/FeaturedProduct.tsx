import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import { ParallaxMedia } from "@/components/ui/motion/ParallaxMedia";
import type { Product } from "@/lib/types/product";

export function FeaturedProduct({ product }: { product: Product }) {
  return (
    <section className="relative overflow-hidden bg-cabin py-16 text-ivory md:py-24">
      <div className="pointer-events-none absolute bottom-[-16rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-plum/15 blur-[100px]" aria-hidden="true" />
      <MotionReveal className="container-page relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:gap-16">
        <ParallaxMedia travel={22} mobileTravel={6} scaleRange={0.01}>
          <div className="rounded-[26px] border border-white/10 bg-graphite p-1.5 shadow-cabin sm:p-2">
            <ProductImage
              src={product.images[1] ?? product.images[0]}
              alt={product.title}
              aspectClassName="aspect-[5/4]"
              fit={product.isMock ? "cover" : "contain"}
              sizes="(max-width: 1023px) 100vw, 62vw"
              padding={product.isMock ? "none" : "compact"}
              className="rounded-[20px] bg-graphite"
            />
          </div>
        </ParallaxMedia>
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-lavender">Technology for the road</p>
          <h2 className="max-w-[15ch] text-3xl leading-tight text-ivory md:text-4xl">Modern function, chosen for the drive.</h2>
          <p className="mt-5 text-sm leading-7 text-lavender/80">
            Useful automotive accessories should make their purpose clear. {product.tagline || product.description}
          </p>
          <div className="mt-8 border-l border-plum-light/50 pl-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lavender/65">In focus</p>
            <p className="mt-2 text-lg font-medium text-ivory">{product.title}</p>
          </div>
          <Link href={`/products/${product.handle}`} className="btn mt-8 w-fit bg-ivory text-cabin hover:bg-white">
            Explore the product
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
}
