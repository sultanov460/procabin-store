export default function ProductLoading() {
  return (
    <div className="container-page animate-pulse pb-24 pt-6 sm:pb-10 md:py-10 motion-reduce:animate-none">
      <div className="mb-7 h-3 w-48 rounded bg-sand" />
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="aspect-square rounded-card border border-line/70 bg-sand" />
        <div className="space-y-4 pt-2">
        <div className="h-5 w-40 rounded-pill bg-sand" />
        <div className="h-10 w-2/3 rounded bg-sand" />
        <div className="h-6 w-1/4 rounded bg-sand" />
        <div className="h-4 w-full rounded bg-sand" />
        <div className="h-4 w-5/6 rounded bg-sand" />
        <div className="mt-7 grid grid-cols-3 gap-2">
          <div className="h-24 rounded-[14px] bg-sand" />
          <div className="h-24 rounded-[14px] bg-sand" />
          <div className="h-24 rounded-[14px] bg-sand" />
        </div>
        <div className="h-12 w-full rounded-pill bg-sand" />
        </div>
      </div>
    </div>
  );
}
