export const siteConfig = {
  brandName: "Velora",
  tagline: "Smart kitchen essentials for a calmer, easier home.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined,
  nav: [
    { label: "Shop", href: "/collections/all" },
    { label: "About", href: "/about" },
    { label: "Shipping", href: "/shipping" },
    { label: "Contact", href: "/contact" },
  ],
  footerGroups: [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/collections/all" },
        { label: "About Velora", href: "/about" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Shipping & Delivery", href: "/shipping" },
        { label: "Returns & Refunds", href: "/returns" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Legal Notice", href: "/legal-notice" },
      ],
    },
  ],
  announcement: "Free standard shipping on orders to the United States",
};
