// DEVELOPMENT-ONLY product data used when Shopify credentials are absent.
// Production automatically switches to Shopify through lib/data/index.ts.
import type { Product } from "@/lib/types/product";

export const mockProducts: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "procabin-seat-gap-organizer",
    title: "ProCabin Seat Gap Organizer",
    tagline: "Keep small essentials within reach and out of the gap.",
    description: "A slim organizer designed for the space beside the front seat, giving phones, cards and other small daily items a consistent place in the cabin.",
    benefits: ["Uses otherwise wasted cabin space", "Keeps small items within reach", "Simple, low-profile form"],
    images: ["/images/mock/seat-gap-organizer.png"],
    price: { amount: 29, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{
      id: "gid://mock/Variant/1",
      title: "Default Title",
      price: { amount: 29, currencyCode: "USD" },
      available: true,
      selectedOptions: [{ name: "Title", value: "Default Title" }],
    }],
    specs: [{ label: "Placement", value: "Front seat gap" }],
    shipping: { country: "US", minDays: 5, maxDays: 11, processingMinDays: 1, processingMaxDays: 3, origin: "International" },
    isMock: true,
  },
  {
    id: "gid://mock/Product/2",
    handle: "procabin-console-organizer",
    title: "ProCabin Console Organizer",
    tagline: "A clearer place for the items that travel with you.",
    description: "A compartmented organizer for keeping frequently used cabin items separated and easier to find.",
    benefits: ["Separates small essentials", "Designed for everyday access"],
    images: ["/images/mock/console-organizer.png"],
    price: { amount: 24, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/2", title: "Default Title", price: { amount: 24, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [],
    isMock: true,
  },
  {
    id: "gid://mock/Product/3",
    handle: "procabin-detailing-brush",
    title: "ProCabin Interior Detailing Brush",
    tagline: "Reach vents, seams and controls with less effort.",
    description: "A compact brush for routine dusting around the detailed surfaces of a vehicle interior.",
    benefits: ["Compact handling", "Made for detailed cabin surfaces"],
    images: ["/images/mock/detailing-brush.png"],
    price: { amount: 18, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/3", title: "Default Title", price: { amount: 18, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [],
    isMock: true,
  },
  {
    id: "gid://mock/Product/4",
    handle: "procabin-everyday-seat-cushion",
    title: "ProCabin Everyday Seat Cushion",
    tagline: "A considered layer of comfort for time spent behind the wheel.",
    description: "A slim, shaped seat cushion with a breathable textile surface for everyday driving. Check the listed dimensions against your vehicle seat before ordering.",
    benefits: ["Low-profile shape", "Breathable textile surface", "Easy to remove from the seat"],
    images: ["/images/mock/seat-cushion.png"],
    price: { amount: 42, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/4", title: "Default Title", price: { amount: 42, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [{ label: "Placement", value: "Vehicle seat" }, { label: "Surface", value: "Breathable textile" }],
    isMock: true,
  },
  {
    id: "gid://mock/Product/5",
    handle: "procabin-trunk-organizer",
    title: "ProCabin Structured Trunk Organizer",
    tagline: "Keep travel and everyday cargo separated and easier to reach.",
    description: "A compartmented trunk organizer with a structured body and flexible storage sections for frequently carried items.",
    benefits: ["Separated storage sections", "Structured sides", "Collapsible when not needed"],
    images: ["/images/mock/trunk-organizer.png"],
    price: { amount: 38, currencyCode: "USD" },
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [{ id: "gid://mock/Variant/5", title: "Default Title", price: { amount: 38, currencyCode: "USD" }, available: true, selectedOptions: [{ name: "Title", value: "Default Title" }] }],
    specs: [{ label: "Placement", value: "Vehicle trunk" }, { label: "Construction", value: "Collapsible structured fabric" }],
    isMock: true,
  },
];

export async function getAllProducts(first = mockProducts.length): Promise<Product[]> {
  return mockProducts.slice(0, Math.max(0, first));
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  return mockProducts.find((product) => product.handle === handle);
}
