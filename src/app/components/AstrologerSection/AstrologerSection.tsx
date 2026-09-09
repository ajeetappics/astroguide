'use client'

import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import AstrologerCard, { AstrologerData } from '../Card/AstrologerCard';

export const astrologerData: AstrologerData[] = [
  {
    id: 1,
    name: "Surinder1",
    isVerified: true,
    isCelebrity: true,
    skills: ["Vedic", "Vastu", "Lal Kitab"],
    languages: "English • Hindi",
    experience: "25 yrs exp",
    rating: "5.0",
    totalCalls: "10k+",
    price: "₹165",
    imageUrl: "/images/astro-1.jpg" // AI generated Pandit image
  },
  {
    id: 2,
    name: "Viehana",
    isVerified: true,
    isCelebrity: true,
    skills: ["Tarot", "Vedic", "Numerology"],
    languages: "English • Hindi",
    experience: "10 yrs exp",
    rating: "5.0",
    totalCalls: "50k+",
    price: "₹130",
    imageUrl: "/images/astro-2.jpg" // AI generated Female Astrologer
  },
  {
    id: 3,
    name: "Rachna",
    isVerified: true,
    isCelebrity: true,
    skills: ["Numerology", "Tarot", "Face Reading"],
    languages: "English • Hindi",
    experience: "15 yrs exp",
    rating: "5.0",
    totalCalls: "50k+",
    price: "₹107",
    imageUrl: "/images/astro-3.jpg" // AI generated Pandit image
  },
  {
    id: 4,
    name: "Rukmini",
    isVerified: true,
    isCelebrity: true,
    skills: ["Tarot", "Life Coach"],
    languages: "Hindi",
    experience: "6 yrs exp",
    rating: "5.0",
    totalCalls: "10k+",
    price: "₹44",
    imageUrl: "/images/astro-4.jpg" // AI generated Female Astrologer
  }
];

export default function AstrologerSection() {
  return (
    <section className="bg-white py-6 md:py-10 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#FEF8E2]/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-6 gap-3 md:gap-4">
          <div className="max-w-3xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1">
              Talk to India's <span className="text-[#F6971E]">Top Rated</span> Astrologers
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm leading-relaxed">
              Every astrologer below has cleared a 4-step verification — qualification, panel interview, live audits, and a 30-day probation.
            </p>
          </div>
          <Link href="/astrologers" className="hidden md:flex flex-shrink-0 items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-1.5 px-3.5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs">
            View all astrologers <BsArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4">
          {astrologerData.map((astro) => (
            <AstrologerCard key={astro.id} astro={astro} />
          ))}
        </div>

        {/* Responsive View All Astrologers Button (Visible on small screens below the cards) */}
        <div className="flex md:hidden justify-center mt-5 sm:mt-6">
          <Link href="/astrologers" className="flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs">
            View all astrologers <BsArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
