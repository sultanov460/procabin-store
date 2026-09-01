export function getCustomerFacingProductTitle(title: string): string {
  // Keep Shopify as the title source of truth while normalizing incidental
  // whitespace commonly found in supplier-imported catalog data.
  return title.trim().replace(/\s+/g, " ");
}
