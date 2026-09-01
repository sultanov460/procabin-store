"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils/formatCurrency";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { useCart } from "@/components/cart/CartProvider";
import { useVariantSelection } from "@/components/product/VariantSelectionProvider";
import type { Product, ProductVariant } from "@/lib/types/product";

const packOptions = [
  { quantity: 1, name: "SOLO", label: "1 item" },
  { quantity: 2, name: "DUO", label: "2 items" },
  { quantity: 3, name: "TRIO", label: "3 items" },
] as const;

type PackQuantity = (typeof packOptions)[number]["quantity"];

function findVariant(product: Product, selected: Record<string, string>): ProductVariant | undefined {
  return product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value));
}

function optionsFromVariant(variant: ProductVariant | undefined, product: Product) {
  if (variant) return Object.fromEntries(variant.selectedOptions.map((option) => [option.name, option.value]));
  return Object.fromEntries(product.options.map((option) => [option.name, option.values[0]]));
}

function isPlaceholderOption(name: string, values: string[]) {
  if (values.length !== 1) return false;
  const normalizedName = name.trim().toLowerCase();
  const normalizedValue = values[0]?.trim().toLowerCase();
  return (
    (normalizedName === "title" || normalizedName === "default" || normalizedName === "option") &&
    (normalizedValue === "default title" || normalizedValue === "default")
  );
}

