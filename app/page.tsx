import type { Metadata } from "next";
import { getHeroProduct, getRelatedProducts, usingLiveShopify } from "@/lib/data";
import { generalFaq } from "@/content/faq";
import { siteConfig } from "@/content/site-config";
import { Hero } from "@/components/home/Hero";
import { ProductDiscovery } from "@/components/home/ProductDiscovery";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Benefits } from "@/components/home/Benefits";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { FaqSection } from "@/components/home/FaqSection";
import { ShippingInfoSection } from "@/components/home/ShippingInfoSection";
import { FinalCta } from "@/components/home/FinalCta";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.brandName} | ${siteConfig.tagline}` },
  description: siteConfig.tagline,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const heroProduct = await getHeroProduct();

  // No product configured/available yet (e.g. Shopify just connected but
  // the featured handle isn't published). Fail gracefully instead of
  // crashing the homepage.
  if (!heroProduct) {
    return (
      <EmptyState
        title={usingLiveShopify ? "No products yet" : "Catalog unavailable"}
        body={
          usingLiveShopify
            ? "New automotive accessories will appear here as they become available."
            : "The store catalog is temporarily unavailable. Please check back soon."
        }
      />
    );
  }

  const related = await getRelatedProducts(heroProduct.handle);

  return (
    <>
      <Hero product={heroProduct} />
      <ProductDiscovery products={[heroProduct, ...related]} />
      <Benefits />
      <FeaturedProduct product={heroProduct} />
      <ProblemSolution product={heroProduct} />
      <ShippingInfoSection />
      <FaqSection items={generalFaq} />
      <FinalCta product={heroProduct} />
    </>
  );
}
