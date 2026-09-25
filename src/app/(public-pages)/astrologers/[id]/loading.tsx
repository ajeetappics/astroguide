export default function AstrologerDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-20 font-helvetica">
      {/* Top Banner Skeleton */}
      <div className="relative w-full bg-[#fdf7e1] pt-[70px] lg:pt-[80px] pb-10 md:pb-12">
        <div className="container mx-auto max-w-6xl px-4 py-4 md:py-5">
          <div className="h-4 w-48 rounded-full shimmer-wave" />
        </div>
      </div>

      {/* Profile Card Skeleton */}
      <div className="container mx-auto max-w-6xl px-4 relative -mt-10 md:-mt-12 z-20">
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-[#F6971E]/15 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-gray-100 pb-6">
            {/* Avatar Skeleton */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full shimmer-dark shrink-0" />
            <div className="flex-1 w-full space-y-3 pt-2 text-center md:text-left">
              <div className="h-7 w-48 rounded-xl shimmer-dark mx-auto md:mx-0" />
              <div className="h-4 w-64 rounded-full shimmer-wave mx-auto md:mx-0" />
              <div className="h-4 w-36 rounded-full shimmer-wave mx-auto md:mx-0" />
            </div>
            {/* Pricing & CTA Skeleton */}
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
              <div className="h-6 w-24 rounded shimmer-dark" />
              <div className="h-11 w-44 rounded-xl shimmer-wave" />
            </div>
          </div>

          {/* Stats Bar Skeleton */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl shimmer-wave" />
            ))}
          </div>
        </div>

        {/* About Section Skeleton */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F6971E]/15 space-y-3 mb-6">
          <div className="h-5 w-40 rounded-lg shimmer-dark mb-4" />
          <div className="h-4 w-full rounded-full shimmer-wave" />
          <div className="h-4 w-5/6 rounded-full shimmer-wave" />
          <div className="h-4 w-3/4 rounded-full shimmer-wave" />
        </div>

        {/* Reviews Section Skeleton */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F6971E]/15 space-y-4">
          <div className="h-5 w-48 rounded-lg shimmer-dark mb-4" />
          <div className="h-20 w-full rounded-2xl shimmer-wave" />
          <div className="h-20 w-full rounded-2xl shimmer-wave" />
        </div>
      </div>
    </main>
  );
}
