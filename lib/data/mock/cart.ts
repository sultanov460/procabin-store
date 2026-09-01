// MOCK CART — in-memory, dev-only implementation matching the same
// function signatures as lib/data/shopify/cart.ts, so components never
// know which one they're talking to. Not persisted across server
// restarts; Phase 2 replaces this with the real Shopify-backed cart.

import type { Cart, CartLine } from "@/lib/types/cart";
import { mockProducts } from "./products";

const carts = new Map<string, Cart>();

function validateMockPurchase(variantId: string, quantity: number) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new Error("Quantity must be a whole number between 1 and 99.");
  }
  const found = findVariant(variantId);
  if (!found) throw new Error(`Invalid variant id: ${variantId}`);
  if (!found.variant.available) throw new Error("This variant is out of stock.");
  if (found.variant.quantityAvailable !== undefined && quantity > found.variant.quantityAvailable) {
    throw new Error("The requested quantity is not available.");
  }
  return found;
}

function findVariant(variantId: string) {
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

function recalcSubtotal(cart: Cart): Cart {
  const amount = cart.lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0);
  return { ...cart, subtotal: { amount, currencyCode: "USD" } };
}

export async function createCart(variantId: string, quantity = 1): Promise<Cart> {
  const found = validateMockPurchase(variantId, quantity);

  const id = `mock-cart-${Date.now()}`;
  const lines: CartLine[] =
    quantity > 0
      ? [
          {
            id: `line-${variantId}`,
            variantId,
            productHandle: found.product.handle,
            title: found.product.title,
            variantTitle: found.variant.title,
            price: found.variant.price,
            image: found.product.images[0],
            quantity,
          },
        ]
      : [];

  const cart = recalcSubtotal({ id, lines, subtotal: { amount: 0, currencyCode: "USD" }, checkoutUrl: "#" });
  carts.set(id, cart);
  return cart;
}

export async function addCartLine(cartId: string, variantId: string, quantity = 1): Promise<Cart> {
  const found = validateMockPurchase(variantId, quantity);

  const cart = carts.get(cartId);
  if (!cart) throw new Error("Cart not found");

  const existing = cart.lines.find((l) => l.variantId === variantId);
  if (existing && existing.quantity + quantity > 99) throw new Error("Cart quantity cannot exceed 99.");
  const lines = existing
    ? cart.lines.map((l) => (l.variantId === variantId ? { ...l, quantity: l.quantity + quantity } : l))
    : [
        ...cart.lines,
        {
          id: `line-${variantId}`,
          variantId,
          productHandle: found.product.handle,
          title: found.product.title,
          variantTitle: found.variant.title,
          price: found.variant.price,
          image: found.product.images[0],
          quantity,
        },
      ];

  const updated = recalcSubtotal({ ...cart, lines });
  carts.set(cart.id, updated);
  return updated;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const cart = carts.get(cartId);
  if (!cart) throw new Error("Cart not found");
  const lines = cart.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)).filter((l) => l.quantity > 0);
  const updated = recalcSubtotal({ ...cart, lines });
  carts.set(cart.id, updated);
  return updated;
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const cart = carts.get(cartId);
  if (!cart) throw new Error("Cart not found");
  const updated = recalcSubtotal({ ...cart, lines: cart.lines.filter((l) => l.id !== lineId) });
  carts.set(cart.id, updated);
  return updated;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  return carts.get(cartId);
}
