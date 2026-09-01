import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types/product";

export function ProductGrid({ products, emptyAction }: { products: Product[]; emptyAction?: React.ReactNode }) {
  if (products.length === 0) {
    return (
      <div className="rounded-card border border-line bg-white/30 px-5 py-16 text-center">
        <h2 className="text-xl">No accessories found</h2>
        <p className="mt-2 text-sm text-graphite-soft">Try adjusting the current filters or check back soon.</p>
        {emptyAction}
      </div>
    );
  }

  // With only one product, a full-width grid stretches a single card
  // across the whole row. On mobile that reads as an intentional,
  // centered feature card; on desktop it should still sit at the start
  // of the row like a normal ecommerce grid, not float in the middle of
  // a very wide section. Rendered as two CSS-toggled variants (rather
  // than a JS viewport check) so server and client markup stay
  // identical — no hydration risk, no window/document check.
  // Automatically reverts to the normal grid below once a second
  // product exists.
  if (products.length === 1) {
    return (
      <>
        <div className="flex justify-center md:hidden">
          <div className="w-[min(100%,390px)]">
            <ProductCard product={products[0]} />
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard product={products[0]} />
        </div>
      </>
    );
  }

  if (products.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-[780px] lg:gap-7">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  if (products.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 md:gap-x-6 lg:max-w-[930px] lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-11">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
