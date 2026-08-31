// Thin server-side wrapper around Shopify's Storefront GraphQL API.
// Uses the scoped Storefront token only; no Admin API credential is used.
import { SHOPIFY_API_VERSION } from "./config";

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
const domain = rawDomain?.replace(/^https?:\/\//i, "").replace(/\/$/, "");

export const isShopifyConfigured = Boolean(domain && token);

// Product/catalog data (products, collections) is public and safe to
// cache briefly through Next.js's Data Cache — this is what actually
// makes product and collection pages fast instead of round-tripping to
// Shopify on every request. Cart reads/mutations are per-session and
// must never be cached as if they were shared public data, so every
// cart.ts call explicitly opts out with "no-store". Reviews.ts stays on
// the "catalog" default since it, too, is public, non-personal data.
type ShopifyCacheStrategy = "catalog" | "no-store";

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  cacheStrategy: ShopifyCacheStrategy = "catalog"
): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN to enable live data."
    );
  }

  const res = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    ...(cacheStrategy === "no-store"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API request failed (${res.status}).`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message?: string }[] };
  if (json.errors?.length) {
    const message = json.errors.map((error) => error.message || "Unknown Shopify error").join(" ");
    throw new Error(`Shopify Storefront API error: ${message}`);
  }
  if (!json.data) throw new Error("Shopify Storefront API returned no data.");

  return json.data;
}
