import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getCollectionByHandle } from "@/lib/data";
import { CollectionView } from "@/components/collection/CollectionView";
import { siteConfig } from "@/content/site-config";

const getCollection = cache(getCollectionByHandle);

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return {};
  const description = collection.description || `Shop ${collection.title} at ${siteConfig.brandName}.`;
  return {
    title: collection.title,
    description,
    alternates: { canonical: `/collections/${collection.handle}` },
    openGraph: {
      title: collection.title,
      description,
      type: "website",
      url: `/collections/${collection.handle}`,
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();

  return (
    <div>
      <section className="page-intro">
        <div className="container-page py-11 sm:py-14 lg:py-16">
          <p className="eyebrow">ProCabin shop</p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:items-end">
            <h1 className="max-w-[14ch] text-4xl leading-[1.02] sm:text-5xl lg:text-[3.5rem]">{collection.title === "All accessories" ? "Automotive accessories" : collection.title}</h1>
            {collection.description && (
              <p className="max-w-xl text-sm leading-6 text-graphite-soft lg:justify-self-end">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-9 sm:pb-24 sm:pt-11">
        <CollectionView products={collection.products} />
      </section>
    </div>
  );
}
