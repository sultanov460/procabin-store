import Link from "next/link";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { Product } from "@/lib/types/product";

// Sits right after the Hero so a new visitor understands within a few
// seconds that Velora is a multi-product store, not a single-product
// landing page — without crowding the hero itself. Products always come
// through the existing data layer (never hardcoded), and the count is
// deliberately small; the full catalog lives at /collections/all.
export function ProductDiscovery({
  products,
  title = "Kitchen essentials",
  subtitle = "Thoughtful tools for simpler everyday cooking.",
}: {
  products: Product[];
  title?: string;
  subtitle?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="container-page py-10 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-md text-sm text-ink-soft">{subtitle}</p>
        </div>
        <Link href="/collections/all" className="btn-secondary shrink-0">
          Shop all
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 4)} />
    </section>
  );
}
