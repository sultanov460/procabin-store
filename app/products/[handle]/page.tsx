import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getProductByHandle, getRelatedProducts, getReviews } from "@/lib/data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelectionProvider } from "@/components/product/VariantSelectionProvider";
import { BuyBox } from "@/components/product/BuyBox";
import { ShippingBlock } from "@/components/product/ShippingBlock";
import { BenefitsList, SpecsTable, TrustInfo } from "@/components/product/ProductDetails";
import { Reviews } from "@/components/product/Reviews";
import { FaqSection } from "@/components/home/FaqSection";
import { RelatedProducts } from "@/components/home/RelatedProducts";
import { siteConfig } from "@/content/site-config";
import { getSiteUrl } from "@/lib/utils/site";

const getProduct = cache(getProductByHandle);

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  const description = product.tagline || product.description.slice(0, 155) || `Shop ${product.title} at ${siteConfig.brandName}.`;
  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: product.title,
      description,
      type: "website",
      url: `/products/${product.handle}`,
      images: product.images[0] ? [{ url: product.images[0], alt: product.title }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const [related, reviews] = await Promise.all([getRelatedProducts(product.handle), getReviews(product.handle)]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url: `${getSiteUrl()}/products/${product.handle}`,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      priceCurrency: variant.price.currencyCode,
      price: variant.price.amount,
      availability: variant.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${getSiteUrl()}/products/${product.handle}`,
      seller: { "@type": "Organization", name: siteConfig.brandName },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-page pb-20 pt-5 sm:pt-7 md:pb-24 md:pt-9">
        <nav aria-label="Breadcrumb" className="mb-5 flex min-w-0 items-center gap-2 text-xs text-ink-soft md:mb-7">
          <Link href="/collections/all" className="transition-colors hover:text-forest">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate">{product.title}</span>
        </nav>

        <VariantSelectionProvider>
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(350px,.92fr)] md:gap-10 lg:gap-14 xl:grid-cols-[minmax(0,1.12fr)_minmax(400px,.88fr)]">
            <ProductGallery images={product.images} title={product.title} isMock={product.isMock} />

            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <BuyBox product={product} />
              <ShippingBlock shipping={product.shipping} />
              <BenefitsList benefits={product.benefits} />
            </aside>
          </div>
        </VariantSelectionProvider>
      </div>

      <section className="border-y border-line/80 bg-white/35">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow">Product details</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Details for the road ahead</h2>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-[15px] leading-7 text-ink-soft">{product.description}</p>
          </div>
          <div>
            <SpecsTable specs={product.specs} />
            <TrustInfo />
          </div>
        </div>
      </section>

      <Reviews reviews={reviews} />
      {product.faqs && product.faqs.length > 0 && <FaqSection items={product.faqs} title="Product FAQ" />}
      <RelatedProducts products={related} title="More from ProCabin" />
    </>
  );
}
