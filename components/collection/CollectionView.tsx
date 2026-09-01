"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/types/product";

type SortOption = "featured" | "price-asc" | "price-desc";

export function CollectionView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const visible = useMemo(() => {
    let list = products;
    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.available));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price.amount - b.price.amount);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price.amount - a.price.amount);
    return list;
  }, [products, sort, inStockOnly]);

  const hasActiveFilters = inStockOnly || sort !== "featured";

  return (
    <div>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-5 sm:mb-10">
        <div className="flex flex-wrap items-center gap-4">
          <p aria-live="polite" className="text-xs font-medium uppercase tracking-[0.12em] text-graphite-soft">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </p>
          <label className="flex min-h-10 cursor-pointer items-center gap-2 border-l border-line pl-4 text-sm text-graphite-soft">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-cabin/25 accent-plum"
          />
          In stock only
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-graphite-soft">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="min-h-10 rounded-pill border border-line bg-white/60 px-4 text-sm text-cabin outline-none transition-colors hover:border-plum/30 focus:border-plum"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      <ProductGrid
        products={visible}
        emptyAction={
          hasActiveFilters ? (
            <button
              type="button"
              className="btn-secondary mt-5"
              onClick={() => {
                setInStockOnly(false);
                setSort("featured");
              }}
            >
              Clear filters
            </button>
          ) : undefined
        }
      />
    </div>
  );
}
