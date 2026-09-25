"use client";

export default function Loader() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] pt-24 pb-20 font-helvetica w-full">
      {/* Top Banner Skeleton */}
      <div className="w-full bg-gradient-to-b from-[#FFF7EA] to-[#FFFDF9] py-8 sm:py-12 border-b border-orange-100/50">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center text-center">
          <div className="h-4 w-36 rounded-full shimmer-wave mb-4" />
          <div className="h-8 sm:h-10 w-64 sm:w-96 rounded-2xl shimmer-dark mb-3" />
          <div className="h-4 w-48 sm:w-72 rounded-full shimmer-wave" />
        </div>
      </div>

      {/* Main Content Skeleton Area */}
      <div className="container mx-auto max-w-7xl px-4 mt-8 sm:mt-10">
        {/* Filter / Search placeholder row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="h-10 w-full sm:w-80 rounded-full shimmer-wave" />
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full shimmer-wave shrink-0" />
            ))}
          </div>
        </div>

        {/* 5-Column Grid Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#F6971E]/15 overflow-hidden shadow-xs flex flex-col h-[340px]"
            >
              <div className="w-full aspect-[4/4.6] shimmer-dark" />
              <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between gap-2">
                <div className="space-y-1.5">
                  <div className="h-4 w-3/4 rounded-full shimmer-wave" />
                  <div className="h-3 w-1/2 rounded-full shimmer-wave" />
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-3 w-12 rounded shimmer-wave" />
                  <div className="h-4 w-16 rounded shimmer-dark" />
                </div>
                <div className="h-8 w-full rounded-xl shimmer-wave mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
