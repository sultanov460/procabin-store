// DEVELOPMENT-ONLY product data used when Shopify credentials are absent.
// Production automatically switches to Shopify through lib/data/index.ts.
import type { Product } from "@/lib/types/product";

export const mockProducts: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "velora-fold-fry-basket",
    title: "Velora Fold & Fry Basket",
    tagline: "Cook, lift, drain, and serve with one compact basket.",
    description: "A foldable stainless-steel kitchen basket used as a development placeholder until live Shopify data is configured.",
    benefits: ["Foldable design", "Stainless-steel construction", "Multi-purpose kitchen use"],
    images: ["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80"],
    price: { amount: 24.99, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{
      id: "gid://mock/Variant/1",
      title: "Default Title",
      price: { amount: 24.99, currencyCode: "USD" },
      available: true,
      selectedOptions: [{ name: "Title", value: "Default Title" }],
    }],
    specs: [{ label: "Material", value: "Stainless steel" }],
    shipping: { country: "US", minDays: 5, maxDays: 11, processingMinDays: 1, processingMaxDays: 3, origin: "International" },
    isMock: true,
  },
  {
    id: "gid://mock/Product/2",
    handle: "velora-kitchen-splash-guard",
    title: "Velora Kitchen Splash Guard",
    tagline: "A cleaner cooking area with less splatter.",
    description: "Development-only supporting product for testing multi-product layouts.",
    benefits: [],
    images: ["https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"],
    price: { amount: 29.99, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/2", title: "Default Title", price: { amount: 29.99, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [],
    isMock: true,
  },
  {
    id: "gid://mock/Product/3",
    handle: "velora-press-clean-brush",
    title: "Velora Press Clean Brush",
    tagline: "A practical tool for everyday kitchen cleanup.",
    description: "Development-only supporting product for testing multi-product layouts.",
    benefits: [],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"],
    price: { amount: 19.99, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/3", title: "Default Title", price: { amount: 19.99, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [],
    isMock: true,
  },
];

export async function getAllProducts(first = mockProducts.length): Promise<Product[]> {
  return mockProducts.slice(0, Math.max(0, first));
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  return mockProducts.find((product) => product.handle === handle);
}
