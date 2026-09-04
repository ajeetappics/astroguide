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
      className={`cursor-pointer group flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isActive ? 'scale-105' : 'hover:-translate-y-1'}`}
    >
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] border ${isActive ? 'border-[#F6971E] shadow-[0_4px_20px_rgba(246,151,30,0.2)]' : 'border-[#F6971E]/20'} group-hover:border-[#F6971E] transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(246,151,30,0.15)]`}>
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <h3 className={`text-sm md:text-base font-bold text-center transition-colors font-helvetica ${isActive ? 'text-[#F6971E]' : 'text-[#72271E] group-hover:text-[#F6971E]'}`}>
        {title}
      </h3>
    </div>
  );
}
