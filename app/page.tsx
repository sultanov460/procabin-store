import type { Metadata } from "next";
import { getHeroProduct, getRelatedProducts, getReviews } from "@/lib/data";
import { generalFaq } from "@/content/faq";
import { siteConfig } from "@/content/site-config";
import { Hero } from "@/components/home/Hero";
import { ProductDiscovery } from "@/components/home/ProductDiscovery";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Benefits } from "@/components/home/Benefits";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { ProductDemo } from "@/components/home/ProductDemo";
import { SocialProof } from "@/components/home/SocialProof";
import { Reviews } from "@/components/product/Reviews";
import { RelatedProducts } from "@/components/home/RelatedProducts";
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
        title="No products yet"
        body="Once a product is added, it will appear here as the homepage feature."
      />
    );
  }

  const [related, reviews] = await Promise.all([
    getRelatedProducts(heroProduct.handle),
    getReviews(heroProduct.handle),
  ]);

  return (
    <>
      <Hero product={heroProduct} />
      <ProductDiscovery products={[heroProduct, ...related]} />
      <FeaturedProduct product={heroProduct} />
      <Benefits />
      <ProblemSolution product={heroProduct} />
      <ProductDemo images={heroProduct.images} productTitle={heroProduct.title} />
      <SocialProof />
      <Reviews reviews={reviews} />
      <RelatedProducts products={related} />
      <FaqSection items={generalFaq} />
      <ShippingInfoSection />
      <FinalCta product={heroProduct} />
    </>
  );
}
