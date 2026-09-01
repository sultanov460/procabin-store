import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { TruckIcon } from "@/components/ui/icons";
import { getValidDeliveryRange } from "@/lib/utils/shipping";
import type { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: Product }) {
  const delivery = getValidDeliveryRange(product.shipping);
  const available = product.variants.some((variant) => variant.available);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex h-full flex-col rounded-[22px] border border-line/80 bg-white/40 p-2 outline-none transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-[3px] hover:border-plum/20 hover:bg-white/65 hover:shadow-soft active:translate-y-0 active:scale-[0.995] focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-ivory motion-reduce:transform-none motion-reduce:transition-none sm:p-2.5"
    >
      <ProductImage
        src={product.images[0]}
        alt={product.title}
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 50vw, 25vw"
        aspectClassName="aspect-square"
        fit={product.isMock ? "cover" : "contain"}
        padding={product.isMock ? "none" : "compact"}
        className="rounded-[17px] bg-mist/65"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
      />

      <div className="flex min-w-0 flex-1 flex-col px-2 pb-2 pt-4 sm:px-2.5">
        <p title={product.title} className="line-clamp-2 min-h-11 text-[15px] font-semibold leading-[1.4] text-cabin transition-colors duration-200 group-hover:text-plum-dark">
          {product.title}
        </p>

        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="card"
          className="mt-2.5"
        />

        {delivery && (
          <p className="mt-auto flex items-center gap-2 border-t border-line/70 pt-3 text-xs leading-5 text-graphite-soft">
            <TruckIcon className="h-3.5 w-3.5 shrink-0 text-plum/75" />
            <span>
              Delivery: {delivery.minDays}–{delivery.maxDays} days
            </span>
          </p>
        )}
        {!available && (
          <p className={`${delivery ? "mt-2" : "mt-auto pt-3"} text-xs font-medium text-graphite-soft`}>Currently unavailable</p>
        )}
      </div>
    </Link>
  );
}
