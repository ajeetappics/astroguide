'use client'

import React from 'react';
import { usePopup } from '../popup/PopupContext';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  Matchmaking?: any;
  Numerology?: any;
}

export default function ServiceCard({ icon: Icon, title, description, Matchmaking, Numerology }: ServiceCardProps) {
  const { openPopup } = usePopup();

  return (
    <button onClick={openPopup} className="cursor-pointer w-full bg-transparent border-none p-0">
      <div className="bg-[#FAF6F2] border-2 border-[#72271E] rounded-2xl p-8 text-center flex flex-col items-center transition-transform transform hover:-translate-y-2">

        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
          style={{ background: "linear-gradient(180deg, #8A3929 0%, #8B3A2A 24.04%, #B58A63 100%)" }}
        >
          {title === "Match Making" ? (
            <img src={Matchmaking.src} alt="Match Making" className="w-11 h-11 mt-1" />
          ) : title === "Numerology" ? (
            <img src={Numerology.src} alt="Numerology" className="w-11 h-11" />
          ) : (
            <Icon className="text-white text-3xl" />
          )}
        </div>

        <h3 className="text-xl font-helvetica font-semibold text-[#72271E] mb-2">
          {title}
        </h3>

        <p className="text-sm font-helvetica text-[#5C5C5C]">
          {description}
        </p>
      </div>
    </button>
  );
}