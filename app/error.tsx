"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-24 text-center md:py-28">
      <div className="mx-auto max-w-xl rounded-[22px] border border-line/80 bg-white/45 px-6 py-12 shadow-soft sm:px-10">
        <p className="eyebrow mb-3">Please try again</p>
        <h1 className="text-2xl sm:text-3xl">We couldn’t load this page</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
          The page is temporarily unavailable. Try loading it again in a moment.
        </p>
        <button type="button" onClick={reset} className="btn-primary mt-6">
          Reload page
        </button>
      </div>
    </div>
  );
}
