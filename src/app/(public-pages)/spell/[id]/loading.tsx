export default function SpellDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded-full shimmer-wave mb-6 mt-4" />

        {/* Hero Card Skeleton */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-orange-100 flex flex-col lg:flex-row gap-8 items-center shadow-xs">
          <div className="w-full lg:w-[42%] aspect-[4/2.5] rounded-2xl shimmer-dark" />
          <div className="w-full lg:w-[58%] flex flex-col justify-center gap-3">
            <div className="h-6 w-28 rounded-full shimmer-wave" />
            <div className="h-8 w-3/4 rounded-xl shimmer-dark" />
            <div className="h-4 w-full rounded-full shimmer-wave" />
            <div className="h-4 w-5/6 rounded-full shimmer-wave" />
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
              <div className="h-8 w-24 rounded-lg shimmer-dark" />
              <div className="h-10 w-40 rounded-xl shimmer-wave" />
            </div>
          </div>
        </div>

        {/* Detail Sections Skeleton */}
        <div className="mt-7 flex flex-col gap-5">
          <div className="h-32 bg-white rounded-2xl border border-orange-100/60 p-5 space-y-3">
            <div className="h-5 w-40 rounded shimmer-dark" />
            <div className="h-3.5 w-full rounded-full shimmer-wave" />
            <div className="h-3.5 w-4/5 rounded-full shimmer-wave" />
          </div>
          <div className="h-32 bg-white rounded-2xl border border-orange-100/60 p-5 space-y-3">
            <div className="h-5 w-32 rounded shimmer-dark" />
            <div className="h-3.5 w-full rounded-full shimmer-wave" />
            <div className="h-3.5 w-3/4 rounded-full shimmer-wave" />
          </div>
        </div>
      </div>
    </main>
  );
}
