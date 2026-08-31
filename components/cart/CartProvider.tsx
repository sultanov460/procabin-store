"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Cart } from "@/lib/types/cart";

type CartContextValue = {
  cart: Cart | null;
  isLoading: boolean;
  // True only during the initial, async attempt to restore a cart saved
  // in a previous session. Lets the UI distinguish "we don't know yet"
  // from "we checked and there's genuinely nothing" — see cart page.
  isInitializing: boolean;
  error: string | null;
  addToCart: (variantId: string, quantity?: number) => Promise<Cart | null>;
  removeLine: (lineId: string) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_ID_KEY = "cartId";

async function parseJsonSafely(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = getCookie(CART_ID_KEY);
    if (!cartId) {
      setIsInitializing(false);
      return;
    }
    fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setCart(data))
      .catch(() => {
        // Best-effort restore only; a failure here just means the cart
        // starts empty, which is a safe fallback.
      })
      .finally(() => setIsInitializing(false));
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const cartId = getCookie(CART_ID_KEY);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, variantId, quantity }),
      });
      const data = await parseJsonSafely(res);
      if (!res.ok) {
        setError(data?.error ?? "Unable to add item to cart. Please try again.");
        return null;
      }
      setCookie(CART_ID_KEY, data.id);
      setCart(data);
      return data as Cart;
    } catch {
      setError("Unable to reach the cart right now. Please check your connection and try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId }),
        });
        const data = await parseJsonSafely(res);
        if (!res.ok) {
          setError(data?.error ?? "Unable to update cart. Please try again.");
          return;
        }
        setCart(data);
      } catch {
        setError("Unable to reach the cart right now. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId, quantity }),
        });
        const data = await parseJsonSafely(res);
        if (!res.ok) {
          setError(data?.error ?? "Unable to update cart. Please try again.");
          return;
        }
        setCart(data);
      } catch {
        setError("Unable to reach the cart right now. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, isLoading, isInitializing, error, addToCart, removeLine, updateLine }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}`;
}
