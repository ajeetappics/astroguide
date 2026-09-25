export default function AstrologersLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24 font-helvetica">
      {/* Hero Header Skeleton */}
      <div className="relative bg-gradient-to-b from-[#FEF8E2] to-[#FFFDF9] pt-24 pb-16 border-b border-orange-100/50">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center text-center">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-36 rounded-full shimmer-wave mb-3" />
          {/* Title Skeleton */}
          <div className="h-9 sm:h-11 w-64 sm:w-[480px] rounded-2xl shimmer-dark mb-3" />
          {/* Subtitle Skeleton */}
          <div className="h-4 w-56 sm:w-96 rounded-full shimmer-wave" />
        </div>
      </div>

      {/* Main Content Area: Search, Tabs & Astrologer Grid */}
      <section className="container mx-auto max-w-7xl px-4 -mt-6 sm:-mt-8 relative z-20">
        {/* 1. Search Bar Skeleton */}
        <div className="bg-white rounded-full shadow-md p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-6 h-12">
          <div className="w-full h-8 rounded-full shimmer-wave" />
        </div>

        {/* 2. Tabs Row Skeleton */}
        <div className="flex items-center gap-2.5 overflow-hidden mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full shimmer-wave shrink-0" />
          ))}
        </div>

        {/* 3. 5-Column Astrologers Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#F6971E]/20 overflow-hidden shadow-xs flex flex-col h-[340px]"
            >
              <div className="w-full aspect-[4/4.6] shimmer-dark" />
              <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-28 rounded-full shimmer-wave" />
                    <div className="h-3 w-8 rounded shimmer-wave" />
                  </div>
                  <div className="h-3 w-20 rounded-full shimmer-wave mb-1.5" />
                  <div className="h-3 w-32 rounded-full shimmer-wave" />
                </div>
                <div>
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center mb-2">
                    <div className="h-3 w-12 rounded shimmer-wave" />
                    <div className="h-4 w-16 rounded shimmer-dark" />
                  </div>
                  <div className="h-8 w-full rounded-xl shimmer-wave" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
