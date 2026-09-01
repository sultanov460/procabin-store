// Development-only collection membership. This deliberately mirrors the
// real Shopify contract: each handle owns an explicit product set instead
// of applying a fake client-side category filter to the full catalog.

import { mockProducts } from "./products";
import type { Collection } from "@/lib/types/product";

const collectionDefinitions: Record<string, { title: string; description: string; handles: string[] }> = {
  all: {
    title: "All accessories",
    description: "Explore useful automotive technology and practical accessories for everyday driving.",
    handles: mockProducts.map((product) => product.handle),
  },
  interior: {
    title: "Interior",
    description: "Considered accessories for the surfaces and spaces inside your vehicle.",
    handles: ["procabin-seat-gap-organizer", "procabin-detailing-brush"],
  },
  comfort: {
    title: "Comfort",
    description: "Simple additions designed around time spent in the cabin.",
    handles: ["procabin-everyday-seat-cushion"],
  },
  organization: {
    title: "Organization",
    description: "Give everyday essentials and travel items a consistent place.",
    handles: ["procabin-seat-gap-organizer", "procabin-console-organizer", "procabin-trunk-organizer"],
  },
  cleaning: {
    title: "Cleaning",
    description: "Tools for routine care around detailed cabin surfaces.",
    handles: ["procabin-detailing-brush"],
  },
  travel: {
    title: "Travel",
    description: "Storage accessories for longer routes and changing daily cargo.",
    handles: ["procabin-trunk-organizer", "procabin-console-organizer"],
  },
};

export async function getCollectionByHandle(handle: string): Promise<Collection | undefined> {
  const definition = collectionDefinitions[handle];
  if (!definition) return undefined;

  const includedHandles = new Set(definition.handles);
  return {
    id: `mock-collection-${handle}`,
    handle,
    title: definition.title,
    description: definition.description,
    products: mockProducts.filter((product) => includedHandles.has(product.handle)),
  };
}
