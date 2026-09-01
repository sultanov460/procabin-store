"use client";

import { useRef, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("sending");
    setErrorMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card border border-plum/20 bg-plum/5 p-6 sm:p-7">
        <h2 className="text-xl">Message sent</h2>
        <p className="mt-2 text-sm leading-6 text-graphite-soft">Thanks — your message is on its way to ProCabin support.</p>
        <button type="button" className="btn-secondary mt-5" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5" aria-busy={status === "sending"}>
      <div>
        <p className="eyebrow">Send a message</p>
        <h2 className="mt-2 text-2xl">How can we help?</h2>
      </div>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">Name</label>
        <input id="name" name="name" autoComplete="name" maxLength={100} required className="min-h-12 w-full rounded-[12px] border border-line bg-white/65 px-4 text-sm outline-none transition-colors placeholder:text-graphite-soft/50 hover:border-plum/30 focus:border-plum" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required className="min-h-12 w-full rounded-[12px] border border-line bg-white/65 px-4 text-sm outline-none transition-colors placeholder:text-graphite-soft/50 hover:border-plum/30 focus:border-plum" />
      </div>
      <div>
        <label htmlFor="orderNumber" className="mb-1 block text-sm font-medium text-ink">
          Order number <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <input id="orderNumber" name="orderNumber" autoComplete="off" maxLength={100} className="min-h-12 w-full rounded-[12px] border border-line bg-white/65 px-4 text-sm outline-none transition-colors placeholder:text-graphite-soft/50 hover:border-plum/30 focus:border-plum" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">Message</label>
        <textarea id="message" name="message" required maxLength={5000} rows={6} className="w-full resize-y rounded-[12px] border border-line bg-white/65 px-4 py-3 text-sm outline-none transition-colors placeholder:text-graphite-soft/50 hover:border-plum/30 focus:border-plum" />
      </div>
      <div className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:cursor-wait disabled:opacity-50">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && <p role="alert" aria-live="assertive" className="rounded-[12px] border border-clay/20 bg-clay/5 px-4 py-3 text-sm leading-6 text-clay-dark">{errorMessage}</p>}
    </form>
  );
}
