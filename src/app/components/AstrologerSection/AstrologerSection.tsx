'use client'

import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import AstrologerCard, { AstrologerData } from '../Card/AstrologerCard';

export const astrologerData: AstrologerData[] = [
  {
    id: 1,
    name: "Surinder Kumar Sharma",
    isVerified: true,
    isCelebrity: true,
    skills: ["Career", "Finance", "Remedies", "Vedic"],
    languages: "English • Hindi",
    experience: "25 yrs exp",
    rating: "5.0",
    totalCalls: "10k+",
    price: "₹165",
    imageUrl: "/images/astro-1.jpg"
  },
  {
    id: 2,
    name: "Viehana Sharma ji",
    isVerified: true,
    isCelebrity: true,
    skills: ["Love", "Marriage", "Tarot", "Remedies"],
    languages: "English • Hindi",
    experience: "10 yrs exp",
    rating: "5.0",
    totalCalls: "50k+",
    price: "₹130",
    imageUrl: "/images/astro-2.jpg"
  },
  {
    id: 3,
    name: "Rachna Singh ji",
    isVerified: true,
    isCelebrity: true,
    skills: ["Education", "Career", "Parent", "Numerology"],
    languages: "English • Hindi",
    experience: "15 yrs exp",
    rating: "5.0",
    totalCalls: "50k+",
    price: "₹107",
    imageUrl: "/images/astro-3.jpg"
  },
  {
    id: 4,
    name: "Rukmini Devi",
    isVerified: true,
    isCelebrity: true,
    skills: ["Health", "Love", "Remedies", "Life Coach"],
    languages: "Hindi",
    experience: "6 yrs exp",
    rating: "5.0",
    totalCalls: "10k+",
    price: "₹44",
    imageUrl: "/images/astro-4.jpg"
  },
  {
    id: 5,
    name: "Pandit Radhe Shyam",
    isVerified: true,
    isCelebrity: true,
    skills: ["Legal", "Wealth", "Remedies", "Vedic"],
    languages: "Hindi • Sanskrit",
    experience: "22 yrs exp",
    rating: "4.9",
    totalCalls: "35k+",
    price: "₹140",
    imageUrl: "/images/astro-5.jpg"
  },
  {
    id: 6,
    name: "Acharya Vidyadhar",
    isVerified: true,
    isCelebrity: true,
    skills: ["Wealth", "Finance", "Career", "Vastu"],
    languages: "English • Hindi",
    experience: "28 yrs exp",
    rating: "5.0",
    totalCalls: "60k+",
    price: "₹180",
    imageUrl: "/images/astro-6.jpg"
  },
  {
    id: 7,
    name: "Tarot Sunita Rawat",
    isVerified: true,
    isCelebrity: true,
    skills: ["Love", "Marriage", "Parent", "Tarot"],
    languages: "English • Hindi",
    experience: "12 yrs exp",
    rating: "4.9",
    totalCalls: "28k+",
    price: "₹95",
    imageUrl: "/images/astro-7.jpg"
  },
  {
    id: 8,
    name: "Dr. Arvind Joshi",
    isVerified: true,
    isCelebrity: true,
    skills: ["Education", "Career", "Finance", "Palmistry"],
    languages: "English • Hindi",
    experience: "18 yrs exp",
    rating: "5.0",
    totalCalls: "42k+",
    price: "₹120",
    imageUrl: "/images/astro-8.jpg"
  },
  {
    id: 9,
    name: "Acharya Devendra Shastri",
    isVerified: true,
    isCelebrity: true,
    skills: ["Parent", "Health", "Remedies", "Kundli"],
    languages: "Hindi • Sanskrit",
    experience: "26 yrs exp",
    rating: "5.0",
    totalCalls: "48k+",
    price: "₹155",
    imageUrl: "/images/astro-9.jpg"
  },
  {
    id: 10,
    name: "Meenakshi Swaminathan",
    isVerified: true,
    isCelebrity: true,
    skills: ["Legal", "Marriage", "Wealth", "Vedic"],
    languages: "English • Hindi",
    experience: "14 yrs exp",
    rating: "4.9",
    totalCalls: "22k+",
    price: "₹110",
    imageUrl: "/images/astro-10.jpg"
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
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Talk to India's <span className="text-[#F6971E]">Top Rated</span> Astrologers
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px] leading-relaxed">
              Every astrologer below has cleared a 4-step verification — qualification, panel interview, live audits, and a 30-day probation.
            </p>
          </div>
          <Link href="/astrologers" className="hidden md:flex flex-shrink-0 items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all astrologers <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4">
          {astrologerData && astrologerData?.length > 0 ? astrologerData?.slice(0, 4)?.map((astro) => (
            <AstrologerCard key={astro.id} astro={astro} />
          )) : (<div className='text-center col-span-4 text-[#F6971E]'>No Astrologer Data Found!</div>)}
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
