export default function HoroscopeLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-24 pb-20 font-helvetica">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-b from-[#FEF8E2] to-[#FFFDF9] py-10 border-b border-orange-100/50">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center text-center">
          <div className="h-4 w-36 rounded-full shimmer-wave mb-3" />
          <div className="h-9 sm:h-11 w-64 sm:w-80 rounded-2xl shimmer-dark mb-3" />
          <div className="h-4 w-48 sm:w-72 rounded-full shimmer-wave" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-8">
        {/* Timeframe Tabs Skeleton */}
        <div className="flex justify-center gap-3 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-28 rounded-full shimmer-wave" />
          ))}
        </div>

        {/* 12 Zodiac Sign Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#F6971E]/20 p-4 flex flex-col items-center gap-3 shadow-xs h-[160px]"
            >
              <div className="w-16 h-16 rounded-full shimmer-dark" />
              <div className="h-4 w-20 rounded-full shimmer-wave" />
              <div className="h-3 w-14 rounded-full shimmer-wave" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
