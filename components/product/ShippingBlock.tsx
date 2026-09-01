import { getValidDeliveryRange, getValidProcessingRange, getOriginLabel } from "@/lib/utils/shipping";
import type { ShippingEstimate } from "@/lib/types/product";
import { TruckIcon } from "@/components/ui/icons";
import { SHOPIFY_COUNTRY_CODE } from "@/lib/data/shopify/config";

export function ShippingBlock({ shipping }: { shipping?: ShippingEstimate }) {
  const validated = getValidDeliveryRange(shipping);
  const processing = getValidProcessingRange(shipping);
  const originLabel = getOriginLabel(shipping?.origin);
  const destinationCode = shipping?.country || SHOPIFY_COUNTRY_CODE;
  const destinationLabel = new Intl.DisplayNames(["en"], { type: "region" }).of(destinationCode) || destinationCode;

  return (
    <div className="mt-6 rounded-[16px] border border-line/80 bg-mist/45 p-4 sm:p-5">
      <div className="flex items-start gap-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
          <TruckIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-ink">Free Standard Shipping</p>
          </div>
          <p className="mt-1.5 text-sm leading-6 text-ink-soft">
            {validated
              ? `Delivery: ${validated.minDays}–${validated.maxDays} days`
              : "Delivery estimate available at checkout"}
          </p>
          {processing && (
            <p className="mt-0.5 text-xs leading-5 text-ink-soft/85">
              Processing: {processing.minDays}–{processing.maxDays} days
            </p>
          )}
          <p className="mt-1 text-xs leading-5 text-ink-soft/85">Ships to {destinationLabel}</p>
          <p className="text-xs leading-5 text-ink-soft/85">Tracking provided when available</p>
          {originLabel && <p className="mt-1 text-xs leading-5 text-ink-soft/85">{originLabel}</p>}
        </div>
      </div>
    </div>
  );
}
