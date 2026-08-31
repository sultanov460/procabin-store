// Store-wide shipping presentation. Exact delivery windows belong to each
// product and come from Shopify metafields, because supplier/warehouse
// methods vary by SKU.
export const shippingConfig = {
  US: {
    label: "Free Standard Shipping",
    tracking: "when-available" as const,
  },
};

export type ShippingCountryConfig = typeof shippingConfig.US;
