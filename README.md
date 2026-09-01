# ProCabin Storefront

ProCabin is a custom Next.js headless Shopify storefront for a modern automotive-accessories brand. Shopify remains the commerce source of truth for products, variants, pricing, cart, and hosted checkout; the Next.js app owns the customer-facing storefront design.

## Stack

- Next.js 15.5.21 (Maintenance LTS)
- React / React DOM 19.2.7
- TypeScript
- Tailwind CSS
- Shopify Storefront API 2026-07

## Local development

```bash
npm install
npm run dev
```

Without Shopify credentials, `next dev` uses development-only mock products. Production builds never expose the mock catalog: missing Shopify configuration produces an empty/unavailable commerce state.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=
SHOPIFY_COUNTRY_CODE=US
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SUPPORT_EMAIL=
CONTACT_FROM_EMAIL=
EMAIL_PROVIDER_API_KEY=
```

`SHOPIFY_STOREFRONT_ACCESS_TOKEN` is the public Storefront API access token used by this server-side integration. It is sent with Shopify's `X-Shopify-Storefront-Access-Token` header and is never exposed through a `NEXT_PUBLIC_*` variable. Never commit `.env.local` or private credentials.

The Headless storefront needs Storefront API permission to read product listings, read inventory quantities, and read/write carts. Product inventory permission enables exact Solo/Duo/Trio availability; when Shopify does not return an exact quantity, the UI relies only on `availableForSale` and does not invent a stock limit.

`SHOPIFY_COUNTRY_CODE=US` contextualizes product pricing and new carts for the US market. The final checkout still uses Shopify and can adjust according to the buyer/shipping address and Shopify Markets configuration.

`SUPPORT_EMAIL`, `CONTACT_FROM_EMAIL`, and `EMAIL_PROVIDER_API_KEY` are server-only. The contact flow sends through Resend’s HTTPS API without exposing the key to the browser. `CONTACT_FROM_EMAIL` must use a sending domain verified in Resend; `SUPPORT_EMAIL` is both the destination inbox and the address displayed across customer-support surfaces.

## Homepage product

ProCabin is a multi-product store — there is no `FEATURED_PRODUCT_HANDLE` (or any other manually configured "featured product" environment variable), and one should not be reintroduced. The homepage's hero/featured sections use the first product in the Shopify collection with handle `procabin`. Reordering that collection updates the homepage automatically, with no code or environment changes required.

## Shopify product metafields

ProCabin reads these optional product metafields from namespace `custom`:

| Key | Recommended type | Purpose |
|---|---|---|
| `shipping_min_days` | Integer | Minimum product-specific delivery estimate |
| `shipping_max_days` | Integer | Maximum product-specific delivery estimate |
| `processing_min_days` | Integer | Minimum order processing/handling time before shipment |
| `processing_max_days` | Integer | Maximum order processing/handling time before shipment |
| `shipping_origin` | Single line text | Optional fulfillment-origin hint |
| `shipping_method` | Single line text | Optional internal shipping-method value |
| `tagline` | Single line text | Short product promise |
| `benefits` | JSON | Array of benefit strings |
| `specifications` | JSON | Object or array of label/value pairs |
| `faqs` | JSON | Array of question/answer objects |

**Enable Storefront API access for each metafield definition** in Shopify Admin — Settings → Custom data → Products → (each field) → Access. Metafields created in Admin are private to Admin by default; without this toggle enabled, the Storefront API silently returns `null` and the field parses as "not set" even though it's populated. This is the most common reason a configured value doesn't reach the storefront. Missing or malformed optional metafields never break the product page.

### Delivery workflow

For now, delivery estimates are intentionally manual rather than fetched from CJ in real time:

1. Check the current supplier warehouse, destination, shipping method, processing time, and delivery estimate.
2. Enter `custom.shipping_min_days` / `custom.shipping_max_days` and `custom.processing_min_days` / `custom.processing_max_days` on the Shopify product.
3. Optionally enter `shipping_origin` and `shipping_method`.
4. Save the product; ProCabin reads the values automatically.

When no valid shipping range exists, the storefront says **"Delivery estimate available at checkout"** instead of inventing a number; processing time is only shown when a valid value exists. Delivery/processing wording says "days," not "business days," since supplier estimates aren't guaranteed to be business-day-only. Tracking is described as "provided when available," never guaranteed. Supplier names, internal methods, and supplier shipping costs are not exposed to customers.

## Product content examples

`custom.benefits`:

```json
[
  "Keeps small essentials within reach",
  "Low-profile cabin fit",
  "Easy to remove and clean"
]
```

`custom.specifications` can be an object:

```json
{
  "Placement": "Front seat gap",
  "Material": "ABS and soft-touch lining"
}
```

or an array:

```json
[
  { "label": "Placement", "value": "Front seat gap" },
  { "label": "Material", "value": "ABS and soft-touch lining" }
]
```

`custom.faqs`:

```json
[
  { "question": "Will it fit my vehicle?", "answer": "Check the listed dimensions against the available space beside your seat." }
]
```

## Product images

`components/ui/ProductImage.tsx` provides a stable image container for supplier photos with different aspect ratios. Product/catalog images default to `object-contain`; lifestyle treatments can intentionally use `object-cover`. Missing images render a ProCabin-compatible fallback instead of a broken image icon.

## Catalog and homepage

- `/collections/all` is a customer-friendly pseudo-collection backed only by products assigned to Shopify collection handle `procabin`; it never exposes the shared store’s foreign products.
- The homepage keeps one featured product while showing a compact “Featured accessories” product section sourced from the active commerce data layer.
- New products flow through the shared Shopify data layer and automatically fit the existing card/gallery layouts.

## Cart and checkout

- Client code submits variant IDs and quantities only; prices are resolved from Shopify.
- Solo, Duo, and Trio add quantity 1, 2, or 3 of the currently selected Shopify variant. They are not separate products and do not imply a discount.
- Cart mutations validate quantity and surface Shopify `userErrors`.
- New carts are created with the configured storefront country context.
- **Buy Now** adds the selected variant and pack quantity to the active Shopify cart, then uses the fresh `checkoutUrl`. It intentionally checks out the active cart rather than creating or destroying a separate cart.
- The cart checkout button also uses Shopify's hosted checkout; no custom payment flow is built or required.

If Shopify checkout still displays **“My Store”**, change the store/brand/checkout identity in Shopify Admin. The Next.js app intentionally does not hack Shopify-hosted checkout.

## Reviews

No fake reviews are rendered. The review provider is intentionally empty until a legitimate source is connected. Do not scrape supplier product pages or label supplier feedback as verified ProCabin purchases unless the source and permissions actually support that claim.

## Contact form

The form validates name, email, optional order number, and message on the server, includes a honeypot and best-effort per-instance rate limit, then sends a plain-text message to `SUPPORT_EMAIL` through Resend. The sender is `CONTACT_FROM_EMAIL`, the customer address is set as reply-to, and an idempotency key protects each send from provider retries. If delivery is not configured or Resend rejects a request, the form shows an honest, customer-safe error rather than reporting false success.

## Legal pages

The project includes:

- `/privacy`
- `/terms`
- `/returns`
- `/shipping`
- `/legal-notice`
- `/contact`

Personal home address and personal email are not hardcoded into public policy pages. Review the final business policies before launch and keep Shopify Admin policies consistent with the storefront.

## Production checklist

Before accepting real orders:

1. Set the final `NEXT_PUBLIC_SITE_URL`.
2. Set `SUPPORT_EMAIL`, `CONTACT_FROM_EMAIL`, and `EMAIL_PROVIDER_API_KEY`; verify the sending domain in Resend.
3. Install/configure Shopify's Headless sales channel, create a storefront, and publish every sellable product to it.
4. Enable Storefront API permissions for product listings, product inventory, and cart read/write access; copy the public token into `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
5. Create/enable Shopify metafield definitions (including Storefront API access) and populate live product data.
6. Confirm Shopify Markets pricing is correct for the US market (USD).
7. Confirm Shopify Shipping matches the storefront’s free-standard-shipping message.
8. Replace Bogus Gateway with an approved live payment provider.
9. Configure Shopify branding/store name as **ProCabin** so hosted checkout does not show “My Store”.
10. Confirm product inventory, fulfillment methods, and delivery estimates.
11. Submit a real contact message and confirm delivery plus reply-to behavior in the support inbox.
12. Confirm the return window, operator details, and storefront policies match the business and Shopify Admin.
13. Deploy, connect the production domain, then run a complete live test order.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm start
```
