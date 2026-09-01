import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  ContactEmailConfigurationError,
  sendContactEmail,
} from "@/lib/email/contact";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  orderNumber?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export const runtime = "nodejs";

function readString(value: unknown, max: number, required = true): string | undefined {
  if (typeof value !== "string") return required ? undefined : "";
  const cleaned = value.trim();
  if ((required && !cleaned) || cleaned.length > max) return undefined;
  return cleaned;
}

function validEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimit(request: NextRequest): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = clientKey(request);
  const current = rateBuckets.get(key);

  if (rateBuckets.size > 500) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(bucketKey);
    }
  }

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > 20_000) {
    return NextResponse.json({ error: "That message is too long. Please shorten it and try again." }, { status: 413 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "We couldn’t read that message. Please check the form and try again." }, { status: 400 });
  }

  // Honeypot submissions receive a neutral success response so automated
  // senders are not given a signal they can use to tune around the field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = readString(body.name, 100);
  const email = readString(body.email, 254);
  const orderNumber = readString(body.orderNumber, 100, false);
  const message = readString(body.message, 5000);

  if (!name || !email || !message || orderNumber === undefined || !validEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid name, email address, and message within the displayed limits." },
      { status: 400 }
    );
  }

  const limit = rateLimit(request);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many messages were sent from this connection. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  try {
    await sendContactEmail(
      { name, email, orderNumber: orderNumber || undefined, message },
      `procabin-contact/${randomUUID()}`
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    const unavailable = error instanceof ContactEmailConfigurationError;
    return NextResponse.json(
      {
        error: unavailable
          ? "Email support is not available right now. Please try again later."
          : "We couldn’t send your message right now. Please try again later or email support directly.",
      },
      { status: unavailable ? 503 : 502 }
    );
  }
}
