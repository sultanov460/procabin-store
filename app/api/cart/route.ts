import { NextRequest, NextResponse } from "next/server";
import { createCart, addCartLine, updateCartLine, removeCartLine, getCart } from "@/lib/data";

function validQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 99;
}

async function readJson<T>(req: NextRequest): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ error: "cartId is required" }, { status: 400 });

  try {
    const cart = await getCart(cartId);
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json({ error: "Unable to restore cart" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const body = await readJson<{ cartId?: string; variantId?: string; quantity?: number }>(req);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { cartId, variantId, quantity = 1 } = body;
  if (!variantId) return NextResponse.json({ error: "variantId is required" }, { status: 400 });
  if (!validQuantity(quantity)) return NextResponse.json({ error: "Quantity must be between 1 and 99" }, { status: 400 });

  try {
    if (cartId) {
      try {
        return NextResponse.json(await addCartLine(cartId, variantId, quantity));
      } catch (addError) {
        // Only replace a genuinely stale cart. Inventory, quantity, and
        // other Shopify errors must surface without discarding the buyer's
        // existing cart or silently changing Buy Now semantics.
        let existingCart;
        try {
          existingCart = await getCart(cartId);
        } catch {
          throw addError;
        }
        if (existingCart) throw addError;
      }
    }
    return NextResponse.json(await createCart(variantId, quantity));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unable to add to cart" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await readJson<{ cartId?: string; lineId?: string; quantity?: number }>(req);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  const { cartId, lineId, quantity } = body;
  if (!cartId || !lineId) return NextResponse.json({ error: "cartId and lineId are required" }, { status: 400 });
  if (!validQuantity(quantity)) return NextResponse.json({ error: "Quantity must be between 1 and 99" }, { status: 400 });

  try {
    return NextResponse.json(await updateCartLine(cartId, lineId, quantity));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unable to update cart" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await readJson<{ cartId?: string; lineId?: string }>(req);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  const { cartId, lineId } = body;
  if (!cartId || !lineId) return NextResponse.json({ error: "cartId and lineId are required" }, { status: 400 });

  try {
    return NextResponse.json(await removeCartLine(cartId, lineId));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unable to update cart" }, { status: 400 });
  }
}
