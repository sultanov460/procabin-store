import Link from "next/link";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { Product } from "@/lib/types/product";

// Products always come through the shared Shopify/mock data boundary.
// No product handles or prices are duplicated in presentation code.
export function ProductDiscovery({
  products,
  title = "Featured accessories",
  subtitle = "Useful technology and modern accessories selected for the road ahead.",
}: {
  products: Product[];
  title?: string;
  subtitle?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section id="featured-products" className="container-page scroll-mt-24 py-16 md:py-20 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow mb-3">Selected for your drive</p>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-graphite-soft">{subtitle}</p>
        </div>
        <Link href="/collections/all" className="btn-secondary shrink-0">
          View all
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 4)} />
    </section>
  );
}
