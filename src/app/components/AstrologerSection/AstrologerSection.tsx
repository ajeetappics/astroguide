'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import AstrologerCard, { AstrologerData } from '../Card/AstrologerCard';
import { fetchTopAstrologers } from '@/services/astrologer/astrologerService';

export default function AstrologerSection() {
  const [astrologers, setAstrologers] = useState<AstrologerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadAstrologers = async () => {
      try {
        setIsLoading(true);
        const { astrologers: apiList } = await fetchTopAstrologers();
        if (isMounted && apiList && apiList.length > 0) {
          setAstrologers(apiList);
        }
      } catch (err) {
        console.error("Error loading top astrologers:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadAstrologers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-6 md:py-10 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#FEF8E2]/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
              Talk to India's <span className="text-[#F6971E]">Top Rated</span> Astrologers
            </h2>
          </div>
          <Link href="/astrologers" className="hidden md:flex flex-shrink-0 items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all astrologers <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4">
          {isLoading && astrologers.length === 0 ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-[300px] border border-gray-100 p-4 flex flex-col justify-between shadow-xs animate-pulse">
                <div className="w-full h-36 bg-gray-200 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded-xl w-full mt-auto"></div>
              </div>
            ))
          ) : astrologers && astrologers.length > 0 ? (
            astrologers.map((astro) => (
              <AstrologerCard key={astro.id} astro={astro} />
            ))
          ) : (
            <div className="text-center col-span-4 text-gray-500 py-8">
              No Astrologers Available
            </div>
          )}
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
