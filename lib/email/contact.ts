import "server-only";
import { getContactFromEmail, getSupportEmail } from "@/content/support-config";

export type ContactMessage = {
  name: string;
  email: string;
  orderNumber?: string;
  message: string;
};

export class ContactEmailConfigurationError extends Error {}
export class ContactEmailDeliveryError extends Error {}

export async function sendContactEmail(contact: ContactMessage, idempotencyKey: string): Promise<void> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY?.trim();
  const supportEmail = getSupportEmail();
  const fromEmail = getContactFromEmail();

  if (!apiKey || !supportEmail || !fromEmail) {
    throw new ContactEmailConfigurationError("Contact email delivery is not configured.");
  }

  const safeName = contact.name.replace(/[\r\n]+/g, " ");
  const subject = contact.orderNumber
    ? `ProCabin contact — order ${contact.orderNumber.replace(/[\r\n]+/g, " ")}`
    : `ProCabin contact — ${safeName}`;
  const text = [
    "New message from the ProCabin contact form",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    contact.orderNumber ? `Order number: ${contact.orderNumber}` : undefined,
    "",
    "Message:",
    contact.message,
  ]
    .filter((line): line is string => line !== undefined)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
        "User-Agent": "ProCabin-Storefront/1.0",
      },
      body: JSON.stringify({
        from: `ProCabin Contact <${fromEmail}>`,
        to: [supportEmail],
        reply_to: contact.email,
        subject,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new ContactEmailDeliveryError("Email provider rejected the request.");
  } catch (error) {
    if (error instanceof ContactEmailDeliveryError) throw error;
    throw new ContactEmailDeliveryError("Email provider request failed.");
  }
}
