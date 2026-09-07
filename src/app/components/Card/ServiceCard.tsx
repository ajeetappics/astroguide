'use client'

import React from 'react';
import Image from 'next/image';
import { usePopup } from '../popup/PopupContext';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export default function ServiceCard({ icon, title, description, isActive = false }: ServiceCardProps) {
  const { openPopup } = usePopup();

  return (
    <div
      onClick={openPopup}
      className={`cursor-pointer group flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 transition-all duration-300 ${isActive ? 'scale-105' : 'hover:-translate-y-1'}`}
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] border ${isActive ? 'border-[#F6971E] shadow-[0_4px_20px_rgba(246,151,30,0.2)]' : 'border-[#F6971E]/20'} group-hover:border-[#F6971E] transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(246,151,30,0.15)]`}>
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 xl:w-10 xl:h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <h3 className={`text-xs sm:text-xs md:text-sm font-bold text-center transition-colors font-helvetica leading-tight ${isActive ? 'text-[#F6971E]' : 'text-[#72271E] group-hover:text-[#F6971E]'}`}>
        {title}
      </h3>
    </div>
  );
}
