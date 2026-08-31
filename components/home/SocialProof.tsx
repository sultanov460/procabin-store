export function SocialProof() {
  const points = ["Secure checkout", "Free standard shipping", "Clear return policy", "Customer support"];

  return (
    <section className="border-y border-line bg-paper py-8">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {points.map((p) => (
          <span key={p} className="text-sm font-medium text-ink-soft">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
