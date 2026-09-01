import "server-only";

function configuredEmail(name: "SUPPORT_EMAIL" | "CONTACT_FROM_EMAIL"): string | undefined {
  const value = process.env[name]?.trim();
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}

// Customer-visible support details and the transactional sender stay in
// one server-only module. This prevents provider configuration from being
// bundled into client components and avoids duplicating an address across
// contact, footer, shipping, returns, and legal pages.
export function getSupportEmail(): string | undefined {
  return configuredEmail("SUPPORT_EMAIL");
}

export function getContactFromEmail(): string | undefined {
  return configuredEmail("CONTACT_FROM_EMAIL");
}
