'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsStarFill, BsPatchCheckFill } from 'react-icons/bs';
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
    // Later we can add a specific link here as requested
    openPopup();
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#F6971E]/20 hover:shadow-[0_8px_30px_rgba(246,151,30,0.15)] transition-all duration-300 flex flex-col relative overflow-hidden h-full cursor-pointer group"
    >
      {/* Top Image Section */}
      <div className="block relative w-full aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden bg-gray-100">
        <Image 
          src={astro.imageUrl} 
          alt={astro.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        

      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Name & Rating */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-[#72271E] font-['Inria_Serif'] line-clamp-1 group-hover:text-[#F6971E] transition-colors">
              {astro.name}
            </h3>

          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-[#4A2B23] flex-shrink-0">
            <BsStarFill className="text-[#F6971E] text-xs" />
            <span>{astro.rating}</span>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-sm text-gray-500 font-helvetica mb-1 line-clamp-1">
          {astro.languages}
        </p>
        <p className="text-sm text-gray-700 font-helvetica mb-4 line-clamp-1">
          {astro.skills.join(", ")}
        </p>

        {/* Experience & Price */}
        <div className="flex justify-between items-end mb-6 mt-auto">
          <span className="text-sm text-gray-500 font-helvetica">
            {astro.experience}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-[#72271E] leading-none">{astro.price}<span className="text-sm font-bold text-[#72271E]">/min</span></span>
          </div>
        </div>

        {/* Connect Button */}
        <button 
          onClick={handleConnectClick}
          className="w-full mt-auto bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-3 rounded-[14px] hover:shadow-[0_4px_15px_rgba(246,151,30,0.3)] transition-all flex items-center justify-center gap-2 relative z-20"
        >
          Connect Now
        </button>

      </div>
    </div>
  );
}
