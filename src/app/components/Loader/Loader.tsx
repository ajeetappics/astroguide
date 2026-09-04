"use client";

export default function Loader() {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-[#EEE3D9] z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#A8827D] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-[#72271E] border-b-transparent rounded-full animate-reverse-spin"></div>
        </div>
        <p className="text-lg font-semibold text-[#72271E]">Loading...</p>
      </div>
    </div>
  );
}

