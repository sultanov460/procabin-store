"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/utils/formatCurrency";
import { ProductImage } from "@/components/ui/ProductImage";

export default function CartPage() {
  const { cart, updateLine, removeLine, isLoading, isInitializing, error } = useCart();

  // While a previous-session cart is still being restored, show a
  // neutral placeholder rather than "Your cart is empty" — that message
  // is only true once we've actually checked.
  if (isInitializing) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto h-6 w-40 animate-pulse rounded-pill bg-sand/60" aria-hidden="true" />
        <span className="sr-only">Loading your cart…</span>
      </div>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow mb-3">Your order</p>
        <h1 className="text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-ink-soft">Explore the current collection and add an accessory when you&apos;re ready.</p>
        <Link href="/collections/all" className="btn-primary mt-6 inline-flex">
          Continue shopping
        </Link>
      </div>
    );
  }

  const checkoutAvailable = /^https:\/\//i.test(cart.checkoutUrl);

  return (
    <div className="container-page grid gap-10 py-10 md:grid-cols-[minmax(0,1fr)_330px] md:py-14 lg:gap-14">
      <div>
        <p className="eyebrow">Your order</p>
        <h1 className="mb-8 mt-2 text-3xl sm:text-4xl">Shopping cart</h1>
        {error && (
          <p role="alert" className="mb-4 rounded-card bg-clay/10 px-4 py-3 text-sm text-clay-dark">
            {error}
          </p>
        )}
        <ul className="divide-y divide-line/80 border-y border-line/80">
          {cart.lines.map((line) => (
            <li key={line.id} className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[88px_minmax(0,1fr)_auto]">
              <Link href={`/products/${line.productHandle}`} className="block self-start rounded-card focus-visible:ring-2 focus-visible:ring-plum">
                <ProductImage
                  src={line.image}
                  alt={line.title}
                  aspectClassName="aspect-square"
                  fit={line.image?.startsWith("/images/mock/") ? "cover" : "contain"}
                  padding={line.image?.startsWith("/images/mock/") ? "none" : "compact"}
                  className="h-[76px] w-[76px] shrink-0 border border-line bg-white/40 sm:h-[88px] sm:w-[88px]"
                  sizes="88px"
                />
              </Link>
              <div className="min-w-0">
                <Link href={`/products/${line.productHandle}`} className="font-medium text-ink transition-colors hover:text-plum-dark">
                  {line.title}
                </Link>
                {line.variantTitle !== "Default Title" && <p className="mt-1 text-xs text-ink-soft">Selected option: {line.variantTitle}</p>}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="inline-flex h-11 items-center rounded-pill border border-ink/20 bg-white/35">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={isLoading}
                      onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                      className="flex h-11 w-11 items-center justify-center text-base disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="w-7 text-center font-mono text-xs" aria-live="polite">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={isLoading || line.quantity >= 99}
                      onClick={() => updateLine(line.id, Math.min(99, line.quantity + 1))}
                      className="flex h-11 w-11 items-center justify-center text-base disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => removeLine(line.id)}
                    className="min-h-11 px-1 text-xs font-medium text-ink-soft underline underline-offset-4 hover:text-ink disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="col-start-2 font-mono text-sm font-medium sm:col-start-auto sm:row-start-1">
                {formatMoney({ amount: line.price.amount * line.quantity, currencyCode: line.price.currencyCode })}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="card h-fit p-6 md:sticky md:top-24 md:p-7">
        <h2 className="text-lg">Order summary</h2>
        <div className="mt-5 flex items-center justify-between text-sm text-ink-soft">
          <span>Subtotal</span>
          <span className="font-mono text-ink">{formatMoney(cart.subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-ink-soft">Shipping and taxes calculated at checkout.</p>
        <a
          href={cart.checkoutUrl}
          aria-disabled={!checkoutAvailable}
          tabIndex={checkoutAvailable ? undefined : -1}
          className={`btn-primary mt-6 w-full ${!checkoutAvailable ? "pointer-events-none opacity-50" : ""}`}
        >
          Checkout
        </a>
        {checkoutAvailable && (
          <p className="mt-3 text-center text-[11px] leading-5 text-ink-soft">Checkout continues securely with Shopify.</p>
        )}
        {!checkoutAvailable && (
          <p className="mt-2 text-center text-xs text-ink-soft">Checkout activates once Shopify is connected.</p>
        )}
      </aside>
    </div>
  );
}
