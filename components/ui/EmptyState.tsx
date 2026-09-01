import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="container-page py-24 text-center md:py-28">
      <div className="mx-auto max-w-xl rounded-[22px] border border-line/80 bg-white/45 px-6 py-12 shadow-soft sm:px-10">
      <h1 className="text-2xl sm:text-3xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">{body}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn-primary mt-6 inline-flex">
          {actionLabel}
        </Link>
      )}
      </div>
    </div>
  );
}
