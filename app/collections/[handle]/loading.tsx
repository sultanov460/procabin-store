export default function CollectionLoading() {
  return (
    <div className="container-page animate-pulse py-10 motion-reduce:animate-none sm:py-14">
      <div className="h-3 w-24 rounded bg-sand" />
      <div className="mt-4 h-11 w-1/2 max-w-sm rounded bg-sand" />
      <div className="mt-8 flex items-center justify-between gap-4 border-b border-line pb-5">
        <div className="h-4 w-24 rounded bg-sand" />
        <div className="h-10 w-32 rounded-pill bg-sand" />
      </div>
      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-[780px]">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-[22px] border border-line/70 bg-white/35 p-2.5">
            <div className="aspect-square rounded-[17px] bg-sand" />
            <div className="px-2 pb-2 pt-4">
              <div className="h-4 w-5/6 rounded bg-sand" />
              <div className="mt-2 h-4 w-2/3 rounded bg-sand" />
              <div className="mt-3 h-5 w-1/3 rounded bg-sand" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
