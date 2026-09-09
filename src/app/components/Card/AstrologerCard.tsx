'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsStarFill, BsPatchCheckFill, BsCurrencyRupee } from 'react-icons/bs';
import { usePopup } from '../popup/PopupContext';

export interface AstrologerData {
  id: number;
  name: string;
  isVerified: boolean;
  isCelebrity: boolean;
  skills: string[];
  languages: string;
  experience: string;
  rating: string;
  totalCalls: string;
  price: string;
  imageUrl: string;
}

interface AstrologerCardProps {
  astro: AstrologerData;
}

export default function AstrologerCard({ astro }: AstrologerCardProps) {
  const { openPopup } = usePopup();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/astrologers/${astro.id}`);
  };

  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPopup();
  };

  const originalPrice = Math.round(parseInt(astro.price.replace(/[^\d]/g, '') || '25') * 1.35);

  return (
    <>
      {/* 📱 Mobile / Responsive App UI (Exact match with App screenshot) */}
      <div
        onClick={handleCardClick}
        className="lg:hidden bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#F6971E]/30 p-3 sm:p-3.5 flex gap-3 sm:gap-3.5 relative overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
      >
        {/* Left: Avatar + Trending Badge + 5 Stars */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-[95px] h-[105px] sm:w-[105px] sm:h-[115px] rounded-2xl border-2 border-[#F6971E] overflow-hidden bg-gray-50">
            <Image
              src={astro.imageUrl}
              alt={astro.name}
              fill
              className="object-cover"
            />

            {/* Trending Badge Overlay */}
            {astro.isCelebrity && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#F6971E] to-[#FF7A00] text-white text-[10px] font-bold text-center py-0.5 z-10 flex items-center justify-center gap-0.5">
                <span>Trending</span>
                <span>🔥</span>
              </div>
            )}
          </div>

          {/* 5 Golden Stars */}
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} className="text-[#F6971E] text-xs" />
            ))}
          </div>
        </div>

        {/* Right: Info + Skills + Call & Chat Buttons */}
        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div>
            {/* Row 1: Name & Verified Badge */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <h3 className="text-base sm:text-lg font-bold text-[#1f1f1f] font-helvetica truncate">
                {astro.name}
              </h3>
              {astro.isVerified && (
                <BsPatchCheckFill className="text-[#00C853] text-lg flex-shrink-0" />
              )}
            </div>

            {/* Row 2: Pricing */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-400 line-through flex items-center">
                <BsCurrencyRupee className="text-xs -mr-0.5" />
                {originalPrice}
              </span>
              <span className="text-sm font-bold text-[#F6971E] font-helvetica flex items-center">
                <BsCurrencyRupee className="text-sm -mr-0.5" />
                {astro.price.replace('₹', '')}/min
              </span>
            </div>

            {/* Row 3: Experience & Languages */}
            <p className="text-xs text-[#666666] font-helvetica truncate mb-2">
              Exp: {astro.experience} | {astro.languages}
            </p>

            {/* Row 4: Skill Pills */}
            <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap mb-2.5">
              {astro.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="flex-shrink-0 rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-[#555555] bg-white font-helvetica"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Row 5: Connect Button */}
          <div className="mt-auto pt-1">
            <button
              onClick={handleConnectClick}
              className="w-full bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-2 px-4 rounded-xl shadow-[0_2px_8px_rgba(246,151,30,0.25)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center text-xs sm:text-sm"
            >
              Connect Now
            </button>
          </div>
        </div>
      </div>

      {/* 🖥️ Desktop Web Card (Clean 4-column layout) */}
      <div 
        onClick={handleCardClick}
        className="hidden lg:flex bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-[#F6971E]/20 hover:border-[#F6971E]/50 hover:shadow-[0_8px_24px_rgba(246,151,30,0.12)] transition-all duration-300 hover:-translate-y-1 flex-col relative overflow-hidden h-full cursor-pointer group"
      >
        {/* Top Image Section */}
        <div className="block relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image 
            src={astro.imageUrl} 
            alt={astro.name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Trending Badge Overlay on Desktop Web */}
          {astro.isCelebrity && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#F6971E] to-[#FF7A00] text-white text-[11px] font-bold text-center py-1 z-10 flex items-center justify-center gap-1 shadow-xs">
              <span>Trending</span>
              <span>🔥</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
          {/* Name & Rating */}
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#72271E] font-['Inria_Serif'] line-clamp-1 group-hover:text-[#F6971E] transition-colors">
                {astro.name}
              </h3>
              {astro.isVerified && (
                <BsPatchCheckFill className="text-[#00C853] text-base sm:text-lg flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#4A2B23] flex-shrink-0">
              <BsStarFill className="text-[#F6971E] text-xs" />
              <span>{astro.rating}</span>
            </div>
          </div>

          {/* Info Text */}
          <p className="text-xs sm:text-[13px] text-gray-500 font-helvetica mb-0.5 line-clamp-1">
            {astro.languages}
          </p>
          <p className="text-xs sm:text-[13px] text-gray-600 font-helvetica mb-3 line-clamp-1">
            {astro.skills.join(", ")}
          </p>

          {/* Experience & Price (Both Del and Real Price) */}
          <div className="flex justify-between items-end mb-3 mt-auto pt-2 border-t border-gray-100">
            <span className="text-xs sm:text-[13px] text-gray-500 font-helvetica">
              {astro.experience}
            </span>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through flex items-center">
                <BsCurrencyRupee className="text-[10px] sm:text-[11px] -mr-0.5" />
                {originalPrice}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#72271E] leading-none flex items-center">
                <BsCurrencyRupee className="text-base -mr-0.5" />
                {astro.price.replace('₹', '')}
                <span className="text-xs font-bold text-[#72271E] ml-0.5">/min</span>
              </span>
            </div>
          </div> 

          {/* Connect Button */}
          <button 
            onClick={handleConnectClick}
            className="w-full bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-2 sm:py-2.5 rounded-xl hover:shadow-[0_4px_15px_rgba(246,151,30,0.3)] transition-all flex items-center justify-center gap-1.5 text-xs sm:text-[13px] relative z-20 cursor-pointer"
          >
            Connect Now
          </button>
        </div>
      </div>
    </>
  );
}
