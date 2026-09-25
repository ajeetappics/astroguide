export default function SpellLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24 font-helvetica">
      {/* Hero Header Skeleton */}
      <div className="relative bg-gradient-to-b from-[#FEF8E2] to-[#FFFDF9] pt-24 pb-16 border-b border-orange-100/50">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center text-center">
          <div className="h-4 w-32 rounded-full shimmer-wave mb-3" />
          <div className="h-9 sm:h-11 w-64 sm:w-96 rounded-2xl shimmer-dark mb-3" />
          <div className="h-4 w-52 sm:w-80 rounded-full shimmer-wave" />
        </div>
      </div>

      <section className="container mx-auto max-w-7xl px-4 -mt-6 sm:-mt-8 relative z-20">
        {/* Search Bar Skeleton */}
        <div className="bg-white rounded-full shadow-md p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-6 h-12">
          <div className="w-full h-8 rounded-full shimmer-wave" />
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex items-center gap-2.5 overflow-hidden mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full shimmer-wave shrink-0" />
          ))}
        </div>

        {/* Spells Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#F6971E]/15 overflow-hidden shadow-xs flex flex-col h-[280px]"
            >
              <div className="h-[125px] w-full shimmer-dark" />
              <div className="p-3.5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="h-4 w-3/4 rounded-full shimmer-wave mb-2" />
                  <div className="h-3 w-full rounded-full shimmer-wave mb-1" />
                  <div className="h-3 w-2/3 rounded-full shimmer-wave" />
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-4 w-14 rounded shimmer-dark" />
                  <div className="h-7 w-20 rounded-full shimmer-wave" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
