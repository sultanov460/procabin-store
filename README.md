# Velora Storefront

Velora is a custom Next.js headless Shopify storefront for a modern kitchen & home brand. Shopify remains the commerce source of truth for products, variants, pricing, cart, and hosted checkout; the Next.js app owns the customer-facing storefront design.

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

Without Shopify credentials the storefront uses development-only mock products. No fake reviews are rendered.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPPORT_EMAIL=
SHOPIFY_COUNTRY_CODE=US
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
CONTACT_FORM_ENDPOINT=
```

`SHOPIFY_STOREFRONT_ACCESS_TOKEN` is the scoped Storefront API token used by the existing integration. Never commit `.env.local` or private credentials.

`SHOPIFY_COUNTRY_CODE=US` contextualizes product pricing and new carts for the US market. The final checkout still uses Shopify and can adjust according to the buyer/shipping address and Shopify Markets configuration.

## Homepage product

Velora is a multi-product store — there is no `FEATURED_PRODUCT_HANDLE` (or any other manually configured "featured product" environment variable), and one should not be reintroduced. The homepage's hero/featured sections simply use the first product the connected Shopify store returns. Adding, removing, or reordering products in Shopify updates the homepage automatically, with no code or environment changes required.

## Shopify product metafields

Velora reads these optional product metafields from namespace `custom`:

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
4. Save the product; Velora reads the values automatically.

When no valid shipping range exists, the storefront says **"Delivery estimate available at checkout"** instead of inventing a number; processing time is only shown when a valid value exists. Delivery/processing wording says "days," not "business days," since supplier estimates aren't guaranteed to be business-day-only. Tracking is described as "provided when available," never guaranteed. Supplier names, internal methods, and supplier shipping costs are not exposed to customers.

## Product content examples

`custom.benefits`:

```json
[
  "Foldable design for compact storage",
  "Use for draining, steaming, or frying",
  "Stainless-steel construction"
]
```

`custom.specifications` can be an object:

```json
{
  "Material": "Stainless steel",
  "Use": "Frying, steaming, draining"
}
```

or an array:

```json
[
  { "label": "Material", "value": "Stainless steel" },
  { "label": "Use", "value": "Frying, steaming, draining" }
]
```

`custom.faqs`:

```json
[
  { "question": "How do I store it?", "answer": "Fold it flat after cleaning and drying." }
]
```

## Product images

`components/ui/ProductImage.tsx` provides a stable image container for supplier photos with different aspect ratios. Product/catalog images default to `object-contain`; lifestyle treatments can intentionally use `object-cover`. Missing images render a Velora-compatible fallback instead of a broken image icon.

## Catalog and homepage

- `/collections/all` is a pseudo-collection backed directly by Shopify products; it does not require a Shopify collection named `all`.
- The homepage keeps one featured product while showing a small multi-product “Kitchen essentials” discovery section immediately after the hero.
- New products flow through the shared Shopify data layer and automatically fit the existing card/gallery layouts.

## Cart and checkout

- Client code submits variant IDs and quantities only; prices are resolved from Shopify.
- Cart mutations validate quantity and surface Shopify `userErrors`.
- New carts are created with the configured storefront country context.
- **Buy Now** uses the fresh Shopify `checkoutUrl` directly.
- The cart checkout button also uses Shopify's hosted checkout; no custom payment flow is built or required.

If Shopify checkout still displays **“My Store”**, change the store/brand/checkout identity in Shopify Admin. The Next.js app intentionally does not hack Shopify-hosted checkout.

## Reviews

No fake reviews are rendered. The review provider is intentionally empty until a legitimate source is connected. Do not scrape CJ product pages or label supplier feedback as verified Velora purchases unless the source and permissions actually support that claim.

## Contact form

The contact form only reports success if a real server-side delivery endpoint is configured through `CONTACT_FORM_ENDPOINT`. Without one, it returns an honest unavailable message. Set `NEXT_PUBLIC_SUPPORT_EMAIL` to a dedicated Velora support inbox once available.

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
2. Set a dedicated `NEXT_PUBLIC_SUPPORT_EMAIL`.
3. Create/enable Shopify metafield definitions (including Storefront API access) and populate live product data.
4. Confirm Shopify Markets pricing is correct for the US market (USD).
5. Confirm Shopify Shipping matches the storefront’s free-standard-shipping message.
6. Replace Bogus Gateway with an approved live payment provider.
7. Configure Shopify branding/store name as **Velora** so hosted checkout does not show “My Store”.
8. Confirm CJ product connections, inventory, fulfillment methods, and delivery estimates.
9. Configure a real contact delivery endpoint or support inbox.
10. Deploy to Vercel, connect the domain, then run a complete live test order.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm start
```

## Verification note for this archive

The source was statically checked for TypeScript/TSX syntax and local import resolution after the final edits. A full dependency install, type-check, and Next.js production build could not be executed in the editing environment because the container could not resolve `registry.npmjs.org` (`EAI_AGAIN`). Run `npm install && npm run typecheck && npm run build` on your Mac/Vercel before deployment.
