import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { BiMap } from 'react-icons/bi';
import { usePopup } from '../popup/PopupContext';

export interface PujaData {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: string;
  image: string;
}

interface PoojaCardProps {
  pooja: PujaData;
}

export default function PoojaCard({ pooja }: PoojaCardProps) {
  const { openPopup } = usePopup();

  return (
    <Link
      href={`/pooja/${pooja.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(246,151,30,0.12)] border border-[#F6971E]/15 hover:border-[#F6971E]/50 transition-all duration-500 hover:-translate-y-1 flex flex-col group h-full block"
    >

      {/* Image Section - Compact height */}
      <div className="relative h-[110px] sm:h-[125px] md:h-[135px] w-full overflow-hidden">
        <Image
          src={pooja.image}
          alt={pooja.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14]/80 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base md:text-[17px] font-bold text-[#72271E] font-['Inria_Serif'] mb-1 group-hover:text-[#F6971E] transition-colors line-clamp-1">
          {pooja.title}
        </h3>

        <p className="text-[#6b6b6b] text-xs sm:text-[13px] font-helvetica leading-relaxed mb-2.5 line-clamp-2">
          {pooja.description}
        </p>

        {/* Footer: Price & Button */}
        <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">Starts At</span>
            <span className="text-base sm:text-lg font-bold text-[#4A2B23] flex items-center">
              <span className="font-sans">₹</span>
              {pooja.price.replace('₹', '')}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation when clicking the button
              openPopup();
            }}
            className="bg-[#4A2B23] whitespace-nowrap text-white hover:bg-[#F6971E] font-bold text-xs sm:text-[13px] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            Connect <BsArrowRight className="text-xs" />
          </button>
        </div>

      </div>

    </Link>
  );
}
