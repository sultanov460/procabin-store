import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { MotionStagger } from "@/components/ui/motion/MotionStagger";
import { ParallaxMedia } from "@/components/ui/motion/ParallaxMedia";
import type { Product } from "@/lib/types/product";

export function Hero({ product }: { product: Product }) {
  return (
    <section className="relative isolate overflow-hidden bg-cabin text-ivory">
      <div
        className="ambient-orb pointer-events-none absolute -right-32 -top-48 h-[34rem] w-[34rem] rounded-full bg-plum/25 blur-[110px] sm:right-[-4rem] sm:h-[42rem] sm:w-[42rem]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(115deg,rgba(255,255,255,0.025),transparent_38%)]" aria-hidden="true" />

      <div className="container-page relative grid min-h-[650px] items-center gap-10 py-10 sm:py-12 md:min-h-[640px] md:grid-cols-[minmax(0,.92fr)_minmax(360px,1.08fr)] md:py-16 lg:gap-16 lg:py-20">
        <MotionStagger className="order-2 pb-3 md:order-1 md:pb-0" staggerMs={90}>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-lavender">
            Smart automotive accessories
          </p>
          <h1 className="max-w-[10ch] text-[3rem] leading-[0.94] tracking-[-0.06em] text-ivory min-[390px]:text-[3.45rem] md:text-6xl lg:text-[4.7rem]">
            Upgrade your drive.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[15px] leading-7 text-lavender/85 sm:text-base">
            Curated automotive accessories that add smarter functionality, useful technology and a more modern driving experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center">
            <Link href="/collections/all" className="btn min-h-12 bg-ivory text-cabin hover:bg-white">
              Shop Accessories
            </Link>
            <Link href="#featured-products" className="btn min-h-12 border border-white/20 bg-white/5 text-ivory hover:border-white/40 hover:bg-white/10">
              Explore ProCabin
            </Link>
          </div>
        </MotionStagger>

        <div className="order-1 md:order-2">
          <ParallaxMedia travel={34} mobileTravel={8} scaleRange={0.012}>
            <div className="relative mx-auto max-w-[520px] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-1.5 shadow-cabin sm:p-2">
              <ProductImage
                src={product.images[0]}
                alt={product.title}
                aspectClassName="aspect-square"
                fit={product.isMock ? "cover" : "contain"}
                sizes="(max-width: 767px) 92vw, 52vw"
                priority
                padding={product.isMock ? "none" : "compact"}
                className="rounded-[22px] bg-graphite"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[14px] border border-white/10 bg-cabin/88 px-4 py-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lavender/75">Current highlight</p>
                <p className="mt-1 line-clamp-1 text-sm font-medium text-ivory">{product.title}</p>
              </div>
            </div>
          </ParallaxMedia>
        </div>
      </div>
    </section>
  );
}
