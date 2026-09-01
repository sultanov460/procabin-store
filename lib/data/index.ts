// Single entry point the UI imports for all commerce data.
// Automatically uses Shopify once SHOPIFY_STORE_DOMAIN /
// SHOPIFY_STOREFRONT_ACCESS_TOKEN are set. Mock commerce is deliberately
// limited to local development; a production deployment with missing
// credentials returns an unavailable/empty catalog instead of presenting
// demonstration products as a real store.

import { isShopifyConfigured } from "@/lib/data/shopify/client";
import * as shopifyProducts from "@/lib/data/shopify/products";
import * as shopifyCart from "@/lib/data/shopify/cart";
import * as shopifyReviews from "@/lib/data/shopify/reviews";
import * as mockProductsApi from "@/lib/data/mock/products";
import * as mockCartApi from "@/lib/data/mock/cart";
import * as mockCollectionsApi from "@/lib/data/mock/collections";
import * as mockReviewsApi from "@/lib/data/mock/reviews";
import type { Product, Collection } from "@/lib/types/product";
import { PROCABIN_COLLECTION_HANDLE } from "@/lib/data/shopify/config";

export const usingLiveShopify = isShopifyConfigured;
export const usingDevelopmentMocks = !isShopifyConfigured && process.env.NODE_ENV !== "production";

const unavailableMessage =
  "Shopify commerce is unavailable. Configure SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.";

async function unavailableCartOperation(..._args: unknown[]): Promise<never> {
  throw new Error(unavailableMessage);
}

// ---- Products ----

export const getProductByHandle = isShopifyConfigured
  ? shopifyProducts.getProductByHandle
  : usingDevelopmentMocks
    ? mockProductsApi.getProductByHandle
    : async () => undefined;

export const getAllProducts = isShopifyConfigured
  ? shopifyProducts.getAllProducts
  : usingDevelopmentMocks
    ? mockProductsApi.getAllProducts
    : async () => [];

// Card-weight product list for grids — mock data is already tiny
// in-memory objects, so there's no separate lightweight mock source to
// switch to; only the live Shopify path benefits from the smaller query.
export const getAllProductCards = isShopifyConfigured
  ? shopifyProducts.getAllProductCards
  : usingDevelopmentMocks
    ? mockProductsApi.getAllProducts
    : async () => [];

// `/collections/all` remains the customer-friendly shop URL, but "all"
// means every product in the ProCabin collection — never every product in
// the shared Shopify shop. The real collection route is allowed too; all
// other Shopify collection handles are outside this storefront boundary.
export async function getCollectionByHandle(handle: string): Promise<Collection | undefined> {
  if (handle === "all") {
    const products = await getAllProductCards(250);
    return {
      id: "all-products",
      handle: "all",
      title: "All accessories",
      description: "Useful automotive technology and practical accessories for a smarter, more modern drive.",
      products,
    };
  }

  if (isShopifyConfigured) {
    if (handle !== PROCABIN_COLLECTION_HANDLE) return undefined;
    return shopifyProducts.getCollectionByHandle(PROCABIN_COLLECTION_HANDLE);
  }
  if (usingDevelopmentMocks) return mockCollectionsApi.getCollectionByHandle(handle);
  return undefined;
}

// Related products are derived generically from whichever product list
// the active data source returns — so this automatically uses real
// Shopify products once configured, without a separate Shopify-specific
// implementation to keep in sync. Uses the card-weight list since only
// ProductCard ever renders these.
export async function getRelatedProducts(excludeHandle: string, limit = 3): Promise<Product[]> {
  const all = await getAllProductCards(limit + 1);
  return all.filter((p) => p.handle !== excludeHandle).slice(0, limit);
}

// Sitemap-only: handle + real last-modified date where known. Mock mode
// has no real "updated" timestamp, so it's simply omitted (never
// fabricated) — see sitemap.ts for how a missing date is handled.
export const getAllProductHandles: () => Promise<{ handle: string; updatedAt?: string }[]> = isShopifyConfigured
  ? shopifyProducts.getAllProductHandles
  : usingDevelopmentMocks
    ? async () => mockProductsApi.mockProducts.map((p) => ({ handle: p.handle }))
    : async () => [];

// The homepage's hero/featured product is the first product in the
// ProCabin collection — no manually configured product handle to keep in
// sync. Reordering that collection updates the homepage automatically.
export async function getHeroProduct(): Promise<Product | undefined> {
  const all = await getAllProducts(1);
  return all[0];
}

// ---- Reviews ----
// Reviews remain empty until a legitimate provider is connected.
// Production never falls back to fabricated customer feedback.

export const getReviews = isShopifyConfigured
  ? shopifyReviews.getReviews
  : usingDevelopmentMocks
    ? mockReviewsApi.getReviews
    : async () => [];

// ---- Cart ----

export const createCart = isShopifyConfigured
  ? shopifyCart.createCart
  : usingDevelopmentMocks
    ? mockCartApi.createCart
    : unavailableCartOperation;
export const addCartLine = isShopifyConfigured
  ? shopifyCart.addCartLine
  : usingDevelopmentMocks
    ? mockCartApi.addCartLine
    : unavailableCartOperation;
export const updateCartLine = isShopifyConfigured
  ? shopifyCart.updateCartLine
  : usingDevelopmentMocks
    ? mockCartApi.updateCartLine
    : unavailableCartOperation;
export const removeCartLine = isShopifyConfigured
  ? shopifyCart.removeCartLine
  : usingDevelopmentMocks
    ? mockCartApi.removeCartLine
    : unavailableCartOperation;
export const getCart = isShopifyConfigured
  ? shopifyCart.getCart
  : usingDevelopmentMocks
    ? mockCartApi.getCart
    : unavailableCartOperation;