export function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { cart, addToCart, isLoading, isInitializing, error } = useCart();
  const { setSelectedImage } = useVariantSelection();
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initialVariant = product.variants.find((candidate) => candidate.available) ?? product.variants[0];
    return optionsFromVariant(initialVariant, product);
  });
  const [packQuantity, setPackQuantity] = useState<PackQuantity>(1);
  // Buy Now runs its own async flow (add to cart, then navigate/redirect)
  // that can outlast the cart context's own isLoading flag — guard it
  // separately so a fast double-tap can't fire two checkout attempts.
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const purchasePendingRef = useRef(false);

  const variant = useMemo(() => findVariant(product, selected), [product, selected]);
  // Product-level price/compareAtPrice is only a fallback when there is
  // genuinely no resolved variant. Once a variant is resolved, its own
  // compareAtPrice is authoritative — including when it's null — so we
  // never accidentally pair one variant's price with another variant's
  // (or the product's) compare-at price.
  const price = variant ? variant.price : product.price;
  const compareAtCandidate = variant ? variant.compareAtPrice : product.compareAtPrice;
  const compareAt = compareAtCandidate && compareAtCandidate.amount > price.amount ? compareAtCandidate : undefined;
  const totalPrice = { ...price, amount: price.amount * packQuantity };
  const totalCompareAt = compareAt ? { ...compareAt, amount: compareAt.amount * packQuantity } : undefined;
  const hasRealOptions = product.options.some((option) => !isPlaceholderOption(option.name, option.values));
  const existingVariantQuantity =
    cart?.lines.reduce((sum, line) => sum + (line.variantId === variant?.id ? line.quantity : 0), 0) ?? 0;

  useEffect(() => {
    setSelectedImage(variant?.image);
  }, [setSelectedImage, variant?.image]);

  useEffect(() => {
    if (
      !variant?.available ||
      variant.quantityAvailable === undefined ||
      existingVariantQuantity + packQuantity <= variant.quantityAvailable
    ) {
      return;
    }
    const nextQuantity = [...packOptions]
      .reverse()
      .find((option) => existingVariantQuantity + option.quantity <= (variant.quantityAvailable as number))?.quantity;
    if (nextQuantity) setPackQuantity(nextQuantity);
  }, [existingVariantQuantity, packQuantity, variant]);

  function canPurchase(quantity: number) {
    if (!variant?.available) return false;
    return variant.quantityAvailable === undefined || existingVariantQuantity + quantity <= variant.quantityAvailable;
  }

  function selectOption(optionName: string, value: string) {
    const matchingCurrentSelection = product.variants.find(
      (candidate) =>
        candidate.available &&
        candidate.selectedOptions.every((option) =>
          option.name === optionName ? option.value === value : selected[option.name] === option.value
        )
    );
    const availableFallback = product.variants.find(
      (candidate) =>
        candidate.available &&
        candidate.selectedOptions.some((option) => option.name === optionName && option.value === value)
    );
    const nextVariant = matchingCurrentSelection ?? availableFallback;
    setSelected(nextVariant ? optionsFromVariant(nextVariant, product) : { ...selected, [optionName]: value });
  }

  async function handleAdd() {
    if (!variant || !canPurchase(packQuantity) || purchasePendingRef.current || isLoading || isInitializing) return;
    purchasePendingRef.current = true;
    try {
      await addToCart(variant.id, packQuantity);
    } finally {
      purchasePendingRef.current = false;
    }
  }

  async function handleBuyNow() {
    if (!variant || !canPurchase(packQuantity) || purchasePendingRef.current || isBuyingNow || isLoading || isInitializing) return;
    purchasePendingRef.current = true;
    setIsBuyingNow(true);
    try {
      const updatedCart = await addToCart(variant.id, packQuantity);
      if (!updatedCart) return;
      if (updatedCart.checkoutUrl && updatedCart.checkoutUrl !== "#") {
        window.location.assign(updatedCart.checkoutUrl);
        return;
      }
      router.push("/cart");
    } finally {
      purchasePendingRef.current = false;
      setIsBuyingNow(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <span className="rounded-pill border border-plum/15 bg-plum/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-plum-dark">
          ProCabin accessory
        </span>
        {variant?.available && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden="true" />
            In stock
          </span>
        )}
        {variant && !variant.available && <span className="text-xs font-medium text-clay-dark">Out of stock</span>}
      </div>

      <h1 className="max-w-[19ch] text-[2rem] leading-[1.06] tracking-[-0.035em] sm:text-[2.35rem] lg:text-[2.55rem]">
        {product.title}
      </h1>

      {product.tagline && (
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink-soft">{product.tagline}</p>
      )}

      <div aria-live="polite" className="mt-6 border-y border-line/80 py-5">
        <ProductPrice price={totalPrice} compareAtPrice={totalCompareAt} size="detail" />
        <p className="mt-1.5 text-xs text-ink-soft">Total for the selected pack</p>
      </div>

      {product.options
        .filter((option) => !isPlaceholderOption(option.name, option.values))
        .map((option) => (
          <div key={option.name} className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-ink">{option.name}</p>
              <span className="text-xs text-ink-soft">{selected[option.name]}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {option.values.map((value) => {
                const isActive = selected[option.name] === value;
                const available = product.variants.some(
                  (candidate) =>
                    candidate.available &&
                    candidate.selectedOptions.some((selectedOption) => selectedOption.name === option.name && selectedOption.value === value)
                );
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    disabled={!available}
                    onClick={() => selectOption(option.name, value)}
                    className={`min-h-11 rounded-pill border px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? "border-forest bg-forest text-paper shadow-lift"
                        : "border-ink/15 bg-white/50 text-ink hover:border-forest/50 hover:bg-white"
                    } ${!available ? "cursor-not-allowed opacity-35" : ""}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      <fieldset className={hasRealOptions ? "mt-7" : "mt-6"}>
        <legend className="text-sm font-semibold text-ink">Choose your pack</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
          {packOptions.map((option) => {
            const selectedPack = option.quantity === packQuantity;
            const enabled = canPurchase(option.quantity);
            const optionTotal = { ...price, amount: price.amount * option.quantity };

            return (
              <label
                key={option.name}
                className={`relative flex min-h-[108px] cursor-pointer flex-col justify-between rounded-[15px] border p-3 transition-[background-color,border-color,box-shadow] focus-within:ring-2 focus-within:ring-plum focus-within:ring-offset-2 focus-within:ring-offset-ivory sm:p-3.5 ${
                  selectedPack
                    ? "border-plum/70 bg-plum/[0.08] shadow-lift"
                    : "border-line bg-white/45 hover:border-plum/35 hover:bg-white/70"
                } ${!enabled ? "cursor-not-allowed opacity-40" : ""}`}
              >
                <input
                  type="radio"
                  name="pack-quantity"
                  value={option.quantity}
                  checked={selectedPack}
                  disabled={!enabled}
                  onChange={() => setPackQuantity(option.quantity)}
                  className="sr-only"
                />
                <span>
                  <span className="block font-mono text-[10px] font-medium tracking-[0.14em] text-plum">{option.name}</span>
                  <span className="mt-1.5 block text-xs text-ink-soft">{option.label}</span>
                </span>
                <span className="block font-mono text-xs font-semibold text-ink sm:text-sm">{formatMoney(optionTotal)}</span>
                {!enabled && <span className="sr-only">Unavailable for the selected variant</span>}
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="mt-4 rounded-card border border-clay/25 bg-clay/5 px-4 py-3 text-sm text-clay-dark">
          {error}
        </p>
      )}

      <div className="mt-7 hidden flex-col gap-3 sm:flex">
        <button
          type="button"
          disabled={!canPurchase(packQuantity) || isLoading || isInitializing || isBuyingNow}
          onClick={handleAdd}
          className="btn-primary min-h-12 w-full shadow-lift disabled:opacity-50"
        >
          {isLoading && !isBuyingNow ? "Adding…" : canPurchase(packQuantity) ? "Add to Cart" : "Unavailable"}
        </button>
        <button
          type="button"
          disabled={!canPurchase(packQuantity) || isLoading || isInitializing || isBuyingNow}
          onClick={handleBuyNow}
          className="btn-secondary min-h-12 w-full bg-white/40 disabled:opacity-50"
        >
          {isBuyingNow ? "Redirecting…" : "Buy Now"}
        </button>
      </div>

      <div className="mt-5 hidden grid-cols-3 gap-2 border-t border-line/80 pt-5 text-center sm:grid">
        <div>
          <p className="text-xs font-semibold text-ink">Secure checkout</p>
          <p className="mt-1 text-[11px] leading-4 text-ink-soft">Powered by Shopify</p>
        </div>
        <div className="border-x border-line px-2">
          <p className="text-xs font-semibold text-ink">Shipping</p>
          <p className="mt-1 text-[11px] leading-4 text-ink-soft">Confirmed at checkout</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-ink">Order tracking</p>
          <p className="mt-1 text-[11px] leading-4 text-ink-soft">When available</p>
        </div>
      </div>

      {/* Mobile sticky bar — Buy Now is the stronger CTA, Add to Cart
          stays clearly visible alongside it. Below ~380px the price
          label is dropped first so both buttons keep a comfortable
          tap target instead of getting cramped. */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 shadow-soft backdrop-blur sm:hidden"
        style={{ paddingBottom: "max(.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <div className="hidden min-w-[60px] min-[380px]:block">
            <span className="block text-[10px] uppercase tracking-[0.1em] text-ink-soft">Total</span>
            <span className="font-mono text-sm font-medium">{formatMoney(totalPrice)}</span>
          </div>
          <button
            type="button"
            disabled={!canPurchase(packQuantity) || isLoading || isInitializing || isBuyingNow}
            onClick={handleAdd}
            className="btn-secondary min-h-12 flex-1 bg-white/60 px-2 text-xs disabled:opacity-50 min-[380px]:text-sm"
          >
            {isLoading && !isBuyingNow ? "Adding…" : canPurchase(packQuantity) ? "Add to Cart" : "Unavailable"}
          </button>
          <button
            type="button"
            disabled={!canPurchase(packQuantity) || isLoading || isInitializing || isBuyingNow}
            onClick={handleBuyNow}
            className="btn-primary min-h-12 flex-[1.15] px-2 text-xs shadow-lift disabled:opacity-50 min-[380px]:text-sm"
          >
            {isBuyingNow ? "Redirecting…" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
