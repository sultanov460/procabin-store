import type { Money } from "./product";

export type CartLine = {
  id: string; // line item id
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: Money;
  image?: string;
  quantity: number;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  subtotal: Money;
  checkoutUrl: string; // Shopify-hosted checkout, or "#" in mock mode
};
